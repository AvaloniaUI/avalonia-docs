---
id: calendardatepicker
title: CalendarDatePicker
---

import CalendarDatePickerScreenshot from '/img/gitbook-import/assets/calendardatepicker.gif';

This is an extension of the calendar control that includes a text box and button. The calendar shows when the user clicks the button (and hides on a subsequent click). The selected date shows in the text box when a date on the calendar is clicked.

The user can also enter a date by typing in the text box. The date picker is able to process multiple date formats into the format that is displayed as a watermark when there is no selected date.

:::info
For details on the calendar part of this control, see the [Calendar](/controls/input/date-and-time/calendar) control.
:::

## Example

This example shows a basic single date selection calendar when the button is clicked:

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             Padding="20">
  <StackPanel Margin="20">
    <CalendarDatePicker />
  </StackPanel>
</UserControl>
```

</XamlPreview>

## See also

- [CalendarDatePicker API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_CalendarDatePicker)
- [`CalendarDatePicker.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/CalendarDatePicker/CalendarDatePicker.cs)

