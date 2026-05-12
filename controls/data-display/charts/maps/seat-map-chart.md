---
id: seat-map-chart
title: Non-geographic map (seat map)
description: Uses the ShapeMap control with custom GeoJSON for non-geographic layouts such as seating plans, floor plans, or interactive venue arrangements.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

The ShapeMap control can handle non-geographic coordinate systems, making it perfect for custom layouts like aircraft seating, floor plans, or theater arrangements.

## When to use
- **Seat reservations**: Interactive seating plans for transportation or venues.
- **Facility management**: Visualizing data on top of a building floor plan.
- **Interactive UI**: Creating clickable, data-driven custom shape layouts.

## Code example

### XAML
```xml
<charts:ShapeMap Name="SeatMapSample" Title="Aircraft Seating Layout">
    <charts:ShapeMap.Layers>
        <charts:ShapeLayer GeoJson="{Binding SeatMapGeoJson}"
                             GeoJsonIdPath="id"
                             RegionPath="SeatNumber"
                             ValuePath="Class"
                             ItemsSource="{Binding SeatMapData}"
                             SelectionMode="Multiple"
                             SelectedItems="{Binding SelectedSeats}" />
    </charts:ShapeMap.Layers>
</charts:ShapeMap>
```

### Data model (C#)

Ensure the GeoJSON file is included in your project and available at the specified relative path at runtime.

```csharp
using System.IO;

public record SeatInfo(string SeatNumber, string Class, decimal Price, string Status);

public string SeatMapGeoJson { get; } =
    File.ReadAllText("Resources/seat-map.geojson");

public ObservableCollection<SeatInfo> SeatMapData { get; } = new()
{
    new("1A", "Business", 500m, "Available"),
    new("1B", "Business", 500m, "Available"),
    new("10C", "Economy", 150m, "Available"),
    new("10D", "Economy", 150m, "Available")
};

public ObservableCollection<SeatInfo> SelectedSeats { get; } = new();
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `GeoJson` | Custom GeoJSON representing the layout. | `null` |
| `RegionPath` | Property used to match data to shapes. | `null` |
| `ValuePath` | Property used to color-code shapes based on state. | `null` |
| `SelectionMode` | `None`, `Single`, `SingleDeselect`, or `Multiple`. | `None` |
| `SelectedItems` | Binding to the selected data items. | `null` |
*(Note: Seat map uses custom GeoJSON to render non-geographical shapes)*
