---
id: axis-customization-chart
title: Axis Customization
description: Provides options to customize axis appearance including label rotation, gridline styling, multiple axes, and support for numerical, category, date, and logarithmic types.
doc_type: reference
tags:
  - accelerate
---

import chartsFeaturesGridlines from '/img/controls/charts/charts-gridlines-customization.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Avalonia Charts provides extensive options to customize axis appearance, including label rotation, styling, gridline configuration, and multi-axis support.

<Image light={chartsFeaturesGridlines} maxWidth={400} position="center" cornerRadius="true" alt="Cartesian chart with customized axes showing gridlines." />

## When to Use
- **Multiple Scales**: When displaying two different metrics (e.g., Temperature and Humidity) on the same chart.
- **Categorical Data**: When axes represent discrete groups rather than continuous numbers.
- **Time-Series Analysis**: Customizing date formats and intervals for historical data.

## Code Example

### XAML
```xml
<controls:CartesianChart Title="Revenue vs Growth Rate" Height="300" ShowLegend="True">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis Title="Month" LabelRotation="45" ShowGridLines="True" />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis Title="Revenue ($K)" MajorStep="20" />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.SecondaryVerticalAxis>
        <controls:NumericalAxis Title="Growth (%)" />
    </controls:CartesianChart.SecondaryVerticalAxis>
    <controls:CartesianChart.Series>
        <controls:BarSeries Title="Revenue" ItemsSource="{Binding RevenueData}" YAxisPosition="Primary" />
        <controls:LineSeries Title="Growth %" ItemsSource="{Binding GrowthData}" YAxisPosition="Secondary" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data Model (C#)
```csharp
public record MonthlyMetric(string Month, double Value);

public ObservableCollection<MonthlyMetric> RevenueData { get; } = new() { new("Jan", 120), new("Feb", 150) };
public ObservableCollection<MonthlyMetric> GrowthData { get; } = new() { new("Jan", 5), new("Feb", 8) };
```

## Common Axis Properties (NumericalAxis / CategoryAxis)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The text label for the axis. | `null` |
| `IsVisible` | Toggle the visibility of the entire axis. | `true` |
| `ShowMajorGridlines`| Show/hide major grid lines. | `true` |
| `ShowMinorGridlines`| Show/hide minor grid lines. | `false` |
| `LabelFormat` | Format string for labels (e.g., "C0", "N2", "yyyy"). | `null` |
| `LabelAngle` | Rotation angle of the labels (0 to 360). | `0` |
| `Position` | `Top`, `Bottom`, `Left`, `Right`. | Side dependent |

## Axis Types
- **NumericalAxis**: For continuous numeric data. Supports `Minimum`, `Maximum`, and `Interval`.
- **CategoryAxis**: For discrete categories. Labels are derived from the data.
- **DateTimeAxis**: For date and time data. Supports automatic interval calculation and formatting.
- **LogarithmicAxis**: For data with a large range. Supports `Base` (default 10).
