---
description: REFERENCE - Built-in Controls
---

import BorderPodLookScreenshot from '/img/reference/controls/border/border-pod-look.png';
import BorderDropShadowScreenshot from '/img/reference/controls/border/border-drop-shadow.png'; 

# Border 边框

边框控件为（单个）子控件装饰边框和背景。它还可以用于显示圆角。

## 常用属性

您可能最常使用这些属性：

<table><thead><tr><th width="261">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>Background</code></td><td>背景颜色。</td></tr><tr><td><code>BorderBrush</code></td><td>边框颜色。</td></tr><tr><td><code>BorderThickness</code></td><td>边框线条厚度（整数）。</td></tr><tr><td><code>CornerRadius</code></td><td>所有四个角的半径（一个值），或指定为列表 - 见下文。</td></tr><tr><td><code>BoxShadow</code></td><td>定义阴影（见下文）。</td></tr></tbody></table>

## 圆角属性

您可以将圆角属性的值设置为单个值。在这种情况下，_Avalonia UI_ 将在子控件的所有四个角上使用相同的半径。

或者，您可以指定一个值列表；这必须采用以下两种格式之一。

当列表中只有两个值时，_Avalonia UI_ 将使用以下模式解释它们：

`CornerRadius="上方值 下方值"`

左上角和右上角的半径由第一个值设置，左下角和右下角的半径由第二个值设置。

当列表中有四个值时，_Avalonia UI_ 将使用以下模式解释它们：

`CornerRadius="左上值 右上值 右下值 左下值"`

:::warning
如果您使用四值模式；您必须提供所有四个值，即使其中一个为零。列表中不允许有三个值。
:::

### 示例

此示例添加了一些边框控件以在布局中创建“pod”外观：

```xml
<StackPanel>
  <Border Background="Gainsboro"
        BorderBrush="Black"
        BorderThickness="2"
        CornerRadius="3"
        Padding="10" Margin="10">
    <TextBlock>Box 1</TextBlock>
  </Border>
  <Border Background="Gainsboro"
          BorderBrush="Black"
          BorderThickness="2"
          CornerRadius="3"
          Padding="10" Margin="10">
    <TextBlock>Box 2</TextBlock>
  </Border>
</StackPanel>
```

<img src={BorderPodLookScreenshot} alt=""/>

## 盒廓阴影

您可以通过设置其盒廓阴影属性来定义边框的阴影。您可以使用以下方式指定单个盒廓阴影：

* 一个可选的 `inset` 关键字 - 这将在边框内绘制阴影 - 不常用！
* 两个、三个或四个长度值 - 见下文。
* 一个颜色值。

如果只给出两个长度值，将它们解释为 `offset-x` 和 `offset-y`。如果给出第三个值，则将其解释为 `blur-radius`，如果给出第四个值，则将其解释为 `spread-radius`。

:::info
您可以通过提供逗号分隔的阴影定义列表来指定多个阴影。
:::

此表描述了盒廓阴影值，按它们出现的顺序：

<table><thead><tr><th width="203">值</th><th>描述</th></tr></thead><tbody><tr><td><code>inset</code></td><td>如果未指定（默认），则假定阴影为投影（如同盒廓被抬高在内容之上）。inset 关键字的存在将阴影更改为框架内部（如同内容被压入盒廓内部）。内嵌阴影绘制在边框内（即使是透明的），并且在背景之上但在任何内容之下</td></tr><tr><td><code>offset-x</code> </td><td>指定水平距离。负值将阴影放置在元素的左侧。</td></tr><tr><td><code>offset-y</code></td><td>指定垂直距离。负值将阴影放置在元素的上方。</td></tr><tr><td><code>blur-radius</code></td><td>此值越大，模糊效果越大，因此阴影变得更大且更轻。负值不允许。如果未指定，则使用默认值（零），阴影边缘是锐利的。</td></tr><tr><td><code>spread-radius</code></td><td>正值将导致阴影扩展和变大，负值将导致阴影收缩。如果未指定，它将为 0（阴影将与元素大小相同）。</td></tr><tr><td><code>color</code></td><td>使用颜色名称（例如 Red），或带有 # 前缀的十六进制颜色值的阴影颜色 (例如 #dadada)，或使用色彩函数（例如 rgb(13, 110, 253)、hsl(215, 98%, 52%)。</td></tr></tbody></table>

:::info
如果两个偏移值都设置为零，阴影将放置在元素后面，并且只有在同时或者单独设置了 `blur-radius` , `spread-radius` 时才会生成模糊效果。
:::

### 示例

这是一个投影的示例：

```xml
<StackPanel>
  <Border Background="Gainsboro"
        BorderBrush="Black"
        BorderThickness="2"
        CornerRadius="3"
          BoxShadow="5 5 10 0 DarkGray"
        Padding="10" Margin="40">
    <TextBlock>Box with a drop shadow</TextBlock>
  </Border>
</StackPanel>
```

<img src={BorderDropShadowScreenshot} alt=""/>

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[此处](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Border)。
:::

:::info
在 _GitHub_ 上查看源代码 [`Border.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Border.cs)
:::

