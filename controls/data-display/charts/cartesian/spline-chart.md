---
id: spline-chart
title: Spline chart
description: Similar to a line chart but uses smooth polynomial curves to connect data points, giving a more organic appearance to trends.
doc-type: reference
tags:
  - avalonia pro
---

import chartsCartesianSpline from '/img/controls/charts/charts-cartesian-spline.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Spline charts are similar to line charts but use smooth polynomial curves to connect data points, providing a more "organic" feel to data trends.

<Image light={chartsCartesianSpline} maxWidth={400} position="center" cornerRadius="true" alt="Spline chart with smooth curved lines connecting temperature data points across time intervals." />

## When to use
- **Smooth data**: When visualizing data that changes continuously and smoothly (e.g., temperature).
- **Aesthetics**: When a professional, rounded look is preferred over sharp angles.
- **Trend smoothing**: Helping to visualize the general trend without the harshness of linear segments.

## Code example

### XAML
```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Name="SplineChart" Title="Spline Chart" Height="250">
                        <CartesianChart.HorizontalAxis>
                            <CategoryAxis />
                        </CartesianChart.HorizontalAxis>
                        <CartesianChart.VerticalAxis>
                            <NumericalAxis />
                        </CartesianChart.VerticalAxis>
                        <CartesianChart.Series>
                            <SplineSeries Title="Temperature" ItemsSource="{Binding SplineSeriesData}" Stroke="Crimson" StrokeThickness="3" MarkerSize="6" MarkerFill="White"  ShowMarkers="True"/>
                        </CartesianChart.Series>
                    </CartesianChart>
```

### Data model (C#)
```csharp
public ObservableCollection<int> SplineSeriesData { get; } = new()
{
    15, 18, 22, 28, 32, 35, 33, 28, 22, 17, 12, 10
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series. | `null` |
| `ItemsSource` | The collection of data items. | `null` |
| `Stroke` | Color of the spline curve. | Theme-dependent |
| `StrokeThickness` | Width of the curve. | `2` |
| `ShowMarkers` | Whether to display markers at data points. Marker styling is visible only when this is `true`. | `false` |
| `MarkerSize` | The size of the markers in pixels. | `6` |
| `MarkerShape` | The shape of the markers, such as `Circle` or `Square`. | `Circle` |
| `MarkerFill` | Brush used to fill the markers. | `null` |
| `MarkerStroke` | Brush used for the marker outlines. | `null` |
| `MarkerStrokeThickness` | Thickness of the marker outlines. When `NaN`, the series `StrokeThickness` is used. | `NaN` |
| `SplineTension` | Controls smoothness of the curve. | `0.25` |
