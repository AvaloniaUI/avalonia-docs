---
description: TUTORIALS - To Do List App
---

# Navigate Views

On this page you will learn how to change the view in the content zone of the main window to display the new item view, when the user clicks <mark style="color:green;">**Add Item**</mark>.

<div style={{textAlign: 'center'}}>
  <img src="../../.gitbook/assets/image (40).png" alt=""/>
</div>

Up to this point, you have used the MVVM pattern for this tutorial app. This means that the application logic is controlled from the view models, and the view model in charge of what appears in the main window is the main window view model.

Therefore to start with, follow this procedure to add a method to the main window view model that will change what is loaded in the main window content zone:

* [ ] Stop the app if it is running.
* [ ] Locate the <mark style="color:green;">**MainWindowViewModel.cs**</mark> file in the <mark style="color:green;">**/ViewModels**</mark> folder.
* [ ] Edit the code as shown.&#x20;

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
            _contentViewModel= new ToDoListViewModel(service.GetItems());
        }
        
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

Take some time to examine the code you just added. There is a new `ContentViewModel` property that can get and set the view model in the main window content zone. This is initially set in the constructor to be the to do list view model, with to do list data provided from the service.&#x20;

There is also now a new `AddItem()` method that can reassign the content to be the add item view model.

Notice that the `ContentViewModel` property set calls `RaiseAndSetIfChanged` which will cause a notification to be generated every time the property changes value. The _Avalonia UI_ binding system requires change notifications like this so it knows when to update the user interface.

## Main Window Content Binding

Now that you have passed control of what is shown in the main window over to the main window view model (in accordance with the MVVM pattern), you need to complete the link by changing the main window content to use a binding.&#x20;

Follow this procedure:

* [ ] Locate the <mark style="color:green;">**MainWindow.axaml**</mark> file in the <mark style="color:green;">**/Views**</mark> folder.
* [ ] Edit the XAML as shown.&#x20;

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
        xmlns:view="using:ToDoList.Views"
        x:Class="ToDoList.Views.MainWindow"
        Icon="/Assets/avalonia-logo.ico"
        Title="Avalonia To Do List"
        Content="{Binding ContentViewModel}">
</Window>
```

<div style={{textAlign: 'center'}}>
  <img src="../../.gitbook/assets/image (38) (2).png" alt=""/>
</div>

## Button Command

Lastly, to make the add item button call the `AddItem()` method, follow this procedure: &#x20;

* Locate the <mark style="color:green;">**ToDoListView.axaml**</mark> file in the <mark style="color:green;">**/Views**</mark> folder.
* Edit the XAML for the button as shown:&#x20;

```markup
<Button DockPanel.Dock="Bottom"
        HorizontalAlignment="Stretch"
        HorizontalContentAlignment="Center"
        Command="{Binding $parent[Window].DataContext.AddItem}">Add Item
</Button>
```

Take some time to examine the binding that you added to the button.&#x20;

Firstly, the `Command` property defines a method to be called whenever the button is clicked.&#x20;

Then the binding gives the exact **binding path** to the method using a binding source expression:

```
$parent[Window].DataContext.AddItem
```

The **binding source expression** redirects the source of the binding. The _Avalonia UI_ binding system will use the source in the expression, instead of the control's data context.&#x20;

In this case the expression is looking for any parent of the control with the type `Window`. It will then use that control's data context to call the `AddItem` method.&#x20;

{% hint style="info" %}
For information about the concept of binding source expressions, see [here](../../concepts/data-binding/data-binding-syntax.md).
{% endhint %}

## Run the Application <a href="#run-the-application" id="run-the-application"></a>

Now If you run the application and click <mark style="color:green;">**Add Item**</mark>, you will see the new view appear.

<div>

<div style={{textAlign: 'center'}}>
  <img src="../../.gitbook/assets/image (43) (1).png" alt=""/>
</div>

 <div style={{textAlign: 'center'}}>
  <img src="../../.gitbook/assets/image (21) (1).png" alt=""/>
</div>

</div>

Have noticed something about this behaviour? The main window swaps the view model bound to  its content zone, and the display correctly loads the add item view!&#x20;

{% hint style="info" %}
In _Avalonia UI_ you can call a simple method on the view model directly like this. You will see later in this tutorial a scenario where you must use a different implementation. &#x20;
{% endhint %}

On the next page you will learn how this is happening due to the presence of the view locator.&#x20;
