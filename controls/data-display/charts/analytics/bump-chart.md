---
id: bump-chart
title: Bump chart
description: Visualizes changes in rank over time, focusing on relative position of categories rather than absolute values.
doc_type: reference
tags:
  - accelerate
---

import chartsAnalyticsBump from '/img/controls/charts/charts-statistical-bump.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Bump charts are a variation of line charts designed to visualize changes in rank over time. They focus on the relative position of categories rather than their absolute values.

<Image light={chartsAnalyticsBump} maxWidth={400} position="center" cornerRadius="true" alt="Bump chart showing rank changes over time with smooth curved lines connecting each entity's position across periods." />

## When to use
- **Popularity rankings**: Showing how songs or movies move up and down a top-10 list.
- **Market share**: Visualizing the competition between brands for the top spot.
- **Tournament standings**: Tracking the relative performance of teams across stages.

## Code example

### XAML
```xml
<controls:BumpChart Title="Market Ranking" Height="350"
                    ItemsSource="{Binding RankingData}"
                    RankPath="Rank"
                    DatePath="Period"
                    GroupPath="Brand" />
```

### Data model (C#)
```csharp
public record MarketRank(string Period, string Brand, int Rank);

public ObservableCollection<MarketRank> RankingData { get; } = new()
{
    new("Jan", "Brand X", 1), new("Jan", "Brand Y", 2),
    new("Feb", "Brand X", 2), new("Feb", "Brand Y", 1)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of ranking points. | `null` |
| `RankPath` | Property representing the numerical rank. | `null` |
| `DatePath` | Property representing the horizontal sequence. | `null` |
| `GroupPath` | Property representing the brand/entity. | `null` |
| `LineSmoothness` | Controls the curvature of the rank paths. | `0.5` |
