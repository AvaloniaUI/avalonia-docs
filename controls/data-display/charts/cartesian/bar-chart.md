---
id: bar-chart
title: Bar chart
description: Represents data using rectangular bars with lengths proportional to values, for comparing discrete quantities across categories.
doc_type: reference
tags:
  - accelerate
---

import chartsCartesianBar from '/img/controls/charts/charts-cartesian-bar.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Bar charts represent data using rectangular bars with lengths proportional to the values they represent.

<Image light={chartsCartesianBar} maxWidth={400} position="center" cornerRadius="true" alt="Bar chart with vertical rectangular bars of varying heights comparing quarterly revenue across categories." />

## When to use
- **Comparisons**: Comparing discrete quantities across different categories.
- **Ranking**: Showing which categories have the highest or lowest values.
- **Categorical Data**: When data is grouped into distinct, non-continuous groups.

## Code example

### XAML
```xml
<controls:CartesianChart Name="BarChartSample" IsTooltipEnabled="True" Title="Quarterly Revenue" Height="250">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:BarSeries Title="Revenue" ItemsSource="{Binding BarData}" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record CategoryData(string Category, double Amount);

public ObservableCollection<CategoryData> BarData { get; } = new()
{
    new("Electronics", 1200),
    new("Clothing", 800),
    new("Home", 1500),
    new("Books", 400)
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
| `CornerRadius` | The rounding of the bar corners. | `0` |
| `Spacing` | The gap between bars (0.0 to 1.0). | `0.1` |
