---
id: data-labels-chart
title: Data labels
description: Displays actual data values directly on chart series elements, removing the need for users to estimate values from axis positions.
doc-type: reference
tags:
  - avalonia pro
---

import chartsFeaturesLabels from '/img/controls/charts/charts-datalabel.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Data labels place the actual values directly on the chart series. This lets readers compare values without estimating them from axis positions.

<Image light={chartsFeaturesLabels} maxWidth={400} position="center" cornerRadius="true" alt="Bar chart with data labels displayed above each quarterly revenue bar." />

## When to use
- **Presentation graphics**: Where clear, immediate values are prioritized.
- **Small multiples**: When axes are omitted to save space.
- **Key milestones**: Highlighting specific values that require attention.

## Code example

### XAML
```xml
<charts:CartesianChart Name="BasicLabelsChart" Height="250">
                        <charts:CartesianChart.Series>
                            <charts:BarSeries Title="Sales" ItemsSource="{Binding SalesData}"
                                                CategoryPath="Category" ValuePath="Value"
                                                ShowLabels="True" LabelOffset="5"/>
                        </charts:CartesianChart.Series>
                        <charts:CartesianChart.HorizontalAxis>
                            <charts:CategoryAxis Title="Quarter" />
                        </charts:CartesianChart.HorizontalAxis>
                        <charts:CartesianChart.VerticalAxis>
                            <charts:NumericalAxis Title="Revenue" />
                        </charts:CartesianChart.VerticalAxis>
                    </charts:CartesianChart>
```

### Data model (C#)
```csharp
public record SalesPoint(string Category, double Value);

public ObservableCollection<SalesPoint> SalesData { get; } = new()
{
    new("Q1", 120),
    new("Q2", 150),
    new("Q3", 180),
    new("Q4", 220)
};
```

## Common properties (on Series)

| Property | Description | Default |
| :--- | :--- | :--- |
| `ShowLabels` | Toggles values on the series points. | `false` |
| `LabelFormat` | String format. `{0}` is the value and `{1}` is the category. | `"{0:N0}"` |
| `LabelFontSize` | Size of the text in pixels. | `12.0` |
| `LabelForeground` | Brush used for the text color. | `null` |
| `LabelBackground` | Brush used behind the label text. | `null` |
| `LabelCornerRadius` | Corner radius for the label background. | `4` |
| `LabelPadding` | Padding inside the label background. | `4,2` |
| `LabelOffset` | Distance from the data point to the label. | `10.0` |
