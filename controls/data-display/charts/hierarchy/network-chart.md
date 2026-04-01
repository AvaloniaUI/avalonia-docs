---
id: network-chart
title: Network chart
description: Displays nodes and edges in a static layout, suitable for infrastructure diagrams, dependency trees, and fixed structural visualizations.
doc_type: reference
tags:
  - accelerate
---

import chartsFlowNetwork from '/img/controls/charts/charts-flow-network.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Network charts provide a high-level view of nodes and edges. They are simpler and more static than force-directed graphs, suitable for fixed structural diagrams.

<Image light={chartsFlowNetwork} maxWidth={400} position="center" cornerRadius="true" alt="Network chart with labeled nodes connected by edges showing static relationships in a structural diagram." />

## When to use
- **Infrastructure Diagrams**: Showing servers and their connections.
- **Routing Tables**: Mapping paths between network points.
- **Dependency Trees**: Visualizing module relationships in a system.

## Code example

### XAML
```xml
<controls:NetworkChart Name="NetworkChartSample" Title="Social Network" Height="350"
                       Nodes="{Binding NetworkNodes}"
                       Edges="{Binding NetworkEdges}" />
```

### Data model (C#)
```csharp
public record GraphNode(string Id, string Label);
public record GraphEdge(string Source, string Target);

public ObservableCollection<GraphNode> NetworkNodes { get; } = new()
{
    new("A", "Root"), new("B", "Child 1"), new("C", "Child 2")
};

public ObservableCollection<GraphEdge> NetworkEdges { get; } = new()
{
    new("A", "B"), new("A", "C")
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Nodes` | The collection of graph nodes. | `null` |
| `Edges` | The collection of graph edges. | `null` |
| `Stroke` | Color of the connection lines. | Theme-dependent |
| `LabelPosition` | `Inside`, `Outside`, or `None`. | `Inside` |
