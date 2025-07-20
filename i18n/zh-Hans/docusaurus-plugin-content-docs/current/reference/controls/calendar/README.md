---
description: REFERENCE - Built-in Controls
---

import CalendarBasicUsageScreenshot from '/img/gitbook-import/assets/calendar3.gif';
import CalendarSingleSelectionScreenshot from '/img/gitbook-import/assets/calendar.gif';
import CalendarMultipleSelectionScreenshot from '/img/gitbook-import/assets/calendar2.gif';
import CalendarCustomRangeScreenshot from '/img/gitbook-import/assets/calendar4.gif';

# Calender 日历

日历控件用于用户选择日期或日期范围。

<img src={CalendarBasicUsageScreenshot} alt=""/>

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="251">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>SelectionMode</code></td><td>指示允许哪种选择。可选择：单个日期、单个范围、多个范围和无。</td></tr><tr><td><code>DisplayMode</code></td><td>定义日历在其下钻级别中的起始位置。可选择：十年、年份和月份（默认）。</td></tr><tr><td><code>SelectedDate</code></td><td>当前选择的日期。</td></tr><tr><td><code>SelectedDates</code></td><td>选定日期的集合，包括单个和多个范围内的日期。</td></tr><tr><td><code>DisplayDate</code></td><td>控件首次显示时要显示的日期。</td></tr><tr><td><code>DisplayDateStart</code></td><td>要显示的第一个日期。</td></tr><tr><td><code>DisplayDateEnd</code></td><td>要显示的最后一个日期。</td></tr><tr><td><code>BlackoutDates</code></td><td>显示为不可用且无法选择的日期集合。</td></tr></tbody></table>

## 示例

这是一个允许单个日期选择的基本日历。日历的选定日期显示在下面的文本块中。

```xml
<StackPanel Margin="20">
  <Calendar x:Name="calendar" SelectionMode="MultipleRange"/>
  <TextBlock Margin="20" 
             Text="{Binding #calendar.SelectedDate}"/>
</StackPanel>
```

<img src={CalendarSingleSelectionScreenshot} alt=""/>

此示例允许选择多个范围：

```xml
<StackPanel Margin="20">
  <Calendar SelectionMode="MultipleRange"/>
</StackPanel>
```

单击开始日期后，可以通过按住 Shift 键并单击结束日期来扩展单个范围。您可以通过按住 Control 键并单击其他日期来添加额外的日期和范围。

<img src={CalendarMultipleSelectionScreenshot} alt=""/>

此示例具有自定义的开始和结束日期，并且某些日期不可用。这使用 codebehind 中的 C# 代码。

```xml
<StackPanel Margin="20">
  <Calendar x:Name="calendar" SelectionMode="SingleDate"/>
</StackPanel>
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

## 更多信息

有关此控件的完整 API 文档，请参见[此处](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Calendar)。

在 _GitHub_ 上查看源代码 [`Calendar.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Calendar/Calendar.cs)

