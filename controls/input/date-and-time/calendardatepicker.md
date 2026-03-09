---
id: calendardatepicker
title: CalendarDatePicker
description: A dropdown calendar control with a text box that lets users select or type a date.
doc-type: reference
---

import CalendarDatePickerScreenshot from '/img/gitbook-import/assets/calendardatepicker.gif';

The `CalendarDatePicker` combines a text box and a dropdown button that reveals a full calendar. When you click the button, the calendar opens so you can pick a date visually. Clicking the button again (or selecting a date) closes the calendar and populates the text box with your selection.

You can also type a date directly into the text box. The control accepts multiple date formats and normalizes them to the format shown as placeholder text when no date is selected.

:::info
For details on the calendar portion of this control, see the [Calendar](/controls/input/date-and-time/calendar) reference.
:::

## Common properties

You will probably use these properties most often:

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

## Binding to a view model

```xml title="XAML"
<CalendarDatePicker SelectedDate="{Binding BirthDate}"
                    PlaceholderText="Select date of birth"
                    DisplayDateEnd="{Binding Today}" />
```

```csharp title="C#"
[ObservableProperty]
private DateTimeOffset? _birthDate;

public DateTimeOffset Today { get; } = DateTimeOffset.Now;
```

## Date range restriction

You can limit the selectable date range with `DisplayDateStart` and `DisplayDateEnd`:

```xml title="XAML"
<CalendarDatePicker SelectedDate="{Binding CheckInDate}"
                    DisplayDateStart="2024-01-01"
                    DisplayDateEnd="2025-12-31"
                    PlaceholderText="Check-in date" />
```

## Practical notes

- **Typed input**: When a user types a date that falls outside the `DisplayDateStart`/`DisplayDateEnd` range, the control rejects the value and clears the text box.
- **Null handling**: Bind `SelectedDate` to a nullable `DateTimeOffset?` property so the control can represent "no selection."
- **Format customization**: Set `SelectedDateFormat` to `CalendarDatePickerFormat.Custom` and provide a `CustomDateFormatString` (for example, `"yyyy-MM-dd"`) to control how the selected date appears in the text box.
- **Keyboard support**: Users can open the dropdown with `Alt+Down` and close it with `Escape`.

## Example

This example shows a basic single-date-selection calendar when you click the button:

<XamlPreview>

```xml title="XAML"
<UserControl xmlns="https://github.com/avaloniaui"
             Padding="20">
  <StackPanel Margin="20">
    <CalendarDatePicker />
  </StackPanel>
</UserControl>
```

</XamlPreview>

## See also

- [Calendar](/controls/input/date-and-time/calendar)
- [DatePicker](/controls/input/date-and-time/datepicker)
- [TimePicker](/controls/input/date-and-time/timepicker)
- [CalendarDatePicker API reference](/api/avalonia/controls/calendardatepicker)
- [`CalendarDatePicker.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/CalendarDatePicker/CalendarDatePicker.cs)
