---
id: indented-tree-chart
title: Indented Tree Chart
description: Represents hierarchies using a file-explorer-style indented layout within a charting container, supporting advanced styling and interactions.
doc_type: reference
tags:
  - accelerate
---

import chartsHierarchicalIndentedtree from '/img/controls/charts/charts-hierarchical-tree.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Indented tree charts represent hierarchies using a layout similar to a standard file explorer or tree view, but within a charting container for advanced styling and interactions.

<Image light={chartsHierarchicalIndentedtree} maxWidth={400} position="center" cornerRadius="true" alt="Indented tree chart showing a file-explorer-style hierarchy with parent and child nodes offset by indentation." />

## When to Use
- **File System Explorer**: Building custom navigators for local or cloud storage.
- **Bill of Materials (BOM)**: Showing a multi-level product structure in manufacturing.
- **Settings/Config**: Grouping complex nested configuration options visually.

## Code Example

### XAML
```xml
<controls:IndentedTreeChart Name="TreeSample" Title="Project Structure" Height="400"
                            ItemsSource="{Binding TreeItems}"
                            LabelPath="Text"
                            ChildrenPath="Children" />
```

### Data Model (C#)
```csharp
public class TreeItem
{
    public string Text { get; set; } = string.Empty;
    public ObservableCollection<TreeItem> Children { get; set; } = new();
}

public ObservableCollection<TreeItem> TreeItems { get; } = new()
{
    new TreeItem { Text = "src", Children = {
        new TreeItem { Text = "Main.cs" },
        new TreeItem { Text = "Utils.cs" }
    }},
    new TreeItem { Text = "assets" }
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The root level nodes. | `null` |
| `LabelPath` | The property name for the item text. | `null` |
| `ChildrenPath` | The property name for child collections. | `null` |
| `IndentStep` | The horizontal offset for each hierarchy level. | `20` |
