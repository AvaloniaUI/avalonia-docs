---
id: transforms
title: Transforms
description: Render transforms and layout transforms for modifying position, size, rotation, and skew.
doc-type: explanation
---

Transforms modify the position, size, rotation, or skew of visual elements without changing their layout. Avalonia supports render transforms (applied after layout) and layout transforms (applied during layout via [`LayoutTransformControl`](/api/avalonia/controls/layouttransformcontrol)).

## RenderTransform

The `RenderTransform` property is available on every `Visual` element. It applies a transformation after layout has been calculated, so it does not affect the size or position of neighboring controls.

```xml
<Button Content="Rotated" RenderTransformOrigin="50%,50%">
    <Button.RenderTransform>
        <RotateTransform Angle="15" />
    </Button.RenderTransform>
</Button>
```

### RenderTransformOrigin

The `RenderTransformOrigin` property defines the point around which transforms are applied, using relative coordinates. The default is `50%,50%` (center of the element).

```xml
<Image Source="avares://MyApp/Assets/logo.png"
       RenderTransformOrigin="50%,50%">
    <Image.RenderTransform>
        <ScaleTransform ScaleX="1.5" ScaleY="1.5" />
    </Image.RenderTransform>
</Image>
```

## Transform types

### RotateTransform

Rotates an element by a specified angle in degrees.

| Property | Description |
|---|---|
| `Angle` | The rotation angle in degrees. Positive values rotate clockwise. |
| `CenterX`, `CenterY` | An additional offset from `RenderTransformOrigin` for the center of rotation, in device-independent pixels. Defaults to 0. |

```xml
<Border Width="100" Height="100" Background="SteelBlue"
        RenderTransformOrigin="50%,50%">
    <Border.RenderTransform>
        <RotateTransform Angle="45" />
    </Border.RenderTransform>
</Border>
```

### ScaleTransform

Scales an element horizontally, vertically, or both.

| Property | Description |
|---|---|
| `ScaleX` | The horizontal scale factor. 1.0 is normal size, 2.0 is double, 0.5 is half. |
| `ScaleY` | The vertical scale factor. |
| `CenterX`, `CenterY` | An additional offset from `RenderTransformOrigin` for the center of scaling, in device-independent pixels. Defaults to 0. |

```xml
<!-- Double the width, keep the height -->
<TextBlock Text="Stretched" RenderTransformOrigin="50%,50%">
    <TextBlock.RenderTransform>
        <ScaleTransform ScaleX="2" ScaleY="1" />
    </TextBlock.RenderTransform>
</TextBlock>

<!-- Mirror horizontally -->
<Image Source="avares://MyApp/Assets/arrow.png">
    <Image.RenderTransform>
        <ScaleTransform ScaleX="-1" ScaleY="1" />
    </Image.RenderTransform>
</Image>
```

### SkewTransform

Shears an element along the X or Y axis.

| Property | Description |
|---|---|
| `AngleX` | The horizontal skew angle in degrees. |
| `AngleY` | The vertical skew angle in degrees. |
| `CenterX`, `CenterY` | An additional offset from `RenderTransformOrigin` for the center of the skew, in device-independent pixels. Defaults to 0. |

```xml
<Border Width="100" Height="60" Background="Orange"
        RenderTransformOrigin="50%,50%">
    <Border.RenderTransform>
        <SkewTransform AngleX="20" />
    </Border.RenderTransform>
</Border>
```

### TranslateTransform

Moves an element by a specified offset without affecting layout.

| Property | Description |
|---|---|
| `X` | The horizontal offset in device-independent pixels. |
| `Y` | The vertical offset in device-independent pixels. |

```xml
<TextBlock Text="Shifted" RenderTransformOrigin="50%,50%">
    <TextBlock.RenderTransform>
        <TranslateTransform X="20" Y="-10" />
    </TextBlock.RenderTransform>
</TextBlock>
```

### MatrixTransform

Applies an arbitrary 2D affine transformation defined by a 3x2 matrix.

| Property | Description |
|---|---|
| `Matrix` | A string in the format `m11,m12,m21,m22,offsetX,offsetY`. |

```xml
<Border Width="80" Height="80" Background="Purple">
    <Border.RenderTransform>
        <MatrixTransform Matrix="1,0,0.5,1,0,0" />
    </Border.RenderTransform>
</Border>
```

The identity matrix is `1,0,0,1,0,0` (no transformation).

### TransformGroup

Combines multiple transforms into a single transformation. Transforms are applied in the order they appear.

```xml
<Border Width="100" Height="60" Background="Teal"
        RenderTransformOrigin="50%,50%">
    <Border.RenderTransform>
        <TransformGroup>
            <ScaleTransform ScaleX="1.5" ScaleY="1.5" />
            <RotateTransform Angle="30" />
        </TransformGroup>
    </Border.RenderTransform>
</Border>
```

:::info
The order of transforms within a `TransformGroup` matters. Scaling then rotating produces a different result than rotating then scaling.
:::

## Shorthand syntax

Avalonia supports a CSS-like shorthand for `RenderTransform`:

```xml
<Border RenderTransform="rotate(45deg)" />
<Border RenderTransform="scale(2, 1)" />
<Border RenderTransform="translate(10px, 20px)" />
<Border RenderTransform="skew(15deg, 0deg)" />
```

Multiple transforms can be chained:

```xml
<Border RenderTransform="scale(1.5) rotate(30deg)" />
```

## LayoutTransformControl

`RenderTransform` does not affect layout calculations, which means neighboring controls are not aware of the transformation. If you need a transform that participates in layout (for example, rotating a sidebar so adjacent content adjusts), wrap the element in a `LayoutTransformControl`:

```xml
<LayoutTransformControl>
    <LayoutTransformControl.LayoutTransform>
        <RotateTransform Angle="90" />
    </LayoutTransformControl.LayoutTransform>
    <TextBlock Text="Vertical text" />
</LayoutTransformControl>
```

The `LayoutTransformControl` measures and arranges its child with the transform applied, so the parent panel allocates space for the transformed size.

## Animating transforms

Transforms are commonly animated using keyframe animations or transitions. Bind the transform property to animate smooth rotations, scaling effects, or movement.

```xml
<Border Width="80" Height="80" Background="Coral"
        RenderTransformOrigin="50%,50%">
    <Border.RenderTransform>
        <RotateTransform x:Name="MyRotation" Angle="0" />
    </Border.RenderTransform>
    <Border.Styles>
        <Style Selector="Border:pointerover">
            <Style.Animations>
                <Animation Duration="0:0:0.3">
                    <KeyFrame Cue="100%">
                        <Setter Property="RotateTransform.Angle" Value="90" />
                    </KeyFrame>
                </Animation>
            </Style.Animations>
        </Style>
    </Border.Styles>
</Border>
```

For more information on animations, see [Keyframe Animations](keyframe-animations) and [Control Transitions](control-transitions).

## Transforms in code

```csharp
var rotateTransform = new RotateTransform(45);
myBorder.RenderTransform = rotateTransform;
myBorder.RenderTransformOrigin = RelativePoint.Center;

// TransformGroup
var group = new TransformGroup();
group.Children.Add(new ScaleTransform(2, 2));
group.Children.Add(new RotateTransform(30));
myBorder.RenderTransform = group;

// Animate a transform property
rotateTransform.Angle = 90; // Immediate change
```

## See also

- [Keyframe Animations](keyframe-animations): Animate transforms over time.
- [Control Transitions](control-transitions): Apply transitions when property values change.
- [Drawing Graphics](drawing-graphics): Shapes and geometries.
