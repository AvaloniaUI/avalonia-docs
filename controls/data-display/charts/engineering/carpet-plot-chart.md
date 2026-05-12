---
id: carpet-plot-chart
title: Carpet plot chart
description: Maps two independent variables and one dependent variable into a skewed grid, useful for engineering trade-off surfaces.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Carpet plots visualize how two independent variables relate to a third value by drawing a distorted grid of intersecting isolines.

## When to use

- **Engineering trade-offs**: Compare two design inputs against an outcome surface.
- **Performance maps**: Visualize operating regions for efficiency, pressure, or temperature.
- **Multi-variable analysis**: Inspect relationships that do not fit a simple Cartesian line chart.

## Code example

### XAML

```xml
<charts:CarpetPlot Title="Performance map"
                             Height="320"
                             ItemsSource="{Binding CarpetData}"
                             AAxisPath="Speed"
                             BAxisPath="Load"
                             YAxisPath="Efficiency" />
```

### Data model (C#)

```csharp
public record CarpetPoint(double Speed, double Load, double Efficiency);

public ObservableCollection<CarpetPoint> CarpetData { get; } = new()
{
    new(1000, 20, 62),
    new(1000, 40, 68),
    new(1500, 20, 70),
    new(1500, 40, 74)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of measurement points. | `null` |
| `AAxisPath` | Path to the first independent variable. | `null` |
| `BAxisPath` | Path to the second independent variable. | `null` |
| `YAxisPath` | Path to the dependent value. | `null` |
| `CarpetOffset` | Visual offset factor used to create the carpet effect. | `0.5` |
| `PlotAreaBackground` | Optional background brush for the plot area. | `null` |

## See also

- [Ternary chart](/controls/data-display/charts/engineering/ternary-chart)
- [Contour plot chart](/controls/data-display/charts/statistical/contour-plot-chart)
