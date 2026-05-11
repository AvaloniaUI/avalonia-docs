---
id: macos
title: macOS
---

## How Avalonia runs on macOS

Avalonia does not use the standard .NET macOS workload (`net10.0-macos`). Instead, it ships its own native platform backend that interfaces with macOS APIs through a compiled dynamic library (`libAvaloniaNative.dylib`), bypassing Microsoft's managed macOS bindings entirely.

This native backend is written in Objective-C++ (`.mm` files) and lives in the Avalonia repository at [`native/Avalonia.Native/src/OSX`](https://github.com/AvaloniaUI/Avalonia/tree/master/native/Avalonia.Native/src/OSX). It provides the platform essentials: windowing, input handling, Metal and OpenGL rendering, clipboard, menus, drag-and-drop, system tray, file dialogs, and accessibility. The .NET side communicates with this native code through MicroCom, a lightweight COM-style interop layer. Interfaces between the two sides are defined in an [IDL file](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Native/avn.idl), and MicroCom generates the managed wrappers that marshal calls across the boundary.

This has an important practical benefit: you can build and compile Avalonia desktop apps for macOS from Windows or Linux without installing the macOS workload or having access to a Mac. The default target framework is simply `net9.0` (or `net10.0`), not a platform-specific one.

The trade-off is that Avalonia's native bindings are minimal. They cover what the framework needs for UI, but they don't expose the full breadth of macOS platform APIs (such as MapKit, HealthKit, StoreKit, etc.).

### Accessing the full macOS API surface

If your app needs macOS APIs beyond what Avalonia exposes, change your target framework to a macOS-specific one:

```xml
<TargetFramework>net10.0-macos</TargetFramework>
```

This gives you access to the complete set of APIs provided by the .NET macOS workload, but it comes with a constraint: **builds targeting a macOS TFM must be performed on macOS**. You lose the ability to cross-compile from Windows or Linux.

## Application name and identity

macOS shows your application's name in several places: the menu bar, the "About" dialog, the "Quit" menu item, the Dock tooltip, and the window title bar. Getting these right requires setting the name in the correct locations.

### Where the name comes from

| Location | Source | Notes |
|---|---|---|
| Menu bar (bold app name) | `CFBundleName` in `Info.plist` (bundled), or `Application.Name` (unbundled) | `CFBundleName` is limited to 15 characters. |
| Dock tooltip | `CFBundleDisplayName` in `Info.plist`, falling back to `CFBundleName` | Use `CFBundleDisplayName` for names longer than 15 characters. |
| "About" menu item | Header text of your [`NativeMenuItem`](/api/avalonia/controls/nativemenuitem) | You control this text entirely. |
| "Quit" menu item | `CFBundleName` or `Application.Name` | Avalonia generates "Quit App Name" automatically. |
| Window title bar | `Window.Title` property | Independent of the app name. |

### Setting the application name

**Step 1: Set `Application.Name` in `App.axaml`**

This controls the name during development (before you have an `.app` bundle):

```xml
<Application Name="My Application" ...>
```

**Step 2: Set `CFBundleName` and `CFBundleDisplayName` in `Info.plist`**

When your app runs as a bundled `.app`, macOS reads the name from `Info.plist` instead of `Application.Name`. Keep these values consistent:

```xml
<key>CFBundleName</key>
<string>My App</string>

<key>CFBundleDisplayName</key>
<string>My Application</string>
```

`CFBundleName` is limited to 15 characters and is used for the menu bar and "Quit" item. `CFBundleDisplayName` has no length limit and is used by Finder and the Dock. If your app name fits in 15 characters, you only need `CFBundleName`.

## Native menu bar

macOS applications have a menu bar at the top of the screen, separate from the application window. Avalonia supports this through [`NativeMenu`](/api/avalonia/controls/nativemenu), which renders as a native macOS menu bar.

### Application menu

The leftmost menu in the menu bar carries your application's name and typically contains "About", "Preferences", and "Quit" items. Define it by attaching a `NativeMenu` to your `Application` in `App.axaml`:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.App"
             Name="My Application">

    <NativeMenu.Menu>
        <NativeMenu>
            <NativeMenuItem Header="About My Application..." Click="About_OnClick" />
            <NativeMenuItem Header="Preferences..." Click="Preferences_OnClick"
                            Gesture="Meta+Comma" />
        </NativeMenu>
    </NativeMenu.Menu>
</Application>
```

If you do not define a `NativeMenu`, Avalonia creates a default application menu that includes an "About Avalonia" item. Define your own menu to replace it.

Avalonia automatically appends standard items after your custom menu items, including a separator and the "Quit App Name" item with <kbd>⌘</kbd><kbd>Q</kbd>. You do not need to add a Quit item yourself.

### Replacing the About dialog

The "About" item in the application menu is a `NativeMenuItem` you define yourself. It has no special built-in behavior. Wire its `Click` event to show whatever UI you want:

```csharp
private void About_OnClick(object? sender, EventArgs e)
{
    var aboutWindow = new AboutWindow();
    aboutWindow.ShowDialog(this.GetMainWindow());
}
```

macOS users expect the About item to be the first entry in the application menu, with the header text "About My Application..." followed by an ellipsis. This is a convention, not a requirement enforced by the framework.

### Window menus

To add standard menus like File and Edit, attach a `NativeMenu` to your `Window`:

```xml
<Window xmlns="https://github.com/avaloniaui">
    <NativeMenu.Menu>
        <NativeMenu>
            <NativeMenuItem Header="File">
                <NativeMenu>
                    <NativeMenuItem Header="Open..." Gesture="Meta+O"
                                    Click="FileOpen_OnClick" />
                    <NativeMenuItem Header="Save" Gesture="Meta+S"
                                    Command="{Binding SaveCommand}" />
                    <NativeMenuItemSeparator />
                    <NativeMenuItem Header="Close" Gesture="Meta+W"
                                    Click="FileClose_OnClick" />
                </NativeMenu>
            </NativeMenuItem>
            <NativeMenuItem Header="Edit">
                <NativeMenu>
                    <NativeMenuItem Header="Cut" Gesture="Meta+X"
                                    Command="{Binding CutCommand}" />
                    <NativeMenuItem Header="Copy" Gesture="Meta+C"
                                    Command="{Binding CopyCommand}" />
                    <NativeMenuItem Header="Paste" Gesture="Meta+V"
                                    Command="{Binding PasteCommand}" />
                </NativeMenu>
            </NativeMenuItem>
        </NativeMenu>
    </NativeMenu.Menu>
</Window>
```

A menu item named "Edit" is special on macOS. Avalonia automatically adds standard macOS text editing features (such as autocomplete and character substitution) to any menu with this header.

Each `NativeMenuItem` requires either a `Click` event handler or a `Command` binding to be enabled. Without one of these, the item appears greyed out.

### Dock menu

macOS displays a context menu when users right-click (or Control-click) your application's icon in the Dock. You can customize this menu by attaching a `NativeDock.Menu` to your `Application` in `App.axaml`:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.App"
             Name="My Application">

    <NativeDock.Menu>
        <NativeMenu>
            <NativeMenuItem Header="New Window" Click="NewWindow_OnClick" />
            <NativeMenuItemSeparator />
            <NativeMenuItem Header="Show Main Window" Click="ShowMainWindow_OnClick" />
        </NativeMenu>
    </NativeDock.Menu>
</Application>
```

The dock menu items appear above the standard system items (such as "Options" and "Quit") that macOS adds automatically.

You can also modify the dock menu at runtime:

```csharp
var dockMenu = NativeDock.GetMenu(this);
if (dockMenu is not null)
{
    dockMenu.Items.Insert(0, new NativeMenuItem("Dynamic Item"));
}
```

:::note
`NativeDock.Menu` only has an effect on macOS. On other platforms, the property is ignored.
:::

### Keyboard shortcuts

The `Gesture` property assigns a keyboard shortcut to a menu item. Avalonia uses platform-neutral modifier names in gesture strings. On macOS, these map to the standard modifier keys:

| Avalonia modifier | macOS key | Symbol |
|---|---|---|
| `Meta` | Command | <kbd>⌘</kbd> |
| `Control` | Control | <kbd>⌃</kbd> |
| `Shift` | Shift | <kbd>⇧</kbd> |
| `Alt` | Option | <kbd>⌥</kbd> |

A gesture string joins one or more modifiers with `+`, followed by the key name:

| `Gesture` value | macOS shortcut |
|---|---|
| `Meta+S` | <kbd>⌘</kbd> <kbd>S</kbd> |
| `Meta+Shift+S` | <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>S</kbd> |
| `Meta+Comma` | <kbd>⌘</kbd> <kbd>,</kbd> |
| `Meta+Alt+Q` | <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>Q</kbd> |

## macOS platform conventions

macOS users expect certain standard keyboard shortcuts and behaviours. Avalonia handles some of these automatically, but others require explicit configuration.

### Standard shortcuts

The following shortcuts are conventions that macOS users expect. Configure them using `NativeMenu` gestures or `KeyBinding`:

| Action | Shortcut | Notes |
|---|---|---|
| Preferences | <kbd>⌘</kbd> <kbd>,</kbd> | Should open your settings/preferences view |
| Quit | <kbd>⌘</kbd> <kbd>Q</kbd> | Handled automatically by the native menu |
| Close Window | <kbd>⌘</kbd> <kbd>W</kbd> | Bind to close the active window |
| Minimize | <kbd>⌘</kbd> <kbd>M</kbd> | Handled automatically |
| Hide | <kbd>⌘</kbd> <kbd>H</kbd> | Handled automatically |
| Full Screen | <kbd>⌘</kbd> <kbd>⌃</kbd> <kbd>F</kbd> | Handled automatically |
| Select All | <kbd>⌘</kbd> <kbd>A</kbd> | Handled automatically in text controls |
| Find | <kbd>⌘</kbd> <kbd>F</kbd> | Bind to your search/find functionality |

### PlatformHotkeyConfiguration

Avalonia automatically adapts common hotkeys to the active platform. On macOS, copy/paste/cut use Cmd rather than Ctrl. You can query the current platform's hotkey mappings at runtime through `PlatformSettings.HotkeyConfiguration`:

```csharp
protected override void OnKeyDown(KeyEventArgs e)
{
    var hotkeys = this.GetPlatformSettings()?.HotkeyConfiguration;
    if (hotkeys?.Copy.Any(g => g.Matches(e)) == true)
    {
        // Handle copy
    }
}
```

This is useful when building custom controls that need to respond to platform-standard shortcuts without hardcoding modifier keys.

## Embedding native views

You can host native macOS views (NSView subclasses) inside an Avalonia control using `NativeControlHost`. This is useful for integrating platform-specific UI components that have no Avalonia equivalent, such as a map view, camera preview, or platform media player.

`NativeControlHost` works by providing a region of the window where a native view is composited alongside the Avalonia rendering surface. To use it, create a platform-specific implementation that returns a handle to the native view:

```csharp
public class NativeControlHostExample : NativeControlHost
{
    protected override IPlatformHandle CreateNativeControlCore(
        IPlatformHandle parent)
    {
        if (OperatingSystem.IsMacOS())
        {
            // Create and return a handle to your NSView
            // The view will be hosted within this control's bounds
        }

        return base.CreateNativeControlCore(parent);
    }

    protected override void DestroyNativeControlCore(
        IPlatformHandle control)
    {
        // Clean up native resources
        base.DestroyNativeControlCore(control);
    }
}
```

Native views rendered this way sit in a separate compositing layer from Avalonia's rendering, so they always appear above or below Avalonia content rather than participating in the normal visual tree z-ordering.

:::note
Embedding native views requires the `net10.0-macos` target framework, since you need access to the macOS APIs to create the native views. See [Accessing the full macOS API surface](#accessing-the-full-macos-api-surface) above.
:::

### Embedding Avalonia in a native macOS app

The reverse is also possible. You can host Avalonia UI inside a native macOS (Cocoa or Mac Catalyst) application by embedding Avalonia's rendering surface as an NSView within your native view hierarchy. This is useful when migrating an existing macOS application to Avalonia incrementally, or when you want to use Avalonia for specific views within an otherwise native app.

## URL protocol handlers

You can register your app to handle custom URL schemes (e.g., `myapp://open`) so that clicking a link in a browser or another app launches yours. Add a `CFBundleURLTypes` entry to your `Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>MyApp</string>
        <key>CFBundleTypeRole</key>
        <string>Viewer</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>myapp</string>
        </array>
    </dict>
</array>
```

With this in place, URLs like `myapp://some-action` will open your application. You can inspect the `Info.plist` files of other apps in `/Applications` to see how they configure their URL schemes.

## File type associations

You can register your app as the handler for specific file types so that double-clicking a file in Finder opens it in your app. Add a `CFBundleDocumentTypes` entry to your `Info.plist`:

```xml
<key>CFBundleDocumentTypes</key>
<array>
    <dict>
        <key>CFBundleTypeName</key>
        <string>Sketch</string>
        <key>CFBundleTypeExtensions</key>
        <array>
            <string>sketch</string>
        </array>
        <key>CFBundleTypeIconFile</key>
        <string>icon.icns</string>
        <key>CFBundleTypeRole</key>
        <string>Viewer</string>
        <key>LSHandlerRank</key>
        <string>Default</string>
    </dict>
</array>
```

| Key | Description |
|---|---|
| `CFBundleTypeName` | A human-readable name for the file type. |
| `CFBundleTypeExtensions` | Array of file extensions to associate (without the leading dot). |
| `CFBundleTypeIconFile` | Icon to display for files of this type. |
| `CFBundleTypeRole` | Your app's role: `Editor` (can read and write), `Viewer` (read-only), or `None`. |
| `LSHandlerRank` | Priority: `Owner` (your app created this type), `Default`, `Alternate`, or `None`. |

## Native code

The Avalonia native macOS code is located at `native/Avalonia.Native/src/OSX`. If you need to modify or debug the native layer, open the `Avalonia.Native.OSX.xcodeproj` project in Xcode.

You can compile changes in Xcode using <kbd>⌘</kbd> <kbd>B</kbd>, then point your Avalonia application to the modified dylib. Find the output path by clicking on the dylib under **Products** in Xcode's project navigator, then specify it in your `AppBuilder`:

```csharp
.With(new AvaloniaNativePlatformOptions
{
    AvaloniaNativeLibraryPath = "[Path to your dylib]",
})
```

### Running as an app bundle during development

Some macOS features require your app to run as a proper `.app` bundle. For example, the Xcode Accessibility Inspector will not recognise your application otherwise.

To achieve this without a full packaging step, modify the output path in your `.csproj` to resemble a bundle structure:

```xml
<OutputPath>bin\$(Configuration)\$(Platform)\MyApp.app/Contents/MacOS</OutputPath>
<AppendTargetFrameworkToOutputPath>false</AppendTargetFrameworkToOutputPath>
<UseAppHost>true</UseAppHost>
```

Then place a valid `Info.plist` in the `Contents` directory. See the [macOS deployment guide](/docs/deployment/macos) for `Info.plist` details.

## Mac Catalyst alternative

Avalonia also supports running iOS apps on macOS through Apple's Mac Catalyst framework. This is a different approach from the Avalonia Native backend described on this page. Mac Catalyst requires a Mac to build and depends on the `maccatalyst` .NET workload, so you lose the ability to cross-compile from Windows or Linux. It is primarily useful when your app depends heavily on UIKit APIs or when embedding Avalonia inside a MAUI hybrid application. For most Avalonia apps, the default macOS backend described above is the recommended choice. See [Mac Catalyst](/docs/platform-specific-guides/ios#mac-catalyst) in the iOS platform guide for details.

## See also

- [Deploying on macOS](/docs/deployment/macos)
- [iOS platform guide](/docs/platform-specific-guides/ios) (includes Mac Catalyst)
- [NativeMenu control reference](/controls/menus/nativemenu)
- [Keyboard and hotkeys](/docs/input-interaction/keyboard-and-hotkeys)
