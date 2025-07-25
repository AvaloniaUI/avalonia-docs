---
description: REFERENCE - Built-in Controls
---

import CalendarDatePickerScreenshot from '/img/gitbook-import/assets/calendardatepicker.gif';

# CalenderDatePicker 日历日期选择器

这是日历控件的扩展，包含一个文本框和按钮。当用户点击按钮时显示日历（再次点击时隐藏）。当点击日历上的日期时，选定的日期会显示在文本框中。

用户也可以通过在文本框中输入日期来选择日期。日期选择器能够将多种日期格式处理为在没有选定日期时显示为水印的格式。

:::info
有关此控件的日历部分的详细信息，请参见之前的参考资料[这里](./)。
:::

## 示例

此示例显示了一个基本的单日期选择日历，当按钮被点击时显示：

```xml
<StackPanel Margin="20">
  <CalendarDatePicker />
</StackPanel>
```

<img src={CalendarDatePickerScreenshot} alt=""/>

## 更多信息

:::info
有关此控件的完整API文档，请参见[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_CalendarDatePicker)。
:::

:::info
在 _GitHub_ 上查看源代码 [`CalendarDatePicker.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/CalendarDatePicker/CalendarDatePicker.cs)
:::

