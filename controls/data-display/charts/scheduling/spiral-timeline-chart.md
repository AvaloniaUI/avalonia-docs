---
id: spiral-timeline-chart
title: Spiral Timeline
description: Wraps a chronological sequence into a spiral to reveal both long-term trends and recurring cyclical patterns within the same visualization.
doc_type: reference
tags:
  - accelerate
---

import chartsTimelineSpiral from '/img/controls/charts/charts-timeline-spiral.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Spiral timelines visualize data that has both a strong sequential component and a cyclical pattern. By wrapping the timeline into a spiral, long-term trends and short-term repetitions become visible.

<Image light={chartsTimelineSpiral} maxWidth={400} position="center" cornerRadius="true" alt="Spiral timeline chart wrapping chronological data into an outward spiral to show both long-term trends and cyclical patterns." />

## When to Use
- **Long-term Cyclical Data**: Visualizing annual climate changes over several decades.
- **System Logs**: Detecting patterns in server activity across weeks or months.
- **Biological Rhythms**: Showing sleep patterns or activity cycles over time.

## Code Example

### XAML
```xml
<controls:SpiralTimelineChart Title="Yearly Variations" Height="500"
                              ItemsSource="{Binding SpiralPoints}"
                              ValuePath="Reading"
                              DatePath="Timestamp" />
```

### Data Model (C#)
```csharp
public record SpiralData(DateTime Timestamp, double Reading);

public ObservableCollection<SpiralData> SpiralPoints { get; } = new()
{
    new(DateTime.Now.AddMonths(-24), 10),
    new(DateTime.Now.AddMonths(-12), 45),
    new(DateTime.Now), 82
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of points on the spiral. | `null` |
| `DatePath` | Path to the chronological property. | `null` |
| `ValuePath` | Numerical property determining point size/color. | `null` |
| `Rotations` | Number of turns in the spiral. | `3` |
| `Stroke` | Color of the spiral path line. | Theme-dependent |
