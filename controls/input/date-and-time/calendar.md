---
id: calendar
title: Calendar
---

import CalendarBasicUsageScreenshot from '/img/controls/calendar/calendar3.gif';
import CalendarSingleSelectionScreenshot from '/img/controls/calendar/calendar.gif';
import CalendarMultipleSelectionScreenshot from '/img/controls/calendar/calendar2.gif';
import CalendarCustomRangeScreenshot from '/img/controls/calendar/calendar4.gif';

The calendar is a control for users to select dates or date ranges.

<Image light={CalendarBasicUsageScreenshot} alt="An animation of a calendar switching between year, month and day views." position="center" maxWidth={400} cornerRadius="true"/>

## Useful properties

You will probably use these properties most often:

<table><thead><tr><th width="251">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>SelectionMode</code></td><td>Indicates what kind of selections are allowed. Choose from: single date, single range, multiple ranges and none.</td></tr><tr><td><code>DisplayMode</code></td><td>Defines where the calendar starts in its drill-down levels. Choose from: decade, year and month (default). </td></tr><tr><td><code>SelectedDate</code></td><td>The currently selected date.</td></tr><tr><td><code>SelectedDates</code></td><td>A collection of selected dates, includes the dates in single and multiple ranges.</td></tr><tr><td><code>DisplayDate</code></td><td>The date to display when the control first shows.</td></tr><tr><td><code>DisplayDateStart</code></td><td>The first date to be displayed.</td></tr><tr><td><code>DisplayDateEnd</code></td><td>The last date to be displayed.</td></tr><tr><td><code>BlackoutDates</code></td><td>A collection of dates that are displayed as unavailable, and cannot be selected.</td></tr><tr><td><code>AllowTapRangeSelection</code></td><td>When <code>true</code> (the default), allows selecting a date range by tapping a start date and then tapping an end date. Works in <code>SingleRange</code> and <code>MultipleRange</code> selection modes.</td></tr></tbody></table>

## Examples

This is a basic calendar allowing a single date selection. The calendar's selected date is shown in the text block below.

```xml
<StackPanel Margin="20">
  <Calendar SelectionMode="SingleDate"/>
  <TextBlock Margin="20" 
             Text="{Binding #calendar.SelectedDate}"/>
</StackPanel>
```

<img src={CalendarSingleSelectionScreenshot} alt=""/>

This example allows multiple range selections:

```xml
  <StackPanel Margin="20">
    <Calendar SelectionMode="MultipleRange"/>
  </StackPanel>
```

<img src={CalendarMultipleSelectionScreenshot} alt=""/>

To select a range, tap or click a start date and then tap or click on the end date. This tap-to-select behavior is controlled by the `AllowTapRangeSelection` property, which is enabled by default. Alternatively, hold the Shift key and click on the end date to extend a range. You can add extra dates and ranges by holding the Ctrl key and clicking on other dates.

This example has custom start and end dates, and some dates unavailable. This uses C# code behind the window.

```xml
<UserControl xmlns="https://github.org/avaloniaui">
<StackPanel Margin="20">
  <Calendar x:Name="calendar" SelectionMode="SingleDate"/>
</StackPanel>
</UserControl>
```


```csharp title='C#'
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


<img src={CalendarCustomRangeScreenshot} alt=""/>

## See also

- [Calendar API reference](/api/avalonia/controls/calendar)
- [`Calendar.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Calendar/Calendar.cs)
