---
id: gauge-chart
title: Gauge chart
description: Displays a single value on a dial-style gauge with an arc fill and optional needle.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Gauge charts render a single value on a dial-style arc, with optional needle and formatted value text.

## When to use

- **Operational dashboards**: Show utilization, load, or health in a compact dial.
- **Threshold monitoring**: Emphasize a single current reading over time history.
- **Status cards**: Present one metric with strong visual weight.

## Code example

### XAML

```xml
<GaugeChart xmlns="https://github.com/avaloniaui" Title="CPU load"
                     Width="220"
                     Height="160"
                     Value="{Binding CpuLoad}"
                     MaxValue="100"
                     ShowNeedle="True" />
```

### Data model (C#)

```csharp
public double CpuLoad { get; set; } = 67;
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | Current value displayed by the gauge. | `50.0` |
| `MinValue` | Minimum value of the scale. | `0.0` |
| `MaxValue` | Maximum value of the scale. | `100.0` |
| `ValueBrush` | Brush used for the value arc. | `null` |
| `TrackBrush` | Brush used for the background track. | `null` |
| `NeedleBrush` | Brush used for the needle. | `null` |
| `ShowNeedle` | Whether to draw the needle. | `true` |
| `StartAngle` | Start angle of the gauge arc in degrees. | `135.0` |
| `SweepAngle` | Sweep angle of the gauge arc in degrees. | `270.0` |
| `TrackThickness` | Thickness of the track arc. | `20.0` |
| `ShowValue` | Whether to display the formatted value text. | `true` |
| `ValueFormat` | Format string used for the value text. | `"{0:F0}"` |

## See also

- [Circular gauge](/controls/data-display/charts/gauges/circular-gauge-chart)
- [Progress donut chart](/controls/data-display/charts/gauges/progress-donut-chart)
