---
id: network-chart
title: Network chart
description: Displays nodes and edges in a static layout, suitable for infrastructure diagrams, dependency trees, and fixed structural visualizations.
doc-type: reference
tags:
  - avalonia pro
---

import chartsFlowNetwork from '/img/controls/charts/charts-flow-network.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Network charts provide a high-level view of nodes and edges. They are simpler and more static than force-directed graphs, suitable for fixed structural diagrams.

<Image light={chartsFlowNetwork} maxWidth={400} position="center" cornerRadius="true" alt="Network chart with labeled nodes connected by edges showing static relationships in a structural diagram." />

## When to use
- **Infrastructure diagrams**: Showing servers and their connections.
- **Routing tables**: Mapping paths between network points.
- **Dependency trees**: Visualizing module relationships in a system.

## Code example

### XAML
```xml
<charts:NetworkChart Name="NetworkChartSample" Title="Social Network" Height="350"
                       Nodes="{Binding NetworkNodes}"
                       Edges="{Binding NetworkEdges}" />
```

### Data model (C#)
```csharp
public ObservableCollection<NetworkNode> NetworkNodes { get; } = new()
{
    new() { Id = "A", Label = "Alice", X = 0, Y = 0 },
    new() { Id = "B", Label = "Bob", X = 0, Y = 0 },
    new() { Id = "C", Label = "Charlie", X = 0, Y = 0 },
    new() { Id = "D", Label = "David", X = 0, Y = 0 },
    new() { Id = "E", Label = "Eve", X = 0, Y = 0 }
};

public ObservableCollection<NetworkEdge> NetworkEdges { get; } = new()
{
    new() { Source = "A", Target = "B", Weight = 2 },
    new() { Source = "A", Target = "C", Weight = 1 },
    new() { Source = "B", Target = "D", Weight = 3 },
    new() { Source = "C", Target = "E", Weight = 1 },
    new() { Source = "D", Target = "E", Weight = 2 },
    new() { Source = "B", Target = "E", Weight = 1 }
};
```

`NetworkChart` uses `NetworkNode` and `NetworkEdge` objects directly, so labels and weights are defined on those types rather than through extra property-path settings.

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Nodes` | The collection of graph nodes. | `null` |
| `Edges` | The collection of graph edges. | `null` |
