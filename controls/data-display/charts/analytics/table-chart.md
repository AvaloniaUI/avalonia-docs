---
id: table-chart
title: Table Chart
description: Combines tabular data with embedded visual cues such as color and icons, suitable for dense reports requiring exact values.
doc_type: reference
tags:
  - accelerate
---

import chartsAnalyticsTable from '/img/controls/charts/charts-analytics-table.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Table charts combine traditional tabular data with embedded visual cues. They are ideal for dense data reports where both exact values and visual "weight" (color, icons) are needed.

<Image light={chartsAnalyticsTable} maxWidth={400} position="center" cornerRadius="true" alt="Table chart displaying rows of data with embedded color-coded indicators and icons for visual context." />

## When to Use
- **Product Comparisons**: Showing features across many items in a grid.
- **Financial Status**: Displaying accounts with color-coded "health" indicators.
- **Multi-metric Reports**: When users need to sort and filter raw data.

## Code Example

### XAML
```xml
<controls:TableChart Title="Product Comparison" Height="400"
                     ItemsSource="{Binding TableData}"
                     RowLabelPath="Product" />
```

### Data Model (C#)
```csharp
public record ProductMetric(string Product, double Rating, double Price, bool InStock);

public ObservableCollection<ProductMetric> TableData { get; } = new()
{
    new("Laptop Pro", 4.8, 1299, true),
    new("Tablet Air", 4.5, 599, true),
    new("Phone X", 4.9, 999, false)
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The row data source. | `null` |
| `Columns` | The configuration for grid columns. | `null` |
| `CanSort` | Toggles column-based sorting. | `true` |
| `AlternatingRows`| Enhances readability with striped row colors. | `true` |
