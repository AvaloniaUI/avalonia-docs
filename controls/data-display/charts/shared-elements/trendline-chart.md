---
id: trendline-chart
title: Trendline Chart
description: Overlays a calculated trend line on a Cartesian chart series to highlight the general direction or pattern, with support for linear, exponential, and moving average types.
doc_type: reference
tags:
  - accelerate
---

import chartsFeaturesTrendlines from '/img/controls/charts/charts-trendline-1.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Trendlines are used in Cartesian charts to show the general direction or pattern of data. They filter out noise to highlight underlying trends (e.g., linear, moving average).

<Image light={chartsFeaturesTrendlines} maxWidth={400} position="center" cornerRadius="true" alt="Line chart with an overlaid trendline showing a line of best fit." />

## When to Use
- **Sales Forecasting**: Projecting future sales based on historical trends.
- **Data Smoothing**: Identifying patterns in volatile stock or sensor data.
- **Performance Evaluation**: Visualizing if throughput is generally increasing or decreasing.

## Code Example

### XAML
```xml
<controls:CartesianChart Title="Revenue with Trend" Height="300">
    <controls:CartesianChart.Series>
        <controls:LineSeries ItemsSource="{Binding SalesData}">
            <controls:LineSeries.Trendlines>
                <controls:Trendline Type="Linear" Stroke="Red" StrokeThickness="2" ForwardForecast="2" />
                <controls:Trendline Type="MovingAverage" Period="5" Stroke="Blue" />
            </controls:LineSeries.Trendlines>
        </controls:LineSeries>
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data Model (C#)
```csharp
public ObservableCollection<double> SalesData { get; } = new() { 10, 15, 8, 25, 30, 22 };
```

## Common Properties (Trendline)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Type` | `Linear`, `Exponential`, `Logarithmic`, `MovingAverage`. | `Linear` |
| `Stroke` | Color of the trendline. | `Black` |
| `ForwardForecast` | Number of units to project into the future. | `0` |
| `Period` | For `MovingAverage`, the number of points to average. | `2` |
