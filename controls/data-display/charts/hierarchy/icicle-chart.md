---
id: icicle-chart
title: Icicle chart
description: Visualizes hierarchical data as adjacent rectangles per level, making parent-child relationships easy to trace for taxonomy and structural analysis.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsHierarchicalIcicle from '/img/controls/charts/charts-hierarchical-icicle.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Icicle charts visualize hierarchical data using rectangles placed side by side. Each level in the hierarchy's depth is represented by a row or column, making parent-child relationships easy to trace.

<Image light={chartsHierarchicalIcicle} maxWidth={400} position="center" cornerRadius="true" alt="Icicle chart showing hierarchical levels as adjacent rectangular rows where width represents relative value." />

## When to use
- **Structural analysis**: Inspecting codebases, directory structures, or large taxonomies.
- **Performance profiling**: Visualizing call stacks or execution paths.
- **Relationship discovery**: Finding the root cause of leaf-node values within a large tree.

## Code example

### XAML
```xml
<controls:IcicleChart Name="IcicleSample" Title="Taxonomy" Height="400"
                      ItemsSource="{Binding IcicleData}"
                      ValuePath="Weight"
                      LabelPath="Title"
                      ChildrenPath="SubItems" />
```

### Data model (C#)
```csharp
public class IcicleItem
{
    public string Title { get; set; } = string.Empty;
    public double Weight { get; set; }
    public ObservableCollection<IcicleItem> SubItems { get; set; } = new();
}

public ObservableCollection<IcicleItem> IcicleData { get; } = new()
{
    new IcicleItem { Title = "Mammals", SubItems = {
        new IcicleItem { Title = "Canines", Weight = 45 },
        new IcicleItem { Title = "Felines", Weight = 55 }
    }}
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The hierarchical data source. | `null` |
| `ValuePath` | Property name determining rectangle width. | `null` |
| `LabelPath` | Property name for the text label. | `null` |
| `Orientation` | `Horizontal` or `Vertical`. | `Horizontal` |
| `Palette` | Automatic coloring for levels/nodes. | Theme-dependent |
