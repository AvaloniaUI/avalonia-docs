---
id: range-area-chart
title: Area range chart
description: Displays a filled area connecting high and low values per category, suitable for visualizing uncertainty, price bands, or temperature ranges.
doc-type: reference
tags:
  - avalonia pro
---

import chartsCartesianRangearea from '/img/controls/charts/charts-cartesian-rangearea.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Area range charts display a filled area connecting two values, high and low, for each category. They can be used for visualizing uncertainty, price envelopes, temperature variations, and similar ranges.

<Image light={chartsCartesianRangearea} maxWidth={400} position="center" cornerRadius="true" alt="Range area chart with a filled band between high and low temperature values across days of the week." />

## When to use
- **Error margins**: Showing the confidence interval or error range around a mean value.
- **Price envelopes**: Visualizing daily highs and lows in a single series.
- **Temperature ranges**: Showing the minimum and maximum temperature over a period.

## Code example

### XAML
```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Name="RangeAreaChart" Title="Range Area Chart" Height="250">
    <CartesianChart.HorizontalAxis>
        <CategoryAxis />
    </CartesianChart.HorizontalAxis>
    <CartesianChart.VerticalAxis>
        <NumericalAxis />
    </CartesianChart.VerticalAxis>
    <CartesianChart.Series>
        <AreaRangeSeries Title="Temperature Range"
                                ItemsSource="{Binding RangeAreaData}"
                                LowPath="Low"
                                HighPath="High"
                                CategoryPath="Category"
                                Fill="#7EE91E63"
                                Stroke="DeepPink"
                                StrokeThickness="2" />
    </CartesianChart.Series>
</CartesianChart>
```

### Data model (C#)
```csharp
public record CategoryRangePoint(string Category, double Low, double High);

public ObservableCollection<CategoryRangePoint> RangeAreaData { get; } = new()
{
    new("Jan", 5, 15),
    new("Feb", 8, 18),
    new("Mar", 12, 25),
    new("Apr", 18, 30),
    new("May", 22, 35),
    new("Jun", 20, 32),
    new("Jul", 15, 28)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series. | `null` |
| `ItemsSource` | The collection of range data points. | `null` |
| `CategoryPath` | Path to the category property on the X-axis. | `null` |
| `HighPath` | Path to the maximum value property. | `null` |
| `LowPath` | Path to the minimum value property. | `null` |
| `Fill` | Brush used to fill the area between points. | Theme-dependent |
| `Stroke` | Brush used for the boundary lines. | Theme-dependent |
| `ShowLines` | Whether to render the upper and lower boundary lines. | `true` |
| `FillOpacity` | Opacity of the filled band between high and low values. | `0.5` |
