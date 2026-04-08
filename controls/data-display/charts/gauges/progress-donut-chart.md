---
id: progress-donut-chart
title: Progress donut chart
description: Donut chart variant for showing progress toward a single 100% goal, used in dashboards and fitness apps.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsGaugesProgressDonut from '/img/controls/charts/charts-pie-progressdonut.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Progress donut charts are a specialized variation of donut charts designed to show progress toward a single 100% goal. They are often used in fitness apps or system dashboards.

<Image light={chartsGaugesProgressDonut} maxWidth={400} position="center" cornerRadius="true" alt="Progress donut chart showing a circular arc filling proportionally to represent completion toward a 100% goal." />

## When to use
- **Goal completion**: Showing how close a user is to a target.
- **Metric summaries**: Visualizing percentage-based data (e.g., Disk Space used).
- **KPI dashboards**: Providing a quick visual check for key performance indicators.

## Code example

### XAML
```xml
<controls:ProgressDonutChart Value="{Binding CompletedPercent}"
                             Width="150" Height="150"
                             RingThickness="10"
                             ValueBrush="Blue" />
```

### Data model (C#)
```csharp
// Simple numeric binding
public double CompletedPercent { get; set; } = 85.0;
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The current value (0 to MaxValue). | `0` |
| `MaxValue` | The maximum value. | `100.0` |
| `ValueBrush` | Brush for the progress arc. | Theme-dependent |
| `TrackBrush` | Brush for the empty part of the ring. | Theme-dependent |
| `RingThickness` | Width of the ring. | `20.0` |
| `StartAngle` | Start angle in degrees (-90 = top). | `-90.0` |
| `ShowPercentage` | Whether to show percentage in center. | `true` |
| `CenterLabel` | Custom center label (overrides percentage). | `null` |
