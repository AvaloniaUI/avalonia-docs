---
id: radial-line-chart
title: Radial Line Chart
description: Plots data points on a polar coordinate system connected by lines, suitable for showing how a variable fluctuates across cyclical or directional categories.
doc_type: reference
tags:
  - accelerate
---

import chartsRadialLine from '/img/controls/charts/charts-radial-line.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Radial line charts plot data points on a polar coordinate system and connect them with lines. They are ideal for showing how a single variable fluctuates across cyclical categories.

<Image light={chartsRadialLine} maxWidth={400} position="center" cornerRadius="true" alt="Radial line chart with data points plotted on a polar axis and connected by a line radiating from the center." />

## When to Use
- **Daily Activity**: Mapping heart rate or energy levels across 24 hours.
- **Directional Data**: Visualizing readings from a 360-degree sensor.
- **Symmetry Analysis**: Checking for patterns and balance in multi-variate profiles.

## Code Example

### XAML
```xml
<controls:RadialLineChart Title="Hourly Activity" Height="350"
                          ItemsSource="{Binding RadialPoints}"
                          ValuePath="Intensity" />
```

### Data Model (C#)
```csharp
public record ActivityPoint(double Intensity);

public ObservableCollection<ActivityPoint> RadialPoints { get; } = new()
{
    new(10), new(25), new(45), new(30), new(60), new(15)
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of points to connect. | `null` |
| `ValuePath` | Property determining the distance from center. | `null` |
| `Stroke` | Color of the connecting line. | Theme-dependent |
| `StrokeThickness`| Width of the line. | `2` |
| `Fill` | (Optional) Fill color for the inner area. | `Transparent` |
