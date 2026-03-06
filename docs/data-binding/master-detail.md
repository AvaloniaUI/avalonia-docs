---
id: master-detail
title: Master-Detail Binding
---

A master-detail pattern displays a list of items (the "master") alongside the details of the selected item. This is one of the most common UI patterns, used in email clients, settings screens, file managers, and many other applications.

## Basic Master-Detail

Bind a `ListBox` to a collection and display the selected item's details in an adjacent panel:

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

## Editable Detail View

For two-way binding in the detail panel, use `TwoWay` mode and ensure the model implements `INotifyPropertyChanged`:

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

Changes in the text boxes update the item in the master list automatically because both panels share the same object reference.

## Master-Detail with Separate Detail ViewModel

For complex detail views, use a dedicated view model that updates when the selection changes:

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
        // Load additional data for the selected person
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

## Master-Detail with Navigation

In mobile or compact layouts, the detail replaces the master list instead of appearing side by side. Use a navigation pattern with `TransitioningContentControl`:

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

## Nested Master-Detail

For hierarchical data (e.g., categories containing items), chain multiple master-detail levels:

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

## Placeholder for Empty Selection

Show a message or graphic when no item is selected:

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

## See Also

- [How to Bind to a Collection](/docs/data-binding/how-to-bind-to-a-collection): Binding ItemsSource and DataTemplates.
- [Data Templates](/docs/data-templates/introduction-to-data-templates): Controlling how items are displayed.
- [Data Context](/docs/data-binding/data-context): How DataContext flows through the control tree.
- [Collection Views](/docs/data-binding/collection-views): Sorting, filtering, and grouping bound collections.
