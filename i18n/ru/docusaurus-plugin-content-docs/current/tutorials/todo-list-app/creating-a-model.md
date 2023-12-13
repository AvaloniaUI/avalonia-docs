---
description: TUTORIALS - To Do List App
---

# Создание Model (рус: Модели)

Пока мы создали базовую `view`, которая еще ничего не делает.

На этой странице вы создадите `model`, часть паттерна MVVM, используемого в приложении.

В реальном MVVM-приложении, модель обрабатывает все события, за исключением специфичной для приложения,
они обрабатываются во `view model` или `view`.
Модель включает хранилище данных, любые сервисы для работы с ними,
а также любые другие сервисы, которые потребуются приложению (например почта).

В данном руководстве, вы создадите имитацию базы данных и сервиса для доступа к ней.
Они заменят часть `model` приложения.

### Data Model (рус: Модель данных)

Модель данных содержит сущности данных (так они бы выглядели, если бы хранились, к примеру, в базе данных).

В данном руководстве, вы создадите одну сущность для модели данных.
Для ее создания, выполните следующие действия:

- Остановите приложение, если оно запущено.
- Внутри проекта, найдите папку **Models** и переименуйте ее на 'DataModel'.
- В эту папку добавьте новый класс, назовите его 'ToDoItem'.
- Измените код класс, как показано ниже:

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

### Создание фейкового сервиса данных

In a real application, you might use a SQL database and write services based on the _Microsoft Entity Framework_ to read and write data.  However, this is well beyond the scope of this tutorial! So to test the app, you will create a fake data service that acts as if it has a database, but really just uses an array in memory.

Follow this procedure to create the fake database service:

- Создайте новую папку проекта с названием 'Services'.
- В созданную папку, добавьте класс с названием 'ToDoListService'.
- Добавьте код класса, как показано ниже:

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
