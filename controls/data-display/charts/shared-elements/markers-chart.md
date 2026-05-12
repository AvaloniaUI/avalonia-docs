---
id: markers-chart
title: Markers
description: Symbols drawn at each data point in a series to help locate exact coordinates, with support for multiple shapes and customizable size and color.
doc-type: reference
tags:
  - avalonia pro
---

import chartsFeaturesMarkers from '/img/controls/charts/charts-markers.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Markers are symbols drawn at each data point in a series. They help users locate the exact coordinates of points, especially on line or spline charts where paths might be dense.

For Cartesian line-family series such as `LineSeries`, `SplineSeries`, and `StepLineSeries`, markers are opt-in. Set `ShowMarkers="True"` before marker styling properties such as `MarkerSize`, `MarkerFill`, or `MarkerStroke` have a visible effect.

<Image light={chartsFeaturesMarkers} maxWidth={400} position="center" cornerRadius="true" alt="Line chart with markers of different shapes drawn at each data point to highlight exact coordinate positions." />

## When to use

- **Discrete data**: Emphasizing that lines represent individual measured points.
- **Low-density charts**: Making points more clickable for tooltips or selection.
- **Categorical distinction**: Using different shapes (Circle, Square, Diamond) to distinguish series.

## Code example

### XAML

```xml
<charts:CartesianChart Name="AllMarkersChart" Title="Marker Shape Comparison" Height="320" ShowLegend="True" LegendPosition="Bottom" HorizontalAlignment="Stretch">
                        <charts:CartesianChart.Series>
                            <charts:LineSeries Title="Circle" ItemsSource="{Binding CircleMarkerData}"
                                               MarkerShape="Circle" MarkerSize="10"
                                               Stroke="DodgerBlue" MarkerFill="DodgerBlue" StrokeThickness="2"  ShowMarkers="True"/>
                            <charts:LineSeries Title="Square" ItemsSource="{Binding SquareMarkerData}"
                                               MarkerShape="Square" MarkerSize="10"
                                               Stroke="Green" MarkerFill="Green" StrokeThickness="2"  ShowMarkers="True"/>
                            <charts:LineSeries Title="Diamond" ItemsSource="{Binding DiamondMarkerData}"
                                               MarkerShape="Diamond" MarkerSize="12"
                                               Stroke="Orange" MarkerFill="Orange" StrokeThickness="2"  ShowMarkers="True"/>
                            <charts:LineSeries Title="Triangle" ItemsSource="{Binding TriangleMarkerData}"
                                               MarkerShape="Triangle" MarkerSize="10"
                                               Stroke="Purple" MarkerFill="Purple" StrokeThickness="2"  ShowMarkers="True"/>
                            <charts:LineSeries Title="Pentagon" ItemsSource="{Binding PentagonMarkerData}"
                                               MarkerShape="Pentagon" MarkerSize="10"
                                               Stroke="Crimson" MarkerFill="Crimson" StrokeThickness="2"  ShowMarkers="True"/>
                        </charts:CartesianChart.Series>
                        <charts:CartesianChart.HorizontalAxis>
                            <charts:CategoryAxis />
                        </charts:CartesianChart.HorizontalAxis>
                        <charts:CartesianChart.VerticalAxis>
                            <charts:NumericalAxis />
                        </charts:CartesianChart.VerticalAxis>
                    </charts:CartesianChart>
```

### Data model (C#)

```csharp
public ObservableCollection<int> CircleMarkerData { get; } = new() { 20, 35, 25, 40, 30 };
public ObservableCollection<int> SquareMarkerData { get; } = new() { 25, 40, 30, 45, 35 };
public ObservableCollection<int> DiamondMarkerData { get; } = new() { 30, 45, 35, 50, 40 };
public ObservableCollection<int> TriangleMarkerData { get; } = new() { 15, 30, 20, 35, 25 };
public ObservableCollection<int> PentagonMarkerData { get; } = new() { 35, 50, 40, 55, 45 };
```

## Common properties (applied to Series)

| Property | Description | Default |
| :--- | :--- | :--- |
| `ShowMarkers` | Global toggle for data point symbols. Line-family series default to `false`; some point-focused series override it to `true`. | Series-dependent |
| `MarkerSize` | Diameter of the marker in pixels. | Series-dependent |
| `MarkerShape` | `Circle`, `Square`, `Rectangle`, `Diamond`, `Triangle`, `InvertedTriangle`, `Cross`, `Pentagon`, `VerticalLine`, or `HorizontalLine`. | `Circle` |
| `MarkerFill` | Brush used to fill the marker interior. | Series color |
| `MarkerStroke` | Brush used for the marker outline. | `null` |
| `MarkerStrokeThickness` | Thickness of the marker outline. When `NaN`, the series `StrokeThickness` is used. | `NaN` |
