---
id: liquid-fill-gauge
title: Liquid fill gauge
description: Represents a percentage as an animated liquid level within a circular shape, suited for thematic dashboards showing fill or capacity metrics.
doc-type: reference
tags:
  - avalonia pro
---

import chartsGaugesLiquid from '/img/controls/charts/charts-gauges-liquid.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Liquid fill gauges are decorative circular gauges that represent a percentage as 'liquid' at a certain level. They are popular for visualizing tank levels, water usage, or thematic progress.

<Image light={chartsGaugesLiquid} maxWidth={400} position="center" cornerRadius="true" alt="Liquid fill gauge showing a circular container filled with animated liquid to represent a percentage value." />

## When to use
- **Thematic dashboards**: Visualizing "filling" concepts like fundraising or capacity.
- **Environmental apps**: Showing water levels or liquid container status.
- **Engaging UI**: Adding a playful, animated metric indicator to a modern application.

## Code example

### XAML
```xml
<WrapPanel Orientation="Horizontal" HorizontalAlignment="Center">
    <charts:LiquidFillGauge Value="35" Width="140" Height="180" Title="CPU Usage" Margin="15" />
    <charts:LiquidFillGauge Value="68" Width="140" Height="180" Title="Memory" Margin="15" />
    <charts:LiquidFillGauge Value="85" Width="140" Height="180" Title="Storage" Margin="15" />
</WrapPanel>
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The current value. | `50.0` |
| `MinValue` | The minimum value. | `0.0` |
| `MaxValue` | The maximum value. | `100.0` |
| `ValueBrush` | Brush for the liquid value region. | Gradient / Theme-dependent |
| `TrackBrush` | Brush for the empty background region. | `null` |
| `WaveAmplitude` | Amplitude of the wave effect. | `5.0` |
| `WaveFrequency` | Frequency of the wave effect. | `2.0` |
| `ShowPercentage` | Whether to display the percentage text. | `true` |
| `IsWaveAnimationEnabled` | Whether to animate the wave. | `true` |

## See also

- [Gauge chart](/controls/data-display/charts/gauges/gauge-chart)
- [Progress donut chart](/controls/data-display/charts/gauges/progress-donut-chart)
