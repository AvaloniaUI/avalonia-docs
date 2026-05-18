---
id: scatter-chart
title: Scatter chart
description: Plots data points as dots using two numeric variables to reveal correlations, distributions, and outliers in datasets.
doc-type: reference
tags:
  - avalonia pro
---

import chartsCartesianScatter from '/img/controls/charts/charts-cartesian-scatter.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Scatter charts use dots to represent values for two different numeric variables. They are essential for displaying and comparing numeric values, such as scientific, statistical, and engineering data.

<Image light={chartsCartesianScatter} maxWidth={400} position="center" cornerRadius="true" alt="Scatter chart plotting individual data points as dots across two numeric axes to reveal correlations." />

## When to use
- **Correlation**: Identifying relationships between two variables (e.g., height vs weight).
- **Distribution**: Visualizing the spread and clustering of data points.
- **Outlier detection**: Easily spotting data points that fall far from the norm.

## Code example

### XAML
```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Name="ScatterChart" Title="Scatter Plot" Height="250">
    <CartesianChart.HorizontalAxis>
        <NumericalAxis />
    </CartesianChart.HorizontalAxis>
    <CartesianChart.VerticalAxis>
        <NumericalAxis />
    </CartesianChart.VerticalAxis>
    <CartesianChart.Series>
        <ScatterSeries Title="Data Points"
                              ItemsSource="{Binding ScatterSeriesData}"
                              Fill="Purple"
                              MarkerSize="10"
                              MarkerShape="Circle" />
    </CartesianChart.Series>
</CartesianChart>
```

### Data model (C#)
```csharp
public ObservableCollection<int> ScatterSeriesData { get; } =
    new() { 25, 45, 35, 55, 40, 60, 50, 70, 55, 75 };
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series. | `null` |
| `ItemsSource` | The collection of data points. | `null` |
| `CategoryPath` | Value of the category path (X-axis). | `null` |
| `ValuePath` | Value of the value path (Y-axis). | `null` |
| `ShowMarkers` | Whether to display data point markers. | `true` |
| `MarkerSize` | Size of the dots in pixels. | `8` |
| `MarkerShape` | Shape of the dots, such as `Circle` or `Square`. | `Circle` |
| `MarkerFill` | Brush used to fill the markers. When `null`, `Fill` is used. | `null` |
| `MarkerStroke` | Brush used for marker outlines. | `null` |
| `MarkerStrokeThickness` | Thickness of marker outlines. When `NaN`, the series `StrokeThickness` is used. | `NaN` |
| `Fill` | The color of the scatter dots. | Theme-dependent |

## Scatter line variant

The `ScatterLineSeries` extends scatter charts by drawing connecting lines between data points, combining scatter dot visibility with line trend visualization.

### XAML
```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Name="ScatterChart" Title="Scatter Plot" Height="250">
                        <CartesianChart.HorizontalAxis>
                            <NumericalAxis />
                        </CartesianChart.HorizontalAxis>
                        <CartesianChart.VerticalAxis>
                            <NumericalAxis />
                        </CartesianChart.VerticalAxis>
                        <CartesianChart.Series>
                            <ScatterSeries Title="Data Points" ItemsSource="{Binding ScatterSeriesData}" Fill="Purple" MarkerSize="10" MarkerShape="Circle" />
                        </CartesianChart.Series>
                    </CartesianChart>
```

### ScatterLineSeries properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ShowLines` | Whether to show connecting lines between scatter points. | `true` |
| `StrokeDashStyle` | Dash style for the connecting lines. When `null`, lines are solid. | `null` |
| `ShowMarkers` | Whether to display data point markers. | `true` |
| `MarkerSize` | Size of the markers in pixels. | `8` |
| `MarkerShape` | Shape of the markers, such as `Circle` or `Square`. | `Circle` |
| `MarkerFill` | Brush used to fill the markers. When `null`, `Fill` is used. | `null` |
| `MarkerStroke` | Brush used for marker outlines. | `null` |
| `MarkerStrokeThickness` | Thickness of marker outlines. When `NaN`, the series `StrokeThickness` is used. | `NaN` |

## See also

- [Line chart](/controls/data-display/charts/cartesian/line-chart)
- [Dot plot chart](/controls/data-display/charts/cartesian/dot-plot-chart)
- [Combo chart](/controls/data-display/charts/cartesian/combo-chart)
