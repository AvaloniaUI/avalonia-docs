---
description: REFERENCE - Built-in Controls
---

import DatePickerScreenshot from '/img/reference/controls/datepicker/datepicker.gif';

# Date Picker

The date picker has three 'spinner' controls to allow the user to pick a date value. The spinners display when the control is clicked.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="219">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>DayVisible</code></td><td>Sets if the day column is visible.</td></tr><tr><td><code>MonthVisible</code></td><td>Sets if the month column is visible.</td></tr><tr><td><code>YearVisible</code></td><td>Sets if the year column is visible.</td></tr><tr><td><code>DayFormat</code></td><td>Format string for the day part of the date.</td></tr><tr><td><code>MonthFormat</code></td><td>Format string for the month part of the date.</td></tr><tr><td><code>YearFormat</code></td><td>Format string for the year part of the date.</td></tr><tr><td><code>SelectedDate</code></td><td>The date selected (null when no selection).</td></tr></tbody></table>

## Example

This example uses the date format attribute to display the name of the day as well as the number:

```xml
<StackPanel Margin="20">
  <DatePicker DayFormat="ddd dd"/>
</StackPanel>
```

<img src={DatePickerScreenshot} alt="" />

## **Initializing the Date**

The date properties of this control cannot be set in XAML using an attribute. This is because there is no conversion available for converting strings to date objects like `DateTime` and `DateTimeOffset`.

You will need to write code-behind like this:

```csharp
datePicker.SelectedDate = new DateTimeOffset(new DateTime(1950, 1, 1));
```

## More Information

For the complete API documentation about this control, see [here](https://reference.avaloniaui.net/api/Avalonia.Controls/DatePicker/).

View the source code on _GitHub_ [`DatePicker.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/DateTimePickers/DatePicker.cs)
