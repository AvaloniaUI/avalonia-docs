---
id: semi-donut-chart
title: Semi-donut chart
description: Displays proportional data in a 180-degree arc, popular for dashboard gauges and summary metrics where a full circle is not required.
doc_type: reference
tags:
  - accelerate
---

import chartsPieSemidonut from '/img/controls/charts/charts-pie-semidonut.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Semi-donut charts display data in a 180-degree arc. They are particularly popular in dashboard designs for gauging progress or displaying summary metrics in a space-constrained area.

<Image light={chartsPieSemidonut} maxWidth={400} position="center" cornerRadius="true" alt="Semi-donut chart displayed as a 180-degree arc with colored segments and a center label showing a summary metric." />

## When to use
- **KPI Gauges**: Visualizing a single metric against a target or total.
- **Dashboard Headers**: Providing a quick summary of a category at the top of a page.
- **Angular Comparison**: Comparing parts of a whole where a full circle isn't needed or desired.

## Code example

### XAML
```xml
<controls:SemiDonutChart Name="SemiDonutChartSample" Height="200"
                         ItemsSource="{Binding SemiDonutData}"
                         ValuePath="Value"
                         LabelPath="Label"
                         CenterValue="$980"
                         CenterLabel="Total Revenue" />
```

### Data model (C#)
```csharp
public record MetricItem(string Label, double Value);

public ObservableCollection<MetricItem> SemiDonutData { get; } = new()
{
    new("Goal A", 350),
    new("Goal B", 420),
    new("Goal C", 210)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The data source for the segments. | `null` |
| `InnerRadiusFactor`| The thickness of the arc (0.0 to 1.0). | `0.6` |
| `CenterLabel` | Primary text displayed in the center of the arc. | `null` |
| `CenterValue` | Secondary value text displayed below the label. | `null` |
| `StartAngle` / `EndAngle`| Customizes the arc span (in degrees). | `180` to `360` |
