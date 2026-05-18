---
id: bullet-chart
title: Bullet chart
description: Shows a single performance measure against a target and qualitative ranges in a compact horizontal or vertical gauge.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Bullet charts compare a primary value to a target and one or more qualitative ranges in a compact layout.

## When to use

- **Target tracking**: Compare an actual value to a goal in a dashboard card.
- **Compact summaries**: Replace a full bar chart when you only need one measure and a target.
- **Threshold ranges**: Show poor, satisfactory, and good bands behind the main value.

## Code example

### XAML

```xml
<BulletChart xmlns="https://github.com/avaloniaui" Title="Revenue attainment"
                      Width="320"
                      Height="80"
                      Value="{Binding ActualRevenue}"
                      Target="{Binding RevenueTarget}"
                      Ranges="{Binding RevenueBands}" />
```

### Data model (C#)

```csharp
public double ActualRevenue { get; set; } = 72;
public double RevenueTarget { get; set; } = 85;
public double[] RevenueBands { get; } = [30, 60, 90, 100];
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | Primary value displayed by the bar. | `75.0` |
| `Target` | Target marker value. | `85.0` |
| `MinValue` | Minimum value of the scale. | `0.0` |
| `MaxValue` | Maximum value of the scale. | `100.0` |
| `Ranges` | Optional collection of qualitative range boundaries. | `null` |
| `Orientation` | Orientation of the chart, `Horizontal` or `Vertical`. | `Horizontal` |
| `ValueBrush` | Brush for the main value bar. | `null` |
| `TargetBrush` | Brush for the target marker. | `null` |

## See also

- [KPI card](/controls/data-display/charts/analytics/kpi-card)
- [Linear gauge chart](/controls/data-display/charts/gauges/linear-gauge-chart)
