---
id: calendar
title: Calendar
---

The `Calendar` control is a standard Calendar control for users to select date\(s\) or date ranges.

## Common Properties

| Property | Description |
| :--- | :--- |
| `SelectionMode` | Gets or sets a value that indicates what kind of selections are allowed. |
| `DisplayMode` | Gets or sets a value indicating whether the calendar is displayed in months, years, or decades. |
| `SelectedDate` | Gets or sets the currently selected date. |
| `SelectedDates` | Gets a collection of selected dates. |
| `DisplayDate` | Gets or sets the date to display. |
| `DisplayDateStart` | Gets or sets the first date to be displayed. |
| `DisplayDateEnd` | Gets or sets the last date to be displayed. |
| `BlackoutDates` | Gets a collection of dates that are marked as not selectable. |

## Reference

[Calendar](http://reference.avaloniaui.net/api/Avalonia.Controls/Calendar/)

## Source code

[Calendar.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Calendar/Calendar.cs)

## Examples

### Basic Calendar

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
	<StackPanel>
		<Calendar SelectionMode="SingleDate" />
	</StackPanel>
</Window>
```

### Range selection Calendar

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
	<StackPanel>
		<Calendar SelectionMode="SingleRange" />
	</StackPanel>
</Window>
```

After selecting the start date, a single range can be selected by holding the shift key and clicking on the end date.

### Calendar with custom start and end dates

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
	<StackPanel>
		<Calendar Name="DisplayDatesCalendar" SelectionMode="SingleDate"/>
	</StackPanel>
</Window>
```

With this code to set the start and end dates:

```csharp
var today = DateTime.Today; 
var cal1 = this.FindControl<Calendar>("DisplayDatesCalendar");
cal1.DisplayDateStart = today.AddDays(-25);
cal1.DisplayDateEnd = today.AddDays(25);
```
