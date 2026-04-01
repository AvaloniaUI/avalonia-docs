---
id: bubble-map-chart
title: Bubble map
description: Overlays proportionally-sized circles on geographic regions to represent data values, showing both location and value magnitude simultaneously.
doc_type: reference
tags:
  - accelerate
---

import chartsMapsBubble from '/img/controls/charts/charts-maps-bubble.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Bubble maps use circles of different sizes to represent data values over geographic regions. They are effective for showing both locality and value magnitude simultaneously.

<Image light={chartsMapsBubble} maxWidth={400} position="center" cornerRadius="true" alt="Bubble map overlaying circles of varying sizes on geographic regions to represent city activity levels." />

## When to use
- **Event distribution**: Mapping the location and scale of occurrences (e.g., earthquakes, sales events).
- **Urban statistics**: Comparing populations or activity levels across specific cities.
- **Global indicators**: Visualizing country-level data where the size of the bubble represents the value.

## Code example

### XAML
```xml
<controls:BubbleMap Name="BubbleMapSample" Title="City Activity" Height="400"
                    GeoJson="{Binding MapGeoJson}"
                    RegionPath="CityID"
                    ValuePath="ActivityLevel"
                    ItemsSource="{Binding CityData}" />
```

### Data model (C#)
```csharp
public record CityMetric(string CityID, double ActivityLevel);

public ObservableCollection<CityMetric> CityData { get; } = new()
{
    new("NYC", 1500),
    new("LDN", 1200),
    new("TKY", 1800),
    new("PAR", 950)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `GeoJson` | The base map geometry. | `null` |
| `RegionPath` | Property linking data to map coordinates. | `null` |
| `ValuePath` | Numerical property determining bubble size. | `null` |
| `MinSize` / `MaxSize` | Diameter range for the bubbles in pixels. | `5` to `30` |
| `Fill` | Color used for the bubbles. | Semi-transparent |
