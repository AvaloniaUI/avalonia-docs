---
id: win32-api-shims
title: Win32 API Shims
---

Avalonia XPF implements WPF's API surface, however a variety of third-party libraries also depend on various Win32 APIs which are not available cross-platform.

To deal with this problem, Avalonia XPF implements a Win32 API emulation layer that allows third-party libraries to work on non-Windows platforms. This emulation layer needs to be enabled explicitly in your XPF application.

## When to enable Win32 API shims

Enable the shim layer if any of the following apply to your application:

- It uses third-party WPF controls from vendors like DevExpress, Actipro, Syncfusion, Telerik, or Infragistics
- It crashes on macOS or Linux with `DllNotFoundException: Unable to load shared library 'user32.dll'` or similar Win32 DLL errors
- It calls Win32 APIs directly (P/Invoke) for window management, display info, or theming

You can skip the shim layer if your application only uses standard WPF controls and none of your third-party libraries call Win32 APIs internally.

When in doubt, enable shims. They can be safely enabled even if not strictly needed.

## Enabling Win32 API shims

This feature must be enabled before any assembly attempts to call a Win32 API, so the constructor of your `App` class or `Program.Main` is a good place to enable it.

To enable Win32 API emulation application-wide you can add the following call:

```csharp
  AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.AutoEnable();
```

You can exclude libraries that are known to provide non-windows platform support like this:

```csharp
AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.
  .AutoEnable(asm =>
  {
    var name = asm.GetName().Name.ToLowerInvariant();
    if (name is "sqlite" or "jint" or "esprima" or "magick.net" or "magick.net.core")
      return true;
    return false;
  });
```

Alternatively the layer can be enabled on per-library basis:

```csharp
AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup
  .AddLibrary(typeof(Type.In.Third.Party.Library).Assembly);
```

## Resolving `DllImportResolver` conflicts

Some third-party libraries (such as Aspose) set their own `DllImportResolver` on the entry assembly. Because .NET only allows one resolver per assembly, this conflicts with XPF's WinApiShim, causing an `InvalidOperationException: A resolver is already set for the assembly`.

Use the `AutoEnable` filter callback to skip conflicting assemblies:

```csharp
AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.AutoEnable(asm =>
{
    var name = asm.GetName().Name;
    if (name != null && name.Contains("Aspose"))
        return true; // true = skip this assembly
    return false;
});
```

## Avoiding deadlocks with custom assembly loading

If your application uses a custom mechanism for loading managed assemblies (such as a plugin system), `AutoEnable` may cause deadlocks during startup. In this case, use `AddLibrary` to register assemblies individually after they are resolved:

```csharp
// Instead of AutoEnable, add assemblies as they are loaded
AppDomain.CurrentDomain.AssemblyLoad += (sender, args) =>
{
    AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.AddLibrary(args.LoadedAssembly);
};
```

See [Customizing Initialization](/xpf/configuration/customizing-initialization#custom-assembly-loading) for more details.

## Scope of Win32 API shims

The Win32 API shim layer exists to enable compatibility with third-party WPF controls that call Win32 APIs internally. It is **not** a general-purpose Win32 emulation layer.

Key points:
- Shims provide enough Win32 API surface to support common third-party WPF controls on non-Windows platforms
- On Windows, enabling shims redirects calls to the shim implementations instead of native Win32
- Not all Win32 APIs are available (see the [API reference](/xpf/third-party/winapi-reference))
- Windows messages (such as `WM_ACTIVATEAPP`) are only generated to the extent needed by supported controls
- Where possible, use WPF or Avalonia APIs directly rather than relying on Win32 API shims

## Troubleshooting

### Application crashes on macOS or Linux with DllNotFoundException

This is the most common symptom when Win32 API shims are not enabled. Add `AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.AutoEnable()` to your `App` constructor or `Program.Main`, and ensure it runs before any third-party assembly is loaded.

### Application freezes during startup with AutoEnable

If your application uses a custom assembly loading mechanism (such as a plugin system), `AutoEnable` can deadlock by intercepting assembly loads during startup. Switch to `AddLibrary` to register assemblies individually. See [Customizing Initialization: Custom Assembly Loading](/xpf/configuration/customizing-initialization#custom-assembly-loading).

### Shims are enabled but a specific library still fails

Some libraries call Win32 APIs that are not included in the shim layer. Check the [WinAPI Shim API Reference](/xpf/third-party/winapi-reference) to verify that the APIs your library needs are available. If a required API is missing, contact the Avalonia support team.

### EntryPointNotFoundException on Linux

If enabling Win32 API shims causes `EntryPointNotFoundException` for native Linux APIs (such as X11 functions), the shim layer is intercepting calls that should go to native libraries. Move native Linux API calls to a separate assembly and exclude it from the shim. See [Linux: Win32 API Shim Conflicts](/xpf/platforms/linux#win32-api-shim-conflicts-with-native-apis).

### A resolver is already set for the assembly

This occurs when a third-party library (such as Aspose) sets its own `DllImportResolver`. Use the `AutoEnable` filter callback to skip that library's assemblies. See [Resolving DllImportResolver Conflicts](#resolving-dllimportresolver-conflicts).
