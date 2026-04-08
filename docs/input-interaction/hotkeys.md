---
id: keyboard-and-hotkeys
title: Keyboard and hotkeys
description: Learn how to define hotkeys and key bindings in Avalonia using HotKey properties, KeyBindings, KeyGesture, and HotKeyManager for keyboard-driven commands.
doc-type: concept
---

Controls that implement `ICommandSource` have a `HotKey` property that you can set or bind to. When the user presses the hotkey, Avalonia executes the command [bound](/docs/input-interaction/adding-interactivity) to that control.

```xml title="XAML"
<Menu>
    <MenuItem Header="_File">
        <MenuItem x:Name="SaveMenuItem"
                  Header="_Save"
                  Command="{Binding SaveCommand}"
                  HotKey="Ctrl+S"/>
    </MenuItem>
</Menu>
```

You can also use the static methods of the `HotKeyManager` class to set and get hotkeys from code:

```csharp title="C#"
InitializeComponent();
HotKeyManager.SetHotKey(saveMenuItem, new KeyGesture(Key.S, KeyModifiers.Control));
```

## Keys and modifiers

A hotkey must have one [`Key`](/api/avalonia/input/key) and zero or more [`KeyModifiers`](/api/avalonia/input/keymodifiers). When you set a hotkey in XAML using the `HotKey` property, the string is parsed as a [`KeyGesture`](/api/avalonia/input/keygesture). Avalonia uses `Enum.Parse` to parse the key and modifiers, but you can also use common synonyms such as `Ctrl` instead of `Control`, or `Win` instead of `Meta`.

### Gesture string format

A gesture string consists of zero or more modifiers followed by a key name, separated by `+`. For example:

| Gesture string | Meaning |
|---|---|
| `Ctrl+S` | Control (or Cmd on macOS) + S |
| `Ctrl+Shift+N` | Control + Shift + N |
| `F5` | F5 with no modifiers |
| `Alt+Enter` | Alt (or Option on macOS) + Enter |

## Assigning number keys to hotkeys

When you need to bind number keys, use `D0` through `D9` for the main keyboard row, or `NumPad0` through `NumPad9` for the numeric keypad. See the full [`Key`](/api/avalonia/input/key) enumeration for all available values.

You can differentiate between the numpad and the main keyboard by binding the same command to two controls and hiding one:

```xml title="XAML"
<!-- Ctrl+1 on the main keyboard -->
<Button
    Command="{Binding CommandX}"
    Content="[1]"
    HotKey="Ctrl+D1" />

<!-- NumPad1 (hidden, so only the hotkey is active) -->
<Button
    Command="{Binding CommandX}"
    HotKey="NumPad1"
    IsVisible="False" />
```

:::note
Access-key syntax such as `Content="_1"` does not register a hotkey. Use the `HotKey` property or a [`KeyBinding`](/api/avalonia/input/keybinding) instead.
:::

## KeyBindings

`KeyBinding` allows you to define keyboard shortcuts that trigger commands at the control or window level, independent of any specific UI element. This is useful when you want global shortcuts that are not tied to a particular button or menu item.

```xml title="XAML"
<Window.KeyBindings>
    <KeyBinding Gesture="Ctrl+N" Command="{Binding NewCommand}" />
    <KeyBinding Gesture="Ctrl+O" Command="{Binding OpenCommand}" />
    <KeyBinding Gesture="Ctrl+S" Command="{Binding SaveCommand}" />
    <KeyBinding Gesture="Ctrl+Shift+S" Command="{Binding SaveAsCommand}" />
    <KeyBinding Gesture="Delete" Command="{Binding DeleteCommand}" />
</Window.KeyBindings>
```

You can also define `KeyBindings` on any control, scoping the shortcut to that control and its children:

```xml title="XAML"
<ListBox KeyboardNavigation.TabNavigation="Continue">
    <ListBox.KeyBindings>
        <KeyBinding Gesture="Delete" Command="{Binding DeleteSelectedCommand}" />
        <KeyBinding Gesture="F2" Command="{Binding RenameCommand}" />
    </ListBox.KeyBindings>
</ListBox>
```

### Passing parameters

Use the `CommandParameter` property on a `KeyBinding` to pass data to your command handler:

```xml title="XAML"
<Window.KeyBindings>
    <KeyBinding Gesture="Ctrl+1" Command="{Binding SwitchTabCommand}" CommandParameter="0" />
    <KeyBinding Gesture="Ctrl+2" Command="{Binding SwitchTabCommand}" CommandParameter="1" />
</Window.KeyBindings>
```

## Common modifier keys

| Modifier | Windows / Linux | macOS |
|---|---|---|
| `Ctrl` | Ctrl | Cmd |
| `Alt` | Alt | Option |
| `Shift` | Shift | Shift |
| `Meta` | Windows key | Cmd |

:::tip
On macOS, `Ctrl` in a `KeyGesture` is automatically mapped to the Cmd key. This means `Ctrl+S` works as Cmd+S on macOS without any additional configuration.
:::

## Common hotkey patterns

The following example shows typical undo, redo, and find shortcuts:

```xml title="XAML"
<Window.KeyBindings>
    <!-- Undo/Redo -->
    <KeyBinding Gesture="Ctrl+Z" Command="{Binding UndoCommand}" />
    <KeyBinding Gesture="Ctrl+Y" Command="{Binding RedoCommand}" />

    <!-- Find -->
    <KeyBinding Gesture="Ctrl+F" Command="{Binding FindCommand}" />
</Window.KeyBindings>
```

## Reference

* [`HotKeyManager`](/api/avalonia/controls/hotkeymanager)
* [`KeyGesture`](/api/avalonia/input/keygesture)
* [`KeyModifiers`](/api/avalonia/input/keymodifiers)
* [`Key`](/api/avalonia/input/key)

## Source code

* [HotkeyManager.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/HotkeyManager.cs)
* [KeyGesture.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Input/KeyGesture.cs)

## See also

- [Focus](/docs/input-interaction/focus): Focus management and keyboard navigation.
- [Commanding](/docs/input-interaction/commanding): `ICommand` interface and command binding.
- [Adding interactivity](/docs/input-interaction/adding-interactivity): Events and commands overview.
- [Mouse and keyboard shortcuts](/docs/input-interaction/mouse-and-keyboard-shortcuts): Additional keyboard and mouse gesture handling.
