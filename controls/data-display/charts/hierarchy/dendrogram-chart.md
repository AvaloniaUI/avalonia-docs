---
id: dendrogram-chart
title: Dendrogram chart
description: Tree diagram that illustrates hierarchical clustering by showing how items are progressively merged into branches, used in statistical and biological analysis.
doc_type: reference
tags:
  - accelerate
---

import chartsHierarchicalDendrogram from '/img/controls/charts/charts-hierarchical-dendrogram.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Dendrograms are tree diagrams frequently used to illustrate the arrangement of the clusters produced by hierarchical clustering. They show how items are merged into a single branch.

<Image light={chartsHierarchicalDendrogram} maxWidth={400} position="center" cornerRadius="true" alt="Dendrogram tree diagram showing hierarchical clustering with branches merging from leaf nodes toward the root." />

## When to use
- **Cluster analysis**: Visualizing the results of statistical clustering algorithms.
- **Phylogenetic trees**: Showing evolutionary relationships between different species.
- **Structural merges**: Representing data that stems from many parts but converges into a few groups.

## Code example

### XAML
```xml
<controls:DendrogramChart Name="DendrogramSample" Height="400"
                          ItemsSource="{Binding ClusterData}"
                          LabelPath="Name"
                          ChildrenPath="SubClusters" />
```

### Data model (C#)
```csharp
public class ClusterNode
{
    public string Name { get; set; } = string.Empty;
    public ObservableCollection<ClusterNode> SubClusters { get; set; } = new();
}

public ObservableCollection<ClusterNode> ClusterData { get; } = new()
{
    new ClusterNode { Name = "Root", SubClusters = {
        new ClusterNode { Name = "Cluster 1", SubClusters = { new ClusterNode { Name = "Item A" } }},
        new ClusterNode { Name = "Cluster 2" }
    }}
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The hierarchical cluster data. | `null` |
| `LabelPath` | Property for the leaf or node names. | `null` |
| `ChildrenPath` | Path to the nested cluster items. | `null` |
| `Orientation` | `LeftToRight`, `RightToLeft`, `TopToBottom`. | `LeftToRight` |
| `Stroke` | Color of the connection branches. | Theme-dependent |
