---
id: matrix-chart
title: Matrix chart
description: Uses a grid to visualize relationships between two categorical sets, showing density or value magnitude at row/column intersections.
doc_type: reference
tags:
  - accelerate
---

import chartsAnalyticsMatrix from '/img/controls/charts/charts-analytics-matrix.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Matrix charts use a grid to visualize the relationship between two categorical sets. They are perfect for showing density, presence, or value magnitude at the intersection of rows and columns.

<Image light={chartsAnalyticsMatrix} maxWidth={400} position="center" cornerRadius="true" alt="Matrix chart showing a grid of dots sized or colored by value at row and column intersections." />

## When to use
- **Correlation Tables**: Showing the relationship between many different variables.
- **Schedule Overviews**: Mapping availability or events across people and days.
- **Attribute Comparison**: Visualizing which features (columns) apply to which products (rows).

## Code example

### XAML
```xml
<controls:MatrixChart Title="Fruit Attributes" Height="300"
                      ItemsSource="{Binding MatrixData}"
                      ColumnLabels="{Binding MatrixColumns}"
                      RowLabelPath="Attribute" ValuesPath="Values"
                      CellSize="28" CellSpacing="25"/>
```

### Data model (C#)
```csharp
public record MatrixRow(string Attribute, ObservableCollection<double> Values);

public ObservableCollection<string> MatrixColumns { get; } = new() { "Apple", "Banana", "Cherry" };

public ObservableCollection<MatrixRow> MatrixData { get; } = new()
{
    new("Sweetness", new() { 8, 9, 7 }),
    new("Acidity", new() { 5, 2, 6 }),
    new("Crunchiness", new() { 9, 1, 4 })
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of row data. | `null` |
| `ValuesPath` | Path to the numeric values for the row's cells. | `null` |
| `CellSize` | The diameter/width of each intersection point. | `20` |
| `CellSpacing` | The distance between the center of cells. | `25` |
| `Palette` | Brushes used to color-code values. | Theme-dependent |
