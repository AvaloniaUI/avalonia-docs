---
description: TUTORIALS - Music Store App
---

# Button Command

So far in this tutorial, you have altered only files from the view part of the MVVM pattern (for the main window and app). On this page you will learn how to link the button in the view for the main window, to a command in the view model. This will cause user interaction with the view (in this case a button click) to have an effect in the application logic of the view model.

When you are develop with _Avalonia UI_ and the MVVM pattern, the solution template will give you a choice of MVVM toolkits. This tutorial is using the _ReactiveUI_ framework, and the solution template has already added the packages necessary.

## Reactive Command

The first step in linking the view and view model is to make the view model able to accept a command. You will achieve this by adding the .NET `ICommand` interface to the main window, and then implementing it with a _ReactiveUI_ `ReactiveCommand`. Follow this procedure:

- Stop the app if it is still running.
- Locate and open the **MainWindowViewModel.cs** file in the **/ViewModels** folder.
- Delete the existing content of the class, and add the code shown:

```csharp
using ReactiveUI;
using System.Windows.Input;

namespace Avalonia.MusicStore.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        public ICommand BuyMusicCommand { get; }

        public MainWindowViewModel()
        {
            BuyMusicCommand = ReactiveCommand.Create(() =>
            {
                // Code here will be executed when the button is clicked.
            });
        }
    }
}
```

- Place a debug breakpoint at the open (curly) bracket just above the comment line.

To complete the link from the view to your new `BuyMusicCommand` view model property, you will add a data binding to the button.

:::info
For more information about the concept of data binding, see [here](../../basics/data/data-binding).
:::

To add the button data binding, follow this procedure:

- Locate and open the **MainWindow.axaml** file.
- Find the XAML for the button and add the command attribute and binding, as shown:

```
<Button HorizontalAlignment="Right" VerticalAlignment="Top"
        Command="{Binding BuyMusicCommand}">
   <PathIcon Data="{StaticResource store_microsoft_regular}"/>
</Button>
```

The Command attribute of an _Avalonia UI_ button determines what happens when the button is clicked. In this case the data binding expression links to the `BuyMusicCommand` property of an underlying view model. To confirm that this is what happens:

- Click **Debug** to compile and run the project.
- Click the icon button.

You will see the app stop executing at the breakpoint you previously set in the view model.

On the next page, you will create a new dialog window, and then add some code to display it (where the breakpoint currently is in the view model).
