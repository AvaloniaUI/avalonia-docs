---
description: REFERENCE - Built-in Controls
---

import TextBoxEntryScreenshot from '/img/reference/controls/textbox/textbox-entry.gif';

# TextBox 文本框

文本框提供了一个用于键盘输入的区域。它可以用于单行或多行输入。

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="220">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>Text</code></td><td>输入中的当前文本。</td></tr><tr><td><code>PasswordChar</code></td><td>隐藏任何输入的字符，并用给定的字符代替。</td></tr><tr><td><code>Watermark</code></td><td>当输入为空时，显示为淡化的提示。</td></tr><tr><td><code>AcceptsReturn</code></td><td>允许用户输入换行符，使输入变为多行。如果内容超过可用高度，将出现垂直滚动条。</td></tr><tr><td><code>TextWrapping</code></td><td>定义如何处理水平行溢出。选项有：'NoWrap'、'Wrap' 和 'WrapWithOverflow'。</td></tr></tbody></table>

## 示例

此示例包含一个基本的单行文本框、一个密码框和一个文本换行的多行文本框：

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5" >Name:</TextBlock>
  <TextBox  Watermark="Enter your name"/>
  <TextBlock Margin="0 5" >Password:</TextBlock>
  <TextBox PasswordChar="*" Watermark="Enter your password"/>
  <TextBlock Margin="0 15 0 5">Notes:</TextBlock>
  <TextBox Height="100" AcceptsReturn="True" TextWrapping="Wrap"/>
</StackPanel>
```

<img src={TextBoxEntryScreenshot} alt="" />

## 更多信息

:::info
有关此控件的完整 API 文档，请参见 [这里](http://reference.avaloniaui.net/api/Avalonia.Controls/TextBox/)。
:::

:::info
在 GitHub 上查看源代码 [TextBox.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TextBox.cs)
:::

