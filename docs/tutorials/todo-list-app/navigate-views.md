---
description: TUTORIALS - To Do List App
---

import ToDoNavigationConceptDiagram from '/img/gitbook-import/assets/image (40).png';
import ToDoNavigationArchitectureDiagram from '/img/gitbook-import/assets/image (38) (2).png';
import ToDoBeforeNavigationScreenshot from '/img/gitbook-import/assets/image (43) (1).png';
import ToDoAfterNavigationScreenshot from '/img/gitbook-import/assets/image (21) (1).png';

# Navigate Views

On this page you will learn how to change the view in the content zone of the main window to display the new item view, when the user clicks **Add Item**.

<img className="center" src={ToDoNavigationConceptDiagram} alt="" />

Up to this point, you have used the MVVM pattern for this tutorial app. This means that the application logic is controlled from the view models, and the view model in charge of what appears in the main window is the main window view model.

Therefore to start with, follow this procedure to add a method to the main window view model that will change what is loaded in the main window content zone:

- Stop the app if it is running.
- Locate the **MainWindowViewModel.cs** file in the **/ViewModels** folder.
- Edit the code as shown.

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

Take some time to examine the code you just added. There is a new `ContentViewModel` property that can get and set the view model in the main window content zone. This is initially set in the constructor to be the to do list view model, with to do list data provided from the service.

There is also now a new `AddItem()` method that can reassign the content to be the add item view model.

Notice that the `ContentViewModel` property set calls `RaiseAndSetIfChanged` which will cause a notification to be generated every time the property changes value. The _Avalonia UI_ binding system requires change notifications like this so it knows when to update the user interface.

## Main Window Content Binding

Now that you have passed control of what is shown in the main window over to the main window view model (in accordance with the MVVM pattern), you need to complete the link by changing the main window content to use a binding.

Follow this procedure:

- Locate the **MainWindow.axaml** file in the **/Views** folder.
- Edit the XAML as shown.

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

## Button Command

Lastly, to make the add item button call the `AddItem()` method, follow this procedure:

* Locate the **ToDoListView.axaml** file in the **/Views** folder.
* Edit the XAML for the button as shown:

```xml
<Button DockPanel.Dock="Bottom"
        HorizontalAlignment="Stretch"
        HorizontalContentAlignment="Center"
        x:CompileBindings="False"
        Command="{Binding $parent[Window].DataContext.AddItem}">
        Add Item
</Button>
```

Take some time to examine the binding that you added to the button.

Firstly, the `Command` property defines a method to be called whenever the button is clicked.

Then the binding gives the exact **binding path** to the method using a binding source expression:

```
$parent[Window].DataContext.AddItem
```

The **binding source expression** redirects the source of the binding. The _Avalonia UI_ binding system will use the source in the expression, instead of the control's data context.

In this case the expression is looking for any parent of the control with the type `Window`. It will then use that control's data context to call the `AddItem` method.

:::info
For information about the concept of binding source expressions, see [here](../../basics/data/data-binding/data-binding-syntax).
:::

## Run the Application

Now If you run the application and click **Add Item**, you will see the new view appear.

<img className="center" src={ToDoBeforeNavigationScreenshot} alt="" />

<img className="center" src={ToDoAfterNavigationScreenshot} alt="" />

Have noticed something about this behaviour? The main window swaps the view model bound to its content zone, and the display correctly loads the add item view!

:::info
In _Avalonia UI_ you can call a simple method on the view model directly like this. You will see later in this tutorial a scenario where you must use a different implementation.
:::

On the next page you will learn how this is happening due to the presence of the view locator.
