---
description: TUTORIALS - To Do List App
---

# Process a New Item

On this page you will learn how to process the output from the OK and cancel buttons being pressed and re-show the list. If OK was pressed we also need to add the new item to the list. We'll implement this functionality in `MainWindowViewModel`:

To alter the main window view model, follow this procedure:

- Stop the app if it is running.
- Locate the **MainWindowViewModel.cs** file in the **/ViewModels** folder.
- Edit the code as shown.

```csharp
using ReactiveUI;
using System;
using System.Reactive.Linq;
using ToDoList.DataModel;
using ToDoList.Services;

namespace ToDoList.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        private ViewModelBase _contentViewModel;

        //this has a dependency on the ToDoListService

        public MainWindowViewModel()
        {
            var service = new ToDoListService();
            ToDoList = new ToDoListViewModel(service.GetItems());
            _contentViewModel = ToDoList;
        }

        public ViewModelBase ContentViewModel
        {
            get => _contentViewModel;
            private set => this.RaiseAndSetIfChanged(ref _contentViewModel, value);
        }

        public ToDoListViewModel ToDoList { get; }

        public void AddItem()
        {
            AddItemViewModel addItemViewModel = new();

            Observable.Merge(
                addItemViewModel.OkCommand,
                addItemViewModel.CancelCommand.Select(_ => (ToDoItem?)null))
                .Take(1)
                .Subscribe(newItem =>
                {
                    if (newItem != null)
                    {
                        ToDoList.ListItems.Add(newItem );
                    }
                    ContentViewModel = ToDoList;
                });

            ContentViewModel = addItemViewModel;
        }
    }
}
```

Take some time to examine the code that you just added. The main change is to the `AddItem` method. This now sets up an observable that subscribes to the merged output of the two reactive commands (defined on the last page - in the add item view model). 

```csharp
Observable.Merge(
                addItemViewModel.OkCommand,
                addItemViewModel.CancelCommand.Select(_ => (ToDoItem?)null))
```

This code takes advantage of the fact that a reactive command is itself an observable that has a value generated every time it is executed.

The merge method combines the output from any number of observable streams, but they must have the same value type.

You will remember that the two reactive command declarations were different. They were:

```csharp
public ReactiveCommand<Unit, ToDoItem> OkCommand { get; }
public ReactiveCommand<Unit, Unit> CancelCommand { get; }
```

The OK command generates an object of class `ToDoItem` whenever it executes, and the cancel command generates only a `Unit`. The `Unit` is the reactive version of `void` - it means the command generates no value, but still notifies that it has happened!

So to combine the output from the different reactive command observable streams, the code converts the cancel command output into a stream of null `ToDoItem` objects.

```csharp
.Take(1)
```

You are only interested in the first click of either the OK or cancel buttons; once one of these buttons has been clicked other clicks can be ignored. So the [`Take(1)`](https://reactivex.io/documentation/operators/take.html) method means that only the first item in the observable sequence will be processed.

```csharp
.Subscribe(newItem =>
{
   if (newItem != null)
   {
      ToDoListViewModel.ListItems.Add(newItem);
   }
   ContentViewModel = ToDoList;
});
```

Lastly the code subscribes to the first item in the merged observable sequence. The subscribe pulls out the new to do item object, and examines it to see it it is null.

A null value means that the cancel button was clicked - and no further action is required; except to restore the main window content to show the (unchanged) to do list.

```csharp
ContentViewModel = ToDoList;
```

If the value is not null, then it is because the OK button was clicked; and in this case the value should be a `ToDoItem` containing the description that the user typed.  SO this can be added to the list.

You may notice one other important addition to the code here: The to do list view model has been declared as a public member of the main window view model. This will ensure the list is preserved during view changes; it acts as the application state for your app. 

Run the app to check it works as described!

On the next page you will learn why the app was implemented in the way that it has been, and recommended some further reading.
