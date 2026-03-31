---
id: mindmap-chart
title: Mindmap / Brainstorming
description: Divergent diagram that radiates topics outward from a central node, used for brainstorming, project scoping, and knowledge representation.
doc_type: reference
tags:
  - accelerate
---

import chartsFlowMindmap from '/img/controls/charts/charts-flow-mindmap.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Mindmaps are divergent diagrams used for brainstorming and project planning, radiating outward from a central topic to related ideas and sub-tasks.

<Image light={chartsFlowMindmap} maxWidth={400} position="center" cornerRadius="true" alt="Mindmap diagram radiating outward from a central topic node to connected sub-topics and ideas." />

## When to Use
- **Idea Generation**: Capturing and organizing thoughts during a meeting.
- **Project Scope**: Mapping out different modules and their requirements.
- **Knowledge Representation**: Visualizing complex concepts and their interconnectedness.

## Code Example

### XAML
```xml
<controls:FlowChart Name="MindmapSample" Title="Project Alpha Brainstorm" Height="600"
                    Nodes="{Binding MindmapNodes}"
                    Edges="{Binding MindmapEdges}"
                    CornerRadius="20" />
```

### Data Model (C#)
```csharp
public record MindmapItem(string Id, string Label);
public record MindmapLink(string Source, string Target);

public ObservableCollection<MindmapItem> MindmapNodes { get; } = new()
{
    new("Root", "Main Goal"),
    new("Idea1", "Design Phase"),
    new("Idea2", "Implementation")
};

public ObservableCollection<MindmapLink> MindmapEdges { get; } = new()
{
    new("Root", "Idea1"),
    new("Root", "Idea2")
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Nodes` | Collection of nodes (topics). | `null` |
| `Edges` | Collection of connections (relationships). | `null` |
| `CornerRadius` | Rounding of the node boxes. | `0` |
| `FlowDirection` | `Left`, `Right`, `Horizontal`, `Vertical`. | `Horizontal` |
