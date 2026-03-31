---
id: radial-tree-chart
title: Radial Tree Chart
description: Hierarchical layout where the root node is at the center and child nodes radiate outward in concentric rings, space-efficient for large trees.
doc_type: reference
tags:
  - accelerate
---

import chartsHierarchicalRadialtree from '/img/controls/charts/charts-hierarchical-radialtree.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Radial tree charts represent hierarchical data where the root is at the center and child nodes radiate outward in concentric circles. This layout is highly space-efficient for large trees.

<Image light={chartsHierarchicalRadialtree} maxWidth={400} position="center" cornerRadius="true" alt="Radial tree chart with a root node at the center and child nodes radiating outward in concentric rings." />

## When to Use
- **Directory Visualizers**: Showing many levels of folders in a compact circular form.
- **Genomic Maps**: Visualizing relationships between many biological entities.
- **Network Topology**: Mapping devices in a network radiating from a central hub.

## Code Example

### XAML
```xml
<controls:RadialTreeChart Name="RadialTreeSample" Height="500"
                          ItemsSource="{Binding RadialNodes}"
                          LabelPath="Label"
                          ChildrenPath="SubItems" />
```

### Data Model (C#)
```csharp
public class RadialItem
{
    public string Label { get; set; } = string.Empty;
    public ObservableCollection<RadialItem> SubItems { get; set; } = new();
}

public ObservableCollection<RadialItem> RadialNodes { get; } = new()
{
    new RadialItem { Label = "Central System", SubItems = {
        new RadialItem { Label = "Subsystem A", SubItems = { new RadialItem { Label = "Module 1" } }},
        new RadialItem { Label = "Subsystem B" }
    }}
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The central root nodes. | `null` |
| `LabelPath` | Path to the text labels on the nodes. | `null` |
| `ChildrenPath` | Path to the collection of outer nodes. | `null` |
| `DotSize` | Diameter of the node points. | `8` |
| `Stroke` | Color of the radial links. | Theme-dependent |
