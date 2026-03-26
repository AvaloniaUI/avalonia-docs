---
id: border
title: Border
description: Learn how to use the Border control to add borders, backgrounds, rounded corners, and box shadows to your Avalonia controls.
doc-type: reference
---

The `Border` control decorates a single child control with a border and background. It can display rounded corners.

## Useful properties

You will probably use these properties most often:

<table><thead><tr><th width="261">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Background</code></td><td>Background color.</td></tr><tr><td><code>BorderBrush</code></td><td>Border color.</td></tr><tr><td><code>BorderThickness</code></td><td>Border line thickness.</td></tr><tr><td><code>CornerRadius</code></td><td>Radius for all four corners as one value, or [specified as list](#corner-radius-property).</td></tr><tr><td><code>BoxShadow</code></td><td>[Defines a shadow](#box-shadows).</td></tr><tr><td><code>BackgroundSizing</code></td><td>Controls how the background is rendered relative to the border.<br />- <code>CenterBorder</code> (Default, centered on border thickness)<br />- <code>InnerBorderEdge</code> (Fills inside border)<br />- <code>OuterBorderEdge</code> (Extends to the outer edge)</td></tr></tbody></table>

## Corner radius property

If you give a single value for the `CornerRadius` property, Avalonia will use the same radius on all four corners of the child control.

Alternatively, you can specify a list of values. Avalonia interprets the provided values like so:

- If two values are provided, they are interpreted using the pattern `CornerRadius="Top Bottom"`. The first value sets the top left and top right corners. The second value sets the bottom right and bottom left corners.
- If four values are provided, they are interpreted using the pattern `CornerRadius="TopLeft TopRight BottomRight BottomLeft"`. One or more of the values can be zero, if desired.
- Three values are not permitted.

### Example

This example adds border controls to create a 'pod' look in the layout:

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

You can define a shadow by setting the `BoxShadow` property. You specify a single box shadow using:

* An option to draw the shadow as an inset inside the border. To enable, add the keyword `inset` to the value of the `BoxShadow` property.
* Two, three, or four length values. (See below.)
* A color value.

Avalonia interprets the length values like so:

- If two length values are given, they are interpreted as `offset-x` and `offset-y`.
- If three length values are given, they are interpreted as `offset-x`, `offset-y` and `blur-radius`.
- If four length values are given, they are interpreted as `offset-x`, `offset-y`, `blur-radius` and `spread-radius`.

:::info
You can specify multiple shadows by providing a comma-separated list of shadow definitions.
:::

This table describes the box shadow values, in the order in which they appear:

<table><thead><tr><th width="203">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>inset</code></td><td>Not specified by default, and the shadow is a drop shadow (as if the box were raised above the content). Adding the `inset` keyword as the first value of the `BoxShadow` property enables inset shadowing, where shadows are drawn inside the border, and above the background but below any content (as if the content was depressed inside the box).</td></tr><tr><td><code>offset-x</code> </td><td>Specifies the horizontal distance. Negative values place the shadow to the left of the element.</td></tr><tr><td><code>offset-y</code></td><td>Specifies the vertical distance. Negative values place the shadow above the element.</td></tr><tr><td><code>blur-radius</code></td><td>The larger this value, the bigger the blur effect. The shadow becomes bigger and lighter. Negative values are not allowed. If not specified, the default is zero, and the shadow edge is sharp.</td></tr><tr><td><code>spread-radius</code></td><td>Positive values will cause the shadow to expand and grow bigger. Negative values will cause the shadow to shrink. If not specified, the default is zero, and the shadow will be the same size as the element.</td></tr><tr><td><code>color</code></td><td>The color of the shadow. Accepts a color name (e.g., `Red`), a # prefix with a hexadecimal color value (e.g., `#dadada`), or a color function (e.g., `rgb(13, 110, 253)`, `hsl(215, 98%, 52%)`).</td></tr></tbody></table>

:::info
If both offset values are set to zero, the shadow is placed behind the element, and will only generate a blur effect if `blur-radius` and/or `spread-radius` are set.
:::

### Example

This is an example of a drop shadow:

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui">
  <Border Background="Gray"
          BorderBrush="Black"
          BorderThickness="2"
          CornerRadius="3"
          BoxShadow="5 5 10 0 DarkGray"
          Padding="10" Margin="40">
    <TextBlock>Box with shadow</TextBlock>
  </Border>
</StackPanel>
```

</XamlPreview>

## See also

- [Border API reference](/api/avalonia/controls/border)
- [`Border.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Border.cs)
