---
id: circular-gauge-chart
title: Circular gauge chart
description: Visualizes a single value on a radial scale in a speedometer-style layout, suitable for real-time monitoring and goal tracking dashboards.
doc_type: reference
tags:
  - accelerate
---

import chartsGaugesCircular from '/img/controls/charts/charts-gauges-circular.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
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
<controls:CircularGaugeChart Value="{Binding CpuUsage}" Width="220" Height="220" Title="CPU" Margin="10" />
```

### Data model (C#)
```csharp
// Gauges typically bind to a single numeric property
public double CpuUsage { get; set; } = 72;
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The current value to display. | `0` |
| `MinValue` / `MaxValue`| The range of the scale. | `0` to `100` |
| `Title` | Label displayed in the center/bottom. | `null` |
| `Stroke` | Color of the gauge needle or arc. | Theme-dependent |
