---
id: waterfall-chart
title: Waterfall chart
description: Shows a running total as values are added or subtracted, useful for visualizing how sequential positive or negative changes affect an initial value.
doc_type: reference
tags:
  - accelerate
---

import chartsCartesianWaterfall from '/img/controls/charts/charts-cartesian-waterfall.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

A waterfall chart shows a running total as values are added or subtracted. It's useful for understanding how an initial value is affected by a series of intermediate positive or negative values.

<Image light={chartsCartesianWaterfall} maxWidth={400} position="center" cornerRadius="true" alt="Waterfall chart with floating bars showing sequential positive and negative changes to a running total." />

## When to use
- **Financial Analysis**: Visualizing P&L (Profit and Loss) statements over time.
- **Inventory Tracking**: Showing how stock levels change with additions and removals.
- **Process Steps**: Modeling the cumulative effect of sequential variables.

## Code example

### XAML
```xml
<controls:CartesianChart Name="WaterfallChartSample" IsTooltipEnabled="True" Title="Profit Analysis" Height="250">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:WaterfallSeries Title="Changes" ItemsSource="{Binding WaterfallChanges}" CategoryPath="Label" ValuePath="Change" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record WaterfallItem(string Label, double Change);

public ObservableCollection<WaterfallItem> WaterfallChanges { get; } = new()
{
    new("Start", 1000),
    new("Product A", 450),
    new("Service B", -200),
    new("Tax", -150),
    new("Total", 0) // Often handled specially or as a zero-change with TotalBrush
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of changes. | `null` |
| `CategoryPath` | Path to the label/category. | `null` |
| `ValuePath` | Path to the change value (positive or negative). | `null` |
| `PositiveBrush` | Color for positive changes. | `Green` |
| `NegativeBrush` | Color for negative changes. | `Red` |
| `TotalBrush` | Color for the total (final) bar. | Theme-dependent |
| `TotalCategory` | The category name that represents the final total. | `null` |
