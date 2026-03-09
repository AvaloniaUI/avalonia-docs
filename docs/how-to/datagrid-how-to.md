---
id: datagrid-how-to
title: "How to: Work with DataGrid"
description: Sorting, filtering, grouping, template columns, selection, validation, and editing with DataGrid.
doc-type: how-to
---

This guide covers common DataGrid scenarios: sorting, filtering, grouping, template columns, selection, validation, and editing.

## Setup

Install the NuGet package and add the style reference:

```bash
dotnet add package Avalonia.Controls.DataGrid
```

```xml title='App.axaml'
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="avares://Avalonia.Controls.DataGrid/Themes/Fluent.xaml"/>
</Application.Styles>
```

## Basic Bound DataGrid

```xml
<DataGrid ItemsSource="{Binding Products}" AutoGenerateColumns="False"
          IsReadOnly="True" GridLinesVisibility="All"
          BorderThickness="1" BorderBrush="Gray">
    <DataGrid.Columns>
        <DataGridTextColumn Header="Name" Binding="{Binding Name}" Width="2*" />
        <DataGridTextColumn Header="Price" Binding="{Binding Price, StringFormat='{}{0:C}'}" Width="*" />
        <DataGridCheckBoxColumn Header="In Stock" Binding="{Binding InStock}" Width="Auto" />
    </DataGrid.Columns>
</DataGrid>
```

```csharp
public partial class MainViewModel : ObservableObject
{
    public ObservableCollection<Product> Products { get; } = new()
    {
        new Product("Widget", 9.99m, true),
        new Product("Gadget", 24.99m, false),
        new Product("Gizmo", 14.50m, true),
    };
}

public class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public bool InStock { get; set; }

    public Product(string name, decimal price, bool inStock)
    {
        Name = name;
        Price = price;
        InStock = inStock;
    }
}
```

## Sorting

Sorting is enabled by default (`CanUserSortColumns="True"`). Click a column header to sort ascending, click again for descending.

For custom sort behavior with `DataGridTemplateColumn`, set the `SortMemberPath`:

```xml
<DataGridTemplateColumn Header="Age" SortMemberPath="AgeInYears">
    <DataGridTemplateColumn.CellTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding AgeInYears, StringFormat='{}{0} years'}" />
        </DataTemplate>
    </DataGridTemplateColumn.CellTemplate>
</DataGridTemplateColumn>
```

### Programmatic sorting

```csharp
var column = myDataGrid.Columns[0];
myDataGrid.Columns.Clear();
myDataGrid.Columns.Add(column);
// Or use CollectionView sorting (see Filtering section below)
```

## Filtering

Filter data by binding to a filtered collection in your view model:

```csharp
public partial class MainViewModel : ObservableObject
{
    private readonly List<Product> _allProducts;

    [ObservableProperty]
    private string _filterText = "";

    [ObservableProperty]
    private ObservableCollection<Product> _filteredProducts;

    public MainViewModel()
    {
        _allProducts = LoadProducts();
        _filteredProducts = new ObservableCollection<Product>(_allProducts);
    }

    partial void OnFilterTextChanged(string value)
    {
        var filtered = string.IsNullOrWhiteSpace(value)
            ? _allProducts
            : _allProducts.Where(p =>
                p.Name.Contains(value, StringComparison.OrdinalIgnoreCase));

        FilteredProducts = new ObservableCollection<Product>(filtered);
    }
}
```

```xml
<StackPanel Spacing="8">
    <TextBox Text="{Binding FilterText}" PlaceholderText="Search products..." />
    <DataGrid ItemsSource="{Binding FilteredProducts}" AutoGenerateColumns="True"
              IsReadOnly="True" />
</StackPanel>
```

## Grouping

Group rows by wrapping your collection in a `DataGridCollectionView` and adding group descriptions. The DataGrid renders a collapsible `DataGridRowGroupHeader` for each group automatically.

### Basic grouping

```csharp
using Avalonia.Collections;

public partial class MainViewModel : ObservableObject
{
    public DataGridCollectionView GroupedProducts { get; }

    public MainViewModel()
    {
        var products = new List<Product>
        {
            new("Widget", "Hardware", 9.99m),
            new("Gadget", "Hardware", 24.99m),
            new("App", "Software", 4.99m),
            new("Plugin", "Software", 14.50m),
        };

        GroupedProducts = new DataGridCollectionView(products);
        GroupedProducts.GroupDescriptions.Add(
            new DataGridPathGroupDescription("Category"));
    }
}
```

```xml
<DataGrid ItemsSource="{Binding GroupedProducts}" AutoGenerateColumns="False"
          IsReadOnly="True">
    <DataGrid.Columns>
        <DataGridTextColumn Header="Name" Binding="{Binding Name}" Width="*" />
        <DataGridTextColumn Header="Price" Binding="{Binding Price, StringFormat='{}{0:C}'}" Width="*" />
    </DataGrid.Columns>
</DataGrid>
```

### Multiple group levels

Add more than one `DataGridPathGroupDescription` for nested grouping:

```csharp
GroupedProducts.GroupDescriptions.Add(new DataGridPathGroupDescription("Category"));
GroupedProducts.GroupDescriptions.Add(new DataGridPathGroupDescription("SubCategory"));
```

### Customizing the group header

Handle the `LoadingRowGroup` event to change the header text or add summary information:

```csharp
private void OnLoadingRowGroup(object? sender, DataGridRowGroupHeaderEventArgs e)
{
    var group = e.RowGroupHeader.DataContext as DataGridCollectionViewGroup;
    if (group is null)
        return;

    e.RowGroupHeader.PropertyName = "Category";
    e.RowGroupHeader.PropertyValue = $"{group.Key} ({group.ItemCount} products)";
}
```

```xml
<DataGrid ItemsSource="{Binding GroupedProducts}"
          LoadingRowGroup="OnLoadingRowGroup" />
```

### Expanding and collapsing groups programmatically

Use `ExpandRowGroup` and `CollapseRowGroup` on the DataGrid:

```csharp
if (viewModel.GroupedProducts.Groups is { } groups)
{
    foreach (var group in groups.OfType<DataGridCollectionViewGroup>())
    {
        myDataGrid.CollapseRowGroup(group, collapseAllSubgroups: true);
    }
}
```

## Column Types

| Column Type | Use For |
|---|---|
| `DataGridTextColumn` | Text display and editing. |
| `DataGridCheckBoxColumn` | Boolean values. Supports three-state for `bool?`. |
| `DataGridTemplateColumn` | Custom display and editing with any control. |

## Template Columns

Use `DataGridTemplateColumn` for custom cell rendering:

```xml
<DataGridTemplateColumn Header="Status">
    <DataGridTemplateColumn.CellTemplate>
        <DataTemplate>
            <Border Background="{Binding StatusColor}" CornerRadius="4"
                    Padding="8,2" HorizontalAlignment="Center">
                <TextBlock Text="{Binding Status}" Foreground="White"
                           FontSize="11" />
            </Border>
        </DataTemplate>
    </DataGridTemplateColumn.CellTemplate>
</DataGridTemplateColumn>
```

### Editable template column

Provide both `CellTemplate` (display) and `CellEditingTemplate` (editing):

```xml
<DataGridTemplateColumn Header="Rating">
    <DataGridTemplateColumn.CellTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Rating}" HorizontalAlignment="Center" />
        </DataTemplate>
    </DataGridTemplateColumn.CellTemplate>
    <DataGridTemplateColumn.CellEditingTemplate>
        <DataTemplate>
            <NumericUpDown Value="{Binding Rating}" Minimum="0" Maximum="5"
                           FormatString="N0" />
        </DataTemplate>
    </DataGridTemplateColumn.CellEditingTemplate>
</DataGridTemplateColumn>
```

## Selection

### Single selection

```xml
<DataGrid ItemsSource="{Binding Products}"
          SelectedItem="{Binding SelectedProduct}"
          SelectionMode="Single" />
```

```csharp
[ObservableProperty]
private Product? _selectedProduct;

partial void OnSelectedProductChanged(Product? value)
{
    // React to selection change
}
```

### Multiple selection

```xml
<DataGrid ItemsSource="{Binding Products}"
          SelectionMode="Extended" />
```

Access selected items in code-behind:

```csharp
var selectedItems = myDataGrid.SelectedItems;
```

## Editing

By default, the DataGrid allows editing when `IsReadOnly` is `false`. Double-click a cell or press F2 to enter edit mode. Press Enter to commit, Escape to cancel.

```xml
<DataGrid ItemsSource="{Binding Products}" IsReadOnly="False"
          CellEditEnding="OnCellEditEnding" />
```

### Handling edit events

```csharp
private void OnCellEditEnding(object? sender, DataGridCellEditEndingEventArgs e)
{
    if (e.EditAction == DataGridEditAction.Commit)
    {
        // Validate or process the edit
    }
}
```

## Column Width Modes

| Width | Behavior |
|---|---|
| `Auto` | Sized to fit content. |
| `*` | Takes an equal share of remaining space. |
| `2*` | Takes twice the share of `*` columns. |
| `200` | Fixed width in pixels. |
| `SizeToCells` | Sized to fit cell content. |
| `SizeToHeader` | Sized to fit header content. |

```xml
<DataGrid.Columns>
    <DataGridTextColumn Header="Name" Width="2*" Binding="{Binding Name}" />
    <DataGridTextColumn Header="Code" Width="Auto" Binding="{Binding Code}" />
    <DataGridTextColumn Header="Price" Width="*" Binding="{Binding Price}" />
</DataGrid.Columns>
```

## Row Details

Display additional content when a row is selected:

```xml
<DataGrid ItemsSource="{Binding Products}" IsReadOnly="True"
          RowDetailsVisibilityMode="VisibleWhenSelected">
    <DataGrid.RowDetailsTemplate>
        <DataTemplate>
            <Border Background="#F5F5F5" Padding="16" Margin="4">
                <StackPanel Spacing="4">
                    <TextBlock Text="{Binding Description}" TextWrapping="Wrap" />
                    <TextBlock Text="{Binding LastUpdated, StringFormat='Updated: {0:d}'}"
                               Foreground="Gray" FontSize="11" />
                </StackPanel>
            </Border>
        </DataTemplate>
    </DataGrid.RowDetailsTemplate>
    <DataGrid.Columns>
        <DataGridTextColumn Header="Name" Binding="{Binding Name}" Width="*" />
    </DataGrid.Columns>
</DataGrid>
```

## Grid Lines and Alternating Rows

```xml
<DataGrid ItemsSource="{Binding Products}"
          GridLinesVisibility="Horizontal"
          AlternatingRowBackground="#F8F8F8" />
```

| GridLinesVisibility | Description |
|---|---|
| `None` | No grid lines (default). |
| `Horizontal` | Horizontal lines only. |
| `Vertical` | Vertical lines only. |
| `All` | Both horizontal and vertical lines. |

## Frozen Columns

Keep columns visible while scrolling horizontally:

```xml
<DataGrid ItemsSource="{Binding Products}" FrozenColumnCount="1">
    <DataGrid.Columns>
        <DataGridTextColumn Header="ID" Binding="{Binding Id}" Width="60" />
        <!-- This column stays visible while scrolling -->
        <DataGridTextColumn Header="Name" Binding="{Binding Name}" Width="200" />
        <DataGridTextColumn Header="Category" Binding="{Binding Category}" Width="200" />
        <!-- More columns that can scroll horizontally -->
    </DataGrid.Columns>
</DataGrid>
```

## Styling Rows Conditionally

Use a `DataGridRowTheme` or handle `LoadingRow` in code-behind:

```csharp
private void OnLoadingRow(object? sender, DataGridRowEventArgs e)
{
    if (e.Row.DataContext is Product product && !product.InStock)
    {
        e.Row.Background = Brushes.MistyRose;
    }
    else
    {
        e.Row.Background = null;
    }
}
```

```xml
<DataGrid ItemsSource="{Binding Products}" LoadingRow="OnLoadingRow" />
```

## See also

- [DataGrid Control Reference](/controls/data-display/structured-data/datagrid): Setup and property tables.
- [TreeDataGrid](/controls/data-display/structured-data/treedatagrid): For hierarchical data display.
- [Binding to Collections](/docs/data-binding/how-to-bind-to-a-collection): ObservableCollection patterns.
- [Performance Optimization](/docs/app-development/performance#collection-performance): Batch updates and virtualization for large collections.
