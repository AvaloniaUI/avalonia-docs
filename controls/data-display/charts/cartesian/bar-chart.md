---
id: bar-chart
title: Bar chart
description: Represents data using rectangular bars with lengths proportional to values, for comparing discrete quantities across categories.
doc-type: reference
tags:
  - avalonia pro
---

import chartsCartesianBar from '/img/controls/charts/charts-cartesian-bar.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Bar charts represent data using rectangular bars with lengths proportional to the values they represent.

<Image light={chartsCartesianBar} maxWidth={400} position="center" cornerRadius="true" alt="Bar chart with vertical rectangular bars of varying heights comparing quarterly revenue across categories." />

## When to use
- **Comparisons**: Comparing discrete quantities across different categories.
- **Ranking**: Showing which categories have the highest or lowest values.
- **Categorical data**: When data is grouped into distinct, non-continuous groups.

## Code example

### XAML
```xml
<charts:CartesianChart Name="BarChart" Title="Bar Chart" Height="250">
                        <charts:CartesianChart.HorizontalAxis>
                            <charts:CategoryAxis />
                        </charts:CartesianChart.HorizontalAxis>
                        <charts:CartesianChart.VerticalAxis>
                            <charts:NumericalAxis />
                        </charts:CartesianChart.VerticalAxis>
                        <charts:CartesianChart.Series>
                            <charts:BarSeries Title="Sales" ItemsSource="{Binding BarSeriesData}" Fill="DodgerBlue" />
                        </charts:CartesianChart.Series>
                    </charts:CartesianChart>
```

### Data model (C#)
```csharp
public ObservableCollection<int> BarSeriesData { get; } = new()
{
    150, 180, 165, 190, 175, 200
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
| `ColorByPoint` | Whether each bar uses its own palette color. | `false` |
| `BarCornerRadius` | The rounding of the bar corners. | `0` |
| `BarWidth` | The width of each bar as a fraction of the category band (0.0 to 1.0). | `0.7` |
