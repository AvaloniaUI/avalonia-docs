---
description: REFERENCE - Built-in Controls
---

import TextBlockBasicScreenshot from '/img/reference/controls/textblock/textblock-basic.png';

# SelectableTextBlock 可选文本块

`SelectableTextBlock` 块是一个用于显示文本的标签，允许选择和复制文本。它可以显示多行，并且可以完全控制所使用的字体。

## 有用的属性

您可能最常使用这些属性：

| 属性              | 描述                                                                                                                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SelectionStart    | 当前选择的起始字符索引。                                                                                                                                                                                              |
| SelectionEnd      | 当前选择的结束字符索引。                                                                                                                                                                                              |
| SelectionBrush    | 高亮显示选中文本的画刷。                                                                                                                                                                                              |
| SelectionForeground | 用于选中文本前景的画刷。                                                                                                                                                                                            |
| FontSize          | 字体的大小。                                                                                                                                                                                                          |
| FontWeight        | 字体的粗细。默认是正常，选项包括 `Bold`。                                                                                                                                                                             |
| FontStyle         | 应用于字母的样式。默认是正常，选项包括 `Italic`。                                                                                                                                                                      |
| TextDecorations   | 应用于字母的线条装饰。默认是无，选项包括 `Underline`、`Strikethrough`、`Baseline` 和 `Overline`。要同时应用多个，请在选项之间用空格分隔。                                                                             |
| xml:space         | TextBlock 本身会尊重其内容在 XAML 中设置的换行和空白，但如果没有 `xml:space="preserve"`，它将被解析器过滤掉。                                                                                                           |

## 示例

此示例显示了用作标题、单行和多行显示的文本块。

```xml
  <StackPanel Margin="20">
  <SelectableTextBlock Margin="0 5" FontSize="18" FontWeight="Bold" >Heading</SelectableTextBlock>
  <SelectableTextBlock Margin="0 5" FontStyle="Italic" xml:space="preserve" SelectionBrush="Red">This is a single line.</SelectableTextBlock>
  <SelectableTextBlock Margin="0 5" xml:space="preserve" SelectionStart="3" SelectionEnd="13">This is a multi-line display
    that has returns in it.
    The text block respects the line breaks
    as set out in XAML.</SelectableTextBlock>
</StackPanel>
```

样式在预览窗格中有效：

<img src={TextBlockBasicScreenshot} alt="" />

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[此处](http://reference.avaloniaui.net/api/Avalonia.Controls/SelectableTextBlock/)。
:::

:::info
在 GitHub 上查看源代码 [`SelectableTextBlock.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/SelectableTextBlock.cs)
:::

