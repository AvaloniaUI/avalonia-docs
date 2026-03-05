---
id: slider
title: Slider
---

import SliderMaxValueScreenshot from '/img/controls/slider/slider-max-value.gif';

The slider control presents its numerical value as the relative position of a slider button along the length of a track. The position is relative to maximum and minimum values.

Drag interaction on the slider button can alter the value between the maximum and minimum values. Keyboard and click interactions can also nudge the value.

## Useful properties

You will probably use these properties most often:

<table><thead><tr><th width="197">Property</th><th>Description</th></tr></thead><tbody><tr><td>Maximum</td><td>Sets the maximum value.</td></tr><tr><td>Minimum</td><td>Sets the minimum value.</td></tr></tbody></table>

## Example

In this example the slider value is displayed in the text block below, using binding to a control.

:::info
To review how to bind one control to another, see the guide [Binding to controls](/docs/data-binding/binding-to-controls).
:::

Here the maximum and minimum values are default (0 and 100 respectively).

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
            Margin="20">
  <TextBlock Text="{Binding #slider.Value}" 
              HorizontalAlignment="Center"/>
  <Slider x:Name="slider" />
</StackPanel>
```

</XamlPreview>

## Tick Marks and Snapping

Use `TickFrequency` and `IsSnapToTickEnabled` to restrict the slider to discrete steps:

```xml
<Slider Minimum="0" Maximum="100"
        TickFrequency="10"
        IsSnapToTickEnabled="True"
        TickPlacement="BottomRight" />
```

## Vertical Slider

Set the `Orientation` property for a vertical slider:

```xml
<Slider Orientation="Vertical" Height="200"
        Minimum="0" Maximum="100" Value="30" />
```

## Binding to a View Model

```xml
<Slider Maximum="{Binding MaxDamage}" Value="{Binding Damage}" />
```

```csharp
[ObservableProperty]
private double _damage;

[ObservableProperty]
private double _maxDamage = 9999;
```

<img src={SliderMaxValueScreenshot} alt="" />

## All Properties

| Property | Type | Description |
|---|---|---|
| `Minimum` | `double` | Lower bound of the range. Default: 0. |
| `Maximum` | `double` | Upper bound of the range. Default: 100. |
| `Value` | `double` | Current slider value. |
| `SmallChange` | `double` | Value change per arrow key press. Default: 1. |
| `LargeChange` | `double` | Value change per track click or Page key. Default: 10. |
| `TickFrequency` | `double` | Interval between tick marks. |
| `IsSnapToTickEnabled` | `bool` | Snap to the nearest tick. Default: `false`. |
| `TickPlacement` | `TickPlacement` | Where to show tick marks: `None`, `TopLeft`, `BottomRight`, `Outside`. |
| `Orientation` | `Orientation` | `Horizontal` (default) or `Vertical`. |
| `IsDirectionReversed` | `bool` | Reverse the increasing-value direction. |

## See also

- [Slider API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Slider)
- [`Slider.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Slider.cs)
