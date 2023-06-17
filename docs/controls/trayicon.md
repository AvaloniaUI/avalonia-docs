---
id: trayicon
title: TrayIcon
---

## Overview

The `TrayIcon` control allows an Avalonia application to display an icon and a native menu in the system tray. It is supported on Windows, macOS and some Linux distributions (confirmed to work on Ubuntu). 

## Properties


| Property | Description |
| :--- | :--- |
| `Icon` | Icon to display on the tray, from the assets |
| `ToolTipText` | Text displayed upon hovering the icon |

## Menu

The `TrayIcon` is used with a [`NativeMenu`](https://docs.avaloniaui.net/docs/controls/nativemenu). It has the same capabilities and can be used with commands, according to the MVVM design pattern.

## Example usage

In the `Application.xaml` file : 

```xml
<TrayIcon.Icons>
    <TrayIcons>
      <TrayIcon Icon="/Assets/test_icon.ico" ToolTipText="Avalonia Tray Icon ToolTip">
        <TrayIcon.Menu>
          <NativeMenu>
            <NativeMenuItem Header="Settings">
              <NativeMenu>
                <NativeMenuItem Header="Option 1" ToggleType="Radio" IsChecked="True" Command="{Binding ToggleCommand}" />
                <NativeMenuItem Header="Option 2" ToggleType="Radio" IsChecked="True" Command="{Binding ToggleCommand}" />
                <NativeMenuItemSeparator />
                <NativeMenuItem Header="Option 3" ToggleType="CheckBox" IsChecked="True" Command="{Binding ToggleCommand}" />
                <NativeMenuItem Icon="/Assets/test_icon.ico" Header="Restore Defaults" Command="{Binding ToggleCommand}" />
                <NativeMenuItem Header="Disabled option" IsEnabled="False" />
              </NativeMenu>
            </NativeMenuItem>
            <NativeMenuItem Header="Exit" Command="{Binding ExitCommand}" />
          </NativeMenu>
        </TrayIcon.Menu>
      </TrayIcon>
    </TrayIcons>
  </TrayIcon.Icons>
```
