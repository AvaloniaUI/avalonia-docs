---
id: process-flow-chart
title: Process Flow Chart
description: Visualizes sequences of steps, decisions, and logical outcomes using standard flowchart symbols, suitable for business workflows and decision trees.
doc_type: reference
tags:
  - accelerate
---

import chartsFlowProcess from '/img/controls/charts/charts-flow-process.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Process flow charts (or Flowcharts) are used to visualize sequences of steps, decisions, and logical outcomes in a system. They are the standard for mapping business logic or troubleshooting paths.

<Image light={chartsFlowProcess} maxWidth={400} position="center" cornerRadius="true" alt="Process flow chart with start, decision, and action nodes connected by directional arrows showing a workflow sequence." />

## When to Use
- **Workflow Mapping**: Visualizing business processes or approval chains.
- **Decision Trees**: Showing the logic path for troubleshooting or user journeys.
- **System Architecture**: Mapping connections between different modules or services.

## Code Example

### XAML
```xml
<controls:FlowChart Name="FlowChartSample" Title="Troubleshooting Lamp" Height="400"
                    Nodes="{Binding FlowNodes}"
                    Edges="{Binding FlowEdges}" />
```

### Data Model (C#)
```csharp
public record FlowNode(string Id, string Label, string Type);
public record FlowEdge(string Source, string Target, string Label);

public ObservableCollection<FlowNode> FlowNodes { get; } = new()
{
    new("1", "Lamp Off", "Start"),
    new("2", "Plugged In?", "Decision"),
    new("3", "Replace Bulb", "Action")
};

public ObservableCollection<FlowEdge> FlowEdges { get; } = new()
{
    new("1", "2", "Start"),
    new("2", "3", "No")
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Nodes` | The collection of process steps/states. | `null` |
| `Edges` | The collection of logical connections. | `null` |
| `NodeTemplate` | Custom UI for representing the steps. | System default |
| `Orientation` | `Horizontal` or `Vertical` flow. | `Vertical` |
