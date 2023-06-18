---
id: change-notifications
title: Change Notifications
---

### Property Changes <a id="property-changes"></a>

In order for Avalonia to know when a property on a view model has changed, the view model must implement change notifications. The easiest way to do this is to use `ReactiveUI` and make your view model class inherit from `ReactiveObject`.

You then add a setter for each property which calls `RaiseAndSetIfChanged`:

```csharp
using ReactiveUI;

public class MyViewModel : ReactiveObject
{
    private string caption;

    public string Caption
    {
        get => caption;
        set => this.RaiseAndSetIfChanged(ref caption, value);
    }
}
```

For more information see the [ReactiveUI documentation](https://reactiveui.net/docs/handbook/view-models/).

If you don't want a dependency on ReactiveUI, you can implement [`INotifyPropertyChanged` manually](https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.inotifypropertychanged).

### Collection Changes <a id="collection-changes"></a>

Collections also need to implement change notifications. There are a number of collections which do this for you out of the box:

* [ObservableCollection](https://docs.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.observablecollection-1) is available in the .NET base class library
* [DynamicData](https://github.com/reactiveui/DynamicData) for more advanced scenarios
* [ReactiveList](https://reactiveui.net/docs/handbook/obsolete/collections/reactive-list) in ReactiveUI \(deprecated in favor of DynamicData\)
* `AvaloniaList` is shipped with Avalonia, but note that its API may change in future so for the moment it's recommended to not use it at the application level

If you want to implement collection change notifications yourself you can implement [`INotifyCollectionChanged`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged)
