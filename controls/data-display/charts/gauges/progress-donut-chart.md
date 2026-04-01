---
id: progress-donut-chart
title: Progress donut chart
description: Donut chart variant for showing progress toward a single 100% goal, used in dashboards and fitness apps.
doc_type: reference
tags:
  - accelerate
---

import chartsGaugesProgressDonut from '/img/controls/charts/charts-pie-progressdonut.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Progress donut charts are a specialized variation of donut charts designed to show progress toward a single 100% goal. They are often used in fitness apps or system dashboards.

<Image light={chartsGaugesProgressDonut} maxWidth={400} position="center" cornerRadius="true" alt="Progress donut chart showing a circular arc filling proportionally to represent completion toward a 100% goal." />

## When to use
- **Goal Completion**: Showing how close a user is to a target.
- **Metric Summaries**: Visualizing percentage-based data (e.g., Disk Space used).
- **KPI Dashboards**: Providing a quick visual check for key performance indicators.

## Code example

### XAML
```xml
<controls:ProgressDonutChart Value="{Binding CompletedPercent}"
                             Width="150" Height="150"
                             StrokeThickness="10"
                             Stroke="Blue" />
```

### Data model (C#)
```csharp
// Simple numeric binding
public double CompletedPercent { get; set; } = 85.0;
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The percentage (0 to 100) to display. | `0` |
| `Stroke` | Color of the progress arc. | Theme-dependent |
| `BackgroundStroke`| Color of the empty part of the ring. | `LightGray` |
| `StrokeThickness`| Width of the ring. | `8` |
