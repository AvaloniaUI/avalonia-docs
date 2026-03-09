---
id: effects
title: Effects
description: Visual effects including box shadows, clipping, and opacity masks for Avalonia controls.
doc-type: explanation
---

Avalonia supports visual effects that add depth and visual interest to controls. The primary effect types are box shadows, clipping, and opacity masks.

## Box shadows

The [`BoxShadow`](/api/avalonia/media/boxshadow) property on [`Border`](/api/avalonia/controls/border) and `ContentPresenter` adds drop shadows or inset shadows to elements. The syntax follows CSS box-shadow conventions.

### Basic syntax

```xml
<Border BoxShadow="5 5 10 0 #80000000" CornerRadius="8"
        Background="White" Padding="20">
    <TextBlock Text="Shadow" />
</Border>
```

The shadow parameters are, in order: `offsetX offsetY blur spread color`.

| Parameter | Description |
|---|---|
| `offsetX` | Horizontal offset. Positive values move the shadow right. |
| `offsetY` | Vertical offset. Positive values move the shadow down. |
| `blur` | Blur radius. Larger values create softer shadows. Must be non-negative. |
| `spread` | Spread radius. Positive values expand the shadow, negative values shrink it. |
| `color` | The shadow color. Accepts hex values (`#80000000`), named colors (`Gray`), and color functions (`rgba(0,0,0,0.5)`, `hsla(0,0%,0%,0.3)`). |

### Color functions in shadows

Color functions with commas (such as `rgba()` and `hsla()`) are fully supported, including in multiple shadow definitions:

```xml
<Border BoxShadow="0 4 8 0 rgba(0,0,0,0.3), 0 2 4 0 rgba(0,0,0,0.1)"
        CornerRadius="8" Background="White" Padding="20">
    <TextBlock Text="RGBA shadows" />
</Border>
```

### Inset shadows

Prefix the shadow definition with `inset` to draw the shadow inside the element:

```xml
<Border BoxShadow="inset 0 2 4 0 #40000000" CornerRadius="8"
        Background="#F0F0F0" Padding="20">
    <TextBlock Text="Inset shadow" />
</Border>
```

### Multiple shadows

Separate multiple shadow definitions with commas:

```xml
<Border BoxShadow="0 2 4 0 #20000000, 0 8 16 0 #10000000"
        CornerRadius="12" Background="White" Padding="24">
    <TextBlock Text="Layered shadows" />
</Border>
```

### Common shadow patterns

```xml
<!-- Subtle elevation -->
<Border BoxShadow="0 1 3 0 #20000000" />

<!-- Medium elevation -->
<Border BoxShadow="0 4 6 -1 #20000000, 0 2 4 -2 #20000000" />

<!-- High elevation -->
<Border BoxShadow="0 10 15 -3 #20000000, 0 4 6 -4 #20000000" />

<!-- Glow effect -->
<Border BoxShadow="0 0 20 5 #4060A0FF" />

<!-- Inset pressed effect -->
<Border BoxShadow="inset 0 2 4 0 #40000000" />
```

### Box shadows in code

```csharp
myBorder.BoxShadow = BoxShadows.Parse("0 4 8 0 #40000000");
```

## BlurEffect

The [`Effect`](/api/avalonia/media/effect) property on any `Visual` accepts effect objects. `BlurEffect` applies a Gaussian blur to the entire element:

```xml
<Border Background="SteelBlue" Padding="20" CornerRadius="8">
    <Border.Effect>
        <BlurEffect Radius="10" />
    </Border.Effect>
    <TextBlock Text="Blurred content" Foreground="White" />
</Border>
```

| Property | Description |
|---|---|
| `Radius` | The blur radius in pixels. Larger values produce a stronger blur. Default is 5. |

## DropShadowEffect

`DropShadowEffect` adds a shadow behind the entire visual element using the `Effect` property. This is different from `BoxShadow`, which only applies to `Border` elements.

```xml
<TextBlock Text="Shadow Text" FontSize="24">
    <TextBlock.Effect>
        <DropShadowEffect OffsetX="3" OffsetY="3"
                          BlurRadius="5" Color="Black" Opacity="0.5" />
    </TextBlock.Effect>
</TextBlock>
```

| Property | Description |
|---|---|
| `OffsetX` | Horizontal shadow offset in pixels. Default is approximately 3.5. |
| `OffsetY` | Vertical shadow offset in pixels. Default is approximately 3.5. |
| `BlurRadius` | Shadow blur radius. Default is 5. |
| `Color` | Shadow color. Default is `Black`. |
| `Opacity` | Shadow opacity from 0.0 to 1.0. Default is 1.0. |

### DropShadowDirectionEffect

An alternative that uses direction and depth instead of explicit offsets:

```xml
<Border Background="White" Padding="20" CornerRadius="8">
    <Border.Effect>
        <DropShadowDirectionEffect ShadowDepth="5" Direction="315"
                                    BlurRadius="10" Color="Black" Opacity="0.3" />
    </Border.Effect>
    <TextBlock Text="Directional shadow" />
</Border>
```

| Property | Description |
|---|---|
| `ShadowDepth` | Distance of the shadow from the element. Default is 5. |
| `Direction` | Angle in degrees (0-360) indicating shadow direction. Default is 315 (lower-right). |
| `BlurRadius` | Shadow blur radius. Default is 5. |
| `Color` | Shadow color. Default is `Black`. |
| `Opacity` | Shadow opacity. Default is 1.0. |

:::info
`Effect` (BlurEffect, DropShadowEffect) applies to any visual element including text and images. `BoxShadow` only applies to `Border` and `ContentPresenter` controls but is more performant for rectangular shadows.
:::

## Clipping

The `ClipToBounds` property on any control clips child content that extends beyond the element's bounds.

```xml
<Border Width="100" Height="100" ClipToBounds="True" CornerRadius="50">
    <Image Source="avares://MyApp/Assets/photo.png"
           Stretch="UniformToFill" />
</Border>
```

This creates a circular image by clipping to the rounded border.

### Clip property

For custom clip shapes, use the `Clip` property with a `Geometry`:

```xml
<Image Source="avares://MyApp/Assets/photo.png" Width="200" Height="200">
    <Image.Clip>
        <EllipseGeometry Rect="0,0,200,200" />
    </Image.Clip>
</Image>
```

You can use any geometry type for clipping:

```xml
<Image Source="avares://MyApp/Assets/photo.png" Width="200" Height="200">
    <Image.Clip>
        <PathGeometry>
            <PathFigure StartPoint="100,0" IsClosed="True">
                <LineSegment Point="200,80" />
                <LineSegment Point="160,200" />
                <LineSegment Point="40,200" />
                <LineSegment Point="0,80" />
            </PathFigure>
        </PathGeometry>
    </Image.Clip>
</Image>
```

## OpacityMask

The `OpacityMask` property uses a brush to control per-pixel transparency. Only the alpha channel of the mask brush is used. Black areas are fully visible, transparent areas are hidden.

```xml
<!-- Fade from top to bottom -->
<Image Source="avares://MyApp/Assets/photo.png" Width="200" Height="200">
    <Image.OpacityMask>
        <LinearGradientBrush StartPoint="0%,0%" EndPoint="0%,100%">
            <GradientStop Color="Black" Offset="0" />
            <GradientStop Color="Black" Offset="0.5" />
            <GradientStop Color="Transparent" Offset="1" />
        </LinearGradientBrush>
    </Image.OpacityMask>
</Image>
```

### Radial fade

```xml
<Border Width="200" Height="200" Background="SteelBlue">
    <Border.OpacityMask>
        <RadialGradientBrush>
            <GradientStop Color="Black" Offset="0" />
            <GradientStop Color="Transparent" Offset="1" />
        </RadialGradientBrush>
    </Border.OpacityMask>
</Border>
```

## Opacity

The `Opacity` property on any `Visual` controls the overall transparency of the element and all its children:

```xml
<Border Opacity="0.5" Background="Red" Padding="20">
    <TextBlock Text="Semi-transparent" />
</Border>
```

Values range from `0.0` (fully transparent) to `1.0` (fully opaque). Unlike `OpacityMask`, this applies uniformly to the entire element.

### IsVisible vs Opacity

| Approach | Layout impact | Interaction |
|---|---|---|
| `IsVisible="False"` | Element is removed from layout. | Cannot receive input. |
| `Opacity="0"` | Element still occupies space. | Can still receive pointer and keyboard input. |

## Animating effects

Box shadows and opacity can be animated with transitions:

```xml
<Border Background="White" CornerRadius="8" Padding="20"
        BoxShadow="0 2 4 0 #20000000">
    <Border.Transitions>
        <Transitions>
            <BoxShadowsTransition Property="BoxShadow" Duration="0:0:0.2" />
            <DoubleTransition Property="Opacity" Duration="0:0:0.2" />
        </Transitions>
    </Border.Transitions>
    <Border.Styles>
        <Style Selector="Border:pointerover">
            <Setter Property="BoxShadow" Value="0 8 16 0 #30000000" />
        </Style>
    </Border.Styles>
    <TextBlock Text="Hover for shadow" />
</Border>
```

## See also

- [Brushes](brushes): All brush types including gradient and image brushes.
- [Drawing Graphics](drawing-graphics): Shapes, geometries, and path data.
- [Transforms](transforms): Rotate, scale, skew, and translate elements.
- [Control Transitions](control-transitions): Animate property changes.
