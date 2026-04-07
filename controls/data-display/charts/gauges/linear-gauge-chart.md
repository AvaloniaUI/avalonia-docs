---
id: linear-gauge-chart
title: Linear gauge chart
description: Visualizes a value along a horizontal or vertical bar for comparing metrics or showing progress.
doc_type: reference
tags:
  - accelerate
---

import chartsGaugesLinear from '/img/controls/charts/charts-gauges-linear-1.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Linear gauge charts visualize a value along a horizontal or vertical bar. They are excellent for comparing metrics side-by-side or showing progress in a linear, space-efficient format.

<Image light={chartsGaugesLinear} maxWidth={400} position="center" cornerRadius="true" alt="Linear gauge chart with a horizontal progress bar and scale ticks showing the current value along a numeric range." />

## When to use
- **Performance bars**: Comparing multiple metrics in a condensed dashboard.
- **Volume indicators**: Showing storage levels, audio levels, or tank capacity.
- **Progress tracking**: Visualizing a sequence of targets in a straight line.

## Code example

### XAML
```xml
<controls:LinearGaugeChart Value="{Binding ProgressValue}"
                           Title="Download Progress"
                           Height="60"
                           ShowScale="True" />
```

### Data model (C#)
```csharp
// Simple numeric binding
public double ProgressValue { get; set; } = 65.5;
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The current value to display. | 50.0 |
| `MinValue` | Minimum value of the scale. | 0.0 |
| `MaxValue` | Maximum value of the scale. | 100.0 |
| `Orientation` | Orientation of the gauge, `Horizontal` or `Vertical`. | `Horizontal` |
| `ShowScale`| Whether to display the scale. | `true` |
| `TrackBrush` | Color of the track. | Uses theme default. |
| `IndicatorBrush` | Color of the indicator. | Uses theme default. |
| `ValueBrush` | Color of the value. | Uses theme default. |
| `TrackThickness` | Thickness of the track. | 20.0 |
| `ShowMajorTicks` | Whether to display major ticks. | `false` |
| `ShowMinorTicks` | Whether to display minor ticks. | `false` |
| `MajorTickInterval` | Interval between major ticks. | 20.0 |
| `MinorTickCount` | Number of minor ticks between two major ticks. | 4 |
