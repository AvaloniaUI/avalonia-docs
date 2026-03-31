---
id: spline-chart
title: Spline Chart
description: Similar to a line chart but uses smooth polynomial curves to connect data points, giving a more organic appearance to trends.
doc_type: reference
tags:
  - accelerate
---

import chartsCartesianSpline from '/img/controls/charts/charts-cartesian-spline.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Spline charts are similar to line charts but use smooth polynomial curves to connect data points, providing a more "organic" feel to data trends.

<Image light={chartsCartesianSpline} maxWidth={400} position="center" cornerRadius="true" alt="Spline chart with smooth curved lines connecting temperature data points across time intervals." />

## When to Use
- **Smooth Data**: When visualizing data that changes continuously and smoothly (e.g., temperature).
- **Aesthetics**: When a professional, rounded look is preferred over sharp angles.
- **Trend Smoothing**: Helping to visualize the general trend without the harshness of linear segments.

## Code Example

### XAML
```xml
<controls:CartesianChart Name="SplineChartSample" IsTooltipEnabled="True" Title="Temperature Trend" Height="250">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:SplineSeries Title="Temperature" ItemsSource="{Binding SplineTemperature}" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data Model (C#)
```csharp
public record TemperatureData(string Time, double Temp);

public ObservableCollection<TemperatureData> SplineTemperature { get; } = new()
{
    new("8:00", 18),
    new("12:00", 24),
    new("16:00", 22),
    new("20:00", 19),
    new("0:00", 15)
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series. | `null` |
| `ItemsSource` | The collection of data items. | `null` |
| `Stroke` | Color of the spline curve. | Theme-dependent |
| `StrokeThickness`| Width of the curve. | `2` |
| `ShowMarkers` | Whether to display markers at data points. | `true` |
