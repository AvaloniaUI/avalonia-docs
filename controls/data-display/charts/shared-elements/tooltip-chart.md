---
id: tooltip-chart
title: Tooltips
description: Displays detailed information about data points on hover, with DataTemplate support for custom tooltip content.
doc-type: reference
tags:
  - avalonia pro
---

import chartsFeaturesTooltip from '/img/controls/charts/charts-tooltips.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Tooltips provide detailed information about data points when the user hovers over them. They add precision and context without cluttering the main chart area.

Default Cartesian and financial chart tooltips format category and date values through the chart's horizontal axis formatting.

<Image light={chartsFeaturesTooltip} maxWidth={400} position="center" cornerRadius="true" alt="Chart with an interactive tooltip popup appearing on hover showing the exact value and category of a data point." />

## When to use
- **High-density data**: Pinpointing values in a crowded line or scatter chart.
- **Additional context**: Showing metadata (e.g., "Update Date") that isn't mapped to an axis.
- **Hover interactions**: Showing focused details while the pointer is over a data point.

## Code example

### XAML
```xml
<charts:CartesianChart Name="PerSeriesTooltipsChart" Height="250" IsTooltipEnabled="True">
    <charts:CartesianChart.HorizontalAxis>
        <charts:CategoryAxis Title="Quarter" />
    </charts:CartesianChart.HorizontalAxis>
    <charts:CartesianChart.VerticalAxis>
        <charts:NumericalAxis Title="Revenue" />
    </charts:CartesianChart.VerticalAxis>
    <charts:CartesianChart.Series>
        <charts:BarSeries Title="2023 (Tooltip ON)"
                          ItemsSource="{Binding Series1Data}"
                          IsTooltipEnabled="True" />
        <charts:BarSeries Title="2024 (Tooltip OFF)"
                          ItemsSource="{Binding Series2Data}"
                          IsTooltipEnabled="False" />
    </charts:CartesianChart.Series>
</charts:CartesianChart>
```

### Data model (C#)
```csharp
public ObservableCollection<double> Series1Data { get; } = new()
{
    120, 150, 180, 200
};

public ObservableCollection<double> Series2Data { get; } = new()
{
    140, 170, 160, 220
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `IsTooltipEnabled` | Global toggle for tooltip visibility. | `true` |
| `TooltipTemplate` | Custom DataTemplate for the tooltip UI (on series). | System default |

## Data item conventions

If the hit data item has a non-empty string property named `TooltipText`, the default tooltip displays that text instead of generated series, category, and value content.

Use `TooltipTemplate` on a series when the tooltip needs custom layout, controls, or multiple bound fields.
