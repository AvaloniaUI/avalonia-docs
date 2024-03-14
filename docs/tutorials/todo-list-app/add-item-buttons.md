---
description: TUTORIALS - To Do List App
---

import ToDoOkDisabledScreenshot from '/img/gitbook-import/assets/image (21) (2).png';
import ToDoOkEnabledScreenshot from '/img/gitbook-import/assets/image (41).png';

# Add Item Buttons

On this page, you will learn how to complete the to do list app by adding actions for the buttons in the add item view. You will include some revealed functionality that disables the OK button until the user enters text in the input.

Also the OK button action needs to pass the description text back to the main window view model, so it can be added to the items collection.  You will do this by passing an argument to the command.

To alter the add item view model, follow this procedure:

- Stop the app if it is running.
- Locate the **AddItemViewModel.cs** file in the **/ViewModels** folder.
- Edit the code as shown.

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

Examine how the OK reactive command is created:

```csharp
OkCommand = ReactiveCommand.Create(
   () => new ToDoItem { Description = Description }, isValidObservable);
```

The first parameter is a lambda function that is run whenever the command is executed. The function here creates an instance of the data model `TodoItem` including the current value of the description.

The second lambda function ('can execute' parameter) determines the enabled state of the reactive command. So this is passed the observable created just before.

The code also creates a reactive command for the cancel button:

```csharp
CancelCommand = ReactiveCommand.Create(() => { });
```

The cancel command has no execution, so its first and only parameter does nothing. The cancel button is always enabled, so it does not have a 'can execute' parameter.

## Bind the OK and Cancel Buttons

Your next step is to create binding for the OK and cancel buttons in the view.

To do this, follow this procedure:

- Locate the **AddItemView.axaml** file in the **/Views** folder.
- Edit the XAML as shown.

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

Run the application and click **Add Item**. You should now see that the OK button is only enabled when there is some text in the description input.

<img className="center" src={ToDoOkDisabledScreenshot} alt="" />

<img className="center" src={ToDoOkEnabledScreenshot} alt="" />

On the next page you will learn how to process the new to do item, so that it appears on the list, if the user clicks OK.
