---
id: pareto-chart
title: Pareto chart
description: Combines descending bars with a cumulative line to highlight the most significant factors, based on the 80/20 principle.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsStatisticalPareto from '/img/controls/charts/charts-statistical-pareto.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

A Pareto chart contains both bars and a line graph, where individual values are represented in descending order by bars, and the cumulative total is represented by the line.

<Image light={chartsStatisticalPareto} maxWidth={400} position="center" cornerRadius="true" alt="Pareto chart with descending bars and a cumulative percentage line highlighting the most significant factors." />

## When to use
- **Quality control**: Identifying the "vital few" causes of defects (80/20 rule).
- **Resource management**: Pinpointing which categories account for most costs.
- **Customer service**: Analyzing which complaints are most frequent.

## Code example

### XAML
```xml
<controls:ParetoChart Title="Complaint Analysis" Height="400"
                      ItemsSource="{Binding ComplaintData}"
                      ValuePath="Count"
                      LabelPath="Category" />
```

### Data model (C#)
```csharp
public record Complaint(string Category, double Count);

public ObservableCollection<Complaint> ComplaintData { get; } = new()
{
    new("Late Delivery", 450),
    new("Damaged Item", 280),
    new("Wrong Item", 120),
    new("Support Quality", 45)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of categories. | `null` |
| `ValuePath` | Property determining bar height. | `null` |
| `LabelPath` | Property for the category names. | `null` |
| `LineStroke` | Color of the cumulative percentage line. | `Red` |
| `ShowLabels` | Toggles values on bars/line points. | `true` |
