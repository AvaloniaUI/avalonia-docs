---
id: sparkline-chart
title: Sparkline charts
description: Small, minimalist charts without axes designed to show data trends in a compact space, suitable for embedding in tables, dashboards, or inline text.
doc_type: reference
tags:
  - accelerate
---

import chartsAnalyticsSparkline from '/img/controls/charts/charts-analytics-matrix-sparkline.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Sparklines are small, minimalist intense charts without axes or coordinates, designed to show trends in a series of values in a space-efficient way (e.g., inside a table).

<Image light={chartsAnalyticsSparkline} maxWidth={400} position="center" cornerRadius="true" alt="Sparkline charts showing compact line, area, and bar trend visualizations without axes for embedding in dashboards." />

## When to use
- **In-line trends**: Showing data trends inside data grids or text paragraphs.
- **Dashboard summaries**: Providing high-density visual context for many metrics on one screen.
- **Compact visualizations**: When the general shape of a trend is more important than specific values.

## Code example

### XAML
```xml
<!-- Example of different types -->
<controls:SparklineChart Height="40" SparklineType="Line" ItemsSource="{Binding SparkData}"/>
<controls:SparklineChart Height="40" SparklineType="Area" ItemsSource="{Binding SparkData}"/>
<controls:SparklineChart Height="40" SparklineType="Bar" ItemsSource="{Binding SparkData}"/>
```

### Data model (C#)
```csharp
// Sparklines typically take a collection of doubles or simple values
public ObservableCollection<double> SparkData { get; } = new() { 10, 15, 8, 12, 20, 18, 25 };
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of trend data. | `null` |
| `SparklineType` | `Line`, `Area`, or `Bar`. | `Line` |
| `Fill` / `Stroke` | Brushes used for the visualization. | Theme-dependent |
| `Points` | Toggles rendering of individual data points. | `false` |
