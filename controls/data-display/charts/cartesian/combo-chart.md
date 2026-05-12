---
id: combo-chart
title: Combo chart
description: Combines multiple Cartesian series types on shared category axes, with optional support for a secondary Y-axis.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

`ComboChart` is a `CartesianChart` variant for combining multiple series types such as `BarSeries`, `LineSeries`, and `AreaSeries` on the same horizontal axis. Use it when the chart itself needs to expose an optional secondary Y-axis.

## When to use

- **Mixed visual encodings**: Combine bars, lines, or areas in the same plot.
- **Dual-scale comparisons**: Plot a secondary metric on a separate Y-axis.
- **Shared categories**: Align multiple series types to the same category labels.

## Code example

### XAML

```xml
<charts:ComboChart Title="Revenue and margin"
                     Height="320"
                     ShowLegend="True"
                     ShowSecondaryAxis="True">
    <charts:ComboChart.HorizontalAxis>
        <charts:CategoryAxis Title="Month" />
    </charts:ComboChart.HorizontalAxis>
    <charts:ComboChart.VerticalAxis>
        <charts:NumericalAxis Title="Revenue ($K)" />
    </charts:ComboChart.VerticalAxis>
    <charts:ComboChart.SecondaryVerticalAxis>
        <charts:NumericalAxis Title="Margin (%)" />
    </charts:ComboChart.SecondaryVerticalAxis>
    <charts:ComboChart.Series>
        <charts:BarSeries Title="Revenue"
                            ItemsSource="{Binding MonthlyMetrics}"
                            CategoryPath="Month"
                            ValuePath="Revenue" />
        <charts:LineSeries Title="Margin"
                             ItemsSource="{Binding MonthlyMetrics}"
                             CategoryPath="Month"
                             ValuePath="MarginPercent"
                             YAxisPosition="Secondary" />
    </charts:ComboChart.Series>
</charts:ComboChart>
```

### Data model (C#)

```csharp
public record MonthlyMetric(string Month, double Revenue, double MarginPercent);

public ObservableCollection<MonthlyMetric> MonthlyMetrics { get; } = new()
{
    new("Jan", 120, 18),
    new("Feb", 145, 21),
    new("Mar", 138, 19),
    new("Apr", 166, 24)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Series` | Content collection of cartesian series rendered in the chart. | Empty collection |
| `HorizontalAxis` | Primary horizontal axis used by the mixed series. | `null` |
| `VerticalAxis` | Primary vertical axis used by the mixed series. | `null` |
| `ShowSecondaryAxis` | Whether to show a secondary Y-axis on the right side. | `false` |
| `SecondaryVerticalAxis` | Optional secondary vertical axis for series assigned to `YAxisPosition.Secondary`. | `null` |

## Notes

- Series are rendered in declaration order.
- To plot a series against the secondary Y-axis, set that series to `YAxisPosition="Secondary"`.
- Use the series-specific pages for properties such as `BarWidth`, `MarkerShape`, or `FillOpacity`.

## See also

- [Bar chart](/controls/data-display/charts/cartesian/bar-chart)
- [Line chart](/controls/data-display/charts/cartesian/line-chart)
- [Area chart](/controls/data-display/charts/cartesian/area-chart)
- [Axis customization](/controls/data-display/charts/shared-elements/axis-customization-chart)
