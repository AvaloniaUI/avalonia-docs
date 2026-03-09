---
id: commanding
title: Commanding
---

Commanding connects user actions (button clicks, menu selections, keyboard shortcuts) to logic in your view model. Avalonia uses the standard .NET `ICommand` interface, which enables clean separation between UI and business logic.

## How commanding works

Controls that support commanding (such as `Button` and `MenuItem`) have a `Command` property. When the user activates the control, it calls `ICommand.Execute`. The control also monitors `ICommand.CanExecute` and automatically disables itself when the command cannot execute.

```xml
<Button Content="Save" Command="{Binding SaveCommand}" />
```

When `SaveCommand.CanExecute()` returns `false`, the button appears disabled and cannot be clicked.

## ICommand interface

The `System.Windows.Input.ICommand` interface defines:

```csharp
public interface ICommand
{
    bool CanExecute(object? parameter);
    void Execute(object? parameter);
    event EventHandler? CanExecuteChanged;
}
```

| Member | Purpose |
|---|---|
| `CanExecute` | Returns whether the command can currently run. Controls call this to determine their enabled state. |
| `Execute` | Performs the command action. Controls call this when the user activates them. |
| `CanExecuteChanged` | Raised when the return value of `CanExecute` may have changed. Controls listen to this event to re-query `CanExecute`. |

## Using RelayCommand (CommunityToolkit.Mvvm)

The most common way to create commands is with the `[RelayCommand]` attribute from the CommunityToolkit.Mvvm package:

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

public partial class MainViewModel : ObservableObject
{
    [ObservableProperty]
    private string _name = "";

    [RelayCommand]
    private void Save()
    {
        // Save logic here
    }

    [RelayCommand(CanExecute = nameof(CanDelete))]
    private void Delete()
    {
        // Delete logic here
    }

    private bool CanDelete() => !string.IsNullOrEmpty(Name);
}
```

The source generator creates `SaveCommand` and `DeleteCommand` properties automatically. The `DeleteCommand` re-evaluates `CanDelete()` whenever `CanExecuteChanged` is raised.

```xml
<StackPanel Spacing="8">
    <TextBox Text="{Binding Name}" />
    <Button Content="Save" Command="{Binding SaveCommand}" />
    <Button Content="Delete" Command="{Binding DeleteCommand}" />
</StackPanel>
```

### Async commands

The `[RelayCommand]` attribute also supports async methods. The generated command handles `Task` return types and provides automatic busy state tracking:

```csharp
[RelayCommand]
private async Task LoadDataAsync()
{
    IsLoading = true;
    try
    {
        var data = await _dataService.GetDataAsync();
        Items = new ObservableCollection<Item>(data);
    }
    finally
    {
        IsLoading = false;
    }
}
```

While `LoadDataAsync` is running, `LoadDataCommand.IsRunning` is `true`. You can bind to this for progress indicators.

### Notifying CanExecute

When properties change that affect `CanExecute`, use `[NotifyCanExecuteChangedFor]`:

```csharp
[ObservableProperty]
[NotifyCanExecuteChangedFor(nameof(DeleteCommand))]
private string _name = "";
```

This tells the source generator to raise `DeleteCommand.NotifyCanExecuteChanged()` whenever `Name` changes, which causes bound controls to re-evaluate whether the command can execute.

## CommandParameter

The `CommandParameter` property passes data to the command's `Execute` and `CanExecute` methods:

```xml
<Button Content="Open"
        Command="{Binding OpenCommand}"
        CommandParameter="{Binding SelectedItem}" />
```

```csharp
[RelayCommand]
private void Open(object? parameter)
{
    if (parameter is Item item)
    {
        // Open the item
    }
}
```

With typed parameters using CommunityToolkit.Mvvm:

```csharp
[RelayCommand]
private void Open(Item item)
{
    // The source generator creates OpenCommand as RelayCommand<Item>
}
```

```xml
<Button Content="Open"
        Command="{Binding OpenCommand}"
        CommandParameter="{Binding SelectedItem}" />
```

## Manual ICommand implementation

For scenarios where source generators are not used, create commands manually:

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

    public bool CanExecute(object? parameter) => _canExecute?.Invoke() ?? true;

    public void Execute(object? parameter) => _execute();

    public event EventHandler? CanExecuteChanged;

    public void RaiseCanExecuteChanged()
        => CanExecuteChanged?.Invoke(this, EventArgs.Empty);
}
```

```csharp
public class MainViewModel
{
    public ICommand SaveCommand { get; }

    public MainViewModel()
    {
        SaveCommand = new RelayCommand(
            execute: () => { /* save logic */ },
            canExecute: () => IsModified);
    }
}
```

## Controls that support commanding

| Control | Command property | When it fires |
|---|---|---|
| `Button` | `Command` | On click |
| `MenuItem` | `Command` | On click |
| `ListBox` | `SelectionChangedCommand` | On selection change |
| [`KeyBinding`](/api/avalonia/input/keybinding) | `Command` | On key gesture |
| `ToggleButton` | `Command` | On toggle |
| `SplitButton` | `Command` | On primary button click |

## Keyboard shortcuts and commands

Bind a command to a keyboard shortcut using `KeyBinding`:

```xml
<Window.KeyBindings>
    <KeyBinding Gesture="Ctrl+S" Command="{Binding SaveCommand}" />
    <KeyBinding Gesture="Ctrl+Z" Command="{Binding UndoCommand}" />
    <KeyBinding Gesture="Delete" Command="{Binding DeleteCommand}" />
</Window.KeyBindings>
```

`KeyBinding` evaluates `CanExecute` and only triggers the command when the gesture is pressed and the command is enabled.

## HotKey attached property

For controls, the `HotKey` attached property provides a simpler syntax:

```xml
<Button Content="_Save"
        Command="{Binding SaveCommand}"
        HotKey="Ctrl+S" />
```

The `HotKey` triggers the button's command even when the button does not have focus.

## See also

- [How to Bind CanExecute](/docs/data-binding/how-to-bind-can-execute): Binding patterns for CanExecute.
- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Key bindings and keyboard input.
- [The MVVM Pattern](/docs/fundamentals/the-mvvm-pattern): Architecture for separating UI and logic.
