---
id: render-vs-layout-transforms
title: Render transforms vs layout transforms
description: Differences between render transforms and layout transforms in Avalonia.
doc-type: explanation
---

Avalonia provides two ways to transform controls: render transforms and layout transforms. They produce different visual results because they apply at different stages of the rendering pipeline.

## Render transforms

A **render transform** changes how a control is drawn without affecting layout. The control's position and size in the layout system remain unchanged. Other controls do not move to accommodate the transform.

```xml
<StackPanel Spacing="8">
    <Button Content="Normal" />
    <Button Content="Rotated (render)">
        <Button.RenderTransform>
            <RotateTransform Angle="15" />
        </Button.RenderTransform>
    </Button>
    <Button Content="Below" />
</StackPanel>
```

In this example, the rotated button visually overlaps adjacent buttons because the layout does not account for the rotation.

### RenderTransformOrigin

The pivot point for render transforms. In Avalonia, the default is `50%,50%` (center of the control), unlike WPF where the default is `0%,0%` (top-left).

```xml
<!-- Rotate around the top-left corner -->
<Border RenderTransformOrigin="0%,0%">
    <Border.RenderTransform>
        <RotateTransform Angle="45" />
    </Border.RenderTransform>
</Border>

<!-- Rotate around the center (default) -->
<Border>
    <Border.RenderTransform>
        <RotateTransform Angle="45" />
    </Border.RenderTransform>
</Border>
```

### Common render transform types

| Transform | Description | Example |
|---|---|---|
| `RotateTransform` | Rotates the control. | `<RotateTransform Angle="45" />` |
| `ScaleTransform` | Scales the control. | `<ScaleTransform ScaleX="1.5" ScaleY="1.5" />` |
| `TranslateTransform` | Moves the control visually. | `<TranslateTransform X="10" Y="-5" />` |
| `SkewTransform` | Skews the control. | `<SkewTransform AngleX="15" />` |
| `TransformGroup` | Combines multiple transforms. | See below. |

### Combining transforms

```xml
<Image Source="/assets/photo.jpg" Width="100" Height="100">
    <Image.RenderTransform>
        <TransformGroup>
            <ScaleTransform ScaleX="1.2" ScaleY="1.2" />
            <RotateTransform Angle="10" />
        </TransformGroup>
    </Image.RenderTransform>
</Image>
```

## Layout transforms

A **layout transform** changes a control's size and orientation before layout occurs. The parent panel sees the transformed size and positions other controls accordingly. This prevents overlap.

Use `LayoutTransformControl` to apply a layout transform:

```xml
<StackPanel Spacing="8">
    <Button Content="Normal" />
    <LayoutTransformControl>
        <LayoutTransformControl.LayoutTransform>
            <RotateTransform Angle="15" />
        </LayoutTransformControl.LayoutTransform>
        <Button Content="Rotated (layout)" />
    </LayoutTransformControl>
    <Button Content="Below (properly positioned)" />
</StackPanel>
```

The "Below" button is positioned below the rotated control's full bounds, with no overlap.

### Common layout transform use cases

| Scenario | Why layout transform |
|---|---|
| Vertical text labels | The rotated text should reserve the correct amount of space. |
| Scaled content areas | Adjacent panels should adapt to the scaled size. |
| Rotated form fields | Labels and inputs should flow around the rotated element. |

```xml
<!-- Vertical text that takes correct space in a horizontal layout -->
<StackPanel Orientation="Horizontal" Spacing="8">
    <LayoutTransformControl>
        <LayoutTransformControl.LayoutTransform>
            <RotateTransform Angle="-90" />
        </LayoutTransformControl.LayoutTransform>
        <TextBlock Text="Vertical Label" />
    </LayoutTransformControl>
    <Border Background="LightBlue" Width="200" Height="100">
        <TextBlock Text="Content area" VerticalAlignment="Center"
                   HorizontalAlignment="Center" />
    </Border>
</StackPanel>
```

## Comparison

| Feature | Render Transform | Layout Transform |
|---|---|---|
| Affects layout | No | Yes |
| Other controls adjust | No | Yes |
| Performance | Faster (no re-layout) | Slower (triggers layout pass) |
| Animatable | Yes | Yes, but causes layout recalculation each frame |
| Applied via | `RenderTransform` property | `LayoutTransformControl` |
| Default origin | Center (50%, 50%) | Center |
| Overlap risk | Yes | No |

## When to use which

**Use render transforms when:**
- The transform is temporary or animated (hover effects, transitions)
- Performance matters (animations should not trigger layout)
- Overlap with other elements is acceptable or desired
- You are creating visual effects (parallax, bounce, shake)

**Use layout transforms when:**
- Adjacent controls must respect the transformed bounds
- You need rotated text labels that correctly reserve space
- The transform is part of the permanent layout (not animated)
- Overlap would be a visual bug

## Animating transforms

Render transforms are ideal for animation because they do not trigger layout:

```xml
<Border Background="Blue" Width="80" Height="80">
    <Border.Styles>
        <Style Selector="Border:pointerover">
            <Style.Animations>
                <Animation Duration="0:0:0.2">
                    <KeyFrame Cue="100%">
                        <Setter Property="ScaleTransform.ScaleX" Value="1.1" />
                        <Setter Property="ScaleTransform.ScaleY" Value="1.1" />
                    </KeyFrame>
                </Animation>
            </Style.Animations>
        </Style>
    </Border.Styles>
</Border>
```

Avoid animating layout transforms in performance-sensitive scenarios, as each frame triggers a full layout pass.

## See also

- [Transforms](/docs/graphics-animation/transforms): Full transform reference.
- [Animations](/docs/graphics-animation/animations): Keyframe and transition animations.
- [Performance](/docs/app-development/performance): Layout performance tips.
