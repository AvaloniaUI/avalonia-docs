---
id: adding-interactivity
title: Adding Interactivity
---

One of the fundamental things that a user interface must do is interact with the user. In Avalonia, you can add interactivity to your applications by leveraging events and commands. This guide will introduce events and commands with simple examples.

## Handling Events

Events in Avalonia provide a way to respond to user interactions and control-specific actions. You can handle events by following these steps:

1. **Implement the Event Handler**: Write an event handler in the [code-behind](../user-interface/code-behind.md) that will be executed when the event is triggered. The event handler should contain the logic you want to execute in response to the event.

```csharp title='MainWindow.axaml.cs'
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    // highlight-start
    private void HandleButtonClick(object sender, RoutedEventArgs e)
    {
        // Event handling logic goes here
    }
    // highlight-end
}
```

2. **Subscribe to the Event**: Identify the event you want to handle in your control. Most controls in Avalonia expose various events, such as `Click` or `SelectionChanged`. Subscribe to the event in XAML by locating the control and adding an attribute with the name of the event and a value indicating the name of the event handler method.

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication1.Views.MainWindow">
  // highlight-next-line
  <Button Name="myButton" Content="Click Me" Click="HandleButtonClick" />
</Window>
```

The above example adds a handler called `HandleButtonClick` to a `Button`'s `Click` event.

## Using Commands

Commands in Avalonia provide a higher-level approach to handling user interactions, decoupling the user action from the implementation logic. Whereas events are defined in a control's code-behind, commands are usually bound to a property or method on the [data context](../data/data-binding/data-context.md).

:::info
Commands are available in all controls which provide a `Command` property. The command is usually triggered when the control's primary method of interaction occurs, for example a button click.
:::

The simplest way of using commands is to bind to a method in the object's data context.

1. **Add a method to the view model**: Define a method in a view model which will handle the command.

    ```csharp
    public class MainWindowViewModel
    {
        // highlight-start
        public bool HandleButtonClick()
        {
            // Event handling logic here
        }
        // highlight-end
    }
    ```

2. **Bind the Method**: Associate the method with the control that triggers it.

    ```xml
    <Button Content="Click Me" Command="{Binding HandleButtonClick}" />
    ```
