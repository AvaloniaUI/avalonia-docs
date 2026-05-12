---
id: dumbbell-chart
title: Dumbbell chart
description: Connects two values per category with a line and markers, useful for before-and-after or low-to-high comparisons.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Dumbbell charts connect two markers per category so you can compare the gap between a lower and higher value at a glance.

## When to use

- **Before and after comparison**: Compare the same measure across two points in time.
- **Range review**: Show the spread between two related values for each category.
- **Target vs actual**: Pair a measured value with a benchmark.

## Code example

### XAML

```xml
<charts:DumbbellChart Title="Planned vs actual"
                        Height="300"
                        ItemsSource="{Binding PlannedVsActual}"
                        LabelPath="Label"
                        LowValuePath="Planned"
                        HighValuePath="Actual" />
```

### Data model (C#)

```csharp
public record RangeComparison(string Label, double Planned, double Actual);

public ObservableCollection<RangeComparison> PlannedVsActual { get; } = new()
{
    new("Team A", 42, 55),
    new("Team B", 38, 41),
    new("Team C", 50, 62)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of comparison items. | `null` |
| `LowValuePath` | Path to the lower or first value. | `null` |
| `HighValuePath` | Path to the higher or second value. | `null` |
| `LabelPath` | Path to the category label. | `null` |
| `LowBrush` | Brush used for the first marker. | `#2196F3` |
| `HighBrush` | Brush used for the second marker. | `#4CAF50` |
| `ConnectorBrush` | Brush used for the connector line. | `#9E9E9E` |
| `MarkerSize` | Marker size in pixels. | `12.0` |
| `ConnectorThickness` | Thickness of the connector line. | `3.0` |
| `Orientation` | Layout orientation, `Horizontal` or `Vertical`. | `Horizontal` |
| `IsHighlightEnabled` | Enables hover highlighting for dumbbell items. | `false` |

## See also

- [Slope chart](/controls/data-display/charts/analytics/slope-chart)
- [Diverging bar chart](/controls/data-display/charts/comparison/diverging-bar-chart)
