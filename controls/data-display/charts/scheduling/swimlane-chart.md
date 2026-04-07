---
id: swimlane-chart
title: Swimlane chart
description: Organizes tasks or processes into distinct horizontal lanes, showing ownership and sequence across departments, roles, or team members over time.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsTimelineSwimlane from '/img/controls/charts/charts-timeline-swimlane.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Swimlane charts organize tasks or processes into distinct horizontal or vertical "lanes." They are the gold standard for visualizing workflows across different departments or roles.

<Image light={chartsTimelineSwimlane} maxWidth={400} position="center" cornerRadius="true" alt="Swimlane chart organizing tasks into horizontal lanes by department or role showing ownership and time overlap." />

## When to use
- **Process mapping**: Showing how a request moves between Sales, Engineering, and Support.
- **Project scheduling**: Visualizing task ownership across team members.
- **Cross-functional flows**: Clarifying responsibilities in a complex business process.

## Code example

### XAML
```xml
<controls:SwimlaneChart Name="SwimlaneSample" Title="Design Workflow" Height="400"
                        ItemsSource="{Binding SwimlaneTasks}"
                        LanePath="Lane"
                        TaskNamePath="Task"
                        StartPath="Start"
                        EndPath="End" />
```

### Data model (C#)
```csharp
public record SwimlaneTask(string Lane, string Task, DateTime Start, DateTime End);

public ObservableCollection<SwimlaneTask> SwimlaneTasks { get; } = new()
{
    new("Design", "UI Mockups", DateTime.Now, DateTime.Now.AddDays(3)),
    new("Dev", "API Integration", DateTime.Now.AddDays(2), DateTime.Now.AddDays(7))
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of tasks/items. | `null` |
| `LanePath` | Determines which lane the task belongs to. | `null` |
| `TaskNamePath` | Label for the individual task block. | `null` |
| `StartPath` / `EndPath` | Time bounds for the task. | `null` |
| `LaneBrush` | Background color for the swimlanes. | Semi-transparent |
