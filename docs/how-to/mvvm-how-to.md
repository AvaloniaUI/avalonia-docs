---
id: mvvm-how-to
title: "How to: Implement Common MVVM Patterns"
description: Practical MVVM patterns for Avalonia using CommunityToolkit.Mvvm as the MVVM framework.
doc-type: how-to
---

This guide covers practical MVVM patterns for Avalonia using CommunityToolkit.Mvvm, the recommended MVVM framework.

## Setting Up CommunityToolkit.Mvvm

Add the NuGet package:

```bash
dotnet add package CommunityToolkit.Mvvm
```

## Observable Properties

Use `[ObservableProperty]` to generate property changed notifications:

```csharp
using CommunityToolkit.Mvvm.ComponentModel;

public partial class PersonViewModel : ObservableObject
{
    [ObservableProperty]
    private string _firstName = "";

    [ObservableProperty]
    private string _lastName = "";

    // Generated: FirstName and LastName properties with INotifyPropertyChanged
}
```

### Computed properties

Notify dependent properties when a source property changes:

```csharp
[ObservableProperty]
[NotifyPropertyChangedFor(nameof(FullName))]
private string _firstName = "";

[ObservableProperty]
[NotifyPropertyChangedFor(nameof(FullName))]
private string _lastName = "";

public string FullName => $"{FirstName} {LastName}";
```

### Property changed callbacks

Run code when a property changes:

```csharp
[ObservableProperty]
private string _searchText = "";

partial void OnSearchTextChanged(string value)
{
    // Called after SearchText changes
    ApplyFilter(value);
}

partial void OnSearchTextChanging(string value)
{
    // Called before SearchText changes
}
```

## Commands

### Basic command

```csharp
[RelayCommand]
private void Save()
{
    _repository.Save(CurrentItem);
}
```

Generates a `SaveCommand` property of type `IRelayCommand`.

### Command with parameter

```csharp
[RelayCommand]
private void Delete(Item item)
{
    Items.Remove(item);
}
```

```xml
<Button Content="Delete"
        Command="{Binding DeleteCommand}"
        CommandParameter="{Binding SelectedItem}" />
```

### Async command

```csharp
[RelayCommand]
private async Task LoadDataAsync(CancellationToken token)
{
    IsLoading = true;
    var data = await _api.FetchDataAsync(token);
    Items = new ObservableCollection<Item>(data);
    IsLoading = false;
}
```

The generated command automatically:
- Disables the button while running
- Passes a `CancellationToken` for cancellation
- Exposes `IsRunning` for progress indication

```xml
<Button Content="Load" Command="{Binding LoadDataCommand}" />
<ProgressBar IsVisible="{Binding LoadDataCommand.IsRunning}" IsIndeterminate="True" />
```

### CanExecute

```csharp
[ObservableProperty]
[NotifyCanExecuteChangedFor(nameof(SaveCommand))]
private string _name = "";

[RelayCommand(CanExecute = nameof(CanSave))]
private void Save()
{
    // Save logic
}

private bool CanSave() => !string.IsNullOrWhiteSpace(Name);
```

The button is automatically disabled when `CanSave()` returns `false`.

## View Model Communication

### Using a messenger

Send messages between view models without direct references:

```csharp
using CommunityToolkit.Mvvm.Messaging;

// Define a message
public record ItemSelectedMessage(Item Item);

// Send from one view model
WeakReferenceMessenger.Default.Send(new ItemSelectedMessage(selectedItem));

// Receive in another
public class DetailViewModel : ObservableRecipient, IRecipient<ItemSelectedMessage>
{
    public DetailViewModel()
    {
        IsActive = true; // Start receiving messages
    }

    public void Receive(ItemSelectedMessage message)
    {
        LoadItem(message.Item);
    }
}
```

### Request/response pattern

```csharp
public record ConfirmDeleteRequest(Item Item);

// Request
var confirmed = WeakReferenceMessenger.Default
    .Send(new ConfirmDeleteRequest(item));

// Response handler (in the view or a coordinator)
WeakReferenceMessenger.Default.Register<ConfirmDeleteRequest>(this, async (r, m) =>
{
    // Show confirmation dialog
    m.Reply(await ShowConfirmDialogAsync());
});
```

## Dependency Injection

Register view models with a DI container:

```csharp
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddViewModels(this IServiceCollection services)
    {
        services.AddTransient<MainViewModel>();
        services.AddTransient<SettingsViewModel>();
        services.AddSingleton<IDataService, DataService>();
        return services;
    }
}
```

Set up in `App.axaml.cs`:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    var services = new ServiceCollection();
    services.AddViewModels();
    var provider = services.BuildServiceProvider();

    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    {
        desktop.MainWindow = new MainWindow
        {
            DataContext = provider.GetRequiredService<MainViewModel>()
        };
    }

    base.OnFrameworkInitializationCompleted();
}
```

## View Model with Constructor Injection

```csharp
public partial class MainViewModel : ObservableObject
{
    private readonly IDataService _dataService;
    private readonly INavigationService _navigation;

    public MainViewModel(IDataService dataService, INavigationService navigation)
    {
        _dataService = dataService;
        _navigation = navigation;
    }

    [RelayCommand]
    private async Task LoadAsync()
    {
        var items = await _dataService.GetItemsAsync();
        Items = new ObservableCollection<Item>(items);
    }
}
```

## ObservableCollection Patterns

### Replace vs. add

For large updates, replace the collection instead of adding items one at a time:

```csharp
// Slow: UI updates on each Add
foreach (var item in newItems)
    Items.Add(item);

// Fast: single notification
Items = new ObservableCollection<Item>(newItems);
```

### Filtered collection

```csharp
[ObservableProperty]
private string _filter = "";

[ObservableProperty]
private ObservableCollection<Item> _filteredItems = new();

partial void OnFilterChanged(string value)
{
    FilteredItems = new ObservableCollection<Item>(
        _allItems.Where(i => i.Name.Contains(value, StringComparison.OrdinalIgnoreCase)));
}
```

## Validation

Use `ObservableValidator` for data annotations:

```csharp
public partial class RegisterViewModel : ObservableValidator
{
    [ObservableProperty]
    [NotifyDataErrorInfo]
    [Required(ErrorMessage = "Name is required")]
    private string _name = "";

    [RelayCommand]
    private void Submit()
    {
        ValidateAllProperties();
        if (!HasErrors)
        {
            // Proceed
        }
    }
}
```

See [Validation in Data Binding](/docs/data-binding/binding-validation) for details.

## See Also

- [The MVVM Pattern](/docs/fundamentals/the-mvvm-pattern): Architecture overview.
- [Binding to Commands](/docs/data-binding/binding-to-commands): Command binding details.
- [INotifyPropertyChanged](/docs/data-binding/inotifypropertychanged): Property change notification.
- [Dependency Injection](/docs/app-development/dependency-injection): DI setup for Avalonia.
