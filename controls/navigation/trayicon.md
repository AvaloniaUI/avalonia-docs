---
id: trayicon
title: TrayIcon
---

import TrayIconScreenshot from '/img/controls/trayicon/trayicon.gif';

# TrayIcon

## Overview

The `TrayIcon` allows an _Avalonia UI_ application to display an icon and a native menu in the system tray. It is supported on _Windows_, _macOS_ and some _Linux_ distributions (it is confirmed to work on _Ubuntu_).

You must define a tray menu in the application XAML file.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="255">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Icon</code></td><td>The icon to display in the system tray. Typically loaded from the application assets.</td></tr><tr><td><code>ToolTipText</code></td><td>Tool tip text displayed when the user hovers over the tray icon.</td></tr><tr><td>TrayIcon.Menu</td><td>The <strong>native menu</strong> control attached to the tray icon.</td></tr></tbody></table>

:::info
You must use a **native menu** with the tray icon, and not the _Avalonia UI_ menu control. For full details about the native menu, see the reference [here](/controls/menus/nativemenu).
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

## More Information

:::info
For the complete API documentation about this control, see here.
:::

:::info
View the source code on GitHub [`TrayIcon.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TrayIcon.cs)
:::
