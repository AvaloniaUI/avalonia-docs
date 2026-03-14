---
id: adding-interactivity
title: Adding Interactivity
---

One of the fundamental things that a user interface must do is interact with the user. In Avalonia, you can add interactivity to your applications by leveraging events and commands. This guide will introduce events and commands with simple examples.

## Handling events

Events in Avalonia provide a way to respond to user interactions and control-specific actions. You can handle events by following these steps:

1. **Implement the Event Handler**: Write an event handler in the [code-behind](/docs/fundamentals/code-behind) that will be executed when the event is triggered. The event handler should contain the logic you want to execute in response to the event.

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

2. **Subscribe to the Event**: Identify the event you want to handle in your control. Most controls in Avalonia expose various events, such as `Click` or `SelectionChanged`. Subscribe to the event in XAML by adding an attribute with the name of the event and setting its value to the name of the event handler method.

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication1.Views.MainWindow">
  // highlight-next-line
  <Button Name="myButton" Content="Click Me" Click="HandleButtonClick" />
</Window>
```

The above example adds a handler called `HandleButtonClick` to a `Button`'s `Click` event.

## Using commands

Commands in Avalonia provide a higher-level approach to handling user interactions, decoupling the user action from the implementation logic. Whereas events are defined in a control's code-behind, commands are usually bound to a property or method on the [data context](/docs/data-binding/data-context).

:::info
Commands are available in all controls which provide a `Command` property. The command is usually triggered when the control's primary method of interaction occurs, for example a button click.
:::

The simplest way of using commands is to bind to a method in the object's data context.

1. **Add a method to the view model**: Define a method in a view model which will handle the command.

```csharp title='C#'
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

    ```xml title='XAML'
    <Button Content="Click Me" Command="{Binding HandleButtonClick}" />
    ```

## Commands with CommunityToolkit.Mvvm

The recommended approach for commands is the `[RelayCommand]` attribute from CommunityToolkit.Mvvm:

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

public partial class MainViewModel : ObservableObject
{
    [RelayCommand]
    private void Save()
    {
        // Generates a SaveCommand property
    }

    [RelayCommand]
    private async Task LoadAsync()
    {
        // Generates a LoadCommand with automatic busy state
    }
}
```

```xml
<Button Content="Save" Command="{Binding SaveCommand}" />
<Button Content="Load" Command="{Binding LoadCommand}" />
```

## Command with parameter

Pass data to a command using `CommandParameter`:

```xml
<Button Content="Delete"
        Command="{Binding DeleteCommand}"
        CommandParameter="{Binding SelectedItem}" />
```

```csharp
[RelayCommand]
private void Delete(Item item)
{
    Items.Remove(item);
}
```

## Events vs commands

| Feature | Events | Commands |
|---|---|---|
| Defined in | Code-behind | View model |
| Testable | Difficult (requires UI) | Easy (plain C# method) |
| Best for | UI-specific actions (drag, resize) | Application logic (save, navigate, delete) |
| MVVM pattern | Not preferred | Preferred |

Use events for UI-specific behavior (animations, visual feedback). Use commands for application logic that should be testable and decoupled from the view.

## See also

- [Binding to Commands](/docs/data-binding/binding-to-commands): Full command binding reference.
- [Commanding](/docs/input-interaction/commanding): ICommand interface details.
- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Key bindings for commands.
