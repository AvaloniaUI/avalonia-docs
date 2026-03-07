---
id: collection-views
title: Sorting, filtering, and grouping collections
description: Sort, filter, and group bound collections using DataGridCollectionView and DynamicData.
doc-type: how-to
---

Avalonia does not include a built-in `ICollectionView` equivalent like WPF. Instead, sorting, filtering, and grouping are typically handled in the view model before binding to controls. This approach keeps the UI layer simple and makes the logic easier to test.

## Filtering a collection

The most common pattern uses a derived collection that reacts to filter changes. Use LINQ or a `CollectionViewSource`-like wrapper:

### Manual filtering with ObservableCollection

```csharp
public partial class MainViewModel : ObservableObject
{
    private readonly ObservableCollection<Person> _allPeople;

    [ObservableProperty]
    private string _searchText = "";

    public ObservableCollection<Person> FilteredPeople { get; } = new();

    public MainViewModel()
    {
        _allPeople = new ObservableCollection<Person>
        {
            new("Alice", 30),
            new("Bob", 25),
            new("Charlie", 35),
        };

        ApplyFilter();
    }

    partial void OnSearchTextChanged(string value)
    {
        ApplyFilter();
    }

    private void ApplyFilter()
    {
        FilteredPeople.Clear();
        var filtered = string.IsNullOrEmpty(SearchText)
            ? _allPeople
            : _allPeople.Where(p =>
                p.Name.Contains(SearchText, StringComparison.OrdinalIgnoreCase));

        foreach (var person in filtered)
            FilteredPeople.Add(person);
    }
}
```

```xml
<StackPanel Spacing="8">
    <TextBox Text="{Binding SearchText}" PlaceholderText="Search..." />
    <ListBox ItemsSource="{Binding FilteredPeople}">
        <ListBox.ItemTemplate>
            <DataTemplate>
                <TextBlock Text="{Binding Name}" />
            </DataTemplate>
        </ListBox.ItemTemplate>
    </ListBox>
</StackPanel>
```

### Using DynamicData (recommended for complex scenarios)

The [DynamicData](https://github.com/reactivemarbles/DynamicData) library provides reactive collection transformations. It integrates well with Avalonia's reactive model:

```csharp
using DynamicData;
using DynamicData.Binding;

public class MainViewModel : ObservableObject
{
    private readonly SourceList<Person> _source = new();
    private readonly ReadOnlyObservableCollection<Person> _filtered;

    [ObservableProperty]
    private string _searchText = "";

    public ReadOnlyObservableCollection<Person> FilteredPeople => _filtered;

    public MainViewModel()
    {
        _source.AddRange(new[]
        {
            new Person("Alice", 30),
            new Person("Bob", 25),
            new Person("Charlie", 35),
        });

        var filterPredicate = this.WhenAnyValue(x => x.SearchText)
            .Select(CreateFilter);

        _source.Connect()
            .Filter(filterPredicate)
            .SortBy(p => p.Name)
            .Bind(out _filtered)
            .Subscribe();
    }

    private static Func<Person, bool> CreateFilter(string? searchText)
    {
        if (string.IsNullOrEmpty(searchText))
            return _ => true;

        return person =>
            person.Name.Contains(searchText, StringComparison.OrdinalIgnoreCase);
    }
}
```

DynamicData automatically updates `FilteredPeople` when items are added, removed, or the filter text changes.

## Sorting a collection

### Simple sorting

Sort the source collection before binding:

```csharp
public ObservableCollection<Person> People { get; }

public MainViewModel()
{
    var sorted = _rawData.OrderBy(p => p.Name);
    People = new ObservableCollection<Person>(sorted);
}
```

### Dynamic sorting

Use a property to control the sort order:

```csharp
[ObservableProperty]
private string _sortProperty = "Name";

[ObservableProperty]
private bool _sortDescending = false;

partial void OnSortPropertyChanged(string value) => ApplySort();
partial void OnSortDescendingChanged(bool value) => ApplySort();

private void ApplySort()
{
    var sorted = SortProperty switch
    {
        "Name" => SortDescending
            ? _allPeople.OrderByDescending(p => p.Name)
            : _allPeople.OrderBy(p => p.Name),
        "Age" => SortDescending
            ? _allPeople.OrderByDescending(p => p.Age)
            : _allPeople.OrderBy(p => p.Age),
        _ => _allPeople.AsEnumerable()
    };

    People.Clear();
    foreach (var person in sorted)
        People.Add(person);
}
```

```xml
<StackPanel Spacing="8">
    <StackPanel Orientation="Horizontal" Spacing="8">
        <ComboBox SelectedItem="{Binding SortProperty}">
            <ComboBoxItem Content="Name" />
            <ComboBoxItem Content="Age" />
        </ComboBox>
        <ToggleButton Content="Descending" IsChecked="{Binding SortDescending}" />
    </StackPanel>
    <ListBox ItemsSource="{Binding People}" />
</StackPanel>
```

### With DynamicData

```csharp
_source.Connect()
    .Sort(SortExpressionComparer<Person>.Ascending(p => p.Name))
    .Bind(out _sorted)
    .Subscribe();
```

## Grouping

Avalonia's `ItemsControl` does not have built-in grouping support like WPF's `CollectionViewSource`. To display grouped data, flatten groups into a single collection with group headers.

:::tip
The `DataGrid` control supports built-in grouping through `DataGridCollectionView`. See the [DataGrid grouping how-to](/docs/how-to/datagrid-how-to#grouping) for details.
:::

### Using a flat list with headers

Create a view model that represents both headers and items:

```csharp
public abstract class ListItem { }

public class GroupHeader : ListItem
{
    public string Title { get; }
    public GroupHeader(string title) => Title = title;
}

public class PersonItem : ListItem
{
    public Person Person { get; }
    public PersonItem(Person person) => Person = person;
}
```

Build the grouped list:

```csharp
public ObservableCollection<ListItem> GroupedPeople { get; } = new();

private void BuildGroups()
{
    GroupedPeople.Clear();
    var groups = _allPeople.GroupBy(p => p.Age / 10 * 10); // Group by decade

    foreach (var group in groups.OrderBy(g => g.Key))
    {
        GroupedPeople.Add(new GroupHeader($"{group.Key}s"));
        foreach (var person in group.OrderBy(p => p.Name))
            GroupedPeople.Add(new PersonItem(person));
    }
}
```

Use a `DataTemplateSelector` (via `DataTemplate` with `DataType`) to render headers and items differently:

```xml
<ListBox ItemsSource="{Binding GroupedPeople}">
    <ListBox.DataTemplates>
        <DataTemplate DataType="local:GroupHeader">
            <TextBlock Text="{Binding Title}"
                       FontWeight="Bold" FontSize="14"
                       Margin="0,8,0,4" />
        </DataTemplate>
        <DataTemplate DataType="local:PersonItem">
            <StackPanel Orientation="Horizontal" Spacing="8" Margin="12,0,0,0">
                <TextBlock Text="{Binding Person.Name}" />
                <TextBlock Text="{Binding Person.Age}" Foreground="Gray" />
            </StackPanel>
        </DataTemplate>
    </ListBox.DataTemplates>
</ListBox>
```

### With DynamicData GroupOn

```csharp
_source.Connect()
    .GroupOn(p => p.Department)
    .Transform(group => new DepartmentGroup(group.Key, group.List))
    .Bind(out _groups)
    .Subscribe();
```

## Best practices

- Keep filtering, sorting, and grouping logic in the view model, not in code-behind.
- For large collections, use DynamicData for efficient reactive updates instead of rebuilding the collection on every change.
- When sorting or filtering changes, avoid clearing and re-adding if possible. DynamicData handles incremental updates automatically.
- Use `ReadOnlyObservableCollection<T>` for the public property to prevent external modification.
- Consider debouncing filter input (e.g., with `Throttle`) for search boxes that filter on every keystroke.

## See also

- [How to Bind to a Collection](/docs/data-binding/how-to-bind-to-a-collection): Basic collection binding patterns.
- [Data Templates](/docs/data-templates/introduction-to-data-templates): Controlling how items are rendered.
- [INotifyPropertyChanged](/docs/data-binding/inotifypropertychanged): Change notification for view models.
