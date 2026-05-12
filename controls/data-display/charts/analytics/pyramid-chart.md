---
id: pyramid-chart
title: Pyramid chart
description: Emphasizes both hierarchy and volume in a stacked triangular layout, commonly used for population and pipeline visualization.
doc-type: reference
tags:
  - avalonia pro
---

import chartsAnalyticsPyramid from '/img/controls/charts/charts-analytics-pyramid.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Pyramid charts are a type of stacked area or bar graph that emphasizes both hierarchy and volume. They are the classic choice for population and sales pipeline visualization.

<Image light={chartsAnalyticsPyramid} maxWidth={400} position="center" cornerRadius="true" alt="Pyramid chart with stacked triangular segments representing hierarchical population or pipeline data." />

## When to use
- **Population pyramids**: Showing age and gender distribution in a region.
- **Sales pipelines**: Visualizing the funnel from leads to closed deals.
- **Biological hierarchies**: Showing energy flow or species distribution in an ecosystem.

## Code example

### XAML
```xml
<charts:PyramidChart Title="Population Distribution" Height="300"
                       ItemsSource="{Binding PyramidData}"
                       LabelPath="Age" ValuePath="Value"/>
```

### Data model (C#)
```csharp
public record PyramidItem(string Age, double Value);

public ObservableCollection<PyramidItem> PyramidData { get; } = new()
{
    new("0-14", 15),
    new("15-24", 12),
    new("25-54", 40),
    new("55-64", 18),
    new("65+", 15)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of data layers. | `null` |
| `ValuePath` | Magnitude of each layer. | `null` |
| `LabelPath` | Text description for each layer. | `null` |
| `SegmentGap` | Vertical distance between levels. | `2.0` |
| `ShowLabels` | Whether to display labels on segments. | `true` |
| `ShowValues` | Whether to display numeric values on the chart. | `true` |
| `IsHighlightEnabled` | Enables hover highlighting for pyramid segments. | `false` |
