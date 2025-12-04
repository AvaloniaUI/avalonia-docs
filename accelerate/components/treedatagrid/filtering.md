---
description: How to filter data in TreeDataGrid
---

# Filtering <MinVersion version="11.3" /> 

Filtering allows you to display only rows that match specific criteria in your TreeDataGrid. Both `FlatTreeDataGridSource` and `HierarchicalTreeDataGridSource` support filtering through predicate functions.

## Enabling Filtering

Filtering is enabled by calling the `Filter` method on a `FlatTreeDataGridSource` or `HierarchicalTreeDataGridSource` with a filtering predicate.

The filter predicate is a function that receives each model item and returns `true` if the item should be displayed, or `false` if it should be hidden.

### Basic String Filtering

For example, to filter a model with a string `Name` property according to a string stored in a `_filterString`:

```csharp
Source.Filter(x => x.Name.Contains(_filterString, StringComparison.CurrentCultureIgnoreCase));
```

### Multiple Criteria Filtering

You can combine multiple conditions in your filter predicate:

```csharp
// Filter by name AND age
Source.Filter(x => 
    x.Name.Contains(_filterString, StringComparison.CurrentCultureIgnoreCase) &&
    x.Age >= _minimumAge);

// Filter by first name OR last name OR email
Source.Filter(x => 
    x.FirstName.Contains(_searchText, StringComparison.CurrentCultureIgnoreCase) ||
    x.LastName.Contains(_searchText, StringComparison.CurrentCultureIgnoreCase) ||
    x.Email.Contains(_searchText, StringComparison.CurrentCultureIgnoreCase));
```

### Complex Filtering

Filter predicates can use any C# expression:

```csharp
// Filter using LINQ methods
Source.Filter(x => x.Tags.Any(tag => tag.Contains(_filterText)));

// Filter using custom methods
Source.Filter(x => IsMatchingCriteria(x));

private bool IsMatchingCriteria(Person person)
{
    if (string.IsNullOrWhiteSpace(_filterText))
        return true;
        
    return person.Name.Contains(_filterText, StringComparison.CurrentCultureIgnoreCase) ||
           person.Department.Contains(_filterText, StringComparison.CurrentCultureIgnoreCase);
}
```

## Updating Filtering

When the filter predicate depends on external variables (such as `_filterString` in the examples above), the filter needs to be refreshed when those variables change.

Call the `RefreshFilter` method to re-evaluate the filter predicate for all items:

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
`RefreshFilter` does not need to be called when you call `Filter` to change the filter predicate itself - only when the external variables that the predicate depends on change.
:::

## Clearing Filtering

To remove all filtering and display all items, pass `null` to the `Filter` method:

```csharp
Source.Filter(null);
```

## Hierarchical Data Filtering

When filtering hierarchical data with `HierarchicalTreeDataGridSource`, the filter predicate is evaluated independently for each item at every level of the hierarchy. Each item is shown or hidden based solely on whether it matches the filter - the filter doesn't automatically show parent items just because their children match, or vice versa. This may result in poor performance with large trees, so you may want to consider building the filter state into your data model.

## Performance Considerations

Filter operations run on the UI thread and re-evaluate every item in the source. For large datasets:

- Use `Throttle` when filtering based on user input (as shown in the ReactiveUI example)
- Keep filter predicates simple and avoid expensive operations
- Consider filtering the underlying data collection before binding to the grid for very large datasets
- Use indexes or pre-computed properties when possible

## Complete Example

Here's a complete example showing filtering with a search box:

C#:

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

XAML:

```xml
<StackPanel>
    <TextBox Text="{Binding SearchText}"
             Watermark="Search..."
             Margin="0,0,0,10" />
    <TreeDataGrid Source="{Binding Source}"
                  Height="400" />
</StackPanel>
```