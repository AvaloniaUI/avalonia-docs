---
description: TUTORIALS - To Do List App
---

# Create a Model

So far in this tutorial, you have created a basic view where none of the controls do anything yet; and linking it all together using the MVVM pattern is still a couple of steps away.

On this page you will create the model part of the MVVM pattern for app.

In a real MVVM application, the model handles everything that is not in the application-specific logic of the view model, or the view itself. This may include data storage and any services needed to supply storage, and maybe other external services that the app needs (email for example).

In this tutorial example, you will create a mock database and a service to access it. These will take the place of the model part of the application.

### Data Model

The data model contains data entities (as they would appear if stored in a database for example).

In this tutorial, you will create a single entity for the data model.  Follow this procedure to create the data model:

- Stop the app if it is still running.
- Locate the **Models** folder in the project, and rename it as 'DataModel'.
- Add a new class to the folder. Name the class 'ToDoItem'.
- Change the code in the class as shown:

```csharp
using System;

namespace ToDoList.DataModel
{
    public class ToDoItem
    {
        public string Description { get; set; } = String.Empty;
        public bool IsChecked { get; set; }
    }
}
```

### Create a Fake Data Service

In a real application, you might use a SQL database and write services based on the _Microsoft Entity Framework_ to read and write data.  However, this is well beyond the scope of this tutorial! So to test the app, you will create a fake data service that acts as if it has a database, but really just uses an array in memory.

Follow this procedure to create the fake database service:

- Create a new project folder and name it 'Services'.
- Add a new class to the folder, name it 'ToDoListService'.
- Add the code shown to the new class:

```csharp
using System.Collections.Generic;
using ToDoList.DataModel;

namespace ToDoList.Services
{
    public class ToDoListService
    {
        public IEnumerable<ToDoItem> GetItems() => new[]
        {
            new ToDoItem { Description = "Walk the dog" },
            new ToDoItem { Description = "Buy some milk" },
            new ToDoItem { Description = "Learn Avalonia", IsChecked = true },
        };
    }
}
```

That is the model done for now. On the next page, you will learn how to add a view model to the app to complete the MVVM pattern.
