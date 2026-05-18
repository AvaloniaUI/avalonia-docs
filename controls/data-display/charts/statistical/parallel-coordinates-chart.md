---
id: parallel-coordinates-chart
title: Parallel coordinate chart
description: Visualizes multivariate records as lines across parallel axes, useful for comparing patterns across many dimensions.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Parallel coordinate charts map each record across a sequence of vertical axes so multi-dimensional patterns and outliers can be compared in one view.

## When to use

- **Multivariate comparison**: Compare several numeric dimensions for each item.
- **Pattern detection**: Spot outliers, clusters, and dominant shapes across metrics.
- **Model diagnostics**: Inspect how records vary across many inputs at once.

## Code example

### XAML

```xml
<ParallelCoordinatesChart xmlns="https://github.com/avaloniaui" Title="Vehicle comparison"
                                           Height="320"
                                           ItemsSource="{Binding Vehicles}">
    <ParallelCoordinatesChart.Axes>
        <ParallelAxis Header="Power" ValuePath="Power" Minimum="0" Maximum="400" />
        <ParallelAxis Header="Range" ValuePath="Range" Minimum="0" Maximum="600" />
        <ParallelAxis Header="Efficiency" ValuePath="Efficiency" Minimum="0" Maximum="100" />
    </ParallelCoordinatesChart.Axes>
</ParallelCoordinatesChart>
```

### Data model (C#)

```csharp
public record VehicleStats(double Power, double Range, double Efficiency);

public ObservableCollection<VehicleStats> Vehicles { get; } = new()
{
    new(220, 480, 76),
    new(310, 420, 64),
    new(180, 520, 82)
};
```

## Common properties (`ParallelCoordinatesChart`)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Axes` | Content collection of `ParallelAxis` definitions. | Empty collection |
| `ItemsSource` | Collection of multivariate records. | `null` |
| `BrushPath` | Optional path to an `IBrush` or color string used for each line. | `null` |
| `LegendLabelPath` | Optional path used for legend labels. | `null` |
| `StrokeThickness` | Thickness of the data lines. | `2.0` |
| `CurveTension` | Tension value for curved lines. | `0.0` |

## Common properties (`ParallelAxis`)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Header` | Axis title. | `null` |
| `ValuePath` | Path to the value bound to this axis. | `null` |
| `Minimum` | Minimum value of the axis scale. | `0.0` |
| `Maximum` | Maximum value of the axis scale. | `100.0` |

## See also

- [Radar chart](/controls/data-display/charts/radial/radar-chart)
- [Ternary chart](/controls/data-display/charts/engineering/ternary-chart)
