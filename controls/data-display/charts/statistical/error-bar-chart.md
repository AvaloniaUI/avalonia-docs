---
id: error-bar-chart
title: Error bar chart
description: Represents data variability by adding error indicators to data points, showing standard deviation, confidence intervals, or measurement uncertainty.
doc_type: reference
tags:
  - accelerate
---

import chartsStatisticalErrorbar from '/img/controls/charts/charts-statistical-error.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Error bar charts represent the variability of data and are used on graphs to indicate the error or uncertainty in a reported measurement.

<Image light={chartsStatisticalErrorbar} maxWidth={400} position="center" cornerRadius="true" alt="Chart with data points and vertical error indicators showing standard deviation ranges for each sample." />

## When to use
- **Scientific Research**: Visualizing standard deviation or confidence intervals.
- **Quality Control**: Showing the range of tolerance in manufacturing.
- **Survey Data**: Indicating the margin of error in statistical polls.

## Code example

### XAML
```xml
<controls:ErrorBarChart Name="ErrorBarSample" Title="Measurement Precision" Height="300"
                        ItemsSource="{Binding LabResults}"
                        ValuePath="Mean"
                        ErrorPath="StandardError"
                        LabelPath="SampleID" />
```

### Data model (C#)
```csharp
public record LabResult(string SampleID, double Mean, double StandardError);

public ObservableCollection<LabResult> LabResults { get; } = new()
{
    new("Sample 1", 45, 5),
    new("Sample 2", 82, 12),
    new("Sample 3", 60, 3)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of measured data. | `null` |
| `ValuePath` | The central value (Mean/Median). | `null` |
| `ErrorPath` | The amount of error (up and down). | `null` |
| `CapSize` | The width of the horizontal caps on the error bars. | `8` |
| `Stroke` | Color of the error indicator lines. | Theme-dependent |
