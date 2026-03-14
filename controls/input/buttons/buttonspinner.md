---
id: buttonspinner
title: ButtonSpinner
description: A content control with increment and decrement spinner buttons for cycling through values.
doc-type: reference
---

The [`ButtonSpinner`](/api/avalonia/controls/buttonspinner) presents a control that includes buttons for spin-up and spin-down. The content of this button is flexible, but you will have to code quite a lot of the behavior.

## When to use `ButtonSpinner`

Use `ButtonSpinner` when you need full control over the spin behavior, such as cycling through a list of non-numeric values or applying custom logic on each increment or decrement. Because the control does not include built-in value handling, you are responsible for updating the displayed content in response to spin events.

For standard numeric input with built-in validation and formatting, consider using [`NumericUpDown`](/controls/input/selectors/numericupdown) instead.

## Useful properties

You will probably use these properties most often:

| Property | Description |
|---|---|
| `ButtonSpinnerLocation` | Location of the spinner buttons: `Left` or `Right` (default). |
| `ValidSpinDirection` | Limits spin direction: `Increase`, `Decrease`, or `None`. |
| `AllowSpin` | Whether spinning is enabled. Default is `true`. |

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

## Using with MVVM

You can bind the `Spin` event to a command in your view model. Place your display content inside the `ButtonSpinner` and bind it to a property on the view model.

```xml
<ButtonSpinner Spin="{Binding SpinCommand}">
    <TextBlock Text="{Binding CurrentValue}" />
</ButtonSpinner>
```

```csharp
public partial class MyViewModel : ObservableObject
{
    [ObservableProperty]
    private string _currentValue = "0";

    [RelayCommand]
    private void Spin(SpinEventArgs args)
    {
        var value = int.Parse(CurrentValue);

        if (args.Direction == SpinDirection.Increase)
            value++;
        else
            value--;

        CurrentValue = value.ToString();
    }
}
```

## See also

- [ButtonSpinner API reference](/api/avalonia/controls/buttonspinner)
- [`ButtonSpinner.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ButtonSpinner.cs)
- [`NumericUpDown`](/controls/input/selectors/numericupdown)
- [`Button`](/controls/input/buttons/button)
