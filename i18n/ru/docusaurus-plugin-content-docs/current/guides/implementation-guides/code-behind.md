---
id: code-behind
title: How To Use Code-behind
---

# How To Use Code-behind

This guide will show you how to use the code-behind programming pattern with _Avalonia UI_.

You can use this pattern for small and simple applications. For large or complex applications it is recommended that you use the alternative MVVM pattern.

:::info
For information about the concept of the MVVM programming pattern, see [here](../../concepts/the-mvvm-pattern/).
:::

## Code-behind File

Window and user control files have an associated code-behind file that is commonly written in C#, and has the file extension `.axaml.cs`. The code-behind file is usually displayed underneath the XAML file in your editor.

For example, below you can see a `MainWindow.xaml` file with its code-behind file `MainWindow.xaml.cs` in the Visual Studio solution explorer:

<!-- ![](../../.gitbook/assets/codebehind-vs.png) -->

The code-behind file contains a class that (when it is created) has the same name as the XAML file. For example:

```csharp
using Avalonia.Controls;

namespace AvaloniaApplication1.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
    }
}
```

Notice that this class name is the same as name of the XAML file, and is also referenced in the `x:Class` attribute of the window element.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:AvaloniaApplication1.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaApplication1.Views.h"
        Icon="/Assets/avalonia-logo.ico"
        Title="AvaloniaApplication1">
  ...
</Window>
```

:::tip
If you make any changes to the class name in code, or its namespace, ensure that the  `x:Class` attribute always matches, or you will get an error.
:::

When the code-behind file is first added, it only has its constructor, and a call to the  `InitializeComponent()` method - which is used to load the XAML at runtime.

## Locating Controls <a href="#locating-controls" id="locating-controls"></a>

When you use this programming pattern, you will write code (in the code-behind file) that manipulates the controls defined in the XAML.

To do this you will first need a reference to a control. Your code will use find-by-name to locate the button. So for this to work the control will need a name property - and this will come from a `Name` attribute in XAML.

In this example, the button in the XAML has the name attribute defined:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication5.MainWindow">
  <Button Name=GreetingButton">Hello World</Button>
</Window>
```

So now you can see that button appears by name in the Intellisense when you type in the code-behind file. It looks like this:

<!--<img src="../../.gitbook/assets/image (7) (1) (2).png" alt="">-->

## Set Properties

With the control reference available in the code-behind, you can set properties. For example, you can change the background property like this:

```csharp
GreetingButton.Background = Brushes.Blue;
```

## Handling Events <a href="#handling-events" id="handling-events"></a>

Any useful application will require you to implement some action! When you use the code-behind pattern, you write event handling procedures in the code-behind file.

You write event handlers as methods in the code-behind file, and then reference them in the XAML with an event attribute. For example to add a handler for a button click:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication4.MainWindow">
  <Button Click="GreetingButtonClickHandler">Hello World</Button>
</Window>
```

```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    public void GreetingButtonClickHandler(object sender, RoutedEventArgs e)
    {
        // code here.
    }
}
```

Notice that an event handler in _Avalonia UI_ code uses a special argument of class `RoutedEventArgs`. This includes information about how the event has been generated and propagated.

:::info
For more information on the concepts of event routing, see [here](../../concepts/input/routed-events.md).
:::

 