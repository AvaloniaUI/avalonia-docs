---
id: numericupdown
title: NumericUpDown
description: A control that lets users enter and adjust a numeric value using spinner buttons, keyboard arrows, or the mouse wheel.
doc-type: reference
---

The `NumericUpDown` is an editable numeric input with up and down spinner buttons attached. Non-numeric characters are ignored in the input. You can change the value by clicking the spinner buttons, pressing the keyboard arrow keys, or scrolling the mouse wheel.

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
|---|---|---|
| `Value` | `decimal?` | Gets or sets the current numeric value. |
| `Increment` | `decimal` | The step amount used by the spinner buttons, keyboard arrows, and mouse wheel. Default is `1`. |
| `Minimum` | `decimal?` | The minimum allowed value. |
| `Maximum` | `decimal?` | The maximum allowed value. |
| `FormatString` | `string` | The format string applied to the displayed value. Important when you use a custom increment. |
| `ButtonSpinnerLocation` | `Location` | The position of the spinner buttons: `Left` or `Right` (default). |
| `AllowSpin` | `bool` | Whether incrementing and decrementing via the spinner buttons, keyboard, and mouse wheel is enabled. Default is `true`. |
| `ShowButtonSpinner` | `bool` | Whether the spinner buttons are visible. Default is `true`. |
| `InnerLeftContent` | `object` | Content displayed inside the input area on the left side (for example, a currency symbol). |
| `InnerRightContent` | `object` | Content displayed inside the input area on the right side (for example, a unit label). |

## Examples

This is a basic example with no value limits:

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            Margin="20">
  <TextBlock Margin="0 5">Number of items:</TextBlock>
  <NumericUpDown Value="10" />
</StackPanel>
```

</XamlPreview>

### Custom increment and range

The `Value`, `Minimum`, `Maximum`, and `Increment` properties are nullable decimals, so you can define a custom decimal range and step size when needed.

:::info
Remember to set the `FormatString` property when you use a custom decimal increment and range. Without it, the displayed value may not show the precision you expect.
:::

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            Margin="20">
  <TextBlock Margin="0 5">Opacity:</TextBlock>
  <NumericUpDown Value="0.5" Increment="0.05"
      FormatString="0.00"
      Minimum="0" Maximum="1"/>
</StackPanel>
```

</XamlPreview>

### Hiding the spinner buttons

Set `ShowButtonSpinner` to `False` when you want a plain numeric text box without spinner buttons. You can combine this with `AllowSpin="False"` to also disable keyboard and mouse-wheel changes.

```xml
<NumericUpDown Value="42"
               ShowButtonSpinner="False"
               AllowSpin="False" />
```

### Adding a prefix or suffix

Use `InnerLeftContent` and `InnerRightContent` to display labels such as currency symbols or units inside the input area.

```xml
<NumericUpDown Value="9.99" Increment="0.01" FormatString="0.00">
  <NumericUpDown.InnerLeftContent>
    <TextBlock Text="$" VerticalAlignment="Center" />
  </NumericUpDown.InnerLeftContent>
</NumericUpDown>
```

### Binding to a view model

You can bind `Value`, `Minimum`, and `Maximum` to properties on your view model. Because `Value` is a nullable `decimal`, your view model property should match that type.

```xml
<NumericUpDown Value="{Binding Quantity}"
               Minimum="1" Maximum="{Binding MaxQuantity}" />
```

```csharp
[ObservableProperty]
private decimal? _quantity = 1;

[ObservableProperty]
private decimal? _maxQuantity = 100;
```

## Practical notes

- If the user types a value outside the `Minimum`/`Maximum` range, the control clamps the value to the nearest boundary when it loses focus.
- Setting `Value` to `null` clears the input. This can be useful when you want to represent an "unset" state.
- The `FormatString` property accepts standard .NET numeric format strings. For example, `"C2"` displays the value as currency with two decimal places, and `"P0"` displays it as a percentage with no decimal places.

## See also

- [Slider](slider.md)
- [TextBox](/controls/input/text/textbox)
- [Binding to Controls](/docs/data-binding/binding-to-controls)
- [NumericUpDown API Reference](/api/avalonia/controls/numericupdown)
- [`NumericUpDown.cs` Source on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/NumericUpDown/NumericUpDown.cs)
