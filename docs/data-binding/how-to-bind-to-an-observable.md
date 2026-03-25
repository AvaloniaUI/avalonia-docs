---
id: how-to-bind-to-an-observable
title: How to bind to an observable
description: Bind control properties to IObservable streams for reactive data updates in the UI.
doc-type: how-to
---

Avalonia supports binding directly to `IObservable<T>` properties using the `^` (stream binding) operator. Each time the observable produces a new value, the binding updates automatically.

## When to use observable bindings

Use `IObservable<T>` bindings when your data arrives as a continuous stream of values over time. Common scenarios include:

- **Real-time data feeds** such as clocks, sensor readings, or stock prices.
- **Reactive search** where you throttle, debounce, or transform user input before querying a service.
- **Event-driven state** where values are pushed to you rather than pulled on demand.

For most view-model properties that change in response to user actions, a standard property that raises `INotifyPropertyChanged` (or an Avalonia `StyledProperty` / `DirectProperty`) is simpler and sufficient. Choose observables when you genuinely benefit from the composition operators that `System.Reactive` provides, such as `Throttle`, `DistinctUntilChanged`, `CombineLatest`, and `Switch`.

## Basic observable binding

If `DataContext.Name` is an `IObservable<string>`, you can bind to its current value:

```xml
<TextBlock Text="{Binding Name^}" />
```

The `^` operator subscribes to the observable and updates the control each time a new value is emitted.

## Binding to a property of the emitted value

You can chain property access after the `^` operator. For example, to bind to the `Length` of each string produced:

```xml
<TextBlock Text="{Binding Name^.Length}" />
```

## Example: clock using an observable

```csharp
public class ClockViewModel
{
    public IObservable<string> CurrentTime { get; } =
        Observable.Interval(TimeSpan.FromSeconds(1))
            .Select(_ => DateTime.Now.ToString("HH:mm:ss"));
}
```

```xml
<TextBlock Text="{Binding CurrentTime^}" FontSize="24" />
```

## Example: search results stream

```csharp
public class SearchViewModel
{
    private readonly Subject<string> _searchText = new();

    public IObservable<IReadOnlyList<string>> Results { get; }

    public SearchViewModel()
    {
        Results = _searchText
            .Throttle(TimeSpan.FromMilliseconds(300))
            .DistinctUntilChanged()
            .SelectMany(query => SearchAsync(query));
    }

    public void OnSearchTextChanged(string text) => _searchText.OnNext(text);

    private async Task<IReadOnlyList<string>> SearchAsync(string query)
    {
        // Perform search
        return new[] { $"Result for '{query}'" };
    }
}
```

```xml
<ListBox ItemsSource="{Binding Results^}" />
```

## FallbackValue for initial state

Since observables may not have emitted a value yet, use `FallbackValue` to display a placeholder:

```xml
<TextBlock Text="{Binding CurrentTime^, FallbackValue='Loading...'}" />
```

## Combining with task binding

The `^` operator also works with `Task<T>` properties. See [How to bind to a task result](how-to-bind-to-a-task-result) for details.

## Cleanup and disposal

Avalonia automatically subscribes to your `IObservable<T>` when the binding is activated and unsubscribes when the bound control is removed from the visual tree. In most cases you do not need to manage the subscription yourself.

Keep the following points in mind:

- **Hot observables** (such as `Subject<T>`) stay alive as long as something references them. If the observable is owned by a long-lived service, make sure the view model does not keep it alive after the view is gone.
- **Cold observables** (such as `Observable.Interval`) create a new subscription each time. Because Avalonia disposes the subscription when the control detaches, no manual cleanup is required.
- If your view model implements `IDisposable` and you create subscriptions outside of XAML bindings (for example, inside the constructor for derived properties), dispose of those subscriptions in your `Dispose` method to avoid memory leaks.

## See also

- [How to bind to a task result](how-to-bind-to-a-task-result)
- [Data binding syntax](data-binding-syntax)
