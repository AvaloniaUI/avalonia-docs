---
description: REFERENCE - Built-in Controls
---

import DatePickerScreenshot from '/img/reference/controls/datepicker/datepicker.gif';

# DatePicker 日期选择器

日期选择器包含三个“轮盘”控制器，允许用户选择日期值。点击控件时会显示这些旋转器。

## 常用属性

你可能最常使用这些属性：

| 属性          | 描述                       |
| ------------- | -------------------------- |
| `DayVisible`  | 设置是否显示日列。         |
| `MonthVisible`| 设置是否显示月列。         |
| `YearVisible` | 设置是否显示年列。         |
| `DayFormat`   | 日期中日部分的格式字符串。 |
| `MonthFormat` | 日期中月部分的格式字符串。 |
| `YearFormat`  | 日期中年部分的格式字符串。 |
| `SelectedDate`| 选择的日期（无选择时为 null）。 |

## 示例

此示例使用日期格式属性来显示星期名及日期号：

```xml
<StackPanel Margin="20">
  <DatePicker DayFormat="ddd dd"/>
</StackPanel>
```

<img src={DatePickerScreenshot} alt="" />

## **初始化日期**

这个控件的日期属性不能在 XAML 中使用属性设置，因为没有可用的转换器来将字符串转换为日期对象，如 `DateTime` 和 `DateTimeOffset`。

你需要编写如下 code-behind 代码：

```csharp
datePicker.SelectedDate = new DateTimeOffset(new DateTime(1950, 1, 1));
```

## 更多信息

要查看此控件的完整 API 文档，请参阅[这里](https://reference.avaloniaui.net/api/Avalonia.Controls/DatePicker/)。

在 _GitHub_ 上查看源代码 [`DatePicker.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/DateTimePickers/DatePicker.cs)