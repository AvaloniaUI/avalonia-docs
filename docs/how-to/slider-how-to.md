---
id: slider-how-to
title: "How To: Work with Slider"
---

This guide covers common Slider scenarios: range configuration, value display, tick marks, vertical orientation, and two-way binding.

## Basic Slider with Value Display

Show the current value alongside the slider:

```xml
<StackPanel Spacing="8">
    <TextBlock Text="{Binding #slider.Value, StringFormat='Volume: {0:F0}%'}" />
    <Slider x:Name="slider" Minimum="0" Maximum="100" Value="50" />
</StackPanel>
```

## Binding to a View Model

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

## Tick Marks and Snapping

Use `TickFrequency` with `IsSnapToTickEnabled` to restrict values to discrete steps:

```xml
<!-- Snaps to multiples of 10 -->
<Slider Minimum="0" Maximum="100"
        TickFrequency="10"
        IsSnapToTickEnabled="True"
        TickPlacement="BottomRight" />
```

`TickPlacement` options:

| Value | Description |
|---|---|
| `None` | No tick marks (default). |
| `TopLeft` | Ticks above (horizontal) or left (vertical). |
| `BottomRight` | Ticks below (horizontal) or right (vertical). |
| `Outside` | Ticks on both sides. |

## Small and Large Change

Control how much the value moves per interaction:

```xml
<Slider Minimum="0" Maximum="1" Value="0.5"
        SmallChange="0.01"
        LargeChange="0.1" />
```

| Property | Description |
|---|---|
| `SmallChange` | Amount changed by arrow keys. Default: 1. |
| `LargeChange` | Amount changed by clicking the track or Page Up/Down. Default: 10. |

## Vertical Slider

Set the `Orientation` property:

```xml
<Slider Orientation="Vertical" Height="200"
        Minimum="0" Maximum="100" Value="30" />
```

## Integer-Only Slider

Snap to whole numbers only:

```xml
<Slider Minimum="1" Maximum="10"
        TickFrequency="1"
        IsSnapToTickEnabled="True"
        Value="{Binding FontSizeChoice}" />
```

## Slider with Labels

Show min/max labels on either side:

```xml
<Grid ColumnDefinitions="Auto,*,Auto" VerticalAlignment="Center">
    <TextBlock Grid.Column="0" Text="0" Margin="0,0,8,0"
               VerticalAlignment="Center" />
    <Slider Grid.Column="1" Minimum="0" Maximum="100" Value="{Binding Level}" />
    <TextBlock Grid.Column="2" Text="100" Margin="8,0,0,0"
               VerticalAlignment="Center" />
</Grid>
```

## Color Preview Slider

Combine multiple sliders for an RGB color picker:

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

## Disabled and Read-Only States

```xml
<!-- Fully disabled -->
<Slider IsEnabled="False" Value="60" />

<!-- Visually active but non-interactive via IsHitTestVisible -->
<Slider IsHitTestVisible="False" Value="{Binding Progress}" />
```

## Styling the Slider

### Custom track and thumb colors

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

```xml
<Slider.Styles>
    <Style Selector="Slider /template/ Track">
        <Setter Property="Height" Value="8" />
    </Style>
</Slider.Styles>
```

## Key Properties Reference

| Property | Type | Description |
|---|---|---|
| `Minimum` | `double` | Lower bound. Default: 0. |
| `Maximum` | `double` | Upper bound. Default: 100. |
| `Value` | `double` | Current value. |
| `SmallChange` | `double` | Arrow key increment. Default: 1. |
| `LargeChange` | `double` | Track click / Page key increment. Default: 10. |
| `TickFrequency` | `double` | Spacing between tick marks. |
| `IsSnapToTickEnabled` | `bool` | Snap value to nearest tick. |
| `TickPlacement` | `TickPlacement` | Where to draw tick marks. |
| `Orientation` | `Orientation` | `Horizontal` (default) or `Vertical`. |
| `IsDirectionReversed` | `bool` | Reverse the direction of increasing value. |

## See Also

- [Slider Control Reference](/controls/input/selectors/slider): Property tables.
- [Binding to Controls](/docs/data-binding/binding-to-controls): Bind one control's value to another.
