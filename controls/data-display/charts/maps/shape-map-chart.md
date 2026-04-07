---
id: shape-map-chart
title: Shape map
description: Renders arbitrary geographic or custom shapes from GeoJSON, serving as the base for specialized maps and interactive custom region visualizations.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

The Shape Map control allows for arbitrary geographic or custom shape visualization. It serves as the base for specialized maps, allowing developers to define custom regions and interactions.

## When to use
- **Custom regions**: Visualizing regions not covered by standard map sets (e.g., specific postal zones).
- **Physical layouts**: Mapping data onto a schematic (e.g., a hardware board or factory floor).
- **Interactive diagrams**: Creating high-performance interactive shape systems.

## Code example

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

### Data model (C#)
```csharp
public record AreaInfo(string AreaId, string Status);

public ObservableCollection<AreaInfo> AreaData { get; } = new()
{
    new("A1", "Active"), new("A2", "Maintenance"), new("B1", "Active")
};
```

## Common properties (ShapeLayer)

| Property | Description | Default |
| :--- | :--- | :--- |
| `GeoJson` | The geometry data for the shapes. | `null` |
| `ItemsSource` | The data items representing the shapes. | `null` |
| `RegionPath` | Key property to match data to Shape IDs. | `null` |
| `Fill` / `Stroke` | Default brushes for the shapes. | Theme-dependent |
