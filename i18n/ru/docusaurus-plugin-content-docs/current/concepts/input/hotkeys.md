---
description: CONCEPTS - Input
---

# Keyboard and Hotkeys

Various Controls that implement `ICommandSource` have a `HotKey` property that you can set or bind to. Pressing the hotkey will execute the command [bound](../../basics/user-interface/adding-interactivity#commands) to the Control.

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

## Keys and Modifiers

A Hotkey must have one [Key](http://reference.avaloniaui.net/api/Avalonia.Input/Key/) and zero or more [KeyModifiers](http://reference.avaloniaui.net/api/Avalonia.Input/KeyModifiers/). When setting a Hotkey in XAML using the `HotKey` property, the string will be parsed as a [KeyGesture](http://reference.avaloniaui.net/api/Avalonia.Input/KeyGesture/). [Enum.Parse](https://docs.microsoft.com/en-us/dotnet/api/system.enum.parse) is used to parse the key and modifiers but synonyms like `Ctrl` instead of `Control` or `Win` instead of `Meta` can be used.

### Reference

* [HotKeyManager](http://reference.avaloniaui.net/api/Avalonia.Controls/HotKeyManager/)
* [KeyGesture](http://reference.avaloniaui.net/api/Avalonia.Input/KeyGesture/)
* [KeyModifiers](http://reference.avaloniaui.net/api/Avalonia.Input/KeyModifiers/)
* [Key](http://reference.avaloniaui.net/api/Avalonia.Input/Key/)

### Source code

* [HotkeyManager.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/HotkeyManager.cs)
* [KeyGesture.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Input/KeyGesture.cs)
