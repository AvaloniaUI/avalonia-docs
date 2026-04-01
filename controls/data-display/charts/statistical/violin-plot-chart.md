---
id: violin-plot-chart
title: Violin plot
description: Combines a box plot with a kernel density estimate to show both the statistical summary and the probability distribution shape of data across categories.
doc_type: reference
tags:
  - accelerate
---

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Violin plots combine a box plot with a kernel density plot, showing both the statistical summary and the probability density of the data at different values.

## When to use
- **Deep Distribution**: When you need to see where data points are most frequent (density).
- **Comparison**: Comparing both the ranges (box plot) and the shapes (density) of multiple groups.
- **Multi-modal Data**: Identifying data with multiple peaks (modes) which a box plot might hide.

## Code example

### XAML
```xml
<controls:ViolinPlotChart Name="ViolinPlotSample"
                           Title="Response Times"
                           Height="300"
                           CategoryPath="Group"
                           ValuesPath="DataPoints"
                           ItemsSource="{Binding ViolinSeries}" />
```

### Data model (C#)
```csharp
public record ViolinGroup(string Group, ObservableCollection<double> DataPoints);

public ObservableCollection<ViolinGroup> ViolinSeries { get; } = new()
{
    new("Backend", new() { 12, 15, 12, 18, 25, 30, 12, 14 }),
    new("Frontend", new() { 50, 55, 60, 50, 45, 80, 50, 52 })
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of data groups. | `null` |
| `ValuesPath` | Path to the collection of raw values for each category. | `null` |
| `CategoryPath` | Path to the category name. | `null` |
| `Fill` | Brush used for the violin bodies. | Auto-generated |
| `ShowBoxPlot` | Whether to display the internal box plot. | `true` |
