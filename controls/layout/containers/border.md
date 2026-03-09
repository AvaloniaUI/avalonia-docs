---
id: border
title: Border
description: Learn how to use the Border control to add borders, backgrounds, rounded corners, and box shadows to your Avalonia UI content.
doc-type: reference
---

The border control decorates a (single) child with a border and background. It can also be used to display rounded corners.

## Useful properties

You will probably use these properties most often:

<table><thead><tr><th width="261">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Background</code></td><td>Background color.</td></tr><tr><td><code>BorderBrush</code></td><td>Border color.</td></tr><tr><td><code>BorderThickness</code></td><td>Border line thickness (integer).</td></tr><tr><td><code>CornerRadius</code></td><td>Radius for all four corners (one value), or specified as list - see below.</td></tr><tr><td><code>BoxShadow</code></td><td>Defines a shadow (see below).</td></tr><tr><td><code>BackgroundSizing</code></td><td>Controls how the background is rendered relative to the border. Options: <code>CenterBorder</code> (default, centered on border thickness), <code>InnerBorderEdge</code> (fills inside the border), <code>OuterBorderEdge</code> (extends to the outer edge).</td></tr></tbody></table>

## Corner radius property

You can give the value of the corner radius property as a single value. In this case, Avalonia will use the same radius on all four corners of the child control.

Alternatively you can specify a list of values; this must be in one of the following two formats.

When only two values are in the list, Avalonia will interpret them using the pattern:

`CornerRadius="Top Bottom"`

The top-left and top-right radii are set from the first value, and the bottom-left and bottom-right radii are set from the second value.

When all four values are in the list, Avalonia will interpret them using the pattern:

`CornerRadius="TopLeft TopRight BottomRight BottomLeft"`

:::caution
If you use the four value pattern; you must provide all four values, even if one of them is zero. Three values are not permitted in the list.
:::

### Example

This example adds some border controls to create a 'pod' look in the layout:

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui">
  <Border Background="Gray"
          BorderBrush="Black"
          BorderThickness="2"
          CornerRadius="3"
          Padding="10" Margin="10">
    <TextBlock>Box 1</TextBlock>
  </Border>
  <Border Background="Gray"
          BorderBrush="Black"
          BorderThickness="2"
          CornerRadius="3"
          Padding="10" Margin="10">
    <TextBlock>Box 2</TextBlock>
  </Border>
</StackPanel>
```

</XamlPreview>

## Box shadows

You can define a shadow to a border by setting its box shadow property. You specify a single box shadow using:

* An optional `inset` keyword, which draws the shadow inside the border.
* Two, three, or four length values - see below.
* A color value.

If only two length values are given, Avalonia will interpret them as the `offset-x` and `offset-y`. If a third value is given, it is interpreted as a `blur-radius`, and if a fourth value is given, it is interpreted as a `spread-radius`.

:::info
You can specify multiple shadows by providing a comma-separated list of shadow definitions.
:::

This table describes the box shadow values, in the order in which they appear:

<table><thead><tr><th width="203">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>inset</code></td><td>If not specified (default), the shadow is assumed to be a drop shadow (as if the box were raised above the content). The presence of the inset keyword changes the shadow to inside the frame (as if the content was depressed inside the box). Inset shadows are drawn inside the border (even transparent ones), and above the background but below any content</td></tr><tr><td><code>offset-x</code> </td><td>Specifies the horizontal distance. Negative values place the shadow to the left of the element.</td></tr><tr><td><code>offset-y</code></td><td>Specifies the vertical distance. Negative values place the shadow above the element.</td></tr><tr><td><code>blur-radius</code></td><td>The larger this value, the bigger the blur effect, so the shadow becomes bigger and lighter. Negative values are not allowed. If not specified, the default (zero) is used and the shadow edge is sharp.</td></tr><tr><td><code>spread-radius</code></td><td>Positive values will cause the shadow to expand and grow bigger, negative values will cause the shadow to shrink. If not specified, it will be 0 (the shadow will be the same size as the element).</td></tr><tr><td><code>color</code></td><td>The color of the shadow using a color name (such as Red), a # prefix with a hexadecimal color value (e.g., #dadada), or a color function (e.g., rgb(13, 110, 253), hsl(215, 98%, 52%)).</td></tr></tbody></table>

:::info
If both offset values are set to zero, the shadow is placed behind the element, and will only generate a blur effect if `blur-radius` and/or `spread-radius` are set.
:::

### Example

This is an example of a drop-shadow:

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui">
  <Border Background="Gray"
          BorderBrush="Black"
          BorderThickness="2"
          CornerRadius="3"
          BoxShadow="5 5 10 0 DarkGray"
          Padding="10" Margin="40">
    <TextBlock>Box with a drop shadow</TextBlock>
  </Border>
</StackPanel>
```

</XamlPreview>

## See also

- [Border API reference](/api/avalonia/controls/border)
- [`Border.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Border.cs)
