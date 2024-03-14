---
id: numericupdown
title: NumericUpDown
---

import NumericUpDownBasicScreenshot from '/img/controls/numericupdown/numericupdown_basic.png';

The `NumericUpDown` is an editable numeric input field.

The control has a up and down button spinner attached, used to increment and decrement the value in the input field. The value can also be incremented or decremented using the arrow keys or the mouse wheel when the control is selected.

### Reference

[NumericUpDown](http://reference.avaloniaui.net/api/Avalonia.Controls/NumericUpDown/)

### Source code

[NumericUpDown.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/NumericUpDown/NumericUpDown.cs)

## Examples

### Basic NumericUpDown

The value stored in the `NumericUpDown` is a double.

```xml
<NumericUpDown Value="10" Width="100"/>
```

produces the following output on **Linux**

<img className="center" src={NumericUpDownBasicScreenshot} alt="Basic NumericUpDown" />

### NumericUpDown with a changed increment and bounds

A custom increment/decrement value can be set for the button spinner. The default increment value is set to 1.

```xml
<NumericUpDown Value="0.5" Increment="0.01" Minimum="0" Maximum="1"/>
```

### NumericUpDown without a button spinner

```xml
<NumericUpDown Value="42" AllowSpin="False" ShowButtonSpinner="False"/>
```

## Common Properties

| Property                | Description                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| `Value`                 | The double stored in the `NumericUpDown`                                                              |
| `Increment`             | The increment used by the button spinner, keyboard and mouse wheel                                    |
| `Minimum`               | The minimum allowed `Value`                                                                           |
| `Maximum`               | The maximum allowed `Value`                                                                           |
| `ButtonSpinnerLocation` | Location of the button spinner - Left or Right                                                        |
| `AllowSpin`             | If false incrementing and decrementing using the button spinner, keyboard and mouse wheel is disabled |
| `ShowButtonSpinner`     | Determines whether the button spinner should be shown                                                 |