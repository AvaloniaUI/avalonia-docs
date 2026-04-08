---
id: scatter-chart
title: Scatter chart
description: Plots data points as dots using two numeric variables to reveal correlations, distributions, and outliers in datasets.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsCartesianScatter from '/img/controls/charts/charts-cartesian-scatter.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
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
<controls:CartesianChart Title="Correlation Data" Height="250">
    <controls:CartesianChart.Series>
        <controls:ScatterSeries Title="Points"
                                ItemsSource="{Binding ScatterPoints}"
                                CategoryPath="X"
                                ValuePath="Y"
                                MarkerSize="8" />
    </controls:CartesianChart.Series>
    <controls:CartesianChart.HorizontalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record PointData(double X, double Y);

public ObservableCollection<PointData> ScatterPoints { get; } = new()
{
    new(10, 15),
    new(25, 30),
    new(35, 25),
    new(40, 45),
    new(50, 35)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series. | `null` |
| `ItemsSource` | The collection of data points. | `null` |
| `CategoryPath` | Value of the category path (X-axis). | `null` |
| `ValuePath` | Value of the value path (Y-axis). | `null` |
| `MarkerSize` | Size of the dots in pixels. | `8` |
| `MarkerShape` | Shape of the dots (Circle, Square, etc.). | `Circle` |
| `Fill` | The color of the scatter dots. | Theme-dependent |
