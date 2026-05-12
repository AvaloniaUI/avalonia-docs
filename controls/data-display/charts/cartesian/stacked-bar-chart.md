---
id: stacked-bar-chart
title: Stacked bar chart
description: Stacks multiple data series in a single bar to compare both total values and internal component distribution across categories.
doc-type: reference
tags:
  - avalonia pro
---

import chartsCartesianStackedbar from '/img/controls/charts/charts-cartesian-stackedbar.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Stacked bar charts represent multiple series of data stacked on top of each other, allowing for comparison of both the total and the individual components.

<Image light={chartsCartesianStackedbar} maxWidth={400} position="center" cornerRadius="true" alt="Stacked bar chart with colored segments stacked in each bar showing regional sales contributions per quarter." />

## When to use
- **Part-to-Whole**: Visualizing how many smaller parts make up a larger total category.
- **Categorical comparison**: Comparing totals across different groups while seeing internal distribution.
- **Space optimization**: Showing multiple data series without needing separate bars for each.

## Code example

### XAML
```xml
<charts:CartesianChart Name="StackedBarChart" Title="Stacked Bar Chart" Height="250" ShowLegend="True">
                        <charts:CartesianChart.HorizontalAxis>
                            <charts:CategoryAxis />
                        </charts:CartesianChart.HorizontalAxis>
                        <charts:CartesianChart.VerticalAxis>
                            <charts:NumericalAxis />
                        </charts:CartesianChart.VerticalAxis>
                        <charts:CartesianChart.Series>
                            <charts:StackedBarSeries Title="Product A" ItemsSource="{Binding StackedBarProductA}" Fill="DodgerBlue" />
                            <charts:StackedBarSeries Title="Product B" ItemsSource="{Binding StackedBarProductB}" Fill="Orange" />
                            <charts:StackedBarSeries Title="Product C" ItemsSource="{Binding StackedBarProductC}" Fill="Green" />
                        </charts:CartesianChart.Series>
                    </charts:CartesianChart>
```

### Data model (C#)
```csharp
public ObservableCollection<int> StackedBarProductA { get; } = new()
{
    40, 55, 50, 60, 45, 70
};

public ObservableCollection<int> StackedBarProductB { get; } = new()
{
    30, 35, 40, 45, 35, 50
};

public ObservableCollection<int> StackedBarProductC { get; } = new()
{
    20, 25, 30, 25, 30, 35
};
```

## Common properties (StackedBarSeries)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name shown in the legend. | `null` |
| `ItemsSource` | The collection of data for this specific part of the stack. | `null` |
| `CategoryPath` | Path to the shared category value for each bar. | `null` |
| `ValuePath` | Path to the numeric value for this series. | `null` |
| `Fill` | Background color for this series segment. | Auto-generated |
| `StackGroup` | Identifier used to stack related series together. | `"default"` |
| `BarWidth` | Width of each bar as a fraction of the available slot. | `0.7` |
| `BarCornerRadius` | Rounding for the bar segments. | `0` |
