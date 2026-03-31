---
id: liquid-fill-gauge
title: Liquid Fill Gauge
description: Represents a percentage as an animated liquid level within a circular shape, suited for thematic dashboards showing fill or capacity metrics.
doc_type: reference
tags:
  - accelerate
---

import chartsGaugesLiquid from '/img/controls/charts/charts-gauges-liquid.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Liquid fill gauges are decorative circular gauges that represent a percentage as 'liquid' at a certain level. They are popular for visualizing tank levels, water usage, or thematic progress.

<Image light={chartsGaugesLiquid} maxWidth={400} position="center" cornerRadius="true" alt="Liquid fill gauge showing a circular container filled with animated liquid to represent a percentage value." />

## When to Use
- **Thematic Dashboards**: Visualizing "filling" concepts like fundraising or capacity.
- **Environmental Apps**: Showing water levels or liquid container status.
- **Engaging UI**: Adding a playful, animated metric indicator to a modern application.

## Code Example

### XAML
```xml
<controls:LiquidFillGauge Value="{Binding WaterLevel}" Width="150" Height="150" TextColor="White" />
```

### Data Model (C#)
```csharp
// Percentage binding (0 to 100)
public double WaterLevel { get; set; } = 42.0;
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The percentage filled (0 to 100). | `0` |
| `Fill` | Color of the "liquid". | `Blue` / Theme-dependent |
| `TextColor` | Color of the percentage label. | Theme-dependent |
| `WaveFrequency` | Controls the speed/intensity of the animation. | `2.0` |
