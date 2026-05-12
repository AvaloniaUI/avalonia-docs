---
id: icicle-chart
title: Icicle chart
description: Visualizes hierarchical data as adjacent rectangles per level, showing parent-child relationships for taxonomy and structural analysis.
doc-type: reference
tags:
  - avalonia pro
---

import chartsHierarchicalIcicle from '/img/controls/charts/charts-hierarchical-icicle.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Icicle charts visualize hierarchical data using rectangles placed side by side. Each level in the hierarchy's depth is represented by a row or column, showing parent-child relationships across levels.

<Image light={chartsHierarchicalIcicle} maxWidth={400} position="center" cornerRadius="true" alt="Icicle chart showing hierarchical levels as adjacent rectangular rows where width represents relative value." />

## When to use
- **Structural analysis**: Inspecting codebases, directory structures, or large taxonomies.
- **Performance profiling**: Visualizing call stacks or execution paths.
- **Relationship discovery**: Finding the root cause of leaf-node values within a large tree.

## Code example

### XAML
```xml
<charts:IcicleChart Name="IcicleChartSample" Title="File System" Height="300"
                      ItemsSource="{Binding IcicleData}"
                      ValuePath="Size"
                      LabelPath="Name" />
```

### Data model (C#)
```csharp
public record TreeMapItem(string Name, double Size);

public ObservableCollection<TreeMapItem> IcicleData { get; } = new()
{
    new("src", 60),
    new("tests", 25),
    new("docs", 15)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The hierarchical data source. | `null` |
| `ValuePath` | Property name determining rectangle width. | `null` |
| `LabelPath` | Property name for the text label. | `null` |
| `ChildrenPath` | Path to the collection of child nodes. | `null` |
| `Orientation` | Orientation of the chart, `Horizontal` or `Vertical`. | `Vertical` |
| `TileGap` | Gap between adjacent rectangles. | `1.0` |
