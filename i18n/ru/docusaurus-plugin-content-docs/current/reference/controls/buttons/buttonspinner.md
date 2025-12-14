---
description: REFERENCE - Built-in Controls
---

# Button Spinner

The button spinner presents a control that includes buttons for spin-up and spin-down. The content of this button is flexible, but you will have to code quite a lot of the behavior.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="261">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>ButtonSpinnerLocation</code></td><td>Location of the spinner buttons: left or right.</td></tr><tr><td><code>ValidSpinDirection</code></td><td>Used to limit spin direction: increase, decrease or none. </td></tr></tbody></table>

## Example

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             Padding="20">
  <ButtonSpinner Spin="OnSpin"
                 HorizontalAlignment="Center"
                 VerticalAlignment="Center">
    Press the spinner
  </ButtonSpinner>
</UserControl>
```

```csharp
public partial class MainView : UserControl
{
    private int _currentValue = 0;

    public void OnSpin(object sender, SpinEventArgs args)
    {
        if (args.Direction == SpinDirection.Increase)
            _currentValue++;
        else
            _currentValue--;

        var btn = (ButtonSpinner)sender;
        btn.Content = $"Value: {_currentValue}";
    }
}
```

</XamlPreview>

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_ButtonSpinner).
:::

:::info
View the source code on _GitHub_ [`ButtonSpinner.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ButtonSpinner.cs)
:::
