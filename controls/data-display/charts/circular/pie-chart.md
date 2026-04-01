---
id: pie-chart
title: Pie chart
description: A circular chart divided into sectors to illustrate numerical proportions, most effective for showing part-to-whole relationships with few categories.
doc_type: reference
tags:
  - accelerate
---

import chartsPie from '/img/controls/charts/charts-pie.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Pie charts are circular charts divided into sectors to illustrate numerical proportion. They are most effective when showing part-to-whole relationships.

<Image light={chartsPie} maxWidth={400} position="center" cornerRadius="true" alt="Pie chart divided into colored sectors showing proportional market share across a small number of categories." />

## When to use
- **Proportions**: Visualizing the relative size of categories compared to the total.
- **Limited Categories**: Best used with 2-6 categories to maintain readability.
- **Composition**: Showing how a total amount is divided among different segments.

## Code example

### XAML
```xml
<controls:PieChart Name="PieChartSample" IsTooltipEnabled="True" Title="Market Share" Height="300">
    <controls:PieChart.Series>
        <controls:PieSeries ItemsSource="{Binding PieData}" LabelPath="Label" ValuePath="Value" />
    </controls:PieChart.Series>
</controls:PieChart>
```

### Data model (C#)
```csharp
public record SegmentData(string Label, double Value);

public ObservableCollection<SegmentData> PieData { get; } = new()
{
    new("Completed", 65),
    new("Pending", 25),
    new("Cancelled", 10)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the chart/series. | `null` |
| `ItemsSource` | The collection of data items. | `null` |
| `ValuePath` | Path to the property used for the segment values. | `null` |
| `LabelPath` | Path to the property used for segment labels. | `null` |
| `InnerRadiusFactor`| Set > 0 (e.g., 0.6) to create a **Donut Chart**. | `0.0` |
| `Palette` | Custom brush collection for the segments. | Auto-generated |
