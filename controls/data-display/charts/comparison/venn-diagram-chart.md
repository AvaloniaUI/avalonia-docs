---
id: venn-diagram-chart
title: Venn diagram chart
description: Visualizes set overlap and intersection values, useful for comparing memberships and shared segments.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Venn diagram charts show how sets overlap, which regions are unique, and how much value belongs to each intersection.

## When to use

- **Set comparison**: Show overlap between product audiences, features, or experiments.
- **Shared membership**: Highlight unique and intersecting segments.
- **Selection workflows**: Let users inspect or select regions in the diagram.

## Code example

### XAML

```xml
<charts:VennDiagramChart Title="Audience overlap"
                                   Height="320"
                                   ItemsSource="{Binding VennItems}"
                                   IsSelectionEnabled="True" />
```

### Data model (C#)

```csharp
public ObservableCollection<VennItem> VennItems { get; } = new()
{
    new() { Name = "Newsletter", Sets = ["A"], Value = 45 },
    new() { Name = "Webinars", Sets = ["B"], Value = 30 },
    new() { Name = "Customers", Sets = ["A", "B"], Value = 18 }
};
```

## Common properties (`VennDiagramChart`)

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of `VennItem` regions. | `null` |
| `IsSelectionEnabled` | Whether regions can be selected. | `false` |
| `SelectionMode` | Selection behavior. | `SingleDeselect` |
| `SelectionBrush` | Brush used for selected regions. | Theme-dependent |
| `SelectionStroke` | Stroke used for selected regions. | `null` |
| `SelectionStrokeThickness` | Stroke thickness used for selected regions. | `2.0` |
| `SelectedIndex` | Index of the selected region, or `-1` when nothing is selected. | `-1` |

## Common properties (`VennItem`)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Sets` | Collection of set identifiers, such as `["A"]` or `["A", "B"]`. | Empty collection |
| `Value` | Numeric value represented by the set or intersection. | `0.0` |
| `Name` | Optional region label. | `null` |
| `Fill` | Optional fill brush for the region. | `null` |

## See also

- [Circle packing chart](/controls/data-display/charts/hierarchy/circle-packing-chart)
- [Parliament chart](/controls/data-display/charts/comparison/parliament-chart)
