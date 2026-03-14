---
id: data-context
title: Data context
description: Understand how DataContext provides the default data source for bindings and inherits through the control tree.
doc-type: explanation
---

import DataContextOverviewDiagram from '/img/concepts/data-concepts/data-context/data-context-overview.png';
import DataContextTreeSearchDiagram from '/img/concepts/data-concepts/data-context/data-context-tree-search.png';
import DataContextGreetingBindingScreenshot from '/img/concepts/data-concepts/data-context/data-context-greeting.png';
import DataContextPreviewerScreenshot from '/img/concepts/data-concepts/data-context/data-context-previewer.png';

When Avalonia performs data binding, it must locate an application object to bind to. This location is represented by a **data context**.

<img src={DataContextOverviewDiagram} alt="Diagram showing how data context connects controls to view model properties"/>

Every control in Avalonia has a `DataContext` property, including built-in controls, user controls, and windows.

When binding, Avalonia performs a hierarchical search of the logical control tree, starting with the control where you define the binding, until it finds a data context to use.

<img src={DataContextTreeSearchDiagram} alt="Diagram showing data context inheritance through the control tree"/>

This means that a control defined in a window can use the data context of the window; or (as above) a control in a control in a window can use the window's data context.

:::info
For information about the control trees in Avalonia, and how to see them at run-time, see [Control trees](/docs/custom-controls/control-trees).
:::

## Example

You can see the window's data context being set if you create a new project using the _Avalonia MVVM Application_ template. Open the **App.axaml.cs** file to see the code:

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

You can find the object being set to the window's data context in the file **MainWindowViewModel.cs**:

```csharp
public class MainWindowViewModel : ViewModelBase
{
    public string Greeting => "Welcome to Avalonia!";
}
```

In the main window file **MainWindow.axaml**, you can see that the window content area contains a `TextBlock` with its `Text` property bound to the `Greeting` property.

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

<img src={DataContextGreetingBindingScreenshot} alt="App window showing a greeting bound from the data context"/>

## Design-time data context

You may have noticed, after you first compiled this project, that the preview pane also shows the greeting.

<img src={DataContextPreviewerScreenshot} alt="Design-time preview showing bound data context values"/>

Avalonia can also set a data context for a control for use at design-time. This is useful because the preview pane can show realistic data while you adjust layout and styles.

You can see the design-time data context being set in the XAML:

```xml
<Design.DataContext>
    <vm:MainWindowViewModel/>
</Design.DataContext>
```

:::tip
For a more detailed guide about using the design-time data context, see [XAML preview and design settings](/docs/app-development/xaml-preview-and-design-settings).
:::

:::info
Further discussion of data binding requires a background in the MVVM pattern. For an introduction to the concepts of the MVVM pattern, see [The MVVM pattern](/docs/fundamentals/the-mvvm-pattern).
:::

## See also

- [Introduction to data binding](/docs/data-binding/introduction-to-data-binding): Data binding overview.
- [Data binding syntax](/docs/data-binding/data-binding-syntax): Binding paths, modes, and converters.
- [XAML preview and design settings](/docs/app-development/xaml-preview-and-design-settings): Design-time data context configuration.
