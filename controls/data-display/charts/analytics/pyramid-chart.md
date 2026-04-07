---
id: pyramid-chart
title: Pyramid chart
description: Emphasizes both hierarchy and volume in a stacked triangular layout, commonly used for population and pipeline visualization.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsAnalyticsPyramid from '/img/controls/charts/charts-analytics-pyramid.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
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
<controls:PyramidChart Title="Population Distribution" Height="300"
                       ItemsSource="{Binding PyramidData}"
                       LabelPath="Age" ValuePath="Value"/>
```

### Data model (C#)
```csharp
public record PyramidLevel(string Age, double Value);

public ObservableCollection<PyramidLevel> PyramidData { get; } = new()
{
    new("0-14", 2500),
    new("15-64", 5800),
    new("65+", 1200)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of data layers. | `null` |
| `ValuePath` | Magnitude of each layer. | `null` |
| `LabelPath` | Text description for each layer. | `null` |
| `Gap` | Vertical distance between levels. | `5` |
