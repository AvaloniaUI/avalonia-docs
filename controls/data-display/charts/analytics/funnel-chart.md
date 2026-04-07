---
id: funnel-chart
title: Funnel chart
description: Visualizes the progressive reduction of data through a linear process, useful for identifying bottlenecks in pipelines.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsAnalyticsFunnel from '/img/controls/charts/charts-analytics-funnel.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Funnel charts visualize the progressive reduction of data as it passes from one phase to another. They are essential for identifying bottlenecks in a linear process.

<Image light={chartsAnalyticsFunnel} maxWidth={400} position="center" cornerRadius="true" alt="Funnel chart showing progressive reduction of data through sales pipeline stages from leads to closed sales." />

## When to use
- **Sales pipelines**: Tracking potential customers from lead to closed sale.
- **Conversion rates**: Monitoring website visitors through a checkout process.
- **Recruitment**: Visualizing candidates at each stage of the hiring process.

## Code example

### XAML
```xml
<controls:FunnelChart Title="Sales Pipeline" Height="300"
                      ItemsSource="{Binding FunnelData}"
                      LabelPath="Stage" ValuePath="Value"/>
```

### Data model (C#)
```csharp
public record FunnelStage(string Stage, double Value);

public ObservableCollection<FunnelStage> FunnelData { get; } = new()
{
    new("Website Visits", 5000),
    new("Downloads", 2500),
    new("Quotes", 500),
    new("Sales", 150)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name shown at the top. | `null` |
| `ItemsSource` | The collection of process stages. | `null` |
| `ValuePath` | Path to the property representing the quantity at each stage. | `null` |
| `LabelPath` | Path to the property for the stage names. | `null` |
| `NeckWidth` | The width of the funnel "neck" (bottom). | `0.2` |
| `NeckHeight` | The height of the funnel "neck". | `0.4` |
