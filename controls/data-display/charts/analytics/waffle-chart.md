---
id: waffle-chart
title: Waffle chart
description: Visualizes percentages or proportions as a grid of squares, clearly showing part-to-whole relationships and goal completion.
doc_type: reference
tags:
  - accelerate
---

import chartsAnalyticsWaffle from '/img/controls/charts/charts-analytics-waffle.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Waffle charts (square pie charts) visualize percentages or proportions using a grid of squares. They are highly effective for showing part-to-whole relationships in a clear, grid-based format.

<Image light={chartsAnalyticsWaffle} maxWidth={400} position="center" cornerRadius="true" alt="Waffle chart showing a 10x10 grid of squares where filled squares represent a percentage of the total." />

## When to use
- **Goal completion**: Visualizing how close a project is to its 100% target.
- **Demographic proportions**: Showing the distribution of different groups in a population.
- **Project tracking**: Displaying the percentage of completed tasks in a sprint.

## Code example

### XAML
```xml
<controls:WaffleChart Title="Completion" Value="72" Width="150" Height="150" Rows="10" Columns="10" />
```

### Data model (C#)
```csharp
// WaffleChart usually takes a simple numeric Value
public double CompletionPercentage { get; set; } = 72;
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The percentage value to fill (0 to 100). | `0` |
| `Rows` / `Columns` | The grid dimensions (usually 10x10). | `10` |
| `Fill` | Color used for the active squares. | Theme-dependent |
| `BackgroundFill` | Color used for the inactive squares. | Semi-transparent |
| `Title` | Label displayed above the grid. | `null` |
