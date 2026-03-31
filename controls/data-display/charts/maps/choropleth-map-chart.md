---
id: choropleth-map-chart
title: Choropleth Map
description: Shades geographic regions in proportion to a statistical variable, used to visualize data density, demographics, or market performance across territories.
doc_type: reference
tags:
  - accelerate
---

import chartsMapsChoropleth from '/img/controls/charts/charts-maps-choropleth.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Choropleth maps shade geographical areas in proportion to a statistical variable. They are excellent for visualizing data density or trends across discrete regions.

<Image light={chartsMapsChoropleth} maxWidth={400} position="center" cornerRadius="true" alt="Choropleth map shading geographic regions in varying color intensities to represent population density." />

## When to Use
- **Demographics**: Showing population density, income levels, or voting patterns.
- **Market Penetration**: Visualizing sales performance across different territories.
- **Environmental Data**: Showing climate data or resource distribution by region.

## Code Example

### XAML
```xml
<controls:ChoroplethMap Name="ChoroplethSample" Title="Population Density" Height="400"
                        GeoJson="{Binding WorldGeoJson}"
                        RegionPath="Code"
                        ValuePath="Density"
                        LowBrush="#E3F2FD"
                        HighBrush="#1565C0"
                        ItemsSource="{Binding MapPoints}" />
```

### Data Model (C#)
```csharp
public record MapDataPoint(string Code, double Density);

public ObservableCollection<MapDataPoint> MapPoints { get; } = new()
{
    new("US", 35.7),
    new("CA", 4.2),
    new("MX", 66.3),
    new("BR", 25.0),
    new("AR", 16.5)
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `GeoJson` | The GeoJSON geometry source. | `null` |
| `RegionPath` | Linking property name in the `ItemsSource`. | `null` |
| `ValuePath` | Numerical property name for color intensity. | `null` |
| `MinValue` / `MaxValue`| Explicit range for normalization. | Auto-calculated |
| `LowBrush` / `HighBrush` | Gradient colors for the data range. | Theme-dependent |
