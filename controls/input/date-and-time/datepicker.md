---
id: datepicker
title: DatePicker
---

import DatePickerScreenshot from '/img/controls/datepicker/datepicker.gif';

The `DatePicker` has three 'spinner' controls to allow the user to pick a date value. The spinners display when the control is clicked.

## Useful properties

You will probably use these properties most often:

| Property | Description |
|---|---|
| `SelectedDate` | The date selected (null when no selection). |
| `DayVisible` | Sets if the day column is visible. |
| `MonthVisible` | Sets if the month column is visible. |
| `YearVisible` | Sets if the year column is visible. |
| `DayFormat` | Format string for the day part of the date. |
| `MonthFormat` | Format string for the month part of the date. |
| `YearFormat` | Format string for the year part of the date. |
| `MinYear` | The minimum selectable year. |
| `MaxYear` | The maximum selectable year. |

## Example

This example uses the date format attribute to display the name of the day as well as the number:

```xml
<StackPanel Margin="20">
  <DatePicker DayFormat="ddd dd"/>
</StackPanel>
```

<img src={DatePickerScreenshot} alt="" />

## Hiding Date Parts

Show only the date components you need:

```xml
<!-- Month and year only -->
<DatePicker DayVisible="False" />

<!-- Year only -->
<DatePicker DayVisible="False" MonthVisible="False" />
```

## Initializing the Date

The date properties of this control cannot be set in XAML using an attribute. This is because there is no conversion available for converting strings to date objects like `DateTime` and `DateTimeOffset`.

You will need to write code-behind like this:

```csharp
datePicker.SelectedDate = new DateTimeOffset(new DateTime(1950, 1, 1));
```

Or bind to a view model property:

```csharp
[ObservableProperty]
private DateTimeOffset? _selectedDate;
```

```xml
<DatePicker SelectedDate="{Binding SelectedDate}" />
```

## See also

- [DatePicker API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_DatePicker)
- [`DatePicker.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/DateTimePickers/DatePicker.cs)
