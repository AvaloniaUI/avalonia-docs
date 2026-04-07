---
id: line-chart
title: Line chart
description: Connects data points with straight line segments on X and Y axes, ideal for showing trends over time or across categories.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsCartesianLines from '/img/controls/charts/charts-cartesian-lines.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
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
<controls:CartesianChart Name="LineChartSample" IsTooltipEnabled="True" Title="Monthly Sales" Height="250">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:LineSeries Title="Sales" ItemsSource="{Binding LineData}" MarkerSize="8" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record SalesData(string Month, double Value);

public ObservableCollection<SalesData> LineData { get; } = new()
{
    new("Jan", 10),
    new("Feb", 25),
    new("Mar", 40),
    new("Apr", 35),
    new("May", 50)
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
| `StrokeThickness`| The thickness of the line. | `2` |
| `ShowMarkers` | Whether to display individual data point markers. | `true` |
| `MarkerSize` | The size of the markers in pixels. | `6` |
| `MarkerShape` | The shape of the markers (Circle, Square, etc.). | `Circle` |
