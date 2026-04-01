---
id: polar-area-chart
title: Polar area chart
description: Similar to a pie chart but uses segment radius rather than angle to encode values, giving equal angular space to each category on a circular axis.
doc_type: reference
tags:
  - accelerate
---

import chartsRadialPolararea from '/img/controls/charts/charts-radial-polar.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Polar area charts (or coxcomb charts) are similar to pie charts but represent values using the radius of segments instead of the angle. Each segment has an equal angle.

<Image light={chartsRadialPolararea} maxWidth={400} position="center" cornerRadius="true" alt="Polar area chart with equal-angle segments of varying radius representing seasonal magnitude values in a circular layout." />

## When to use
- **Cyclical Trends**: Visualizing seasonal data or wind patterns.
- **Ranking Categories**: Comparing the magnitude of many categories in a circular layout.
- **Historical Analysis**: The classic chart type for visualizing causes of mortality over time.

## Code example

### XAML
```xml
<controls:PolarAreaChart Title="Seasonal Values" Height="350"
                         ItemsSource="{Binding PolarData}"
                         ValuePath="Magnitude"
                         LabelPath="Season" />
```

### Data model (C#)
```csharp
public record SeasonalPoint(string Season, double Magnitude);

public ObservableCollection<SeasonalPoint> PolarData { get; } = new()
{
    new("Spring", 75), new("Summer", 95),
    new("Autumn", 50), new("Winter", 30)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of segments. | `null` |
| `ValuePath` | Property determining the radius of the slice. | `null` |
| `LabelPath` | Property for the slice name. | `null` |
| `Palette` | Custom brushes for the segments. | Auto-generated |
| `Stroke` | Outline color of the segments. | `Transparent` |
