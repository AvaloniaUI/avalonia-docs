---
id: lollipop-chart
title: Lollipop chart
description: Displays data as dots with thin stems connecting to the axis, combining the precision of dot plots with the visual anchoring of bar charts.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Lollipop charts display data points as dots with thin stems extending to the baseline. They are a lightweight alternative to bar charts that reduce visual clutter while maintaining clear value communication.

## When to use
- **Lightweight comparison**: When bar charts feel too heavy and you want a cleaner look.
- **Many categories**: Reducing ink-to-data ratio when comparing many categories side-by-side.
- **Presentations**: Creating visually appealing charts where emphasis is on the data point value.

## Code example

### XAML
```xml
<charts:CartesianChart Title="Monthly Sales" Height="250">
    <charts:CartesianChart.HorizontalAxis>
        <charts:CategoryAxis />
    </charts:CartesianChart.HorizontalAxis>
    <charts:CartesianChart.VerticalAxis>
        <charts:NumericalAxis />
    </charts:CartesianChart.VerticalAxis>
    <charts:CartesianChart.Series>
        <charts:LollipopSeries Title="Sales"
                                 ItemsSource="{Binding MonthlySales}"
                                 CategoryPath="Month"
                                 ValuePath="Amount"
                                 StemThickness="2"
                                 Orientation="Vertical" />
    </charts:CartesianChart.Series>
</charts:CartesianChart>
```

### Data model (C#)
```csharp
public record SalesItem(string Month, double Amount);

public ObservableCollection<SalesItem> MonthlySales { get; } = new()
{
    new("Jan", 320),
    new("Feb", 450),
    new("Mar", 280),
    new("Apr", 510),
    new("May", 390)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series shown in the legend. | `null` |
| `ItemsSource` | The collection of data items to display. | `null` |
| `CategoryPath` | Path to the property used for the X-axis. | `null` |
| `ValuePath` | Path to the property used for the Y-axis. | `null` |
| `Fill` | The color/brush used to fill the dot. | Theme-dependent |
| `Stroke` | The outline color of the dot. | `Transparent` |
| `StemThickness` | The thickness of the stem line. | `2` |
| `StemBrush` | The brush for the stem line. | `null` (Defaults to same color as `Fill` when unset.) |
| `Orientation` | The direction of the stems, `Vertical` or `Horizontal`. | `Vertical` |

## See also

- [Dot plot chart](/controls/data-display/charts/cartesian/dot-plot-chart)
- [Bar chart](/controls/data-display/charts/cartesian/bar-chart)
- [Scatter chart](/controls/data-display/charts/cartesian/scatter-chart)
