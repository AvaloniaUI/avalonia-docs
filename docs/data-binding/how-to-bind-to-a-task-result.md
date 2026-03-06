---
id: how-to-bind-to-a-task-result
title: How to Bind to a Task Result
---

Avalonia can bind directly to `Task<T>` properties using the `^` (stream binding) operator. The binding displays the result once the task completes.

## Basic Task Binding

If you need to do some heavy work to load the content of a property, you can bind to the result of an `async Task<TResult>`:

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

## Loading Data from an API

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

```xml
<StackPanel>
    <TextBlock Text="{Binding Profile^.Name, FallbackValue='Loading profile...'}" />
    <TextBlock Text="{Binding Profile^.Email}" />
</StackPanel>
```

## Showing a Loading Indicator

Use the `FallbackValue` or bind visibility to show a spinner while loading:

```xml
<Panel>
    <ProgressBar IsIndeterminate="True"
                 IsVisible="{Binding !Profile^, FallbackValue=True}" />
    <TextBlock Text="{Binding Profile^.Name}"
               IsVisible="{Binding !!Profile^, FallbackValue=False}" />
</Panel>
```

## Important Notes

- The `^` operator subscribes to the task and updates the binding when it completes.
- If the task throws an exception, the `FallbackValue` remains displayed.
- Create a new `Task<T>` each time the data needs to refresh. Binding to a completed task shows the result immediately.
- For tasks that can be cancelled or retried, consider using an `IObservable<T>` instead.

## See Also

- [How to Bind to an Observable](how-to-bind-to-an-observable): Binding to `IObservable<T>` streams.
- [Data Binding Syntax](data-binding-syntax): Full binding syntax reference.
