---
id: dot-plot-chart
title: Dot plot chart
description: Displays data points as simple dots along an axis, useful for comparing values across categories or showing frequency distributions.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Dot plot charts display individual data points as simple dots, so values can be compared across categories without the visual weight of bars.

## When to use
- **Value comparison**: Comparing individual values across multiple categories without bar clutter.
- **Frequency distribution**: Showing how often specific values occur within a dataset.
- **Small datasets**: When precise positioning of each data point matters more than aggregate shape.

## Code example

### XAML
```xml
<charts:CartesianChart Title="Employee Ratings" Height="250">
    <charts:CartesianChart.HorizontalAxis>
        <charts:CategoryAxis />
    </charts:CartesianChart.HorizontalAxis>
    <charts:CartesianChart.VerticalAxis>
        <charts:NumericalAxis />
    </charts:CartesianChart.VerticalAxis>
    <charts:CartesianChart.Series>
        <charts:DotPlotSeries Title="Ratings"
                                ItemsSource="{Binding RatingData}"
                                CategoryPath="Department"
                                ValuePath="Score"
                                DotSize="12"
                                ShowConnectorLines="True" />
    </charts:CartesianChart.Series>
</charts:CartesianChart>
```

### Data model (C#)
```csharp
public record RatingItem(string Department, double Score);

public ObservableCollection<RatingItem> RatingData { get; } = new()
{
    new("Engineering", 4.5),
    new("Marketing", 3.8),
    new("Sales", 4.1),
    new("Support", 3.5),
    new("Design", 4.3)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series shown in the legend. | `null` |
| `ItemsSource` | The collection of data items to display. | `null` |
| `CategoryPath` | Path to the property used for the X-axis. | `null` |
| `ValuePath` | Path to the property used for the Y-axis. | `null` |
| `Fill` | The color/brush used to fill the dots. | Theme-dependent |
| `Stroke` | The outline color of the dots. | `Transparent` |
| `DotSize` | The size of each dot in pixels. | `10` |
| `ShowConnectorLines` | Whether to show lines connecting the dots. | `false` |
| `ConnectorThickness` | The thickness of the connector lines. | `1` |

## See also

- [Scatter chart](/controls/data-display/charts/cartesian/scatter-chart)
- [Lollipop chart](/controls/data-display/charts/cartesian/lollipop-chart)
- [Bar chart](/controls/data-display/charts/cartesian/bar-chart)
