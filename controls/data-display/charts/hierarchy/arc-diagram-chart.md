---
id: arc-diagram-chart
title: Arc Diagram
description: Network visualization where nodes are placed linearly and connections are drawn as curved arcs, useful for showing relationships in ordered datasets.
doc_type: reference
tags:
  - accelerate
---

import chartsFlowArc from '/img/controls/charts/charts-flow-arc.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Arc diagrams are network visualizations where nodes are placed linearly along an axis. Connections are drawn as curved arcs, with the thickness or color representing link strength.

<Image light={chartsFlowArc} maxWidth={400} position="center" cornerRadius="true" alt="Arc diagram with nodes arranged on a horizontal axis connected by curved arcs representing relationships between items." />

## When to Use
- **Sequence Analysis**: Showing relationships between items in a fixed order (e.g., chapters in a book).
- **Dependency Mapping**: Visualizing call stacks or structural relationships on a single line.
- **Categorical Proximity**: Highlighting clusters of interactions within a linear dataset.

## Code Example

### XAML
```xml
<controls:ArcDiagramChart Name="ArcDiagramSample" Title="Connections" Height="300"
                          Nodes="{Binding ArcNodes}"
                          Links="{Binding ArcLinks}"
                          NodeIdPath="Id"
                          NodeLabelPath="Label"
                          SourcePath="Source"
                          TargetPath="Target"
                          LinkValuePath="Value" />
```

### Data Model (C#)
```csharp
public record ArcNode(string Id, string Label);
public record ArcLink(string Source, string Target, double Value);

public ObservableCollection<ArcNode> ArcNodes { get; } = new()
{
    new("1", "Node 1"), new("2", "Node 2"), new("3", "Node 3")
};

public ObservableCollection<ArcLink> ArcLinks { get; } = new()
{
    new("1", "2", 10), new("1", "3", 5), new("2", "3", 8)
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Nodes` | The collection of items on the axis. | `null` |
| `Links` | The relationships between nodes. | `null` |
| `NodeLabelPath` | Path to the text for each node. | `null` |
| `LinkValuePath` | Path determining the arc thickness/size. | `null` |
| `Orientation` | `Horizontal` or `Vertical`. | `Horizontal` |
