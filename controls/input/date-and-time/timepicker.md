---
id: timepicker
title: TimePicker
description: A control that lets users select a time value using spinner controls for hours, minutes, and optionally seconds.
doc-type: reference
---

The `TimePicker` presents two to four spinner controls that let users select a time value. It supports 24-hour and 12-hour clock formats, with optional seconds selection. The spinner controls appear when you click the control.

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
|---|---|---|
| `SelectedTime` | `TimeSpan?` | The selected time value. `null` when no time is selected. |
| `ClockIdentifier` | `string` | Sets the clock format. Use `12HourClock` or `24HourClock`. The 12-hour format adds an AM/PM spinner. |
| `UseSeconds` | `bool` | Shows an additional spinner for seconds when `true`. Default is `false`. |
| `MinuteIncrement` | `int` | Defines selectable increments for the minutes. Default is `1`. |
| `SecondIncrement` | `int` | Defines selectable increments for the seconds. Default is `1`. |

## Clock format

By default, `TimePicker` uses the 12-hour clock format with an AM/PM spinner. You can switch to the 24-hour format by setting `ClockIdentifier` to `24HourClock`:

```xml
<!-- 12-hour clock (default) with AM/PM spinner -->
<TimePicker ClockIdentifier="12HourClock" />

<!-- 24-hour clock without AM/PM spinner -->
<TimePicker ClockIdentifier="24HourClock" />
```

## Example

This example shows how to create a time picker for the 24-hour clock, with 20-minute time slots:

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            Margin="20"
            Spacing="4">
  <Label Content="Please choose your time:"/>
  <TimePicker ClockIdentifier="24HourClock"
              MinuteIncrement="20"/>
</StackPanel>
```
</XamlPreview>

## Initializing the time

You can set the time value as an attribute in XAML. Use a string in the form `Hh:Mm` where `Hh` is hours (0 to 23) and `Mm` is minutes (0 to 59):

```xml
<TimePicker SelectedTime="09:15"/>
```

If you need to write code-behind, you can initialize the time like this:

```csharp
TimePicker timePicker = new TimePicker
{
    SelectedTime = new TimeSpan(9, 15, 0) // Seconds are ignored.
};
```

You can clear the display by resetting `SelectedTime` to `null`.

## Constraining the time

You can limit the selectable times by adjusting `MinuteIncrement` and `SecondIncrement`. For example, to allow selection only in 15-minute intervals:

```xml
<TimePicker MinuteIncrement="15" />
```

To include seconds with 30-second increments:

```xml
<TimePicker UseSeconds="True" SecondIncrement="30" />
```

## View model binding

Bind `SelectedTime` to a `TimeSpan?` property in your view model:

```xml
<TimePicker SelectedTime="{Binding AppointmentTime}"
            ClockIdentifier="12HourClock" />
```

```csharp
[ObservableProperty]
private TimeSpan? _appointmentTime = new TimeSpan(14, 30, 0);
```

You can react to changes by subscribing to the `SelectedTimeChanged` event or by observing property changes in your view model.

## See also

- [DatePicker](datepicker)
- [CalendarDatePicker](calendardatepicker)
- [TimePicker API reference](/api/avalonia/controls/timepicker)
- [`TimePicker.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/DateTimePickers/TimePicker.cs)
