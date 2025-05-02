---
title: NativeMenu
description: REFERENCE - Built-in Controls
---

# NativeMenu

The `NativeMenu` can display a menu on _macOS_ and some Linux distributions.

You can create sub-menus by nesting `<MenuItem>` elements.

You can add menu separator lines by including a `<NativeMenuItemSeparator>` element or by adding a menu item with its header set to the minus sign, like this:

```xml
<NativeMenuItemSeparator Header="-" />
```

## Useful Properties

You will probably use these properties most often:

<table>
  <thead>
    <tr><th width="204">Property</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>Header</code></td><td>The menu caption.</td></tr>
    <tr><td><code>Command</code></td><td>A command to execute when the user clicks the menu item.</td></tr>
    <tr><td><code>Gesture</code></td><td>The keyboard shortcut to associated with the menu item.</td></tr>
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

```C#
private void AppAbout_OnClick(object? sender, System.EventArgs args) {

}

private void AppPreferences_OnClick(object? sender, System.EventArgs args) {
    
}
```

## Example

This example adds a *File* menu and an *Edit* menu. For context regarding where in the XAML the `NativeMenu.Menu` element should go, other XML tags are included but are missing attributes necessary for the application to function for brevity.

```Xml
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

```C#
public void CutCommand() { }

public void CopyCommand() { }

public void PasteCommand() { }
```

:::info
Note that the menu item will not be enabled without either a code-behind `Click` event handler or a function bound using the `Command` attribute.
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

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/NativeMenu/).
:::

:::info
View the source code on GitHub [NativeMenu.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/NativeMenu.cs)
:::
