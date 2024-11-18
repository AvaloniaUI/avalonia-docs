---
description: REFERENCE - Built-in Controls
---

import ButtonClickScreenshot from '/img/reference/controls/buttons/button-click.gif';

# Button

The button is a control that reacts to pointer actions (and has some keyboard equivalents). It presents visual feedback in the form of a depressed state when the pointer is down.

A pointer-down to pointer release sequence is interpreted as a click; and this behaviour is configurable.

:::warning
When determining if a button is pressed by the user, always use the `Click` event instead of `PointerPressed`. `Click` is the high-level event specific to a `Button` that indicates it has been pressed.

`PointerPressed` is more a low-level input event: one that the `Button` needs to handle internally to raise the `Click` event. Since `Button` handles `PointerPressed` (sets `IsHandled` to true), applications will never receive this event as in some other controls.
:::

:::info
Click is one of many button events, for a full list see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Button/#Events).
:::

A button can raise a click event in the code-behind. Alternatively you can bind an instance of `ICommand` to the command property. The bound command will then be executed whenever the button is clicked.

:::info
For guidance on how to bind to a command, see [here](../../../basics/user-interface/adding-interactivity).
:::

## Useful Properties

You will probably use these properties most often:

| Property    | Description                                                         |
| ----------- | ------------------------------------------------------------------- |
| `ClickMode` | Describes how the button should react to clicks.                    |
| `Command`   | An instance of `ICommand` to be invoked when the button is clicked. |

## Example

This example shows a simple button and a C# code-behind click event handler.



```xml
<StackPanel Margin="20">
  <Button Click="ClickHandler">Press Me!</Button>
  <TextBlock Margin="0 10" x:Name="message">Ready...</TextBlock>
</StackPanel>
```


```csharp title='C#'
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    public void ClickHandler(object sender, RoutedEventArgs args)
    {
        message.Text = "Button clicked!";
    }
}
```

<img src={ButtonClickScreenshot} alt=""/>

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Button/).
:::

:::info
View the source code on _GitHub_ [`Button.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Button.cs)
:::
