---
id: violin-plot-chart
title: Violin plot
description: Combines a box plot with a kernel density estimate to show both the statistical summary and the probability distribution shape of data across categories.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Violin plots combine a box plot with a kernel density plot, showing both the statistical summary and the probability density of the data at different values.

## When to use

- **Deep distribution**: When you need to see where data points are most frequent (density).
- **Comparison**: Comparing both the ranges (box plot) and the shapes (density) of multiple groups.
- **Multi-modal data**: Identifying data with multiple peaks (modes) which a box plot might hide.

## Code example

### XAML

```xml
<charts:ViolinPlotChart Name="ViolinPlotSample"
                           Title="Response Times"
                           Height="300"
                           CategoryPath="Group"
                           ValuesPath="DataPoints"
                           ItemsSource="{Binding ViolinSeries}" />
```

### Data model (C#)

```csharp
public record ViolinGroup(string Group, ObservableCollection<double> DataPoints);

public ObservableCollection<ViolinGroup> ViolinSeries { get; } = new()
{
    new("Backend", new() { 12, 15, 12, 18, 25, 30, 12, 14 }),
    new("Frontend", new() { 50, 55, 60, 50, 45, 80, 50, 52 })
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of data groups. | `null` |
| `ValuesPath` | Path to the value collection for each category. Supported types are `IEnumerable<double>`, `IEnumerable<int>`, and `double[]`. | `null` |
| `CategoryPath` | Path to the category name. | `null` |
| `ShowMedian` | Whether to display the median line inside the embedded box plot. This only applies when `ShowBoxPlot` is enabled and at least five values are available. | `true` |
| `ViolinWidth` | Width factor of each violin body. | `0.8` |
| `Fill` | Brush used for the violin bodies. | `null` |
| `Stroke` | Brush used for the violin outlines. | `null` |
| `StrokeThickness` | Thickness of the violin outlines. | `1.5` |
| `ShowBoxPlot` | Whether to display the internal box plot. Quartile overlays are drawn only when the category has at least five values. | `true` |

:::note
When `Fill` or `Stroke` is `null`, the chart falls back to the palette brush for that category. The `Fill` fallback is drawn with reduced opacity.
:::
