---
id: stacked-area-chart
title: Stacked Area Chart
description: Stacks multiple area series on top of each other to show how several variables contribute to a cumulative total over time.
doc_type: reference
tags:
  - accelerate
---

import chartsCartesianStackedarea from '/img/controls/charts/charts-cartesian-stackedarea.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Stacked area charts display multiple area series stacked on top of each other. They are ideal for showing how several variables contribute to a total over time.

<Image light={chartsCartesianStackedarea} maxWidth={400} position="center" cornerRadius="true" alt="Stacked area chart with multiple colored layers representing traffic sources stacked to show cumulative total." />

## When to Use
- **Accumulation**: Visualizing the sum of multiple categories over a period.
- **Temporal Composition**: Showing how the makeup of a total value changes chronologically.
- **Trend Comparison**: Comparing the relative growth of different layers.

## Code Example

### XAML
```xml
<controls:CartesianChart Name="StackedAreaChartSample" IsTooltipEnabled="True" Title="Traffic Sources" Height="250">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:StackedAreaSeries Title="Direct" ItemsSource="{Binding StackedAreaDirect}" />
        <controls:StackedAreaSeries Title="Social" ItemsSource="{Binding StackedAreaSocial}" />
        <controls:StackedAreaSeries Title="Organic" ItemsSource="{Binding StackedAreaOrganic}" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data Model (C#)
```csharp
public record TrafficPoint(string Day, double Volume);

public ObservableCollection<TrafficPoint> StackedAreaDirect { get; } = new()
{
    new("Mon", 45), new("Tue", 52), new("Wed", 48)
};

public ObservableCollection<TrafficPoint> StackedAreaSocial { get; } = new()
{
    new("Mon", 31), new("Tue", 39), new("Wed", 42)
};

public ObservableCollection<TrafficPoint> StackedAreaOrganic { get; } = new()
{
    new("Mon", 55), new("Tue", 65), new("Wed", 58)
};
```

## Common Properties (StackedAreaSeries)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The series name. | `null` |
| `ItemsSource` | The data collection for this layer. | `null` |
| `Fill` | Brush used for this specific area layer. | Auto-generated |
| `FillOpacity` | Transparency level (0.0 to 1.0). | `1.0` |
