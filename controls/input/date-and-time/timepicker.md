---
id: timepicker
title: TimePicker
---

The `TimePicker` has two to four 'spinner' controls to allow the user to pick a time value. The time picker can work in 24 or 12 hour formats and supports hours, minutes, and seconds. The picker controls display when the control is clicked.

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
|---|---|---|
| `SelectedTime` | `TimeSpan?` | The selected time value. `null` when no time is selected. |
| `ClockIdentifier` | `string` | Choose between `12HourClock` and `24HourClock` formats. The 12-hour format shows an AM/PM spinner. |
| `UseSeconds` | `bool` | Shows an additional spinner for seconds when `true`. Default is `false`. |
| `MinuteIncrement` | `int` | Defines selectable increments for the minutes. Default is 1. |
| `SecondIncrement` | `int` | Defines selectable increments for the seconds. Default is 1. |

## Example

This example shows how to create a time picker for the 24 hour clock, with 20 minute time slots:

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

You can set the time value as an attribute in XAML.  Use a string in the form _Hh:Mm_ where _Hh_ is hours and can be between 0 and 23 and _Mm_ is minutes and can be between 0 and 59.

```xml
<TimePicker SelectedTime="09:15"/>
```

If you need to write code-behind, it can look like this:

```csharp
TimePicker timePicker = new TimePicker
{
    SelectedTime = new TimeSpan(9, 15, 0) // Seconds are ignored.
};
```

You can clear the display by resetting the selected time to null.

## View Model Binding

```xml
<TimePicker SelectedTime="{Binding AppointmentTime}"
            ClockIdentifier="12HourClock" />
```

```csharp
[ObservableProperty]
private TimeSpan? _appointmentTime = new TimeSpan(14, 30, 0);
```

## See also

- [TimePicker API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_TimePicker)
- [`TimePicker.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/DateTimePickers/TimePicker.cs)
