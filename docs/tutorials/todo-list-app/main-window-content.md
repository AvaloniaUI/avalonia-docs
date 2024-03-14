---
description: TUTORIALS - To Do List
---

import ToDoMainWindowContentScreenshot from '/img/gitbook-import/assets/image (4) (1) (1).png';

# Main Window Content

At this point your main window still displays the greeting text created by the solution template. On this page you will change the main window content zone, so it displays your new user control instead.

Follow this procedure to change the main window content:

- Locate and open the main window XAML file:`Views/MainWindow.axaml`
- Add the namespace declaration `xmlns:views="clr-namespace:ToDoList.Views"`
- Retitle the app by changing the title attribute to `Title="Avalonia To Do List"`
- Replace the `<TextBlock>` element with `<views:ToDoListView/>`

The main window XAML should now look like this:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ToDoList.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
        xmlns:views="clr-namespace:ToDoList.Views"
        x:Class="ToDoList.Views.MainWindow"
        Icon="/Assets/avalonia-logo.ico"
        Title="Avalonia To Do List">

    <Design.DataContext>
        <vm:MainWindowViewModel/>
    </Design.DataContext>

  <views:ToDoListView/>

</Window>
```

## Examine the XAML

This XAML is similar in many ways to the user control XAML you had a lookup on the previous page. Specifically, here you added:

```xml
<Window ... xmlns:views="clr-namespace:ToDoList.Views" ...>
```

This maps the code namespace `ToDoList.Views` to the XML namespace alias `views`.

:::warning
Any user control that you create will need this kind of mapping, or the Avalonia UI XAML engine will be unable to find it, and you will get an error.
:::

The last step sets the content zone of the window to display your new user control view:

```xml
<views:ToDoListView/>
```

## Run the Application

Now run the application you have built so far.  If you are using Visual Studio, press the function key F5. If you are using .NET Core CLI, execute the command:

```
dotnet run
```

You will see the main window, with its new title and user control:

<img className="center" src={ToDoMainWindowContentScreenshot} alt="" />

That is just the view - nothing really does anything yet! On the next pages, you will learn how to create the working parts of the app: the model and the view model.
