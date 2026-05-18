---
id: strip-plot-chart
title: Strip plot chart
description: Displays individual observations per category with controlled jitter, useful for raw-value comparison and mean overlays.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Strip plots show every observation in a category while applying jitter to reduce overlap and optional mean lines to summarize the center.

## When to use

- **Raw sample display**: Show every point rather than only quartiles or averages.
- **Category spread**: Compare how tightly or widely values cluster per group.
- **Hybrid views**: Combine raw observations with a simple mean reference line.

## Code example

### XAML

```xml
<StripPlotChart xmlns="https://github.com/avaloniaui" Title="Response times"
                                 Height="300"
                                 ItemsSource="{Binding StripData}"
                                 CategoryPath="Category"
                                 ValuePath="Value"
                                 JitterAmount="0.3"
                                 ShowMeanLine="True" />
```

### Data model (C#)

```csharp
public record StripPoint(string Category, double Value);

public ObservableCollection<StripPoint> StripData { get; } = new()
{
    new("API", 120),
    new("API", 128),
    new("UI", 95),
    new("UI", 102)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of observations. | `null` |
| `CategoryPath` | Path to the grouping category. | `null` |
| `ValuePath` | Path to the numeric value. | `null` |
| `PointRadius` | Radius of each point. | `4.0` |
| `JitterAmount` | Horizontal jitter factor applied within each category. | `0.3` |
| `Fill` | Brush used to fill points. | `null` |
| `Stroke` | Brush used for point outlines. | `null` |
| `StrokeThickness` | Thickness of point outlines. | `0.5` |
| `PointOpacity` | Opacity applied to the plotted points. | `0.7` |
| `ShowCategoryLabels` | Whether to draw category labels. | `true` |
| `ShowAxes` | Whether to draw the value axis. | `true` |
| `ShowMeanLine` | Whether to draw a mean line for each category. | `true` |

## See also

- [Beeswarm plot chart](/controls/data-display/charts/statistical/beeswarm-plot-chart)
- [Box plot chart](/controls/data-display/charts/statistical/boxplot-chart)
