---
id: how-to-bind-to-a-collection
title: How to Bind to a Collection
---


# How to Bind to a Collection

Binding to a collection in Avalonia UI is an effective way to display dynamic data. This guide will demonstrate how to bind an `ObservableCollection` to a control, like a `ListBox` or `ItemsControl`, to show a list of items.

## Binding to a Simple ObservableCollection

For a start, consider you have an `ObservableCollection<string>` and you want to bind it to a `ListBox` to display a list of string items.

Here's an example `ViewModel` with an `ObservableCollection<string>`:

```csharp 
public class ViewModel : ObservableObject
{
    private ObservableCollection<string> _items;

    public ObservableCollection<string> Items
    {
        get { return _items; }
        set { SetProperty(ref _items, value); }
    }

    public ViewModel()
    {
        Items = new ObservableCollection<string> { "Item 1", "Item 2", "Item 3" };
    }
}
```

In your view, you can bind this `ObservableCollection` to a `ListBox` like so:

```xml
<ListBox ItemsSource="{Binding Items}"/>
```

## Binding to an ObservableCollection of Complex Objects

But what if your `ObservableCollection` contains complex objects that themselves need to propagate changes? Let's modify our `ViewModel` to accommodate this scenario.

Consider a `Person` class:

```csharp
public class Person : ObservableObject
{
    private string _name;
    private int _age;

    public string Name
    {
        get { return _name; }
        set { SetProperty(ref _name, value); }
    }

    public int Age
    {
        get { return _age; }
        set { SetProperty(ref _age, value); }
    }
}
```

And an `ObservableCollection<Person>` in our ViewModel:

```csharp
public class ViewModel : ObservableObject
{
    private ObservableCollection<Person> _people;

    public ObservableCollection<Person> People
    {
        get { return _people; }
        set { SetProperty(ref _people, value); }
    }

    public ViewModel()
    {
        People = new ObservableCollection<Person> 
        {
            new Person { Name = "John Doe", Age = 30 },
            new Person { Name = "Jane Doe", Age = 28 }
        };
    }
}
```

You can bind this `ObservableCollection` to a `ListBox` in your view, and use a `DataTemplate` to specify how each `Person` should be presented:

```xml
<ListBox ItemsSource="{Binding People}">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <TextBlock Text="{Binding Name}" Margin="0,0,10,0"/>
                <TextBlock Text="{Binding Age}"/>
            </StackPanel>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

In this scenario, each `Person` in the list will be displayed with their `Name` and `Age` separated by a small margin. If any of items properties change, the `ListBox` item will automatically update. 

















