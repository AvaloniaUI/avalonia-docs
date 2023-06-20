---
description: REFERENCE - Built-in Controls
---

# Calendar

The calendar is a control for users to select dates or date ranges.

<!--figure><img src="../../../../.gitbook/assets/calendar3.gif" alt=""><figcaption></figcaption></figure-->

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="251">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>SelectionMode</code></td><td>Indicates what kind of selections are allowed. Choose from: single date, single range, multiple ranges and none.</td></tr><tr><td><code>DisplayMode</code></td><td>Defines where the calendar starts in its drill-down levels. Choose from: decade, year and month (default). </td></tr><tr><td><code>SelectedDate</code></td><td>The currently selected date.</td></tr><tr><td><code>SelectedDates</code></td><td>A collection of selected dates, includes the dates in single and multiple ranges.</td></tr><tr><td><code>DisplayDate</code></td><td>The date to display when the control first shows.</td></tr><tr><td><code>DisplayDateStart</code></td><td>The first date to be displayed.</td></tr><tr><td><code>DisplayDateEnd</code></td><td>The last date to be displayed.</td></tr><tr><td><code>BlackoutDates</code></td><td>A collection of dates that are displayed as unavailable, and cannot be selected.</td></tr></tbody></table>

## Examples

This is a basic calendar allowing a single date selection. The calendar's selected date is shown in the text block below.

```markup
<StackPanel Margin="20">
  <Calendar x:Name="calendar" SelectionMode="MultipleRange"/>
  <TextBlock Margin="20" 
             Text="{Binding #calendar.SelectedDate}"/>
</StackPanel>
```

<!--figure><img src="../../../../.gitbook/assets/calendar.gif" alt=""><figcaption></figcaption></figure-->

This example allows multiple range selections:

```markup
<StackPanel Margin="20">
  <Calendar SelectionMode="MultipleRange"/>
</StackPanel>
```

After clicking a start date you can extend a single range by holding the shift key and clicking on the end date. You can add extra dates and ranges by holding the control key and clicking on other dates.&#x20;

<!--figure><img src="../../../../.gitbook/assets/calendar2.gif" alt=""><figcaption></figcaption></figure-->

This example has custom start and end dates, and some dates unavailable. This uses C# code behind the window.

{% tabs %}
{% tab title="XAML" %}
```xml
<StackPanel Margin="20">
  <Calendar x:Name="calendar" SelectionMode="SingleDate"/>
</StackPanel>
```
{% endtab %}

{% tab title="C#" %}
```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        var today = DateTime.Today;
        calendar.DisplayDateStart = today.AddDays(-25);
        calendar.DisplayDateEnd = today.AddDays(25);
        calendar.BlackoutDates.Add(
            new CalendarDateRange( today.AddDays(5), today.AddDays(10)));
    } 
}
```
{% endtab %}
{% endtabs %}

<!--figure><img src="../../../../.gitbook/assets/calendar4.gif" alt=""><figcaption></figcaption></figure-->

## More Information

For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Calendar/).

View the source code on _GitHub_ [`Calendar.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Calendar/Calendar.cs)
