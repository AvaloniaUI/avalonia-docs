---
description: Frequently asked questions and troubleshooting for TreeDataGrid
---

# Frequently Asked Questions

## Data Updates

### Q: TreeDataGrid doesn't update when I change model properties

**Problem**: You're modifying properties on your data objects, but the grid doesn't reflect the changes.

**Solution**: Your data model must implement `INotifyPropertyChanged`. The TreeDataGrid relies on property change notifications to update the UI.

```csharp
// ❌ Wrong - No property change notifications
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

// ✅ Correct - Implements INotifyPropertyChanged
public class Person : INotifyPropertyChanged
{
    private string _name;
    private int _age;

    public string Name
    {
        get => _name;
        set
        {
            if (_name != value)
            {
                _name = value;
                OnPropertyChanged();
            }
        }
    }

    public int Age
    {
        get => _age;
        set
        {
            if (_age != value)
            {
                _age = value;
                OnPropertyChanged();
            }
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

### Q: New items don't appear when I add them to the collection

**Problem**: You're adding items to a `List<T>` or array, but the grid doesn't show new items.

**Solution**: Use `ObservableCollection<T>` instead, which automatically notifies the grid of collection changes.

```csharp
// ❌ Wrong - List doesn't notify of changes
private List<Person> _people = new List<Person>();

// ✅ Correct - ObservableCollection notifies of changes
private ObservableCollection<Person> _people = new ObservableCollection<Person>();
```

## Cell Editing

### Q: Cell editing doesn't work when I click on cells

**Problem**: Clicking cells doesn't begin editing.

**Solution**: Make sure you've provided both a getter and setter in the column definition:

```csharp
// ❌ Wrong - No setter, column is read-only
new TextColumn<Person, string>("Name", x => x.Name)

// ✅ Correct - Has both getter and setter
new TextColumn<Person, string>(
    "Name",
    x => x.Name,
    (row, value) => row.Name = value)
```

You may also need to specify the edit gesture:

```csharp
new TextColumn<Person, string>(
    "Name",
    x => x.Name,
    (row, value) => row.Name = value,
    options: new TextColumnOptions<Person>
    {
        BeginEditGestures = BeginEditGestures.Tap
    })
```
