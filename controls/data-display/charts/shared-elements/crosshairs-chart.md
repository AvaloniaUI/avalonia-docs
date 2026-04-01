---
id: crosshairs-chart
title: Crosshairs
description: Interactive guide lines that follow the cursor across a chart, enabling precise alignment of data points with axis labels for high-precision reading.
doc_type: reference
tags:
  - accelerate
---

import chartsFeaturesCrosshairs from '/img/controls/charts/charts-custom-crosshairs.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Crosshairs are interactive guide-lines that follow the user's cursor. They are essential for high-precision charts where users need to align data points with axis labels accurately.

<Image light={chartsFeaturesCrosshairs} maxWidth={400} position="center" cornerRadius="true" alt="Line chart with interactive crosshair guide lines following the cursor to align data points with axis coordinates." />

## When to use
- **Financial Charts**: Pinpointing exact price and time on a candlestick chart.
- **Engineering Data**: Measuring values on high-density line charts.
- **Scientific Graphs**: Aligning specific peaks or valleys with coordinates.

## Code example

### XAML
```xml
<controls:CartesianChart Name="CrosshairChartSample"
                        Title="Hover for Crosshairs"
                        Height="300"
                        CrosshairMode="Both"
                        ShowCrosshairLabels="True">
    <controls:CartesianChart.Series>
        <controls:LineSeries Title="Temperature" ItemsSource="{Binding ChartPoints}" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record Point(double X, double Y);

public ObservableCollection<Point> ChartPoints { get; } = new()
{
    new(1, 10), new(2, 25), new(3, 15)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `CrosshairMode` | `X`, `Y`, `Both`, or `None`. | `None` |
| `ShowCrosshairLabels`| Toggles value labels on the axes. | `false` |
| `CrosshairStroke`| Color of the guide lines. | `Black` |
| `CrosshairStrokeThickness`| Width of the guide lines. | `1` |
