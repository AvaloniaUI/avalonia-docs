---
id: radial-line-chart
title: Radial line chart
description: Plots data points on a polar coordinate system connected by lines, suitable for showing how a variable fluctuates across cyclical or directional categories.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Radial line charts plot data points on a polar coordinate system and connect them with lines. They are ideal for showing how a single variable fluctuates across cyclical categories.

## When to use
- **Daily activity**: Mapping heart rate or energy levels across 24 hours.
- **Directional data**: Visualizing readings from a 360-degree sensor.
- **Symmetry analysis**: Checking for patterns and balance in multi-variate profiles.

## Code example

### XAML
```xml
<controls:RadialLineChart Title="Hourly Activity" Height="350"
                          ItemsSource="{Binding RadialPoints}"
                          ValuePath="Intensity" />
```

### Data model (C#)
```csharp
public record ActivityPoint(double Intensity);

public ObservableCollection<ActivityPoint> RadialPoints { get; } = new()
{
    new(10), new(25), new(45), new(30), new(60), new(15)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of points to connect. | `null` |
| `ValuePath` | Property determining the distance from center. | `null` |
| `Stroke` | Color of the connecting line. | Theme-dependent |
| `StrokeThickness`| Width of the line. | `2` |
| `Fill` | (Optional) Fill color for the inner area. | `Transparent` |
