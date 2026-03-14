---
id: mvvm-how-to
title: "How to: Implement common MVVM patterns"
description: Learn how to implement common MVVM patterns in Avalonia using CommunityToolkit.Mvvm, including observable properties, commands, messaging, dependency injection, and validation.
doc-type: how-to
---

This guide covers practical MVVM patterns for Avalonia using `CommunityToolkit.Mvvm`, the recommended MVVM framework. Each section walks you through a specific pattern with code you can adapt to your own projects.

## Setting up CommunityToolkit.Mvvm

Install the NuGet package in your project:

```bash
dotnet add package CommunityToolkit.Mvvm
```

Once installed, you can use source generators and base classes from the toolkit to eliminate boilerplate code in your view models.

## Observable properties

Use the `[ObservableProperty]` attribute to generate properties with `INotifyPropertyChanged` support automatically. You declare a private backing field, and the source generator creates a public property for you:

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

Your class must be marked `partial` so the source generator can add the generated members. The generated property names follow .NET conventions: `_firstName` becomes `FirstName`.

### Computed properties

When one property depends on another, use `[NotifyPropertyChangedFor]` to raise change notifications for the dependent property automatically:

```csharp
[ObservableProperty]
[NotifyPropertyChangedFor(nameof(FullName))]
private string _firstName = "";

[ObservableProperty]
[NotifyPropertyChangedFor(nameof(FullName))]
private string _lastName = "";

public string FullName => $"{FirstName} {LastName}";
```

Whenever `FirstName` or `LastName` changes, the toolkit also raises `PropertyChanged` for `FullName`, keeping your UI in sync.

### Property changed callbacks

You can run code when a property changes by defining partial methods that the source generator calls automatically:

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

The `OnSearchTextChanging` callback fires before the value is assigned, giving you a chance to inspect the incoming value. The `OnSearchTextChanged` callback fires after the assignment, which is useful for triggering side effects like filtering a list.

## Commands

Commands let you bind UI actions (such as button clicks) to methods in your view model.

### Basic command

Apply `[RelayCommand]` to a method, and the toolkit generates an `IRelayCommand` property for you:

```csharp
[RelayCommand]
private void Save()
{
    _repository.Save(CurrentItem);
}
```

This generates a `SaveCommand` property. The naming convention appends "Command" to your method name.

### Command with a parameter

You can pass data from the view to your command by adding a parameter to the method:

```csharp
[RelayCommand]
private void Delete(Item item)
{
    Items.Remove(item);
}
```

Bind the command and its parameter in AXAML:

```xml
<Button Content="Delete"
        Command="{Binding DeleteCommand}"
        CommandParameter="{Binding SelectedItem}" />
```

### Async command

For long-running operations, use an `async Task` method. The toolkit handles disabling the command while it runs and provides built-in cancellation support:

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

- Disables the associated button while the task is running
- Passes a `CancellationToken` you can use to cancel the operation
- Exposes an `IsRunning` property for progress indication

```xml
<Button Content="Load" Command="{Binding LoadDataCommand}" />
<ProgressBar IsVisible="{Binding LoadDataCommand.IsRunning}" IsIndeterminate="True" />
```

### CanExecute

You can conditionally enable or disable a command based on your view model state. Use `[NotifyCanExecuteChangedFor]` on properties that affect the condition so the command re-evaluates automatically:

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

The button bound to `SaveCommand` is automatically disabled when `CanSave()` returns `false`. When `Name` changes, the command re-evaluates whether it can execute.

## View model communication

### Using a messenger

The `WeakReferenceMessenger` lets you send messages between view models without creating direct references between them. This keeps your view models decoupled:

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

Setting `IsActive = true` registers the view model to receive messages. When you set it to `false` (or when the object is garbage collected), the registration is removed automatically.

### Request/response pattern

For scenarios where you need a response (such as a confirmation dialog), use a request message:

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

## Dependency injection

Register your view models and services with a DI container to manage their lifetimes and dependencies cleanly:

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

Wire up the container in `App.axaml.cs`:

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

Use `AddTransient` for view models that should be created fresh each time, and `AddSingleton` for shared services that maintain state across the application.

## View model with constructor injection

When you register your view models in a DI container, you can inject services through the constructor. The container resolves all dependencies automatically:

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

This pattern makes your view models testable because you can substitute mock implementations of `IDataService` and `INavigationService` in your unit tests.

## ObservableCollection patterns

### Replace vs. add

When updating a large number of items, replacing the entire collection is significantly faster than adding items individually. Each call to `Add` triggers a UI update, whereas assigning a new collection triggers only one:

```csharp
// Slow: UI updates on each Add
foreach (var item in newItems)
    Items.Add(item);

// Fast: single notification
Items = new ObservableCollection<Item>(newItems);
```

### Filtered collection

You can implement filtering by replacing the displayed collection whenever the filter text changes:

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

Bind your `ItemsControl` or `ListBox` to `FilteredItems` rather than the underlying `_allItems` collection.

## Validation

Use `ObservableValidator` as your base class to enable data annotation validation on your view model properties:

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
            // Proceed with submission
        }
    }
}
```

The `[NotifyDataErrorInfo]` attribute tells the source generator to trigger validation automatically when the property changes. Avalonia's data binding system picks up these validation errors and can display them in the UI using `DataValidationErrors`.

For more information about displaying validation errors in your views, see [Data validation](../data-binding/data-validation.md).

## See also

- [The MVVM pattern](../fundamentals/the-mvvm-pattern.md)
- [Binding to commands](../data-binding/binding-to-commands.md)
- [INotifyPropertyChanged](../data-binding/inotifypropertychanged.md)
- [Dependency injection](../app-development/dependency-injection.md)
- [Data validation](../data-binding/data-validation.md)
