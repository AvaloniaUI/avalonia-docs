---
id: code-behind
title: Code-behind
description: Use code-behind files to access controls, set properties, and handle events from XAML.
doc-type: explanation
---

import VsSolutionExplorerScreenshot from '/img/concepts/core-concepts/code-behind/vs-solution-explorer.png';

In addition to a XAML file, most Avalonia controls have a _code-behind_ file that is commonly written in C#. The code-behind file by convention has the file extension `.axaml.cs` and is often displayed nested below the XAML file in your IDE.

For instance, in the Visual Studio solution explorer, you can see a `MainWindow.axaml` file along with its code-behind file `MainWindow.axaml.cs`:

<p><img src={VsSolutionExplorerScreenshot} className="medium-zoom-image" alt="Visual Studio solution explorer showing a XAML file with its nested code-behind file" /></p>

Your code-behind file contains a `partial` class that shares the same name as the XAML file. The `partial` keyword is important because it allows the Avalonia build tooling to generate a companion file that wires up your named controls and calls into the XAML loader. For example:

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

Notice that the class name matches the name of the XAML file and is also referenced in the `x:Class` attribute of the window element. The fully qualified name in `x:Class` must include the namespace.

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        // highlight-next-line
        x:Class="AvaloniaApplication1.Views.MainWindow">
  ...
</Window>
```

:::tip
If you change the class name or its namespace in code, make sure the `x:Class` attribute always matches. A mismatch will produce a build or runtime error.
:::

When you first create a code-behind file, it contains only a constructor that calls the `InitializeComponent()` method. This call is required to load the corresponding XAML at runtime. If you remove it, your UI will not render.

## Locating controls

When you work with code-behind, you often need to access the controls defined in your XAML.

To do this, give the target control a name using the `Name` (or `x:Name`) attribute in XAML. The Avalonia build tooling then generates a strongly typed field in your partial class so you can reference the control directly.

Here is an example of a XAML file with a named `Button`:

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication5.MainWindow">
  // highlight-next-line
  <Button Name="greetingButton">Hello World</Button>
</Window>
```

You can now access the button through the auto-generated `greetingButton` field in your code-behind:

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

:::tip
Because the field is generated at build time, your IDE may show a warning until the project is compiled. Building the project resolves the warning.
:::

## Setting properties

Once you have a reference to a control in your code-behind, you can get or set any of its properties. For example, you can change the `Background` property of your button:

```csharp title='C#'
greetingButton.Background = Brushes.Blue;
```

You can also read property values. This is useful when you need to inspect the current state of a control before deciding what action to take:

```csharp title='C#'
if (greetingButton.IsVisible)
{
    greetingButton.Content = "I'm visible!";
}
```

## Handling events

Most interactive applications need to respond to user actions such as clicks, key presses, or pointer movements. When you use the code-behind pattern, you write event handler methods in the code-behind file and reference them from your XAML with an event attribute.

For example, to handle a button click, add a `Click` attribute in XAML that points to a method in your code-behind:

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

The `sender` parameter is the control that raised the event, and the `RoutedEventArgs` parameter carries information about how the event was generated and propagated through the visual tree.

You can also attach event handlers in code rather than in XAML. This is useful when you need to add or remove handlers dynamically:

```csharp title='C#'
greetingButton.Click += GreetingButtonClickHandler;
```

:::info
For more information on event routing, see [Routed events](/docs/input-interaction/routed-events).
:::

## When to use code-behind vs. MVVM

Code-behind works well for small applications, prototypes, or view-specific logic such as animations and focus management. For larger applications, consider the MVVM pattern, which separates your UI logic into view models that are easier to test and maintain. You can also combine both approaches, using MVVM for your data and business logic while keeping view-specific code in code-behind.

## See also

- [Avalonia XAML](/docs/fundamentals/avalonia-xaml)
- [Code-only UI](/docs/fundamentals/coded-ui)
- [The MVVM pattern](/docs/fundamentals/the-mvvm-pattern)
- [UI composition](/docs/fundamentals/ui-composition)
- [Routed events](/docs/input-interaction/routed-events)
