---
description: TUTORIALS - To Do List App
---

import ToDoOkDisabledScreenshot from '/img/gitbook-import/assets/image (21) (2).png';
import ToDoOkEnabledScreenshot from '/img/gitbook-import/assets/image (41).png';

# Кнопки для Add Item

На этой страницу вы узнаете, как дополнить обработку кнопок для `add item view`.
Вы добавите некоторые `revealed functionality`, которая делает кнопку `OK` неактивной,
пока пользователь не введет текст в поле ввода.

Также, нажатие кнопки `OK`, должно передать описание из поля текста во `view model` основного окна,
чтобы потом добавить его в коллекцию элементов.
Вы сделаете это, передав аргумент команде.

Для изменения `view model`, выполните следующие действия:

- Остановите приложение, если оно запущено.
- В папке **/ViewModels** найдите файл **AddItemViewModel.cs**.
- Измените код, как показано ниже.

```csharp
using ReactiveUI;
using System.Reactive;
using ToDoList.DataModel;

namespace ToDoList.ViewModels
{
    public class AddItemViewModel : ViewModelBase
    {
        private string _description = string.Empty;

        public ReactiveCommand<Unit, ToDoItem> OkCommand { get; }
        public ReactiveCommand<Unit, Unit> CancelCommand { get; }
        
        public AddItemViewModel()
        {
            var isValidObservable = this.WhenAnyValue(
                x => x.Description,
                x => !string.IsNullOrWhiteSpace(x));

            OkCommand = ReactiveCommand.Create(
                () => new ToDoItem { Description = Description }, isValidObservable);
            CancelCommand = ReactiveCommand.Create(() => { });
        }

        public string Description
        {
            get => _description;
            set => this.RaiseAndSetIfChanged(ref _description, value);
        }
    }
}
```

Ранее в руководстве, вы привязали кнопку добавления элемента прямо к методу `AddItem` у `view model` основного окна.
Здесь же, кнопка `OK` требует указание аргумента и `revealed functionality`.

Следовательно, код `view model` определяет реактивную команду для кнопки `OK` со вторым параметром типа `ToDoItem` (из модели данных).

:::info
Реактивные команды являются частью _ReactiveUI_. Подробнее об этом концепте, см. [здесь](../../concepts/reactiveui/reactive-command.md).
:::

Хотя в кнопке `Cancel` и не использует какой-либо особенный функционал, она тоже объявлена реактивной командой.
Позже вы увидите, что такое объявление позволяет обрабатывать обме команды в одном и том же месте.

Далее, обе реаксивные команды создаются в конструкторе.
Команда `OK` определяет функцию, которая передает элемент списка дел, как параметр.
Команда `Cancel` имеет пустой объект, как параметр.

```csharp
var isValidObservable = this.WhenAnyValue(
    x => x.Description,
    x => !string.IsNullOrWhiteSpace(x));
```

Для реализации показанного функционала, код создает `observable` свойство для поля `description`.
Метод `WhenAnyValue` возвращает результат второй лямбда-функции (второй параметр), каждый раз при изменении свойства `description`.

```csharp
private string _description = string.Empty;
public string Description
{
    get => _description;
    set => this.RaiseAndSetIfChanged(ref _description, value);
}
```

Чтобы гарантировать корректность работы `observable`, ко свойству `description` добавлен шаблон `RaiseAndSetIfChanged`.

Изучите, как создается реактивная команда `OK`:

```csharp
OkCommand = ReactiveCommand.Create(
   () => new ToDoItem { Description = Description }, isValidObservable);
```

Первый параметр - это лямбда-функция, которая запускается каждый раз при выполнении команды.
Эта функция создает экземляр модели данных `TodoItem` с текущим значениям `Description`.

Вторая лямбда-функция (параметр 'can execute') определяет состояние доступа реактивной команды

В коде также создается реактивная команда для кнопки `Cancel`:

```csharp
CancelCommand = ReactiveCommand.Create(() => { });
```

Команда `Cancel` не выполняется. поэтому ее первый параметр никак не используется.
Кнопка `Cancel` всегда доступка, поэтому у нее нет параметра `can execute`.

## Привязка кнопок `OK` и `Cancel`

На этом этапе требуется создать привязку для кнопок `OK` и `Cancel` во `view`.

Для этого выполните следующие действия:

- В папке **/Views** найдите файл **AddItemView.axaml**.
- Измените XAML как показано ниже:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:ToDoList.ViewModels"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
             x:Class="ToDoList.Views.AddItemView"
             x:DataType="vm:AddItemViewModel">
  <DockPanel>
    <Button DockPanel.Dock="Bottom" 
            HorizontalAlignment="Stretch"
            HorizontalContentAlignment="Center"
            Command="{Binding CancelCommand}">Cancel</Button>
    <Button DockPanel.Dock="Bottom" 
            HorizontalAlignment="Stretch"
            HorizontalContentAlignment="Center"
            Command="{Binding OkCommand}">OK</Button>
    <TextBox AcceptsReturn="True"
             Text="{Binding Description}"
             Watermark="Enter your to do item"/>
  </DockPanel>
</UserControl>
```

Запустите приложение и нажмите **Add Item**.
Вы должны увидеть, что кнопка `OK` доступна только тогда, когда в поле ввода описания есть какой-либо текст

<img className="center" src={ToDoOkDisabledScreenshot} alt="" />

<img className="center" src={ToDoOkEnabledScreenshot} alt="" />

На следующей странице вы узнаете, как обработать новый элемент, чтобы он появился в списке, после нажатия кнопки `OK`.