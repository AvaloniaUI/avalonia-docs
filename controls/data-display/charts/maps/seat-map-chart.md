---
id: seat-map-chart
title: Non-Geographic Map (Seat Map)
description: Uses the ShapeMap control with custom GeoJSON for non-geographic layouts such as seating plans, floor plans, or interactive venue arrangements.
doc_type: reference
tags:
  - accelerate
---

import chartsMapsGeo from '/img/controls/charts/charts-maps-geo.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

The ShapeMap control can handle non-geographic coordinate systems, making it perfect for custom layouts like aircraft seating, floor plans, or theater arrangements.

<Image light={chartsMapsGeo} maxWidth={400} position="center" cornerRadius="true" alt="Seat map chart showing an aircraft cabin layout with color-coded seats indicating availability by class." />

## When to Use
- **Seat Reservations**: Interactive seating plans for transportation or venues.
- **Facility Management**: Visualizing data on top of a building floor plan.
- **Interactive UI**: Creating clickable, data-driven custom shape layouts.

## Code Example

### XAML
```xml
<controls:ShapeMap Name="SeatMapSample" Title="Aircraft Seating Layout">
    <controls:ShapeMap.Layers>
        <controls:ShapeLayer GeoJson="{Binding SeatMapGeoJson}"
                             RegionPath="SeatNumber"
                             ValuePath="Class"
                             DataSource="{Binding SeatingData}"
                             SelectionMode="Multiple"
                             SelectedItems="{Binding SelectedSeats}" />
    </controls:ShapeMap.Layers>
</controls:ShapeMap>
```

### Data Model (C#)
```csharp
public record SeatInfo(string SeatNumber, string Class, bool IsAvailable);

public ObservableCollection<SeatInfo> SeatingData { get; } = new()
{
    new("1A", "Business", true), new("1B", "Business", false),
    new("10C", "Economy", true), new("10D", "Economy", true)
};

public ObservableCollection<SeatInfo> SelectedSeats { get; } = new();
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `GeoJson` | Custom GeoJSON representing the layout. | `null` |
| `RegionPath` | Property used to match data to shapes. | `null` |
| `ValuePath` | Property used to color-code shapes based on state. | `null` |
| `SelectionMode` | `Single`, `Multiple`, or `None`. | `None` |
| `SelectedItems` | Binding to the selected data items. | `null` |
*(Note: Seat map uses custom GeoJSON to render non-geographical shapes)*
