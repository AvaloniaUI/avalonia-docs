---
description: TUTORIALS - To Do List App
---

import ToDoAddNewItemsScreenshot from '/img/gitbook-import/assets/image (44).png';

# Add New Items

When you created the `ToDoListView` user control earlier in this tutorial, you added a button so that the user can add a new item. On this page you will add an action to the button.

When the user clicks the button, you want the application to show a new view that will allow the user to enter the description of a new item.

## Create the View Model

To create a view model for the new view, follow this procedure:

- In the **Solution Explorer** locate and right-click the **ViewModels** folder.
- Click **Add**, then **Class**.
- Name the class 'AddItemViewModel'. Click **Add**.
- Add the description property as shown:

```csharp
using System;

namespace ToDoList.ViewModels
{
    public class AddItemViewModel : ViewModelBase
    {
        public string Description { get; set; } = String.Empty;
    }
}
```

## Create a New View

To create the new view, follow this procedure if you are using Visual Studio:

- In the **Solution Explorer** locate and right-click the **Views** folder.
- Click **Add**
- Click **Avalonia** under **C# Items** and then click **User Control (Avalonia)**
- In **Name** enter 'AddItemView'
- Click **Add**

### .NET Core CLI

Run the following command to create the new view, follow this procedure if you are using .Net Core CLI:

```
dotnet new avalonia.usercontrol -o Views -n AddItemView  --namespace ToDoList.Views
```

Alter the XAML to match the following:

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
            HorizontalContentAlignment="Center">Cancel</Button>
    <Button DockPanel.Dock="Bottom" 
            HorizontalAlignment="Stretch"
            HorizontalContentAlignment="Center">OK</Button>
    <TextBox AcceptsReturn="True"
             Text="{Binding Description}"
             Watermark="Enter your to do item"/>
  </DockPanel>
</UserControl>
```


This gives you a view which looks like this:

<img className="center" src={ToDoAddNewItemsScreenshot} alt="" />

The new view has a text box control which has three properties for you to review:

* `AcceptsReturn` creates a multi-line text box.
* `Text` binds the text that is displayed in the text box to the `Description` property on a view model (that you created above).
* `Watermark` causes a placeholder to be displayed when the text box is empty.

On the next page you will learn how to change the view in the main window to display the new item view in place of the to do list view.
