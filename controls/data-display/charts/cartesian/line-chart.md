---
id: line-chart
title: Line chart
description: Connects data points with straight line segments on X and Y axes, ideal for showing trends over time or across categories.
doc-type: reference
tags:
  - avalonia pro
---

import chartsCartesianLines from '/img/controls/charts/charts-cartesian-lines.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Line charts use X and Y axes to visualize data points connected by straight line segments. They are ideal for showing trends over time or categories.

<Image light={chartsCartesianLines} maxWidth={400} position="center" cornerRadius="true" alt="Line chart connecting data points with straight segments to show monthly sales trends over time." />

## When to use
- **Time series**: Visualizing changes in data over continuous time intervals.
- **Trend analysis**: Identifying upward, downward, or fluctuating patterns.
- **Multiple series**: Comparing trends across different categories using multiple lines.

## Code example

### XAML
```xml
<charts:CartesianChart Name="LineChart" Title="Line Chart" Height="250" ShowLegend="True">
                        <charts:CartesianChart.HorizontalAxis>
                            <charts:CategoryAxis />
                        </charts:CartesianChart.HorizontalAxis>
                        <charts:CartesianChart.VerticalAxis>
                            <charts:NumericalAxis />
                        </charts:CartesianChart.VerticalAxis>
                        <charts:CartesianChart.Series>
                            <charts:LineSeries Title="2023" ItemsSource="{Binding LineSeries2023}" Stroke="DodgerBlue" StrokeThickness="2" MarkerSize="6" MarkerFill="DodgerBlue"  ShowMarkers="True"/>
                            <charts:LineSeries Title="2024" ItemsSource="{Binding LineSeries2024}" Stroke="Orange" StrokeThickness="2" MarkerSize="6" MarkerFill="Orange"  ShowMarkers="True"/>
                        </charts:CartesianChart.Series>
                    </charts:CartesianChart>
```

### Data model (C#)
```csharp
public ObservableCollection<int> LineSeries2023 { get; } = new()
{
    45, 52, 48, 60, 55, 70, 65, 75, 68, 80, 72, 85
};

public ObservableCollection<int> LineSeries2024 { get; } = new()
{
    50, 58, 55, 68, 62, 78, 72, 82, 75, 88, 80, 92
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series shown in the legend. | `null` |
| `ItemsSource` | The collection of data items to display. | `null` |
| `CategoryPath` | Path to the property used for the X-axis (category). | `null` |
| `ValuePath` | Path to the property used for the Y-axis (value). | `null` |
| `Stroke` | The color of the line. | Theme-dependent |
| `StrokeThickness` | The thickness of the line. | `2` |
| `ShowMarkers` | Whether to display individual data point markers. Marker styling is visible only when this is `true`. | `false` |
| `MarkerSize` | The size of the markers in pixels. | `8` |
| `MarkerShape` | The shape of the markers, such as `Circle` or `Square`. | `Circle` |
| `MarkerFill` | Brush used to fill the markers. When `null`, the series stroke is used. | `null` |
| `MarkerStroke` | Brush used for the marker outlines. | `null` |
| `MarkerStrokeThickness` | Thickness of the marker outlines. When `NaN`, the series `StrokeThickness` is used. | `NaN` |
