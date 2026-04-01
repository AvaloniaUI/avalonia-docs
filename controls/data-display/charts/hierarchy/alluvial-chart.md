---
id: alluvial-chart
title: Alluvial chart
description: Represents structural changes across sequential stages using flowing bands between vertical node columns, similar to a Sankey diagram.
doc_type: reference
tags:
  - accelerate
---

import chartsFlowAlluvial from '/img/controls/charts/charts-flow-alluvial.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Alluvial charts represent changes in structure over time or across categories. They are similar to Sankey diagrams but are typically organized into distinct vertical columns.

<Image light={chartsFlowAlluvial} maxWidth={400} position="center" cornerRadius="true" alt="Alluvial chart with vertical node columns connected by flowing bands representing categorical transitions between stages." />

## When to use
- **Workflow Analysis**: Tracking how items move through sequential process stages.
- **Categorical Flow**: Visualizing how members of one category belong to others (e.g., voters' changing affiliations).
- **Structural Shifts**: Showing how a population's grouping changes between two points in time.

## Code example

### XAML
```xml
<controls:AlluvialChart Name="AlluvialChartSample" Title="Category Flow" Height="350"
                        Nodes="{Binding AlluvialNodes}"
                        Links="{Binding AlluvialLinks}" />
```

### Data model (C#)
```csharp
public record AlluvialNode(string Id, string Label, int Column);
public record AlluvialLink(string Source, string Target, double Value);

public ObservableCollection<AlluvialNode> AlluvialNodes { get; } = new()
{
    new("A", "Category A", 0), new("B", "Category B", 0),
    new("X", "Stage X", 1), new("Y", "Stage Y", 1)
};

public ObservableCollection<AlluvialLink> AlluvialLinks { get; } = new()
{
    new("A", "X", 40), new("A", "Y", 10),
    new("B", "X", 5), new("B", "Y", 45)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Nodes` | The collection of categorical nodes (columns). | `null` |
| `Links` | The collection of connections between nodes. | `null` |
| `NodeWidth` | The thickness of the vertical bars (nodes). | `20` |
| `Fill` | Brush used for the flow links. | Semi-transparent |
| `Stroke` | Outline color of the nodes/links. | Theme-dependent |
