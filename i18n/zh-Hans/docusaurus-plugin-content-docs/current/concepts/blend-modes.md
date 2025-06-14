---
title: 位图混合模式
description: 概念
---

import BlendModeCat from '/img/concepts/blend/Cat.jpg';
import BlendModeOverlayColor from '/img/concepts/blend/Overlay-Color.png';

import BlendModeOverlay from '/img/concepts/blend/Overlay.png';
import BlendModePlus from '/img/concepts/blend/Plus.png';
import BlendModeSaturation from '/img/concepts/blend/Saturation.png';
import BlendModeScreen from '/img/concepts/blend/Screen.png';
import BlendModeSoftLight from '/img/concepts/blend/SoftLight.png';
import BlendModeColor from '/img/concepts/blend/Color.png';
import BlendModeColorBurn from '/img/concepts/blend/ColorBurn.png';
import BlendModeColorDodge from '/img/concepts/blend/ColorDodge.png';
import BlendModeDarken from '/img/concepts/blend/Darken.png';
import BlendModeDifference from '/img/concepts/blend/Difference.png';
import BlendModeExclusion from '/img/concepts/blend/Exclusion.png';
import BlendModeHardLight from '/img/concepts/blend/HardLight.png';
import BlendModeHue from '/img/concepts/blend/Hue.png';
import BlendModeLighten from '/img/concepts/blend/Lighten.png';
import BlendModeLuminosity from '/img/concepts/blend/Luminosity.png';
import BlendModeMultiply from '/img/concepts/blend/Multiply.png';
import BlendModeNothing from '/img/concepts/blend/Nothing.png';

import BlendModeA from '/img/concepts/blend/A.png';
import BlendModeB from '/img/concepts/blend/B.png';

import BlendModeDestination from '/img/concepts/blend/Destination.png';
import BlendModeDestinationAtop from '/img/concepts/blend/DestinationAtop.png';
import BlendModeDestinationIn from '/img/concepts/blend/DestinationIn.png';
import BlendModeDestinationOut from '/img/concepts/blend/DestinationOut.png';
import BlendModeDestinationOver from '/img/concepts/blend/DestinationOver.png';
import BlendModeSource from '/img/concepts/blend/Source.png';
import BlendModeSourceAtop from '/img/concepts/blend/SourceAtop.png';
import BlendModeSourceIn from '/img/concepts/blend/SourceIn.png';
import BlendModeSourceOut from '/img/concepts/blend/SourceOut.png';
import BlendModeSourceOver from '/img/concepts/blend/SourceOver.png';
import BlendModeXor from '/img/concepts/blend/Xor.png';

在屏幕上渲染位图图形时，Avalonia 支持指定渲染时使用的混合模式。混合模式会改变在现有像素（目标）上绘制新像素（源）时执行的计算。

目前，Avalonia 的合成模式和像素混合模式位于一个名为 `BitmapBlendingMode` 的枚举中。

合成模式枚举主要描述新像素如何根据 Alpha 通道与当前屏幕上的像素进行交互，这可用于创建例如：“切图器”、排除区域或蒙版。

另一方面，像素混合模式指定新颜色将如何与当前颜色进行交互。这些模式可用于例如：特殊效果、更改色相或其他更复杂的图像合成。

有关混合模式如何工作及其背后数学原理的示例，请参阅 [维基百科页面](https://zh.wikipedia.org/wiki/%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)。

:::info
目前，Avalonia 仅在使用 Skia 渲染器时支持混合模式。尝试将这些模式与 D2D 渲染器一起使用将导致与默认模式相同的行为。
:::

## 默认行为

默认的混合模式是 `SourceOver`，这意味着根据 Alpha 通道，用新值替换所有像素值。这是大多数应用程序覆盖两个图像的标准方式。

## 如何使用它

在 XAML 中，您可以指定渲染 Image 控件时使用的混合模式。以下示例将在非常可爱的猫的图片上渲染颜色叠加层：

```xml
<Panel>
    <Image Source="./Cat.jpg"/>
    <Image Source="./Overlay-Color.png" BlendMode="Multiply"/>
</Panel>
```

如果您正在创建自定义用户控件，并希望使用这些模式之一通过代码渲染位图，可以通过在控件上下文渲染选项中设置 `BitmapBlendingMode` 来实现：

``` csharp
// 在 "Render" 方法内部，像这样绘制位图：

using (context.PushRenderOptions(RenderOptions with { BitmapBlendingMode = BitmapBlendingMode.Multiply }))
{
    context.DrawImage(source, sourceRect, destRect);
}
```

## 位图混合模式展示

Avalonia 支持多种可应用于渲染的位图混合模式：

### 像素混合模式

像素混合模式仅影响颜色，不考虑 Alpha 通道。

这些是示例中使用的图像：

| 可爱猫咪基础图像 (目标) | 色轮叠加图像 (源) |
|:---:|:---:|
| <img src={BlendModeCat} alt="" width="180"/> | <img src={BlendModeOverlayColor} alt="" width="180"/> |

以下是 Avalonia 当前支持的所有值

| 预览 | 枚举 | 描述 |
|---|---|---|
| <img src={BlendModeNothing} alt="" width="180"/> | `Unspecified` | 或 `SourceOver` - 默认行为。 |
| <img src={BlendModePlus} alt="" width="180"/> | `Plus` | 显示源图像和目标图像的总和。 |
| <img src={BlendModeScreen} alt="" width="180"/> | `Screen` | 将目标和源颜色值的补码相乘，然后对结果进行补码。 |
| <img src={BlendModeOverlay} alt="" width="180"/> | `Overlay` | 根据目标颜色值，对颜色进行正片叠底或滤色。 |
| <img src={BlendModeDarken} alt="" width="180"/> | `Darken` | 选择目标和源颜色中较暗的一个。 |
| <img src={BlendModeLighten} alt="" width="180"/> | `Lighten` | 选择目标和源颜色中较亮的一个。 |
| <img src={BlendModeColorDodge} alt="" width="180"/> | `ColorDodge` | 使目标颜色变亮以反映源颜色。 |
| <img src={BlendModeColorBurn} alt="" width="180"/> | `ColorBurn` | 根据源颜色值，对颜色进行正片叠底或滤色。 |
| <img src={BlendModeHardLight} alt="" width="180"/> | `HardLight` | 根据源颜色值，使颜色变暗或变亮。 |
| <img src={BlendModeSoftLight} alt="" width="180"/> | `SoftLight` | 从两个组成颜色中较亮的颜色减去较暗的颜色。 |
| <img src={BlendModeDifference} alt="" width="180"/> | `Difference` | 产生与差值模式类似但对比度较低的效果。 |
| <img src={BlendModeExclusion} alt="" width="180"/> | `Exclusion` | 源颜色乘以目标颜色并替换目标。 |
| <img src={BlendModeMultiply} alt="" width="180"/> | `Multiply` | 创建一个具有源颜色色相以及目标颜色饱和度和亮度的颜色。 |
| <img src={BlendModeHue} alt="" width="180"/> | `Hue` | 创建一个具有源颜色色相以及目标颜色饱和度和亮度的颜色。 |
| <img src={BlendModeSaturation} alt="" width="180"/> | `Saturation` | 创建一个具有源颜色饱和度以及目标颜色色相和亮度的颜色。 |
| <img src={BlendModeColor} alt="" width="180"/> | `Color` | 创建一个具有源颜色色相和饱和度以及目标颜色亮度的颜色。 |
| <img src={BlendModeLuminosity} alt="" width="180"/> | `Luminosity` | 创建一个具有源颜色亮度以及目标颜色色相和饱和度的颜色。 |

### 合成混合模式

合成混合模式仅影响 Alpha 通道，不影响颜色。

这些是示例中使用的图像：

| "A" 基础图像 (目标) | "B" 叠加图像 (源) |
|:---:|:---:|
| <img src={BlendModeA} alt="" width="180"/> | <img src={BlendModeB} alt="" width="180"/> |

以下是 Avalonia 当前支持的所有值。请注意，此演示对 Alpha 通道敏感，因此网站背景会透过图像显示。

| 预览 | 枚举 | 描述 |
|---|---|---|
| <img src={BlendModeSource} alt="" width="180"/> | `Source` | 仅显示源。 |
| <img src={BlendModeSourceOver} alt="" width="180"/> | `SourceOver` | 或 `Unspecified` - 默认行为，源放置在目标之上。 |
| <img src={BlendModeSourceIn} alt="" width="180"/> | `SourceIn` | 与目标重叠的源替换目标。 |
| <img src={BlendModeSourceOut} alt="" width="180"/> | `SourceOut` | 源放置在目标之外的区域。 |
| <img src={BlendModeSourceAtop} alt="" width="180"/> | `SourceAtop` | 与目标重叠的源替换目标。 |
| <img src={BlendModeXor} alt="" width="180"/> | `Xor` | 源和目标不重叠的区域组合在一起。 |
| <img src={BlendModeDestination} alt="" width="180"/> | `Destination` | 仅显示目标。 |
| <img src={BlendModeDestinationOver} alt="" width="180"/> | `DestinationOver` | 目标放置在源之上。 |
| <img src={BlendModeDestinationIn} alt="" width="180"/> | `DestinationIn` | 与源重叠的目标替换源。 |
| <img src={BlendModeDestinationOut} alt="" width="180"/> | `DestinationOut` | 目标放置在源之外的区域。 |
| <img src={BlendModeDestinationAtop} alt="" width="180"/> | `DestinationAtop` | 与源重叠的目标替换源。 |
