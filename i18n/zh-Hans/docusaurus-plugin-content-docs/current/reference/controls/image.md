---
description: REFERENCE - Built-in Controls
---

import ImageUnscaledScreenshot from '/img/reference/controls/image/image-unscaled.png';
import ImageUniformToFillScreenshot from '/img/reference/controls/image/image-uniform-to-fill.png';

# Image 图像

图像可以从指定的图像源显示栅格图像。源可以是：

* 一个字符串常量，对应一个应用程序资源，
* 从资源的绑定名称加载为位图（通过使用绑定转换器），
* 或者可以直接从内存流加载为位图。

图像可以用来组成其他控件的内容。例如，您可以使用图像控件创建一个图形按钮。

显示的图像可以被调整大小和缩放。默认的缩放设置（两个方向上均匀拉伸）将导致图像适应给定的大小（宽度和/或高度）。

:::info
图像的缩放设置与视图框的相同，参见[ViewBox](viewbox.md)。

## 示例

此示例展示了一个位图资源被加载到图像控件中，其中高度和宽度被限制，但缩放设置保持默认。图像本身不是正方形，但图像的宽度和高度设置为相同的值。包括矩形是为了给出图像被缩放的一个概念：

```xml
<Panel>
  <Rectangle Height="300" Width="300" Fill="LightGray"/>
  <Image Margin="20" Height="200" Width="200" 
         Source="avares://AvaloniaControls/Assets/pipes.jpg"/>
</Panel>
```

<img src={ImageUnscaledScreenshot} alt="" />

在下一个示例中，引入了 `UniformToFill` 的拉伸设置，使得图像完全填满指定的高度，但会裁剪掉超出指定宽度的部分。图像没有因此处理而失真。

```xml
<Panel>
  <Rectangle Height="300" Width="300" Fill="LightGray"></Rectangle>
  <Image Margin="20" Height="200" Width="200" 
         Stretch="UniformToFill"
         Source="avares://AvaloniaControls/Assets/pipes.jpg"/>
</Panel>
```

<img src={ImageUniformToFillScreenshot} alt="" />

## 更多信息

:::info
关于此控件的完整 API 文档，请参见[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/Image/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`Image.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Image.cs)
:::