---
description: REFERENCE - Built-in Controls
---

import DockPanelTopScreenshot from '/img/reference/controls/dockpanel/dockpanel-top.png'; 

# DockPanel 边缘布局面板

边缘布局面板（Dock Panel）控件可以沿着指定的“停靠边缘”（顶部、底部、左侧和右侧）排列其子控件，最后一个子控件填充剩余的空间。边缘布局面板可以保持与停靠边缘平行的子控件尺寸，使得子控件沿停靠边缘填满所有可用空间。

例如，如果一个子控件的停靠边缘被定义为“顶部”，并且它有一个定义的高度但没有宽度，它将会这样绘制：

<img src={DockPanelTopScreenshot} alt=""/>

:::warning
你必须定义与停靠边缘垂直的子控件尺寸，否则它将不会显示。
:::

你可以选择性地定义与停靠边缘平行的尺寸。在这种情况下，子控件将根据同一方向上的对齐设置进行绘制。例如，一个定义了宽度并停靠在顶部边缘的子控件，将遵循其水平对齐属性（默认居中）。

子控件按照它们在XAML中定义的顺序进行停靠。当 _Avalonia UI_ 正在调整子控件的大小时，会考虑到任何先前绘制的控件。这意味着永远不会有重叠。

最后定义的子控件将填满任何剩余的空间。

:::warning
你必须始终定义一个最后的子控件（没有停靠属性），否则停靠计算将无法正确进行。这意味着一个边缘布局面板需要至少两个子控件。
:::

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="266">属性</th><th>描述</th></tr></thead><tbody><tr><td>DockPanel.Dock<code>.Left</code></td><td>附加到一个子控件 - 将其停靠在左侧。</td></tr><tr><td>DockPanel.Dock<code>.Top</code></td><td>附加到一个子控件 - 将其停靠在顶部边缘。</td></tr><tr><td>DockPanel.Dock<code>.Right</code></td><td>附加到一个子控件 - 将其停靠在右侧。</td></tr><tr><td>DockPanel.Dock<code>.Bottom</code></td><td>附加到一个子控件 - 将其停靠在底部边缘。</td></tr></tbody></table>

## 示例

将橙色矩形的透明度设置为0.5，以证实图形间没有重叠。

<XamlPreview>

```xml
<DockPanel xmlns="https://github.com/avaloniaui"
           Width="300" Height="300">
    <Rectangle Fill="Red" Height="100" DockPanel.Dock="Top"/>
    <Rectangle Fill="Blue" Width="100" DockPanel.Dock="Left" />
    <Rectangle Fill="Green" Height="100" DockPanel.Dock="Bottom"/>
    <Rectangle Fill="Orange" Width="100" DockPanel.Dock="Right" Opacity="0.5"/>
    <Rectangle Fill="Gray" />
</DockPanel>
```

</XamlPreview>

## 更多信息

:::info
有关此控件的完整 API 文档，请参阅[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_DockPanel)。
:::

:::info
在 _GitHub_ 上查看源代码 [`DockPanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/DockPanel.cs)
:::