---
id: nightingale-rose-chart
title: Nightingale Rose Chart
description: Multi-layered polar area chart that stacks multiple variables within each circular segment, allowing comparison of composition across cyclical categories.
doc_type: reference
tags:
  - accelerate
---

import chartsRadialRose from '/img/controls/charts/charts-radial-rose.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

The Nightingale Rose chart is a multi-layered polar area chart. It allows for comparing multiple variables across categories by stacking them within each circular segment.

<Image light={chartsRadialRose} maxWidth={400} position="center" cornerRadius="true" alt="Nightingale rose chart with stacked sub-segments in each circular slice comparing composition across cyclical categories." />

## When to Use
- **Comparative Decomposition**: Breaking down a total category value into parts in a circular form.
- **Multi-variate Cycles**: Comparing different data series across a cyclical timeframe.
- **Complex Proportions**: When a standard polar area chart needs to show internal composition.

## Code Example

### XAML
```xml
<controls:NightingaleRoseChart Title="Source Composition" Height="400"
                               ItemsSource="{Binding RoseData}"
                               ValuePath="Value"
                               LabelPath="Source"
                               GroupPath="Period" />
```

### Data Model (C#)
```csharp
public record RoseSegment(string Period, string Source, double Value);

public ObservableCollection<RoseSegment> RoseData { get; } = new()
{
    new("Q1", "Web", 45), new("Q1", "Direct", 30),
    new("Q2", "Web", 60), new("Q2", "Direct", 40)
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of segments. | `null` |
| `ValuePath` | Radius magnitude of the sub-segment. | `null` |
| `GroupPath` | The angular category (e.g., Month, Region). | `null` |
| `LabelPath` | The sub-category name (e.g., Source, Type). | `null` |
| `Palette` | Custom brushes for distinguishing sub-categories. | Auto-generated |
