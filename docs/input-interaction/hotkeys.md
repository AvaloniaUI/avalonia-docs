---
id: keyboard-and-hotkeys
title: Keyboard and hotkeys
---

Controls that implement `ICommandSource` have a `HotKey` property that you can set or bind to. Pressing the hotkey will execute the command [bound](/docs/input-interaction/adding-interactivity) to the Control.

```xml
<Menu>
    <MenuItem Header="_File">
        <MenuItem x:Name="SaveMenuItem" Header="_Save" Command="{Binding SaveCommand}" HotKey="Ctrl+S"/>
    </MenuItem>
</Menu>
```

You can also use the static methods of the `HotKeyManager` class to set and get hotkeys from code:

```csharp
InitializeComponent();
HotKeyManager.SetHotKey(saveMenuItem, new KeyGesture(Key.S, KeyModifiers.Control));
```

## Keys and modifiers

A Hotkey must have one [Key](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_Key) and zero or more [KeyModifiers](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_KeyModifiers). When setting a Hotkey in XAML using the `HotKey` property, the string will be parsed as a [KeyGesture](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_KeyGesture). [Enum.Parse](https://docs.microsoft.com/en-us/dotnet/api/system.enum.parse) is used to parse the key and modifiers but synonyms like `Ctrl` instead of `Control` or `Win` instead of `Meta` can be used.

## Assign number keys to hotkeys
- A Hotkey must use D1..D0 or NumPad1..NumPad0.
  see: [Key](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_Key)
- By binding the same command to two buttons and hiding one button, you can differentiate between a single number on the numpad and a simple Ctrl+number key.
- If you want to limit command malfunctions caused by pressing numbers on the numpad, you can also use [KeyModifiers](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_KeyModifiers).
```xml
<!--  It's worked fine  -->
<!--  e.g. Ctrl+1  -->
<Button
    Command="{Binding CommandX}"
    Content="[1]"
    HotKey="Ctrl+D1" />
<!--  e.g. You can also use Alt+NumPad1  -->
<Button
    Command="{Binding CommandX}"
    HotKey="NumPad1"
    IsVisible="False" />

<!--  These didn't work  -->
<!--  Alt+Number  -->
<Button Command="{Binding CommandX}" Content="_1" />
```
## KeyBindings

`KeyBinding` allows you to define keyboard shortcuts that trigger commands at the control or window level, independent of any specific UI element:

```xml
<Window.KeyBindings>
    <KeyBinding Gesture="Ctrl+N" Command="{Binding NewCommand}" />
    <KeyBinding Gesture="Ctrl+O" Command="{Binding OpenCommand}" />
    <KeyBinding Gesture="Ctrl+S" Command="{Binding SaveCommand}" />
    <KeyBinding Gesture="Ctrl+Shift+S" Command="{Binding SaveAsCommand}" />
    <KeyBinding Gesture="Delete" Command="{Binding DeleteCommand}" />
</Window.KeyBindings>
```

KeyBindings can also be defined on any control:

```xml
<ListBox KeyboardNavigation.TabNavigation="Continue">
    <ListBox.KeyBindings>
        <KeyBinding Gesture="Delete" Command="{Binding DeleteSelectedCommand}" />
        <KeyBinding Gesture="F2" Command="{Binding RenameCommand}" />
    </ListBox.KeyBindings>
</ListBox>
```

## Common modifier keys

| Modifier | Windows/Linux | macOS |
|---|---|---|
| `Ctrl` | Ctrl | Cmd |
| `Alt` | Alt | Option |
| `Shift` | Shift | Shift |
| `Meta` | Windows key | Cmd |

:::tip
On macOS, `Ctrl` in a `KeyGesture` is automatically mapped to the Cmd key. This means `Ctrl+S` works as Cmd+S on macOS without additional configuration.
:::

## Common hotkey patterns

```xml
<!-- Undo/Redo -->
<KeyBinding Gesture="Ctrl+Z" Command="{Binding UndoCommand}" />
<KeyBinding Gesture="Ctrl+Y" Command="{Binding RedoCommand}" />

<!-- Find -->
<KeyBinding Gesture="Ctrl+F" Command="{Binding FindCommand}" />

<!-- With CommandParameter -->
<KeyBinding Gesture="Ctrl+1" Command="{Binding SwitchTabCommand}" CommandParameter="0" />
<KeyBinding Gesture="Ctrl+2" Command="{Binding SwitchTabCommand}" CommandParameter="1" />
```

### Reference

* [HotKeyManager](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_HotKeyManager)
* [KeyGesture](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_KeyGesture)
* [KeyModifiers](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_KeyModifiers)
* [Key](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_Key)

### Source code

* [HotkeyManager.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/HotkeyManager.cs)
* [KeyGesture.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Input/KeyGesture.cs)

## See also

- [Focus](/docs/input-interaction/focus): Focus management and keyboard navigation.
- [Commanding](/docs/input-interaction/commanding): ICommand interface and command binding.
- [Adding Interactivity](/docs/input-interaction/adding-interactivity): Events and commands overview.
