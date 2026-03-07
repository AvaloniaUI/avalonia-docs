---
id: clipping-and-masking
title: Clipping and masking
description: Clipping and opacity masking techniques for restricting visible content in Avalonia.
doc-type: explanation
---

Clipping restricts the visible area of a control or drawing to a defined region. Masking uses an opacity gradient to partially hide content. Both techniques are useful for creating shaped controls, circular avatars, and visual effects.

## ClipToBounds

The simplest form of clipping constrains child content to the parent's bounds. Set `ClipToBounds="True"` on any control:

```xml
<Border Width="100" Height="100" ClipToBounds="True"
        Background="LightGray">
    <!-- This image extends beyond the border but is clipped -->
    <Image Source="/assets/photo.jpg" Width="200" Height="200" />
</Border>
```

By default, `ClipToBounds` is `false`, so content can overflow its parent.

## Clip property

The `Clip` property accepts any `Geometry` to define a non-rectangular clipping region.

### Circular clip

Create a circular avatar by clipping an image with an ellipse:

```xml
<Image Source="/assets/avatar.jpg" Width="100" Height="100"
       Stretch="UniformToFill">
    <Image.Clip>
        <EllipseGeometry Rect="0,0,100,100" />
    </Image.Clip>
</Image>
```

### Rounded rectangle clip

```xml
<Image Source="/assets/banner.jpg" Width="300" Height="200"
       Stretch="UniformToFill">
    <Image.Clip>
        <RectangleGeometry Rect="0,0,300,200" RadiusX="16" RadiusY="16" />
    </Image.Clip>
</Image>
```

### Custom shape clip

Use a `PathGeometry` for arbitrary shapes:

```xml
<Image Source="/assets/photo.jpg" Width="200" Height="200"
       Stretch="UniformToFill">
    <Image.Clip>
        <PathGeometry>
            <PathFigure StartPoint="100,0" IsClosed="True">
                <LineSegment Point="200,75" />
                <LineSegment Point="160,200" />
                <LineSegment Point="40,200" />
                <LineSegment Point="0,75" />
            </PathFigure>
        </PathGeometry>
    </Image.Clip>
</Image>
```

### Using stream geometry syntax

The compact path mini-language can also define clip regions:

```xml
<Image Source="/assets/photo.jpg" Width="200" Height="200">
    <Image.Clip>
        <StreamGeometry>M 100,0 L 200,75 160,200 40,200 0,75 Z</StreamGeometry>
    </Image.Clip>
</Image>
```

## Clipping with CornerRadius

`Border` provides built-in clipping through `CornerRadius`. Content inside a border with rounded corners is automatically clipped:

```xml
<Border CornerRadius="50" Width="100" Height="100" ClipToBounds="True">
    <Image Source="/assets/avatar.jpg" Stretch="UniformToFill" />
</Border>
```

This is often simpler than using an `EllipseGeometry` clip for circular images.

## Opacity masking

Use `OpacityMask` to fade or partially hide content using a brush. Areas where the mask brush is transparent become invisible, while opaque areas remain visible:

### Gradient fade

```xml
<Image Source="/assets/landscape.jpg" Width="400" Height="300">
    <Image.OpacityMask>
        <LinearGradientBrush StartPoint="0%,0%" EndPoint="0%,100%">
            <GradientStop Color="Black" Offset="0" />
            <GradientStop Color="Black" Offset="0.6" />
            <GradientStop Color="Transparent" Offset="1" />
        </LinearGradientBrush>
    </Image.OpacityMask>
</Image>
```

This fades the bottom of the image to transparent, creating a common "fade out" effect.

### Horizontal fade

```xml
<TextBlock Text="This text fades to the right" FontSize="24">
    <TextBlock.OpacityMask>
        <LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,0%">
            <GradientStop Color="Black" Offset="0" />
            <GradientStop Color="Black" Offset="0.7" />
            <GradientStop Color="Transparent" Offset="1" />
        </LinearGradientBrush>
    </TextBlock.OpacityMask>
</TextBlock>
```

### Radial mask

```xml
<Image Source="/assets/photo.jpg" Width="300" Height="300">
    <Image.OpacityMask>
        <RadialGradientBrush>
            <GradientStop Color="Black" Offset="0" />
            <GradientStop Color="Black" Offset="0.5" />
            <GradientStop Color="Transparent" Offset="1" />
        </RadialGradientBrush>
    </Image.OpacityMask>
</Image>
```

This creates a vignette effect where the edges fade out.

### VisualBrush mask

You can use a `VisualBrush` as an opacity mask to clip content to the shape of another control:

```xml
<Image Source="/assets/photo.jpg" Width="300" Height="300">
    <Image.OpacityMask>
        <VisualBrush>
            <VisualBrush.Visual>
                <TextBlock Text="HELLO" FontSize="120" FontWeight="Bold"
                           Foreground="Black" />
            </VisualBrush.Visual>
        </VisualBrush>
    </Image.OpacityMask>
</Image>
```

The image is visible only where the `TextBlock` renders opaque pixels, creating a text-shaped cutout effect.

## Clipping in custom controls

When rendering custom controls, you can apply clipping programmatically:

```csharp
public override void Render(DrawingContext context)
{
    // Push a clip region
    using (context.PushClip(new Rect(10, 10, 80, 80)))
    {
        context.FillRectangle(Brushes.Blue, new Rect(0, 0, 100, 100));
        // Only the portion within (10,10,80,80) is visible
    }
}
```

### Geometry clip in code

```csharp
var ellipse = new EllipseGeometry(new Rect(0, 0, 100, 100));
using (context.PushGeometryClip(ellipse))
{
    context.DrawImage(bitmap, new Rect(0, 0, 100, 100));
}
```

## See also

- [Shapes and Geometries](/docs/graphics-animation/shapes-and-geometries): Geometry types for clip regions.
- [Brushes](/docs/graphics-animation/brushes): Brush types for opacity masks.
- [Custom Rendering](/docs/graphics-animation/custom-rendering): DrawingContext reference.
