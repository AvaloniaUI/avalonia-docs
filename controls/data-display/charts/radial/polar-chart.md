---
id: polar-chart
title: Polar chart
description: Plots arbitrary angle and radius values in a polar coordinate system, useful for spirals, rose curves, and directional data.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

`PolarChart` hosts one or more `PolarLineSeries` and maps each point using an angle and a radius rather than Cartesian axes.

## When to use

- **Mathematical curves**: Draw spirals, rose curves, cardioids, and similar functions.
- **Directional measurements**: Plot values around a full angular range.
- **Radial analysis**: Use free-form angles when fixed radar spokes are too restrictive.

## Code example

### XAML

```xml
<PolarChart xmlns="https://github.com/avaloniaui" Title="Archimedean spiral" Height="300">
    <PolarChart.Series>
        <PolarLineSeries ItemsSource="{Binding SpiralData}"
                                  AnglePath="Angle"
                                  RadiusPath="Radius"
                                  StrokeThickness="2" />
    </PolarChart.Series>
</PolarChart>
```

### Data model (C#)

```csharp
public record PolarPoint(double Angle, double Radius);

public ObservableCollection<PolarPoint> SpiralData { get; } = new()
{
    new(0, 0),
    new(45, 10),
    new(90, 20),
    new(135, 30)
};
```

## Common properties (`PolarChart`)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Series` | Content collection of `PolarLineSeries` items. | Empty collection |
| `ShowGridLines` | Whether to draw angular and radial grid lines. | `true` |
| `GridLineBrush` | Brush used for the grid. | `null` |
| `GridLineStrokeThickness` | Thickness of the grid lines. | `1.0` |
| `RadiusAxisMin` | Minimum value of the radius axis. | `0.0` |
| `RadiusAxisMax` | Maximum value of the radius axis. When `NaN`, the chart computes it from the data. | `NaN` |
| `StartAngle` | Visual start angle in degrees. | `-90.0` |
| `IsHighlightEnabled` | Enables chart-level hover highlighting for polar points. | `false` |

## Common properties (`PolarLineSeries`)

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of polar data points. | `null` |
| `AnglePath` | Path to the angle value in degrees. | `null` |
| `RadiusPath` | Path to the radius value. | `null` |
| `ShowMarkers` | Whether to draw markers at each point. | `false` |
| `MarkerSize` | Marker size in pixels. | `8.0` |
| `IsClosed` | Whether to connect the last point back to the first point. | `false` |

## See also

- [Radar chart](/controls/data-display/charts/radial/radar-chart)
- [Radial line chart](/controls/data-display/charts/radial/radial-line-chart)
