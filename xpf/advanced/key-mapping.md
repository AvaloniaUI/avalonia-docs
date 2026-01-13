---
id: key-mapping
title: Key Mapping
---

Sometimes inbuilt WPF controls may use keyboard shortcuts which are correct on Windows but feel alien on other operating systems. If you have the source, you could add logic to switch the keyboard shortcuts depending on the operating system, but this is not an option for third-party controls.

To address this issue, XPF offers a key mapping feature which can automatically map keys at runtime. This feature is most commonly needed on macOS but can also be useful on other operating systems.

:::tip
See the [macOS](/xpf/platforms/macos#key-mapping) section for information on this subject relating specifically to macOS.
:::

## Adding a Custom Key Map Handler

```csharp
using System.Windows;
using Atlantis;

namespace XpfKeyboardMappingExample;

/// <summary>
/// Interaction logic for App.xaml
/// </summary>
public partial class App : Application
{
    public App()
    {
        XpfKeyboard.AddMapKeyHandler(OnMapKey);
    }

    private void OnMapKey(object? sender, XpfMapKeyEventArgs e)
    {
    }
}
```

The `OnMapKey` handler will be called for every key press. Its purpose is to map Avalonia key-presses and modifiers to WPF key presses. You can add multiple key map handlers, and they will be called in order of registration.

## Map a Key

The following example maps Alt+Q (Option+Q on macOS) to Ctrl+A ("Select All").

```csharp
private void OnMapKey(object? sender, XpfMapKeyEventArgs e)
{
    // If another handler has already handled this key then do nothing.
    if (e.Handled)
        return;

    // Maps Alt+Q (Option+Q on macOS) to Ctrl+A
    if (e.Modifiers == Avalonia.Input.KeyModifiers.Alt && e.Key == Avalonia.Input.Key.Q)
    {
        e.MappedKey = System.Windows.Input.Key.A;
        e.MappedModifiers = System.Windows.Input.ModifierKeys.Control;
        e.Handled = true;
    }
}
```

## Mapping Modifier Keys

Modifier keys can be mapped in one of two ways:

The first option is to handle the initial modifier key press. An example of this would be receiving `e.Key == System.Windows.Input.Key.LeftCtrl` and setting `e.MappedKey = System.Windows.Input.Key.LeftAlt` in response. In this case, the application will receive a `KeyDown`/`KeyUp` event pair for `LeftAlt`; and `Keyboard.Modifiers` will be set to `Alt` for the duration of the key press. `e.MappedModifiers` does not need to be touched in this case.

The problem with this technique is that often it's not known what the modifier should be mapped to until the second key is pressed. In this case, one should wait for the second key press and set `e.MappedModifiers`. Bear in mind when using this technique that the raised `KeyDown` events will not match the current `Keyboard.Modifiers` value. That is, no "fake" `KeyDown` events will be raised for the modifier key, the mapping will only be reflected by `Keyboard.Modifiers` and `Keyboard.IsKeyDown`.

## Conditional Mapping

The currently focused control will be passed to handlers in the `XpfMapKeyEventArgs.Source` property. This property can be used to conditionally map keys based on the currently focused control.