---
id: tooltip-chart
title: Tooltips
description: Displays detailed information about data points on hover, providing context without cluttering the chart area; fully customizable via DataTemplates.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsFeaturesTooltip from '/img/controls/charts/charts-tooltips.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Tooltips provide detailed information about data points when the user hovers over them. They are essential for precision and for providing context without cluttering the main chart area.

<Image light={chartsFeaturesTooltip} maxWidth={400} position="center" cornerRadius="true" alt="Chart with an interactive tooltip popup appearing on hover showing the exact value and category of a data point." />

## When to use
- **High-density data**: Pinpointing values in a crowded line or scatter chart.
- **Additional context**: Showing metadata (e.g., "Update Date") that isn't mapped to an axis.
- **Web-Style interactions**: Creating a modern, interactive experience for end-users.

## Code example

### XAML
```xml
<controls:CartesianChart Title="Server Stats" Height="300" IsTooltipEnabled="True">
    <controls:CartesianChart.Series>
        <controls:AreaSeries Title="Usage" ItemsSource="{Binding UsageData}" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record UsagePoint(string Time, double Val);

public ObservableCollection<UsagePoint> UsageData { get; } = new()
{
    new("10:00", 45), new("11:00", 82)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `IsTooltipEnabled` | Global toggle for tooltip visibility. | `true` |
| `TooltipTemplate` | Custom DataTemplate for the tooltip UI (on series). | System default |
*(Note: Tooltips are fully customizable via DataTemplates on individual series)*
