---
id: how-to-bind-to-a-collection
title: How to bind to a collection
description: Bind an ObservableCollection to list controls so the UI updates automatically when items are added, removed, or modified.
doc-type: how-to
---

When your application needs to display a dynamic list of items, you bind a collection property to a list control such as [`ListBox`](/api/avalonia/controls/listbox), [`ItemsControl`](/api/avalonia/controls/itemscontrol), or `ComboBox`. By using `ObservableCollection<T>`, the UI stays in sync whenever you add, remove, or reorder items. This guide walks you through the common scenarios for collection binding in Avalonia.

## Why use `ObservableCollection<T>`

A standard `List<T>` does not notify the UI when its contents change. If you add an item to a `List<T>` at runtime, the control will not update. `ObservableCollection<T>` implements `INotifyCollectionChanged`, which raises events that Avalonia listens for so the bound control can refresh automatically.

Use `ObservableCollection<T>` when:

- Items are added or removed after the initial load.
- You need the UI to reflect changes without manually rebinding.

If your collection is static (loaded once and never modified), a simple `List<T>` or array works fine.

## Bind to a simple `ObservableCollection`

Start with an `ObservableCollection<string>` bound to a `ListBox`.

Define the collection in your view model:

```csharp
public class MainViewModel : ObservableObject
{
    private ObservableCollection<string> _items;

    public ObservableCollection<string> Items
    {
        get => _items;
        set => SetProperty(ref _items, value);
    }

    public MainViewModel()
    {
        Items = new ObservableCollection<string> { "Item 1", "Item 2", "Item 3" };
    }
}
```

Bind the collection to a `ListBox` in your AXAML:

```xml
<ListBox ItemsSource="{Binding Items}" />
```

When you call `Items.Add("Item 4")` in your view model, the `ListBox` displays the new entry immediately.

## Bind to a collection of complex objects

When your collection contains objects with multiple properties, use a `DataTemplate` to control how each item appears. For property changes on individual items to propagate to the UI, each item class must also implement change notification.

Define a `Person` class that extends `ObservableObject`:

```csharp
public class Person : ObservableObject
{
    private string _name;
    private int _age;

    public string Name
    {
        get => _name;
        set => SetProperty(ref _name, value);
    }

    public int Age
    {
        get => _age;
        set => SetProperty(ref _age, value);
    }
}
```

Expose an `ObservableCollection<Person>` from your view model:

```csharp
public class MainViewModel : ObservableObject
{
    private ObservableCollection<Person> _people;

    public ObservableCollection<Person> People
    {
        get => _people;
        set => SetProperty(ref _people, value);
    }

    public MainViewModel()
    {
        People = new ObservableCollection<Person>
        {
            new Person { Name = "John Doe", Age = 30 },
            new Person { Name = "Jane Doe", Age = 28 }
        };
    }
}
```

Bind the collection to a `ListBox` with a `DataTemplate`:

```xml
<ListBox ItemsSource="{Binding People}">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <TextBlock Text="{Binding Name}" Margin="0,0,10,0" />
                <TextBlock Text="{Binding Age}" />
            </StackPanel>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

Each `Person` appears with their `Name` and `Age` side by side. Because `Person` extends `ObservableObject`, editing a person's `Name` or `Age` in code updates the corresponding `ListBox` row without any extra work.

## Add and remove items at runtime

A common pattern is to pair collection binding with commands that let the user add or remove entries:

```csharp
public class MainViewModel : ObservableObject
{
    public ObservableCollection<string> Items { get; } = new();

    public ICommand AddItemCommand { get; }
    public ICommand RemoveItemCommand { get; }

    public MainViewModel()
    {
        Items.Add("First item");

        AddItemCommand = new RelayCommand(() =>
        {
            Items.Add($"Item {Items.Count + 1}");
        });

        RemoveItemCommand = new RelayCommand(() =>
        {
            if (Items.Count > 0)
                Items.RemoveAt(Items.Count - 1);
        },
        () => Items.Count > 0);
    }
}
```

```xml
<DockPanel>
    <StackPanel DockPanel.Dock="Top" Orientation="Horizontal" Spacing="8" Margin="0,0,0,8">
        <Button Content="Add" Command="{Binding AddItemCommand}" />
        <Button Content="Remove" Command="{Binding RemoveItemCommand}" />
    </StackPanel>
    <ListBox ItemsSource="{Binding Items}" />
</DockPanel>
```

## Use `ItemsControl` for non-selectable lists

If you do not need selection behavior, use `ItemsControl` instead of `ListBox`. It renders each item without selection highlighting or keyboard navigation:

```xml
<ItemsControl ItemsSource="{Binding People}">
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <Border Padding="8" Margin="0,0,0,4" Background="#f0f0f0" CornerRadius="4">
                <TextBlock Text="{Binding Name}" />
            </Border>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

## Common pitfalls

| Problem | Cause | Solution |
|---|---|---|
| UI does not update when items are added | Using `List<T>` instead of `ObservableCollection<T>` | Switch to `ObservableCollection<T>` |
| UI does not update when a property on an item changes | Item class does not implement `INotifyPropertyChanged` | Have your item class extend `ObservableObject` or implement `INotifyPropertyChanged` |
| Replacing the entire collection does not update the UI | The collection property lacks change notification | Use `SetProperty` (or the `[ObservableProperty]` attribute) for the property that holds the collection |

## See also

- [Collection views](/docs/data-binding/collection-views): Sort, filter, and group bound collections.
- [Master-detail binding](/docs/data-binding/master-detail): Display details for the selected item in a list.
- [Data templates](/docs/data-templates/introduction-to-data-templates): Control how items are displayed.
- [INotifyPropertyChanged](/docs/data-binding/inotifypropertychanged): Change notification for view models.
- [Binding to commands](/docs/data-binding/binding-to-commands): Wire up buttons and other actions.









