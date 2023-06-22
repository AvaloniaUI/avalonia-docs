---
id: creating-a-model-and-viewmodel
title: Creating a Model & ViewModel
---

Now that we've got a basic view on-screen let's think about how we could display real data from a database or similar in it. The most obvious, and traditional way to do this would be to load the data in the view's constructor and create a `CheckBox` for each TODO item in code. However doing it this way has a few disadvantages:

* We can't use XAML
* We have to write code to react to changes in the data and update the display
* It's not unit-testable

These considerations may not seem important for a small application, but as your application grows they become bigger and bigger problems: particularly the testability part.

There is a better way! We mentioned the MVVM pattern at the beginning of this tutorial and it's that pattern that we're going to use now.

### Create the Model

The first thing to do is to create the model which will represent our data as it would be stored in a database. Our model is going to be pretty simple: each TODO item will consist of a textual description and a boolean value representing whether the item is checked.

Place the following class in the `Models` directory in your project:

Models/TodoItem.cs

```csharp
namespace Todo.Models
{
    public class TodoItem
    {
        public string Description { get; set; }
        public bool IsChecked { get; set; }
    }
}
```

### Create a \(fake\) database

We could use something like [Entity Framework](https://docs.microsoft.com/en-us/ef/core/get-started/netcore/new-db-sqlite) to read this data from an SQLite database but because this is a tutorial on Avalonia not Entity Framework, we're not actually going to be using a database. Instead we'll just populate our models from an array.

We'll do this in a service called `Database` and put this in a `Services` directory:

Services/Database.cs

```csharp
using System.Collections.Generic;
using Todo.Models;

namespace Todo.Services
{
    public class Database
    {
        public IEnumerable<TodoItem> GetItems() => new[]
        {
            new TodoItem { Description = "Walk the dog" },
            new TodoItem { Description = "Buy some milk" },
            new TodoItem { Description = "Learn Avalonia", IsChecked = true },
        };
    }
}
```

### Create a View Model

Now we're going to need a view model which represents the list. This is the class that will provide the data for our view.

We have already created the view and called it `TodoListView` and so the associated view model is going to be called `TodoListViewModel`. Place this class in the `ViewModels` directory in your project:

ViewModels/TodoListViewModel.cs

```csharp
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Todo.Models;

namespace Todo.ViewModels
{
    public class TodoListViewModel : ViewModelBase
    {
        public TodoListViewModel(IEnumerable<TodoItem> items)
        {
            Items = new ObservableCollection<TodoItem>(items);
        }

        public ObservableCollection<TodoItem> Items { get; }
    }
}
```

Again, our view model is very simple at this stage. It simply takes a collection of `TodoItem` models in its constructor and puts them into an `ObservableCollection` which is exposed via an `Items` property.

One thing to notice is the use of the `ViewModelBase` class. The importance of this will become clear shortly.

### Create an instance of TodoListViewModel

We've seen that our `TodoListViewModel` requires a collection of `TodoItem` models to be passed to its constructor, but where do these items come from? Where is `TodoListViewModel` created?

Well, we now have two views and two view models:

* `MainWindow` \(created by the template\)
* `MainWindowViewModel` \(created by the template\)
* `TodoListView` \(created by us\)
* `TodoListViewModel` \(created by us\)

If you think back to when we created the views, you'll remember that our views have a parent-child relationship \(`TodoListView` is a child of `MainWindow`\). This might give us a clue: `MainWindowViewModel` should create the `TodoListViewModel`!

Edit the `MainWindowViewModel.cs` file to look like this:

MainWindowViewModel.cs

```csharp
using Todo.Services;

namespace Todo.ViewModels
{
    class MainWindowViewModel : ViewModelBase
    {
        public MainWindowViewModel(Database db)
        {
            List = new TodoListViewModel(db.GetItems());
        }

        public TodoListViewModel List { get; }
    }
}
```

Finally, edit the `OnFrameworkInitializationCompleted` method in `App.axaml.cs` to create an instance of `Database` and pass it to `MainWindowViewModel`:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    base.OnFrameworkInitializationCompleted();

    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    {
        var db = new Database();

        desktop.MainWindow = new MainWindow
        {
            DataContext = new MainWindowViewModel(db),
        };
    }
}
```

Next we're going to wire up the views to read from our view models...
