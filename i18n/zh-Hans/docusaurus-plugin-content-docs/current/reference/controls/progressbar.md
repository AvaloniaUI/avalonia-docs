---
title: ProgressBar 进度条
description: REFERENCE - Built-in Controls
---

import ProgressBarScreenshot from '/img/reference/controls/progressbar/progressbar.png';

# ProgressBar 进度条

`ProgressBar` 以比例填充的条形显示一个值，并提供显示标题的选项。

## 常用属性

你可能最常使用这些属性：

| 属性                   | 描述                                             |
|----------------------|------------------------------------------------|
| `Minimum`            | 最小值。                                         |
| `Maximum`            | 最大值。                                         |
| `Value`              | 当前值。                                         |
| `Foreground`         | 进度条颜色。                                      |
| `ShowProgressText`   | 进度条显示进度文本标题。                             |
| `ProgressTextFormat` | 应用于进度文本的格式字符串。                           |

## 示例

```xml
<StackPanel Margin="20">
  <ProgressBar  Margin="0 10" Height="20" 
                Minimum="0" Maximum="100" Value="14"
                ShowProgressText="True"/>
  <ProgressBar  Margin="0 10" Height="20"
                Minimum="0" Maximum="100" Value="92"
                Foreground="Red"
                ShowProgressText="True"/>
</StackPanel>
```

<img src={ProgressBarScreenshot} alt="" />

## `ProgressTextFormat` 示例

默认情况下，`ShowProgressText` 根据
[`Value`](https://api-docs.avaloniaui.net/docs/P_Avalonia_Controls_Primitives_RangeBase_Value)、
[`Minimum`](https://api-docs.avaloniaui.net/docs/P_Avalonia_Controls_Primitives_RangeBase_Minimum) 和
[`Maximum`](https://api-docs.avaloniaui.net/docs/P_Avalonia_Controls_Primitives_RangeBase_Maximum) 显示完成百分比。
这个文本的格式可以通过使用 `ProgressTextFormat` 属性来自定义。这需要一个字符串，将传递给
[`string.Format`](https://docs.microsoft.com/en-us/dotnet/api/system.string.format#system-string-format(system-string-system-object())) 调用，
其中 `ProgressTextFormat` 作为格式字符串。以下格式项在给定的索引处可用：

* 0 = Value
* 1 = Value 作为从 0 到 100 的百分比（例如，`Minimum = 0`，`Maximum = 50`，`Value = 25`，则 `Percentage = 50`）
* 2 = Minimum
* 3 = Maximum

| 最小值 | 最大值 | 值    | `ProgressTextFormat`                     | 输出                             |
|-------|-------|-------|----------------------------------------|----------------------------------|
| 0     | 20    | 17    | `{}{0}/{3} 任务完成 ({1:0}%)`           | `17/20 任务完成 (85%)`          |

由于 `{0}` 在此示例中出现在字符串的开头，因此必须对其进行转义。

## 更多信息

:::info
要查看关于此控件的完整 API 文档，请查看[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_ProgressBar)。
:::

:::info
在 _GitHub_ 上查看源代码 [`ProgressBar.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ProgressBar.cs)
:::