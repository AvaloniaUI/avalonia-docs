---
description: CONCEPTS - ReactiveUI
---

import ReactiveObjectDiagram from '/img/concepts/reactiveui/reactiveobject.png';

# Reactive View Model

This page describes how you can use the _ReactiveUI_ `ReactiveObject` as the basis of your view model to implement MVVM binding with _Avalonia UI_.

_ReactiveUI_ provides the `ReactiveObject` as a base class for view models. It implements a notification of property changes and observables to monitor object changes.

:::info
For the detailed _ReactiveUI_ documentation for `ReactiveObject`, see [here](https://www.reactiveui.net/api/reactiveui/reactiveobject/).
:::

Once you have installed and configured _ReactiveUI_, you can base your view models on the class:

```csharp
public class ViewModelBase : ReactiveObject
{
}
```

<img src={ReactiveObjectDiagram} alt=""/>

:::info
If you have used the Avalonia MVVM Application solution template, then you will find this base class already added to the project /ViewModels folder.
:::

For example, you can implement a simple view model like this:

```csharp
public class MyViewModel : ViewModelBase
{
   private string _description = string.Empty;
   public string Description
   {
      get => _description;
      set => this.RaiseAndSetIfChanged(ref _description, value);
   }
}
```

## Notify the View of Changes

_Avalonia UI_ uses the underlying `ReactiveObject` to **Notify** changes in the view model back to the view using any bindings defined in the XAML. For example, if you are binding the _Avalonia UI_ text input control like this:

```xml
<TextBox AcceptsReturn="True"
         Text="{Binding Description}"
         Watermark="Enter a description"/>
```

Any change to the view model description property is achieved using the `set` accessor and a change is raised causing _Avalonia UI_ to display the new value on the UI.

## Update the View Model from Input

When _Avalonia UI_ uses the binding to **Update** the view model, the `set` accessor ensures that any parts of the view model that depend on the description property can also react to the change if necessary.

On the next page, you will learn how a reactive command acts as a special case of the view model update.
