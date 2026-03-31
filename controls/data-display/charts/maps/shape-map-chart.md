---
id: shape-map-chart
title: Shape Map
description: Renders arbitrary geographic or custom shapes from GeoJSON, serving as the base for specialized maps and interactive custom region visualizations.
doc_type: reference
tags:
  - accelerate
---

import chartsMapsShape from '/img/controls/charts/charts-maps-shape.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

The Shape Map control allows for arbitrary geographic or custom shape visualization. It serves as the base for specialized maps, allowing developers to define custom regions and interactions.

<Image light={chartsMapsShape} maxWidth={400} position="center" cornerRadius="true" alt="Shape map rendering custom geographic or schematic regions from GeoJSON with color-coded data overlays." />

## When to Use
- **Custom Regions**: Visualizing regions not covered by standard map sets (e.g., specific postal zones).
- **Physical Layouts**: Mapping data onto a schematic (e.g., a hardware board or factory floor).
- **Interactive Diagrams**: Creating high-performance interactive shape systems.

## Code Example

### XAML
```xml
<controls:ShapeMap Title="Regional Analysis" Height="400">
    <controls:ShapeMap.Layers>
        <controls:ShapeLayer GeoJson="{Binding AreaGeoJson}"
                             ItemsSource="{Binding AreaData}"
                             RegionPath="AreaId" />
    </controls:ShapeMap.Layers>
</controls:ShapeMap>
```

### Data Model (C#)
```csharp
public record AreaInfo(string AreaId, string Status);

public ObservableCollection<AreaInfo> AreaData { get; } = new()
{
    new("A1", "Active"), new("A2", "Maintenance"), new("B1", "Active")
};
```

## Common Properties (ShapeLayer)

| Property | Description | Default |
| :--- | :--- | :--- |
| `GeoJson` | The geometry data for the shapes. | `null` |
| `ItemsSource` | The data items representing the shapes. | `null` |
| `RegionPath` | Key property to match data to Shape IDs. | `null` |
| `Fill` / `Stroke` | Default brushes for the shapes. | Theme-dependent |
