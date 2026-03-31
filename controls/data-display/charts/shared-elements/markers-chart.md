---
id: markers-chart
title: Markers
description: Symbols drawn at each data point in a series to help locate exact coordinates, with support for multiple shapes and customizable size and color.
doc_type: reference
tags:
  - accelerate
---

import chartsFeaturesMarkers from '/img/controls/charts/charts-features-markers.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Markers are symbols drawn at each data point in a series. They help users locate the exact coordinates of points, especially on line or spline charts where paths might be dense.

<Image light={chartsFeaturesMarkers} maxWidth={400} position="center" cornerRadius="true" alt="Line chart with diamond-shaped markers drawn at each data point to highlight exact coordinate positions." />

## When to Use
- **Discrete Data**: Emphasizing that lines represent individual measured points.
- **Low-Density Charts**: Making points more clickable for tooltips or selection.
- **Categorical Distinction**: Using different shapes (Circle, Square, Diamond) to distinguish series.

## Code Example

### XAML
```xml
<controls:CartesianChart Title="Scientific Data" Height="300">
    <controls:CartesianChart.Series>
        <controls:LineSeries ItemsSource="{Binding MarkerData}"
                             ShowMarkers="True"
                             MarkerSize="10"
                             MarkerShape="Diamond"
                             MarkerFill="White"
                             MarkerStroke="Blue" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data Model (C#)
```csharp
public record Point(double X, double Y);

public ObservableCollection<Point> MarkerData { get; } = new()
{
    new(1, 10), new(2, 25), new(3, 15)
};
```

## Common Properties (on Series)

| Property | Description | Default |
| :--- | :--- | :--- |
| `ShowMarkers` | Global toggle for data point symbols. | `true` / `false` |
| `MarkerSize` | Diameter of the marker in pixels. | `6` |
| `MarkerShape` | `Circle`, `Square`, `Diamond`, `Triangle`, `Star`. | `Circle` |
| `MarkerFill` | Brush used to fill the marker interior. | Series color |
| `MarkerStroke` | Color of the marker outline. | `Transparent` |
*(Note: Supports multiple built-in and custom shapes)*
