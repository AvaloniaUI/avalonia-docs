---
id: histogram-chart
title: Histogram chart
description: Groups continuous data into bins and shows the frequency of data points within each bin to reveal distribution of a single variable.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsStatisticalHistogram from '/img/controls/charts/charts-statistical-histogram.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Histograms group continuous data into "bins" and show the frequency of data points within each bin. They are essential for understanding the distribution of a single variable.

<Image light={chartsStatisticalHistogram} maxWidth={400} position="center" cornerRadius="true" alt="Histogram chart grouping continuous data into bins showing the frequency distribution of values." />

## When to use
- **Age distribution**: Visualizing how many users fall into specific age ranges.
- **Performance logs**: Analyzing the frequency of response times in a system.
- **Quality assurance**: Evaluating the spread of product dimensions or weights.

## Code example

### XAML
```xml
<controls:CartesianChart Title="Server Response Times" Height="300">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:HistogramSeries ItemsSource="{Binding RawValues}"
                                  ValuePath="ResponseTimeMs"
                                  BinCount="10" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record ResponseTimeSample(double ResponseTimeMs);

public ObservableCollection<ResponseTimeSample> RawValues { get; } = new()
{
    new(12.5), new(15.0), new(12.8), new(45.2),
    new(50.1), new(14.2), new(15.5), new(12.1)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of raw data points. | `null` |
| `ValuePath` | Path to the numeric property to bin. | `null` |
| `BinCount` | The number of bars (ranges) to create. | `10` |
| `BinWidth` | (Optional) Explicit width for each range; overrides BinCount when set. | `null` |
| `Fill` | Brush used for the frequency bars. | Theme-dependent |
| `BarWidth` | Width of each histogram bar as a fraction of the bin width. | `0.9` |
| `BarCornerRadius` | Corner radius for histogram bars. | `CornerRadius(2,2,0,0)` |
