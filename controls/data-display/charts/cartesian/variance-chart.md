---
id: variance-chart
title: Variance chart
description: Displays bars showing positive and negative variance from a baseline, with distinct colors for values above and below the reference line.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Variance charts display bars extending above and below a baseline value, using distinct colors for positive and negative deviations. They show where values exceed or fall short of a target or reference point.

## When to use
- **Budget analysis**: Showing actual vs. planned spending where overruns and savings are color-coded.
- **Performance tracking**: Visualizing KPI deviations from targets across categories.
- **Profit and loss**: Displaying gains and losses relative to a break-even point.

## Code example

### XAML
```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Title="Monthly Profit/Loss" Height="250">
    <CartesianChart.HorizontalAxis>
        <CategoryAxis />
    </CartesianChart.HorizontalAxis>
    <CartesianChart.VerticalAxis>
        <NumericalAxis />
    </CartesianChart.VerticalAxis>
    <CartesianChart.Series>
        <VarianceSeries Title="Profit/Loss"
                                 ItemsSource="{Binding ProfitData}"
                                 CategoryPath="Month"
                                 ValuePath="Amount"
                                 Baseline="0"
                                 PositiveBrush="Green"
                                 NegativeBrush="Red"
                                 BarWidth="0.6" />
    </CartesianChart.Series>
</CartesianChart>
```

### Data model (C#)
```csharp
public record ProfitItem(string Month, double Amount);

public ObservableCollection<ProfitItem> ProfitData { get; } = new()
{
    new("Jan", 150),
    new("Feb", -80),
    new("Mar", 220),
    new("Apr", -30),
    new("May", 180),
    new("Jun", -120)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series shown in the legend. | `null` |
| `ItemsSource` | The collection of data items to display. | `null` |
| `CategoryPath` | Path to the property used for the X-axis. | `null` |
| `ValuePath` | Path to the property used for the Y-axis. | `null` |
| `Baseline` | The reference value that separates positive from negative variance. | `0` |
| `PositiveBrush` | The brush used for bars above the baseline. | `null` |
| `NegativeBrush` | The brush used for bars below the baseline. | `null` |
| `BarWidth` | The width of each bar as a fraction of the category band (0.0 to 1.0). | `0.6` |
| `BarCornerRadius` | The rounding of the bar corners. | `2` |

## See also

- [Bar chart](/controls/data-display/charts/cartesian/bar-chart)
- [Range bar chart](/controls/data-display/charts/cartesian/range-bar-chart)
- [Waterfall chart](/controls/data-display/charts/cartesian/waterfall-chart)
