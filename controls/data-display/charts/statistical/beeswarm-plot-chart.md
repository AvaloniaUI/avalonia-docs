---
id: beeswarm-plot-chart
title: Beeswarm plot chart
description: Displays individual observations per category as non-overlapping dots, preserving point density without full jitter noise.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Beeswarm plots arrange points within each category to avoid overlap while preserving the distribution of individual observations.

## When to use

- **Raw observation display**: Show every point instead of only summary statistics.
- **Category comparison**: Compare spread and clustering across groups.
- **Distribution detail**: Reveal dense stacks that a plain scatter plot would hide.

## Code example

### XAML

```xml
<charts:BeeswarmPlotChart Title="Test scores by group"
                                    Height="300"
                                    ItemsSource="{Binding BeeswarmData}"
                                    CategoryPath="Category"
                                    ValuePath="Value" />
```

### Data model (C#)

```csharp
public record BeeswarmPoint(string Category, double Value);

public ObservableCollection<BeeswarmPoint> BeeswarmData { get; } = new()
{
    new("A", 62),
    new("A", 65),
    new("B", 74),
    new("B", 79)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of observations. | `null` |
| `CategoryPath` | Path to the grouping category. | `null` |
| `ValuePath` | Path to the numeric value. | `null` |
| `PointRadius` | Radius of each point. | `5.0` |
| `Fill` | Brush used to fill points. | `null` |
| `Stroke` | Brush used for point outlines. | `null` |
| `StrokeThickness` | Thickness of point outlines. | `1.0` |
| `ShowCategoryLabels` | Whether to draw category labels. | `true` |
| `ShowAxes` | Whether to draw the value axis. | `true` |

## See also

- [Strip plot chart](/controls/data-display/charts/statistical/strip-plot-chart)
- [Violin plot](/controls/data-display/charts/statistical/violin-plot-chart)
