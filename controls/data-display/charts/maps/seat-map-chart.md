---
id: seat-map-chart
title: Non-geographic map (seat map)
description: Uses the ShapeMap control with custom GeoJSON for non-geographic layouts such as seating plans, floor plans, or interactive venue arrangements.
doc_type: reference
tags:
  - accelerate
---

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

The ShapeMap control can handle non-geographic coordinate systems, making it perfect for custom layouts like aircraft seating, floor plans, or theater arrangements.

## When to use
- **Seat Reservations**: Interactive seating plans for transportation or venues.
- **Facility Management**: Visualizing data on top of a building floor plan.
- **Interactive UI**: Creating clickable, data-driven custom shape layouts.

## Code example

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

### Data model (C#)
```csharp
public record SeatInfo(string SeatNumber, string Class, bool IsAvailable);

public ObservableCollection<SeatInfo> SeatingData { get; } = new()
{
    new("1A", "Business", true), new("1B", "Business", false),
    new("10C", "Economy", true), new("10D", "Economy", true)
};

public ObservableCollection<SeatInfo> SelectedSeats { get; } = new();
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `GeoJson` | Custom GeoJSON representing the layout. | `null` |
| `RegionPath` | Property used to match data to shapes. | `null` |
| `ValuePath` | Property used to color-code shapes based on state. | `null` |
| `SelectionMode` | `Single`, `Multiple`, or `None`. | `None` |
| `SelectedItems` | Binding to the selected data items. | `null` |
*(Note: Seat map uses custom GeoJSON to render non-geographical shapes)*
