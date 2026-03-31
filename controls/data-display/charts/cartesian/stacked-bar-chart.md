---
id: stacked-bar-chart
title: Stacked Bar Chart
description: Stacks multiple data series in a single bar to compare both total values and internal component distribution across categories.
doc_type: reference
tags:
  - accelerate
---

import chartsCartesianStackedbar from '/img/controls/charts/charts-cartesian-stackedbar.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Stacked bar charts represent multiple series of data stacked on top of each other, allowing for comparison of both the total and the individual components.

<Image light={chartsCartesianStackedbar} maxWidth={400} position="center" cornerRadius="true" alt="Stacked bar chart with colored segments stacked in each bar showing regional sales contributions per quarter." />

## When to Use
- **Part-to-Whole**: Visualizing how many smaller parts make up a larger total category.
- **Categorical Comparison**: Comparing totals across different groups while seeing internal distribution.
- **Space Optimization**: Showing multiple data series without needing separate bars for each.

## Code Example

### XAML
```xml
<controls:CartesianChart Name="StackedBarChartSample" IsTooltipEnabled="True" Title="Sales by Region" Height="250">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:StackedBarSeries Title="North" ItemsSource="{Binding StackedBarNorth}" />
        <controls:StackedBarSeries Title="South" ItemsSource="{Binding StackedBarSouth}" />
        <controls:StackedBarSeries Title="East" ItemsSource="{Binding StackedBarEast}" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data Model (C#)
```csharp
public record RegionalSales(string Period, double Amount);

public ObservableCollection<RegionalSales> StackedBarNorth { get; } = new()
{
    new("Q1", 450), new("Q2", 520), new("Q3", 480)
};

public ObservableCollection<RegionalSales> StackedBarSouth { get; } = new()
{
    new("Q1", 310), new("Q2", 390), new("Q3", 420)
};

public ObservableCollection<RegionalSales> StackedBarEast { get; } = new()
{
    new("Q1", 280), new("Q2", 340), new("Q3", 310)
};
```

## Common Properties (StackedBarSeries)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name shown in the legend. | `null` |
| `ItemsSource` | The collection of data for this specific part of the stack. | `null` |
| `Fill` | Background color for this series segment. | Auto-generated |
| `CornerRadius` | Rounding for the bar segments. | `0` |
