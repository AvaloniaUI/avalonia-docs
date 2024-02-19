---
description: TUTORIALS - To Do List App
---

import MvvmArchitectureDiagram from '/img/guides/implementation-guides/mvvm-architecture.png';

# Create a View Model

On this page, you will learn how to create a view model to provide the application logic for your app. This is the final part of the MVVM pattern, and it will make use of the _ReactiveUI_ framework.

:::info
To review the concepts behind MVVM pattern programming using ReactiveUI, see [here](../../concepts/reactiveui/).
:::

The purpose of the view model is to organise data and actions for the application in a way that suits the views. For reasons that will become clear in a future step of this tutorial, you will adopt the convention of naming a view model after the view that it supports in this way.

Follow this procedure to add the to do list view model to your app:

- Locate the **ViewModels** folder and add a new class.
- Name the new class 'ToDoListViewModel'.
- Add the following code:

```csharp
using System.Collections.Generic;
using System.Collections.ObjectModel;
using ToDoList.DataModel;

namespace ToDoList.ViewModels
{
    public class ToDoListViewModel : ViewModelBase
    {
        public ToDoListViewModel(IEnumerable<ToDoItem> items)
        {
            ListItems = new ObservableCollection<ToDoItem>(items);
        }

        public ObservableCollection<ToDoItem> ListItems { get; }
    }
}
```

Your view model is very simple at this stage. Its constructor takes a collection of to do item data models and keeps them in an observable collection . This is publicly available through the `ListItems` property here on the view model.

The view model derives from the base class  `ViewModelBase` that was created by the solution template. More about this later in the tutorial.

## Separation in MVVM

You have seen that the to do list view model has a constructor that requires a collection of to do item data models to be provided as the parameter.  In turn this collection will be retrieved from the fake data service (model) at some point.

Before you start to populate the view model with data, have another look at the MVVM pattern:

<img className="center" src={MvvmArchitectureDiagram} alt="" />

The stated purpose of the pattern is to separate the view and view model so that, for example, the view model may be independently tested. This removes the dependency between the view and view model.

In a real application, you would aim to ensure separation between the view model and the model, for similar reasons. However this is beyond the scope of this tutorial, so here you will make the view model dependent on the model.

:::info
Separation of the view model and the model in the MVVM pattern can be achieved by Dependency Injection (DI). For guidance on how to use DI with MVVM and _Avalonia UI_, see [here](../../guides/implementation-guides/how-to-implement-dependency-injection.md).
:::

## View Model to Model Dependency

Follow this procedure to make the main window view model depend on the model, that is dependent on the to do list data service:

- Locate the **MainWindowViewModel** class file, in the **ViewModels** folder.
- Alter the code as follows:

```csharp
using ToDoList.Services;

namespace ToDoList.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        //this has a dependency on the ToDoListService

        public MainWindowViewModel()
        {
            var service = new ToDoListService();
            ToDoList = new ToDoListViewModel(service.GetItems());
        }

        public ToDoListViewModel ToDoList { get; }
    }
}
```

On the next page you will learn how to connect the views to the view models using data binding.
