---
description: REFERENCE - Built-in Controls
---

import TimePickerScreenshot from '/img/reference/controls/timepicker/timepicker.gif';

# TimePicker 时间选择器

时间选择器有两个或三个“微调”控件，允许用户选择一个时间值。时间选择器可以使用24小时或12小时格式。当点击控件时，选择器控件会显示。

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="231">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>ClockIdentifier</code></td><td>选择12小时和24小时格式。12小时格式会显示一个用于AM/PM的第三个微调控件。</td></tr><tr><td><code>MinuteIncrement</code></td><td>定义分钟的可选增量。默认值为1（可以指定任意分钟数）。</td></tr><tr><td><code>SelectedTime</code></td><td>（可空的TimeSpan）所选时间。</td></tr></tbody></table>

## 示例

此示例显示如何创建一个24小时制的时间选择器，时间间隔为20分钟：

```xml
<StackPanel Margin="20" Spacing="4">
    <Label Content="Please choose your time:"/>
    <TimePicker ClockIdentifier="24HourClock"
                MinuteIncrement="20"/>
</StackPanel>
```

<img src={TimePickerScreenshot} alt="" />

## **初始化时间**

你可以在XAML中将时间值设置为属性。使用 _Hh:Mm_ 格式的字符串，其中 _Hh_ 是小时，可以在0到23之间， _Mm_ 是分钟，可以在0到59之间。

```xml
<TimePicker SelectedTime="09:15"/>
```

如果需要编写后台代码，可以这样写：

```csharp
TimePicker timePicker = new TimePicker
{
    SelectedTime = new TimeSpan(9, 15, 0) // 秒数会被忽略。
};
```

你可以通过将所选时间重置为null来清除显示。

## 更多信息

:::info
有关此控件的完整API文档，请参见[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/TimePicker/)。
:::

:::info
在_GitHub_上查看源代码 [`TimePicker.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/DateTimePickers/TimePicker.cs)
:::

