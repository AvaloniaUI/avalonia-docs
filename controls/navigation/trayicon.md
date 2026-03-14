---
id: trayicon
title: TrayIcon
description: A system tray icon control that displays an icon and native context menu in the operating system notification area.
doc-type: reference
---

import TrayIconScreenshot from '/img/controls/trayicon/trayicon.gif';

The [`TrayIcon`](/api/avalonia/controls/trayicon) control lets your Avalonia application display an icon and a native menu in the system tray (notification area). It is supported on Windows, macOS, and some Linux distributions (confirmed to work on Ubuntu).

You define tray icons in your `App.axaml` file using the `TrayIcon.Icons` attached property on the `Application` element.

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
|---|---|---|
| `Icon` | `WindowIcon` | The icon to display in the system tray. Typically loaded from your application assets. |
| `ToolTipText` | `string` | Tooltip text displayed when the user hovers over the tray icon. |
| `IsVisible` | `bool` | Controls whether the tray icon is shown. Default is `true`. |
| `Command` | `ICommand` | The command to execute when the user clicks the tray icon. |
| `CommandParameter` | `object` | The parameter to pass to the `Command`. |
| `Menu` | `NativeMenu` | The native menu control attached to the tray icon. |

:::info
You must use a `NativeMenu` with the tray icon, not the Avalonia `Menu` control. For full details about native menus, see the [NativeMenu](/controls/menus/nativemenu) reference.
:::

## Example

This example defines a simple tray icon with a nested menu in the `App.axaml` file:

```xml title="App.axaml"
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
                <NativeMenuItem Header="Option 1" />
                <NativeMenuItem Header="Option 2" />
                <NativeMenuItemSeparator />
                <NativeMenuItem Header="Option 3" />
              </NativeMenu>
            </NativeMenuItem>
          </NativeMenu>
        </TrayIcon.Menu>
      </TrayIcon>
    </TrayIcons>
  </TrayIcon.Icons>
</Application>
```

Include the `.ico` file in your `.csproj` file as an `AvaloniaResource`:

```xml title="MyApplication.csproj"
<Project Sdk="Microsoft.NET.Sdk">
  <ItemGroup>
    <AvaloniaResource Include="Assets/avalonia-logo.ico" />
  </ItemGroup>
</Project>
```

<img src={TrayIconScreenshot} alt="TrayIcon with a context menu shown in the system tray" />

## Binding menu commands

You can bind tray menu item commands to a view model. The `Command` on the `TrayIcon` itself fires when the user clicks the icon directly, while each `NativeMenuItem` can have its own `Command`:

```xml title="App.axaml"
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

:::tip
To bind commands to a view model, set the `DataContext` on your `Application` object or use a compiled binding with `x:DataType` so the tray icon can resolve the binding path.
:::

## Showing and hiding the tray icon

You can toggle tray icon visibility at runtime by binding the `IsVisible` property. This is useful when your application minimizes to the tray:

```xml title="App.axaml"
<TrayIcon Icon="/Assets/app-icon.ico"
          IsVisible="{Binding IsMinimizedToTray}"
          ToolTipText="My Application" />
```

## Practical notes

- The `TrayIcon` is defined at the `Application` level, not inside a `Window`. It persists regardless of which windows are open.
- On macOS, clicking the tray icon shows the menu. On Windows, right-clicking shows the menu and left-clicking fires the `Command`.
- You can define multiple `TrayIcon` elements inside a single `TrayIcons` collection if your application requires more than one tray icon.
- If the tray icon does not appear on Linux, verify that your desktop environment supports `StatusNotifierItem` or `AppIndicator`. GNOME users may need the AppIndicator extension.

## Platform support

| Platform | Support |
|---|---|
| Windows | Full support |
| macOS | Full support |
| Linux | Works on distributions with `StatusNotifierItem` or `AppIndicator` support (confirmed on Ubuntu) |

## See also

- [NativeMenu](/controls/menus/nativemenu)
- [Window](/controls/windowing/window)
- [`TrayIcon` source code (GitHub)](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TrayIcon.cs)
