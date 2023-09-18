---
description: REFERENCE - Built-in Controls
---

import TextBlockStylePreviewScreenshot from '/img/gitbook-import/assets/image (2) (5).png';

# Text Block

The text block is a read-only label for the display of text. It can display multiple lines, and features full control over the font used.&#x20;

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="254">Property</th><th>Description</th></tr></thead><tbody><tr><td>FontSize</td><td>The size of the font.  </td></tr><tr><td>FontWeight</td><td>The weight of the font. Default is normal, options include Bold'.</td></tr><tr><td>FontStyle</td><td>A style to apply to the lettering. Default is normal, options include Italic.</td></tr><tr><td>TextDecorations</td><td>A line decoration to apply to the lettering. Default is none, options include Underline, Strikethrough, Baseline and  Overline. To apply more than one at the same time, list the options with spaces between.</td></tr></tbody></table>

## Example

This example shows a text block used as a heading, single line and multi-line displays.

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5" FontSize="18" FontWeight="Bold">Heading</TextBlock>
  <TextBlock Margin="0 5" FontStyle="Italic">This is  a single line.</TextBlock>
  <TextBlock Margin="0 5">This is a multi-line display 
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
