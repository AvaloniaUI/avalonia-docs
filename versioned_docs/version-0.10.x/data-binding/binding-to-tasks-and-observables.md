---
id: binding-to-tasks-and-observables
title: Binding to Tasks and Observables
---

You can subscribe to the result of a task or an observable by using the `^` stream binding operator.

## Example 1: Binding to an observable

For example if `DataContext.Name` is an `IObservable<string>` then the following example will bind to the length of each string produced by the observable as each value is produced

```xml
<TextBlock Text="{Binding Name^.Length}"/>
```

## Example 2: Binding to a task

If you need to do some heavy work to load the content of a property you can bind to the result of an `async Task<TResult>`

Consider you have the following view model which generates some text in a long running process:

```csharp
public Task<string> MyAsyncText => GetTextAsync();

private async Task<string> GetTextAsync()
{
  await Task.Delay(1000); // The delay is just for demonstration purpose
  return "Hello from async operation";
}
```

You can bind to the result in the following way: 
```xml
<TextBlock Text="{Binding MyAsyncText^, FallbackValue='Wait a second'}" />
```


:::info
Note: You can use `FallbackValue` to display some loading indicator. 
:::

