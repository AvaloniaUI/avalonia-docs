---
id: how-to-bind-to-an-observable
title: How to bind to an observable
---

Avalonia supports binding directly to `IObservable<T>` properties using the `^` (stream binding) operator. Each time the observable produces a new value, the binding updates automatically.

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

The `^` operator also works with `Task<T>` properties. See [How to Bind to a Task Result](how-to-bind-to-a-task-result) for details.

## See also

- [How to Bind to a Task Result](how-to-bind-to-a-task-result): Async data loading with `^`.
- [Data Binding Syntax](data-binding-syntax): Full binding syntax reference.
