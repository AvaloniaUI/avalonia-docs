---
id: layouttransformcontrol
title: LayoutTransformControl
---

`LayoutTransformControl` applies a transform (rotation, scale, skew) to its child that participates in layout. Unlike `RenderTransform`, which only changes how a control is drawn without affecting surrounding layout, `LayoutTransformControl` causes parent panels to measure and arrange around the transformed bounds.

This means a rotated control will correctly push adjacent controls aside, and a scaled control will take up the appropriate amount of space in a `StackPanel` or `Grid`.

## Useful properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `LayoutTransform` | `ITransform` | The transform to apply during layout. Supports `RotateTransform`, `ScaleTransform`, `SkewTransform`, `TransformGroup`, and `MatrixTransform` |
| `UseRenderTransform` | `bool` | When `true`, applies the transform via `RenderTransform` instead of a separate layout pass. Defaults to `false` |
| `Child` | `Control` | The child control to transform (inherited from `Decorator`) |
| `Padding` | `Thickness` | Padding around the child (inherited from `Decorator`) |

## LayoutTransform vs. RenderTransform

| | `LayoutTransformControl` | `RenderTransform` |
| :--- | :--- | :--- |
| Affects layout | Yes, siblings reflow around transformed bounds | No, siblings ignore the transform |
| Performance | Re-measures and re-arranges on transform changes | Lightweight, GPU-accelerated |
| Use when | Surrounding content must respect the transformed size | Animating or visually adjusting without layout impact |

## Examples

### Rotating a control

This rotates a button 45 degrees. The parent `StackPanel` allocates space for the rotated bounds, so the text below is not overlapped:

<XamlPreview>

```xml
<StackPanel Spacing="8" HorizontalAlignment="Center" xmlns="https://github.com/avaloniaui">
  <LayoutTransformControl>
    <LayoutTransformControl.LayoutTransform>
      <RotateTransform Angle="45" />
    </LayoutTransformControl.LayoutTransform>
    <Button Content="Rotated 45°" />
  </LayoutTransformControl>
  <TextBlock Text="This text is positioned below the rotated button." />
</StackPanel>
```

</XamlPreview>

### Scaling a control

Scale a control to twice its size while keeping layout correct:

```xml
<LayoutTransformControl>
  <LayoutTransformControl.LayoutTransform>
    <ScaleTransform ScaleX="2" ScaleY="2" />
  </LayoutTransformControl.LayoutTransform>
  <TextBlock Text="Double size" />
</LayoutTransformControl>
```

### Combining transforms

Use a `TransformGroup` to apply multiple transforms:

```xml
<LayoutTransformControl>
  <LayoutTransformControl.LayoutTransform>
    <TransformGroup>
      <ScaleTransform ScaleX="1.5" ScaleY="1.5" />
      <RotateTransform Angle="30" />
    </TransformGroup>
  </LayoutTransformControl.LayoutTransform>
  <Border Background="LightBlue" Padding="12">
    <TextBlock Text="Scaled and rotated" />
  </Border>
</LayoutTransformControl>
```

### Binding the angle

Bind the rotation angle to a slider for interactive control:

```xml
<StackPanel Spacing="12">
  <Slider x:Name="AngleSlider" Minimum="0" Maximum="360" Value="0" />
  <LayoutTransformControl HorizontalAlignment="Center">
    <LayoutTransformControl.LayoutTransform>
      <RotateTransform Angle="{Binding #AngleSlider.Value}" />
    </LayoutTransformControl.LayoutTransform>
    <Border Background="LightCoral" Padding="16">
      <TextBlock Text="Drag the slider to rotate" />
    </Border>
  </LayoutTransformControl>
</StackPanel>
```

## See also

- [Decorator](/controls/layout/decorator)
- [LayoutTransformControl API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_LayoutTransformControl)
- [`LayoutTransformControl.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/LayoutTransformControl.cs)
