---
id: how-to-bind-to-a-task-result
title: How to bind to a task result
description: Bind control properties to the result of an async Task to display data when it completes.
doc-type: how-to
---

Avalonia can bind directly to `Task<T>` properties using the `^` (stream binding) operator. The binding displays the result once the task completes, letting you load data asynchronously without manually updating properties.

## Basic task binding

If you need to perform heavy work to load a property value, you can bind to the result of an `async Task<TResult>`.

Define your task as a property on your view model:

```csharp
public Task<string> MyAsyncText => GetTextAsync();

private async Task<string> GetTextAsync()
{
    await Task.Delay(1000); // Simulates a long-running operation
    return "Hello from async operation";
}
```

Bind to the result using the `^` operator:

```xml
<TextBlock Text="{Binding MyAsyncText^, FallbackValue='Loading...'}" />
```

The `FallbackValue` is shown while the task is still running. Once the task completes, the result replaces it.

:::tip
Always set a `FallbackValue` on task bindings. Without one, the bound property remains at its default value (typically `null` or empty) until the task completes, which can cause layout shifts or blank controls.
:::

## Loading data from an API

A common scenario is loading data when the view model is created:

```csharp
public class UserProfileViewModel
{
    public Task<UserProfile> Profile { get; }

    public UserProfileViewModel(IUserService userService)
    {
        Profile = userService.GetCurrentUserAsync();
    }
}
```

You can bind to nested properties on the task result using dot notation after the `^` operator:

```xml
<StackPanel>
    <TextBlock Text="{Binding Profile^.Name, FallbackValue='Loading profile...'}" />
    <TextBlock Text="{Binding Profile^.Email}" />
</StackPanel>
```

## Showing a loading indicator

Use the `FallbackValue` or bind visibility to show a spinner while loading:

```xml
<Panel>
    <ProgressBar IsIndeterminate="True"
                 IsVisible="{Binding !Profile^, FallbackValue=True}" />
    <TextBlock Text="{Binding Profile^.Name}"
               IsVisible="{Binding !!Profile^, FallbackValue=False}" />
</Panel>
```

The `!` prefix negates the binding value. While the task has not completed, `Profile^` evaluates to `null`, so `!Profile^` is `True` and the progress bar is visible. The `!!` double negation converts the result back to a boolean, so `!!Profile^` becomes `True` only after the task completes with a non-null result.

## Refreshing task data

Because a `Task<T>` can only complete once, you need to create a new task instance each time you want to refresh the data. Raise `PropertyChanged` so the binding picks up the new task:

```csharp
public class RefreshableViewModel : INotifyPropertyChanged
{
    private readonly IUserService _userService;
    private Task<UserProfile>? _profile;

    public event PropertyChangedEventHandler? PropertyChanged;

    public Task<UserProfile>? Profile
    {
        get => _profile;
        private set
        {
            _profile = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Profile)));
        }
    }

    public RefreshableViewModel(IUserService userService)
    {
        _userService = userService;
        Refresh();
    }

    public void Refresh()
    {
        Profile = _userService.GetCurrentUserAsync();
    }
}
```

Each call to `Refresh()` assigns a new `Task<UserProfile>`, and the binding automatically subscribes to the new task.

## Edge cases and limitations

Keep the following points in mind when you use task bindings:

- **Faulted tasks:** If the task throws an exception, the `FallbackValue` remains displayed. Avalonia does not surface the exception to the UI. If you need to show error states, consider handling errors in your view model and exposing a separate property for the error message.
- **Cancelled tasks:** A cancelled task behaves similarly to a faulted task. The `FallbackValue` stays visible, and no result is pushed to the binding.
- **Already-completed tasks:** Binding to a task that has already completed displays the result immediately with no delay.
- **Null results:** If the task completes with a `null` result, the binding value becomes `null`. Set a `TargetNullValue` on your binding if you want to display a specific value in that case.
- **Thread safety:** The `^` operator uses `SynchronizationContext` to marshal the result onto the UI thread, so you do not need to handle thread dispatching yourself.
- **Compiled bindings:** Task bindings with the `^` operator work with compiled bindings. Ensure the task property type is visible at compile time by using `x:DataType` on your view.

:::warning
Avoid defining the task property as a method call on a getter that creates a new `Task` every time it is accessed (for example, `public Task<string> Data => LoadAsync();`). Each time the binding system reads the property, it creates a new task. This can cause repeated network calls or other unintended side effects. Instead, store the task in a backing field or assign it once in the constructor.
:::

## See also

- [How to bind to an observable](how-to-bind-to-an-observable)
- [Data binding syntax](data-binding-syntax)
- [Compiled bindings](compiled-bindings)
