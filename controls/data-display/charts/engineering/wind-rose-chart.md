---
id: wind-rose-chart
title: Wind rose chart
description: Shows directional frequency distributions as stacked polar sectors, useful for wind, traffic, and directional event analysis.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Wind rose charts group values by direction and stack subcategories such as speed bands within each directional sector.

## When to use

- **Meteorology**: Show wind frequency by direction and speed band.
- **Directional events**: Compare traffic, movement, or signal occurrences around a compass.
- **Operational analysis**: Summarize heading-based activity in one compact polar chart.

## Code example

### XAML

```xml
<WindRoseChart xmlns="https://github.com/avaloniaui" Title="Wind distribution"
                                Height="320"
                                ItemsSource="{Binding WindData}"
                                DirectionPath="Direction"
                                SpeedPath="SpeedBand"
                                ValuePath="Frequency" />
```

### Data model (C#)

```csharp
public record WindSample(string Direction, string SpeedBand, double Frequency);

public ObservableCollection<WindSample> WindData { get; } = new()
{
    new("N", "0-10", 12),
    new("N", "10-20", 6),
    new("NE", "0-10", 8)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of directional observations. | `null` |
| `DirectionPath` | Path to the direction group. | `null` |
| `SpeedPath` | Path to the stacked subgroup within each direction. | `null` |
| `ValuePath` | Path to the numeric value or frequency. | `null` |
| `StartAngle` | Start angle in degrees for the first sector. | `-90.0` |

## See also

- [Polar chart](/controls/data-display/charts/radial/polar-chart)
- [Smith chart](/controls/data-display/charts/engineering/smith-chart)
