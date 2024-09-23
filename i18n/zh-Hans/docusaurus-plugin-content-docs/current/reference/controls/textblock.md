---
description: REFERENCE - Built-in Controls
---

import TextBlockBasicScreenshot from '/img/reference/controls/textblock/textblock-basic.png';
import TextBlockRunScreenshot from '/img/reference/controls/textblock/textblock-run.png';
import TextBlockSpanScreenshot from '/img/reference/controls/textblock/textblock-span.png';
import TextBlockUIContainerScreenshot from '/img/reference/controls/textblock/textblock-uicontainer.png';

# TextBlock 文本块

`TextBlock` 是一个用于显示文本的只读标签。它可以显示多行文本，并且可以完全控制所使用的字体。

## 常用属性

你可能最常使用这些属性：

| 属性            | 描述                                                                                                                                                                                                                   |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Text            | 要显示的文本。                                                                                                                                                                                                         |
| FontSize        | 字体的大小。                                                                                                                                                                                                           |
| FontWeight      | 字体的粗细。默认是正常，选项包括 `Bold`。                                                                                                                                                                               |
| FontStyle       | 应用于字母的样式。默认是正常，选项包括 `Italic`。                                                                                                                                                                      |
| TextDecorations | 应用于字母的线条装饰。默认是无，选项包括 `Underline`、`Strikethrough`、`Baseline` 和 `Overline`。要同时应用多个，请在选项之间用空格分隔。                                                                               |
| xml:space       | `xml:space="preserve"` 指示 XML 解析器保留分配给 `TextBlock` 的内容的换行符和空白，否则默认情况下会被删除。                                                                                                             |

## 示例

此示例演示使用多个 `TextBlock` 控件来显示标题、包含额外空格的单行和多行显示。

```xml
<StackPanel Margin="20">
    <TextBlock Margin="0 5" FontSize="18" FontWeight="Bold">Heading</TextBlock>
    <TextBlock Margin="0 5" FontStyle="Italic" xml:space="preserve">This is  a single line.</TextBlock>
    <TextBlock Margin="0 5" xml:space="preserve">This is a multi-line display
that has returns in it.
The text block respects the line breaks
as set out in XAML.</TextBlock>
</StackPanel>
```

样式在预览窗格中工作：

<img src={TextBlockBasicScreenshot} alt="" />

## 内联

文本内联允许在单个 `TextBlock` 内对文本和控件进行多样化格式化。虽然 `TextBlock.Text` 通常用于显示单一格式的文本，但其子 `Content` 允许包含内联集合。

### Run

`Run` 内联表示一段连续的统一格式文本。

```xml
<Style Selector="Run.activity">
    <Setter Property="Foreground" Value="#C469EE" />
    <Setter Property="FontStyle" Value="Italic" />
    <Setter Property="TextDecorations" Value="Underline" />
</Style>

<TextBlock>
    <Run Text="Your name is" />
    <Run FontSize="24" FontWeight="Bold" Foreground="Orange" Text="{Binding Name}" />
    <Run Text="and your favorite activity is" />
    <Run Classes="activity" Text="{Binding Activity}" />
</TextBlock>
```

<img src={TextBlockRunScreenshot} alt="" />

### LineBreak

`LineBreak` 内联强制换行。

```xml
<TextBlock>
        This is the first line and<LineBreak />here comes the second
</TextBlock>
```

### Span

`Span` 内联允许对内联进行分组，包括非文本内联。虽然 `Span` 可以应用自己的文本格式，但有一些预定义的格式内联派生自 `Span`：`Bold`、`Italic` 和 `Underline`。用户还可以从 `Span` 派生以创建自己的格式，而不是使用样式。

```xml
<TextBlock>
    This text is <Span Foreground="Green"> green with <Bold>bold sections,</Bold>
    <Italic>italic <Span Foreground="Red">red</Span> sections,</Italic>
    some
    <Run FontSize="24"> enlarged font runs,</Run>
    and</Span>
    back to the original formatting
</TextBlock>
```

<img src={TextBlockSpanScreenshot} alt="" />

### InlineUIContainer

`InlineUIContainer` 允许将任何 `Control` 作为内联包含。

```xml
<TextBlock ClipToBounds="False" FontSize="32" TextWrapping="Wrap">
        🚀 This <Span BaselineAlignment="TextTop">example</Span> shows the <Bold>power</Bold> of
        <InlineUIContainer BaselineAlignment="Baseline">
                <Image Width="32" Height="32" VerticalAlignment="Top" Source="/Assets/avalonia-logo.ico" />
        </InlineUIContainer>
        in creating rich text displays with
        <InlineUIContainer>
                <Button Padding="0,8,0,0">
                        <TextBlock ClipToBounds="False" FontSize="24" Text="👍👍🏼👍🏽👍🏾👍🏿" />
                </Button>
        </InlineUIContainer>
        inline controls 📈
</TextBlock>
```

<img src={TextBlockUIContainerScreenshot} alt="" />

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[此处](http://reference.avaloniaui.net/api/Avalonia.Controls/TextBlock/)。
:::

:::info
在 GitHub 上查看源代码 [`TextBlock.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TextBlock.cs)
:::

