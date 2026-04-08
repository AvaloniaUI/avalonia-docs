---
id: heatmap-chart
title: Heatmap
description: Uses color-coded cells in a 2D matrix to represent data values, making patterns, correlations, and outliers easy to identify.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsAnalyticsHeatmap from '/img/controls/charts/charts-analytics-heatmap.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Heatmaps use color-coded cells to represent data values in a 2D matrix, making it easy to identify patterns, correlations, and outliers across two dimensions.

<Image light={chartsAnalyticsHeatmap} maxWidth={400} position="center" cornerRadius="true" alt="Heatmap chart showing a 2D matrix of color-coded cells representing data values across rows and columns." />

## When to use
- **Correlation matrices**: Visualizing the relationship between variables.
- **Density mapping**: Showing frequency or intensity across two categories.
- **Matrix data**: When visualizing numerical values at the intersection of rows and columns.

## Code example

### XAML
```xml
<controls:HeatmapChart Title="Correlation Matrix" Height="300"
                       ItemsSource="{Binding HeatmapData}"
                       RowPath="Row" ColumnPath="Col" ValuePath="Val"/>
```

### Data model (C#)
```csharp
public record HeatmapPoint(string Row, string Col, double Val);

public ObservableCollection<HeatmapPoint> HeatmapData { get; } = new()
{
    new("A", "X", 10), new("A", "Y", 50), new("A", "Z", 30),
    new("B", "X", 80), new("B", "Y", 20), new("B", "Z", 45),
    new("C", "X", 40), new("C", "Y", 90), new("C", "Z", 15)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The chart title. | `null` |
| `ItemsSource` | The collection representing the matrix data. | `null` |
| `RowPath` | Path to the property for the row identifier. | `null` |
| `ColumnPath` | Path to the property for the column identifier. | `null` |
| `ValuePath` | Path to the property for cell values. | `null` |
| `LowBrush` | Brush used for the lowest values. | `#E3F2FD` |
| `HighBrush` | Brush used for the highest values. | `#1565C0` |
| `ShowLabels` | Whether to display the value inside each cell. | `true` |
| `CellGap` | Size of gap between cells. | `2.0` |
| `CellCornerRadius` | Corner radius of each cell. | `CornerRadius(4)` |
