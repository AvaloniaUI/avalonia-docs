---
description: REFERENCE - Built-in Controls
---

import TextBoxEntryScreenshot from '/img/reference/controls/detailed-reference/textbox/textbox-entry.gif';

# Text Box

The text box presents an area for typed (keyboard) input. It can be for a single or multiple lines of input.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="220">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Text</code></td><td>The current text in the input.</td></tr><tr><td><code>PasswordChar</code></td><td>Hides any characters typed, and replacing them with the given  character instead.</td></tr><tr><td><code>Watermark</code></td><td>Appears as a faded hint whenever the input is empty.</td></tr><tr><td><code>AcceptsReturn</code></td><td>Makes the input multi-line by allowing the user to enter line returns. A vertical scrollbar will appear if the content exceeds the height available.</td></tr><tr><td><code>TextWrapping</code></td><td>Defines how horizontal line overflow will be handled. Options are: 'NoWrap', 'Wrap' and 'WrapWithOverflow'.</td></tr></tbody></table>

## Example

This example has a basic one line text box, a password box, and a text-wrapping multiline text box:

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

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/TextBox/).
:::

:::info
View the source code on GitHub [TextBox.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TextBox.cs)
:::
