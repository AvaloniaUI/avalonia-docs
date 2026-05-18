---
id: stacked-area-chart
title: Stacked area chart
description: Stacks multiple area series on top of each other to show how several variables contribute to a cumulative total over time.
doc-type: reference
tags:
  - avalonia pro
---

import chartsCartesianStackedarea from '/img/controls/charts/charts-cartesian-stackedarea.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Stacked area charts display multiple area series stacked on top of each other. They are ideal for showing how several variables contribute to a total over time.

<Image light={chartsCartesianStackedarea} maxWidth={400} position="center" cornerRadius="true" alt="Stacked area chart with multiple colored layers representing traffic sources stacked to show cumulative total." />

## When to use
- **Accumulation**: Visualizing the sum of multiple categories over a period.
- **Temporal composition**: Showing how the makeup of a total value changes chronologically.
- **Trend comparison**: Comparing the relative growth of different layers.

## Code example

### XAML
```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Name="StackedAreaChart" Title="Stacked Area Chart" Height="250" ShowLegend="True">
    <CartesianChart.HorizontalAxis>
        <CategoryAxis />
    </CartesianChart.HorizontalAxis>
    <CartesianChart.VerticalAxis>
        <NumericalAxis />
    </CartesianChart.VerticalAxis>
    <CartesianChart.Series>
        <StackedAreaSeries Title="Desktop"
                                  ItemsSource="{Binding StackedAreaDesktop}"
                                  Fill="#7E2196F3"
                                  Stroke="DodgerBlue" />
        <StackedAreaSeries Title="Mobile"
                                  ItemsSource="{Binding StackedAreaMobile}"
                                  Fill="#7E4CAF50"
                                  Stroke="Green" />
        <StackedAreaSeries Title="Tablet"
                                  ItemsSource="{Binding StackedAreaTablet}"
                                  Fill="#7EFF9800"
                                  Stroke="Orange" />
    </CartesianChart.Series>
</CartesianChart>
```

### Data model (C#)
```csharp
public ObservableCollection<int> StackedAreaDesktop { get; } =
    new() { 500, 480, 520, 510, 490, 530, 550 };

public ObservableCollection<int> StackedAreaMobile { get; } =
    new() { 300, 350, 380, 420, 450, 480, 520 };

public ObservableCollection<int> StackedAreaTablet { get; } =
    new() { 100, 120, 130, 140, 150, 160, 170 };
```

## Common properties (StackedAreaSeries)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The series name. | `null` |
| `ItemsSource` | The data collection for this layer. | `null` |
| `Fill` | Brush used for this specific area layer. | Auto-generated |
| `FillOpacity` | Transparency level (0.0 to 1.0). | `0.7` |
| `StackGroup` | Stack identifier. Series with the same value are stacked together. | `"default"` |
