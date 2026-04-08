---
id: legend-chart
title: Legend
description: Identifies data series within a chart by label and color, supporting multiple positions, orientations, and optional interactive series toggling.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsFeaturesLegend from '/img/controls/charts/charts-legend-right.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

The Legend component helps users identify different data series within a chart. It can be positioned around the chart area and styled to match your application's theme.

<Image light={chartsFeaturesLegend} maxWidth={400} position="center" cornerRadius="true" alt="Chart with a legend panel showing color-coded series names positioned beside the chart area." />

## When to use
- **Multi-series charts**: Indispensable when more than one series is displayed.
- **Interactive toggling**: When users need to show/hide series by clicking legend items.
- **Complex visuals**: Helping to explain color or pattern coding (e.g., in a Pie or Map chart).

## Code example

### XAML
```xml
<controls:CartesianChart Title="Market Trends" Height="300"
                        ShowLegend="True"
                        LegendPosition="Right"
                        LegendAlignment="Center">
    <controls:CartesianChart.Series>
        <controls:LineSeries Title="Segment A" ItemsSource="{Binding DataA}" />
        <controls:LineSeries Title="Segment B" ItemsSource="{Binding DataB}" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public ObservableCollection<double> DataA { get; } = new() { 10, 20, 15 };
public ObservableCollection<double> DataB { get; } = new() { 5, 25, 30 };
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ShowLegend` | Toggles the visibility of the legend. | `false` |
| `LegendPosition` | `None`, `Top`, `Bottom`, `Left`, `Right`, or `Floating`. | `None` |
| `LegendAlignment` | `Near`, `Center`, or `Far`. | `Center` |
| `ToggleSeriesVisibility` | Allows toggling series visibility via clicks. | `true` |
