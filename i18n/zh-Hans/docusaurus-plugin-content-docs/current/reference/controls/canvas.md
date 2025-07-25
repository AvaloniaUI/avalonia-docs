---
description: REFERENCE - Built-in Controls
---

import CanvasContentZoneScreenshot from '/img/reference/controls/canvas/canvas-contentzone.png';
import CanvasChildOverlapScreenshot from '/img/reference/controls/canvas/canvas-child-overlap.png';

# Canvas 画布控件

画布控件在指定的位置（以坐标形式给出）显示其子控件。

每个子控件的位置定义为画布内容区域的边缘与子控件边距区域的外边缘之间的两个距离。例如，这可能是子控件的左上角到画布的左上角，如下图所示：

<img src={CanvasContentZoneScreenshot} alt="" />

:::info
要回顾布局区域的概念，请参阅[这里](../../concepts/layout/layout-zones)。
:::

## 常用属性

你可能会经常使用这些属性：

<table><thead><tr><th width="205">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>Canvas.Left</code></td><td>附加到子控件 - 表示从画布内容区域的内左边缘到子控件（边距区域）的外左边缘的距离。</td></tr><tr><td><code>Canvas.Top</code></td><td>附加到子控件 - 表示从画布内容区域的内上边缘到子控件（边距区域）的外上边缘的距离。</td></tr><tr><td><code>Canvas.Right</code></td><td>附加到子控件 - 表示从画布内容区域的内右边缘到子控件（边距区域）的外右边缘的距离。</td></tr><tr><td><code>Canvas.Bottom</code></td><td>附加到子控件 - 表示从画布内容区域的内下边缘到子控件（边距区域）的外下边缘的距离。</td></tr><tr><td><code>Canvas.ZIndex</code></td><td>附加到子控件 - 这可以覆盖默认的绘制顺序（见下文）。</td></tr></tbody></table>

画布中的子控件按照定义的顺序绘制。这可能导致它们重叠。

:::warning
画布不会调整其子控件的大小。你必须在子控件上设置宽度和高度属性，否则它们将不会显示！
:::

## Z-index

默认情况下，每个子控件的 z-index 为零。然而，画布支持你可以设置的 `Canvas.ZIndex` 附加属性。这将覆盖绘制顺序（数字最大的最后绘制），因此可能会改变子控件的重叠方式。

## 透明度

无论你如何定义绘制顺序，子控件的透明度都会进行渲染。这意味着，当子控件元素重叠时，重叠区域中显示的内容可能会混合，尤其是当顶层控件的透明度值小于一时。

## 示例

```xml
<Canvas Background="AliceBlue" Margin="20">
  <Rectangle Fill="Red" Height="100" Width="100" Margin="10"/>
  <Rectangle Fill="Blue" Height="100" Width="100" Opacity="0.5"
             Canvas.Left="50" Canvas.Top="20"/>
  <Rectangle Fill="Green" Height="100" Width="100" 
             Canvas.Left="60" Margin="40" Canvas.Top="40"/>
  <Rectangle Fill="Orange" Height="100" Width="100" 
             Canvas.Right="70" Canvas.Bottom="60"/>
</Canvas>
```

结果看起来是这样的：

<img src={CanvasChildOverlapScreenshot} alt="" />

:::info
谨慎使用画布面板。虽然它可以方便地定位子控件，但你的用户界面将不再适应应用窗口大小的变化。
:::

## 更多信息

:::info
有关此控件的完整 API 文档，请参阅[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Canvas)。
:::

:::info
在 _GitHub_ 上查看源代码 [`Canvas.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Canvas.cs)
:::