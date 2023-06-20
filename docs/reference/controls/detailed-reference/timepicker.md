---
description: REFERENCE - Built-in Controls
---

# Time Picker

The time picker has two or three 'spinner' controls to allow the user to pick a time value. The time picker can work in 24 or 12 hour formats. The picker controls display when the control is clicked.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="231">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Header</code></td><td>Displays a title above the date picker.</td></tr><tr><td><code>ClockIdentifier</code></td><td>Choose between 12 and 24 hour formats. The 12 hour format shows a third spinner for AM/PM.</td></tr><tr><td><code>MinuteIncrement</code></td><td>Defines selectable increments for the minutes. The default is 1 (all minutes can be selected).</td></tr><tr><td><code>SelectedTime</code></td><td>(Nullable TimeSpan) the selected time.</td></tr></tbody></table>

## Example

This example shows how to create a time picker for the 24 hour clock, with 20 minute time slots:

```xml
<StackPanel Margin="20">
  <TimePicker Header="Please choose your time:" 
              ClockIdentifier="24HourClock"              
              MinuteIncrement="20"/>
</StackPanel>
```

<figure><img src="../../../.gitbook/assets/timepicker.gif" alt=""><figcaption></figcaption></figure>

## **Initializing the Time**

You can set the time value as an attribute in XAML.  Use a string in the form _Hh:Mm_ where _Hh_ is hours and can be between 0 and 23 and _Mm_ is minutes and can be between 0 and 59.

```markup
<TimePicker SelectedTime="09:15"/>
```

If you need to write code-behind, it can look like this:

```csharp
TimePicker timePicker = new TimePicker
{
    SelectedTime = new TimeSpan(9, 15, 0) // Seconds are ignored.
};
```

You can clear the display by resetting the selected time to null.&#x20;

## More Information

{% hint style="info" %}
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/TimePicker/).
{% endhint %}

{% hint style="info" %}
View the source code on _GitHub_ [`TimePicker.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/DateTimePickers/TimePicker.cs)
{% endhint %}
