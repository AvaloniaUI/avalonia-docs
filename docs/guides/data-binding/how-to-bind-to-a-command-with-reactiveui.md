---
id: how-to-bind-to-a-command-with-reactiveui
title: How to Bind to a Command with ReactiveUI
---

import BindReactiveCommandScreenshot from '/img/guides/data-binding/bind-reactivecommand.gif';

# How to Bind to a Command with ReactiveUI

This guide shows you how to bind a view model method (that performs an action) to a control that can initiate an action in response to user interaction (for example, a button). This binding is defined in XAML using the `Command` attribute, for example:

```csharp
<Window xmlns="https://github.com/avaloniaui">
    ...
  <StackPanel Margin="20">
      <Button Command="{Binding ExampleCommand}">Run the example</Button>
  </StackPanel>
```

This guide assumes that you are using the MVVM implementation pattern, and you have based your view model on the _ReactiveUI_ framework.

:::info
To review the concept behind the MVVM implementation pattern, see [here](../../concepts/the-mvvm-pattern/).
:::

If you created your application using the **Avalonia MVVM Application** solution template then your solution will already contain the _ReactiveUI_ framework package, and you can reference it like this:

```csharp
using ReactiveUI;
```

A view model that can perform actions implements them through the `ICommand` interface. The _ReactiveUI_ framework provides the `ReactiveCommand` class that implements `ICommand`.

:::info
For details of the definition of the `ICommand` interface, see [here](https://docs.microsoft.com/en-gb/dotnet/api/system.windows.input.icommand?view=netstandard-2.0).
:::

The `Command` attribute data binding will call the bound view model method through its `ICommand.Execute` interface, when the bound control is activated. In this example: when the button is clicked.

To create a view model with a `ReactiveCommand`, follow this example:

-  In your view model, declare a command, like this:

```csharp
public ReactiveCommand<Unit, Unit> ExampleCommand { get; } 
```

-  Create a private method in the view model to perform the action.
-  Initialize the reactive command, passing the name of the method that performs the action.

Your view model code will now look like this:

```csharp
namespace AvaloniaGuides.ViewModels
{
    public class MainWindowViewModel 
    {
        public ReactiveCommand<Unit, Unit> ExampleCommand { get; }

        public MainWindowViewModel()
        {
            ExampleCommand = ReactiveCommand.Create(PerformAction);
        }
        private void PerformAction()
        {
            Debug.WriteLine("The action was called.");
        }
    }
}
```

-  Run the app and monitor the debug output.

When the control bound to the reactive command is activated (in this example: when the button is clicked); then the private method to perform the action is called through the reactive command.

<img src={BindReactiveCommandScreenshot} alt=""/>

## Command Parameter

You will often need to pass an argument to the reactive command that is bound to a control. You can achieve this using the `CommandParameter` attribute in the XAML. For example:

```xml
<Window xmlns="https://github.com/avaloniaui">
   ...
   <StackPanel Margin="20">
      <Button Command="{Binding ExampleCommand}"
              CommandParameter="From the button">Run the example</Button>
   </StackPanel>
</Window>
```

You must now modify the view model so that the reactive commend expects a string parameter, the initialisation expects a string parameter, and the private method to perform the action expects a string parameter. As follows:

```csharp
namespace AvaloniaGuides.ViewModels
{
    public class MainWindowViewModel 
    {
        public ReactiveCommand<string, Unit> ExampleCommand { get; }

        public MainWindowViewModel()
        {
            ExampleCommand = ReactiveCommand.Create<string>(PerformAction);
        }
        private void PerformAction(string msg)
        {
            Debug.WriteLine($"The action was called. {msg}");
        }
    }
}
```

Note that no type conversion is carried out on the `CommandParameter` attribute, so if you need to use a type parameter that is not a string, then you must define the type in the XAML. You will also need to use the expanded XAML syntax for the parameter.

For example to pass an integer parameter:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:sys="clr-namespace:System;assembly=mscorlib">
 ...   
    <Button Command="{Binding ExampleIntegerCommand}">
        <Button.CommandParameter>
            <sys:Int32>42</sys:Int32>
        </Button.CommandParameter>
        What is the answer?
    </Button>
</Window>
```

:::danger
You will get an error if your parameter definitions are missing or not the correct type.
:::

:::info
Like any other property, the command parameter can be bound.
:::
