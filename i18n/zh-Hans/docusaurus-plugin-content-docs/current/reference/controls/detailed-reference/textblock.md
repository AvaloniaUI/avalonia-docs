---
title: TextBlock
description: REFERENCE - Built-in Controls
---

import TextBlockBasicScreenshot from '/img/reference/controls/detailed-reference/textblock/textblock-basic.png';
import TextBlockRunScreenshot from '/img/reference/controls/detailed-reference/textblock/textblock-run.png';
import TextBlockSpanScreenshot from '/img/reference/controls/detailed-reference/textblock/textblock-span.png';
import TextBlockUIContainerScreenshot from '/img/reference/controls/detailed-reference/textblock/textblock-uicontainer.png';

# TextBlock

The `TextBlock` is a read-only label for the display of text. It can display multiple lines, and features full control over the font used.

## Useful Properties

You will probably use these properties most often:

| Property        | Description                                                                                                                                                                                                           |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Text            | The text to display.                                                                                                                                                                                                  |
| FontSize        | The size of the font.                                                                                                                                                                                                 |
| FontWeight      | The weight of the font. Default is normal, options include `Bold`.                                                                                                                                                    |
| FontStyle       | A style to apply to the lettering. Default is normal, options include `Italic`.                                                                                                                                       |
| TextDecorations | A line decoration to apply to the lettering. Default is none, options include `Underline`, `Strikethrough`, `Baseline` and `Overline`. To apply more than one at the same time, list the options with spaces between. |
| xml:space       | `xml:space="preserve"` directs the XML parser to preserve line breaks and whitespace for content assigned to `TextBlock` else it is stripped by default.                                                              |

## Example

This example demonstrates using multiple `TextBlock` controls to show a heading, single line containing extra space, and multi-line displays.

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

The styling works in the preview pane:

<img src={TextBlockBasicScreenshot} alt="" />

## Inlines

Text inlines allow diverse formatting of text and controls inside of a single `TextBlock`. While `TextBlock.Text` is routinely
used to display a single uniformly formatted text, its child `Content` allows for a collection of inlines.

### Run

The `Run` inline represents a contiguous run of uniformly formatted text.

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

The `LineBreak` inline forces a line break.

```xml
<TextBlock>
    This is the first line and<LineBreak />here comes the second
</TextBlock>
```

### Span

The `Span` inline allows grouping of inlines, including non-text inlines. While `Span` can apply its own text formatting,
there are a few predefined formatting inlines derived from `Span`: `Bold`, `Italic`, and `Underline`. Users may also derive
from `Span` to create their own formatting instead of using styles.

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

The `InlineUIContainer` allows any `Control` to be included as an inline.

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

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/TextBlock/).
:::

:::info
View the source code on GitHub [`TextBlock.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TextBlock.cs)
:::
