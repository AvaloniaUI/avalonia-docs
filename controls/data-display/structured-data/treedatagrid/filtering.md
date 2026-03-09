---
id: filtering
title: Filtering
description: Learn how to filter rows in the Avalonia TreeDataGrid control using predicate functions, including multi-criteria, enum, null-safe, and hierarchical filtering patterns.
doc-type: reference
tags:
  - accelerate
---

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Business or higher.
:::

Filtering lets you display only the rows that match specific criteria in your `TreeDataGrid`. Both `FlatTreeDataGridSource` and `HierarchicalTreeDataGridSource` support filtering through predicate functions.

## Enabling filtering

You enable filtering by calling the `Filter` method on your `FlatTreeDataGridSource` or `HierarchicalTreeDataGridSource` with a predicate function. The predicate receives each model item and returns `true` if the item should be visible, or `false` if it should be hidden.

### Basic string filtering

To filter a model with a string `Name` property according to a value stored in `_filterString`:

```csharp
Source.Filter(x => x.Name.Contains(_filterString, StringComparison.CurrentCultureIgnoreCase));
```

### Multiple criteria filtering

You can combine multiple conditions in your filter predicate:

```csharp
// Filter by name AND minimum age
Source.Filter(x =>
    x.Name.Contains(_filterString, StringComparison.CurrentCultureIgnoreCase) &&
    x.Age >= _minimumAge);

// Filter by first name OR last name OR email
Source.Filter(x =>
    x.FirstName.Contains(_searchText, StringComparison.CurrentCultureIgnoreCase) ||
    x.LastName.Contains(_searchText, StringComparison.CurrentCultureIgnoreCase) ||
    x.Email.Contains(_searchText, StringComparison.CurrentCultureIgnoreCase));
```

### Enum and category filtering

When your model includes an enum or category property, you can filter against a selected value:

```csharp
// Filter by a selected department enum
Source.Filter(x => _selectedDepartment == null || x.Department == _selectedDepartment);
```

### Null-safe filtering

If the properties you are filtering on can be `null`, guard against `NullReferenceException` in your predicate:

```csharp
Source.Filter(x =>
    (x.Name?.Contains(_filterString, StringComparison.CurrentCultureIgnoreCase) ?? false) ||
    (x.Email?.Contains(_filterString, StringComparison.CurrentCultureIgnoreCase) ?? false));
```

### Complex filtering

Filter predicates can use any C# expression, including LINQ methods and helper functions:

```csharp
// Filter using LINQ methods
Source.Filter(x => x.Tags.Any(tag => tag.Contains(_filterText)));

// Filter using a helper method
Source.Filter(x => IsMatchingCriteria(x));

private bool IsMatchingCriteria(Person person)
{
    if (string.IsNullOrWhiteSpace(_filterText))
        return true;

    return person.Name.Contains(_filterText, StringComparison.CurrentCultureIgnoreCase) ||
           person.Department.Contains(_filterText, StringComparison.CurrentCultureIgnoreCase);
}
```

## Updating the filter

When your filter predicate depends on external variables (such as `_filterString` in the examples above), you need to refresh the filter whenever those variables change. Call `RefreshFilter` to re-evaluate the predicate for every item:

```csharp
private string _filterString = string.Empty;

public string FilterString
{
    get => _filterString;
    set
    {
        _filterString = value;
        Source.RefreshFilter();
    }
}
```

:::info
You do not need to call `RefreshFilter` when you call `Filter` to replace the predicate itself. Call it only when the external variables that the existing predicate depends on change.
:::

## Clearing the filter

To remove filtering and show all items again, pass `null` to the `Filter` method:

```csharp
Source.Filter(null);
```

This is useful when your user clears a search box or resets filter controls.

## Hierarchical data filtering

When you filter hierarchical data with `HierarchicalTreeDataGridSource`, the predicate is evaluated independently for each item at every level of the hierarchy. Each item is shown or hidden based solely on whether it matches the filter. The control does not automatically show parent items because their children match, or vice versa.

:::warning
Filtering large hierarchical trees can be expensive because every node must be visited. If performance is a concern, consider building the filter state into your data model so that you can skip entire subtrees.
:::

### Keeping parent items visible

If you want parent items to remain visible whenever any of their children match the filter, you need to implement that logic yourself. One approach is to pre-compute a set of matching IDs (including ancestor IDs) and check membership in the predicate:

```csharp
var matchingIds = new HashSet<int>();

void CollectMatches(IEnumerable<TreeNode> nodes)
{
    foreach (var node in nodes)
    {
        if (node.Name.Contains(_filterText, StringComparison.CurrentCultureIgnoreCase))
        {
            // Add the node and all its ancestors
            var current = node;
            while (current != null)
            {
                matchingIds.Add(current.Id);
                current = current.Parent;
            }
        }

        CollectMatches(node.Children);
    }
}

CollectMatches(_rootNodes);
Source.Filter(x => matchingIds.Contains(x.Id));
```

## Performance considerations

Filter operations run on the UI thread and re-evaluate every item in the source. For large datasets, keep these guidelines in mind:

- **Throttle user input.** When filtering is driven by a [`TextBox`](/api/avalonia/controls/textbox), use `Observable.Throttle` or a delay timer so the predicate does not run on every keystroke.
- **Keep predicates fast.** Avoid allocations, regular expressions, or database calls inside the predicate.
- **Pre-compute expensive values.** Store searchable text in a dedicated property so the predicate only needs a simple string comparison.
- **Filter upstream for very large collections.** If your dataset has tens of thousands of rows, consider filtering the underlying collection before binding it to the grid.

### Throttled filtering example

You can use Reactive Extensions to throttle filter updates from a `TextBox`:

```csharp
this.WhenAnyValue(x => x.SearchText)
    .Throttle(TimeSpan.FromMilliseconds(300))
    .ObserveOn(RxApp.MainThreadScheduler)
    .Subscribe(_ => ApplyFilter());
```

## Complete example

The following example wires a search `TextBox` to a `FlatTreeDataGridSource<Person>` filter.

**ViewModel:**

```csharp
public class PersonListViewModel : ViewModelBase
{
    private readonly ObservableCollection<Person> _allPeople;
    private string _searchText = string.Empty;

    public FlatTreeDataGridSource<Person> Source { get; }

    public string SearchText
    {
        get => _searchText;
        set
        {
            if (_searchText != value)
            {
                _searchText = value;
                OnPropertyChanged();
                ApplyFilter();
            }
        }
    }

    public PersonListViewModel()
    {
        _allPeople = new ObservableCollection<Person>
        {
            new Person { Name = "John Doe", Age = 30, Department = "IT" },
            new Person { Name = "Jane Smith", Age = 25, Department = "HR" },
            new Person { Name = "Bob Johnson", Age = 35, Department = "IT" },
        };

        Source = new FlatTreeDataGridSource<Person>(_allPeople)
        {
            Columns =
            {
                new TextColumn<Person, string>("Name", x => x.Name),
                new TextColumn<Person, int>("Age", x => x.Age),
                new TextColumn<Person, string>("Department", x => x.Department),
            }
        };
    }

    private void ApplyFilter()
    {
        if (string.IsNullOrWhiteSpace(_searchText))
        {
            Source.Filter(null);
        }
        else
        {
            Source.Filter(x =>
                x.Name.Contains(_searchText, StringComparison.CurrentCultureIgnoreCase) ||
                x.Department.Contains(_searchText, StringComparison.CurrentCultureIgnoreCase));
        }
    }
}
```

**View:**

```xml
<StackPanel>
    <TextBox Text="{Binding SearchText}"
             Watermark="Search..."
             Margin="0,0,0,10" />
    <TreeDataGrid Source="{Binding Source}"
                  Height="400" />
</StackPanel>
```

## See also

- [TreeDataGrid overview](/controls/data-display/structured-data/treedatagrid/)
- [Column types](/controls/data-display/structured-data/treedatagrid/column-types)
- [Sorting](/controls/data-display/structured-data/treedatagrid/sorting)
- [Selection modes](/controls/data-display/structured-data/treedatagrid/selection-modes)
- [Expand and collapse operations](/controls/data-display/structured-data/treedatagrid/expand-and-collapse)
