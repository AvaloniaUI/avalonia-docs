---
description: How to sort data in TreeDataGrid
---

# Sorting

## Column Sorting

### Enabling Sorting

Sorting is enabled by default for all columns. Users can click column headers to sort:

```csharp
Source = new FlatTreeDataGridSource<Person>(_people)
{
    Columns =
    {
        new TextColumn<Person, string>("Name", x => x.Name),
        new TextColumn<Person, int>("Age", x => x.Age)
    }
};
```

To disable sorting for the entire grid:

```xml
<TreeDataGrid Source="{Binding Source}"
              CanUserSortColumns="False" />
```

### Making Specific Columns Non-Sortable

To prevent sorting on specific columns:

```csharp
new TextColumn<Person, string>(
    "Name",
    x => x.Name,
    options: new TextColumnOptions<Person>
    {
        CanUserSortColumn = false
    })
```

### Programmatic Sorting

You can sort columns programmatically:

```csharp
// Sort by a specific column
Source.SortBy(Source.Columns[0], ListSortDirection.Ascending);
Source.SortBy(Source.Columns[1], ListSortDirection.Descending);

// Clear sorting from all columns
Source.SortBy(null, ListSortDirection.Ascending);

// Clear sorting only if column is currently sorted
Source.ClearSort(Source.Columns[0]);
```

## Custom Sorting

You can provide custom sorting logic using a comparer.

```csharp
new TextColumn<Person, string>(
    "Name",
    x => x.Name,
    options: new TextColumnOptions<Person>
    {
        CompareAscending = (a, b) => string.Compare(a.Name, b.Name, StringComparison.OrdinalIgnoreCase),
        CompareDescending = (a, b) => string.Compare(b.Name, a.Name, StringComparison.OrdinalIgnoreCase)
    })
```

This can be useful if you need to sort by multiple columns.

Two separate comparer functions must be provided: one for ascending and one for descending order. If one is not provided then `Comparer<TModel>.Default` will be used.
