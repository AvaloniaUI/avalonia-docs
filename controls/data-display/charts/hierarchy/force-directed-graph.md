---
id: force-directed-graph
title: Force-Directed Graph
description: Lays out network nodes using physical simulations to reveal clusters and structural relationships in complex interconnected data.
doc_type: reference
tags:
  - accelerate
---

import chartsFlowForceDirected from '/img/controls/charts/charts-flow-force-directed.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Force-directed graphs use physical simulations to lay out network nodes gracefully. They are the best choice for discovering clusters and structural relationships in complex interconnected data.

<Image light={chartsFlowForceDirected} maxWidth={400} position="center" cornerRadius="true" alt="Force-directed graph with nodes and connecting edges arranged by physics simulation to reveal clusters." />

## When to use
- **Social Networks**: Visualizing friendships, followers, or community structures.
- **Knowledge Graphs**: Showing relationships between concepts, entities, or research papers.
- **System Architecture**: Mapping microservices and their communication links.

## Code example

### XAML
```xml
<controls:ForceDirectedGraph Name="ForceGraphSample" Title="Network Graph" Height="400"
                             NodesSource="{Binding ForceNodes}"
                             EdgesSource="{Binding ForceEdges}"
                             NodeIdPath="Id"
                             NodeLabelPath="Label"
                             EdgeSourcePath="From"
                             EdgeTargetPath="To" />
```

### Data model (C#)
```csharp
public record GraphNode(string Id, string Label);
public record GraphEdge(string From, string To);

public ObservableCollection<GraphNode> ForceNodes { get; } = new()
{
    new("1", "Main Hub"), new("2", "Service A"), new("3", "Service B")
};

public ObservableCollection<GraphEdge> ForceEdges { get; } = new()
{
    new("1", "2"), new("1", "3")
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `NodesSource` | Collection of nodes. | `null` |
| `EdgesSource` | Collection of links. | `null` |
| `Strength` | Power of the repulsive force between nodes. | `-30` |
| `Distance` | Targeted length of the link lines. | `50` |
| `IsAnimated` | Toggles the force-layout simulation. | `true` |
