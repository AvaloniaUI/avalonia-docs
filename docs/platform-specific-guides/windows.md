---
id: windows
title: Windows
description: Windows-specific Avalonia features including transparency, Mica, custom title bars, dark mode, DPI scaling, and Win32 interop.
doc-type: overview
---

## How Avalonia runs on Windows

Avalonia uses the Win32 API directly on Windows. No additional workloads or dependencies are needed beyond the .NET SDK. Your target framework is simply `net9.0` or `net10.0`, not a platform-specific one.

Rendering uses Skia backed by Direct3D, with an automatic software fallback when GPU acceleration is unavailable (for example, in remote desktop sessions or virtual machines without GPU passthrough). Input, windowing, clipboard, file dialogs, drag-and-drop, and accessibility are all provided through standard Win32 APIs.

Because there is no dependency on a Windows-specific .NET workload, you can cross-compile Windows builds from macOS or Linux. The resulting binary runs on any supported version of Windows with the .NET runtime installed.

## Window transparency and Mica

Windows supports all `TransparencyLevelHint` values, making it the only platform with full transparency support. macOS supports only `Transparent`, and Linux support depends on the compositor.

| Level | Effect | Minimum version |
|---|---|---|
| `Transparent` | Fully transparent window background | Windows 7+ |
| `AcrylicBlur` | Blurred, semi-transparent backdrop | Windows 10 1803+ |
| `Mica` | System-tinted material drawn by DWM | Windows 11 |

To enable a Mica backdrop:

```xml
<Window xmlns="https://github.com/avaloniaui"
        TransparencyLevelHint="Mica"
        Background="Transparent">
    <!-- Your content -->
</Window>
```

If Mica is unavailable (for example, on Windows 10), the window falls back through the list in order. You can check which level is actually active at runtime:

```csharp
var actual = myWindow.ActualTransparencyLevel;
```

Set the window's `Background` to `Transparent` for any transparency level to take effect. An opaque background covers the transparency effect entirely.

For more details, see [Window Management](/docs/app-development/window-management).

## Custom title bars

Windows supports extending the client area into the title bar region for custom chrome. Set `ExtendClientAreaToDecorationsHint` to push your content into the title bar area, and use `WindowDecorations.ElementRole` to mark a region as the draggable title bar:

```xml
<Window ExtendClientAreaToDecorationsHint="True"
        SystemDecorations="None">
    <Grid RowDefinitions="32,*">
        <Border Grid.Row="0" Background="#2D2D2D"
                WindowDecorations.ElementRole="TitleBar">
            <TextBlock Text="My App" Foreground="White"
                       VerticalAlignment="Center" Margin="12,0" />
        </Border>
        <Border Grid.Row="1">
            <TextBlock Text="Window content" />
        </Border>
    </Grid>
</Window>
```

The marked region supports native window dragging and double-click-to-maximize. Interactive controls placed inside the title bar region still receive input normally.

Setting `SystemDecorations="None"` removes all system chrome, giving you complete control over the window frame. With `SystemDecorations="Full"`, the system minimize, maximize, and close buttons remain visible alongside your custom title bar content. On Windows, disabled caption buttons are hidden rather than greyed out.

For more details, see [Window Management](/docs/app-development/window-management#custom-title-bar).

## Dark mode and system theme detection

Avalonia detects the Windows system theme and accent color through `PlatformSettings`. The built-in `FluentTheme` automatically switches between light and dark variants to match the system preference.

To read the current theme and respond to changes:

```csharp
var settings = myControl.GetPlatformSettings();
var colors = settings?.GetColorValues();

// Check current theme
if (colors?.ThemeVariant == ThemeVariant.Dark)
{
    // System is in dark mode
}

// React to theme changes in real time
if (settings is not null)
{
    settings.ColorValuesChanged += (sender, values) =>
    {
        // values contains updated theme and accent colors
    };
}
```

This is useful for custom theming logic beyond what `FluentTheme` handles automatically. For example, you could adjust chart colors or image overlays based on whether the system is in light or dark mode.

:::note
On Windows 11, Avalonia automatically updates the native title bar to match the application's `RequestedThemeVariant`. On Windows 10, the title bar does not darken because the platform does not provide an official API for this. If you need a dark title bar on Windows 10, use a [custom title bar](#custom-title-bars) or the undocumented `DwmSetWindowAttribute` workaround described in [Windows troubleshooting](/troubleshooting/platform-specific-issues/windows#title-bar-stays-light-when-switching-to-dark-theme-on-windows-10).
:::

For more details, see [Platform Settings](/docs/services/platform-settings).

## High DPI and per-monitor scaling

Avalonia is per-monitor DPI-aware by default on Windows. Each monitor reports its own scaling factor, and Avalonia adjusts layout and rendering automatically as windows move between displays.

The `Screen.Scaling` property reports the DPI scale factor for each display:

| Scaling value | DPI | Common use |
|---|---|---|
| `1.0` | 96 | Standard density (100%) |
| `1.25` | 120 | 125% scaling |
| `1.5` | 144 | 150% scaling |
| `2.0` | 192 | HiDPI / 200% scaling |

All layout in Avalonia uses device-independent pixels, so you do not need manual DPI conversion. To read the current screen's scaling factor:

```csharp
var screen = myWindow.Screens.ScreenFromWindow(myWindow);
var scaling = screen?.Scaling ?? 1.0;
```

For bitmap assets, Avalonia automatically selects `@2x` variants when the display scaling is 2.0 or higher.

For more details, see [Window Management](/docs/app-development/window-management#working-with-screens).

## Embedding native Win32 controls

You can host HWND-based Win32 controls inside an Avalonia layout using `NativeControlHost`. Override `CreateNativeControlCore` to create and return a handle to the native control:

```csharp
public class NativeTextEditor : NativeControlHost
{
    protected override IPlatformHandle CreateNativeControlCore(
        IPlatformHandle parent)
    {
        if (OperatingSystem.IsWindows())
        {
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
            DestroyWindow(control.Handle);
        else
            base.DestroyNativeControlCore(control);
    }
}
```

You can also retrieve the HWND of any Avalonia window for interop with existing Win32 code:

```csharp
var handle = TopLevel.GetTopLevel(myControl)?.TryGetPlatformHandle();
// handle.Handle contains the HWND as IntPtr
// handle.HandleDescriptor is "HWND"
```

Native controls rendered through `NativeControlHost` always appear above or below Avalonia content rather than participating in the normal visual tree z-ordering. They do not support transparency or render transforms (rotation, scale). Clipping is limited to the host control's bounds.

For more details, see [Native Platform Interop](/docs/app-development/native-interop).

## Embedding Avalonia in Windows Forms

Avalonia controls can be hosted inside Windows Forms applications using `WinFormsAvaloniaControlHost`. This enables incremental migration of existing Windows Forms applications to Avalonia without rewriting everything at once.

A typical setup requires at least two projects:

1. **YourApp**: A cross-platform class library containing your Avalonia controls and view models.
2. **YourApp.WinForms**: Your existing Windows Forms application.
3. **YourApp.Desktop** (optional): A standalone Avalonia executable, only needed if you want to use the Visual Studio XAML previewer.

Since Windows Forms only runs on Windows, embedding Avalonia controls into a WinForms app does not make it cross-platform. For cross-platform support, migrate fully to an Avalonia desktop project.

### Setup

These instructions assume Visual Studio 2022 with the Avalonia extension. If you use VS Code or Rider, you can skip the optional `YourApp.Desktop` project.

1. Add a new project to your solution using the **Avalonia C# Project** template. Select at least **Desktop** as a target platform. This creates `YourApp` and `YourApp.Desktop`.

2. Add the following references to your Windows Forms project:
   - Package reference: `Avalonia.Desktop`
   - Package reference: `Avalonia.Win32.Interoperability`
   - Project reference: `YourApp.csproj`

3. In your WinForms `Program.cs`, initialize Avalonia before calling `Application.Run()`:

```csharp
AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .SetupWithoutStarting();
```

4. Add a `WinFormsAvaloniaControlHost` control to your form (available in the Toolbox after adding the package reference).

5. Set its content in your form's constructor, after `InitializeComponent()`:

```csharp
winFormsAvaloniaControlHost1.Content = new MainView
{
    DataContext = new MainViewModel()
};
```

You should now see Avalonia's default view rendered inside your Windows Forms application.

## System tray integration

Windows has full support for `TrayIcon`. Tray icons appear in the Windows notification area and provide a `NativeMenu` context menu on right-click.

```xml
<TrayIcon Icon="/Assets/app-icon.ico"
          ToolTipText="My Application">
    <TrayIcon.Menu>
        <NativeMenu>
            <NativeMenuItem Header="Show Window" Click="ShowWindow_OnClick" />
            <NativeMenuItemSeparator />
            <NativeMenuItem Header="Exit" Click="Exit_OnClick" />
        </NativeMenu>
    </TrayIcon.Menu>
</TrayIcon>
```

Windows requires `.ico` format for tray icons. Include the icon file as an Avalonia resource in your `.csproj`:

```xml
<ItemGroup>
    <AvaloniaResource Include="Assets/app-icon.ico" />
</ItemGroup>
```

To minimize your application to the tray instead of the taskbar, set `ShowInTaskbar="False"` on the window when minimizing and restore it from the tray icon's click handler.

For more details, see [TrayIcon](/controls/navigation/trayicon).

## Accessibility

Avalonia exposes UI elements to assistive technology on Windows through the UI Automation (UIA) framework. Screen readers such as Narrator and NVDA can read and interact with Avalonia applications.

Built-in controls provide automation peers automatically, so standard controls like buttons, text boxes, and list items work with screen readers out of the box. For custom controls, set `AutomationProperties.Name` to provide a meaningful label:

```xml
<MyCustomControl AutomationProperties.Name="Star rating" />
```

For advanced scenarios, override `OnCreateAutomationPeer` in your control to return a custom automation peer that reports the appropriate control type and state.

For landmark navigation with Narrator, set `AutomationProperties.AccessibilityView` to at least `"Control"` to enable Narrator's landmark shortcuts.

For more details, see [Accessibility](/docs/app-development/accessibility).

## Platform-specific services on Windows

Avalonia's platform services use Win32 APIs on Windows. Here is a summary of how common services behave:

| Service | Windows behavior |
|---|---|
| Clipboard | Supports text, HTML, RTF, and file lists through the Win32 clipboard API. |
| File dialogs | Uses the Win32 common file dialog (IFileDialog). Supports file type filters, initial directory, and multi-select. |
| Drag and drop | Supports file drops from Explorer and data transfer between applications via OLE drag-and-drop. |
| Launcher | `Launcher.LaunchUriAsync` opens URLs in the default browser. `Launcher.LaunchFileAsync` opens files with their associated application. |

## See also

- [Packaging for Windows](/tools/parcel/packaging-for-windows) (NSIS installer, code signing)
- [WPF migration guide](/docs/migration/wpf)
- [Native Platform Interop](/docs/app-development/native-interop)
- [Window Management](/docs/app-development/window-management)
- [Platform Settings](/docs/services/platform-settings)
- [Keyboard and hotkeys](/docs/input-interaction/keyboard-and-hotkeys)
- [Accessibility](/docs/app-development/accessibility)
