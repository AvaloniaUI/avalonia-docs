---
id: breaking-changes-v12
title: TreeDataGrid v12 breaking changes
tags:
  - accelerate
---

This document describes the breaking changes between TreeDataGrid 11.x and 12.x and
provides migration guidance.

TreeDataGrid 12.0 represents a major refactor of the TreeDataGrid API in an effort to
future-proof the API and provide API stability promises that were not present for
TreeDataGrid 11.x.

TreeDataGrid 12.x requires Avalonia 12. For Avalonia 12 breaking changes, see the
[Avalonia 12 breaking changes](https://docs.avaloniaui.net/docs/avalonia12-breaking-changes)
document.

## Generic type parameters removed from columns

All column classes have had their generic type parameters removed and have been renamed
with a `TreeDataGrid` prefix. Columns are no longer generic over the model type.

| 11.x | 12.x |
|---|---|
| `TextColumn<TModel, TValue>` | `TreeDataGridTextColumn` |
| `CheckBoxColumn<TModel>` | `TreeDataGridCheckBoxColumn` |
| `TemplateColumn<TModel>` | `TreeDataGridTemplateColumn` |
| `HierarchicalExpanderColumn<TModel>` | `TreeDataGridHierarchicalExpanderColumn` |
| `RowHeaderColumn<TModel>` | `TreeDataGridRowHeaderColumn` |
| `ColumnList<TModel>` | `TreeDataGridColumns` |

## XAML support

TreeDataGrid now supports defining columns directly in XAML without a code-behind source.
Set the `ItemsSource` property and define columns as content:

```xml
<TreeDataGrid ItemsSource="{Binding Countries}" SelectionMode="Row,Multiple">
    <TreeDataGridTextColumn Header="Country" Binding="{Binding Name}" Width="6*" />
    <TreeDataGridTextColumn Header="Region" Binding="{Binding Region}" Width="2*" />
    <TreeDataGridCheckBoxColumn Binding="{Binding IsChecked}" CanUserResize="False" />
</TreeDataGrid>
```

For hierarchical data, use `TreeDataGridHierarchicalExpanderColumn`:

```xml
<TreeDataGrid ItemsSource="{Binding Files}">
    <TreeDataGridHierarchicalExpanderColumn Header="Name" Width="*"
                                            ChildrenBinding="{Binding Children}"
                                            HasChildrenBinding="{Binding HasChildren}"
                                            IsExpandedBinding="{Binding IsExpanded}">
        <TreeDataGridTextColumn Binding="{Binding Name}"/>
    </TreeDataGridHierarchicalExpanderColumn>
</TreeDataGrid>
```

The code-behind `FlatTreeDataGridSource` / `HierarchicalTreeDataGridSource` approach
continues to work as before (with the API changes described in this document).

## Fluent column API

There is now a fluent API for creating columns from code.

Separate getter/setter lambdas are no longer used. The getter expression is used for
two-way binding automatically when the expression is writable. If you wish to create a read-only
column, set `IsReadOnly` in the options callback.

When the header matches the property selected by the lambda, you can omit it.

### `WithTextColumn`

```diff
-new TextColumn<Country, string>(
-    "Country",
-    x => x.Name,
-    (r, v) => r.Name = v,
-    new GridLength(6, GridUnitType.Star))
+source.WithTextColumn("Country", x => x.Name, o => o.Width = new GridLength(6, GridUnitType.Star))
```

Some examples:

```csharp
source.WithTextColumn("Name", x => x.Name)
source.WithTextColumn(x => x.Name)
source.WithTextColumn(x => x.Name, o => o.IsReadOnly = true)
source.WithTextColumn(x => x.Name, o => o.Width = GridLength.Star)
```

### `WithCheckBoxColumn`/`WithThreeStateCheckBoxColumn`

Checkboxes can be added using `WithCheckBoxColumn` or `WithThreeStateCheckBoxColumn`:

```diff
-new CheckBoxColumn<FileTreeNodeModel>(
-    null,
-    x => x.IsChecked,
-    (o, v) => o.IsChecked = v)
+source.WithCheckBoxColumn(null, x => x.IsChecked)
```

### `WithTemplateColumn`

Template columns can be added using `IDataTemplate` instances or resource keys:

```diff
-new TemplateColumn<Country>(
-    "Region",
-    "RegionCell",
-    "RegionEditCell")
+source.WithTemplateColumnFromResourceKeys("Region", "RegionCell", "RegionEditCell")
```

### `WithHierarchicalExpanderColumn`/`WithHierarchicalExpanderTextColumn`

For hierarchical data with a text column inside the expander:

```diff
-new HierarchicalExpanderColumn<FileTreeNodeModel>(
-    new TextColumn<FileTreeNodeModel, string>(
-        "Name",
-        x => x.Name),
-    x => x.Children,
-    x => x.HasChildren,
-    x => x.IsExpanded)
+source.WithHierarchicalExpanderTextColumn(x => x.Name, x => x.Children, o =>
+{
+    o.HasChildren = x => x.HasChildren;
+    o.IsExpanded = x => x.IsExpanded;
+})
```

The header and width have now moved from the inner column to the expander column.

For an expander with a custom inner column (e.g. a template column), use
`WithHierarchicalExpanderColumn`:

```csharp
source.WithHierarchicalExpanderColumn(
    "Name",
    new TreeDataGridTemplateColumn(null, "FileNameCell", "FileNameEditCell"),
    x => x.Children,
    o =>
    {
        o.Width = new GridLength(1, GridUnitType.Star);
        o.HasChildren = x => x.HasChildren;
        o.IsExpanded = x => x.IsExpanded;
    })
```

### Full chaining example

```csharp
var source = new FlatTreeDataGridSource<Country>(data)
    .WithRowHeaderColumn()
    .WithTextColumn("Country", x => x.Name, o =>
    {
        o.Width = new GridLength(6, GridUnitType.Star);
        o.IsTextSearchEnabled = true;
    })
    .WithTemplateColumnFromResourceKeys("Region", "RegionCell", "RegionEditCell")
    .WithTextColumn(x => x.Population, o => o.Width = new GridLength(3, GridUnitType.Star))
    .WithTextColumn(x => x.Area, o => o.Width = new GridLength(3, GridUnitType.Star));
```

## Column options

Column options classes have been replaced with top-level `*CreateOptions` classes,
configured via a lambda callback on the fluent methods:

| 11.x | 12.x |
|---|---|
| `ColumnOptions<TModel>` | `ColumnCreateOptions` |
| `TextColumnOptions<TModel>` | `TextColumnCreateOptions` |
| `TemplateColumnOptions<TModel>` | `TemplateColumnCreateOptions` |
| `CheckBoxColumnOptions<TModel>` | `CheckBoxColumnCreateOptions` |

```diff
-new TextColumn<Country, string>(
-    "Country",
-    x => x.Name,
-    options: new TextColumnOptions<Country>
-    {
-        CanUserResizeColumn = false,
-        IsTextSearchEnabled = true,
-    })
+source.WithTextColumn("Country", x => x.Name, o =>
+{
+    o.CanUserResize = false;
+    o.IsTextSearchEnabled = true;
+})
```

The `CanUserResizeColumn` property has been renamed to `CanUserResize`.

`IsTextSearchEnabled` on `TextColumnCreateOptions` now defaults to `true`. Previously, it was
`false` in 11.x. If you do not want text search on a text column, you must now explicitly
disable it:

```csharp
source.WithTextColumn("Name", x => x.Name, o => o.IsTextSearchEnabled = false)
```

## Interfaces replaced with abstract classes

The major interfaces in the TreeDataGrid API have been replaced with abstract classes:

| 11.x | 12.x |
|---|---|
| `ITreeDataGridSource` | `TreeDataGridSource` |
| `ITreeDataGridSource<TModel>` | `TreeDataGridSource<TModel>` |
| `IColumn` | `TreeDataGridColumn` |
| `IColumns` | `TreeDataGridColumns` |
| `IRows` | `TreeDataGridRows` |
| `ITreeDataGridSelection` | `TreeDataGridSelectionModel` |
| `ITreeDataGridRowSelectionModel<T>` | `TreeDataGridRowSelectionModel<T>` |
| `ITreeDataGridCellSelectionModel<T>` | `TreeDataGridCellSelectionModel<T>` |

## Renamed types

The following types have been renamed:

| 11.x | 12.x |
|---|---|
| `ICell` | `ITreeDataGridCellModel` |
| `IRow` | `ITreeDataGridRowModel` |

## Removed types

The following types were removed:

- `NotifyingBase`, `ReadOnlyListBase<T>`, `SortableRowsBase<TModel, TRow>`
- `AnonymousSortableRows<TModel>`, `HierarchicalRows<TModel>`, `HierarchicalRow<TModel>`
- `TextCell`, `CheckBoxCell`, `ExpanderCell`, `TemplateCell`, `RowHeaderCell`
- `IExpander`, `IExpanderCell`, `IExpanderRow`, `IExpanderRow<TModel>`,
  `IExpanderRowController<TModel>`
- `IIndentedRow`, `IRow<TModel>`
- `ICellOptions`, `ITextCellOptions`, `ITemplateCellOptions`
- `IUpdateColumnLayout`
- `NotifyingListBase<T>`
- `DragInfo`

If you depended on any of these types, please open an issue and we will discuss a replacement.

## Sources are now sealed

`FlatTreeDataGridSource<TModel>` and `HierarchicalTreeDataGridSource<TModel>` are now
`sealed` classes. They can no longer be subclassed.

## Custom sort comparisons use `object?`

Custom sort comparison delegates on `CompareAscending` and `CompareDescending` have
changed from `Comparison<TModel?>?` to `Comparison<object?>?`:

```diff
-options: new ColumnOptions<Country>
-{
-    CompareAscending = (a, b) => string.Compare(a?.Name, b?.Name),
-}
+source.WithTextColumn("Country", x => x.Name, o =>
+{
+    o.CompareAscending = (a, b) => string.Compare(((Country?)a)?.Name, ((Country?)b)?.Name);
+})
```

## Unified `SelectionChangedEventArgs`

Selection changed events now use `TreeDataGridSelectionChangedEventArgs` (or the generic
`TreeDataGridSelectionChangedEventArgs<TModel>`), replacing the previous
`TreeSelectionModelSelectionChangedEventArgs<T>`. The new event args provide:

- `SelectedIndexes` / `DeselectedIndexes`
- `SelectedItems` / `DeselectedItems`
- `SelectedCellIndexes` / `DeselectedCellIndexes`

A `SelectionChanged` event has also been added to the `TreeDataGrid` control itself.

## Row events use `TreeDataGridRowModelEventArgs`

The `RowExpanding`, `RowExpanded`, `RowCollapsing`, and `RowCollapsed` events now use
`TreeDataGridRowModelEventArgs` instead of `RowEventArgs<HierarchicalRow<TModel>>`.

## Text search uses bindings

Text search configuration has changed from lambda-based value selectors to Avalonia
bindings.

For template columns, the `TextSearchValueSelector` lambda on `TemplateColumnOptions` has
been replaced with a `TextSearchBinding` property on `TemplateColumnCreateOptions`:

```diff
-new TemplateColumn<FileTreeNodeModel>(
-    "Name",
-    "FileNameCell",
-    "FileNameEditCell",
-    options: new TemplateColumnOptions<FileTreeNodeModel>
-    {
-        TextSearchValueSelector = x => x.Name,
-    })
+source.WithTemplateColumnFromResourceKeys("Name", "FileNameCell", "FileNameEditCell", o =>
+{
+    o.TextSearchBinding = CompiledBinding.Create<FileTreeNodeModel, string>(x => x.Name);
+})
```

For text columns, text search is enabled by default via the `IsTextSearchEnabled` property
on `TextColumnCreateOptions` and uses the column's own binding automatically.

## Namespace changes

The `Avalonia.Controls.Models.TreeDataGrid` namespace (which contained the old column types
such as `TextColumn<TModel, TValue>`, `TemplateColumn<TModel>`, `HierarchicalExpanderColumn<TModel>`,
`TextColumnOptions<TModel>`, etc.) has been removed. The new column types and options classes
are in the `Avalonia.Controls` namespace. Remove `using Avalonia.Controls.Models.TreeDataGrid`
from your code.

## Experimental bindings removed

The `Avalonia.Experimental.Data` namespace and all its types have been removed. This
includes `TypedBinding<TIn, TOut>`, `TypedBindingExpression<TIn, TOut>`,
`LightweightObservableBase<T>`, `SingleSubscriberObservableBase<T>`, and related types.

TreeDataGrid 12.x uses standard Avalonia bindings instead.
