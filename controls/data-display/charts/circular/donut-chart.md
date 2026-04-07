---
id: donut-chart
title: Donut chart
description: A variation of the pie chart with a blank center, often used to display a total value or label in the middle for improved readability.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsPieDonut from '/img/controls/charts/charts-pie-donut.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

A donut chart is a variations of a pie chart with a blank center. This design is often used to place a total value or a label in the middle, improving readability and space efficiency.

<Image light={chartsPieDonut} maxWidth={400} position="center" cornerRadius="true" alt="Donut chart with a blank center hole showing proportional segments of revenue distribution by source." />

## When to use
- **Proportional comparison**: Similar to a pie chart, but with a cleaner, more modern aesthetic.
- **Summary views**: Where the central space can be used to display the total sum or a key metric.
- **Minimalist dashboards**: Highly effective for simple part-to-whole visualizations with few categories.

## Code example

### XAML
```xml
<controls:PieChart Name="DonutChartSample" IsTooltipEnabled="True" Title="Revenue Distribution" Height="300" InnerRadiusFactor="0.6">
     <controls:PieChart.Series>
        <controls:PieSeries ItemsSource="{Binding DonutData}" LabelPath="Label" ValuePath="Value" />
    </controls:PieChart.Series>
</controls:PieChart>
```

### Data model (C#)
```csharp
public record RevenueSource(string Label, double Value);

public ObservableCollection<RevenueSource> DonutData { get; } = new()
{
    new("Direct", 5500),
    new("Affiliate", 2300),
    new("Organic", 4100)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of data slices. | `null` |
| `InnerRadiusFactor`| The size of the "hole" (0.0 to 1.0). | `0.5` |
| `LabelPath` | Path to the text to display on or near slices. | `null` |
| `ValuePath` | Path to the numerical value for slice sizing. | `null` |
| `Palette` | Custom collection of brushes for the slices. | Theme-dependent |
