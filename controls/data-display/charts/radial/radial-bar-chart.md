---
id: radial-bar-chart
title: Radial Bar Chart
description: Bar chart plotted on a polar coordinate system, offering a space-efficient circular layout for comparing categories or tracking multiple progress goals.
doc_type: reference
tags:
  - accelerate
---

import chartsRadialBar from '/img/controls/charts/charts-radial-bar.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Radial bar charts use a polar coordinate system. They are essentially bar charts plotted on a circular grid, offering a distinctive and space-efficient way to compare categories.

<Image light={chartsRadialBar} maxWidth={400} position="center" cornerRadius="true" alt="Radial bar chart with concentric circular bars of varying arc lengths comparing category progress on a polar grid." />

## When to Use
- **Circular Comparisons**: Showing data that has a cyclical nature (e.g., hours in a day).
- **Dashboard Infographics**: Creating high-impact visual summaries for ranked categories.
- **Progress Tracking**: Visualizing multiple goal tracks in a consolidated radial form.

## Code Example

### XAML
```xml
<controls:RadialBarChart Title="Category Progress" Height="350"
                         ItemsSource="{Binding RadialBarData}"
                         ValuePath="Value"
                         LabelPath="Label" />
```

### Data Model (C#)
```csharp
public record RadialMetric(string Label, double Value);

public ObservableCollection<RadialMetric> RadialBarData { get; } = new()
{
    new("Goal A", 85),
    new("Goal B", 65),
    new("Goal C", 45)
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of categorical items. | `null` |
| `ValuePath` | Numerical property for bar length. | `null` |
| `LabelPath` | Property name for category labels. | `null` |
| `BarWidth` | The thickness of each circular bar. | `15` |
| `Gap` | Spacing between concentric bars. | `5` |
