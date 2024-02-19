---
description: TUTORIALS - To Do List App
---

import MvvmArchitectureDiagram from '/img/guides/implementation-guides/mvvm-architecture.png';

# Создание View Model

На этой странице вы узнаете, как создавать `view model`, отвечающую за бизнес-логику приложения.
Это заключительная часть паттерна MVVM, в ней будет использовать фреймворт _ReactiveUI_.

:::info
Подробнее о концепциях, лежащих в основе паттера MVVM с использованием ReactiveUI, см. [здесь](../../concepts/reactiveui/).
:::

Основная цель `view model`, организовать данные и события в приложении таким образом, чтобы они соответствовали `views`.
По причинам, которые будут указаны в следующих частях руководства,
мы будем придерживаться соглашения об именовании `view model` согласно `view`.

Для добавления `view model` списка в ваше приложение, выполните следующие действия:

- Найдите папку **ViewModels** и добавьте новый класс.
- Назовите его 'ToDoListViewModel'.
- Добавьте следующий код:

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

На данном этапе, ваша `view model` достаточна проста.
Ее конструктор получает коллекцию списка дел и сохраняет ее в `observable` коллекцию.
Она имеет публичный доступ через свойство `ListItems` во `view model`.

`View model` наследована от базового класса `ViewModelBase` и была создана по шаблоном решения.
Подробнее об этом дальше в руководстве.

## Разделение в MVVM

Как вы могли заметить, `vide model` списка дел имеет конструктор,
который требует указания списка элементов в качестве параметра. 
В свою очередь, эта коллекция будет извлечена из фейкового сервиса данных (model).

До начала заполнения `view model` данными, ознакомьтесь с паттерном MVVM:

<img className="center" src={MvvmArchitectureDiagram} alt="" />

Целью шаблона является разделение `view` и `view model` таким образом, 
чтобы, к примеру, можно было тестировать их независимо друг от друга.
Также это устраняет зависимости между `view` и `view model`.

В реальном приложении, вы дожны стремиться к делению на `view model` и `model` по тем же причинам.
Однако это выходит за рамки руководства, поэтому мы сделаем `view model` зависимой от `model`.

:::info
Разделения на `view model` и `model` в паттерне MVVM можно достичь через Dependency Injection (DI) (рус: Инъекцию зависимостей).
Подробнее об использовании DI в MVVM и _Avalonia UI_, см. [здесь](../../guides/implementation-guides/how-to-implement-dependency-injection.md).
:::

## Зависимость View Model от Model

Чтобы сделать `view model` основного окна зависимым от `model`,
который в свою очередь зависит от сервиса списка дел, 
выполните следующие действия:

- В папке **ViewModels** найдите файл класса **MainWindowViewModel**.
- Измените код, как указано ниже:

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

На следующей странице вы узнаете, как связать `views` и `view models`, используя `data binding (рус: привязку данных)`.
