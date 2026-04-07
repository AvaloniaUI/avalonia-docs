---
id: liquid-fill-gauge
title: Liquid fill gauge
description: Represents a percentage as an animated liquid level within a circular shape, suited for thematic dashboards showing fill or capacity metrics.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsGaugesLiquid from '/img/controls/charts/charts-gauges-liquid.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
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
<controls:LiquidFillGauge Value="{Binding WaterLevel}" Width="150" Height="150" TextColor="White" />
```

### Data model (C#)
```csharp
// Percentage binding (0 to 100)
public double WaterLevel { get; set; } = 42.0;
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The percentage filled (0 to 100). | `0` |
| `Fill` | Color of the "liquid". | `Blue` / Theme-dependent |
| `TextColor` | Color of the percentage label. | Theme-dependent |
| `WaveFrequency` | Controls the speed/intensity of the animation. | `2.0` |
