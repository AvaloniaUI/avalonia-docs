---
id: slope-chart
title: Slope chart
description: Compares values for multiple entities between exactly two points in time or categories, highlighting which entities increased, decreased, or stayed the same.
doc_type: reference
tags:
  - accelerate
---

import chartsAnalyticsSlope from '/img/controls/charts/charts-statistical-slope.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Slope charts compare two points in time (or two categories) for multiple entities. They are ideal for visualizing the change in rank or value between two states.

<Image light={chartsAnalyticsSlope} maxWidth={400} position="center" cornerRadius="true" alt="Slope chart comparing entity values between two time points with labeled lines showing which increased or decreased." />

## When to use
- **Before/After Analysis**: Showing the impact of a policy or event across different groups.
- **Rank Shifts**: Visualizing how product popularity changed between two quarters.
- **Comparison of Two States**: Highlighting which entities improved and which declined.

## Code example

### XAML
```xml
<controls:SlopeChart Name="SlopeSample" Title="Growth Comparison" Height="350"
                     ItemsSource="{Binding SlopeData}"
                     ValuesPath="Values"
                     LabelPath="EntityName" />
```

### Data model (C#)
```csharp
public record SlopeEntity(string EntityName, double[] Values);

public ObservableCollection<SlopeEntity> SlopeData { get; } = new()
{
    new("Company A", new[] { 10.0, 45.0 }),
    new("Company B", new[] { 50.0, 30.0 }),
    new("Company C", new[] { 25.0, 28.0 })
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of items to compare. | `null` |
| `ValuesPath` | Path to the array/collection of two values. | `null` |
| `LabelPath` | Path to the entity name. | `null` |
| `StrokeThickness`| Width of the connecting lines. | `2` |
| `ShowLabels` | Toggles the start and end value labels. | `true` |
