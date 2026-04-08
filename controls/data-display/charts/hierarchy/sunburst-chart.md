---
id: sunburst-chart
title: Sunburst chart
description: Visualizes hierarchical data as concentric rings, where each ring represents a level and segments show the proportion of each node within its parent.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsHierarchicalSunburst from '/img/controls/charts/charts-hierarchical-sunburst.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Sunburst charts are used to visualize hierarchical data through a series of concentric rings. Each ring represents a level in the hierarchy, with the inner circle being the root level.

<Image light={chartsHierarchicalSunburst} maxWidth={400} position="center" cornerRadius="true" alt="Sunburst chart with concentric rings where each ring represents a hierarchy level and segments show proportions." />

## When to use
- **Nested data**: Visualizing complex hierarchies with multiple levels.
- **Space-efficiency**: When you need a compact alternative to a tree diagram.
- **Drill-down**: Effectively showing the breakdown of segments at each level.

## Code example

### XAML
```xml
<controls:SunburstChart Title="Organization Structure"
                        Height="400"
                        ItemsSource="{Binding SunburstData}"
                        ValuePath="Size"
                        LabelPath="Name"
                        ChildrenPath="Children"
                        InnerRadiusFactor="0.2"
                        RingThickness="40"
                        GapAngle="2" />
```

### Data model (C#)
```csharp
public class HierarchicalNode
{
    public string Name { get; set; } = string.Empty;
    public double Size { get; set; }
    public ObservableCollection<HierarchicalNode> Children { get; set; } = new();

    public HierarchicalNode(string name, double size = 0)
    {
        Name = name;
        Size = size;
    }
}

public ObservableCollection<HierarchicalNode> SunburstData { get; } = new()
{
    new HierarchicalNode("Root")
    {
        Children = new()
        {
            new HierarchicalNode("Branch A", 50),
            new HierarchicalNode("Branch B")
            {
                Children = new() { new HierarchicalNode("Leaf B1", 20), new HierarchicalNode("Leaf B2", 30) }
            }
        }
    }
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The chart title. | `null` |
| `ItemsSource` | The collection of root-level data items. | `null` |
| `ValuePath` | Path to the property representing segment size. | `null` |
| `LabelPath` | Path to the property for segment labels. | `null` |
| `ChildrenPath` | Path to the collection of child items. | `null` |
| `InnerRadiusFactor` | Relative size of the center hole from `0.0` to `1.0`. | `0.2` |
| `RingThickness` | Thickness of each ring. | 40.0 |
| `GapAngle` | Gap angle between segments. | 2.0 |
| `IsSelectionEnabled` | Whether data point selection is enabled. | `false` |
| `SelectionMode` | The selection mode, e.g. `None`, `Single`, `SingleDeselect`, or `Multiple`. | `SingleDeselect` |
| `SelectionBrush` | Brush used to highlight selected segments. | `FromRgb(49, 74, 110)` |
| `SelectionStroke` | Brush used to outline selected segments. | Uses theme default. |
| `SelectionStrokeThickness` | Thickness of the outline of selected segments. | 2.0 |
| `SelectedIndex` | Index of the selected data point. | -1 |
