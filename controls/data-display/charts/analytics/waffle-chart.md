---
id: waffle-chart
title: Waffle chart
description: Visualizes percentages or proportions as a grid of squares, showing part-to-whole relationships and goal completion.
doc-type: reference
tags:
  - avalonia pro
---

import chartsAnalyticsWaffle from '/img/controls/charts/charts-analytics-waffle.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Waffle charts (square pie charts) visualize percentages or proportions using a grid of squares. They show part-to-whole relationships in a grid-based format.

<Image light={chartsAnalyticsWaffle} maxWidth={400} position="center" cornerRadius="true" alt="Waffle chart showing a 10x10 grid of squares where filled squares represent a percentage of the total." />

## When to use
- **Goal completion**: Visualizing how close a project is to its 100% target.
- **Demographic proportions**: Showing the distribution of different groups in a population.
- **Project tracking**: Displaying the percentage of completed tasks in a sprint.

## Code example

### XAML
```xml
<WrapPanel HorizontalAlignment="Center">
    <WaffleChart xmlns="https://github.com/avaloniaui" Title="Completion" Value="72" Width="150" Height="150" Rows="10" Columns="10" Margin="0,0,20,8" />
    <WaffleChart Title="Progress" Value="45" Width="150" Height="150" Rows="10" Columns="10" Margin="0,0,0,8" />
</WrapPanel>
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The current value to display. | `0` |
| `MaxValue` | The maximum value for percentage calculation. | `100` |
| `Rows` | Number of rows in the waffle grid. | `10` |
| `Columns` | Number of columns in the waffle grid. | `10` |
| `FilledBrush` | Brush used for the active squares. | Theme-dependent |
| `EmptyBrush` | Brush used for the inactive squares. | Theme-dependent |
| `CellGap` | Gap between waffle cells. | `2.0` |
| `CellCornerRadius` | Corner radius of waffle cells. | `2.0` |
| `ShowPercentage` | Whether to display the percentage text. | `true` |
| `Label` | Optional label displayed below the percentage text. | `null` |
