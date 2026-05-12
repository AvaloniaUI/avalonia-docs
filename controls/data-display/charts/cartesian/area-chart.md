---
id: area-chart
title: Area chart
description: Extends the line chart by filling the area under the line with color or gradients, emphasizing magnitude of change over time.
doc-type: reference
tags:
  - avalonia pro
---

import chartsCartesianArea from '/img/controls/charts/charts-cartesian-area.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Area charts are based on the line chart. The area between the axis and the line is filled with color or gradients, emphasizing the magnitude of change over time.

<Image light={chartsCartesianArea} maxWidth={400} position="center" cornerRadius="true" alt="Area chart showing website traffic data with a gradient fill between the line and the horizontal axis." />

## When to use
- **Cumulative totals**: Visualizing how different components contribute to a whole over time.
- **Volume**: Emphasizing the total volume or magnitude of data points.
- **Visual contrast**: Providing a more distinct visual representation than a simple line chart.

## Code example

### XAML
```xml
<charts:CartesianChart Name="AreaChart" Title="Area Chart" Height="250">
                        <charts:CartesianChart.HorizontalAxis>
                            <charts:CategoryAxis />
                        </charts:CartesianChart.HorizontalAxis>
                        <charts:CartesianChart.VerticalAxis>
                            <charts:NumericalAxis />
                        </charts:CartesianChart.VerticalAxis>
                        <charts:CartesianChart.Series>
                            <charts:AreaSeries Title="Revenue" ItemsSource="{Binding AreaSeriesData}" Fill="#7E4CAF50" Stroke="Green" StrokeThickness="2" />
                        </charts:CartesianChart.Series>
                    </charts:CartesianChart>
```

### Data model (C#)
```csharp
public ObservableCollection<int> AreaSeriesData { get; } = new()
{
    120, 150, 135, 180, 165, 200, 185, 220
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series. | `null` |
| `ItemsSource` | The collection of data items. | `null` |
| `Stroke` | Color of the top line. | Theme-dependent |
| `Fill` | Brush used to fill the area under the line. | Theme-dependent |
| `FillOpacity` | Transparency of the fill (0.0 to 1.0). | `0.5` |
| `StrokeThickness`| Width of the line. | `2` |
