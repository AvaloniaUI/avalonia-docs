---
id: tableview
title: TableView
---

The `TableView` displays a collection of items in configurable columns. It is a read-only, tabular control: it presents data but does not provide in-place cell editing.

`TableView` derives from [`ListBox`](/controls/data-display/collections/listbox), so it reuses the same items source and selection model. Each row is a `TableViewRow`, and each column is defined by a `TableViewColumn`.

:::info
`TableView` is part of the core **Avalonia.Controls** package, so no additional _NuGet_ package or style include is required. It is available from Avalonia 12.1.
:::


## Basic usage

Bind the `ItemsSource` property to a collection in your view model, then declare one `TableViewColumn` per column inside `TableView.Columns`. Use the column's `Binding` property to pick the value shown in each cell:

```xml title='XAML View'
<TableView ItemsSource="{Binding Countries}">
  <TableView.Columns>
    <TableViewColumn Header="Name" Binding="{Binding Name}" />
    <TableViewColumn Header="Region" Binding="{Binding Region}" />
    <TableViewColumn Header="Population"
                     Binding="{Binding Population, StringFormat=N0}"
                     HorizontalContentAlignment="Right" />
  </TableView.Columns>
</TableView>
```

```csharp title='C# View Model'
using System.Collections.ObjectModel;

public class MainWindowViewModel
{
    public ObservableCollection<Country> Countries { get; } =
    [
        new("Afghanistan", "Asia", 31056997),
        new("Albania", "Eastern Europe", 3581655),
        new("Algeria", "Northern Africa", 32930091),
    ];
}
```

```csharp title='C# Item Class'
public record Country(string Name, string Region, int Population);
```

:::info
These examples use the MVVM pattern with data binding to an `ObservableCollection`. For more information on the concepts behind data binding, see [Introduction to data binding](/docs/data-binding/introduction-to-data-binding).
:::


## Useful properties

You will probably use these `TableView` properties most often:

| Property                | Description                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `ItemsSource`           | The bound collection used as the data source for the rows.                                                                            |
| `Columns`               | The collection of `TableViewColumn` objects that define how each column is displayed. See [Columns](#columns). |
| `CanUserResizeColumns`  | Whether the user can resize columns by dragging the separator between column headers. The default is `true`.                          |

Because `TableView` derives from `ListBox`, the standard selection members also apply; for example `SelectionMode`, `SelectedItem`, `SelectedItems`, and `SelectedIndex`. See [ListBox](/controls/data-display/collections/listbox) for details.


## Columns

A `TableView` is composed of a `Columns` collection. Each `TableViewColumn` describes both the header cell and the data cells for that column.


### Displaying cell values

There are two ways to determine what a cell displays:

| Property       | Description                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Binding`      | A binding that retrieves the cell value from the row's data item. Use this for simple property display, e.g. `Binding="{Binding Name}"`.             |
| `CellTemplate` | A data template used to build the cell content. The whole row data item is passed as the template's data context, so you can bind to any property.   |

`CellTemplate` takes priority over `Binding`. Use `Binding` for plain text values and `CellTemplate` when you need richer content such as images, buttons, or several properties combined:

```xml
<TableView ItemsSource="{Binding Countries}">
  <TableView.Columns>
    <TableViewColumn Header="Name" Binding="{Binding Name}" />
    <TableViewColumn Header="Population">
      <TableViewColumn.CellTemplate>
        <DataTemplate>
          <ProgressBar Minimum="0" Maximum="1500000000"
                       Value="{Binding Population}"
                       VerticalAlignment="Center" />
        </DataTemplate>
      </TableViewColumn.CellTemplate>
    </TableViewColumn>
  </TableView.Columns>
</TableView>
```

### Column properties

| Property                     | Description                                                                                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Header`                     | The content displayed in the column header.                                                                                                                  |
| `HeaderTemplate`             | A data template used to display the header content.                                                                                                          |
| `HeaderTheme`                | A `ControlTheme` applied to the header. It must target `TableViewColumnHeader`.                                                                              |
| `Binding`                    | A binding that reads the cell value from the row data item (see above).                                                                                      |
| `CellTemplate`               | A data template for the cell content, receiving the row data item as its data context (see above).                                                          |
| `CellTheme`                  | A `ControlTheme` applied to the cells. It must target `TableViewCell`.                                                                                       |
| `Width`                      | The column width, expressed as a `GridLength` (see below). The default is `1*`.                                                                              |
| `CanUserResize`              | Whether this specific column can be resized. When left at its default (`null`), the value falls back to the table's `CanUserResizeColumns`.                  |
| `HorizontalContentAlignment` | The horizontal alignment of the content inside both the header and the cells of the column. The default is `Left`.                                          |

### Column width

The `Width` property is a `GridLength`, so a column can be sized in absolute or relative units, just like a [Grid](/controls/layout/grid) column:

- **Star** (`*`): the column takes a proportional share of the remaining space. This is the default (`1*`).
- **Pixel**: an absolute width in device-independent pixels.

```xml
<TableView.Columns>
  <TableViewColumn Header="Name" Width="3*" Binding="{Binding Name}" />
  <TableViewColumn Header="Region" Width="2*" Binding="{Binding Region}" />
  <TableViewColumn Header="Code" Width="80" Binding="{Binding Code}" />
</TableView.Columns>
```

### Column resizing

By default users can resize columns by dragging the separator between two column headers. You can turn this off for the whole table:

```xml
<TableView ItemsSource="{Binding Countries}"
           CanUserResizeColumns="False">
  <!-- ... -->
</TableView>
```

You can also override the behavior for individual columns with `CanUserResize`. When it is left at its default value of `null`, the column follows the table's `CanUserResizeColumns` setting; setting it to `true` or `false` overrides the table for that column:

```xml
<TableView.Columns>
  <!-- Fixed width, never resizable, regardless of the table setting -->
  <TableViewColumn Header="#" Width="40"
                   Binding="{Binding Index}"
                   CanUserResize="False" />
  <TableViewColumn Header="Name" Binding="{Binding Name}" />
</TableView.Columns>
```

Dragging a resizer switches that column to a pixel width.


## Virtualization

Similar to `ListBox`, rows are virtualized and recycled by default.  
Cells are also recycled alongside their owning rows.

:::warning
The `TableView` virtualizes its rows but does **not** virtualize columns. Every column is always realized, so keep the number of columns reasonable.
:::


## See also

- [ListBox](/controls/data-display/collections/listbox)
- [TableView API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_TableView)
