---
title: Bitmap Blend Modes
description: CONCEPTS
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

When rendering bitmaps graphics on screen, Avalonia supports specifying what blend mode to use while rendering. Blend modes changes the calculations performed when drawing new pixels (source) over existing pixels (destination).

Currently Avalonia Composite modes and Pixel Blend modes are located in a single enum called `BitmapBlendingMode`.

Composite modes enums mainly describes how the new pixels interact with the current on-screen pixels according to the alpha channel, this can be used to create, for example: "cookie cutters", exclusion zones or masks.

Pixel Blend modes on the other hand, specifies how the new colors will interact with the current colors. These modes can be used for example: on special effects, change color hues or other more complex image compositions.

See the [Wikipedia page](https://en.wikipedia.org/wiki/Blend_modes) on blend modes for examples of how they work and the math behind them.

:::info
Currently Avalonia only supports Pixel Blend Modes when using the Skia renderer. Trying to use these modes with the D2D renderer will  result in the same behavior as the default mode.
:::

## Default Behavior

The default blend mode is `SourceOver`, meaning replacing all pixels values by the new values, dictated by the alpha channel. This is the standard way most applications overlay two images.

## How to use it

In XAML, you can specify what blend mode to use when rendering a Image control. The following example will render a color overlay over the picture of a very cute cat:

```xml
<Panel>
    <Image Source="./Cat.jpg"/>
    <Image Source="./Overlay-Color.png" BlendMode="Multiply"/>
</Panel>
```

If you're creating a Custom User control and want to render a bitmap with code using one of these modes, you can do so by setting the `BitmapBlendingMode` in the control context render options:

``` csharp
// Inside the "Render" method, draw the bitmap like this:

using (context.PushRenderOptions(RenderOptions with { BitmapBlendingMode = BitmapBlendingMode.Multiply }))
{
    context.DrawImage(source, sourceRect, destRect);
}
```

## Bitmap Blend Mode Gallery

Avalonia supports several bitmap blend modes that can be applied to rendering:

### Pixel Blend Modes

Pixel blend modes affect only the color without taking into consideration the alpha channel.

These are the images used in the examples:

| Cute Cat base image (destination) | Color Wheel overlay image (source) |
|:---:|:---:|
| <img src={BlendModeCat} alt="" width="180"/> | <img src={BlendModeOverlayColor} alt="" width="180"/> |

Below are all the values currently supported by Avalonia

| Preview | Enum | Description |
|---|---|---|
| <img src={BlendModeNothing} alt="" width="180"/> | `Unspecified` | or `SourceOver` - Default Behavior. |
| <img src={BlendModePlus} alt="" width="180"/> | `Plus` | Display the sum of the source image and destination image. |
| <img src={BlendModeScreen} alt="" width="180"/> | `Screen` | Multiplies the complements of the destination and source color values, then complements the result. |
| <img src={BlendModeOverlay} alt="" width="180"/> | `Overlay` | Multiplies or screens the colors, depending on the destination color value. |
| <img src={BlendModeDarken} alt="" width="180"/> | `Darken` | Selects the darker of the destination and source colors. |
| <img src={BlendModeLighten} alt="" width="180"/> | `Lighten` | Selects the lighter of the destination and source colors. |
| <img src={BlendModeColorDodge} alt="" width="180"/> | `ColorDodge` | Darkens the destination color to reflect the source color. |
| <img src={BlendModeColorBurn} alt="" width="180"/> | `ColorBurn` | Multiplies or screens the colors, depending on the source color value. |
| <img src={BlendModeHardLight} alt="" width="180"/> | `HardLight` | Darkens or lightens the colors, depending on the source color value. |
| <img src={BlendModeSoftLight} alt="" width="180"/> | `SoftLight` | Subtracts the darker of the two constituent colors from the lighter color. |
| <img src={BlendModeDifference} alt="" width="180"/> | `Difference` | Produces an effect similar to that of the Difference mode but lower in contrast. |
| <img src={BlendModeExclusion} alt="" width="180"/> | `Exclusion` | The source color is multiplied by the destination color and replaces the destination|
| <img src={BlendModeMultiply} alt="" width="180"/> | `Multiply` | Creates a color with the hue of the source color and the saturation and luminosity of the destination color. |
| <img src={BlendModeHue} alt="" width="180"/> | `Hue` | Creates a color with the hue of the source color and the saturation and luminosity of the destination color. |
| <img src={BlendModeSaturation} alt="" width="180"/> | `Saturation` | Creates a color with the saturation of the source color and the hue and luminosity of the destination color. |
| <img src={BlendModeColor} alt="" width="180"/> | `Color` | Creates a color with the hue and saturation of the source color and the luminosity of the destination color. |
| <img src={BlendModeLuminosity} alt="" width="180"/> | `Luminosity` | Creates a color with the luminosity of the source color and the hue and saturation of the destination color. |

### Composition Blend modes

Composition blend modes affect only the alpha channel without messing with the colors.

These are the images used in the examples:

| "A" base image (destination) | "B" overlay image (source) |
|:---:|:---:|
| <img src={BlendModeA} alt="" width="180"/> | <img src={BlendModeB} alt="" width="180"/> |

Below are all the values currently supported by Avalonia. Please note that this demo is sensitive to the alpha channel and therefore the website background bleed through the images.

| Preview | Enum | Description |
|---|---|---|
| <img src={BlendModeSource} alt="" width="180"/> | `Source` | Only the source will be present. |
| <img src={BlendModeSourceOver} alt="" width="180"/> | `SourceOver` | or `Unspecified` - Default behavior, Source is placed over the destination. |
| <img src={BlendModeSourceIn} alt="" width="180"/> | `SourceIn` | The source that overlaps the destination, replaces the destination. |
| <img src={BlendModeSourceOut} alt="" width="180"/> | `SourceOut` | Source is placed, where it falls outside of the destination. |
| <img src={BlendModeSourceAtop} alt="" width="180"/> | `SourceAtop` | Source which overlaps the destination, replaces the destination. |
| <img src={BlendModeXor} alt="" width="180"/> | `Xor` | The non-overlapping regions of source and destination are combined. |
| <img src={BlendModeDestination} alt="" width="180"/> | `Destination` | Only the destination will be present. |
| <img src={BlendModeDestinationOver} alt="" width="180"/> | `DestinationOver` | Destination is placed over the source. |
| <img src={BlendModeDestinationIn} alt="" width="180"/> | `DestinationIn` | Destination which overlaps the source, replaces the source. |
| <img src={BlendModeDestinationOut} alt="" width="180"/> | `DestinationOut` | Destination is placed, where it falls outside of the source. |
| <img src={BlendModeDestinationAtop} alt="" width="180"/> | `DestinationAtop` | Destination which overlaps the source replaces the source. |
