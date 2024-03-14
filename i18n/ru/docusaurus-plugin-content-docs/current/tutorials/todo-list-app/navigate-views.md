---
description: TUTORIALS - To Do List App
---

import ToDoNavigationConceptDiagram from '/img/gitbook-import/assets/image (40).png';
import ToDoNavigationArchitectureDiagram from '/img/gitbook-import/assets/image (38) (2).png';
import ToDoBeforeNavigationScreenshot from '/img/gitbook-import/assets/image (43) (1).png';
import ToDoAfterNavigationScreenshot from '/img/gitbook-import/assets/image (21) (1).png';

# Навигация по Views

На этой странице вы узнаете, как поменять `view` в зоне содержимого у основного окна,
для отображения `view` нового элемента, после нажатия кнопки **Add Item**.

<img className="center" src={ToDoNavigationConceptDiagram} alt="" />

До этого момента, вы использовали паттерн MVVM.
Это значит, что логическая часть приложения управляется из `view models`.
Основное окно управляется из одноименной `view model`.

Чтобы добавить во `view model` метод для смены содержимого в основном окно, выполните следующие действия:

- Остановите ваше приложение, если оно запущено.
- В папке **/ViewModels** найдите файл **MainWindowViewModel.cs**.
- Измените код, как показано ниже.

```csharp
using ReactiveUI;
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

        public ToDoListViewModel ToDoList { get; }
        
        public ViewModelBase ContentViewModel
        {
            get => _contentViewModel;
            private set => this.RaiseAndSetIfChanged(ref _contentViewModel, value);
        }

        public void AddItem()
        {
            ContentViewModel = new AddItemViewModel();
        }
    }
}
```

Потратьте некоторое время на изучение только что добавленного кода.
Было добавлено новое свойство `ContentViewModel`, которое может получать и изменять `view model`
в содержимом основного окна.

Также, данное свойство инициализируется в конструкторе через сервис.

Еще добавлено новый метод `AddItem()`, который меняет значение `ContentViewModel` на `view model` добавления нового элемента.

Обратите внимание, что изменение свойства `ContentViewModel` вызывает `RaiseAndSetIfChanged`,
который генерирует уведомление каждый раз при смене значения.
Система привязки _Avalonia UI_, требует наличия подобных уведомлений, чтобы понимать, когда обновлять пользовательский интерфейс.

## Main Window Content Binding (рус: Привязка содержимого в основном окне)

Теперь, когда вы передали управление содержимым окна во `view model` (в соответствии с паттерном MVVM), 
необходимо закончить изменения, добавив привязку содержимого в основное окно.

Для этого выполните следующие действия:

- В папке **/Views** найдите файл **MainWindow.axaml**.
- Измините XAML как показано ниже.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ToDoList.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
        x:Class="ToDoList.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="Avalonia To Do List"
        Content="{Binding ContentViewModel}">
</Window>
```

<img className="center" src={ToDoNavigationArchitectureDiagram} alt="" />

## Команда кнопки

Теперь, чтобы нажатие на кнопку вызывало метод `AddIten()`, выполните следующие действия:

* В папке **/Views** найдите файл **ToDoListView.axaml**.
* Измините XAML у кнопки, как показано ниже:

```xml
<Button DockPanel.Dock="Bottom"
        HorizontalAlignment="Stretch"
        HorizontalContentAlignment="Center"
        x:CompileBindings="False"
        Command="{Binding $parent[Window].DataContext.AddItem}">
        Add Item
</Button>
```

Потратьте некоторое время на изучение только что добавленной привязки к кнопке.

Во первых, свойство `Command` определяет метод, который будет вызван при нажатии на кнопку.
Во вторых, привязка позволяет указать точный путь используемого метода через выражение:

```
$parent[Window].DataContext.AddItem
```

**Binding source expression** перенаправляет источник привязки.
Система привязки _Avalonia UI_ будет использовать источник из выражения, вместо контекста данных `Control`.

В данном случае, выражение ищет любой родительский `Control` с типом `Window`.
Затем, выражение будет использовать котекст данных найденного `Control` для вызова метода `AddItem`.

:::info
Подробнее о концепте привязки, см [здесь](../../basics/data/data-binding/data-binding-syntax).
:::

## Запуск приложения

Запустите приложение и нажмите кнопку **Add Item**, чтобы увидеть новое `view`.

<img className="center" src={ToDoBeforeNavigationScreenshot} alt="" />

<img className="center" src={ToDoAfterNavigationScreenshot} alt="" />

А вы заметили?
Основное окно меняет `view model`, привязанную к содержимому и корректно загружает `view` добавления элемента!

:::info
В _Avalonia UI_, вы можете вызвать простой метод `view model` напрямую, как было показано.
Позже, в рамках данного руководства, вы познакомитесь со сценариями, требующими другой способ реализации.
:::

На следующей странице вы узнаете, какую роль в разобранном материале играет `view locator`.
