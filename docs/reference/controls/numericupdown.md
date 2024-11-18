---
title: NumericUpDown
description: REFERENCE - Built-in Controls
---

import NumericUpDownBasicScreenshot from '/img/reference/controls/numericupdown/numericupdown-basic.gif';
import NumericUpDownFormatStringScreenshot from '/img/reference/controls/numericupdown/numericupdown-format-string.gif';

# NumericUpDown

The `NumericUpDown` is an editable numeric input with up and down spinner buttons attached. Non-numeric characters are ignored in the input. The value can also be changed by clicking the buttons, or by using the keyboard arrow keys. The mouse wheel (if present) will also change the value.

## Useful Properties

You will probably use these properties most often:

| Property                | Description                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `Value`                 | The value (decimal?).                                                                                                         |
| `Increment`             | The increment used by the button spinner, keyboard and mouse wheel. Default increment is 1.                                 |
| `Minimum`               | The minimum value allowed.                                                                                                  |
| `Maximum`               | The maximum value allowed.                                                                                                  |
| `FormatString`          | The format string for the numerical value. This is important if you are setting a custom increment.                         |
| `ButtonSpinnerLocation` | The location of the spinner buttons. Choose from left and right (default).                                                  |
| `AllowSpin`             | Determines if incrementing and decrementing using the spinner buttons, keyboard and mouse wheel is active. Default is true. |
| `ShowButtonSpinner`     | Determines whether the spinner buttons are shown. Default is true.                                                          |

## Examples

This is a basic example of a numeric up-down control. There are no limits to the value here:

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">Number of items:</TextBlock>
  <NumericUpDown Value="10" />
</StackPanel>
```

<img src={NumericUpDownBasicScreenshot} alt="" />

The value and other properties are nullable decimals; so you can create a custom decimal increment/decrement and range if you need to.

:::info
Remember to specify a `FormatString` property when you create a custom decimal increment and range.
:::

For example:

```xml
<StackPanel Margin="20">  
  <TextBlock Margin="0 5">Opacity:</TextBlock>
  <NumericUpDown Value="0.5" Increment="0.05" 
      FormatString="0.00"
      Minimum="0" Maximum="1"/>
</StackPanel>
```

<img src={NumericUpDownFormatStringScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/NumericUpDown/).
:::

:::info
View the source code on _GitHub_ [`NumericUpDown.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/NumericUpDown/NumericUpDown.cs)
:::
