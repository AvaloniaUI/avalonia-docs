---
id: brushes
title: Brushes
description: Brush types for painting surfaces in Avalonia including solid colors, gradients, and tile brushes.
doc-type: reference
---

Brushes define how surfaces are painted in Avalonia. Every property that accepts a `Brush` (such as `Background`, `Foreground`, `BorderBrush`, `Fill`, and `Stroke`) can use any of the brush types described here.

## SolidColorBrush

Fills an area with a single color. This is the most common brush type and is used implicitly when you set a color string on a brush property.

```xml
<Border Background="SteelBlue" />

<!-- Explicit form -->
<Border>
    <Border.Background>
        <SolidColorBrush Color="#4682B4" Opacity="0.8" />
    </Border.Background>
</Border>
```

Colors can be specified as:

| Format | Example | Description |
|---|---|---|
| Named color | `Red`, `SteelBlue` | Any standard CSS/WPF color name. |
| `#RRGGBB` | `#4682B4` | Hex RGB. |
| `#AARRGGBB` | `#804682B4` | Hex ARGB (with alpha). |
| `#RGB` | `#F00` | Short hex RGB. |
| `rgb()` | `rgb(70, 130, 180)` | CSS RGB function. Values 0-255. |
| `rgba()` | `rgba(70, 130, 180, 0.8)` | CSS RGB with alpha (0.0-1.0). |
| `hsl()` | `hsl(207, 44%, 49%)` | CSS HSL (hue, saturation, lightness). |
| `hsla()` | `hsla(207, 44%, 49%, 0.8)` | CSS HSL with alpha. |
| `hsv()` | `hsv(207, 61%, 71%)` | HSV (hue, saturation, value). |
| `hsva()` | `hsva(207, 61%, 71%, 0.8)` | HSV with alpha. |

These formats work anywhere a brush or color is expected, including XAML attributes, styles, and `Brush.Parse()` / `Color.Parse()` in code.

```xml
<!-- All of these are equivalent -->
<Border Background="SteelBlue" />
<Border Background="#4682B4" />
<Border Background="rgb(70, 130, 180)" />
<Border Background="hsl(207, 44%, 49%)" />
```

### Creating in code

```csharp
var brush = new SolidColorBrush(Colors.SteelBlue);
var brush2 = new SolidColorBrush(Color.Parse("#4682B4"));
var brush3 = Brush.Parse("rgb(70, 130, 180)");
var brush4 = Brush.Parse("hsl(207, 44%, 49%)");
myBorder.Background = brush;
```

`Brush.Parse()` accepts all the same color formats listed above, including named colors, hex values, and CSS color functions.

## LinearGradientBrush

Fills an area with a gradient that transitions between colors along a line. For a focused guide on linear gradients, see [Gradients](gradients).

```xml
<Border Height="80" CornerRadius="8">
    <Border.Background>
        <LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">
            <GradientStop Color="#6366F1" Offset="0" />
            <GradientStop Color="#EC4899" Offset="1" />
        </LinearGradientBrush>
    </Border.Background>
</Border>
```

### Key properties

| Property | Description |
|---|---|
| `StartPoint` | The starting point of the gradient line. Uses relative (`50%,0%`) or absolute coordinates. |
| `EndPoint` | The ending point of the gradient line. |
| [`GradientStops`](/api/avalonia/media/gradientstops) | A collection of `GradientStop` objects defining colors and positions. |
| `SpreadMethod` | How the gradient fills space beyond its defined area: `Pad` (default), `Reflect`, or `Repeat`. |
| `Opacity` | Overall opacity of the brush (0.0 to 1.0). |

### Gradient directions

```xml
<!-- Horizontal (left to right) -->
<LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">

<!-- Vertical (top to bottom) -->
<LinearGradientBrush StartPoint="50%,0%" EndPoint="50%,100%">

<!-- Diagonal -->
<LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,100%">
```

## RadialGradientBrush

Fills an area with a gradient that radiates from a center point outward.

```xml
<Ellipse Width="150" Height="150">
    <Ellipse.Fill>
        <RadialGradientBrush GradientOrigin="30%,30%">
            <GradientStop Color="White" Offset="0" />
            <GradientStop Color="#3B82F6" Offset="0.6" />
            <GradientStop Color="#1E3A8A" Offset="1" />
        </RadialGradientBrush>
    </Ellipse.Fill>
</Ellipse>
```

### Key properties

| Property | Description |
|---|---|
| `Center` | The center of the outermost circle. Default is `50%,50%`. |
| `GradientOrigin` | The origin of the gradient (focal point). Offset from center creates a spotlight effect. |
| `RadiusX`, `RadiusY` | The horizontal and vertical radius of the outermost gradient circle. Default is `50%`. |
| `GradientStops` | Colors and positions along the radius. |
| `SpreadMethod` | `Pad`, `Reflect`, or `Repeat`. |

## ConicGradientBrush

Fills an area with a gradient that sweeps around a center point, transitioning colors as it rotates.

```xml
<Ellipse Width="150" Height="150">
    <Ellipse.Fill>
        <ConicGradientBrush Center="50%,50%" Angle="0">
            <GradientStop Color="#EF4444" Offset="0" />
            <GradientStop Color="#F59E0B" Offset="0.25" />
            <GradientStop Color="#22C55E" Offset="0.5" />
            <GradientStop Color="#3B82F6" Offset="0.75" />
            <GradientStop Color="#EF4444" Offset="1" />
        </ConicGradientBrush>
    </Ellipse.Fill>
</Ellipse>
```

### Key properties

| Property | Description |
|---|---|
| `Center` | The center point of the conic gradient. Default is `50%,50%`. |
| `Angle` | The starting angle in degrees. Default is `0`. |
| `GradientStops` | Colors and positions around the sweep. |

## ImageBrush

Paints an area with an image.

```xml
<Border Width="200" Height="200">
    <Border.Background>
        <ImageBrush Source="avares://MyApp/Assets/texture.png"
                    Stretch="UniformToFill"
                    TileMode="Tile"
                    SourceRect="0,0,64,64" />
    </Border.Background>
</Border>
```

### Key properties

| Property | Description |
|---|---|
| `Source` | The image source. Supports `avares://` URIs and file paths. |
| `Stretch` | How the image fills the area: `None`, `Fill`, `Uniform` (default), `UniformToFill`. |
| `TileMode` | How the image tiles: `None` (default), `Tile`, `FlipX`, `FlipY`, `FlipXY`. |
| `AlignmentX` | Horizontal alignment of the image within the tile: `Left`, `Center` (default), `Right`. |
| `AlignmentY` | Vertical alignment of the image within the tile: `Top`, `Center` (default), `Bottom`. |
| `SourceRect` | A rectangular region of the source image to use. |
| `DestinationRect` | The destination rectangle within the target area. |
| `Opacity` | Overall opacity of the brush. |
| `BitmapInterpolationMode` | Interpolation quality: `Default`, `LowQuality`, `MediumQuality`, `HighQuality`. |

### Tiling example

```xml
<Border Width="300" Height="200">
    <Border.Background>
        <ImageBrush Source="avares://MyApp/Assets/pattern.png"
                    TileMode="Tile"
                    DestinationRect="0,0,32,32" />
    </Border.Background>
</Border>
```

## VisualBrush

Paints an area using the rendered output of another visual element.

```xml
<Border Width="200" Height="200" BorderBrush="Gray" BorderThickness="1">
    <Border.Background>
        <VisualBrush Stretch="Uniform" TileMode="Tile"
                     DestinationRect="0,0,50,50">
            <VisualBrush.Visual>
                <TextBlock Text="Avalonia" FontSize="14" Foreground="LightGray"
                           RenderTransform="rotate(45deg)" />
            </VisualBrush.Visual>
        </VisualBrush>
    </Border.Background>
</Border>
```

### Key properties

| Property | Description |
|---|---|
| `Visual` | The visual element to render as the brush content. |
| `Stretch` | How the visual fills the area. |
| `TileMode` | Tiling mode for repeating the visual. |
| `SourceRect` | The portion of the visual to use. |
| `DestinationRect` | The destination rectangle for each tile. |

:::info
`VisualBrush` captures the visual appearance of any control. This is useful for creating reflection effects, watermarks, and preview thumbnails.
:::

## Common brush properties

All brush types share these properties:

| Property | Description |
|---|---|
| `Opacity` | A value between 0.0 (transparent) and 1.0 (opaque). |
| `Transform` | A transform applied to the brush coordinates. |
| `TransformOrigin` | The origin point for the brush transform. |

## OpacityMask

Any control's `OpacityMask` property accepts a brush that controls per-pixel transparency. The alpha channel of the mask brush determines the opacity of each pixel in the control.

```xml
<Image Source="avares://MyApp/Assets/photo.png" Width="200" Height="200">
    <Image.OpacityMask>
        <LinearGradientBrush StartPoint="0%,0%" EndPoint="0%,100%">
            <GradientStop Color="Black" Offset="0" />
            <GradientStop Color="Transparent" Offset="1" />
        </LinearGradientBrush>
    </Image.OpacityMask>
</Image>
```

In this example, the image fades from fully visible at the top to transparent at the bottom. The color values in the mask do not matter; only the alpha channel is used.

## Using brushes as resources

Define brushes as resources for reuse across your application:

```xml
<Application.Resources>
    <SolidColorBrush x:Key="PrimaryBrush" Color="#6366F1" />
    <LinearGradientBrush x:Key="AccentGradient" StartPoint="0%,0%" EndPoint="100%,100%">
        <GradientStop Color="#6366F1" Offset="0" />
        <GradientStop Color="#EC4899" Offset="1" />
    </LinearGradientBrush>
</Application.Resources>
```

```xml
<Button Background="{StaticResource PrimaryBrush}" />
<Border Background="{DynamicResource AccentGradient}" />
```

## Brushes in code

```csharp
// SolidColorBrush
var solid = new SolidColorBrush(Colors.IndianRed);

// LinearGradientBrush
var linear = new LinearGradientBrush
{
    StartPoint = new RelativePoint(0, 0.5, RelativeUnit.Relative),
    EndPoint = new RelativePoint(1, 0.5, RelativeUnit.Relative),
    GradientStops =
    {
        new GradientStop(Colors.Blue, 0),
        new GradientStop(Colors.Red, 1)
    }
};

// RadialGradientBrush
var radial = new RadialGradientBrush
{
    GradientStops =
    {
        new GradientStop(Colors.White, 0),
        new GradientStop(Colors.Black, 1)
    }
};

myBorder.Background = linear;
```

## See also

- [Gradients](gradients): Focused guide on linear gradient usage.
- [Drawing Graphics](drawing-graphics): Shapes and geometries.
- [Image Interpolation](image-interpolation): Bitmap rendering quality settings.
