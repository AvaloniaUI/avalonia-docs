---
id: boxplot-chart
title: Box Plot Chart
description: Graphical summary of data distribution showing the median, quartiles, and outliers using a box-and-whisker layout, useful for statistical comparisons.
doc_type: reference
tags:
  - accelerate
---

import chartsCartesianBoxplot from '/img/controls/charts/charts-cartesian-boxplot.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

A box plot (or box-and-whisker plot) provides a graphical summary of the distribution, central tendency, and variability of data, making it easy to see quartiles and outliers.

<Image light={chartsCartesianBoxplot} maxWidth={400} position="center" cornerRadius="true" alt="Box plot chart with box-and-whisker symbols per category showing median, quartiles, and outlier data points." />

## When to Use
- **Statistical Analysis**: Comparing the distribution of several datasets (e.g., test scores across different classes).
- **Outlier Detection**: Identifying extreme data points that fall outside the "whiskers."
- **Range Visualization**: Showing the minimum, maximum, median, and interquartile range at a glance.

## Code Example

### XAML
```xml
<controls:CartesianChart Name="BoxPlotSample" Title="Box Plot (Box and Whisker)" Height="250">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:BoxPlotSeries Title="Distribution"
                                ItemsSource="{Binding StatsData}"
                                CategoryPath="Category"
                                MinPath="Min" Q1Path="Q1" MedianPath="Median" Q3Path="Q3" MaxPath="Max"
                                Fill="#7E9C27B0" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data Model (C#)
```csharp
public record BoxStats(string Category, double Min, double Q1, double Median, double Q3, double Max);

public ObservableCollection<BoxStats> StatsData { get; } = new()
{
    new("Group A", 10, 25, 45, 60, 95),
    new("Group B", 20, 35, 50, 70, 85)
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of statistical data points. | `null` |
| `MinPath` | Path to the minimum value. | `null` |
| `MaxPath` | Path to the maximum value. | `null` |
| `MedianPath` | Path to the median value. | `null` |
| `Q1Path` | Path to the first quartile (25th percentile). | `null` |
| `Q3Path` | Path to the third quartile (75th percentile). | `null` |
| `Fill` | Brush used for the "box." | Theme-dependent |
| `Stroke` | Color of the whiskers and box outline. | Theme-dependent |
