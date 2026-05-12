---
id: bubble-chart
title: Bubble chart
description: Plots X and Y values like a scatter chart, with a third value encoded as bubble size.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Bubble charts use a `BubbleSeries` inside a `CartesianChart` to plot two numeric dimensions. Each marker is sized using a third measure.

## When to use

- **Three-variable comparison**: Show relationships between X, Y, and magnitude in one view.
- **Portfolio analysis**: Compare price, margin, and volume at the same time.
- **Opportunity maps**: Highlight outliers by size as well as position.

## Code example

### XAML

```xml
<charts:CartesianChart Title="Product portfolio" Height="300">
    <charts:CartesianChart.HorizontalAxis>
        <charts:NumericalAxis Title="Price" />
    </charts:CartesianChart.HorizontalAxis>
    <charts:CartesianChart.VerticalAxis>
        <charts:NumericalAxis Title="Revenue" />
    </charts:CartesianChart.VerticalAxis>
    <charts:CartesianChart.Series>
        <charts:BubbleSeries ItemsSource="{Binding BubbleData}"
                               CategoryPath="Price"
                               ValuePath="Revenue"
                               SizePath="Units"
                               Title="Products" />
    </charts:CartesianChart.Series>
</charts:CartesianChart>
```

### Data model (C#)

```csharp
public record ProductBubble(double Price, double Revenue, double Units);

public ObservableCollection<ProductBubble> BubbleData { get; } = new()
{
    new(15, 120, 40),
    new(22, 180, 65),
    new(30, 140, 25)
};
```

## Common properties (`BubbleSeries`)

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of data points. | `null` |
| `CategoryPath` | Path to the X-axis value. | `null` |
| `ValuePath` | Path to the Y-axis value. | `null` |
| `SizePath` | Path to the value used for bubble size. | `null` |
| `MinBubbleSize` | Minimum bubble diameter in pixels. | `10.0` |
| `MaxBubbleSize` | Maximum bubble diameter in pixels. | `50.0` |
| `Fill` | Brush used for the bubbles. | Theme-dependent |
| `Stroke` | Brush used for the bubble outlines. | Theme-dependent |

## See also

- [Scatter chart](/controls/data-display/charts/cartesian/scatter-chart)
- [Packed bubble chart](/controls/data-display/charts/bubble/packed-bubble-chart)
