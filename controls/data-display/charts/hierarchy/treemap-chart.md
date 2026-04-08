---
id: treemap-chart
title: Treemap chart
description: Visualizes hierarchical data as nested rectangles sized by value, useful for comparing proportions within categories such as disk usage or budgets.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsHierarchicalTreemap from '/img/controls/charts/charts-hierarchical-treemap.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

TreeMap charts visualize hierarchical or flat data as a set of nested rectangles. Each branch is given a rectangle, sized according to its value, and tiled with smaller sub-rectangles.

<Image light={chartsHierarchicalTreemap} maxWidth={400} position="center" cornerRadius="true" alt="Treemap chart showing nested rectangles sized proportionally to disk usage values for different folders." />

## When to use
- **Resource usage**: Visualizing disk space or memory consumption by file/process.
- **Proportional analysis**: Comparing the weight of items within categories.
- **Complex hierarchies**: When you need to show many hierarchical items in a single view.

## Code example

### XAML
```xml
<controls:TreeMapChart Name="TreeMapSample" Title="Disk Usage" Height="400"
                       ItemsSource="{Binding TreeMapData}" ValuePath="Size" LabelPath="Name" />
```

### Data model (C#)
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

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The chart title. | `null` |
| `ItemsSource` | The collection of data items. | `null` |
| `ValuePath` | Path to the property representing area size. | `null` |
| `LabelPath` | Path to the property for the labels. | `null` |
| `Gap` | Gap between rectangles. | `1.0` |
| `IsSelectionEnabled` | Enables node selection. | false |
| `SelectionMode` | The selection mode, e.g. `None`, `Single`, `SingleDeselect`, or `Multiple`. | `SingleDeselect` |
| `SelectionBrush` | Brush used to highlight selected segments. | `FromRgb(49, 74, 110)` |
| `SelectionStroke` | Brush used to outline selected segments. | Uses theme default. |
| `SelectionStrokeThickness` | Thickness of the outline of selected segments. | 2.0 |
| `SelectedIndex` | Index of the primary selected node. | -1 |
