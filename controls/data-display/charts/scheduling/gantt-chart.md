---
id: gantt-chart
title: Gantt chart
description: Specialized timeline chart for project management, showing task durations, start and end dates, and dependencies on a horizontal time axis.
doc_type: reference
tags:
  - accelerate
---

import chartsTimelineGantt from '/img/controls/charts/charts-timeline-gantt.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Gantt charts are specialized timeline charts used for project management. They illustrate a project schedule by showing task durations, start/end dates, and dependencies.

<Image light={chartsTimelineGantt} maxWidth={400} position="center" cornerRadius="true" alt="Gantt chart showing project tasks as horizontal bars on a time axis with start dates, durations, and dependencies." />

## When to use
- **Project planning**: Identifying the critical path and task overlaps.
- **Resource management**: Tracking when team members are allocated to specific activities.
- **Release tracking**: Visualizing milestones and deadlines for a software release.

## Code example

### XAML
```xml
<controls:GanttChart Name="GanttSample" Title="Q1 Roadmap" Height="400"
                     ItemsSource="{Binding ProjectTasks}"
                     TaskPath="Title"
                     StartPath="BeginDate"
                     EndPath="EndDate" />
```

### Data model (C#)
```csharp
public record ProjectTask(string Title, DateTime BeginDate, DateTime EndDate);

public ObservableCollection<ProjectTask> ProjectTasks { get; } = new()
{
    new("Research", DateTime.Parse("2023-01-01"), DateTime.Parse("2023-01-15")),
    new("Development", DateTime.Parse("2023-01-16"), DateTime.Parse("2023-03-01"))
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of project tasks. | `null` |
| `StartPath` | Property name for the task start time. | `null` |
| `EndPath` | Property name for the task end time. | `null` |
| `TaskPath` | Property name for the task label. | `null` |
| `ShowGrid` | Toggles the background time grid. | `true` |
