---
description: REFERENCE - Built-in Controls
---

import PanelOverlapBlendScreenshot from '/img/reference/controls/panel/panel-overlap-blend.png';

# Panel 面板

面板是最基本的控件，可包含多个子控件。子控件根据其水平和垂直对齐属性进行绘制，并按照它们在 XAML 中出现的顺序排列。如果子控件占据相同的空间，则会发生重叠。

:::info
有关使用其他面板的讨论，请参见[这里](/docs/basics/user-interface/building-layouts/panels-overview.md)。
:::

## 示例

此示例使用一些50%的透明度来演示子控件的重叠。

```xml
<Panel Height="300" Width="300">
    <Rectangle Fill="Red" Height="100" VerticalAlignment="Top"/>
    <Rectangle Fill="Blue" Opacity="0.5" Width="100" HorizontalAlignment="Right" />
    <Rectangle Fill="Green" Opacity="0.5" Height="100" VerticalAlignment="Bottom"/>
    <Rectangle Fill="Orange" Width="100" HorizontalAlignment="Left"/>
</Panel>
```

<img src={PanelOverlapBlendScreenshot} alt="" />

## 其他面板控件

还有其他更实用的面板，它们提供了更好的控制，以定位其子控件：

* 堆栈面板
* 边缘布局面板
* 相对面板
* 顺序换行面板

如果您对面板中子控件的定位有特定要求，您可以基于面板创建自己的自定义控件。

:::info
有关如何创建自定义面板控件的说明，请参见[这里](/docs/guides/custom-controls/create-a-custom-panel.md)。
:::

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Panel)。
:::

:::info
在 GitHub 上查看源代码 [`Panel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Panel.cs)
:::