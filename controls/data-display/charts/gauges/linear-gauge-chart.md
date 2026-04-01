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
- **Performance Bars**: Comparing multiple metrics in a condensed dashboard.
- **Volume Indicators**: Showing storage levels, audio levels, or tank capacity.
- **Progress Tracking**: Visualizing a sequence of targets in a straight line.

## Code example

### XAML
```xml
<controls:LinearGaugeChart Value="{Binding ProgressValue}" Title="Download Progress" Height="60" ScaleVisibility="Visible" />
```

### Data model (C#)
```csharp
// Simple numeric binding
public double ProgressValue { get; set; } = 65.5;
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The numeric value to represent. | `0` |
| `Orientation` | `Horizontal` or `Vertical`. | `Horizontal` |
| `ScaleVisibility`| Toggles the numeric scale/ticks. | `Hidden` |
| `Fill` | Brush used for the progress bar. | Theme-dependent |
