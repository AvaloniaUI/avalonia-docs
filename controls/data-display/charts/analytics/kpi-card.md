---
id: kpi-card
title: KPI cards
description: Displays critical business metrics in a focused format, combining a large value with a trend indicator and mini sparkline.
doc_type: reference
tags:
  - accelerate
---

import chartsAnalyticsKpi from '/img/controls/charts/charts-analytics-kpi.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

KPI cards display critical business metrics in a high-impact, focused format. They typically combine a large value with a trend indicator and a mini sparkline for context.

<Image light={chartsAnalyticsKpi} maxWidth={400} position="center" cornerRadius="true" alt="KPI card displaying a large metric value with a trend indicator and a mini sparkline chart for context." />

## When to use
- **Executive dashboards**: Providing at-a-glance status of main business goals.
- **Performance monitoring**: Tracking real-time metrics like active users or server load.
- **Financial overviews**: Showing revenue, expenses, and growth at the top of a report.

## Code example

### XAML
```xml
<controls:KpiCard Title="Revenue" Width="180" Height="160" Margin="10"
                  Value="{Binding Kpi1.Value}"
                  Unit="{Binding Kpi1.Unit}"
                  Delta="{Binding Kpi1.Delta}"
                  DeltaType="{Binding Kpi1.DeltaType}"
                  Subtitle="{Binding Kpi1.Subtitle}"
                  SparklineData="{Binding Kpi1.SparklineData}" />
```

### Data model (C#)
```csharp
public class KpiViewModel
{
    public double Value { get; set; } = 12500;
    public string Unit { get; set; } = "$";
    public string Delta { get; set; } = "+12.5%";
    public string Subtitle { get; set; } = "vs last month";
    public KpiTrend Trend { get; set; } = KpiTrend.Positive;
    public ObservableCollection<double> SparklineData { get; } = new() { 10, 15, 8, 12, 20, 18, 25 };
}
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The main numerical value to display. | `0` |
| `Delta` | The change percentage (usually with + or -). | `null` |
| `SparklineData` | Collection of values for the mini-chart. | `null` |
| `Unit` | Suffix for the value (e.g., "$", "%", "pts"). | `null` |
| `Trend` | `Positive`, `Negative`, or `Neutral`. | `Neutral` |
