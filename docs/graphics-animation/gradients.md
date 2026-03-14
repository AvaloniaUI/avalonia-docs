---
id: gradients
title: Gradients
description: How to use LinearGradientBrush, RadialGradientBrush, and ConicGradientBrush to create color transitions in Avalonia UI.
doc-type: reference
---

Gradient brushes create smooth transitions between two or more colors. You can use them anywhere a brush is accepted, including `Background`, `Foreground`, `BorderBrush`, `Fill`, and `Stroke`. Avalonia provides three gradient brush types:

| Brush | Description |
|---|---|
| [`LinearGradientBrush`](/api/avalonia/media/lineargradientbrush) | Transitions colors along a straight line. |
| [`RadialGradientBrush`](/api/avalonia/media/radialgradientbrush) | Transitions colors outward from a center point in an ellipse. |
| [`ConicGradientBrush`](/api/avalonia/media/conicgradientbrush) | Transitions colors in a sweep around a center point. |

All gradient brushes share the `GradientStops` collection and `SpreadMethod` property. The sections below cover each brush type, followed by shared concepts that apply to all of them.

## Linear gradient brush

`LinearGradientBrush` blends colors along a line defined by a start point and an end point.

### Basic syntax

```xml
<LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,0%">
    <GradientStop Color="#FF6B6B" Offset="0.0"/>
    <GradientStop Color="#4ECDC4" Offset="1.0"/>
</LinearGradientBrush>
```

### `StartPoint` and `EndPoint`

These two properties control the direction of the gradient. You can specify values as percentages (for example, `"0%,50%"`) or as decimals relative to the bounding box (for example, `"0,0.5"`). Both forms are equivalent.

Common direction patterns:

| Direction | `StartPoint` | `EndPoint` |
|---|---|---|
| Horizontal (left to right) | `0%,50%` | `100%,50%` |
| Vertical (top to bottom) | `50%,0%` | `50%,100%` |
| Diagonal (top-left to bottom-right) | `0%,0%` | `100%,100%` |

### Horizontal gradient

```xml
<LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">
    <GradientStop Color="#FF6B6B" Offset="0.0"/>
    <GradientStop Color="#4ECDC4" Offset="1.0"/>
</LinearGradientBrush>
```

### Vertical gradient

```xml
<LinearGradientBrush StartPoint="50%,0%" EndPoint="50%,100%">
    <GradientStop Color="#A8E6CF" Offset="0.0"/>
    <GradientStop Color="#3D84A8" Offset="1.0"/>
</LinearGradientBrush>
```

### Multi-color gradient

Add more [`GradientStop`](/api/avalonia/media/gradientstop) elements to create transitions through multiple colors. Space the `Offset` values to control where each color appears:

```xml
<LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">
    <GradientStop Color="#FF6B6B" Offset="0.0"/>
    <GradientStop Color="#FF8E53" Offset="0.3"/>
    <GradientStop Color="#FF5E3A" Offset="0.6"/>
    <GradientStop Color="#4ECDC4" Offset="1.0"/>
</LinearGradientBrush>
```

### Common use cases

#### Button background

```xml
<Button>
    <Button.Background>
        <LinearGradientBrush StartPoint="0%,0%" EndPoint="0%,100%">
            <GradientStop Color="#4CAF50" Offset="0.0"/>
            <GradientStop Color="#45A049" Offset="1.0"/>
        </LinearGradientBrush>
    </Button.Background>
</Button>
```

#### Panel background

```xml
<Border CornerRadius="8">
    <Border.Background>
        <LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,100%">
            <GradientStop Color="#FF9A9E" Offset="0.0"/>
            <GradientStop Color="#FAD0C4" Offset="0.5"/>
            <GradientStop Color="#FFD1FF" Offset="1.0"/>
        </LinearGradientBrush>
    </Border.Background>
</Border>
```

## Radial gradient brush

`RadialGradientBrush` blends colors outward from a center point in an elliptical shape.

### Basic syntax

```xml
<RadialGradientBrush GradientOrigin="50%,50%" Center="50%,50%" RadiusX="50%" RadiusY="50%">
    <GradientStop Color="Yellow" Offset="0.0"/>
    <GradientStop Color="Red" Offset="1.0"/>
</RadialGradientBrush>
```

### Key properties

| Property | Description |
|---|---|
| `Center` | The center of the outermost ellipse, as a percentage of the bounding box. Defaults to `50%,50%`. |
| `GradientOrigin` | The point where the gradient starts (the innermost color). Defaults to match `Center`. |
| `RadiusX`, `RadiusY` | The horizontal and vertical radii of the ellipse. Default to `50%`. |

When you set `GradientOrigin` to a value different from `Center`, the gradient appears off-center, which is useful for simulating lighting effects:

```xml
<RadialGradientBrush GradientOrigin="30%,30%" Center="50%,50%">
    <GradientStop Color="White" Offset="0.0"/>
    <GradientStop Color="#3D84A8" Offset="1.0"/>
</RadialGradientBrush>
```

### Elliptical gradient

You can create non-circular gradients by giving `RadiusX` and `RadiusY` different values:

```xml
<RadialGradientBrush Center="50%,50%" RadiusX="80%" RadiusY="40%">
    <GradientStop Color="#A8E6CF" Offset="0.0"/>
    <GradientStop Color="#3D84A8" Offset="1.0"/>
</RadialGradientBrush>
```

## Conic gradient brush

`ConicGradientBrush` sweeps colors around a center point, similar to the face of a color wheel.

### Basic syntax

```xml
<ConicGradientBrush Center="50%,50%" Angle="0">
    <GradientStop Color="Red" Offset="0.0"/>
    <GradientStop Color="Yellow" Offset="0.25"/>
    <GradientStop Color="Green" Offset="0.5"/>
    <GradientStop Color="Blue" Offset="0.75"/>
    <GradientStop Color="Red" Offset="1.0"/>
</ConicGradientBrush>
```

### Key properties

| Property | Description |
|---|---|
| `Center` | The center of the sweep. Defaults to `50%,50%`. |
| `Angle` | The starting angle in degrees, measured clockwise from the top. Defaults to `0`. |

To create a seamless sweep, set the last `GradientStop` color to match the first.

## Shared gradient concepts

### `GradientStop` elements

Every gradient brush contains one or more `GradientStop` elements. Each stop defines a `Color` and an `Offset`:

| Property | Description |
|---|---|
| `Color` | Any valid color value (hex, named color, `rgb()`, `hsl()`, and so on). |
| `Offset` | A value from `0.0` to `1.0` indicating the position along the gradient. |

If you omit `Offset`, Avalonia distributes the stops evenly. When two stops share the same offset, you get a hard color edge instead of a smooth transition.

### `SpreadMethod`

`SpreadMethod` controls what happens when the gradient does not fill the entire area (for example, when a `LinearGradientBrush` has its start and end points inside the bounding box).

| Value | Behavior |
|---|---|
| `Pad` (default) | The end colors extend to fill the remaining space. |
| `Reflect` | The gradient reverses direction and repeats. |
| `Repeat` | The gradient repeats from the beginning. |

```xml
<LinearGradientBrush StartPoint="0%,50%" EndPoint="50%,50%" SpreadMethod="Reflect">
    <GradientStop Color="#08AEEA" Offset="0.0"/>
    <GradientStop Color="#2AF598" Offset="1.0"/>
</LinearGradientBrush>
```

### `Opacity`

All gradient brushes inherit the `Opacity` property from `Brush`. Set it to a value between `0.0` (fully transparent) and `1.0` (fully opaque) to make the entire gradient semi-transparent:

```xml
<LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%" Opacity="0.5">
    <GradientStop Color="#FF6B6B" Offset="0.0"/>
    <GradientStop Color="#4ECDC4" Offset="1.0"/>
</LinearGradientBrush>
```

If you need per-color transparency instead, use an alpha channel in the `Color` value (for example, `#80FF6B6B`).

### Creating gradients in code-behind

You can build gradient brushes in C# when you need to generate them dynamically:

```csharp
var brush = new LinearGradientBrush
{
    StartPoint = new RelativePoint(0, 0.5, RelativeUnit.Relative),
    EndPoint = new RelativePoint(1, 0.5, RelativeUnit.Relative),
    GradientStops =
    {
        new GradientStop(Color.Parse("#FF6B6B"), 0.0),
        new GradientStop(Color.Parse("#4ECDC4"), 1.0)
    }
};

myBorder.Background = brush;
```

The same pattern applies to `RadialGradientBrush` and `ConicGradientBrush`.

## Full example

<XamlPreview>

```xml
<StackPanel Spacing="20" Margin="20" xmlns="https://github.com/avaloniaui">
    <!-- Horizontal gradient -->
    <Border Height="100" CornerRadius="8">
        <Border.Background>
            <LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">
                <GradientStop Color="#FF6B6B" Offset="0.0"/>
                <GradientStop Color="#FF8E53" Offset="0.3"/>
                <GradientStop Color="#FF5E3A" Offset="0.6"/>
                <GradientStop Color="#4ECDC4" Offset="1.0"/>
            </LinearGradientBrush>
        </Border.Background>
        <TextBlock Text="Horizontal"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center"
                   Foreground="White"/>
    </Border>

    <!-- Vertical gradient -->
    <Border Height="100" CornerRadius="8">
        <Border.Background>
            <LinearGradientBrush StartPoint="50%,0%" EndPoint="50%,100%">
                <GradientStop Color="#A8E6CF" Offset="0.0"/>
                <GradientStop Color="#3D84A8" Offset="0.5"/>
                <GradientStop Color="#46CDCF" Offset="1.0"/>
            </LinearGradientBrush>
        </Border.Background>
        <TextBlock Text="Vertical"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center"
                   Foreground="White"/>
    </Border>

    <!-- Radial gradient -->
    <Border Height="100" CornerRadius="8">
        <Border.Background>
            <RadialGradientBrush GradientOrigin="30%,30%">
                <GradientStop Color="White" Offset="0.0"/>
                <GradientStop Color="#3D84A8" Offset="1.0"/>
            </RadialGradientBrush>
        </Border.Background>
        <TextBlock Text="Radial"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center"
                   Foreground="White"/>
    </Border>

    <!-- Conic gradient -->
    <Border Height="100" CornerRadius="8">
        <Border.Background>
            <ConicGradientBrush Center="50%,50%">
                <GradientStop Color="#FF6B6B" Offset="0.0"/>
                <GradientStop Color="#4ECDC4" Offset="0.5"/>
                <GradientStop Color="#FF6B6B" Offset="1.0"/>
            </ConicGradientBrush>
        </Border.Background>
        <TextBlock Text="Conic"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center"
                   Foreground="White"/>
    </Border>
</StackPanel>
```

</XamlPreview>

## See also

- [Brushes](brushes): Overview of all brush types, including `SolidColorBrush` and tile brushes.
- [Effects](effects): Box shadows, clipping, and opacity masks.
- [Shapes and geometries](shapes-and-geometries): Drawing shapes that you can fill with gradient brushes.
- [Custom rendering](custom-rendering): Low-level drawing with `DrawingContext` where you can use gradient brushes directly.