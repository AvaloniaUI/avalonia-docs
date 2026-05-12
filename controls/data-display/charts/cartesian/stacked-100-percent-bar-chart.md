---
id: stacked-100-percent-bar-chart
title: Stacked 100% bar chart
description: Displays bars that always fill to 100%, showing the relative proportion of each series within a category rather than absolute values.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Stacked 100% bar charts display bars that always extend to the same height, showing the percentage composition of each category. Each segment represents a series' proportional share, so readers can compare relative contributions.

## When to use
- **Proportional comparison**: Comparing how different segments contribute to the whole across categories.
- **Market share**: Showing relative market share or budget allocation across departments.
- **Survey results**: Displaying percentage breakdowns such as agree/disagree responses per question.

## Code example

### XAML
```xml
<charts:CartesianChart Title="Browser Market Share" Height="250">
    <charts:CartesianChart.HorizontalAxis>
        <charts:CategoryAxis />
    </charts:CartesianChart.HorizontalAxis>
    <charts:CartesianChart.VerticalAxis>
        <charts:NumericalAxis />
    </charts:CartesianChart.VerticalAxis>
    <charts:CartesianChart.Series>
        <charts:Stacked100PercentBarSeries Title="Chrome"
                                              ItemsSource="{Binding ChromeData}"
                                              CategoryPath="Year"
                                              ValuePath="Share"
                                              StackGroup="browsers" />
        <charts:Stacked100PercentBarSeries Title="Firefox"
                                              ItemsSource="{Binding FirefoxData}"
                                              CategoryPath="Year"
                                              ValuePath="Share"
                                              StackGroup="browsers" />
        <charts:Stacked100PercentBarSeries Title="Safari"
                                              ItemsSource="{Binding SafariData}"
                                              CategoryPath="Year"
                                              ValuePath="Share"
                                              StackGroup="browsers" />
    </charts:CartesianChart.Series>
</charts:CartesianChart>
```

### Data model (C#)
```csharp
public record BrowserShare(string Year, double Share);

public ObservableCollection<BrowserShare> ChromeData { get; } = new()
{
    new("2022", 65), new("2023", 63), new("2024", 66)
};

public ObservableCollection<BrowserShare> FirefoxData { get; } = new()
{
    new("2022", 20), new("2023", 18), new("2024", 15)
};

public ObservableCollection<BrowserShare> SafariData { get; } = new()
{
    new("2022", 15), new("2023", 19), new("2024", 19)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series shown in the legend. | `null` |
| `ItemsSource` | The collection of data items to display. | `null` |
| `CategoryPath` | Path to the property used for the X-axis. | `null` |
| `ValuePath` | Path to the property used for the Y-axis. | `null` |
| `Fill` | The color/brush used to fill the bars. | Theme-dependent |
| `Stroke` | The outline color of the bars. | `Transparent` |
| `StackGroup` | The group name used to combine multiple series into one stacked bar. | `"default"` |
| `BarWidth` | The width of each bar as a fraction of the category band (0.0 to 1.0). | `0.7` |
| `BarCornerRadius` | The rounding of the bar corners. | `0` |

## See also

- [Bar chart](/controls/data-display/charts/cartesian/bar-chart)
- [Stacked bar chart](/controls/data-display/charts/cartesian/stacked-bar-chart)
- [Combo chart](/controls/data-display/charts/cartesian/combo-chart)
