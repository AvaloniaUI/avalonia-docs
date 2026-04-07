---
id: mosaic-chart
title: Mosaic chart
description: Visualizes relationships between two categorical variables by scaling both the width and height of segments to represent their proportions of the total.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsAnalyticsMosaic from '/img/controls/charts/charts-analytics-mosaic.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Mosaic charts (Marimekko) visualize relationships between categories using area. Both the width and height of segments are scaled to represent percentages of the total.

<Image light={chartsAnalyticsMosaic} maxWidth={400} position="center" cornerRadius="true" alt="Mosaic chart with rectangular tiles scaled by both width and height to show proportions across two categorical variables." />

## When to use
- **Market segmentation**: Showing sales by region (width) and by product category (height).
- **Resource expenditure**: Visualizing budget allocation across departments and cost types.
- **Multi-factor analysis**: Understanding how two different qualitative variables interact.

## Code example

### XAML
```xml
<controls:MosaicChart Title="Sales by Region" Height="300"
                      ItemsSource="{Binding MosaicData}"
                      GroupPath="Region"
                      SubGroupPath="Category"
                      ValuePath="Sales" />
```

### Data model (C#)
```csharp
public record MarketSegment(string Region, string Category, double Sales);

public ObservableCollection<MarketSegment> MosaicData { get; } = new()
{
    new("North", "Electronics", 450), new("North", "Books", 120),
    new("South", "Electronics", 310), new("South", "Books", 85),
    new("East", "Electronics", 280), new("East", "Books", 110)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of data segments. | `null` |
| `GroupPath` | Primary category (determines width). | `null` |
| `SubGroupPath` | Secondary category (determines height). | `null` |
| `ValuePath` | Numerical value for scaling. | `null` |
| `Gap` | Spacing between the tiles. | `2` |
