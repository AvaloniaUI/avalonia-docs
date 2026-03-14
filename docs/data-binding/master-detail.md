---
id: master-detail
title: Master-detail binding
description: Implement master-detail patterns where selecting an item displays its details in a bound view.
doc-type: how-to
---

A master-detail pattern displays a list of items (the "master") alongside the details of the currently selected item. You will find this pattern in email clients, settings screens, file managers, and many other applications. Avalonia makes it straightforward to wire up through data binding and `DataContext` inheritance.

## Basic master-detail

Bind a [`ListBox`](/api/avalonia/controls/listbox) to a collection and display the selected item's properties in an adjacent panel. The detail panel sets its `DataContext` to the `SelectedPerson` property, so every binding inside it resolves against the selected object:

```xml
<Grid ColumnDefinitions="250,*">
    <!-- Master: list of items -->
    <ListBox Grid.Column="0"
             ItemsSource="{Binding People}"
             SelectedItem="{Binding SelectedPerson}">
        <ListBox.ItemTemplate>
            <DataTemplate>
                <TextBlock Text="{Binding Name}" />
            </DataTemplate>
        </ListBox.ItemTemplate>
    </ListBox>

    <!-- Detail: selected item properties -->
    <StackPanel Grid.Column="1" Margin="16"
                DataContext="{Binding SelectedPerson}"
                IsVisible="{Binding $parent[Grid].((vm:MainViewModel)DataContext).SelectedPerson,
                            Converter={x:Static ObjectConverters.IsNotNull}}">
        <TextBlock Text="{Binding Name}" FontSize="20" FontWeight="Bold" />
        <TextBlock Text="{Binding Email}" Margin="0,4,0,0" />
        <TextBlock Text="{Binding Department}" Margin="0,4,0,0" />
    </StackPanel>
</Grid>
```

The view model:

```csharp
public partial class MainViewModel : ObservableObject
{
    public ObservableCollection<Person> People { get; } = new()
    {
        new Person("Alice", "alice@example.com", "Engineering"),
        new Person("Bob", "bob@example.com", "Design"),
        new Person("Charlie", "charlie@example.com", "Marketing"),
    };

    [ObservableProperty]
    private Person? _selectedPerson;
}

public record Person(string Name, string Email, string Department);
```

:::tip
When you set `DataContext` on the detail panel, every binding inside it resolves relative to the selected item. This keeps your XAML concise because you do not need to repeat `SelectedPerson.` before each property path.
:::

:::note
The `IsVisible` binding on the detail panel reaches back up through the visual tree to the parent `Grid` and casts its `DataContext` to your view model type. This is necessary because the detail panel's own `DataContext` is `null` when nothing is selected, so a local `IsVisible` binding would not evaluate correctly.
:::

## Editable detail view

For two-way binding in the detail panel, use `TwoWay` mode and ensure your model implements `INotifyPropertyChanged`. When you use the MVVM Toolkit, the `[ObservableProperty]` attribute generates the required notification logic:

```csharp
public partial class Person : ObservableObject
{
    [ObservableProperty]
    private string _name;

    [ObservableProperty]
    private string _email;

    [ObservableProperty]
    private string _department;

    public Person(string name, string email, string department)
    {
        _name = name;
        _email = email;
        _department = department;
    }
}
```

```xml
<StackPanel Grid.Column="1" Margin="16"
            DataContext="{Binding SelectedPerson}">
    <TextBox Text="{Binding Name}" PlaceholderText="Name" />
    <TextBox Text="{Binding Email}" PlaceholderText="Email" Margin="0,8,0,0" />
    <TextBox Text="{Binding Department}" PlaceholderText="Department" Margin="0,8,0,0" />
</StackPanel>
```

Changes in the text boxes update the item in the master list automatically because both panels share the same object reference. If you used a `record` type for your model (as in the basic example above), you would need to switch to a class that raises `PropertyChanged` notifications for editable scenarios.

:::warning
If your `ListBox.ItemTemplate` displays the same property you are editing (for example, `Name`), the list entry only updates in real time when the model raises `PropertyChanged`. A plain POCO or C# record will not trigger a UI refresh in the master list.
:::

## Master-detail with a separate detail view model

For complex detail views, create a dedicated view model that updates when the selection changes. This approach is useful when you need to load additional data, run validation, or manage detail-specific commands:

```csharp
public partial class MainViewModel : ObservableObject
{
    public ObservableCollection<Person> People { get; } = new();

    [ObservableProperty]
    private Person? _selectedPerson;

    [ObservableProperty]
    private PersonDetailViewModel? _detail;

    partial void OnSelectedPersonChanged(Person? value)
    {
        Detail = value is not null ? new PersonDetailViewModel(value) : null;
    }
}

public partial class PersonDetailViewModel : ObservableObject
{
    private readonly Person _person;

    public PersonDetailViewModel(Person person)
    {
        _person = person;
        LoadDetails();
    }

    [ObservableProperty]
    private string _biography = "";

    [ObservableProperty]
    private ObservableCollection<string> _recentActivity = new();

    private void LoadDetails()
    {
        // Load additional data for the selected person.
    }
}
```

```xml
<ContentControl Grid.Column="1" Content="{Binding Detail}">
    <ContentControl.DataTemplates>
        <DataTemplate DataType="vm:PersonDetailViewModel">
            <StackPanel Margin="16" Spacing="8">
                <TextBlock Text="{Binding Biography}" TextWrapping="Wrap" />
                <ItemsControl ItemsSource="{Binding RecentActivity}" />
            </StackPanel>
        </DataTemplate>
    </ContentControl.DataTemplates>
</ContentControl>
```

:::tip
If your detail data is loaded asynchronously, consider setting placeholder values (or showing a loading indicator) in the constructor, then updating the properties once the async operation completes. This prevents blank content from flashing briefly while data loads.
:::

## Master-detail with navigation

In mobile or compact layouts, the detail replaces the master list instead of appearing side by side. You can achieve this with a visibility toggle and `TransitioningContentControl` for animated transitions:

```csharp
public partial class MainViewModel : ObservableObject
{
    public ObservableCollection<Person> People { get; } = new();

    [ObservableProperty]
    private Person? _selectedPerson;

    [ObservableProperty]
    private bool _showDetail;

    partial void OnSelectedPersonChanged(Person? value)
    {
        ShowDetail = value is not null;
    }

    [RelayCommand]
    private void GoBack()
    {
        SelectedPerson = null;
        ShowDetail = false;
    }
}
```

```xml
<Panel>
    <!-- Master list -->
    <ListBox ItemsSource="{Binding People}"
             SelectedItem="{Binding SelectedPerson}"
             IsVisible="{Binding !ShowDetail}" />

    <!-- Detail view -->
    <StackPanel IsVisible="{Binding ShowDetail}" Margin="16">
        <Button Content="Back" Command="{Binding GoBackCommand}" />
        <TextBlock Text="{Binding SelectedPerson.Name}" FontSize="20" />
    </StackPanel>
</Panel>
```

:::note
If you want to preserve the user's scroll position in the master list when they navigate back, keep the `ListBox` in the visual tree (using `IsVisible`) rather than removing it with a `ContentControl` swap. Hidden controls retain their state.
:::

## Nested master-detail

For hierarchical data such as categories containing items, you can chain multiple master-detail levels. Each column binds its `ItemsSource` to the selected item from the previous level:

```xml
<Grid ColumnDefinitions="200,200,*">
    <!-- Level 1: Categories -->
    <ListBox Grid.Column="0"
             ItemsSource="{Binding Categories}"
             SelectedItem="{Binding SelectedCategory}">
        <ListBox.ItemTemplate>
            <DataTemplate>
                <TextBlock Text="{Binding Name}" />
            </DataTemplate>
        </ListBox.ItemTemplate>
    </ListBox>

    <!-- Level 2: Items in category -->
    <ListBox Grid.Column="1"
             ItemsSource="{Binding SelectedCategory.Items}"
             SelectedItem="{Binding SelectedItem}">
        <ListBox.ItemTemplate>
            <DataTemplate>
                <TextBlock Text="{Binding Title}" />
            </DataTemplate>
        </ListBox.ItemTemplate>
    </ListBox>

    <!-- Level 3: Item details -->
    <StackPanel Grid.Column="2" Margin="16"
                DataContext="{Binding SelectedItem}">
        <TextBlock Text="{Binding Title}" FontSize="20" FontWeight="Bold" />
        <TextBlock Text="{Binding Description}" TextWrapping="Wrap" />
    </StackPanel>
</Grid>
```

:::warning
When the user selects a new category, the second-level `ListBox` receives a new `ItemsSource` and loses its selection. If you do not explicitly clear `SelectedItem` in your view model when `SelectedCategory` changes, you may display stale detail content from the previous category. Handle this by resetting `SelectedItem` to `null` inside `OnSelectedCategoryChanged`.
:::

## Placeholder for empty selection

Show a message or graphic when no item is selected so that the detail area does not appear blank:

```xml
<Panel Grid.Column="1">
    <!-- Shown when nothing is selected -->
    <TextBlock Text="Select an item to view details"
               HorizontalAlignment="Center"
               VerticalAlignment="Center"
               Foreground="Gray"
               IsVisible="{Binding SelectedPerson,
                           Converter={x:Static ObjectConverters.IsNull}}" />

    <!-- Detail panel -->
    <StackPanel DataContext="{Binding SelectedPerson}"
                IsVisible="{Binding $parent[Panel].((vm:MainViewModel)DataContext).SelectedPerson,
                            Converter={x:Static ObjectConverters.IsNotNull}}">
        <TextBlock Text="{Binding Name}" FontSize="20" />
    </StackPanel>
</Panel>
```

You can replace the placeholder `TextBlock` with an image, an icon, or any custom layout that fits your application's design.

## See also

- [Bind to a collection](/docs/data-binding/how-to-bind-to-a-collection): Binding `ItemsSource` and `DataTemplate` usage.
- [Data templates](/docs/data-templates/introduction-to-data-templates): Controlling how items are displayed.
- [Data context](/docs/data-binding/data-context): How `DataContext` flows through the control tree.
- [Collection views](/docs/data-binding/collection-views): Sorting, filtering, and grouping bound collections.
- [Compiled bindings](/docs/data-binding/compiled-bindings): Improve binding performance and catch errors at compile time.
