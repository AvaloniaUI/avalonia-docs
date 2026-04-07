---
id: radar-chart
title: Radar chart
description: Compares multiple quantitative variables across categories on a radial axis, used to visualize profiles and multi-dimensional performance comparisons.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsRadialRadar from '/img/controls/charts/charts-radial-radar.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Radar charts compare multiple qualitative variables across several categories. They are widely used to visualize "profiles" or signatures of different entities across common metrics.

<Image light={chartsRadialRadar} maxWidth={400} position="center" cornerRadius="true" alt="Radar chart with two overlapping polygons comparing multi-dimensional skill scores across radial axes." />

## When to use
- **Skill assessment**: Comparing the strengths/weaknesses of employees or athletes.
- **Product benchmarking**: Comparing different products across price, quality, and features.
- **Performance profiles**: Displaying multifaceted metrics (e.g., SEO, Speed, Security for a website).

## Code example

### XAML
```xml
<controls:RadarChart Name="RadarChartSample" Title="Team Skills" Height="350"
                     AxisLabels="{Binding RadarLabels}">
    <controls:RadarChart.Series>
        <controls:RadarSeries Title="Player A" ItemsSource="{Binding RadarSeries1}" FillOpacity="0.3" ShowMarkers="True" />
        <controls:RadarSeries Title="Player B" ItemsSource="{Binding RadarSeries2}" FillOpacity="0.3" ShowMarkers="True" />
    </controls:RadarChart.Series>
</controls:RadarChart>
```

### Data model (C#)
```csharp
// Axis labels mapped to categories
public ObservableCollection<string> RadarLabels { get; } = new()
{
    "Speed", "Agility", "Power", "Stamina", "Technique"
};

// Values for the axes in order
public ObservableCollection<double> RadarSeries1 { get; } = new() { 80, 90, 70, 85, 95 };
public ObservableCollection<double> RadarSeries2 { get; } = new() { 60, 75, 95, 90, 80 };
```

## Common properties (RadarSeries)

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The numerical values for the radar axes. | `null` |
| `Title` | The name of the player/entity (for legend). | `null` |
| `Fill` | Brush used for the polygon area. | Semi-transparent |
| `Stroke` | Color of the polygon border. | Theme-dependent |
| `ShowMarkers` | Toggles points at the axis intersections. | `true` |
