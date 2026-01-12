---
description: REFERENCE - Built-in Controls
---

import SliderScreenshot from '/img/reference/controls/slider/slider.gif';
import SliderMaxValueScreenshot from '/img/reference/controls/slider/slider-max-value.gif';

# Slider 滑块

滑块控件通过沿轨道长度移动滑块按钮的相对位置来展示其数值。位置是相对于最大值和最小值而定的。

在滑块按钮上进行拖动交互可以改变值，使其在最大值和最小值之间变动。键盘和点击交互也可以微调数值。

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="197">属性</th><th>描述</th></tr></thead><tbody><tr><td>Maximum</td><td>设置最大值。</td></tr><tr><td>Minimum</td><td>设置最小值。</td></tr></tbody></table>

## 示例

在此示例中，滑块的值将显示在下方的文本块中，通过绑定到一个控件实现。

:::info
要了解如何将一个控件绑定到另一个控件，请参阅[这里](/docs/guides/data-binding/binding-to-controls.md)的指南。
:::

这里的最大值和最小值是默认的（分别为0和100）。

```xml
<StackPanel Margin="20">
  <TextBlock Text="{Binding #slider.Value}" 
              HorizontalAlignment="Center"/>
  <Slider x:Name="slider" />
</StackPanel>
```

在Windows上，滑块看起来是这样的：

<img src={SliderScreenshot} alt="" />

## 更多信息

要获取关于此控件的完整API文档，请查看[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Slider)。

在_GitHub_上查看源代码 [`Slider.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Slider.cs)