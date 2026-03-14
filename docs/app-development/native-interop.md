---
id: native-interop
title: Native platform interop
description: Access native platform APIs, embed native views, and use P/Invoke in Avalonia applications.
doc-type: overview
---

Avalonia provides several mechanisms for interacting with native platform APIs and embedding native content within your application.

## Platform-specific code patterns

For simple platform branching, use runtime detection or conditional compilation. See [Cross-Platform Architecture](/docs/fundamentals/cross-platform-architecture) for these patterns.

For more complex native integration, Avalonia provides direct access to the underlying platform window handles and native APIs.

## Accessing native window handles

You can retrieve the native window handle for interop with platform APIs:

```csharp
if (TopLevel.GetTopLevel(this)?.TryGetPlatformHandle() is { } handle)
{
    // handle.Handle is the native handle
    IntPtr nativeHandle = handle.Handle;

    // handle.HandleDescriptor tells you the type
    string kind = handle.HandleDescriptor;
}
```

The returned handle type depends on the platform:

| Platform | HandleDescriptor | Native Type |
|---|---|---|
| Windows | `HWND` | Win32 window handle |
| macOS | `NSWindow` | AppKit window pointer |
| Linux (X11) | `X11` | X11 Window ID |
| iOS | `UIViewControlHandle` | UIKit view reference |
| Android | `AndroidViewControlHandle` | Android view reference |
| Browser | `JSObjectControlHandle` | Container `<div>` element reference |

This is useful for scenarios like:
- Registering global hotkeys through the OS API
- Calling native windowing functions (e.g., Win32 `SetWindowPos`)
- Passing the window handle to native libraries that need a parent window
- Integrating with platform-specific mobile SDKs

## Embedding native views

Avalonia supports embedding native UI controls within the Avalonia visual tree using [`NativeControlHost`](/api/avalonia/controls/nativecontrolhost). This lets you use platform-specific controls (e.g., a native web browser, media player, or map view) inside an Avalonia layout.

### NativeControlHost

`NativeControlHost` is a control that reserves space in the Avalonia layout and hosts a native view in that region:

```csharp
public class NativeTextEditor : NativeControlHost
{
    protected override IPlatformHandle CreateNativeControlCore(
        IPlatformHandle parent)
    {
        if (OperatingSystem.IsWindows())
        {
            // Create a Win32 EDIT control
            var hwnd = CreateWindowEx(0, "EDIT", "",
                WS_CHILD | WS_VISIBLE | ES_MULTILINE,
                0, 0, 100, 100,
                parent.Handle, IntPtr.Zero, IntPtr.Zero, IntPtr.Zero);

            return new PlatformHandle(hwnd, "HWND");
        }

        return base.CreateNativeControlCore(parent);
    }

    protected override void DestroyNativeControlCore(
        IPlatformHandle control)
    {
        if (OperatingSystem.IsWindows())
        {
            DestroyWindow(control.Handle);
        }
        else
        {
            base.DestroyNativeControlCore(control);
        }
    }
}
```

Use `NativeControlHost` in XAML like any other control:

```xml
<Border BorderBrush="Gray" BorderThickness="1">
    <local:NativeTextEditor MinHeight="200" />
</Border>
```

### Limitations of native embedding

Native views sit on top of the Avalonia rendering surface. This means:

- **No transparency**: Native views cannot have transparent backgrounds that show Avalonia content behind them.
- **No transforms**: Avalonia render transforms (rotation, scale) do not affect the native view.
- **Z-order constraints**: Native views always render on top of Avalonia content. You cannot place Avalonia controls over a native view.
- **Clipping**: The native view is clipped to its host bounds, but complex clip geometries are not supported.

## P/Invoke and native libraries

For calling native C libraries, use standard .NET P/Invoke:

```csharp
using System.Runtime.InteropServices;

public static partial class NativeMethods
{
    // .NET 7+ LibraryImport (AOT-compatible)
    [LibraryImport("user32")]
    public static partial int MessageBoxW(
        IntPtr hWnd,
        [MarshalAs(UnmanagedType.LPWStr)] string text,
        [MarshalAs(UnmanagedType.LPWStr)] string caption,
        uint type);
}
```

For Native AOT deployment, use `LibraryImport` instead of `DllImport` to ensure the marshalling code is generated at compile time. See [Native AOT Deployment](/docs/deployment/native-aot) for details.

### Loading platform-specific native libraries

Place native libraries in platform-specific `runtimes` folders:

```text
MyApp/
├── runtimes/
│   ├── win-x64/native/mylib.dll
│   ├── osx-arm64/native/libmylib.dylib
│   └── linux-x64/native/libmylib.so
```

Reference them in your `.csproj`:

```xml
<ItemGroup>
    <NativeLibrary Include="runtimes\win-x64\native\mylib.dll"
                   Pack="true"
                   PackagePath="runtimes/win-x64/native/" />
</ItemGroup>
```

The .NET runtime automatically loads the correct library for the current platform.

## Platform-specific services with dependency injection

For complex native integration, define a service interface in your shared project and implement it per platform:

```csharp
// Shared project
public interface INativeNotification
{
    void ShowNotification(string title, string message);
}

// Windows implementation
public class WindowsNotification : INativeNotification
{
    public void ShowNotification(string title, string message)
    {
        // Use Windows Toast Notification API
    }
}

// macOS implementation
public class MacNotification : INativeNotification
{
    public void ShowNotification(string title, string message)
    {
        // Use NSUserNotificationCenter
    }
}
```

Register the appropriate implementation at startup:

```csharp
if (OperatingSystem.IsWindows())
    services.AddSingleton<INativeNotification, WindowsNotification>();
else if (OperatingSystem.IsMacOS())
    services.AddSingleton<INativeNotification, MacNotification>();
```

See [Dependency Injection](/docs/app-development/dependency-injection) for the full setup.

## Using Microsoft.Maui.Essentials

For common device APIs (sensors, connectivity, battery, permissions), `Microsoft.Maui.Essentials` provides cross-platform abstractions that work with Avalonia on .NET 8+:

```xml
<PackageReference Include="Microsoft.Maui.Essentials" Version="8.0.0" />
```

```csharp
using Microsoft.Maui.Devices;

var model = DeviceInfo.Model;
var platform = DeviceInfo.Platform;
```

Note that Maui.Essentials supports Windows, macOS (via Catalyst), Android, and iOS. It does not support Linux, WebAssembly, or non-Catalyst macOS builds.

## Custom rendering with SkiaSharp

For direct GPU rendering within an Avalonia control, use `ICustomDrawOperation` with SkiaSharp:

```csharp
using Avalonia.Media;
using Avalonia.Platform;
using Avalonia.Rendering.SceneGraph;
using Avalonia.Skia;
using SkiaSharp;

public class SkiaCanvas : Control
{
    public override void Render(DrawingContext context)
    {
        var bounds = new Rect(0, 0, Bounds.Width, Bounds.Height);
        context.Custom(new SkiaDrawOperation(bounds));
    }

    private class SkiaDrawOperation : ICustomDrawOperation
    {
        public SkiaDrawOperation(Rect bounds) => Bounds = bounds;

        public Rect Bounds { get; }

        public void Render(ImmediateDrawingContext context)
        {
            var leaseFeature = context.TryGetFeature<ISkiaSharpApiLeaseFeature>();
            if (leaseFeature is null) return;

            using var lease = leaseFeature.Lease();
            var canvas = lease.SkCanvas;

            // Direct SkiaSharp drawing
            using var paint = new SKPaint
            {
                Color = SKColors.CornflowerBlue,
                IsAntialias = true,
                Style = SKPaintStyle.Fill
            };

            canvas.DrawCircle(
                (float)Bounds.Width / 2,
                (float)Bounds.Height / 2,
                50,
                paint);
        }

        public bool HitTest(Point p) => Bounds.Contains(p);
        public bool Equals(ICustomDrawOperation? other) => false;
        public void Dispose() { }
    }
}
```

Add the SkiaSharp NuGet package:

```xml
<PackageReference Include="Avalonia.Skia" Version="12.0.*" />
<PackageReference Include="SkiaSharp" Version="2.88.*" />
```

## See also

- [Cross-Platform Architecture](/docs/fundamentals/cross-platform-architecture): Solution structure and platform branching patterns.
- [Platform-Specific .NET](/docs/platform-specific-guides/dotnet): Runtime detection and conditional compilation.
- [Dependency Injection](/docs/app-development/dependency-injection): Registering platform services.
- [Native AOT Deployment](/docs/deployment/native-aot): AOT considerations for native interop.
