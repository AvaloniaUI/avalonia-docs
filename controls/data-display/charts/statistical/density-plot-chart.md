---
id: density-plot-chart
title: Density plot chart
description: Uses kernel density estimation to render a smooth distribution curve, with optional filled area under the curve.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Density plots smooth a numeric distribution into a continuous curve so peaks and spread are easier to see than in raw point lists.

## When to use

- **Distribution shape**: Inspect concentration, skew, and multiple peaks.
- **Smoother histograms**: Show the same story as a histogram with a continuous curve.
- **Sampling comparisons**: Present the overall shape of a dataset without plotting every point.

## Code example

### XAML

```xml
<DensityPlotChart xmlns="https://github.com/avaloniaui" Title="Response time density"
                                   Height="300"
                                   ItemsSource="{Binding DensityData}"
                                   ValuePath="Value" />
```

### Data model (C#)

```csharp
public record Measurement(double Value);

public ObservableCollection<Measurement> DensityData { get; } = new()
{
    new(12),
    new(15),
    new(18),
    new(19),
    new(24)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of numeric samples. | `null` |
| `ValuePath` | Path to the numeric sample value. | `null` |
| `Bandwidth` | Kernel bandwidth. Automatically calculated if set to `0.0`. | `0.0` |
| `FillOpacity` | Opacity of the filled area under the curve. | `0.3` |
| `ShowArea` | Whether to fill the area under the curve. | `true` |
| `ShowGridLines` | Whether to draw background grid lines. | `true` |
| `Stroke` | Brush used for the density curve. | `null` |

## See also

- [Histogram chart](/controls/data-display/charts/cartesian/histogram-chart)
- [Violin plot](/controls/data-display/charts/statistical/violin-plot-chart)
