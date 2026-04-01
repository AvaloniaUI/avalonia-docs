---
id: step-line-chart
title: Step line chart
description: Connects data points using horizontal and vertical lines in a step pattern, representing values that remain constant between intervals.
doc_type: reference
tags:
  - accelerate
---

import chartsCartesianStepline from '/img/controls/charts/charts-cartesian-stepline.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Step line charts use horizontal and vertical lines to connect data points, creating a step-like pattern. They are useful for showing changes that occur at discrete intervals.

<Image light={chartsCartesianStepline} maxWidth={400} position="center" cornerRadius="true" alt="Step line chart connecting data points with horizontal and vertical segments showing discrete pricing tier changes." />

## When to use
- **Price Changes**: Visualizing interest rates, price tiers, or inventory levels.
- **Discrete Transitions**: When the value remains constant between data points.
- **Digital Signals**: Representing binary or state-based data.

## Code example

### XAML
```xml
<controls:CartesianChart Name="StepLineChartSample" IsTooltipEnabled="True" Title="Pricing Tiers" Height="250">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:StepLineSeries Title="Price" ItemsSource="{Binding StepLinePrice}" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record PriceTier(string Tier, double Price);

public ObservableCollection<PriceTier> StepLinePrice { get; } = new()
{
    new("Basic", 9.99),
    new("Standard", 19.99),
    new("Premium", 29.99),
    new("Enterprise", 49.99)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series. | `null` |
| `ItemsSource` | The collection of data items. | `null` |
| `Stroke` | Color of the step line. | Theme-dependent |
| `StrokeThickness`| Width of the line. | `2` |
| `StepPosition` | `Start`, `Center`, or `End` point of the step. | `Center` |
