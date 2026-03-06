---
id: calendardatepicker
title: CalendarDatePicker
---

import CalendarDatePickerScreenshot from '/img/gitbook-import/assets/calendardatepicker.gif';

This is an extension of the calendar control that includes a text box and button. The calendar shows when the user clicks the button (and hides on a subsequent click). The selected date shows in the text box when a date on the calendar is clicked.

The user can also enter a date by typing in the text box. The date picker is able to process multiple date formats into the format that is displayed as placeholder text when there is no selected date.

:::info
For details on the calendar part of this control, see the [Calendar](/controls/input/date-and-time/calendar) control.
:::

## Common Properties

| Property | Type | Description |
|---|---|---|
| `SelectedDate` | `DateTimeOffset?` | The currently selected date, or `null` if no date is selected. |
| `DisplayDate` | `DateTime` | The month to display when the calendar opens. |
| `DisplayDateStart` | `DateTime?` | The earliest date that can be selected. |
| `DisplayDateEnd` | `DateTime?` | The latest date that can be selected. |
| `PlaceholderText` | `string` | Placeholder text shown when no date is selected. |
| `PlaceholderForeground` | `IBrush` | The brush used to render the placeholder text. |
| `IsTodayHighlighted` | `bool` | Whether today's date is visually highlighted. Default is `true`. |
| `SelectedDateFormat` | `CalendarDatePickerFormat` | Display format: `Short` or `Long`. |
| `CustomDateFormatString` | `string` | Custom date format string when using a custom format. |
| `IsDropDownOpen` | `bool` | Whether the calendar dropdown is currently open. |

## Binding to a View Model

```xml
<CalendarDatePicker SelectedDate="{Binding BirthDate}"
                    PlaceholderText="Select date of birth"
                    DisplayDateEnd="{Binding Today}" />
```

```csharp
[ObservableProperty]
private DateTimeOffset? _birthDate;

public DateTimeOffset Today { get; } = DateTimeOffset.Now;
```

## Date Range Restriction

Limit the selectable date range:

```xml
<CalendarDatePicker SelectedDate="{Binding CheckInDate}"
                    DisplayDateStart="2024-01-01"
                    DisplayDateEnd="2025-12-31"
                    PlaceholderText="Check-in date" />
```

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

