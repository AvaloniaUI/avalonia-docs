---
description: REFERENCE - Built-in Controls
---

import WrapPanelHorizontalScreenshot from '/img/reference/controls/wrappanel/wrappanel-horizontal.png';
import WrapPanelVerticalScreenshot from '/img/reference/controls/wrappanel/wrappanel-vertical.png';

# WrapPanel 顺序换行面板

WrapPanel 使用默认排列方式将多个子元素从左到右依次排列，直到宽度不够时换行（包括任何边距和边框）。当没有剩余空间时，它会开始新的一行。

当 Orientation 属性设置为 Vertical 时，排列方式为从上到下，当没有剩余高度时开始新的一列。

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="261">属性</th><th>描述</th></tr></thead><tbody><tr><td>Orientation</td><td>更改排列方向。</td></tr></tbody></table>

## 示例

```xml
<WrapPanel>
    <Rectangle Fill="Navy" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Yellow" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Green" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Red" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Purple" Width="100" Height="100" Margin="20"/>
</WrapPanel>
```

<img src={WrapPanelHorizontalScreenshot} alt="" />

```xml
<WrapPanel Orientation="Vertical">
    <Rectangle Fill="Navy" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Yellow" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Green" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Red" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Purple" Width="100" Height="100" Margin="20"/>
</WrapPanel>
```

<img src={WrapPanelVerticalScreenshot} alt="" />

### 更多信息

:::info
有关此控件的完整 API 文档，请参见[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_WrapPanel)。
:::

:::info
在 _GitHub_ 上查看源代码 [`WrapPanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/WrapPanel.cs)
:::

