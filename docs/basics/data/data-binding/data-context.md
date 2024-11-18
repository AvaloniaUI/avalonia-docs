---
description: CONCEPTS
---

import DataContextOverviewDiagram from '/img/basics/data-binding/data-context/data-context-overview.png';
import DataContextTreeSearchDiagram from '/img/basics/data-binding/data-context/data-context-tree-search.png';
import DataContextGreetingBindingScreenshot from '/img/basics/data-binding/data-context/data-context-greeting.png';
import DataContextPreviewerScreenshot from '/img/basics/data-binding/data-context/data-context-previewer.png';

# Data Context

When Avalonia performs data binding, it has to locate an application object to bind to. This location is represented by a **Data Context**.

<img src={DataContextOverviewDiagram} alt=''/>

Every control in Avalonia has a property called `DataContext`, and this includes built-in controls, user controls and windows.

When binding, Avalonia performs a hierarchical search of the logical control tree, starting with the control where the binding is defined, until it finds a data context to use.

<img src={DataContextTreeSearchDiagram} alt=''/>

This means that a control defined in a window can use the data context of the window; or (as above) a control in a control in a window can use the window's data context.

:::info
For information about the control trees in Avalonia, and how to see them at run-time, see [here](../../../concepts/control-trees).
:::

## Example

You can see the window's data context being set if you create a new project using the _Avalonia MVVM Application_ template. Locate and open the **App.axaml.cs** file to see the code:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    {
        desktop.MainWindow = new MainWindow
        {
            DataContext = new MainWindowViewModel(),
        };
    }

    base.OnFrameworkInitializationCompleted();
}
```

You can trace the object being set to the window's data context in the file **MainWindowViewModel.cs**. The code looks like this:

```csharp
public class MainWindowViewModel : ViewModelBase
{
    public string Greeting => "Welcome to Avalonia!";
}
```

In the main window file **MainWindow.axaml** you can see that the window content zone is comprised a text block that has its text property bound to the `Greeting` property.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:AvaloniaMVVMApplication2.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaMVVMApplication2.Views.MainWindow"
        Icon="/Assets/avalonia-logo.ico"
        Title="AvaloniaMVVMApplication2">

    <Design.DataContext>
        <vm:MainWindowViewModel/>
    </Design.DataContext>

    <TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>

</Window>
```

When the project runs, the data binder searches up the logical control tree from the text block and finds a data context set at the main window level. So the bound text appears as:

<img src={DataContextGreetingBindingScreenshot} alt=""/>

## Design Data Context

You may have noticed, after you first compiled this project, that the preview pane also shows the greeting.

<img src={DataContextPreviewerScreenshot} alt=""/>

This is because Avalonia can also set a data context for a control for use at design-time. You will find this useful because it means that the preview pane can show some realistic data while you adjust layout and styles.

You can see the design-time data context being set in the XAML:

```xml
<Design.DataContext>
    <vm:MainWindowViewModel/>
</Design.DataContext>
```

:::tip
For a more detailed guide about using the design-time data context, see [here](../../../guides/implementation-guides/how-to-use-design-time-data.md).
:::

:::info
Further discussion of data binding requires you to have a background in the MVVM pattern of programming. For an introduction to the concepts of the MVVM pattern, see [here](../../../concepts/the-mvvm-pattern).
:::

Further Information

Bind to Commands
