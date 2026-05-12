---
id: range-bar-chart
title: Range bar chart
description: Displays floating bars spanning a low-to-high range for each category, ideal for visualizing temperature ranges, price bands, or task durations.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Range bar charts display floating rectangular bars that span from a low value to a high value for each category. They are useful for showing data ranges, intervals, or bands rather than single values.

## When to use
- **Temperature ranges**: Showing daily min/max temperature bands across days or months.
- **Price bands**: Visualizing price ranges or confidence intervals for financial data.
- **Task durations**: Representing start-to-end intervals for scheduling or timeline data.

## Code example

### XAML
```xml
<charts:CartesianChart Title="Weekly Temperature Range" Height="250">
    <charts:CartesianChart.HorizontalAxis>
        <charts:CategoryAxis />
    </charts:CartesianChart.HorizontalAxis>
    <charts:CartesianChart.VerticalAxis>
        <charts:NumericalAxis />
    </charts:CartesianChart.VerticalAxis>
    <charts:CartesianChart.Series>
        <charts:RangeBarSeries Title="Temperature"
                                 ItemsSource="{Binding TemperatureData}"
                                 CategoryPath="Day"
                                 LowPath="Min"
                                 HighPath="Max"
                                 BarWidth="0.6"
                                 BarCornerRadius="4" />
    </charts:CartesianChart.Series>
</charts:CartesianChart>
```

### Data model (C#)
```csharp
public record TemperatureRange(string Day, double Min, double Max);

public ObservableCollection<TemperatureRange> TemperatureData { get; } = new()
{
    new("Mon", 12, 22),
    new("Tue", 14, 25),
    new("Wed", 10, 18),
    new("Thu", 16, 28),
    new("Fri", 13, 21)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series shown in the legend. | `null` |
| `ItemsSource` | The collection of data items to display. | `null` |
| `CategoryPath` | Path to the property used for the X-axis. | `null` |
| `LowPath` | Path to the property for the low (minimum) value. | `null` |
| `HighPath` | Path to the property for the high (maximum) value. | `null` |
| `Fill` | The color/brush used to fill the bars. | Theme-dependent |
| `Stroke` | The outline color of the bars. | `Transparent` |
| `BarWidth` | The width of each bar as a fraction of the category band (0.0 to 1.0). | `0.7` |
| `BarCornerRadius` | The rounding of the bar corners. | `2` |

## See also

- [Bar chart](/controls/data-display/charts/cartesian/bar-chart)
- [Variance chart](/controls/data-display/charts/cartesian/variance-chart)
- [Combo chart](/controls/data-display/charts/cartesian/combo-chart)
