---
id: button
title: Button
---

import ButtonClickScreenshot from '/img/controls/buttons/button/button-click.gif';

The `Button` control reacts to pointer actions and provides visual feedback in the form of a depressed state when the pointer is down. A pointer-down to pointer-release sequence is interpreted as a click, and this behaviour is configurable through the `ClickMode` property.

You can handle a click by subscribing to the `Click` event in code-behind, or by binding an `ICommand` instance to the `Command` property. For guidance on binding to a command, see [Adding interactivity](/docs/input-interaction/adding-interactivity).

## Useful properties

| Property           | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| `ClickMode`        | Describes how the button should react to clicks.                    |
| `Command`          | An instance of `ICommand` to be invoked when the button is clicked. |
| `CommandParameter` | The parameter passed into the command upon invocation.              |

## Example

This example shows a simple button and a C# code-behind click event handler.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             Padding="20">
  <Button Click="OnClick"
          HorizontalAlignment="Center"
          VerticalAlignment="Center">
    Press Me!
  </Button>
</UserControl>
```

```csharp
public partial class MainView : UserControl
{
    private int _clickCount = 0;

    public void OnClick(object sender, RoutedEventArgs args)
    {
        var btn = (Button)sender;
        btn.Content = $"Clicked: {++_clickCount} times";
    }
}
```

</XamlPreview>

## Click vs. PointerPressed

Always use the `Click` event to determine whether a user has pressed a button, not `PointerPressed`. `Click` is the high-level event specific to `Button`, while `PointerPressed` is a low-level input event that `Button` handles internally (setting `IsHandled` to `true`). Because the event is marked as handled, your application will not receive `PointerPressed` from a `Button` the way it might from other controls.

For a full list of button events, see the [Button events API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Button#events).

## See also

- [Button API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Button)
- [`Button.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Button.cs)
