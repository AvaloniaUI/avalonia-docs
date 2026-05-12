---
id: tornado-chart
title: Tornado chart
description: Draws bidirectional horizontal bars around a center line, often used for sensitivity analysis and ranked comparisons.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Tornado charts place left and right bars around a shared center line, which keeps ranked side-by-side differences scannable.

## When to use

- **Sensitivity analysis**: Rank which variables push a result most to the left or right.
- **Scenario comparison**: Compare two opposing values across the same categories.
- **Priority review**: Focus on the largest absolute differences first.

## Code example

### XAML

```xml
<charts:TornadoChart Title="Sensitivity drivers"
                       Height="320"
                       ItemsSource="{Binding TornadoData}"
                       LabelPath="Factor"
                       LeftValuePath="Downside"
                       RightValuePath="Upside" />
```

### Data model (C#)

```csharp
public record TornadoFactor(string Factor, double Downside, double Upside);

public ObservableCollection<TornadoFactor> TornadoData { get; } = new()
{
    new("Demand", 18, 26),
    new("Price", 12, 20),
    new("Costs", 22, 14)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of factors or categories. | `null` |
| `LeftValuePath` | Path to the left-side value. | `null` |
| `RightValuePath` | Path to the right-side value. | `null` |
| `LabelPath` | Path to the category label. | `null` |
| `LeftBrush` | Brush used for left bars. | `#E91E63` |
| `RightBrush` | Brush used for right bars. | `#2196F3` |
| `BarHeight` | Bar height as a fraction of the row height. | `0.7` |
| `CenterGap` | Gap between the two sides. | `4.0` |
| `IsHighlightEnabled` | Enables hover highlighting for tornado bars. | `false` |

## See also

- [Mirror bar chart](/controls/data-display/charts/comparison/mirror-bar-chart)
- [Population pyramid chart](/controls/data-display/charts/comparison/population-pyramid-chart)
