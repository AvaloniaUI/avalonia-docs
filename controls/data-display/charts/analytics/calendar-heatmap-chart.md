---
id: calendar-heatmap-chart
title: Calendar heatmap chart
description: Shows daily activity intensity in a calendar grid, useful for contribution histories, usage tracking, and habit streaks.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Calendar heatmaps render daily values in a week-by-week grid, similar to contribution graphs and activity trackers.

## When to use

- **Activity tracking**: Show commits, logins, exercises, or transactions by day.
- **Seasonality review**: Spot quiet and active periods across a year.
- **Retention views**: Highlight streaks and gaps without a full time-series chart.

## Code example

### XAML

```xml
<CalendarHeatmapChart xmlns="https://github.com/avaloniaui" Title="Repository activity"
                               Height="180"
                               ItemsSource="{Binding DailyActivity}"
                               DatePath="Date"
                               ValuePath="Count"
                               WeeksToShow="26" />
```

### Data model (C#)

```csharp
using System;

public record DailyCount(DateTime Date, double Count);

public ObservableCollection<DailyCount> DailyActivity { get; } = new()
{
    new(DateTime.Today.AddDays(-3), 5),
    new(DateTime.Today.AddDays(-2), 2),
    new(DateTime.Today.AddDays(-1), 7)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of daily activity items. | `null` |
| `DatePath` | Path to the date value for each item. | `null` |
| `ValuePath` | Path to the numeric intensity value. | `null` |
| `CellSize` | Size of each day cell in pixels. | `12.0` |
| `CellGap` | Gap between day cells. | `2.0` |
| `EmptyCellBrush` | Brush used for days with no value. | `null` |
| `LowBrush` | Brush used for low intensity values. | `null` |
| `MediumBrush` | Brush used for medium intensity values. | `null` |
| `HighBrush` | Brush used for high intensity values. | `null` |
| `MaxBrush` | Brush used for the highest intensity values. | `null` |
| `ShowMonthLabels` | Whether to show month labels above the grid. | `true` |
| `ShowDayLabels` | Whether to show day-of-week labels. | `true` |
| `LabelFontSize` | Font size used for month labels, day labels, and legend text. | `10.0` |
| `LabelForeground` | Brush used for calendar and legend labels. When `null`, the chart uses the effective label foreground. | `null` |
| `WeeksToShow` | Number of weeks to display. | `52` |
| `IsHighlightEnabled` | Enables hover highlighting for calendar cells. | `false` |
| `ReferenceDate` | Optional end date used as the calendar anchor. | `null` |

## See also

- [Heatmap chart](/controls/data-display/charts/analytics/heatmap-chart)
- [Timeline chart](/controls/data-display/charts/scheduling/timeline-chart)
