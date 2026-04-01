---
id: legend-chart
title: Legend
description: Identifies data series within a chart by label and color, supporting multiple positions, orientations, and optional interactive series toggling.
doc_type: reference
tags:
  - accelerate
---

import chartsFeaturesLegend from '/img/controls/charts/charts-legend-right.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

The Legend component helps users identify different data series within a chart. It can be positioned around the chart area and styled to match your application's theme.

<Image light={chartsFeaturesLegend} maxWidth={400} position="center" cornerRadius="true" alt="Chart with a legend panel showing color-coded series names positioned beside the chart area." />

## When to Use
- **Multi-series Charts**: Indispensable when more than one series is displayed.
- **Interactive Toggling**: When users need to show/hide series by clicking legend items.
- **Complex Visuals**: Helping to explain color or pattern coding (e.g., in a Pie or Map chart).

## Code Example

### XAML
```xml
<controls:CartesianChart Title="Market Trends" Height="300"
                        ShowLegend="True"
                        LegendPosition="Right"
                        LegendOrientation="Vertical">
    <controls:CartesianChart.Series>
        <controls:LineSeries Title="Segment A" ItemsSource="{Binding DataA}" />
        <controls:LineSeries Title="Segment B" ItemsSource="{Binding DataB}" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data Model (C#)
```csharp
public ObservableCollection<double> DataA { get; } = new() { 10, 20, 15 };
public ObservableCollection<double> DataB { get; } = new() { 5, 25, 30 };
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ShowLegend` | Toggles the visibility of the legend. | `false` |
| `LegendPosition` | `Top`, `Bottom`, `Left`, `Right`, or `Floating`. | `Bottom` |
| `LegendOrientation`| `Horizontal` or `Vertical`. | `Horizontal` |
| `IsInteractive` | Allows toggling series visibility via clicks. | `true` |
