---
id: area-chart
title: Area chart
description: Extends the line chart by filling the area under the line with color or gradients, emphasizing magnitude of change over time.
doc_type: reference
tags:
  - accelerate
---

import chartsCartesianArea from '/img/controls/charts/charts-cartesian-area.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Area charts are based on the line chart. The area between the axis and the line is filled with color or gradients, emphasizing the magnitude of change over time.

<Image light={chartsCartesianArea} maxWidth={400} position="center" cornerRadius="true" alt="Area chart showing website traffic data with a gradient fill between the line and the horizontal axis." />

## When to use
- **Cumulative Totals**: Visualizing how different components contribute to a whole over time.
- **Volume**: Emphasizing the total volume or magnitude of data points.
- **Visual Contrast**: Providing a more distinct visual representation than a simple line chart.

## Code example

### XAML
```xml
<controls:CartesianChart Name="AreaChartSample" IsTooltipEnabled="True" Title="Website Traffic" Height="250">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:AreaSeries Title="Visitors"
                           ItemsSource="{Binding AreaVisitors}"
                           Stroke="CornflowerBlue"
                           StrokeThickness="2"
                           FillOpacity="1.0">
            <controls:AreaSeries.Fill>
                <LinearGradientBrush StartPoint="0%,0%" EndPoint="0%,100%">
                    <GradientStop Offset="0" Color="#B46495ED" />
                    <GradientStop Offset="1" Color="#1E6495ED" />
                </LinearGradientBrush>
            </controls:AreaSeries.Fill>
        </controls:AreaSeries>
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record TrafficData(string Period, double Count);

public ObservableCollection<TrafficData> AreaVisitors { get; } = new()
{
    new("Mon", 120),
    new("Tue", 180),
    new("Wed", 250),
    new("Thu", 210),
    new("Fri", 300)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series. | `null` |
| `ItemsSource` | The collection of data items. | `null` |
| `Stroke` | Color of the top line. | Theme-dependent |
| `Fill` | Brush used to fill the area under the line. | Theme-dependent |
| `FillOpacity` | Transparency of the fill (0.0 to 1.0). | `0.4` |
| `StrokeThickness`| Width of the line. | `2` |
