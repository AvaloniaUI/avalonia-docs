---
id: expand-and-collapse
title: Expand and collapse operations
description: Learn how to programmatically expand and collapse rows in a hierarchical TreeDataGrid, respond to expand/collapse events, and implement lazy loading on demand.
doc-type: reference
tags:
  - accelerate
---

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Business or higher.
:::

When you use a hierarchical `TreeDataGrid`, your users can expand and collapse rows to navigate parent-child relationships. Avalonia provides methods on `HierarchicalTreeDataGridSource<T>` that let you control this behavior programmatically, whether you need to expand a single node, expand all nodes at once, or conditionally expand rows that match a filter. You can also subscribe to events that fire before and after each expand or collapse operation.

## Basic expand and collapse operations

You can programmatically expand or collapse rows in a hierarchical `TreeDataGrid`:

```csharp
var Source = new HierarchicalTreeDataGridSource<Person>(_people)
{
    Columns = { /* columns */ }
};

// Expand a specific node by index path
Source.Expand(new IndexPath(0));  // Expand first root item

// Collapse a node
Source.Collapse(new IndexPath(0));
```

:::info
For more information about `IndexPath` see [Selection modes](/controls/data-display/structured-data/treedatagrid/selection-modes)
:::

### Expand all and collapse all

The source provides built-in methods for expanding or collapsing all rows:

```csharp
// Expand all rows in the tree
Source.ExpandAll();

// Collapse all rows in the tree
Source.CollapseAll();
```

### Expand or collapse based on a condition

You can expand or collapse rows based on a condition:

```csharp
// Expand all rows where Person.Age > 18
Source.ExpandCollapseRecursive(person => person.Age > 18);

// Collapse all rows
Source.ExpandCollapseRecursive(_ => false);
```

## Responding to expand and collapse events

You can handle expand and collapse events to load data on demand or perform other actions:

```csharp
Source.RowExpanding += (sender, e) =>
{
    var person = e.Row.Model;
    var indexPath = e.Row.ModelIndexPath;
    Debug.WriteLine($"Expanding: {person.Name} at {indexPath}");
};

Source.RowExpanded += (sender, e) =>
{
    var person = e.Row.Model;
    var indexPath = e.Row.ModelIndexPath;
    Debug.WriteLine($"Expanded: {person.Name} at {indexPath}");
};

Source.RowCollapsing += (sender, e) =>
{
    var person = e.Row.Model;
    Debug.WriteLine($"Collapsing: {person.Name}");
};

Source.RowCollapsed += (sender, e) =>
{
    var person = e.Row.Model;
    Debug.WriteLine($"Collapsed: {person.Name}");
};
```

## Lazy loading data on expand

A common pattern is to load child data on demand when the user expands a row, rather than loading your entire tree upfront. You can use the `RowExpanding` event to fetch children just before a row opens. This keeps initial load times fast, especially for large or remote data sets.

```csharp
Source.RowExpanding += async (sender, e) =>
{
    var person = e.Row.Model;

    if (!person.ChildrenLoaded)
    {
        // Signal that the operation is async so the grid waits for it
        var deferral = e.GetDeferral();

        try
        {
            var children = await MyDataService.LoadChildrenAsync(person.Id);
            person.Children.Clear();
            person.Children.AddRange(children);
            person.ChildrenLoaded = true;
        }
        finally
        {
            deferral.Dispose();
        }
    }
};
```

:::tip
Call `e.GetDeferral()` in your `RowExpanding` handler to tell the grid to wait until your asynchronous work completes before displaying the child rows. Dispose the deferral when loading finishes.
:::

## See also

- [TreeDataGrid](/controls/data-display/structured-data/treedatagrid/)
- [Sorting](/controls/data-display/structured-data/treedatagrid/sorting)
- [Filtering](/controls/data-display/structured-data/treedatagrid/filtering)
- [Selection modes](/controls/data-display/structured-data/treedatagrid/selection-modes)
- [Column types](/controls/data-display/structured-data/treedatagrid/column-types)