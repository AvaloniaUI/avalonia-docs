---
description: REFERENCE - Built-in Controls
---

import BorderPodLookScreenshot from '/img/reference/controls/detailed-reference/border/border-pod-look.png';
import BorderDropShadowScreenshot from '/img/reference/controls/detailed-reference/border/border-drop-shadow.png'; 

# Border

The border control decorates a (single) child with a border and background. It can also be used to display rounded corners.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="261">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Background</code></td><td>Background color.</td></tr><tr><td><code>BorderBrush</code></td><td>Border color.</td></tr><tr><td><code>BorderThickness</code></td><td>Border line thickness (integer).</td></tr><tr><td><code>CornerRadius</code></td><td>Radius for all four corners (one value), or specified as list - see below.</td></tr><tr><td><code>BoxShadow</code></td><td>Defines a shadow (see below).</td></tr></tbody></table>

## Corner Radius Property

You can give the value of the corner radius property as a single value. In this case, _Avalonia UI_ will use the same radius on all four corners of the child control.

Alternatively you can specify a list of values; this must be in one of the following two formats.

When only two values are in the list, _Avalonia UI_ will interpret them using the pattern:

`CornerRadius="Top Bottom"`

The top-left and top-right radii are set from the first value, and the bottom-left and bottom-right radii are set from the second value.

When all four values are in the list, _Avalonia UI_ will interpret them using the pattern:

`CornerRadius="TopLeft TopRight BottomRight BottomLeft"`

:::warning
If you use the four value pattern; you must provide all four values, even if one of them is zero. Three values are not permitted in the list.
:::

### Example

This example adds some border controls to create a 'pod' look in the layout:

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

## Box Shadows

You can define a shadow to a border by setting its box shadow property. You specify a single box shadow using:

* An optional `inset` keyword - this will draw the shadow inside the border - not often useful!
* Two, three, or four length values - see below.
* A color value.

If only two length values are given,  will interpret them as the `offset-x` and `offset-y`. If a third value is given, it is interpreted as a `blur-radius`, and if a fourth value is given, it is interpreted as a `spread-radius`.

:::info
You can specify multiple shadows by providing a comma-separated list of shadow definitions.
:::

This table describes the box shadow values, in the order in which they appear:

<table><thead><tr><th width="203">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>inset</code></td><td>If not specified (default), the shadow is assumed to be a drop shadow (as if the box were raised above the content). The presence of the inset keyword changes the shadow to inside the frame (as if the content was depressed inside the box). Inset shadows are drawn inside the border (even transparent ones), and above the background but below any content</td></tr><tr><td><code>offset-x</code> </td><td>Specifies the horizontal distance. Negative values place the shadow to the left of the element.</td></tr><tr><td><code>offset-y</code></td><td>Specifies the vertical distance. Negative values place the shadow above the element.</td></tr><tr><td><code>blur-radius</code></td><td>The larger this value, the bigger the blur effect, so the shadow becomes bigger and lighter. Negative values are not allowed. If not specified, the default (zero) is used and the shadow edge is sharp.</td></tr><tr><td><code>spread-radius</code></td><td>Positive values will cause the shadow to expand and grow bigger, negative values will cause the shadow to shrink. If not specified, it will be 0 (the shadow will be the same size as the element).</td></tr><tr><td><code>color</code></td><td>The color of the shadow using a color name (such as red), or a # prefix and a hexadecimal color value. For example: #dadada</td></tr></tbody></table>

:::info
If both offset values are set to zero, the shadow is placed behind the element, and will only generate a blur effect if `blur-radius` and/or `spread-radius` are set.
:::

### Example

This is an example of a drop-shadow:

```xml
<<StackPanel>
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

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Border/).
:::

:::info
View the source code on _GitHub_ [`Border.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Border.cs)
:::
