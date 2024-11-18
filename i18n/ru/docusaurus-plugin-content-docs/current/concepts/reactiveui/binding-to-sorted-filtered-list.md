---
description: CONCEPTS - ReactiveUI
---

# Binding to Sorted/Filtered Data

A common UI task that applications need to do is display sorted and/or filtered 'views' of data. In Avalonia this can be accomplished by connecting a `SourceCache<TObject, TKey>` or a `SourceList<T>` to a `ReadOnlyObservableCollection<T>` and binding to that collection

## Creating a Source Cache

`SourceCache<TObject, TKey>` or `SourceList<T>` come from [Dynamic Data in ReactiveUI](https://www.reactiveui.net/docs/handbook/collections/) Example:

```csharp
// (x => x.Id) property that serves as the unique key for the cache
private SourceCache<TestViewModel, Guid> _sourceCache = new (x => x.Id);
```

Then the `_sourceCache` can be populated through the `AddOrUpdate` method

## Creating Sorted Or Filtered Views

Next the `ReadOnlyObservableCollection<T>` can be bound to the filtered or sorted `_sourceCache`. The sorting/filtering is done similarly to linq.

```csharp
private readonly ReadOnlyObservableCollection<TestViewModel> _testViewModels;
public ReadOnlyObservableCollection<TestViewModel> TestViewModels => _testViewModels;
...
public MainWindowViewModel(){
    // Populate the source cache via _sourceCache.AddOrUpdate
    ...
    _sourceCache.Connect()
        // Sort Ascending on the OrderIndex property
        .Sort(SortExpressionComparer<TestViewModel>.Ascending(t => t.OrderIndex))
        .Filter(x => x.Id.ToString().EndsWith('1'))
        // Bind to our ReadOnlyObservableCollection<T>
        .Bind(out _testViewModels)
        // Subscribe for changes
        .Subscribe();
}
```

## Binding

Now that the `_sourceCache` is created and populated and the `ReadOnlyObservableCollection<T>` is created and bound we can go into our view and bind exactly the way we normally would with an `ObservableCollection<T>`

```xml
    <Design.DataContext>
        <vm:MainWindowViewModel/>
    </Design.DataContext>

    <TreeView ItemsSource="{Binding TestViewModels}">
        <TreeView.DataTemplates>
            !-- DataTemplate Definitions -->
        </TreeView.DataTemplates> 
    </TreeView>
```
