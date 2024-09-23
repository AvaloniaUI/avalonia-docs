---
description: REFERENCE - Built-in Controls
---

import TrayIconScreenshot from '/img/reference/controls/trayicon/trayicon.gif';

# TrayIcon 托盘图标

## 概述

托盘图标允许 _Avalonia UI_ 应用程序在系统托盘中显示图标和本地菜单。它支持 _Windows_、_macOS_ 和一些 _Linux_ 发行版（已确认在 _Ubuntu_ 上工作）。

您必须在应用程序的 XAML 文件中定义托盘菜单。

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="255">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>Icon</code></td><td>在系统托盘中显示的图标。通常从应用程序资源中加载。</td></tr><tr><td><code>ToolTipText</code></td><td>当用户将鼠标悬停在托盘图标上时显示的工具提示文本。</td></tr><tr><td>TrayIcon.Menu</td><td>附加到托盘图标的<strong>本地菜单</strong>控件。</td></tr></tbody></table>

:::info
您必须使用托盘图标的**本地菜单**，而不是 _Avalonia UI_ 菜单控件。有关本地菜单的详细信息，请参见[此处](./nativemenu.md)的参考。
:::

## 示例

此示例在 `App.xaml` 文件中定义了一个简单的托盘图标菜单：

```xml
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
```

<img src={TrayIconScreenshot} alt="" />

## 更多信息

:::info
有关此控件的完整 API 文档，请参见此处。
:::

:::info
在 GitHub 上查看源代码 [`TrayIcon.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TrayIcon.cs)
:::

