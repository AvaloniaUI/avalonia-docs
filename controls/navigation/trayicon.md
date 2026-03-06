---
id: trayicon
title: TrayIcon
---

import TrayIconScreenshot from '/img/controls/trayicon/trayicon.gif';

The `TrayIcon` allows an Avalonia application to display an icon and a native menu in the system tray. It is supported on _Windows_, _macOS_ and some _Linux_ distributions (it is confirmed to work on _Ubuntu_).

You must define a tray menu in the application XAML file.

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
|---|---|---|
| `Icon` | `WindowIcon` | The icon to display in the system tray. Typically loaded from the application assets. |
| `ToolTipText` | `string` | Tooltip text displayed when the user hovers over the tray icon. |
| `IsVisible` | `bool` | Controls whether the tray icon is shown. Default is `true`. |
| `Command` | `ICommand` | The command to execute when the tray icon is clicked. |
| `CommandParameter` | `object` | The parameter to pass to the command. |
| `Menu` | `NativeMenu` | The native menu control attached to the tray icon. |

:::info
You must use a **native menu** with the tray icon, and not the Avalonia menu control. For full details about the native menu, see [NativeMenu](/controls/menus/nativemenu).
:::

## Example

This example defines a simple tray icon menu in the `App.xaml` file :

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApplication.App">
  <TrayIcon.Icons>
    <TrayIcons>
      <TrayIcon Icon="/Assets/avalonia-logo.ico" 
                ToolTipText="Avalonia Tray Icon ToolTip">
        <TrayIcon.Menu>
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
        </TrayIcon.Menu>
      </TrayIcon>
    </TrayIcons>
  </TrayIcon.Icons>
</Application>
```

Include the `.ico` file in the `.csproj` file using an `AvaloniaResource` item:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <ItemGroup>
    <AvaloniaResource Include="Assets/avalonia-logo.ico" />
  </ItemGroup>
</Project>
```

<img src={TrayIconScreenshot} alt="" />

## Binding menu commands

Bind tray menu item commands to a view model:

```xml
<TrayIcon Icon="/Assets/app-icon.ico"
          ToolTipText="My Application"
          Command="{Binding ShowWindowCommand}">
    <TrayIcon.Menu>
        <NativeMenu>
            <NativeMenuItem Header="Show" Command="{Binding ShowWindowCommand}" />
            <NativeMenuItem Header="Settings" Command="{Binding OpenSettingsCommand}" />
            <NativeMenuItemSeparator />
            <NativeMenuItem Header="Quit" Command="{Binding QuitCommand}" />
        </NativeMenu>
    </TrayIcon.Menu>
</TrayIcon>
```

## Showing and hiding the tray icon

Toggle visibility at runtime:

```xml
<TrayIcon Icon="/Assets/app-icon.ico"
          IsVisible="{Binding IsMinimizedToTray}"
          ToolTipText="My Application" />
```

## Platform support

| Platform | Support |
|---|---|
| Windows | Full support |
| macOS | Full support |
| Linux | Works on distributions with `StatusNotifierItem` or `AppIndicator` support (confirmed on Ubuntu) |

## See also

- [`TrayIcon.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TrayIcon.cs)
