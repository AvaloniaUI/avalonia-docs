---
id: calendardatepicker
title: CalendarDatePicker
---

The `CalendarDatePicker` control allows the user to pick a date value using a calendar. It's similar to [DatePicker](datepicker.md), except it displays a calendar instead of combo boxes.

## Examples

### Custom placeholder

The placeholder (the text that appears when the input is empty) can be changed using the `Watermark` property.

```xml
<CalendarDatePicker
	Watermark="01/01/1970" />
```

### Custom date format

The format of the date displayed can be customised by setting the `SelectedDateFormat` to `Custom` and providing a custom format in `CustomDateFormatString` in the same way `DateTime.ToString(string format)` accepts.

```xml
<CalendarDatePicker 
	SelectedDateFormat="Custom"
	CustomDateFormatString="yyyy-MM-dd" />
```

This code will display the selected date in ISO 8601 format (year, month and day, separated by hyphens).

**Remarks**: Updating the date format won't change the displayed placeholder. That must be [customised manually](#custom-placeholder).

## Reference 

[CalendarDatePicker](https://reference.avaloniaui.net/api/Avalonia.Controls/CalendarDatePicker/)


## Source code

[CalendarDatePicker.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/CalendarDatePicker/CalendarDatePicker.cs)