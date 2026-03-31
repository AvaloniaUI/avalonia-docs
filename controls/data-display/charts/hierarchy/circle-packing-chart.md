---
id: circle-packing-chart
title: Circle Packing
description: Represents hierarchical data as nested circles, where larger circles contain smaller child circles, showing grouping and relative size at each level.
doc_type: reference
tags:
  - accelerate
---

import chartsHierarchicalCirclepacking from '/img/controls/charts/charts-hierarchical-circlepacking.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Circle packing is a variation of a treemap where nodes are represented as circles. Larger circles represent parent categories, with child categories nested as smaller circles inside them.

<Image light={chartsHierarchicalCirclepacking} maxWidth={400} position="center" cornerRadius="true" alt="Circle packing chart with nested circles where parent categories contain proportionally-sized child circles." />

## When to Use
- **Clustering**: Visualizing groups and sub-groups in a visually appealing, organic way.
- **Aesthetic Overviews**: Dashboards where a "bubble" visual is preferred over rigid grids.
- **Relationship Proximity**: Showing how closely related different items are within a category.

## Code Example

### XAML
```xml
<controls:CirclePackingChart Name="BubbleSample" Title="Category Density" Height="400"
                             ItemsSource="{Binding PackingData}"
                             ValuePath="Density"
                             LabelPath="Label"
                             ChildrenPath="Nodes" />
```

### Data Model (C#)
```csharp
public class PackingNode
{
    public string Label { get; set; } = string.Empty;
    public double Density { get; set; }
    public ObservableCollection<PackingNode> Nodes { get; set; } = new();
}

public ObservableCollection<PackingNode> PackingData { get; } = new()
{
    new PackingNode { Label = "Health", Nodes = {
        new PackingNode { Label = "Fitness", Density = 80 },
        new PackingNode { Label = "Nutrition", Density = 60 }
    }}
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The hierarchical items source. | `null` |
| `ValuePath` | Size/Diameter of the circles. | `null` |
| `LabelPath` | Text displayed near or inside bubbles. | `null` |
| `Palette` | Custom brush collection for the categories. | Auto-generated |
