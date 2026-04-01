---
id: theme-river-chart
title: Theme river chart
description: Visualizes changes in multiple categories over time using a stacked streamgraph layout, emphasizing flow and relative proportions in an organic river-like shape.
doc_type: reference
tags:
  - accelerate
---

import chartsAnalyticsThemeriver from '/img/controls/charts/charts-flow-themeriver.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Theme river charts (or Streamgraphs) visualize changes in categories over time. They emphasize the flow and relative proportions of multiple series, creating an organic, river-like shape.

<Image light={chartsAnalyticsThemeriver} maxWidth={400} position="center" cornerRadius="true" alt="Theme river chart with stacked organic stream bands showing how category volumes flow and change over time." />

## When to use
- **Topic Trends**: Visualizing the popularity of themes in news or social media over time.
- **Resource Allocation**: Showing how budget or manpower shifts between projects.
- **Usage Patterns**: Tracking the volume of different types of network traffic.

## Code example

### XAML
```xml
<controls:ThemeRiverChart Name="ThemeRiverSample" Title="Topic Popularity" Height="400"
                          ItemsSource="{Binding RiverData}"
                          ValuePath="Volume"
                          DatePath="Timestamp"
                          GroupPath="Topic" />
```

### Data model (C#)
```csharp
public record TopicFlow(DateTime Timestamp, string Topic, double Volume);

public ObservableCollection<TopicFlow> RiverData { get; } = new()
{
    new(DateTime.Now.AddDays(-2), "Tech", 100), new(DateTime.Now.AddDays(-2), "Sport", 50),
    new(DateTime.Now.AddDays(-1), "Tech", 120), new(DateTime.Now.AddDays(-1), "Sport", 80),
    new(DateTime.Now, "Tech", 90), new(DateTime.Now, "Sport", 110)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of flow data points. | `null` |
| `ValuePath` | Property determining the thickness of a "stream". | `null` |
| `DatePath` | Property representing the horizontal time axis. | `null` |
| `GroupPath` | Property determining the category of the stream. | `null` |
| `Palette` | Brushes used to distinguish the streams. | Theme-dependent |
