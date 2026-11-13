---
id: data-context
title: Data context
description: Understand how DataContext provides the default data source for bindings, how it inherits through the control tree, and where to set it.
doc-type: explanation
---

import DataContextOverviewDiagram from '/img/concepts/data-concepts/data-context/data-context-overview.png';
import DataContextTreeSearchDiagram from '/img/concepts/data-concepts/data-context/data-context-tree-search.png';
import DataContextGreetingBindingScreenshot from '/img/concepts/data-concepts/data-context/data-context-greeting.png';
import DataContextPreviewerScreenshot from '/img/concepts/data-concepts/data-context/data-context-previewer.png';

When Avalonia performs data binding, it must locate an application object to bind to. This location is represented by a **data context**.

<Image light={DataContextOverviewDiagram} alt="Diagram showing how data context connects controls to view model properties" position="center" maxWidth={400} cornerRadius="true"/>

Every control in Avalonia has a `DataContext` property, including built-in controls, user controls, and windows.

When binding, Avalonia performs a hierarchical search of the logical control tree, starting with the control where you define the binding, until it finds a data context to use.

<Image light={DataContextTreeSearchDiagram} alt="Diagram showing data context inheritance through the control tree" position="center" maxWidth={400} cornerRadius="true"/>

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

<Image light={DataContextGreetingBindingScreenshot} alt="App window showing a greeting bound from the data context" position="center" maxWidth={400} cornerRadius="true"/>

## Setting the data context

Avalonia doesn't assign a data context for you. A control's `DataContext` is `null` until it is set on that control or on one of its ancestors, and until then the control's bindings have no source to read from.

In the example above, the MVVM template sets the data context for the main window in **App.axaml.cs**. Any other window you add needs its own data context, which can be set in one of three places.

### When the window is created

The code that creates the window sets `DataContext` in an object initializer:

```csharp
var window = new SettingsWindow
{
    DataContext = new SettingsViewModel()
};
window.Show();
```

Because the caller chooses the view model, the window doesn't need to know how to construct one. This suits view models that take constructor arguments or that come from a [dependency injection](/docs/app-development/dependency-injection) container.

### In the window's constructor

The window's code-behind sets `DataContext` after calling `InitializeComponent()`:

```csharp
public partial class SettingsWindow : Window
{
    public SettingsWindow()
    {
        InitializeComponent();
        DataContext = new SettingsViewModel();
    }
}
```

The window always creates its own view model, wherever it is opened from. The trade-off is that the view is tied to one view model type and has to supply any constructor arguments itself.

### In XAML

The window's XAML sets `DataContext` as a property element:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:MyApp.ViewModels"
        x:Class="MyApp.Views.SettingsWindow"
        x:DataType="vm:SettingsViewModel"
        Title="Settings">

    <Window.DataContext>
        <vm:SettingsViewModel />
    </Window.DataContext>

    <TextBlock Text="{Binding UserName}" />

</Window>
```

This has the same effect as setting it in the constructor, but it requires the view model to have a parameterless constructor.

:::note
`x:DataType` doesn't set the data context. It tells the XAML compiler which type to expect, so that it can resolve [compiled bindings](/docs/data-binding/compiled-bindings) at build time. The window still needs a `DataContext` set by one of the approaches above.
:::

### New windows don't inherit a data context

`DataContext` inherits through the logical tree, and each window is the root of its own logical tree. A window therefore starts without a data context, even when another window opens it and is passed as its owner to `Show(owner)` or `ShowDialog(owner)`. A window created from the **Avalonia Window** template (`dotnet new avalonia.window`) also has no data context until you set one.

A user control is different. When you place it inside a window, it becomes part of that window's logical tree and inherits the window's data context, so it typically doesn't need one of its own.

### Recognizing a missing data context

Without a data context, controls that bind to the view model display nothing: text is blank, lists and tables have no rows, and buttons bound to commands do nothing. Avalonia doesn't log binding errors while the data context is `null`, so the debug output gives no warning either.

To confirm the cause, check the control's `DataContext` at runtime with [Avalonia DevTools](/docs/data-binding/binding-debugging#using-avalonia-devtools). For other ways a data context can end up `null`, see [`DataContext` is null](/docs/data-binding/binding-debugging#datacontext-is-null).

## Design-time data context

You may have noticed, after you first compiled this project, that the preview pane also shows the greeting.

<Image light={DataContextPreviewerScreenshot} alt="Design-time preview showing bound data context values" position="center" maxWidth={400} cornerRadius="true"/>

Avalonia can also set a data context for a control for use at design-time. This is useful because the preview pane can show realistic data while you adjust layout and styles.

You can see the design-time data context being set in the XAML:

```xml
<Design.DataContext>
    <vm:MainWindowViewModel/>
</Design.DataContext>
```

:::caution
The design-time data context applies only in the previewer. In a normal build, the XAML compiler removes `Design.DataContext` and `d:DataContext`, so the view model they reference is never created when the app runs. A view can show data in the previewer and still be empty at runtime. The runtime data context must be set separately, as described in [Setting the data context](#setting-the-data-context).
:::

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
- [Binding debugging](/docs/data-binding/binding-debugging): Diagnose bindings that produce no value, including a `null` data context.
