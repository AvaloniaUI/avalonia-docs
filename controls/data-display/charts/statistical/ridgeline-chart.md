---
id: ridgeline-chart
title: Ridgeline chart
description: Stacks multiple distributions with controlled overlap, useful for comparing shape changes across groups or time.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Ridgeline charts stack multiple area distributions with vertical overlap so you can compare shape changes across groups, periods, or scenarios.

## When to use

- **Distribution over time**: Compare how a distribution shifts from one period to another.
- **Group comparison**: Stack many related density-like curves in one compact frame.
- **Shape-first analysis**: Emphasize contour and overlap more than exact totals.

## Code example

### XAML

```xml
<charts:RidgelineChart Title="Distribution over time" Height="360">
    <charts:RidgelineChart.Series>
        <charts:AreaSeries Title="2023" ItemsSource="{Binding Series2023}" CategoryPath="X" ValuePath="Y" />
        <charts:AreaSeries Title="2024" ItemsSource="{Binding Series2024}" CategoryPath="X" ValuePath="Y" />
    </charts:RidgelineChart.Series>
</charts:RidgelineChart>
```

### Data model (C#)

```csharp
public record CurvePoint(double X, double Y);

public ObservableCollection<CurvePoint> Series2023 { get; } = new() { new(0, 4), new(1, 8), new(2, 5) };
public ObservableCollection<CurvePoint> Series2024 { get; } = new() { new(0, 3), new(1, 9), new(2, 6) };
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Series` | Content collection of `AreaSeries` distributions. | Empty collection |
| `Overlap` | Overlap factor between series. | `0.5` |
| `SeriesHeight` | Target height for each series band. | `50.0` |
| `CurveType` | Curve interpolation type. | `Spline` |

## See also

- [Area chart](/controls/data-display/charts/cartesian/area-chart)
- [Density plot chart](/controls/data-display/charts/statistical/density-plot-chart)
