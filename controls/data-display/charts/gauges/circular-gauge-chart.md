---
id: circular-gauge-chart
title: Circular gauge chart
description: Visualizes a single value on a radial scale in a speedometer-style layout, suitable for real-time monitoring and goal tracking dashboards.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsGaugesCircular from '/img/controls/charts/charts-gauges-circular.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Circular gauge charts visualize a single value on a radial scale. They are the standard for high-level dashboard metrics where a "speedometer" style visual is intuitive.

<Image light={chartsGaugesCircular} maxWidth={400} position="center" cornerRadius="true" alt="Circular gauge chart in a speedometer style with a needle pointing to the current value on a radial scale." />

## When to use
- **Real-time monitoring**: Showing CPU, memory, or network usage.
- **Goal tracking**: Visualizing progress toward a target (e.g., sales quota).
- **Physical simulation**: Representing values from physical sensors like speed or pressure.

## Code example

### XAML
```xml
<controls:CircularGaugeChart Value="{Binding CpuUsage}"
                             Width="220"
                             Height="220"
                             Title="CPU"
                             NeedleBrush="#F44336"
                             TrackBrush="#D0D0D0"
                             ShowValue="True" />
```

### Data model (C#)
```csharp
// Gauges typically bind to a single numeric property
public double CpuUsage { get; set; } = 72;
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The current value to display. | 0.0 |
| `MinValue` | Minimum value of the scale. | 0.0 |
| `MaxValue` | Maximum value of the scale. | 100.0 |
| `ShowValue` | Whether to display the numeric value. | `true` |
| `StartAngle` | The starting angle of the gauge arc, in degrees. | 135.0 |
| `SweepAngle` | The sweep angle of the gauge arc, in degrees. | 270.0 |
| `TrackBrush` | Brush used for the gauge track. | `#E0E0E0` |
| `NeedleBrush` | Brush used for the needle or value arc. | `#F44336` |
| `TrackThickness` | Thickness of the track arc. | 10.0 |
| `MajorTickCount` | The number of major tick marks. | 5 |
