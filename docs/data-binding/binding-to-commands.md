---
id: binding-to-commands
title: Binding to commands
description: Bind UI controls to commands to handle user actions, using the MVVM pattern.
doc-type: explanation
---

Commands connect user interactions to logic in your code. This page covers how a binding reaches a command: the binding syntax, how a `Command` binding resolves a method, and how `CommandParameter` behaves.

For how to write the commands themselves—the `ICommand` interface, `CanExecute`, async commands, and keyboard shortcuts—see [Commanding](/docs/input-interaction/commanding).

## Binding with `ICommand`

Any control that implements `ICommandSource` (such as `Button`, `MenuItem` or `ToggleButton`) has a `Command` property, which you can use in the view model.

The example below uses the `[RelayCommand]` attribute from `CommunityToolkit.Mvvm` to generate a `SaveCommand` property of type `IRelayCommand`.

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

:::note
The naming convention for commands is to append "Command" to the method name e.g., `SaveCommand`, `UndoCommand`.
:::

## Binding directly to a method

As an alternative to `ICommand`, you can bind the `Command` property directly to a method in the data context.

```xml title="XAML"
<Button Content="Save" Command="{Binding Save}" />
```

```csharp title="Data context"
public void Save()
{
    // Save logic
}
```

### How the overload is chosen

If you [overload a method](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/member-overloading), Avalonia resolves the overload using the following rules:

| Same-name methods | Result |
|---|---|
| One overload taking one parameter | Chosen, whatever the parameter type |
| Two or more one-parameter overloads, one taking `object` | `object` overload is chosen |
| Two or more one-parameter overloads, none taking `object` | Error |
| One overload with no parameters | Chosen |
| Two or more overloads taking more than one parameter | Error |

Overloads taking two or more parameters are always ignored.

:::caution
Compiled bindings do not convert `CommandParameter` to the parameter type. If the types do not match, the cast throws an exception when the command runs. Reflection bindings do convert the value.
:::

### Enabled state

To determine the enabled state on the bound control when you use method binding, add a `bool` method with a name in the format of `Can` followed by the bound method:

```csharp
public void Save()
{
    // Save logic
}

public bool CanSave(object? parameter) => !string.IsNullOrWhiteSpace(Name);
```

:::note
This convention applies to method binding only. With `ICommand`, the control uses the command's own `CanExecute` instead. See [Commanding](/docs/input-interaction/commanding#icommand-interface) to learn more about `CanExecute`.
:::

## Command parameter

Pass data from the UI to the command using `CommandParameter`. In this example, the view model receives the parameter to delete an item.

```xml title="XAML"
<ListBox ItemsSource="{Binding Items}">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="8">
                <TextBlock Text="{Binding Name}" />
                <Button Content="Delete"
                        Command="{Binding $parent[ListBox].DataContext.DeleteCommand}"
                        CommandParameter="{Binding}" />
            </StackPanel>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

```csharp title="Data context"
[RelayCommand]
private void Delete(Item item)
{
    Items.Remove(item);
}
```

## Binding commands from a different data context

When the command is on a parent view model, but the binding occurs inside a template:

```xml
<!-- Using $parent to reach an ancestor's DataContext -->
<Button Command="{Binding $parent[Window].DataContext.DeleteCommand}"
        CommandParameter="{Binding}" />

<!-- Using a named ancestor -->
<Button Command="{Binding #Root.((vm:MainViewModel)DataContext).DeleteCommand}"
        CommandParameter="{Binding}" />
```

See [`DataContext` type inference](/docs/data-binding/compiled-bindings#datacontext-type-inference) for more information.

## See also

- [Commanding](/docs/input-interaction/commanding): Writing commands—`ICommand`, `CanExecute`, async commands, and manual implementations.
- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Hotkey and keybinding setup.
- [How to bind CanExecute](/docs/data-binding/how-to-bind-can-execute): Worked example of a button enabled by `CanExecute`.
- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): Binding paths, modes, and converters.
- [Binding debugging](/docs/data-binding/binding-debugging#method-binding-overload-not-resolved): Diagnosing method binding failures.
- [Adding interactivity](/docs/input-interaction/adding-interactivity): Choosing between events and commands.
