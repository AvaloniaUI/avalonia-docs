---
id: heatmap-map-chart
title: Heatmap Map
description: Visualizes data density across geographic coordinates using a color gradient, ideal for showing activity hot spots and concentration areas on a map.
doc_type: reference
tags:
  - accelerate
---

import chartsMapsHeatmap from '/img/controls/charts/charts-maps-heatmap.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Heatmap maps (Heat maps) visualize data density across geographic coordinates using a color gradient. They are the ideal choice for showing "hot spots" where activity is concentrated.

<Image light={chartsMapsHeatmap} maxWidth={400} position="center" cornerRadius="true" alt="Geographic heatmap using a color gradient to show data density hot spots and concentration areas across regions." />

## When to Use
- **User Activity**: Visualizing where mobile app users are most active geographically.
- **Incident Reporting**: Mapping hotspots for crimes, traffic accidents, or outages.
- **Environmental Density**: Showing concentrations of species or pollution.

## Code Example

### XAML
```xml
<controls:HeatmapMap Name="GeoHeatmap" Title="Population Density Hotspots" Height="400"
                     GeoJson="{Binding MapBase}"
                     RegionPath="LocCode"
                     ValuePath="Intensity"
                     ItemsSource="{Binding IntensityData}" />
```

### Data Model (C#)
```csharp
public record SpotIntensity(string LocCode, double Intensity);

public ObservableCollection<SpotIntensity> IntensityData { get; } = new()
{
    new("Z1", 95), new("Z2", 45), new("Z3", 78), new("Z4", 12)
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `GeoJson` | Base geography for context. | `null` |
| `ValuePath` | The property representing intensity. | `null` |
| `LowColor` / `HighColor` | Gradient bounds for the heatmap. | `Blue` to `Red` |
| `Blur` | Controls the smoothness of the heat spots. | `15` |
| `Radius` | The effective size of each data point's "heat". | `20` |
