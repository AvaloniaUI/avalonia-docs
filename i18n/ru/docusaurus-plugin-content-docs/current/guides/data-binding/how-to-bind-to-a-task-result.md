---
id: how-to-bind-to-a-task-result
title: How to Bind to a Task Result
---


# How to Bind to a Task Result

Content in preparation.

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
