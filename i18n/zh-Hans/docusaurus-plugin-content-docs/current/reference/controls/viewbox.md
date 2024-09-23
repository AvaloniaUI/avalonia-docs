---
description: REFERENCE - Built-in Controls
---

import ViewboxScaleUniformBothScreenshot from '/img/reference/controls/viewbox/viewbox-scale-uniform-both.gif';
import ViewboxScaleUniformFillBothScreenshot from '/img/reference/controls/viewbox/viewbox-scale-uniformtofill-both.gif';
import ViewboxScaleFillBothScreenshot from '/img/reference/controls/viewbox/viewbox-scale-fill-both.gif';
import ViewboxScaleNoneBothScreenshot from '/img/reference/controls/viewbox/viewbox-scale-none-both.gif';

import ViewboxScaleUniformDownOnlyScreenshot from '/img/reference/controls/viewbox/viewbox-uniform-downonly.gif';
import ViewboxScaleUniformUpOnlyScreenshot from '/img/reference/controls/viewbox/viewbox-uniform-uponly.gif';

# Viewbox 视图盒

`Viewbox` 是一个可以缩放其内容的容器控件。可以定义内容的拉伸方式，以及拉伸发生的方向（拉伸方向）。

## 常用属性

你可能最常使用这些属性：

| 属性               | 默认值  | 描述                                                         |
| ------------------ | ------- |--------------------------------------------------------------|
| `Stretch`          | Uniform | 决定内容如何适应可用空间。                                   |
| `StretchDirection` | Both    | 决定缩放何时发生。                                           |

`Stretch` 属性的值如下：

<table><thead><tr><th width="250">Stretch</th><th>描述</th></tr></thead><tbody><tr><td><code>Uniform</code></td><td>(默认) 内容被调整大小以适应容器的尺寸，同时保持其原生的宽高比。</td></tr><tr><td><code>Fill</code></td><td>内容被调整大小以填充容器的尺寸。宽高比不被保持。</td></tr><tr><td><code>UniformToFill</code></td><td>内容被调整大小以完全填充容器，同时保持其原生的宽高比。然而，如果内容的宽高比与分配空间的宽高比不匹配，则内容的一部分可能会被隐藏。</td></tr></tbody></table>

`StretchDirection` 属性的值如下：

| Stretch Direction  | 描述                                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `UpOnly`           | 仅当内容小于可用空间时才缩放内容。如果内容较大，则不进行缩小。                                                                     |
| `DownOnly`         | 仅当内容大于可用空间时才缩放内容。如果内容较小，则不进行放大。                                                                     |
| `Both`             | (默认) 始终根据拉伸模式适应可用空间。                                                                                              |

### 示例

这个简单的示例展示了一个 `Viewbox` 以统一的方式放大一个圆（拉伸和方向均为默认值）。

```xml
<Viewbox Stretch="Uniform" Width="300" Height="300">
   <Ellipse Width="50" Height="50" Fill="CornflowerBlue" />  
</Viewbox>
```

### 演示

以下演示展示了不同的拉伸和拉伸方向属性设置的组合效果。第一组展示了拉伸属性的效果：

<table><thead><tr><th width="275">Stretch 值</th><th>演示</th></tr></thead><tbody><tr><td><code>Uniform</code></td><td><img src={ViewboxScaleUniformBothScreenshot} alt="" data-size="original"/></td></tr><tr><td><code>UniformToFill</code></td><td><img src={ViewboxScaleUniformFillBothScreenshot} alt="" data-size="original"/></td></tr><tr><td><code>Fill</code></td><td><img src={ViewboxScaleFillBothScreenshot} alt="" data-size="original"/></td></tr><tr><td><code>None</code></td><td><img src={ViewboxScaleNoneBothScreenshot} alt="" data-size="original"/></td></tr></tbody></table>

第二组演示展示了拉伸方向属性的效果：

<table><thead><tr><th width="276">Stretch Direction</th><th>演示</th></tr></thead><tbody><tr><td><code>UpOnly</code></td><td><img src={ViewboxScaleUniformUpOnlyScreenshot} alt="" /></td></tr><tr><td><code>DownOnly</code></td><td><img src={ViewboxScaleUniformDownOnlyScreenshot} alt="" /></td></tr></tbody></table>

## 更多信息

:::info
有关此控件的完整 API 文档，请参见 [这里](http://reference.avaloniaui.net/api/Avalonia.Controls/Viewbox/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`Viewbox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Viewbox.cs)
:::

