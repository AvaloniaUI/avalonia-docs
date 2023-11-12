---
description: REFERENCE - Built-in Controls
---

import TextBlockStylePreviewScreenshot from '/img/gitbook-import/assets/image (2) (5).png';

# Text Block

The text block is a read-only label for the display of text. It can display multiple lines, and features full control over the font used.&#x20;

## Useful Properties

You will probably use these properties most often:

| Property        | Description                                                                                                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FontSize        | The size of the font.                                                                                                                                                                                                 |
| FontWeight      | The weight of the font. Default is normal, options include `Bold`.                                                                                                                                                    |
| FontStyle       | A style to apply to the lettering. Default is normal, options include `Italic`.                                                                                                                                       |
| TextDecorations | A line decoration to apply to the lettering. Default is none, options include `Underline`, `Strikethrough`, `Baseline` and `Overline`. To apply more than one at the same time, list the options with spaces between. |
| xml:space       | TextBlock itself would respect the line breaks and whitespace of its content as set out in XAML, but it will be filtered out by the parser without `xml:space="preserve"`.                                            |

## Example

This example shows a text block used as a heading, single line and multi-line displays.

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5" FontSize="18" FontWeight="Bold">Heading</TextBlock>
  <TextBlock Margin="0 5" FontStyle="Italic" xml:space="preserve">This is  a single line.</TextBlock>
  <TextBlock Margin="0 5" xml:space="preserve">This is a multi-line display
that has returns in it.
The text block repects the line breaks
as set out in XAML.</TextBlock>
</StackPanel>
```

The styling works in the preview pane:

<img src={TextBlockStylePreviewScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/TextBlock/).
:::

:::info
View the source code on GitHub [`TextBlock.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TextBlock.cs)
:::
