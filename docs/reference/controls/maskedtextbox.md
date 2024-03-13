---
title: MaskedTextBox
description: REFERENCE - Built-in Controls
---

import MaskedTextPhoneBoxScreenshot from '/img/reference/controls/maskedtextbox/maskedtextbox-phone.gif';

# MaskedTextBox

The `MaskedTextBox` presents an area for typed (keyboard) input, but where the format and characters permitted can be constrained by a mask pattern formed from special characters.

The mask pattern can also contain literal characters that appear in the input, and cannot be typed over.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="235">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Mask</code></td><td>The mask pattern to use. See the special mask characters in the table below.</td></tr><tr><td><code>AsciiOnly</code></td><td>Restricts input to the ASCII letters a-z and A-Z.</td></tr><tr><td><code>Text</code></td><td>The resulting text input including any literal characters.</td></tr></tbody></table>

## Mask Characters

The mask property accepts a string that can contain a combination of  fixed characters, and the following special characters:

<table><thead><tr><th width="287" align="center">Mask Character</th><th>Description</th></tr></thead><tbody><tr><td align="center">0</td><td>Digit, required. This element will accept any single digit between 0 and 9.</td></tr><tr><td align="center">9</td><td>Digit or space, optional.</td></tr><tr><td align="center">#</td><td>Digit or space, optional. If this position is blank in the mask, it will be rendered as a space in the Text property. Plus (+) and minus (-) signs are allowed.</td></tr><tr><td align="center">L</td><td>Letter, required. Restricts input to the ASCII letters a-z and A-Z</td></tr><tr><td align="center">?</td><td>Letter, optional. Restricts input to the ASCII letters a-z and A-Z</td></tr><tr><td align="center">&#x26;</td><td>Character, required. If the <code>AsciiOnly</code> property is true, this element behaves like the "L" element.</td></tr><tr><td align="center">C</td><td>Character, optional. Any non-control character. If the AsciiOnly property is set to true, this element behaves like the "?" element.</td></tr><tr><td align="center">A</td><td>Alphanumeric, required. If the AsciiOnly property is true, the only characters it will accept are the ASCII letters a-z and A-Z. This mask element behaves like the "a" element.</td></tr><tr><td align="center">a</td><td>Alphanumeric, optional. If the AsciiOnly property is set to true, the only characters it will accept are the ASCII letters a-z and A-Z. This mask element behaves like the "A" element.</td></tr><tr><td align="center">.</td><td>Decimal placeholder. The actual display character used will be the decimal symbol appropriate to the format provider, as determined by the control's FormatProvider property.</td></tr><tr><td align="center">,</td><td>Thousands placeholder. The actual display character used will be the thousands placeholder appropriate to the format provider, as determined by the control's FormatProvider property.</td></tr><tr><td align="center">:</td><td>Time separator. The actual display character used will be the time symbol appropriate to the format provider, as determined by the control's FormatProvider property.</td></tr><tr><td align="center">/</td><td>Date separator. The actual display character used will be the date symbol appropriate to the format provider, as determined by the control's FormatProvider property.</td></tr><tr><td align="center">$</td><td>Currency symbol. The actual character displayed will be the currency symbol appropriate to the format provider, as determined by the control's FormatProvider property.</td></tr><tr><td align="center">&#x3C;</td><td>Shift down. Converts all characters that follow to lowercase.</td></tr><tr><td align="center">></td><td>Shift up. Converts all characters that follow to uppercase.</td></tr><tr><td align="center">|</td><td>Disable a previous shift up or shift down.</td></tr><tr><td align="center">\<td>Escape. Escapes a mask character, turning it into a literal. "\"</td></tr></tbody></table>

The escape character (backslash) can be used to include a special character as a literal. For example, to include the dollar sign:

`Mask="\$999,000.00"`

## Example

This is a basic example:

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">International phone number:</TextBlock>
  <MaskedTextBox Mask="(+09) 000 000 0000" />
  <TextBlock Margin="0 15 0 5">UK VAT number:</TextBlock>
  <MaskedTextBox Mask="GB 000 000 000" />
</StackPanel>
```

<img src={MaskedTextPhoneBoxScreenshot} alt=""/>

## More Information

:::info
For the complete API documentation about this control, see here.
:::

:::info
View the source code on _GitHub_ [`MaskedTextBox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/MaskedTextBox.cs)
:::
