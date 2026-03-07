---
id: datepicker-how-to
title: "How to: Work with Date and Time Pickers"
description: Bind dates, format display, validate input, and configure date ranges with Avalonia pickers.
doc-type: how-to
---

This guide covers DatePicker, TimePicker, CalendarDatePicker, and Calendar patterns: binding dates, formatting, validation, and date ranges.

## DatePicker Basics

The `DatePicker` uses spinner controls for day, month, and year selection:

```xml
<DatePicker />
```

### Setting an initial date

Date properties must be set in code (not XAML attributes) because there is no built-in string-to-DateTimeOffset converter:

```csharp
myDatePicker.SelectedDate = new DateTimeOffset(new DateTime(2025, 6, 15));
```

Or bind to a view model property:

```csharp
[ObservableProperty]
private DateTimeOffset? _birthDate;
```

```xml
<DatePicker SelectedDate="{Binding BirthDate}" />
```

## Custom Date Formats

Control how each part of the date displays:

```xml
<!-- Show abbreviated day name -->
<DatePicker DayFormat="ddd dd" />

<!-- Show full month name -->
<DatePicker MonthFormat="MMMM" />

<!-- Four-digit year -->
<DatePicker YearFormat="yyyy" />
```

Common format strings:

| Format | Output example |
|---|---|
| `d` | 5 |
| `dd` | 05 |
| `ddd` | Mon |
| `dddd` | Monday |
| `M` | 6 |
| `MM` | 06 |
| `MMM` | Jun |
| `MMMM` | June |
| `yy` | 25 |
| `yyyy` | 2025 |

## Hiding Date Parts

Show only the fields you need:

```xml
<!-- Month and year only (no day) -->
<DatePicker DayVisible="False" />

<!-- Year only -->
<DatePicker DayVisible="False" MonthVisible="False" />
```

## TimePicker

The `TimePicker` provides hour and minute spinners:

```xml
<TimePicker />
```

### 12-hour vs 24-hour clock

```xml
<!-- 12-hour with AM/PM -->
<TimePicker ClockIdentifier="12HourClock" />

<!-- 24-hour -->
<TimePicker ClockIdentifier="24HourClock" />
```

### Minute increments

```xml
<!-- 15-minute intervals -->
<TimePicker MinuteIncrement="15" />
```

### Binding the selected time

```csharp
[ObservableProperty]
private TimeSpan? _alarmTime;
```

```xml
<TimePicker SelectedTime="{Binding AlarmTime}" />
```

## CalendarDatePicker

The `CalendarDatePicker` shows a text field that opens a full calendar dropdown:

```xml
<CalendarDatePicker PlaceholderText="Select a date"
                    SelectedDate="{Binding EventDate}" />
```

### Display format

```xml
<CalendarDatePicker DisplayFormat="yyyy-MM-dd"
                    SelectedDate="{Binding EventDate}" />
```

### Blackout dates

Disable specific dates from selection:

```csharp
calendarDatePicker.BlackoutDates.Add(
    new CalendarDateRange(DateTime.Today, DateTime.Today.AddDays(3)));
```

## Calendar Control

The `Calendar` displays a full month view for inline date selection:

```xml
<Calendar SelectedDate="{Binding SelectedDate}"
          SelectionMode="SingleDate" />
```

### Selection modes

```xml
<!-- Single date -->
<Calendar SelectionMode="SingleDate" />

<!-- Range of dates -->
<Calendar SelectionMode="SingleRange" />

<!-- Multiple individual dates -->
<Calendar SelectionMode="MultipleRange" />

<!-- No selection (display only) -->
<Calendar SelectionMode="None" />
```

### Display modes

```xml
<!-- Show month view (default) -->
<Calendar DisplayMode="Month" />

<!-- Start from year picker -->
<Calendar DisplayMode="Year" />

<!-- Start from decade picker -->
<Calendar DisplayMode="Decade" />
```

### Date range limits

Restrict the navigable date range:

```xml
<Calendar DisplayDateStart="2025-01-01"
          DisplayDateEnd="2025-12-31" />
```

### Blackout dates in code

```csharp
// Block weekends
for (var date = startDate; date <= endDate; date = date.AddDays(1))
{
    if (date.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday)
        calendar.BlackoutDates.Add(new CalendarDateRange(date));
}
```

## Date Validation

Validate that a selected date is within an acceptable range:

```csharp
public partial class BookingViewModel : ObservableValidator
{
    [ObservableProperty]
    [NotifyDataErrorInfo]
    [CustomValidation(typeof(BookingViewModel), nameof(ValidateFutureDate))]
    private DateTimeOffset? _departureDate;

    public static ValidationResult? ValidateFutureDate(DateTimeOffset? date, ValidationContext context)
    {
        if (date.HasValue && date.Value.Date <= DateTimeOffset.Now.Date)
            return new ValidationResult("Departure date must be in the future.");
        return ValidationResult.Success;
    }
}
```

## Date Formatting in Display

Show the selected date formatted in a TextBlock:

```xml
<StackPanel Spacing="8">
    <DatePicker SelectedDate="{Binding SelectedDate}" />
    <TextBlock Text="{Binding SelectedDate, StringFormat='Selected: {0:d}'}" />
</StackPanel>
```

## Combining Date and Time

Use both pickers together for a complete datetime:

```xml
<StackPanel Orientation="Horizontal" Spacing="12">
    <DatePicker SelectedDate="{Binding EventDate}" />
    <TimePicker SelectedTime="{Binding EventTime}" ClockIdentifier="24HourClock" />
</StackPanel>
```

Combine them in the view model:

```csharp
public DateTime? CombinedDateTime
{
    get
    {
        if (EventDate is null) return null;
        var date = EventDate.Value.Date;
        return EventTime.HasValue
            ? date.Add(EventTime.Value)
            : date;
    }
}
```

## Key Properties Reference

### DatePicker

| Property | Type | Description |
|---|---|---|
| `SelectedDate` | `DateTimeOffset?` | The selected date. |
| `DayVisible` | `bool` | Show/hide the day spinner. |
| `MonthVisible` | `bool` | Show/hide the month spinner. |
| `YearVisible` | `bool` | Show/hide the year spinner. |
| `DayFormat` | `string` | Format for the day display. |
| `MonthFormat` | `string` | Format for the month display. |
| `YearFormat` | `string` | Format for the year display. |

### TimePicker

| Property | Type | Description |
|---|---|---|
| `SelectedTime` | `TimeSpan?` | The selected time. |
| `ClockIdentifier` | `string` | `"12HourClock"` or `"24HourClock"`. |
| `MinuteIncrement` | `int` | Step size for the minute spinner. |

## See Also

- [DatePicker Control Reference](/controls/input/date-and-time/datepicker): Property tables.
- [TimePicker Control Reference](/controls/input/date-and-time/timepicker): Time selection control.
- [Calendar Control Reference](/controls/input/date-and-time/calendar): Full calendar display.
- [Data Validation](/docs/data-binding/binding-validation): Validating bound values.
