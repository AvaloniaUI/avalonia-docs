---
id: adding-interactivity
title: Adding interactivity
doc-type: how-to
description: Add interactive elements to your app with events and commands.
---

This guide introduces events and commands with simple examples. Events and commands enable interactivity in your applications, ensuring users can click, type, select, etc. through the user interface.

## Handling events

Events in Avalonia provide a way to respond to user interactions and control-specific actions. To handle an event:

1. **Implement the event handler:** Write an event handler in the [code-behind](/docs/fundamentals/code-behind). The handler is executed when the event triggers. It should contain the logic you want to execute in response to the event.

2. **Subscribe to the event:** Identify the event you want to handle in your control. Most controls in Avalonia expose events, such as `Click` or `SelectionChanged`. Subscribe to the event in XAML by adding an attribute with the name of the event and setting its value to the name of the event handler method.

The example below adds a handler called `HandleButtonClick` to the `Click` event of a button.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
    <Button Name="myButton"
            Content="Click me"
            Margin="20"
            Click="HandleButtonClick" />
</UserControl>
```

```csharp
using Avalonia.Controls;
using Avalonia.Interactivity;

public partial class MyButton : UserControl
{
    private void HandleButtonClick(object? sender, RoutedEventArgs e)
    {
        if (sender is Button button)
        {
            button.Content = "Clicked!";
        }
    }
}

```

</XamlPreview>

## Using commands

Commands in Avalonia provide a higher-level approach to handling user interactions, decoupling the user action from the implementation logic. Unlike events, which are defined in a control's code-behind, commands are usually bound to a property or method on the [data context](/docs/data-binding/data-context).

Commands are available in all controls with a `Command` property. The command is usually triggered when the control's primary method of interaction occurs, for example a button click.

### Binding to a method

The simplest way to use a command is to bind to a method in the object's data context.

1. **Add a method to the data context:** Define a method in the data context to handle the command. In MVVM apps, the data context is usually the view model.

2. **Bind the method:** Associate the method with the control that triggers it.

```xml title="XAML"
<Button Content="Save" Command="{Binding Save}" />
```

```csharp title="Data context"
public void Save()
{
    // Save logic
}
```

:::note
If the method has [overloads](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/member-overloading), Avalonia follows a fixed set of rules to pick one. See [Binding directly to a method](/docs/data-binding/binding-to-commands#binding-directly-to-a-method).
:::

### `CommunityToolkit.Mvvm`

Commands can also be defined as `ICommand` objects on the view model. The recommended way to create them is the `[RelayCommand]` attribute from `CommunityToolkit.Mvvm`.

See [Commanding](/docs/input-interaction/commanding) for how to write commands, and [Binding to commands](/docs/data-binding/binding-to-commands) for the binding syntax, including passing data with `CommandParameter`.

```xml title="XAML"
<Button Content="Save" Command="{Binding SaveCommand}" />
```

```csharp title="View model"
public partial class MainViewModel : ObservableObject
{
    [RelayCommand]
    private void Save()
    {
        // Save logic
    }
}
```

## Events vs commands

| &nbsp; | Events | Commands |
|---|---|---|
| Defined in | Code-behind | Data context |
| Testable | Difficult (requires UI) | Easy (plain C# method) |
| Best for | Control-specific actions (drag, resize) | Application logic (save, navigate, delete) |
| MVVM pattern | Not preferred | Preferred |

## See also

- [Commanding](/docs/input-interaction/commanding): Writing commands—`ICommand`, `CanExecute`, and async commands.
- [Binding to commands](/docs/data-binding/binding-to-commands): Binding syntax, method binding, and `CommandParameter`.
- [Routed events](/docs/input-interaction/routed-events): How events travel through the control tree.
- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Key bindings for commands.
