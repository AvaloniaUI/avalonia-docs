---
id: macos
title: macOS
---

## Application name

By default, the macOS menu bar and system dialogs display "Avalonia Application" as the app name. To set your own application name, you need to configure the Avalonia `Application` object.

### Using a custom Avalonia application

Follow the steps in [Customizing Initialization](/xpf/configuration/customizing-initialization#optional-define-a-custom-avalonia-application) to create a custom Avalonia Application class, then set the `Name` property in your AXAML:

```xml title="MyAvaloniaApp.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyXpfApp.MyAvaloniaApp"
             Name="My App Name">
  <Application.Styles>
    <SimpleTheme/>
  </Application.Styles>
</Application>
```

### Using DefaultXpfAvaloniaApplication

If you do not need a full custom Application class, you can extend `DefaultXpfAvaloniaApplication` and set the `Name` property:

```csharp
public class MyAvaloniaApp : AvaloniaUI.Xpf.Helpers.DefaultXpfAvaloniaApplication
{
    public MyAvaloniaApp()
    {
        Name = "My App Name";
    }
}
```

Then reference this class in your `AppBuilder` configuration:

```csharp
AppBuilder.Configure<MyAvaloniaApp>()
    .UsePlatformDetect()
    .WithAvaloniaXpf()
    .SetupWithLifetime(new ClassicDesktopStyleApplicationLifetime
    {
        ShutdownMode = ShutdownMode.OnExplicitShutdown
    });
```

## Native menus

macOS applications use a global menu bar at the top of the screen. XPF supports this through Avalonia's `NativeMenu` API.

### Setting up a native menu programmatically

In your WPF window's `Loaded` event, access the underlying Avalonia window and set the menu:

```csharp
using Atlantis;
using Avalonia.Controls;

private void Window_Loaded(object sender, RoutedEventArgs e)
{
    var avaloniaWindow = XpfWpfAbstraction.GetAvaloniaWindowForWindow(this);

    var menu = new NativeMenu();

    var fileMenu = new NativeMenuItem("File");
    var fileSubMenu = new NativeMenu();
    fileSubMenu.Add(new NativeMenuItem("Open") { Command = /* your command */ });
    fileSubMenu.Add(new NativeMenuItemSeparator());
    fileSubMenu.Add(new NativeMenuItem("Exit") { Command = /* your command */ });
    fileMenu.Menu = fileSubMenu;

    menu.Add(fileMenu);
    NativeMenu.SetMenu(avaloniaWindow, menu);
}
```

### Cross-platform menu fallback

On platforms that do not support a global menu bar (Windows and most Linux desktop environments), you can use a `NativeMenuBar` control embedded in your XPF window via `AvaloniaHost`. This control renders a traditional menu bar only on platforms without native global menu support, and is hidden on macOS (where the global menu is used instead).

See [Embedding Avalonia in XPF](/xpf/interop/embedding-avalonia-in-xpf) for details on hosting Avalonia controls.

## Dock visibility

To control whether your application appears in the macOS Dock, use `MacOSPlatformOptions` in a [custom initialization](/xpf/configuration/customizing-initialization):

```csharp
AppBuilder.Configure<MyAvaloniaApp>()
    .UsePlatformDetect()
    .With(new MacOSPlatformOptions { ShowInDock = false })
    .WithAvaloniaXpf()
    .SetupWithLifetime(new ClassicDesktopStyleApplicationLifetime
    {
        ShutdownMode = ShutdownMode.OnExplicitShutdown
    });
```

### Info.plist interaction

The `ShowInDock` option interacts with macOS `Info.plist` settings:

| Configuration | Behavior |
|---|---|
| `ShowInDock = false` | App does not appear in the Dock. Equivalent to `LSUIElement = true`. |
| `LSUIElement = true` in Info.plist | App does not appear in the Dock or the Cmd+Tab switcher. The app has no menu bar. |
| `LSBackgroundOnly = true` in Info.plist | App runs as a background process with no UI presence. Not suitable for XPF apps with windows. |

If you set both `ShowInDock = false` in code and `LSUIElement` in `Info.plist`, use XPF 1.6.0 or later to avoid a brief dock icon flicker on startup.

For tray-icon-only applications, use `ShowInDock = false` and provide a system tray icon for user interaction.

## Startup and modal dialogs

On macOS, showing a modal dialog (via `ShowDialog`) during the window activation phase can cause the application to freeze. This occurs because the first paint notification triggers startup code before the rendering pipeline is fully initialized. A `ShowDialog` call at this point starts a nested dispatcher loop that blocks the paint from completing.

### Recommended solutions

Add the following to your `.csproj` to defer startup code to a safe dispatcher priority:

```xml
<ItemGroup>
    <RuntimeHostConfigurationOption Include="AvaloniaUI.Xpf.AllowBlockingCallsOnStartup" Value="true" />
</ItemGroup>
```

Alternatively, avoid calling `ShowDialog` from window constructors or activation handlers. Instead, trigger dialogs from the `Application.Startup` event or use a dispatcher callback:

```csharp
Dispatcher.CurrentDispatcher.BeginInvoke(DispatcherPriority.Loaded, () =>
{
    var dialog = new MyDialog();
    dialog.ShowDialog();
});
```

:::caution
On macOS, avoid using `DispatcherPriority.Normal` or `DispatcherPriority.Send` for operations that start nested message loops (such as `ShowDialog`). Use `DispatcherPriority.Loaded` or lower instead.
:::

## DPI and render scaling

The WPF API `VisualTreeHelper.GetDpi()` may not return accurate values on macOS. To get the correct render scaling factor, access the underlying Avalonia window:

```csharp
using Atlantis;

var avaloniaTopLevel = XpfWpfAbstraction.GetAvaloniaTopLevelForWindow(myWpfWindow);
double scaling = avaloniaTopLevel.RenderScaling;
```

## Trackpad gestures

macOS trackpad gestures (pinch-to-zoom, rotation) are not available through the WPF manipulation API in XPF. To handle these gestures, use Avalonia's gesture events on the underlying Avalonia window:

```csharp
using Atlantis;
using Avalonia.Input;

var avaloniaWindow = XpfWpfAbstraction.GetAvaloniaWindowForWindow(this);

// Pinch-to-zoom
avaloniaWindow.AddHandler(Gestures.PointerTouchPadGestureMagnifyEvent, (sender, e) =>
{
    double scale = e.Scale;
    // Handle zoom
}, handledEventsToo: true);
```

To distinguish between trackpad scroll and mouse wheel events, check the `PointerDeltaEventArgs` properties when handling `PointerWheelChanged`.

## GDI+ and System.Drawing.Common

`System.Drawing.Common` (GDI+) is deprecated on non-Windows platforms and will throw exceptions in XPF on macOS. This commonly affects third-party controls that depend on GDI+ for rendering or printing (for example, certain DevExpress controls).

If a third-party control provides a Skia-based rendering option, enable it for non-Windows builds. Contact your control vendor for guidance on non-GDI rendering backends.

See [Library Compatibility](/xpf/third-party/compatibility) for more details.

## Packaging and deployment

macOS applications must be packaged as `.app` bundles for distribution. Key considerations for XPF apps:

- **Do not** set `IncludeNativeLibrariesForSelfExtract` to `true`. This is incompatible with macOS.
- Use `SelfContained` publishing for distribution outside the development machine.
- When code signing, sign individual files rather than using the `--deep` flag.
- Publish from the command line rather than from Visual Studio for reliable output:

```bash
dotnet publish -r osx-arm64 -c Release --self-contained
```

:::tip
The Avalonia **Parcel** tool can automate macOS packaging, code signing, and notarization for XPF applications. Contact the Avalonia team for access.
:::

## Key mapping

macOS has different modifier keys to Windows and Linux. By default modifier keys are mapped as follows:

- Control -> `Key.LeftCtrl` / `Key.RightCtrl` / `ModifierKeys.Control`
- Option -> `Key.LeftAlt` / `Key.RightAlt` / `ModifierKeys.Alt`
- Command -> `Key.LWin` / `Key.RWin` / `ModifierKeys.Windows`

However there are problems with this mapping:

1. macOS applications generally use the Command key where the Control key would usually be used on Windows and Linux. For example "Copy" is Command-C on macOS instead of Control+C
2. `ModifierKeys.Windows` is not included in `Keyboard.Modifiers` in WPF by design, making it impossible to detect the Command key through standard WPF modifier checks
3. Common controls such as text boxes are expected to have different keyboard shortcuts in macOS, such as "Move the insertion point to the beginning of the previous word" being Option+Left Arrow on macOS instead of Control+Left Arrow

### Automatic macOS key mapping

To fix many of these problems, one can call the `XpfKeyboard.MapMacOSKeys()` method on startup. This would usually be done in the same place as [the XPF WinAPI shim setup](/xpf/third-party/win32-api-shims); that is, in the constructor of your `App` class or `Program.Main`:

```csharp
using System.Windows;
using Atlantis;

namespace XpfKeyboardMappingExample;

public partial class App : Application
{
    public App()
    {
        XpfKeyboard.MapMacOSKeys();
    }
}
```

Calling this method on macOS:

- Maps the Command key to the Control key
- Maps some common text box keyboard shortcuts to their XPF equivalents
  - Command+Left -> Home
  - Command+Right -> End
  - Option+Left Arrow-> Ctrl+Left Arrow
  - Option+Left Arrow -> Ctrl+Left Arrow

### macOS custom keyboard mapping

For more flexible key mapping you can [add custom key mappings](/xpf/migration/key-mapping).

## Context menus

On macOS, context menus can be opened by Ctrl+Clicking as well as by right clicking. You can enable this feature by setting `XpfMouse.ShowContextMenuOnMacOSCtrlClick` on startup. This would usually be done in the same place as [the XPF WinAPI shim setup](/xpf/third-party/win32-api-shims); that is, in the constructor of your `App` class or `Program.Main`:

```csharp
using System.Windows;
using Atlantis;

namespace XpfKeyboardMappingExample;

public partial class App : Application
{
    public App()
    {
        XpfMouse.ShowContextMenuOnMacOSCtrlClick = true;
    }
}
```

Once this feature is enabled, it can be disabled on a per-control basis by handling the `ContextMenuOpening` event and checking `Keyboard.Modifiers` and/or `Mouse.LeftButton` to determine how the context menu is being opened:

```csharp
private void OnContextMenuOpening(object sender, ContextMenuEventArgs e)
{
    // Suppress context menu on Ctrl+Click for this specific control
    if (Keyboard.Modifiers.HasFlag(ModifierKeys.Control) && Mouse.LeftButton == MouseButtonState.Pressed)
    {
        e.Handled = true;
    }
}
```

## Native API interop

To access macOS-specific APIs (such as Keychain or native cookies) from an XPF application, you have several options:

- Use the `MonoMac.NetStandard` NuGet package for common macOS APIs
- Use C-style `DllImport` to call macOS frameworks directly
- For WebView cookie access, use the `NativeWebViewCookieManager` API provided by XPF

:::note
MAUI Essentials does not support macOS (only Mac Catalyst). It cannot be used with XPF on macOS.
:::

## Known limitations

- **Multiple UI threads**: macOS allows only one UI thread. WPF patterns that rely on multiple dispatchers (such as splash screens on a separate thread) will not work. Refactor these patterns to use the main dispatcher with `DispatcherPriority.Background` for deferred work.
- **Transparent window click-through**: XPF does not support per-pixel hit transparency (clicking through transparent regions of a window). Consider embedding content in a single window instead of using transparent overlays.
- **SystemSounds.Beep**: `System.Media.SystemSounds.Beep` is not supported on macOS and will throw `PlatformNotSupportedException`. Guard calls with a platform check or remove them for cross-platform builds.
- **Tooltip focus stealing**: On some macOS versions, showing a tooltip can cause the application to briefly steal focus from other applications. This is a known issue being tracked by the XPF team.
