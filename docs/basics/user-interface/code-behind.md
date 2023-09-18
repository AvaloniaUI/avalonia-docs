---
id: code-behind
title: Code-behind
---

import VsSolutionExplorerScreenshot from '/img/basics/user-interface/code-behind/vs-solution-explorer.png';

# Code-behind

In addition to a XAML file, most Avalonia controls also have a _code-behind_ file that is commonly written in C#. The code-behind file by convention has the file extension `.axaml.cs` and is often displayed nested below the XAML file in your IDE.

For instance, in the Visual Studio solution explorer, you can see a `MainWindow.axaml` file along with its code-behind file `MainWindow.axaml.cs`:

<p><img src={VsSolutionExplorerScreenshot} className="medium-zoom-image" /></p>

The code-behind file contains a class that shares the same name as the XAML file. For example:

```csharp title='MainWindow.axaml.cs'
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

Notice that the class name matches the name of the XAML file, and is also referenced in the `x:Class` attribute of the window element.

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        // highlight-next-line
        x:Class="AvaloniaApplication1.Views.MainWindow">
  ...
</Window>
```

:::tip
If you make any changes to the class name in code, or its namespace, ensure that the  `x:Class` attribute always matches, or you will get an error.
:::

When the code-behind file is first added, it has only a constructor, which calls the  `InitializeComponent()` method. This method call is required to load the XAML at runtime.

## Locating Controls

When working with code-behind, you often need to access the controls defined in XAML.

To do this, you first need to obtain a reference to the desired control. Give the control a name using the `Name` (or `x:Name`) attribute in XAML.

Here's an example of a XAML file with a named button:

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication5.MainWindow">
  // highlight-next-line
  <Button Name="greetingButton">Hello World</Button>
</Window>
```

You can now access the button via an auto-generated `greetingButton` field from the code-behind:

```csharp title='MainWindow.axaml.cs'
using Avalonia.Controls;

namespace AvaloniaApplication1.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            // highlight-next-line
            greetingButton.Content = "Goodbye Cruel World!";
        }
    }
}
```

## Set Properties

With the control reference available in the code-behind, you can set properties. For example, you can change the background property like this:

```csharp
greetingButton.Background = Brushes.Blue;
```

## Handling Events

Any useful application will require you to implement some action! When using the code-behind pattern, you write event handlers in the code-behind file.

Event handlers are written as methods in the code-behind file, and then referenced in the XAML using an event attribute. For example, to add a handler for a button click event:

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication4.MainWindow">
  <Button Click="GreetingButtonClickHandler">Hello World</Button>
</Window>
```

```csharp title='MainWindow.axaml.cs'
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

Note that many Avalonia event handlers pass a special argument of class `RoutedEventArgs`. This includes information about how the event has been generated and propagated.

:::info
For more information on the concepts of event routing, see [here](../../concepts/input/routed-events.md).
:::
