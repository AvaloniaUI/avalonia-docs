---
description: REFERENCE - Built-in Controls
---

import MaskedTextPhoneBoxScreenshot from '/img/reference/controls/maskedtextbox/maskedtextbox-phone.gif';

# MaskedTextBox 掩码文本框

`MaskedTextBox` 提供了一个用于键盘输入的区域，但输入的格式和允许的字符可以通过由特殊字符组成的掩码模式来限制。

掩码模式中还可以包含固定字符，这些字符会出现在输入中且不能被覆盖。

## 常用属性

你可能最常使用这些属性：

| 属性          | 描述                                                                 |
|---------------|---------------------------------------------------------------------|
| `Mask`        | 要使用的掩码模式。请参阅下面的特殊掩码字符表。                        |
| `AsciiOnly`   | 限制输入为 ASCII 字母 a-z 和 A-Z。                                    |
| `Text`        | 包含任何固定字符的结果文本输入。                                      |

## 掩码字符

掩码属性接受一个字符串，该字符串可以包含固定字符和以下特殊字符的组合：

| 掩码字符      | 描述                                                                                                                                                 |
|:-------------:|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `0`           | 数字，必填。此元素将接受 0 到 9 之间的任何单个数字。                                                                                                 |
| `9`           | 数字或空格，可选。                                                                                                                                   |
| `#`           | 数字或空格，可选。如果此位置在掩码中为空，则在 Text 属性中将其呈现为空格。允许加号 (+) 和减号 (-)。                                                |
| `L`           | 字母，必填。限制输入为 ASCII 字母 a-z 和 A-Z。                                                                                                       |
| `?`           | 字母，可选。限制输入为 ASCII 字母 a-z 和 A-Z。                                                                                                       |
| `&`           | 字符，必填。如果 AsciiOnly 属性为 true，则此元素的行为类似于 "L" 元素。                                                                              |
| `C`           | 字符，可选。任何非控制字符。如果 AsciiOnly 属性设置为 true，则此元素的行为类似于 "?" 元素。                                                          |
| `A`           | 字母数字，必填。如果 AsciiOnly 属性为 true，则它只接受 ASCII 字母 a-z 和 A-Z。此掩码元素的行为类似于 "a" 元素。                                      |
| `a`           | 字母数字，可选。如果 AsciiOnly 属性设置为 true，则它只接受 ASCII 字母 a-z 和 A-Z。此掩码元素的行为类似于 "A" 元素。                                  |
| `.`           | 小数点占位符。实际显示的字符将是适合格式提供者的十进制符号，由控件的 FormatProvider 属性确定。                                                       |
| `,`           | 千位分隔符。实际显示的字符将是适合格式提供者的千位分隔符，由控件的 FormatProvider 属性确定。                                                         |
| `:`           | 时间分隔符。实际显示的字符将是适合格式提供者的时间符号，由控件的 FormatProvider 属性确定。                                                           |
| `/`           | 日期分隔符。实际显示的字符将是适合格式提供者的日期符号，由控件的 FormatProvider 属性确定。                                                           |
| `$`           | 货币符号。实际显示的字符将是适合格式提供者的货币符号，由控件的 FormatProvider 属性确定。                                                             |
| `<`           | 向下转换。将后续所有字符转换为小写。                                                                                                                 |
| `>`           | 向上转换。将后续所有字符转换为大写。                                                                                                                 |
| `\|`          | 禁用之前的向上或向下转换。                                                                                                                           |
| `\`           | 转义。转义一个掩码字符，将其变为文字字符。                                                                                                           |

转义字符（反斜杠）可用于将特殊字符包含为文字。例如，要包含美元符号：

`Mask="\$999,000.00"`

## 示例

这是一个基本示例：

```xml
<StackPanel Margin="20">
    <TextBlock Margin="0 5">国际电话号码：</TextBlock>
    <MaskedTextBox Mask="(+09) 000 000 0000" />
    <TextBlock Margin="0 15 0 5">英国增值税号：</TextBlock>
    <MaskedTextBox Mask="GB 000 000 000" />
</StackPanel>
```

<img src={MaskedTextPhoneBoxScreenshot} alt=""/>

## 更多信息

:::info
有关此控件的完整 API 文档，请参见此处。
:::

:::info
在 _GitHub_ 上查看源代码 [`MaskedTextBox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/MaskedTextBox.cs)
:::