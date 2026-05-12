---
id: diverging-bar-chart
title: Diverging bar chart
description: Extends bars left and right from a baseline to compare positive and negative values or opposing responses.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Diverging bar charts use a centered baseline so values can extend in opposite directions from the same origin.

## When to use

- **Sentiment splits**: Show positive and negative responses around zero.
- **Variance views**: Compare over- and under-performance against a baseline.
- **Balanced comparisons**: Highlight directional differences without two separate charts.

## Code example

### XAML

```xml
<charts:DivergingBarChart Title="Net sentiment"
                            Height="300"
                            ItemsSource="{Binding SentimentData}"
                            LabelPath="Label"
                            ValuePath="Score" />
```

### Data model (C#)

```csharp
public record SentimentPoint(string Label, double Score);

public ObservableCollection<SentimentPoint> SentimentData { get; } = new()
{
    new("Product A", 24),
    new("Product B", -12),
    new("Product C", 8)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of items to compare. | `null` |
| `ValuePath` | Path to the value plotted relative to the baseline. | `null` |
| `LabelPath` | Path to the category label. | `null` |
| `Baseline` | Center baseline value. | `0.0` |
| `PositiveBrush` | Brush used for values above the baseline. | `null` |
| `NegativeBrush` | Brush used for values below the baseline. | `null` |
| `BarHeight` | Bar height as a fraction of the row height. | `0.7` |
| `ShowValues` | Whether to draw value labels inside the bars. | `true` |
| `IsHighlightEnabled` | Enables hover highlighting for bars. | `false` |

## See also

- [Bar chart](/controls/data-display/charts/cartesian/bar-chart)
- [Mirror bar chart](/controls/data-display/charts/comparison/mirror-bar-chart)
