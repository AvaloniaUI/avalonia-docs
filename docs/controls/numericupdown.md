---
id: numericupdown
title: NumericUpDown
---

The `NumericUpDown` is an editable numeric input field.

The control has a up and down button spinner attached, used to increment and decrement the value in the input field. The value can also be incremented or decremented using the arrow keys or the mouse wheel when the control is selected.

### Reference <a href="reference" id="reference"></a>

[NumericUpDown](http://reference.avaloniaui.net/api/Avalonia.Controls/NumericUpDown/)

### Source code <a href="source-code" id="source-code"></a>

[NumericUpDown.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/NumericUpDown/NumericUpDown.cs)

## Examples <a href="examples" id="examples"></a>

### Basic NumericUpDown <a href="basic-numericupdown" id="basic-numericupdown"></a>

The value stored in the `NumericUpDown` is a double.

```markup
<NumericUpDown Value="10" Width="100"/>
```

produces the following output on **Linux**\

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/numericupdown/numericupdown_basic.png" alt="Basic NumericUpDown" />
  </div>

### NumericUpDown with a changed increment and bounds <a href="numericupdown-with-a-changed-increment-and-bounds" id="numericupdown-with-a-changed-increment-and-bounds"></a>

A custom increment/decrement value can be set for the button spinner. The default increment value is set to 1.

```markup
<NumericUpDown Value="0.5" Increment="0.01" Minimum="0" Maximum="1"/>
```

### NumericUpDown without a button spinner <a href="numericupdown-without-a-button-spinner" id="numericupdown-without-a-button-spinner"></a>

```markup
<NumericUpDown Value="42" AllowSpin="False" ShowButtonSpinner="False"/>
```

## Common Properties <a href="common-properties" id="common-properties"></a>

| Property                | Description                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| `Value`                 | The double stored in the `NumericUpDown`                                                              |
| `Increment`             | The increment used by the button spinner, keyboard and mouse wheel                                    |
| `Minimum`               | The minimum allowed `Value`                                                                           |
| `Maximum`               | The maximum allowed `Value`                                                                           |
| `ButtonSpinnerLocation` | Location of the button spinner - Left or Right                                                        |
| `AllowSpin`             | If false incrementing and decrementing using the button spinner, keyboard and mouse wheel is disabled |
| `ShowButtonSpinner`     | Determines whether the button spinner should be shown                                                 |