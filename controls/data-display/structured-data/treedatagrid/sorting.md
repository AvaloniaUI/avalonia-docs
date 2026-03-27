---
id: sorting
title: Sorting
description: How to enable, disable, and customize column sorting in the Avalonia TreeDataGrid control.
doc-type: reference
tags:
  - accelerate
---

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Business or higher.
:::

The `TreeDataGrid` control supports sorting rows by clicking column headers. You can enable or disable sorting per column, provide custom comparison logic, and trigger sorting programmatically. This page covers each of these scenarios.

## Column sorting

### Enable sorting

Sorting is enabled by default for all columns. Users can click column headers to sort.

To disable sorting for the entire grid:

```xml
<TreeDataGrid Source="{Binding Source}"
              CanUserSortColumns="False" />
```

### Make specific columns non-sortable

In XAML, set the `CanUserSortColumn` attribute on the column:

```xml
<TreeDataGridTextColumn Header="Name" Binding="{Binding Name}" CanUserSortColumn="False" />
```

In code-behind, use the options lambda:

```csharp
source.WithTextColumn("Name", x => x.Name, o =>
{
    o.CanUserSortColumn = false;
})
```

### Programmatic sorting

You can sort columns programmatically using the `SortBy` and `ClearSort` methods on the source:

```csharp
// Sort by a specific column
Source.SortBy(Source.Columns[0], ListSortDirection.Ascending);
Source.SortBy(Source.Columns[1], ListSortDirection.Descending);

// Clear sorting on a specific column
Source.ClearSort(Source.Columns[0]);
```

## Custom sorting

You can provide custom sorting logic using comparison delegates in code-behind. The delegates receive `object?` parameters that must be cast to your model type:

```csharp
source.WithTextColumn("Name", x => x.Name, o =>
{
    o.CompareAscending = (a, b) =>
        string.Compare(((Person?)a)?.Name, ((Person?)b)?.Name, StringComparison.OrdinalIgnoreCase);
    o.CompareDescending = (a, b) =>
        string.Compare(((Person?)b)?.Name, ((Person?)a)?.Name, StringComparison.OrdinalIgnoreCase);
})
```

This can be useful if you need to sort by multiple fields within a single column click.

Two separate comparer functions must be provided: one for ascending and one for descending order.

:::note
`TreeDataGrid` supports single-column sorting only. When a user clicks a column header (or you call `SortBy` programmatically), any existing sort on another column is cleared. If you need to sort by multiple fields at once, use a custom comparer on one column that compares by the primary field first, then by secondary fields as tiebreakers.
:::

## See also

- [TreeDataGrid](/controls/data-display/structured-data/treedatagrid/)
- [Expand and collapse](/controls/data-display/structured-data/treedatagrid/expand-and-collapse)
- [Filtering](/controls/data-display/structured-data/treedatagrid/filtering)
- [Selection modes](/controls/data-display/structured-data/treedatagrid/selection-modes)
- [Column types](/controls/data-display/structured-data/treedatagrid/column-types)
