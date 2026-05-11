---
id: slider-how-to
title: "How to: Work with Slider"
description: "Learn how to configure Slider ranges, display values, add tick marks, set orientation, and bind to view models in Avalonia UI."
doc-type: how-to
---

This guide covers common [`Slider`](/api/avalonia/controls/slider) scenarios including range configuration, value display, tick marks, vertical orientation, and two-way data binding.

## Basic slider with value display

You can show the current value alongside the slider by binding a `TextBlock` to the slider's `Value` property. The `StringFormat` markup lets you control how the number appears:

```xml
<StackPanel Spacing="8">
    <TextBlock Text="{Binding #slider.Value, StringFormat='Volume: {0:F0}%'}" />
    <Slider x:Name="slider" Minimum="0" Maximum="100" Value="50" />
</StackPanel>
```

The `#slider` syntax references the control by its `x:Name`. This approach is useful for quick prototypes, but for production code you should prefer binding through a view model.

## Binding to a view model

For proper separation of concerns, bind `Value` to a property on your view model. The binding is two-way by default for `Slider`, so changes from either the UI or your code stay in sync:

```csharp
public partial class SettingsViewModel : ObservableObject
{
    [ObservableProperty]
    private double _brightness = 75;
}
```

```xml
<Slider Minimum="0" Maximum="100" Value="{Binding Brightness}" />
```

:::tip
If you need to react when the value changes (for example, to save a preference), add a partial method such as `OnBrightnessChanged` in your view model. The MVVM Toolkit source generator creates it automatically.
:::

## Tick marks and snapping

Use `TickFrequency` with `IsSnapToTickEnabled` to restrict values to discrete steps. This is especially helpful when your domain requires round numbers (volume levels, percentage increments, star ratings):

```xml
<!-- Snaps to multiples of 10 -->
<Slider Minimum="0" Maximum="100"
        TickFrequency="10"
        IsSnapToTickEnabled="True"
        TickPlacement="BottomRight" />
```

[`TickPlacement`](/api/avalonia/controls/tickplacement) options:

| Value | Description |
|---|---|
| `None` | No tick marks (default). |
| `TopLeft` | Ticks above (horizontal) or left (vertical). |
| `BottomRight` | Ticks below (horizontal) or right (vertical). |
| `Outside` | Ticks on both sides. |

:::note
Setting `TickFrequency` without `IsSnapToTickEnabled="True"` draws tick marks but still allows the user to drag to any value between them. Always pair the two properties when you want constrained input.
:::

## Small and large change

`SmallChange` and `LargeChange` control how much the value moves per keyboard or track interaction. Adjust these when the default increments are too coarse or too fine for your range:

```xml
<Slider Minimum="0" Maximum="1" Value="0.5"
        SmallChange="0.01"
        LargeChange="0.1" />
```

| Property | Trigger | Default |
|---|---|---|
| `SmallChange` | Arrow keys | 1 |
| `LargeChange` | Clicking the track or pressing Page Up / Page Down | 10 |

For a slider with a small range (for example, 0 to 1), you should lower both values so that keyboard users can reach all meaningful positions.

## Vertical slider

Set the [`Orientation`](/api/avalonia/layout/orientation) property to `Vertical`. You should also set an explicit `Height` so the slider does not collapse:

```xml
<Slider Orientation="Vertical" Height="200"
        Minimum="0" Maximum="100" Value="30" />
```

:::tip
When you use a vertical slider, `TopLeft` tick marks appear on the left and `BottomRight` tick marks appear on the right. Set `IsDirectionReversed="True"` if you want the minimum value at the top instead of the bottom.
:::

## Integer-only slider

To restrict a slider to whole numbers, set `TickFrequency` to `1` and enable snapping. This prevents fractional values from reaching your view model:

```xml
<Slider Minimum="1" Maximum="10"
        TickFrequency="1"
        IsSnapToTickEnabled="True"
        Value="{Binding FontSizeChoice}" />
```

Because `Value` is typed as `double`, your view model property should also be `double`. If you need an `int` in your domain logic, convert it after binding (for example, with `(int)Math.Round(value)`).

## Slider with labels

Show min/max labels on either side of the slider using a `Grid`. This helps users understand the range at a glance:

```xml
<Grid ColumnDefinitions="Auto,*,Auto" VerticalAlignment="Center">
    <TextBlock Grid.Column="0" Text="0" Margin="0,0,8,0"
               VerticalAlignment="Center" />
    <Slider Grid.Column="1" Minimum="0" Maximum="100" Value="{Binding Level}" />
    <TextBlock Grid.Column="2" Text="100" Margin="8,0,0,0"
               VerticalAlignment="Center" />
</Grid>
```

You can also bind the label text to the same `Minimum` and `Maximum` properties on the slider if you set those values dynamically.

## Color preview slider

Combine multiple sliders for an RGB color picker. Each slider controls one channel (0 to 255) and displays its current value:

```xml
<StackPanel Spacing="8">
    <StackPanel Orientation="Horizontal" Spacing="8">
        <TextBlock Text="R" Width="20" VerticalAlignment="Center" />
        <Slider Minimum="0" Maximum="255" Value="{Binding Red}" Width="200" />
        <TextBlock Text="{Binding Red, StringFormat='{}{0:F0}'}" Width="30" />
    </StackPanel>
    <StackPanel Orientation="Horizontal" Spacing="8">
        <TextBlock Text="G" Width="20" VerticalAlignment="Center" />
        <Slider Minimum="0" Maximum="255" Value="{Binding Green}" Width="200" />
        <TextBlock Text="{Binding Green, StringFormat='{}{0:F0}'}" Width="30" />
    </StackPanel>
    <StackPanel Orientation="Horizontal" Spacing="8">
        <TextBlock Text="B" Width="20" VerticalAlignment="Center" />
        <Slider Minimum="0" Maximum="255" Value="{Binding Blue}" Width="200" />
        <TextBlock Text="{Binding Blue, StringFormat='{}{0:F0}'}" Width="30" />
    </StackPanel>
</StackPanel>
```

For a smoother experience, consider setting `SmallChange="1"` and `LargeChange="16"` on each slider so that keyboard increments match typical color-editing workflows.

## Disabled and read-only states

You can prevent user interaction with a slider in two ways:

```xml
<!-- Fully disabled: grayed-out appearance -->
<Slider IsEnabled="False" Value="60" />

<!-- Visually active but non-interactive -->
<Slider IsHitTestVisible="False" Value="{Binding Progress}" />
```

Use `IsEnabled="False"` when you want to communicate visually that the control is unavailable. Use `IsHitTestVisible="False"` when you want the slider to look normal but act as a read-only indicator (for example, displaying download progress).

## Styling the slider

### Custom track and thumb colors

You can override the track color by targeting the template parts inside the slider. The `PART_DecreaseButton` fills the area before the thumb:

```xml
<Slider Value="50">
    <Slider.Styles>
        <Style Selector="Slider /template/ RepeatButton#PART_DecreaseButton">
            <Setter Property="Background" Value="#6366F1" />
        </Style>
    </Slider.Styles>
</Slider>
```

### Wider track

Increase the track height for a bolder appearance or to make touch targets easier to hit:

```xml
<Slider.Styles>
    <Style Selector="Slider /template/ Track">
        <Setter Property="Height" Value="8" />
    </Style>
</Slider.Styles>
```

:::note
Template part names such as `PART_DecreaseButton` and `PART_IncreaseButton` are defined by the default Fluent theme. If you use a custom control template, your part names may differ.
:::

## Key properties reference

| Property | Type | Description |
|---|---|---|
| `Minimum` | `double` | Lower bound. Default: 0. |
| `Maximum` | `double` | Upper bound. Default: 100. |
| `Value` | `double` | Current value. |
| `SmallChange` | `double` | Arrow key increment. Default: 1. |
| `LargeChange` | `double` | Track click or Page key increment. Default: 10. |
| `TickFrequency` | `double` | Spacing between tick marks. |
| `IsSnapToTickEnabled` | `bool` | Snap value to nearest tick. |
| `TickPlacement` | `TickPlacement` | Where to draw tick marks. |
| `Orientation` | `Orientation` | `Horizontal` (default) or `Vertical`. |
| `IsDirectionReversed` | `bool` | Reverse the direction of increasing value. |

## See also

- [Slider](/controls/input/selectors/slider): Full property and event reference for the `Slider` control.
- [Binding to controls](/docs/data-binding/binding-to-controls): Bind one control's property to another using `#name` syntax.
- [Data validation](/docs/app-development/data-validation): Add validation rules to slider-bound properties.
- [Accessibility](/docs/app-development/accessibility): Keyboard and screen-reader considerations for interactive controls.
