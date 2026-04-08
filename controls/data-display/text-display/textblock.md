---
id: textblock
title: TextBlock
description: A read-only control for displaying formatted text, supporting multiple lines, inline formatting, and full font control.
doc-type: reference
---

import TextBlockRunScreenshot from '/img/controls/textblock/textblock-run.png';
import TextBlockUIContainerScreenshot from '/img/controls/textblock/textblock-uicontainer.png';

The [`TextBlock`](/api/avalonia/controls/textblock) is a read-only label for displaying text. It can display multiple lines and gives you full control over the font used. For text that your users need to select and copy, use `SelectableTextBlock` instead.

## Common properties

| Property          | Type                       | Description                                                                                                                                                                                                           |
| ----------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Text`            | `string`                   | The text to display.                                                                                                                                                                                                  |
| `FontSize`        | `double`                   | The size of the font in device-independent pixels.                                                                                                                                                                    |
| `FontWeight`      | `FontWeight`               | The weight of the font. Default is `Normal`, options include `Bold`.                                                                                                                                                  |
| `FontStyle`       | `FontStyle`                | A style to apply to the lettering. Default is `Normal`, options include `Italic`.                                                                                                                                     |
| `FontFamily`      | `FontFamily`               | The font family used to render text. You can specify fallback fonts as a comma-separated list.                                                                                                                        |
| `Foreground`      | `IBrush`                   | The brush used to paint the text.                                                                                                                                                                                     |
| `Background`      | `IBrush`                   | The brush used to paint the area behind the text.                                                                                                                                                                     |
| [`TextAlignment`](/api/avalonia/media/textalignment)   | `TextAlignment`            | Controls horizontal alignment of text within the control. Options are `Left`, `Center`, `Right`, `Justify`, and `DetectFromContent`.                                                                                  |
| [`TextWrapping`](/api/avalonia/media/textwrapping)    | `TextWrapping`             | Controls whether text wraps when it reaches the edge of the control. Options are `NoWrap` (default), `Wrap`, and `WrapWithOverflow`.                                                                                  |
| [`TextTrimming`](/api/avalonia/media/texttrimming)    | `TextTrimming`             | Controls how text is trimmed when it overflows. Options include `None` (default), `CharacterEllipsis`, `WordEllipsis`, and others. See [TextTrimming](texttrimming) for full details.                                  |
| `MaxLines`        | `int`                      | Limits the number of visible lines. When combined with `TextWrapping` and `TextTrimming`, overflow is trimmed after this many lines.                                                                                   |
| `LineHeight`      | `double`                   | The height of each line of text. Set to `NaN` (the default) to let the font metrics determine line height.                                                                                                            |
| `TextDecorations` | `TextDecorationCollection` | A line decoration to apply to the lettering. Default is none, options include `Underline`, `Strikethrough`, `Baseline`, and `Overline`. To apply more than one at the same time, list the options with spaces between. |
| `LetterSpacing`   | `double`                   | Extra spacing between characters in device-independent pixels. Default is `0`. This is an inherited attached property from `TextElement`, so you can also set it on parent controls.                                   |
| `Padding`         | `Thickness`                | Space between the control boundary and the text content.                                                                                                                                                              |
| `xml:space`       | XML attribute              | Set `xml:space="preserve"` to direct the XML parser to preserve line breaks and whitespace. Without this attribute, whitespace is stripped by default.                                                                 |

## Basic example

This example demonstrates using multiple `TextBlock` controls to show a heading, a single line containing extra space, and multi-line displays.

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui" Margin="20">
  <TextBlock Margin="0 5" FontSize="18" FontWeight="Bold">Heading</TextBlock>
  <TextBlock Margin="0 5" FontStyle="Italic" xml:space="preserve">This is  a single line.</TextBlock>
  <TextBlock Margin="0 5" xml:space="preserve">This is a multi-line
  display that has
  returns in it.
  The text block
  respects the line
  breaks set out in XAML.</TextBlock>
</StackPanel>
```

</XamlPreview>

## Text wrapping

By default, `TextBlock` does not wrap text. When the text is wider than the available space, it is clipped. Set `TextWrapping` to control this behavior:

| Value             | Behavior                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `NoWrap`          | Text is not wrapped and may be clipped (default).                                             |
| `Wrap`            | Text wraps at the nearest character that fits within the available width.                     |
| `WrapWithOverflow`| Text wraps where possible, but allows a single word to overflow if it is wider than the control. |

```xml
<TextBlock Width="200"
           TextWrapping="Wrap"
           Text="This is a long sentence that will wrap when it reaches the edge of the control." />
```

## Text trimming

When text overflows the available space, you can display an ellipsis instead of clipping abruptly. Set the `TextTrimming` property to control where the ellipsis appears. Common options include `CharacterEllipsis` and `WordEllipsis`.

```xml
<TextBlock Width="150"
           TextTrimming="CharacterEllipsis"
           Text="This text will be trimmed with an ellipsis." />
```

You can combine `TextWrapping`, `TextTrimming`, and `MaxLines` to wrap text for a fixed number of lines and trim the overflow on the last line:

```xml
<TextBlock Width="200"
           MaxLines="3"
           TextWrapping="Wrap"
           TextTrimming="WordEllipsis"
           Text="This is a long paragraph that wraps for up to three lines, then trims any remaining overflow with an ellipsis." />
```

For a full list of trimming modes and visual examples, see [TextTrimming](texttrimming).

## Text alignment

Use the `TextAlignment` property to control how text is positioned horizontally within the control:

```xml
<StackPanel Width="300" Spacing="8">
  <TextBlock TextAlignment="Left" Text="Left-aligned text" />
  <TextBlock TextAlignment="Center" Text="Center-aligned text" />
  <TextBlock TextAlignment="Right" Text="Right-aligned text" />
  <TextBlock TextAlignment="Justify" TextWrapping="Wrap"
             Text="Justified text spreads words evenly across the full width of the control when wrapping is enabled." />
</StackPanel>
```

## Inlines

Text inlines allow diverse formatting of text and controls inside a single `TextBlock`. While `TextBlock.Text` is routinely used to display a single uniformly formatted text, the child content allows for a collection of inlines.

### Run

The `Run` inline represents a contiguous run of uniformly formatted text. You can bind `Run.Text` to a view model property and style each run independently.

```xml
<TextBlock xmlns="https://github.com/avaloniaui">
  <TextBlock.Styles>
    <Style Selector="Run.activity">
      <Setter Property="Foreground" Value="#C469EE" />
      <Setter Property="FontStyle" Value="Italic" />
      <Setter Property="TextDecorations" Value="Underline" />
    </Style>
  </TextBlock.Styles>

  <Run Text="Your name is" />
  <Run FontSize="24" FontWeight="Bold" Foreground="Orange" Text="{Binding Name}" />
  <Run Text="and your favorite activity is" />
  <Run Classes="activity" Text="{Binding Activity}" />
</TextBlock>
```

<img src={TextBlockRunScreenshot} alt="A TextBlock using Run inlines with mixed formatting and data binding" />

### LineBreak

The `LineBreak` inline forces a line break within the text flow.

<XamlPreview>

```xml
<TextBlock xmlns="https://github.com/avaloniaui">
    This is the first line and<LineBreak />here comes the second
</TextBlock>
```

</XamlPreview>

### Span

The [`Span`](/api/avalonia/controls/documents/span) inline groups other inlines together and can apply its own formatting. Avalonia also provides predefined formatting inlines derived from `Span`: `Bold`, `Italic`, and `Underline`. You can derive from `Span` to create your own formatting instead of using styles.

<XamlPreview>

```xml
<TextBlock xmlns="https://github.com/avaloniaui"
           TextWrapping="Wrap">
  This text is <Span Foreground="Green"> green with <Bold>bold sections,</Bold>
  <Italic>italic <Span Foreground="Red">red</Span> sections,</Italic>
  some
  <Run FontSize="24"> enlarged font runs,</Run>
  and</Span>
  back to the original formatting
</TextBlock>
```

</XamlPreview>

### InlineUIContainer

The `InlineUIContainer` allows you to embed any `Control` as an inline element within the text flow.

```xml
<TextBlock xmlns="https://github.com/avaloniaui"
           ClipToBounds="False"
           FontSize="32"
           TextWrapping="Wrap">
    This <Span BaselineAlignment="TextTop">example</Span> shows the <Bold>power</Bold> of
    <InlineUIContainer BaselineAlignment="Baseline">
        <Image Width="32" Height="32" VerticalAlignment="Top" Source="/Assets/avalonia-logo.ico" />
    </InlineUIContainer>
    in creating rich text displays with
    <InlineUIContainer>
        <Button Padding="0,8,0,0">
            <TextBlock ClipToBounds="False" FontSize="24" Text="inline button" />
        </Button>
    </InlineUIContainer>
    inline controls
</TextBlock>
```

<img src={TextBlockUIContainerScreenshot} alt="A TextBlock with inline UI containers including an image and a button" />

## See also

- [SelectableTextBlock](selectabletextblock)
- [Label](label)
- [TextTrimming](texttrimming)
- [TextBlock API reference](/api/avalonia/controls/textblock)
- [`TextBlock.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TextBlock.cs)
