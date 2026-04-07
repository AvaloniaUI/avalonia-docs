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
<controls:HistogramChart Title="Server Response Times" Height="300"
                         ItemsSource="{Binding RawValues}"
                         BinCount="10" />
```

### Data model (C#)
```csharp
// Histograms take a raw collection and group them automatically
public ObservableCollection<double> RawValues { get; } = new()
{
    12.5, 15.0, 12.8, 45.2, 50.1, 14.2, 15.5, 12.1
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of raw data points. | `null` |
| `BinCount` | The number of bars (ranges) to create. | `Auto` |
| `BinWidth` | (Optional) Explicit width for each range. | `null` |
| `Fill` | Brush used for the frequency bars. | Theme-dependent |
| `Gap` | Spacing between the bars. | `0` (Standard) |
