---
id: data-context
title: Data context
description: Understand how data context provides the default data source for bindings, how it inherits through the control tree, and where to set it.
doc-type: explanation
---

import DataContextOverviewDiagram from '/img/concepts/data-concepts/data-context/data-context-overview.png';
import DataContextTreeSearchDiagram from '/img/concepts/data-concepts/data-context/data-context-tree-search.png';
import DataContextGreetingBindingScreenshot from '/img/concepts/data-concepts/data-context/data-context-greeting.png';

When Avalonia performs data binding, it must locate an application object to bind to. This location is represented by a **data context**.

<Image light={DataContextOverviewDiagram} alt="Diagram showing how data context connects controls to view model properties" position="center" maxWidth={400} cornerRadius="true"/>

## Overview

Every control in Avalonia has a `DataContext` property, whether [built-in controls](/controls/), [user controls](/controls/primitives/usercontrol), or [windows](/controls/primitives/window).

When binding, Avalonia performs a hierarchical search of the logical control tree, starting with the control where you define the binding, until it finds a data context to use.

<Image light={DataContextTreeSearchDiagram} alt="Diagram showing data context inheritance through the control tree" position="center" maxWidth={400} cornerRadius="true"/>
<br />

This means that a control defined in a window can use the data context of the window. Or, as above, a control in a control in a window can use the window's data context.

:::info
For information about the control trees in Avalonia, and how to see them at run-time, see [Control trees](/docs/custom-controls/control-trees).
:::

## New projects

### Main window data context

New projects created with the **Avalonia MVVM Application** template automatically include a `MainWindow` whose data context is set to `MainViewModel`. You can find this in the `App.axaml.cs` file:

```csharp title="App.axaml.cs"
public override void OnFrameworkInitializationCompleted()
{
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    {
        desktop.MainWindow = new MainWindow
        {
            DataContext = new MainViewModel(),
        };
    }

    base.OnFrameworkInitializationCompleted();
}
```

### Data context objects

Objects included in the main window's data context can be found in the file `MainViewModel.cs`:

```csharp title="MainViewModel.cs"
public partial class MainViewModel : ViewModelBase
{
    [ObservableProperty] public partial string Greeting { get; set; } = "Welcome to Avalonia!";
}
```

### Binding to the data context

In the main window file `MainWindow.axaml`, you can see that the window's content area contains a `TextBox` that uses a `Text` property bound to `Greeting`.

When the project runs, the data binder searches up the logical control tree from the text box and finds a data context set at the main window level. So the bound text appears as "Welcome to Avalonia!", as defined in the main view model.

```xml title="MainWindow.axaml"
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:AvaloniaApplication1.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaMVVMApplication2.Views.MainWindow"
        x:DataType="vm:MainViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="AvaloniaMVVMApplication2">

    <Design.DataContext>
        <vm:MainViewModel />
    </Design.DataContext>

    <TextBox Text="{Binding Greeting}"
             HorizontalAlignment="Center"
             VerticalAlignment="Center" />

</Window>
```

<Image light={DataContextGreetingBindingScreenshot} alt="App window showing a greeting bound from the data context" position="center" maxWidth={400} cornerRadius="true"/>

## Setting the data context

Avalonia does not automatically assign a control's data context. Until `DataContext` is set, any bindings on the control do not work, as they have no source to read from.

As described above, [new projects](#new-projects) started with the **Avalonia MVVM Application** template automatically set `MainViewModel` as the data context for `MainWindow` in the `App.axaml.cs` file. Any additional window you create needs its own data context.

There are three ways to set the data context of a new window:

1. [In the code that creates a new window](#in-the-code-that-creates-a-new-window)
2. [In the window's constructor](#in-the-windows-constructor)
3. [In XAML](#in-xaml)

### In the code that creates a new window

Set `DataContext` in the object initializer, so that a new window gets a data context when it is created.

Because the caller chooses the view model, the window doesn't need to know how to construct one. This is suitable for view models that take constructor arguments, or that come from a [dependency injection](/docs/app-development/dependency-injection) container.

```csharp
var window = new MyWindow
{
    DataContext = new MyViewModel()
};
window.Show();
```

### In the window's constructor

Set `DataContext` in the window's code-behind file, after calling `InitializeComponent()`.

When data context is set in the code-behind, the window always creates its own view model, wherever it is opened from. The view is therefore tied to a single view model.

```csharp
public partial class MyWindow : Window
{
    public SettingsWindow()
    {
        InitializeComponent();
        DataContext = new MyViewModel();
    }
}
```

### In XAML

Set the data context in the window's XAML as a property element, i.e., `<Window.DataContext>`.

This has a similar effect as setting it in the constructor, but requires the view model to have a parameterless constructor.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:MyApp.ViewModels"
        x:Class="MyApp.Views.MyWindow"
        x:DataType="vm:MyViewModel"
        Title="MyWindow">

    <Window.DataContext>
        <vm:MyViewModel />
    </Window.DataContext>

    <TextBlock Text="{Binding UserName}" />

</Window>
```

:::info
See [Binding debugging](/docs/data-binding/binding-debugging#datacontext-is-null) for how to debug issues that can cause `DataContext` to be `null`.
:::

## Notes

- `x:DataType` does not set the data context. It only tells the XAML compiler what type to expect for [compiled bindings](/docs/data-binding/compiled-bindings) at build time.
- New windows do not inherit data context, even if the new window is opened with `Show(owner)` and is a child window of the owner window. This is because each `Window` is the root of its own logical tree.
- [User controls](/controls/primitives/usercontrol), conversely, do inherit the data context of the window that hosts them, as they are part of the window's logical tree.

## Design-time data context

Avalonia can set a design-time data context for a control. This means the control can display real binding data in the preview pane while you adjust layout and styles, allowing you to carry out UI design without building the project repeatedly.

You can set the design-time data context as a property element in XAML. By default, the **Avalonia MVVM Application** template creates new projects with `MainViewModel` as the design-time data context.

For further guidance on using the design-time data context, see [XAML preview and design settings](/docs/app-development/xaml-preview-and-design-settings).

```xml title="MainWindow.axaml"
<Design.DataContext>
    <vm:MainViewModel />
</Design.DataContext>
```

:::note
The design-time data context applies only in the previewer. During a real build, the XAML compiler removes `Design.DataContext` and `d:DataContext`. A window's build-time data context is not automatically used as the design-time data context, and vice versa.
:::

## See also

- [Introduction to data binding](/docs/data-binding/introduction-to-data-binding): Data binding overview.
- [Data binding syntax](/docs/data-binding/data-binding-syntax): Binding paths, modes, and converters.
- [XAML preview and design settings](/docs/app-development/xaml-preview-and-design-settings): Design-time data context configuration.
- [Binding debugging](/docs/data-binding/binding-debugging): Diagnose data binding issues.
- [The MVVM pattern](/docs/fundamentals/the-mvvm-pattern)