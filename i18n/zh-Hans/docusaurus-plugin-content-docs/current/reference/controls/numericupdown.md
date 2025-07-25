---
description: REFERENCE - Built-in Controls
---

import NumericUpDownBasicScreenshot from '/img/reference/controls/numericupdown/numericupdown-basic.gif';
import NumericUpDownFormatStringScreenshot from '/img/reference/controls/numericupdown/numericupdown-format-string.gif';

# NumericUpDown 数字上下调节器

数字上下调节器是一个可编辑的数字输入控件，附带有上下调节按钮。输入中的非数字字符将被忽略。该值还可以通过点击按钮或使用键盘箭头键来更改。如果存在鼠标滚轮，也可以用来改变数值。

## 常用属性

你可能最常使用这些属性：

| 属性名                  | 描述                                                                                                                     |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------|
| `Value`               | 数值（可能是十进制？）。                                                                                                   |
| `Increment`           | 按钮调节器、键盘和鼠标滚轮使用的增量。默认增量为1。                                                                        |
| `Minimum`             | 允许的最小值。                                                                                                             |
| `Maximum`             | 允许的最大值。                                                                                                             |
| `FormatString`        | 数值的格式字符串。如果你设置了自定义增量，这一点非常重要。                                                                   |
| `ButtonSpinnerLocation` | 调节按钮的位置。可选择左侧和右侧（默认）。                                                                                    |
| `AllowSpin`           | 确定是否激活使用调节按钮、键盘和鼠标滚轮的增减功能。默认为真。                                                               |
| `ShowButtonSpinner`   | 确定是否显示调节按钮。默认为真。                                                                                           |

## 示例

这是一个基本的数字上下调节器控件示例。这里没有对数值的限制：

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">物品数量：</TextBlock>
  <NumericUpDown Value="10" />
</StackPanel>
```

<img src={NumericUpDownBasicScreenshot} alt="" />

数值和其他属性是可空的十进制数；因此，如果需要，你可以创建自定义的十进制增量/减量和范围。

:::info
记得在创建自定义的十进制增量和范围时指定 `FormatString` 属性。
:::

例如：

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">透明度：</TextBlock>
  <NumericUpDown Value="0.5" Increment="0.05" 
      FormatString="0.00"
      Minimum="0" Maximum="1"/>
</StackPanel>
```

<img src={NumericUpDownFormatStringScreenshot} alt="" />

## 更多信息

:::info
关于此控件的完整 API 文档，请参阅[此处](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_NumericUpDown)。
:::

:::info
在 _GitHub_ 上查看源代码 [`NumericUpDown.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/NumericUpDown/NumericUpDown.cs)
:::