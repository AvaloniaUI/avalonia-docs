---
title: ProgressBar
description: REFERENCE - Built-in Controls
---

import ProgressBarScreenshot from '/img/reference/controls/progressbar/progressbar.png';

# ProgressBar

The `ProgressBar` presents a value as a proportionately filled bar with the option to show a caption.

## Useful Properties

You will probably use these properties most often:

| Property             | Description                                        |
|----------------------|----------------------------------------------------|
| `Minimum`            | Minimum value.                                     |
| `Maximum`            | Maximum value.                                     |
| `Value`              | Current value.                                     |
| `Foreground`         | The bar color.                                     |
| `ShowProgressText`   | The progress bar shows progress as a text caption. |
| `ProgressTextFormat` | The format string applied to the progress text.    |

## Example

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

## `ProgressTextFormat` Example

By default, `ShowProgressText` shows the percentage completion according to the
[`Value`](https://api-docs.avaloniaui.net/docs/P_Avalonia_Controls_Primitives_RangeBase_Value),
[`Minimum`](https://api-docs.avaloniaui.net/docs/P_Avalonia_Controls_Primitives_RangeBase_Minimum), and
[`Maximum`](https://api-docs.avaloniaui.net/docs/P_Avalonia_Controls_Primitives_RangeBase_Maximum). The format of this
text can be customised by using the `ProgressTextFormat` property. This expects a string which will be passed to
a [`string.Format`](https://docs.microsoft.com/en-us/dotnet/api/system.string.format#system-string-format(system-string-system-object())) call
with the value of `ProgressTextFormat` as the format string. The following format items are available at the given indices:

* 0 = Value
* 1 = Value as a Percentage from 0 to 100 (e.g. `Minimum = 0`, `Maximum = 50`, `Value = 25`, then `Percentage = 50`)
* 2 = Minimum
* 3 = Maximum

| Min | Max | Value | `ProgressTextFormat`                | Output                       |
|-----|-----|-------|-------------------------------------|------------------------------|
| 0   | 20  | 17    | `{}{0}/{3} Tasks Complete ({1:0}%)` | `17/20 Tasks Complete (85%)` |

Since `{0}` would appear at the start of the string in this example, it must be escaped.

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_ProgressBar).
:::

:::info
View the source code on _GitHub_ [`ProgressBar.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ProgressBar.cs)
:::
