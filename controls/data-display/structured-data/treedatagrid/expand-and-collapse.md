---
id: expand-and-collapse
title: Expand and collapse operations
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

## Basic Expand/Collapse Operations

For hierarchical TreeDataGrids, you can programmatically expand or collapse rows:

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

### Expand All / Collapse All

The source provides built-in methods for expanding/collapsing all rows:

```csharp
// Expand all rows in the tree
Source.ExpandAll();

// Collapse all rows in the tree
Source.CollapseAll();
```

### Expand or Collapse Based on Condition

You can expand/collapse rows based on a condition:

```csharp
// Expand all rows where Person.Age > 18
Source.ExpandCollapseRecursive(person => person.Age > 18);

// Collapse all rows
Source.ExpandCollapseRecursive(_ => false);
```

## Responding to Expand/Collapse Events

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

## See also

- [TreeDataGrid](/controls/data-display/structured-data/treedatagrid/index)