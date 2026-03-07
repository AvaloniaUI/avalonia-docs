---
id: binding-to-commands
title: Binding to commands
description: Bind UI controls to ICommand implementations for handling user actions in the MVVM pattern.
doc-type: explanation
---

Commands provide a clean way to connect user interactions (button clicks, menu selections, keyboard shortcuts) to logic in your view model. This page covers binding controls to commands using `ICommand`.

## Basic command binding

Any control that implements `ICommandSource` (such as `Button`, `MenuItem`, and `ToggleButton`) has a `Command` property:

```xml
<Button Content="Save" Command="{Binding SaveCommand}" />
```

The view model exposes a command property:

```csharp
public partial class MainViewModel : ObservableObject
{
    [RelayCommand]
    private void Save()
    {
        // Save logic
    }
}
```

The `[RelayCommand]` attribute from CommunityToolkit.Mvvm generates a `SaveCommand` property of type `IRelayCommand`. The naming convention appends "Command" to the method name.

## CommandParameter

Pass data from the UI to the command using `CommandParameter`:

```xml
<ListBox ItemsSource="{Binding Items}">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="8">
                <TextBlock Text="{Binding Name}" />
                <Button Content="Delete"
                        Command="{Binding $parent[ListBox].((vm:MainViewModel)DataContext).DeleteCommand}"
                        CommandParameter="{Binding}" />
            </StackPanel>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

The view model receives the parameter:

```csharp
[RelayCommand]
private void Delete(Item item)
{
    Items.Remove(item);
}
```

## CanExecute

Commands can conditionally enable or disable the bound control. When `CanExecute` returns `false`, the control is automatically disabled.

### With CommunityToolkit.Mvvm

Use the `[RelayCommand(CanExecute = ...)]` attribute to specify a `CanExecute` method:

```csharp
[ObservableProperty]
[NotifyCanExecuteChangedFor(nameof(SaveCommand))]
private string _name = "";

[RelayCommand(CanExecute = nameof(CanSave))]
private void Save()
{
    // Save logic
}

private bool CanSave() => !string.IsNullOrWhiteSpace(Name);
```

The `[NotifyCanExecuteChangedFor]` attribute ensures the `SaveCommand` re-evaluates its `CanExecute` whenever `Name` changes.

### Manual ICommand implementation

```csharp
public class RelayCommand : ICommand
{
    private readonly Action _execute;
    private readonly Func<bool>? _canExecute;

    public RelayCommand(Action execute, Func<bool>? canExecute = null)
    {
        _execute = execute;
        _canExecute = canExecute;
    }

    public event EventHandler? CanExecuteChanged;

    public bool CanExecute(object? parameter) => _canExecute?.Invoke() ?? true;
    public void Execute(object? parameter) => _execute();

    public void RaiseCanExecuteChanged()
        => CanExecuteChanged?.Invoke(this, EventArgs.Empty);
}
```

## Async commands

Long-running operations should use async commands to avoid blocking the UI thread:

```csharp
[RelayCommand]
private async Task SaveAsync(CancellationToken token)
{
    await _repository.SaveAsync(token);
}
```

CommunityToolkit.Mvvm generates a `SaveCommand` of type `IAsyncRelayCommand`, which:
- Executes the method asynchronously
- Disables the control while the command is running (prevents double-clicks)
- Provides a `CancellationToken` parameter for cancellation support
- Exposes an `IsRunning` property for showing progress indicators

```xml
<Button Content="Save" Command="{Binding SaveCommand}" />
<ProgressBar IsVisible="{Binding SaveCommand.IsRunning}" IsIndeterminate="True" />
```

## Keyboard shortcuts

Bind commands to keyboard shortcuts using `HotKey` or `KeyBinding`:

```xml
<!-- HotKey on a Button -->
<Button Content="_Save"
        Command="{Binding SaveCommand}"
        HotKey="Ctrl+S" />

<!-- KeyBinding on a window or control -->
<Window.KeyBindings>
    <KeyBinding Gesture="Ctrl+Z" Command="{Binding UndoCommand}" />
    <KeyBinding Gesture="Ctrl+Shift+Z" Command="{Binding RedoCommand}" />
</Window.KeyBindings>
```

The underscore in `Content="_Save"` creates an access key (Alt+S on Windows/Linux).

## Controls that support commands

| Control | Command Property | When Invoked |
|---|---|---|
| `Button` | `Command` | Click |
| `MenuItem` | `Command` | Click |
| `ToggleButton` | `Command` | Toggle |
| `RadioButton` | `Command` | Selection change |
| `HyperlinkButton` | `Command` | Click |
| `SplitButton` | `Command` | Primary click |

## Binding commands from a different DataContext

When the command is on a parent view model but the binding occurs inside a template:

```xml
<!-- Using $parent to reach an ancestor's DataContext -->
<Button Command="{Binding $parent[Window].DataContext.DeleteCommand}"
        CommandParameter="{Binding}" />

<!-- Using a named ancestor -->
<Button Command="{Binding #Root.((vm:MainViewModel)DataContext).DeleteCommand}"
        CommandParameter="{Binding}" />
```

With compiled bindings, cast the DataContext explicitly using the `((Type)expression)` syntax.

## See also

- [Commanding](/docs/input-interaction/commanding): Full commanding reference including manual ICommand patterns.
- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Hotkey and keybinding setup.
- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): Binding paths, modes, and converters.
