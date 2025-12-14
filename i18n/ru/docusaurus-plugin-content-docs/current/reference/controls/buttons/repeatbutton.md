---
description: REFERENCE - Built-in Controls
---

# Repeat Button

The repeat button is a control that has the added feature of regularly generating click events while the button is being pressed down.

## Useful Properties

You will probably use these properties most often:

| Property | Description                                                                              |
| -------- | ---------------------------------------------------------------------------------------- |
| Delay    | The time (milliseconds) to wait before repeated click generation begins. Default is 300. |
| Interval | The time (milliseconds) between clicks being generated. Default is 100.                  |

## Example

This example shows a repeat button generating click events with the default interval and delay.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             Padding="20">
  <RepeatButton Click="OnClick"
                HorizontalAlignment="Center"
                VerticalAlignment="Center">
    Press and hold down
  </RepeatButton>
</UserControl>
```

```csharp
public partial class MainView : UserControl
{
    private int _clickCount = 0;

    public void OnClick(object sender, RoutedEventArgs args)
    {
        var btn = (RepeatButton)sender;
        btn.Content = $"Clicked: {++_clickCount} times";
    }
}
```

</XamlPreview>

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_RepeatButton).
:::

:::info
View the source code on _GitHub_ [`RepeatButton.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/RepeatButton.cs)
:::
