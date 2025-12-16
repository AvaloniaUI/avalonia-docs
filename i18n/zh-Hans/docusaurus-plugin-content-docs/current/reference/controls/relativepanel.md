---
description: REFERENCE - Built-in Controls
---

# RelativePanel 相对面板

相对面板控件允许您通过指定其子控件相对于其他（同级）子控件或相对于面板本身的位置来排列它们。位置是根据面板控件的内部（内容区）和子控件的边缘区的外边缘计算的。

:::info
要回顾控件布局区域的概念，请参见[这里](../../concepts/layout/layout-zones)。
:::

子控件的默认位置是面板的左上角。

您使用附加的相对位置属性来指定子控件的布局。格式如下：

`RelativePanel.PositionProperty="NameOfSibling"`

其中 `PositionProperty` 属性是相对位置属性之一（见下表），`NameOfSibling` 是其他子控件的名称属性。

:::danger
将相对位置属性的值给定为子控件本身的名称是一个错误。这将是一个循环引用！
:::

您可以为每个子控件指定最多四个相对位置属性——计算顶部、底部、左侧和右侧的边缘。

:::danger
为同一个子控件两次定义相同的相对位置属性是错误的。
:::

指定不同但潜在冲突的相对位置属性不是错误，尽管您可能会发现结果难以理解。

如果多个子控件最终在相同的计算位置上，那么它们将按照它们在 XAML 中出现的顺序绘制，并且可能会重叠或遮挡其他子控件。

:::warning
这意味着您必须给子控件命名，并在任何相对位置属性值中使用正确的名称。如果搞错了，控件将采用默认的（左上角）位置，并可能重叠或遮挡其他控件。
:::

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="348">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>AlignTopWithPanel</code></td><td>布尔值。将子控件的顶边与面板的顶边对齐。</td></tr><tr><td><code>AlignBottomWithPanel</code></td><td>布尔值。附加到子控件以将其底边与面板的底边对齐。</td></tr><tr><td><code>AlignLeftWithPanel</code></td><td>布尔值。附加到子控件以将其左边与面板的左边对齐。</td></tr><tr><td><code>AlignRightWithPanel</code></td><td>布尔值。附加到子控件以将其右边与面板的右边对齐。</td></tr><tr><td><code>AlignHorizontalCenterWithPanel</code></td><td>布尔值。附加到子控件以将其水平中心与面板的水平中心对齐。</td></tr><tr><td><code>AlignVerticalCenterWithPanel</code></td><td>布尔值。附加到子控件以将其垂直中心与面板的垂直中心对齐。</td></tr><tr><td><code>AlignTopWith</code></td><td>附加到子控件以将其顶边与命名同级的顶边对齐。</td></tr><tr><td><code>AlignBottomWith</code></td><td>附加到子控件以将其底边与命名同级的底边对齐。</td></tr><tr><td><code>AlignLeftWith</code></td><td>附加到子控件以将其左边与命名同级的左边对齐。</td></tr><tr><td><code>AlignRightWith</code></td><td>附加到子控件以将其右边与命名同级的右边对齐。</td></tr><tr><td><code>AlignHorizontalCenterWith</code></td><td>附加到子控件以将其水平中心与命名同级的水平中心对齐。</td></tr><tr><td><code>AlignVerticalCenterWith</code></td><td>附加到子控件以将其垂直中心与命名同级的垂直中心对齐。</td></tr><tr><td><code>Above</code></td><td>附加到子控件以将其底边与命名同级的顶边对齐。</td></tr><tr><td><code>Below</code></td><td>附加到子控件以将其顶边与命名同级的底边对齐。</td></tr><tr><td><code>LeftOf</code></td><td>附加到子控件以将其右边与命名同级的左边对齐。</td></tr><tr><td><code>RightOf</code></td><td>附加到子控件以将其左边与命名同级的右边对齐。</td></tr></tbody></table>

## 示例

此 XAML 展示了如何以不同方式排列一些子控件：
<XamlPreview>

```xml
<Border xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        BorderBrush="DarkGray" BorderThickness="1"
        Margin="20">
  <RelativePanel>
    <Rectangle x:Name="RedRect" Fill="Red" Height="50" Width="50"/>
    <Rectangle x:Name="BlueRect" Fill="Blue" Opacity="0.5" Height="50" Width="150"
               RelativePanel.RightOf="RedRect" />
    <Rectangle x:Name="GreenRect" Fill="Green" Height="100"
               RelativePanel.Below="RedRect"
               RelativePanel.AlignLeftWith="RedRect"
               RelativePanel.AlignRightWith="BlueRect"/>
    <Rectangle Fill="Orange"
               RelativePanel.Below="GreenRect"
               RelativePanel.AlignLeftWith="BlueRect"
               RelativePanel.AlignRightWithPanel="True"
               RelativePanel.AlignBottomWithPanel="True"/>
  </RelativePanel>
</Border>
```

</XamlPreview>

以下是关于上述示例的一些说明：

* 红色矩形被赋予了尺寸（50x50）但没有相对位置。因此，它被放置在默认的（左上角）位置。
* 蓝色矩形的不透明度为 50%，以示它没有与其他任何物体重叠。
* 绿色矩形被赋予了高度（100），但没有宽度。其左侧与红色矩形对齐，右侧与蓝色矩形对齐，这样计算其宽度。
* 橙色矩形没有被赋予尺寸。其左侧与蓝色矩形对齐。其右侧和底边与面板的边缘对齐。因此，其尺寸由对齐决定，如果面板本身调整大小，它将会调整大小。

## 更多信息

:::info
要查看此控件的完整 API 文档，请参见[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_RelativePanel)。
:::

:::info
在 _GitHub_ 上查看源代码 [`RelativePanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/RelativePanel.cs)
:::