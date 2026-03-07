---
id: gradients
title: Gradients
description: LinearGradientBrush and RadialGradientBrush syntax and configuration in Avalonia.
doc-type: reference
---

`LinearGradientBrush` creates a gradient that transitions between two or more colors along a line. You can use it anywhere a brush is accepted: backgrounds, foregrounds, borders, and fills.

## Basic syntax
A `LinearGradientBrush` is defined using the following basic structure:

```xml
<LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,0%">
    <GradientStop Color="#COLOR1" Offset="0.0"/>
    <GradientStop Color="#COLOR2" Offset="1.0"/>
</LinearGradientBrush>
```

## Key properties

### `StartPoint` and `EndPoint`

* Defines the direction of the gradient
* Uses percentage values (e.g., "0%,0%") or decimal values (0,0)
* Common patterns:
  * Horizontal: StartPoint="0%,50%" EndPoint="100%,50%"
  * Vertical: StartPoint="50%,0%" EndPoint="50%,100%"
  * Diagonal: StartPoint="0%,0%" EndPoint="100%,100%"

### `GradientStop` elements

* Define colors and their positions in the gradient
* Properties:
  * `Color`: The color value (Hex code or named color)
  * `Offset`: Position in the gradient (0.0 to 1.0)

## Common gradient patterns

### Horizontal gradient

```xml
<LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">
    <GradientStop Color="#FF6B6B" Offset="0.0"/>
    <GradientStop Color="#4ECDC4" Offset="1.0"/>
</LinearGradientBrush>
```

### Multi-color gradient

```xml
<LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">
    <GradientStop Color="#FF6B6B" Offset="0.0"/>
    <GradientStop Color="#FF8E53" Offset="0.3"/>
    <GradientStop Color="#FF5E3A" Offset="0.6"/>
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

## Common use cases

### Button backgrounds

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

### Panel backgrounds

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

    <!-- Diagonal gradient -->
    <Border Height="100" CornerRadius="8">
        <Border.Background>
            <LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,100%">
                <GradientStop Color="#FF9A9E" Offset="0.0"/>
                <GradientStop Color="#FAD0C4" Offset="0.25"/>
                <GradientStop Color="#FFB6C1" Offset="0.5"/>
                <GradientStop Color="#FFD1FF" Offset="1.0"/>
            </LinearGradientBrush>
        </Border.Background>
        <TextBlock Text="Diagonal"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center"
                   Foreground="Black"/>
    </Border>

    <!-- Custom angle gradient -->
    <Border Height="100" CornerRadius="8">
        <Border.Background>
            <LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,50%">
                <GradientStop Color="#08AEEA" Offset="0.0"/>
                <GradientStop Color="#2AF598" Offset="0.3"/>
                <GradientStop Color="#08AEEA" Offset="0.6"/>
                <GradientStop Color="#2AF598" Offset="1.0"/>
            </LinearGradientBrush>
        </Border.Background>
        <TextBlock Text="Custom angle"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center"
                   Foreground="White"/>
    </Border>
</StackPanel>
```

</XamlPreview>

## See also

- [Brushes](brushes): All brush types including radial and conic gradients.
- [Effects](effects): Box shadows, clipping, and opacity masks.