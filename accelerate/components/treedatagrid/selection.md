---
description: Working with selection in TreeDataGrid
---

# Selection

Two selection modes are supported:

- **Row selection** allows the user to select whole rows
- **Cell selection** allows the user to select individual cells

Both selection types support either single or multiple selection. The default selection type is single row selection.

## Index Paths

Because `TreeDataGrid` supports hierarchical data, using a simple index to identify a row in the data source isn't enough. Instead indexes are represented using the `IndexPath` struct.

An `IndexPath` is an array of indexes, each element of which specifies the index at a successively deeper level in the hierarchy of the data.

Consider the following data source:

```
|- A
|  |- B
|  |- C
|     |- D
|- E
```

- `A` has an index path of `0` as it is the first item at the root of the hierarchy
- `B` has an index path of `0,0` as it is the first child of the first item
- `C` has an index path of `0,1` as it is the second child of the first item
- `D` has an index path of `0,1,0` as it is the first child of `C`
- `E` has an index path of `1` as it is the second item in the root

`IndexPath` is an immutable struct which is constructed with an array of integers, e.g.: `new IndexPath(0, 1, 0)`. There is also an implicit conversion from `int` for when working with a flat data source.

## Row Selection

Row selection is the default and is exposed via the `RowSelection` property on the source.

Row selection is stored in an instance of the `TreeDataGridRowSelectionModel<TModel>` class.

The default is single selection. To enable multiple selection set the the `SingleSelect` property to `false`, e.g.:

```csharp
Source = new FlatTreeDataGridSource<Person>(_people)
{
    Columns =
    {
        new TextColumn<Person, string>("First Name", x => x.FirstName),
        new TextColumn<Person, string>("Last Name", x => x.LastName),
        new TextColumn<Person, int>("Age", x => x.Age),
    },
};

Source.RowSelection!.SingleSelect = false;
```

### Getting Selected Items

Access selected items through the selection model:

```csharp
// Get single selected item
if (PersonSource.RowSelection?.SelectedItem is Person selectedPerson)
{
    Debug.WriteLine($"Selected: {selectedPerson.Name}");
}

// Get multiple selected items
var selectedItems = PersonSource.RowSelection?.SelectedItems;
if (selectedItems != null)
{
    foreach (var item in selectedItems.OfType<Person>())
    {
        Debug.WriteLine($"Selected: {item.Name}");
    }
}
```

### Programmatically Selecting Rows

You can select rows programmatically using the selection model:

```csharp
var selection = PersonSource.RowSelection;

// Select by index
selection.SelectedIndex = 2;
selection.SelectedIndex = new IndexPath(2);
selection.SelectedIndex = new IndexPath(2, 1);

// Clear selection
selection.Clear();

// Select multiple items
selection.Select(2);
selection.Select(new IndexPath(2, 1));

// Deselect multiple items
selection.Deselect(2);
selection.Deselect(new IndexPath(2, 1));

// Batch selection changes
selection.BeginBatchUpdate();
selection.Select(0);
selection.Select(1);
selection.Deselect(2);
selection.EndBatchUpdate();
```

### Selection Changed Event

Handle selection changes with the `SelectionChanged` event:

```csharp
PersonSource.RowSelection.SelectionChanged += (sender, e) =>
{
    Debug.WriteLine($"Selection changed");
    Debug.WriteLine($"Added: {e.SelectedItems.Count}");
    Debug.WriteLine($"Removed: {e.DeselectedItems.Count}");
};
```

## Cell Selection

To enable cell selection for a TreeDataGrid source, assign an instance of `TreeDataGridCellSelectionModel<TModel>` to the source's `Selection` property:

```csharp
Source = new FlatTreeDataGridSource<Person>(_people)
{
    Columns =
    {
        new TextColumn<Person, string>("First Name", x => x.FirstName),
        new TextColumn<Person, string>("Last Name", x => x.LastName),
        new TextColumn<Person, int>("Age", x => x.Age),
    },
};

Source.Selection = new TreeDataGridCellSelectionModel<Person>(Source);
```

For multiple cell selection:

```csharp
Source.Selection = new TreeDataGridCellSelectionModel<Person>(Source)
{
    SingleSelect = false
};
```

Cell selection is exposed via the `CellSelection` property on the source.

The `CellIndex` struct identifies an individual cell by a combination of an integer column index and an `IndexPath` row index:

```csharp
// Access selected cell
if (Source.CellSelection?.SelectedIndex is { } selectedCell)
{
    Debug.WriteLine($"Selected cell - Row: {selectedCell.RowIndex}, Column: {selectedCell.ColumnIndex}");
}
```
