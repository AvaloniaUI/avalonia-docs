---
id: border
title: Border
---

The `Border` control decorates a child with a border and background. It can also be used to display rounded corners by setting the [`CornerRadius`](http://reference.avaloniaui.net/api/Avalonia/CornerRadius/) property.

An example of a border with a red background, 2 pixel black border, 3 pixel corner radius and a 4 pixel padding around its content:

```markup
<Border Background="Red"
        BorderBrush="Black"
        BorderThickness="2"
        CornerRadius="3"
        Padding="4">
    <StackPanel>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
    </StackPanel>
</Border>
```

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/border/image (2).png" />
  </div>

## Box Shadows

A border can display a box shadow around it by setting the `BoxShadow` property.

Specify a single box shadow using:

* An optional `inset` keyword
* Two, three, or four `length` values.
  * If only two values are given, they are interpreted as `offset-x` `offset-y` values.
  * If a third value is given, it is interpreted as a `blur-radius`.
  * If a fourth value is given, it is interpreted as a `spread-radius`.
* A `color` value.

To specify multiple shadows, provide a comma-separated list of shadows.

### Values

* `inset`: If not specified \(default\), the shadow is assumed to be a drop shadow \(as if the box were raised above the content\). The presence of the inset keyword changes the shadow to one inside the frame \(as if the content was depressed inside the box\). Inset shadows are drawn inside the border \(even transparent ones\), above the background, but below content
* `offset-x` `offset-y`: `offset-x` specifies the horizontal distance. Negative values place the shadow to the left of the element. `offset-y` specifies the vertical distance. Negative values place the shadow above the element. If both values are 0, the shadow is placed behind the element \(and may generate a blur effect if `blur-radius` and/or `spread-radius` is set\)
* `blur-radius`: The larger this value, the bigger the blur, so the shadow becomes bigger and lighter. Negative values are not allowed. If not specified, it will be 0 \(the shadow's edge is sharp\)
* `spread-radius`: Positive values will cause the shadow to expand and grow bigger, negative values will cause the shadow to shrink. If not specified, it will be 0 \(the shadow will be the same size as the element\).
* `color`: The color of the shadow using a color name \(such as `red`\) or a `#` hexadecimal color value

```markup
<Border Background="Red"
        BorderBrush="Black"
        BorderThickness="2"
        CornerRadius="3"
        Padding="4"
        BoxShadow="5 5 10 2 Blue">
    <StackPanel>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
    </StackPanel>
</Border>
```

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/border/image (8).png" />
  </div>

## Common Properties

| Property | Description |
| :--- | :--- |
| `Background` | A `Brush` describing the color of the control's background |
| `BorderBrush` | A `Brush` describing the color of the control's border stroke |
| `BorderThickness` | The thickness of the control's border stroke |
| `Child` | The child control to decorate |
| `CornerRadius` | The radius of the border's rounded corners |

## Pseudoclasses

None

## API Reference

[Border](http://reference.avaloniaui.net/api/Avalonia.Controls/Border/)

## Source code

[Border.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Border.cs)
