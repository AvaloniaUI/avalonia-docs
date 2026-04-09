---
id: bubble-map-chart
title: Bubble map
description: Overlays proportionally-sized circles on geographic regions to represent data values, showing both location and value magnitude simultaneously.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsMapsBubble from '/img/controls/charts/charts-maps-bubble.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Bubble maps use circles of different sizes to represent data values over geographic regions, using `ShapeMap` as a basis to display a `ShapeLayer` with a superimposed `BubbleLayer`. They are effective for showing both locality and value magnitude simultaneously.

<Image light={chartsMapsBubble} maxWidth={400} position="center" cornerRadius="true" alt="Bubble map overlaying circles of varying sizes on geographic regions to represent city activity levels." />

## When to use
- **Event distribution**: Mapping the location and scale of occurrences (e.g., earthquakes, sales events).
- **Urban statistics**: Comparing populations or activity levels across specific cities.
- **Global indicators**: Visualizing country-level data where the size of the bubble represents the value.

## Code example

### XAML
```xml
<chartsEnterprise:ShapeMap Title="City Activity" Height="400">
    <chartsEnterprise:ShapeMap.Layers>
        <charts:ShapeLayer GeoJson="{Binding MapGeoJson}" />
        <charts:BubbleLayer ItemsSource="{Binding CityData}"
                            LatitudePath="Lat"
                            LongitudePath="Lon"
                            SizePath="ActivityLevel"
                            LabelPath="City" />
    </chartsEnterprise:ShapeMap.Layers>
</chartsEnterprise:ShapeMap>
```

### Data model (C#)
```csharp
public record CityMetric(double Lat, double Lon, double ActivityLevel, string City);

public ObservableCollection<CityMetric> CityData { get; } = new()
{
    new(-74.006, 40.7128, 1500, "New York"),
    new(-0.1278, 51.5074, 1200, "London"),
    new(139.6503, 35.6762, 1800, "Tokyo"),
    new(2.3522, 48.8566, 950, "Paris")
};
```

## Common properties: `ShapeLayer`

| Property | Description | Default |
| :--- | :--- | :--- |
| `GeoJson` | GeoJSON data. | `null` |
| `Source` | URI for the source of the GeoJSON data. | `null` |
| `GeoJsonIdPath` | Unique ID of the GeoJSON data. | `null` |
| `ItemsSource` | Data collection containing map regions. | `null` |
| `RegionPath` | Property linking data to GeoJSON coordinates. | `null` |
| `ValuePath` | Property linking data to region values. | `null` |
| `MinValue` | Minimum value for color normalization. | 0.0 |
| `MaxValue` | Maximum value for color normalization. | 100.0 |
| `LowBrush` | Color representing the lowest data value. | `#E3F2FD` |
| `HighBrush` | Color representing the highest data value. | `#1565C0` |
| `Stroke` | Color of region outlines. | `null` |
| `StrokeThickness` | Thickness of region outlines. | 0.5 |
| `ShowLabels` | Whether to display labels on regions. | `false` |
| `LabelPath` | Path of the label text. | `null` |
| `LabelForeground` | Brush used for region labels. | `null` |
| `SelectionMode` | Selection mode for selecting regions. Use `None`, `Single`, `SingleDeselect`, or `Multiple`. | `None` |
| `SelectionBrush` | Color of selected regions. | `#FFC107` |
| `SelectionStroke` | Color of the outline of selected regions. | `null` |
| `SelectionStrokeThickness` | Thickness of the outline of selected regions. | 2.0 |
| `SelectedItem` | The currently selected region. | `null` |
| `HoverBrush` | Brush used when a region is hovered. | `White` at 30% opacity |

## Common properties: `BubbleLayer`

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Data source for bubbles. | `null` |
| `Latitude` | Latitude coordinates of bubbles. | `null` |
| `Longitude` | Longitude coordinates of bubbles. | `null` |
| `SizePath` | Size of bubbles. | `null` |
| `ShowLabels` | Whether to display labels over bubbles. | `null` |
| `LabelPath` | Content of labels. | `null` |
| `MinBubbleSize` | Minimum bubble radius. | 8.0 |
| `MaxBubbleSize` | Maximum bubble radius. | 40.0 |
| `Fill` | Color of bubbles. | `null` |
| `Stroke` | Color of bubble outlines. | `null` |
