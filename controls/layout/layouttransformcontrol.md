---
id: layouttransformcontrol
title: LayoutTransformControl
description: A decorator control that applies layout-aware transforms such as rotation, scale, and skew to a single child, causing parent panels to measure and arrange around the transformed bounds.
doc-type: reference
---

The [`LayoutTransformControl`](/api/avalonia/controls/layouttransformcontrol) applies a transform (rotation, scale, skew) to its child that participates in layout. Unlike `RenderTransform`, which only changes how a control is drawn without affecting surrounding layout, [`LayoutTransformControl`](/api/avalonia/controls/layouttransformcontrol) causes parent panels to measure and arrange around the transformed bounds.

This means a rotated control will correctly push adjacent controls aside, and a scaled control will take up the appropriate amount of space in a `StackPanel` or `Grid`.

## Common properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `LayoutTransform` | `ITransform` | The transform to apply during layout. Supports `RotateTransform`, `ScaleTransform`, `SkewTransform`, `TransformGroup`, and `MatrixTransform` |
| `UseRenderTransform` | `bool` | When `true`, applies the transform via `RenderTransform` instead of a separate layout pass. Defaults to `false` |
| `Child` | `Control` | The child control to transform (inherited from `Decorator`) |
| `Padding` | `Thickness` | Padding around the child (inherited from `Decorator`) |

## `LayoutTransform` vs. `RenderTransform`

| | `LayoutTransformControl` | `RenderTransform` |
| :--- | :--- | :--- |
| Affects layout | Yes, siblings reflow around transformed bounds | No, siblings ignore the transform |
| Performance | Re-measures and re-arranges on transform changes | Lightweight, GPU-accelerated |
| Use when | Surrounding content must respect the transformed size | Animating or visually adjusting without layout impact |

## Examples

### Rotating a control

This rotates a button 45 degrees. The parent `StackPanel` allocates space for the rotated bounds, so the text below is not overlapped:

<XamlPreview>

```xml title="XAML"
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

You can scale a control to twice its size while keeping layout correct:

```xml title="XAML"
<LayoutTransformControl>
  <LayoutTransformControl.LayoutTransform>
    <ScaleTransform ScaleX="2" ScaleY="2" />
  </LayoutTransformControl.LayoutTransform>
  <TextBlock Text="Double size" />
</LayoutTransformControl>
```

### Combining transforms

Use a `TransformGroup` to apply multiple transforms:

```xml title="XAML"
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

You can bind the rotation angle to a slider for interactive control:

```xml title="XAML"
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

## Practical notes

- **Performance**: Because `LayoutTransformControl` triggers a full measure and arrange pass whenever the transform changes, avoid animating its `LayoutTransform` at high frequency. If you need smooth, frame-rate animations (such as a spinning icon), use `RenderTransform` instead.
- **Nesting**: You can nest a `LayoutTransformControl` inside another `LayoutTransformControl`. Each one measures its child independently, so transforms compose outward through the layout tree.
- **`UseRenderTransform`**: Setting this property to `true` applies the transform through `RenderTransform` rather than a separate layout pass. This can be useful when you want the convenience of declaring the transform in `LayoutTransform` syntax but do not need surrounding controls to reflow.
- **Clipping**: Parent containers that clip their children (for example, a `Border` with `ClipToBounds="True"`) may clip the transformed bounds. Make sure the parent has enough space to display the full transformed area.

## See also

- [Decorator](/controls/layout/decorator)
- [Border](/controls/layout/border)
- [Viewbox](/controls/layout/viewbox)
- [Transforms](/concepts/transforms)
- [LayoutTransformControl API reference](/api/avalonia/controls/layouttransformcontrol)
- [`LayoutTransformControl.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/LayoutTransformControl.cs)
