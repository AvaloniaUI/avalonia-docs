---
id: data-labels-chart
title: Data labels
description: Displays actual data values directly on chart series elements, removing the need for users to estimate values from axis positions.
doc_type: reference
tags:
  - accelerate
---

import chartsFeaturesLabels from '/img/controls/charts/charts-axis-45-labels.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Data labels place the actual values directly on the chart series. This removes the need for users to eye-ball coordinates, making the chart much easier to read at a glance.

<Image light={chartsFeaturesLabels} maxWidth={400} position="center" cornerRadius="true" alt="Bar chart with data labels displayed at a 45-degree angle." />

## When to use
- **Presentation Graphics**: Where clear, immediate values are prioritized.
- **Small Multiples**: When axes are omitted to save space.
- **Key Milestones**: Highlighting specific values that require attention.

## Code example

### XAML
```xml
<controls:CartesianChart Name="DataLabelsChart" Height="250">
    <controls:CartesianChart.Series>
        <controls:BarSeries Title="Sales"
                           ItemsSource="{Binding LabelData}"
                           ShowLabels="True"
                           LabelFormat="{}{0:C0}"
                           LabelFontSize="12"
                           LabelForeground="Black" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record LabelDataPoint(string Category, double Value);

public ObservableCollection<LabelDataPoint> LabelData { get; } = new()
{
    new("Jan", 1200),
    new("Feb", 1500),
    new("Mar", 900)
};
```

## Common properties (on Series)

| Property | Description | Default |
| :--- | :--- | :--- |
| `ShowLabels` | Toggles values on the series points. | `false` |
| `LabelFormat` | String format (e.g., `"{0:N2}", "C0"`). | `null` |
| `LabelFontSize` | Size of the text in pixels. | `11` |
| `LabelForeground` | Brush used for the text color. | Theme-dependent |
