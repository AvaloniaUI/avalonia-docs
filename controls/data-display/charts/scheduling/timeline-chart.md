---
id: timeline-chart
title: Event timeline chart
description: Visualizes a series of events chronologically along a time axis, providing a clear representation of historical or planned occurrences.
doc_type: reference
tags:
  - accelerate
---

import chartsTimelineHorizontal from '/img/controls/charts/charts-timeline-event.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Event timeline charts visualize a series of events chronologically. They provide a clear representation of historical or planned occurrences along a fixed time axis.

<Image light={chartsTimelineHorizontal} maxWidth={400} position="center" cornerRadius="true" alt="Event timeline chart displaying chronological milestones as labeled markers along a horizontal time axis." />

## When to use
- **Historical records**: Visualizing milestones, product launches, or life events.
- **Audit trails**: Showing system logs or user activities in sequence.
- **Vertical timelines**: Ideal for mobile-friendly or column-based layouts.

## Code example

### XAML
```xml
<controls:EventTimelineChart Name="EventTimelineSample"
                             Title="Product Launches"
                             Height="350"
                             ItemsSource="{Binding TimelineEvents}"
                             DatePath="Date"
                             LabelPath="Event" />
```

### Data model (C#)
```csharp
public record TimelineEvent(DateTime Date, string Event);

public ObservableCollection<TimelineEvent> TimelineEvents { get; } = new()
{
    new(new DateTime(2023, 1, 15), "Project Kickoff"),
    new(new DateTime(2023, 5, 20), "Alpha Release"),
    new(new DateTime(2023, 11, 10), "Production Launch")
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of events. | `null` |
| `DatePath` | Path to the `DateTime` property. | `null` |
| `LabelPath` | Path to the event description. | `null` |
| `Orientation` | `Horizontal` or `Vertical`. | `Horizontal` |
| `MarkerBrush` | Color of the points on the timeline. | Theme-dependent |
