---
description: TUTORIALS - Music Store App
---

# Button Command

So far in this tutorial, you have altered only files from the view part of the MVVM pattern (for the main window and app). On this page you will learn how to link the button in the view for the main window, to a command in the view model. This will cause user interaction with the view (in this case a button click) to have an effect in the application logic of the view model.

When you develop with _Avalonia UI_ and the MVVM pattern, the solution template will give you a choice of MVVM toolkits. This tutorial now uses _CommunityToolkit.Mvvm_, and the solution template has already added the necessary packages.

## RelayCommand

The first step in linking the view and view model is to make the view model able to accept a command. You will achieve this by adding a method to the main window view model and decorating it with the `[RelayCommand]` attribute, which will generate a bindable `ICommand` property, which can be referenced from your view.
Follow this procedure:

- Stop the app if it is still running.
- Locate and open the **MainWindowViewModel.cs** file in the **/ViewModels** folder.
- Delete the existing content of the class, and add the code shown:

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Threading.Tasks;

namespace Avalonia.MusicStore.ViewModels
{
    public partial class MainWindowViewModel : ObservableObject
    {
        public MainWindowViewModel()
        {
            // ViewModel initialization logic.
        }

        [RelayCommand]
        private async Task AddAlbumAsync()
        {
            // Code here will be executed when the button is clicked.
        }
    }
}
```
### How it works
The `[RelayCommand]` attribute generates a public property for you at compile time named `AddAlbumCommand`, which implements `ICommand`.

This means that even though you only wrote a method named `AddAlbumAsync`, Avalonia's data-binding system can bind directly to `AddAlbumCommand` in your AXAML — without you writing any boilerplate command logic.

- Now place a debug breakpoint at the opening curly brace inside the `AddAlbumAsync()` method.

To complete the link from the view to your new `AddAlbumAsync` view model property, you will add a data binding to the button.

:::info
For more information about the concept of data binding, see [here](../../basics/data/data-binding).
:::

To add the button data binding, follow this procedure:

- Locate and open the **MainWindow.axaml** file.
- Find the XAML for the button and add the command attribute and binding, as shown:

```xml
<Button HorizontalAlignment="Right" VerticalAlignment="Top"
        Command="{Binding AddAlbumCommand}">
    <PathIcon Data="{StaticResource store_microsoft_regular}"/>
</Button>
```
### Why it is `AddAlbumCommand`?
The `[RelayCommand]` attribute automatically generates command properties based on your method names. If your method name ends with _Async_, the generator removes the _Async_ suffix and appends _Command_ to form the property name.
If the method returns a Task, `[RelayCommand]` automatically generates an `IAsyncRelayCommand` instead of a regular `IRelayCommand`, giving you full support for asynchronous execution.
This means:
- If your method is named `AddAlbumAsync`, the generated property will be called `AddAlbumCommand`.
- If your method is named `AddAlbum`, it also becomes `AddAlbumCommand`.
:::info
Learn more about asynchronous _RelayCommand_ generation in the official docs [here](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/generators/relaycommand#asynchronous-commands).
:::
The Command attribute of an _Avalonia UI_ button determines what happens when the button is clicked. In this case it binds to the _AddAlbumCommand_ generated in your view model, causing the _AddAlbumAsync()_ method to run.

- Click **Debug** to compile and run the project.
- Click the icon button.

You will see the app stop executing at the breakpoint you previously set in the view model.

On the next page, you will create a new dialog window, and then add some code to display it (where the breakpoint currently is in the view model).
