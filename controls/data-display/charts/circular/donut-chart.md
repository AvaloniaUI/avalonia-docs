---
id: donut-chart
title: Donut chart
description: A variation of the pie chart with a blank center, often used to display a total value or label in the middle for improved readability.
doc-type: reference
tags:
  - avalonia pro
---

import chartsPieDonut from '/img/controls/charts/charts-pie-donut.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

A donut chart is a variation of the [pie chart](/controls/data-display/charts/circular/pie-chart) that uses a non-zero `InnerRadiusFactor`. This design lets you reserve the center for a summary value or label.

<Image light={chartsPieDonut} maxWidth={400} position="center" cornerRadius="true" alt="Donut chart with a blank center hole showing proportional segments of revenue distribution by source." />

## When to use
- **Proportional comparison**: Similar to a pie chart, but with more room for labels or totals in the center.
- **Summary views**: Where the central space can be used to display the total sum or a key metric.
- **Minimalist dashboards**: Highly effective for simple part-to-whole visualizations with few categories.

## Code example

### XAML
```xml
<PieChart xmlns="https://github.com/avaloniaui" Name="DonutChartSample" IsTooltipEnabled="True" Title="Revenue Distribution" Height="300" InnerRadiusFactor="0.6">
                         <PieChart.Series>
                            <PieSeries ItemsSource="{Binding DonutChartData}" LabelPath="Value" />
                        </PieChart.Series>
                    </PieChart>
```

### Data model (C#)
```csharp
public ObservableCollection<double> DonutChartData { get; } = new()
{
    40, 30, 20, 10
};
```

There is no specific `DonutChart` control. Use `PieChart` and set `InnerRadiusFactor` to a value greater than `0.0`.

## Common properties

### PieChart

| Property | Description | Default |
| :--- | :--- | :--- |
| `InnerRadiusFactor` | The size of the center hole, from `0.0` to `1.0`. | `0.0` |
| `Title` | Chart title displayed above the donut. | `null` |
| `Palette` | Custom collection of brushes for the slices. | Theme-dependent |

### PieSeries

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of data slices. | `null` |
| `LabelPath` | Path to the text to display on or near slices. | `null` |
| `ValuePath` | Path to the numerical value for slice sizing. | `null` |
| `RadiusFactor` | Outer radius factor for the series, from `0.0` to `1.0`. | `0.9` |
| `InnerRadiusFactor` | Optional inner radius factor for the series. When `null`, the chart-level value is used. | `null` |
| `StartAngle` | Start angle in degrees for the first slice. | `-90.0` |
| `ShowLabels` | Whether to display labels on the slices. | `true` |
| `LabelPosition` | Position of slice labels, `Inside` or `Outside`. | `Inside` |
| `SliceLabelFormat` | Format used for slice labels. | `Percentage` |
| `LabelFontSize` | Font size used for slice labels. | `11.0` |
| `LabelForeground` | Brush used for slice labels. | `null` |
