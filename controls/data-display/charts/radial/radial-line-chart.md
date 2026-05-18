---
id: radial-line-chart
title: Radial line chart
description: Plots data points on a polar coordinate system connected by lines, suitable for showing how a variable fluctuates across cyclical or directional categories.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Radial line charts plot data points on a `PolarChart` and connect them with lines, as defined by a `PolarLineSeries`. They are ideal for showing how a single variable fluctuates across cyclical categories.

## When to use
- **Daily activity**: Mapping heart rate or energy levels across 24 hours.
- **Directional data**: Visualizing readings from a 360-degree sensor.
- **Symmetry analysis**: Checking for patterns and balance in multi-variate profiles.

## Code example

### XAML
```xml
<PolarChart xmlns="https://github.com/avaloniaui" Title="Hourly Activity" Height="350">
    <PolarChart.Series>
        <PolarLineSeries ItemsSource="{Binding RadialPoints}"
                                  AnglePath="Angle"
                                  RadiusPath="Radius"
                                  ShowMarkers="True" />
    </PolarChart.Series>
</PolarChart>
```

### Data model (C#)
```csharp
public record ActivityPoint(double Angle, double Radius);

public ObservableCollection<ActivityPoint> RadialPoints { get; } = new()
{
    new(0, 10),
    new(60, 25),
    new(120, 45),
    new(180, 30),
    new(240, 60),
    new(300, 15)
};
```

## Common properties: `PolarLineSeries`

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of points to connect. | `null` |
| `AnglePath` | Path of the angle (X). | `null` |
| `RadiusPath` | Path of the radius (Y). | `null` |
| `ShowMarkers` | Whether to show markers at each data point. | `false` |
| `MarkerSize` | Size of the markers. | `8.0` |
| `IsClosed` | Whether the first and last data points are connected. | `false` |
