---
description: TUTORIALS - To Do List App
---

import ToDoOkDisabledScreenshot from '/img/gitbook-import/assets/image (21) (2).png';
import ToDoOkEnabledScreenshot from '/img/gitbook-import/assets/image (41).png';

# Add Item Buttons

On this page, you will learn how to complete the to do list app by adding actions for the buttons in the add item view. You will include some revealed functionality that disables the OK button until the user enters text in the input.

Also the OK button action needs to pass the description text back to the main window view model, so it can be added to the items collection.  You will do this by passing an argument to the command.

To alter the add item view model, follow this procedure:

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

Earlier in this tutorial, you bound the add item button directly to the main window view model `AddItem` method. In contrast, the OK button here requires some revealed functionality, and an argument.

Therefore this view model code declares a reactive command for the OK button, with its second type parameter `ToDoItem` (from the data model).

:::info
The reactive command is part of _ReactiveUI_. For an introduction to this concept, see [here](../../concepts/reactiveui/reactive-command.md).
:::

Although there is nothing special about the cancel button, a reactive command is declared for that as well. You will see later how this will allow the output from both commands to be handled in the same place.

Both reactive command objects are then created in the constructor. The OK command defines a function that passes a to do item parameter. The cancel command has an empty object parameter.

```csharp
var isValidObservable = this.WhenAnyValue(
    x => x.Description,
    x => !string.IsNullOrWhiteSpace(x));
```

To implement the revealed functionality, the code creates an observable based on the description property. The `WhenAnyValue` method returns the result of the second lambda function (second parameter) every time the value of the description property changes.

```csharp
private string _description = string.Empty;
public string Description
{
    get => _description;
    set => this.RaiseAndSetIfChanged(ref _description, value);
}
```

To ensure that the observable operates correctly, the code also adds the `RaiseAndSetIfChanged` pattern to the description property.

Изучите, как создается реактивная команда `OK`:

```csharp
OkCommand = ReactiveCommand.Create(
   () => new ToDoItem { Description = Description }, isValidObservable);
```

The first parameter is a lambda function that is run whenever the command is executed. The function here creates an instance of the data model `TodoItem` including the current value of the description.

The second lambda function ('can execute' parameter) determines the enabled state of the reactive command. So this is passed the observable created just before.

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

```markup
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