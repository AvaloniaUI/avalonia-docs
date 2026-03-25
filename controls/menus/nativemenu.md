---
id: nativemenu
title: NativeMenu
---

The `NativeMenu` can display a menu on _macOS_ and some Linux distributions. It can be used in several contexts:

- **Application menu** via `NativeMenu.Menu` on `Application` (the leftmost menu in the macOS menu bar)
- **Window menus** via `NativeMenu.Menu` on `Window` (standard menus like File and Edit)
- **Dock menu** via `NativeDock.Menu` on `Application` (right-click menu on the macOS Dock icon)
- **Tray icon menu** via the `Menu` property on `TrayIcon`

You can create sub-menus by nesting `<MenuItem>` elements.

You can add menu separator lines by including a `<NativeMenuItemSeparator>` element or by adding a menu item with its header set to the minus sign, like this:

```xml
<NativeMenuItemSeparator Header="-" />
```

## Useful properties

You will probably use these properties most often:

<table>
  <thead>
    <tr><th width="204">Property</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>Header</code></td><td>The menu caption.</td></tr>
    <tr><td><code>Command</code></td><td>A command to execute when the user clicks the menu item.</td></tr>
    <tr><td><code>Gesture</code></td><td>The keyboard shortcut associated with the menu item.</td></tr>
    <tr><td><code>ToggleType</code></td><td>The toggle behavior: <code>None</code> (default), <code>CheckBox</code>, or <code>Radio</code>. Uses the <code>MenuItemToggleType</code> enum.</td></tr>
    <tr><td><code>IsChecked</code></td><td>Whether the menu item is checked. Only applies when <code>ToggleType</code> is <code>CheckBox</code> or <code>Radio</code>.</td></tr>
  </tbody>
</table>

## Example

This example modifies the default application menu in macOS.

:::info
Changing the application's `Name` property will cause the application menu header to change. In this example, it is set to *Sample Application*.
:::

![image](https://github.com/user-attachments/assets/d30bab47-f133-4f79-9bdb-d4fb4569ed61)

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="NativeMenuTest.App"
             xmlns:local="using:NativeMenuTest"
             RequestedThemeVariant="Default"
             Name="Sample Application">
             <!-- "Default" ThemeVariant follows system theme variant. "Dark" or "Light" are other available options. -->

    <Application.DataTemplates>
        <local:ViewLocator/>
    </Application.DataTemplates>

    <NativeMenu.Menu>
        <NativeMenu>
            <NativeMenuItem Header="About This Application…" Click="AppAbout_OnClick" />
            <NativeMenuItem Header="Preferences…" Click="AppPreferences_OnClick" />
        </NativeMenu>
    </NativeMenu.Menu>
  
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

You will also have to add the appropriate event handlers in the code-behind.

```csharp
private void AppAbout_OnClick(object? sender, System.EventArgs args) {

}

private void AppPreferences_OnClick(object? sender, System.EventArgs args) {
    
}
```

## Example

This example adds a *File* menu and an *Edit* menu. For context regarding where in the XAML the `NativeMenu.Menu` element should go, other XML tags are included but are missing attributes necessary for the application to function for brevity.

```xml
<Window>
    <Design.DataContext />

    <NativeMenu.Menu>
        <NativeMenu>
            <NativeMenuItem Header="File" IsVisible="true">
                <NativeMenu>                    
                    <NativeMenuItem Header="Open…" Click="FileOpen_OnClick" Gesture="Meta+O" />
                    <NativeMenuItem Header="Save As…" Click="FileSaveAs_OnClick" Gesture="Meta+Shift+S" />
                    <NativeMenuItem Header="Save As…" Click="FileSaveAs_OnClick" Gesture="Meta+A" />
                </NativeMenu>
            </NativeMenuItem>
            <NativeMenuItem Header="Edit" IsEnabled="true">
                <NativeMenu>
                    <NativeMenuItem Header="Cut" Command="{Binding CutCommand}" Gesture="Meta+X" />
                    <NativeMenuItem Header="Copy" Command="{Binding CopyCommand}" Gesture="Meta+C" />
                    <NativeMenuItem Header="Past" Command="{Binding PasteCommand}" Gesture="Meta+V" />
                </NativeMenu>
            </NativeMenuItem>
        </NativeMenu>
    </NativeMenu.Menu>

    <TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>

</Window>
```

In the view-model, you would then add the command functions:

```csharp
public void CutCommand() { }

public void CopyCommand() { }

public void PasteCommand() { }
```

### Gesture format

The `Gesture` attribute is a `+`-delimited list of key modifiers following by a `+`, then followed by a single key character (which itself may be `+`). Permissible modifiers include `Alt`, `Control`, `Shift`, and `Meta`. If the `Gesture` attribute is the empty string or contains only a single key character, no exception will be thrown but the gesture will not activate the menu item. If a key modifier is provided without a key, or if the attribute value isn't formatted correctly, an `ArgumentException` will be thrown. For more details, see the source code for [`KeyGesture`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/KeyGesture.cs), [`Key`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/Key.cs), and [`KeyModifier`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/IKeyboardDevice.cs).

:::info
Note that the menu item will not be enabled without either a code-behind `Click` event handler or a function bound using the `Command` attribute.
:::

:::info
Note that on macOS, a menu bar-level `NativeMenuItem` with the header `Edit` will include some additional macOS features by default.
:::

## Example

This example defines a native menu that can be attached to a tray icon:

```xml
<NativeMenu>
  <NativeMenuItem Header="Settings">
    <NativeMenu>
      <NativeMenuItem Header="Option 1"   />
      <NativeMenuItem Header="Option 2"   />
      <NativeMenuItemSeparator />
      <NativeMenuItem Header="Option 3"  />
    </NativeMenu>
  </NativeMenuItem>
</NativeMenu>
```

## Example

This example defines a dock menu that appears when right-clicking the application icon in the macOS Dock:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.App">

    <NativeDock.Menu>
        <NativeMenu>
            <NativeMenuItem Header="New Window" Click="NewWindow_OnClick" />
            <NativeMenuItemSeparator />
            <NativeMenuItem Header="Show Main Window" Click="ShowMainWindow_OnClick" />
        </NativeMenu>
    </NativeDock.Menu>
</Application>
```

:::note
`NativeDock.Menu` only works on macOS. On other platforms, the property is ignored.
:::

## See also

- [NativeMenu API reference](/api/avalonia/controls/nativemenu)
- [`NativeMenu.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/NativeMenu.cs)
- [macOS platform guide](/docs/platform-specific-guides/macos#dock-menu)
