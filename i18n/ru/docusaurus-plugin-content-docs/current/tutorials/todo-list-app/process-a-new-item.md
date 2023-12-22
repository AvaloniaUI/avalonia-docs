---
description: TUTORIALS - To Do List App
---

# Обработка нового элемента

На этой страницу вы узнаете, как обработать нажатие кнопок `OK` и `Cancel`, 
а также повторно отобразить список.
Если была нажата кнопка `OK`, мы должны добавить новый элемент в список.
Данный функционал мы добавим в `MainWindowViewModel`:

Для изменения `view model` основного окна, выполните следующие действия:

- Остановите приложение, если оно уже запущено.
- В папке **/ViewModels** найдите файл **MainWindowViewModel.cs**.
- Измените код, как показано ниже.

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

Потратьте некоторое время на изучение только что добавленного кода.
Основные изменения произошли в методе `AddItem`.
В нем настроен `observable`, который подписывается на вывод двух реактивных команд
(определен на последней странице - в `AddItem` у  `view model`). 

```csharp
Observable.Merge(
                addItemViewModel.OkCommand,
                addItemViewModel.CancelCommand.Select(_ => (ToDoItem?)null))
```

Данный код пользуется тем, что реактивные команды являются `observable`,
из-за чего они генерируют значение при каждом выполнении.

`Merge` объединяет результат любого количества `observable` потоков,
но они обязаны иметь одинаковы тип значения.

Как вы помните, эти две реактивные команды имели разное объявление:

```csharp
public ReactiveCommand<Unit, ToDoItem> OkCommand { get; }
public ReactiveCommand<Unit, Unit> CancelCommand { get; }
```

Команда `OK` генерирует объект класса `ToDoItem`, а команда `Cancel` генерирует только `Unit`.
`Unit` - это реактивная версия `void`, то есть, команда не генерирует никакого значения,
но все-равно посылает уведомление, что команда сработала!

Поэтому, для объединения вывода различных `observable` потоков у реактивных команд,
мы преобразуем код команды `Cancel`, чтобы он возвращал пустные объекты типа `ToDoItem`.

```csharp
.Take(1)
```

Нас интересует кнопки `OK` и `Cancel`, после нажатия на любую из них, все другие нажатия
должны быть проигнорированы.
Таким образом, метод [`Take(1)`](https://reactivex.io/documentation/operators/take.html) обрабатывае только первый сработавший элемент
в `observable` последовательности.

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

Теперь код подписан на первый элемент в `observable` последовательности.
Подписка извлекает новый объект для списка дел и проверяет, что он не `null`.

Значение `null` говорит о том, что была нажата кнопка `Cancel`, и иных действий не треубется,
за исключением восстановления содержимого основного окна для отображения (неизмененного) списка дел.

```csharp
ContentViewModel = ToDoList;
```

Если значение **не** `null`, то это говорит о том, что была нажата кнопка `OK`.
В этом случае, значение имеет тип `ToDoItem`, и имеет описание введенное пользователем.
Таким образом, его можно добавить в список дел.

Здесь вы также можете заметить одно важное дополнение кода:
You may notice one other important addition to the code here:
`View Model` списка дел, была объявлена как публичный член `view model` основного окна.
Это гарантирует сохранение списка во время изменения `view`;
В данном случае, он работает как состояние приложения.

Запустите приложение и убедитесь, что оно работает как было написано!

На следующей странице вы узнаете, почему приложение было реализовано именно таким образом,
а также некоторые рекомендации по дальнейшему изучению.
