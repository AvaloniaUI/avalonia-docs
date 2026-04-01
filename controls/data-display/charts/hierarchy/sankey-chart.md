---
id: sankey-chart
title: Sankey chart
description: Visualizes the flow of data, energy, or materials between stages using proportional-width links to represent quantity through each connection.
doc_type: reference
tags:
  - accelerate
---

import chartsFlowSankey from '/img/controls/charts/charts-flow-sankey.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Sankey charts visualize the flow of data, energy, or materials between stages. The width of the connecting links is proportional to the quantity of the flow.

<Image light={chartsFlowSankey} maxWidth={400} position="center" cornerRadius="true" alt="Sankey chart showing energy flow between stages with link widths proportional to the quantity transferred." />

## When to use
- **Energy audit**: Showing how energy is distributed from source to consumption.
- **Web analytics**: Visualizing the path users take through a website (user journey).
- **Budgeting**: Tracking how funds flow from income sources to various expenses.

## Code example

### XAML
```xml
<controls:SankeyChart Name="SankeySample" Title="Energy Flow" Height="350"
                      ItemsSource="{Binding SankeyData}"
                      SourcePath="Source"
                      TargetPath="Target"
                      ValuePath="Value" />
```

### Data model (C#)
```csharp
public record FlowItem(string Source, string Target, double Value);

public ObservableCollection<FlowItem> SankeyData { get; } = new()
{
    new("Energy", "Electricity", 100),
    new("Energy", "Heat", 50),
    new("Electricity", "Industry", 70),
    new("Electricity", "Home", 30)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of flow data. | `null` |
| `SourcePath` | Property name for the starting node. | `null` |
| `TargetPath` | Property name for the ending node. | `null` |
| `ValuePath` | Property name for the flow magnitude. | `null` |
| `NodePadding` | The vertical space between nodes in a column. | `10` |
| `LinkOpacity` | Transparency of the connecting paths. | `0.5` |
