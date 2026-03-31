---
id: treemap-chart
title: TreeMap Chart
description: Visualizes hierarchical data as nested rectangles sized by value, useful for comparing proportions within categories such as disk usage or budgets.
doc_type: reference
tags:
  - accelerate
---

import chartsHierarchicalTreemap from '/img/controls/charts/charts-hierarchical-treemap.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

TreeMap charts visualize hierarchical data as a set of nested rectangles. Each branch is given a rectangle, sized according to its value, and tiled with smaller sub-rectangles.

<Image light={chartsHierarchicalTreemap} maxWidth={400} position="center" cornerRadius="true" alt="Treemap chart showing nested rectangles sized proportionally to disk usage values for different folders." />

## When to Use
- **Resource Usage**: Visualizing disk space or memory consumption by file/process.
- **Proportional Analysis**: Comparing the weight of items within Categories.
- **Complex Hierarchies**: When you need to show many hierarchical items in a single view.

## Code Example

### XAML
```xml
<controls:TreeMapChart Name="TreeMapSample" Title="Disk Usage" Height="400"
                       ItemsSource="{Binding TreeMapData}" ValuePath="Size" LabelPath="Name" />
```

### Data Model (C#)
```csharp
public record FileSystemItem(string Name, long Size);

public ObservableCollection<FileSystemItem> TreeMapData { get; } = new()
{
    new("Documents", 4500),
    new("Downloads", 2800),
    new("Pictures", 3200),
    new("Videos", 8500),
    new("System", 12000)
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The chart title. | `null` |
| `ItemsSource` | The collection of data items. | `null` |
| `ValuePath` | Path to the property representing area size. | `null` |
| `LabelPath` | Path to the property for the labels. | `null` |
| `LeafFill` | Brush used for the leaf nodes. | Auto-generated |
| `BorderBrush` | Color of the borders between rectangles. | `White` |
