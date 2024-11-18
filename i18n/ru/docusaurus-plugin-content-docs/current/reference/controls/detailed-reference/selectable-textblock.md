---
description: REFERENCE - Built-in Controls
---

import TextBlockBasicScreenshot from '/img/reference/controls/detailed-reference/textblock/textblock-basic.png';

# Selectable Text Block

The selectable text block is a label for the display of text that allows selecting and copying of text. It can display multiple lines, and features full control over the font used.

## Useful Properties

You will probably use these properties most often:

| Property        | Description                                                                                                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SelectionStart  | a character index for the start of the current selection.                                                                                                                                                             |
| SelectionEnd    | a character index for the end of the current selection.                                                                                                                                                               |
| SelectionBrush  | The brush that highlights selected text.                                                                                                                                                                              |
| SelectionForeground | Brush that is used for the foreground of selected text.                                                                                                                                                           |
| FontSize        | The size of the font.                                                                                                                                                                                                 |
| FontWeight      | The weight of the font. Default is normal, options include `Bold`.                                                                                                                                                    |
| FontStyle       | A style to apply to the lettering. Default is normal, options include `Italic`.                                                                                                                                       |
| TextDecorations | A line decoration to apply to the lettering. Default is none, options include `Underline`, `Strikethrough`, `Baseline` and `Overline`. To apply more than one at the same time, list the options with spaces between. |
| xml:space       | TextBlock itself would respect the line breaks and whitespace of its content as set out in XAML, but it will be filtered out by the parser without `xml:space="preserve"`.                                            |

## Example

This example shows a text block used as a heading, single line and multi-line displays.

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

The styling works in the preview pane:

<img src={TextBlockBasicScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/SelectableTextBlock/).
:::

:::info
View the source code on GitHub [`SelectableTextBlock.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/SelectableTextBlock.cs)
:::
