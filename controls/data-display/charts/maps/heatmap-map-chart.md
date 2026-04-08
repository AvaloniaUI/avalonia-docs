---
id: heatmap-map-chart
title: Heatmap map
description: Visualizes data density across geographic coordinates using a color gradient, ideal for showing activity hot spots and concentration areas on a map.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsMapsHeatmap from '/img/controls/charts/charts-maps-gradient.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Heatmap maps visualize data density across geographic coordinates using a `ShapeMap` with a `HeatmapLayer`. They are the ideal choice for showing "hot spots" where activity is concentrated.

<Image light={chartsMapsHeatmap} maxWidth={400} position="center" cornerRadius="true" alt="Geographic heatmap using a color gradient to show data density hot spots and concentration areas across regions." />

## When to use
- **User activity**: Visualizing where mobile app users are most active geographically.
- **Incident reporting**: Mapping hotspots for crimes, traffic accidents, or outages.
- **Environmental density**: Showing concentrations of species or pollution.

## Code example

### XAML
```xml
<controls:ShapeMap Title="Population Density Hotspots" Height="400">
    <controls:ShapeMap.Layers>
        <controls:ShapeLayer GeoJson="{Binding WorldGeoJson}"
                             LowBrush="#F5F5F5"
                             HighBrush="#F5F5F5"
                             Stroke="#E0E0E0"
                             StrokeThickness="0.3" />
        <controls:HeatmapLayer ItemsSource="{Binding IntensityData}"
                               LatitudePath="Lat"
                               LongitudePath="Lon"
                               IntensityPath="Magnitude"
                               Radius="50"
                               MaxIntensity="100"
                               LowBrush="#4000FF00"
                               MediumBrush="#CCFFFF00"
                               HighBrush="#FFFF0000" />
    </controls:ShapeMap.Layers>
</controls:ShapeMap>
```

### Data model (C#)
```csharp
public record SpotIntensity(double Lat, double Lon, double Magnitude);

public ObservableCollection<SpotIntensity> IntensityData { get; } = new()
{
    new(40.41, -3.70, 95),
    new(48.85, 2.35, 45),
    new(51.50, -0.12, 78),
    new(52.52, 13.40, 12)
};
```

## Common properties (`HeatmapLayer`)

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of geographic points to render. | `null` |
| `LatitudePath` | Property name for latitude values. | `Latitude` |
| `LongitudePath` | Property name for longitude values. | `Longitude` |
| `IntensityPath` | Property name for the intensity value. | `Intensity` |
| `Radius` | Base radius of each heat spot in pixels. | `40.0` |
| `MaxIntensity` | Maximum intensity used for normalization. | `100.0` |
| `LowBrush` | Brush used for low intensity values. | `#0000FF00` |
| `MediumBrush` | Brush used for medium intensity values. | `#FFFF00` |
| `HighBrush` | Brush used for high intensity values. | `#FF0000` |
