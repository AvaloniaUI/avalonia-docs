---
title: MaskedTextBox
description: REFERENCE - Built-in Controls
---

import MaskedTextPhoneBoxScreenshot from '/img/reference/controls/maskedtextbox/maskedtextbox-phone.gif';

# MaskedTextBox

The `MaskedTextBox` presents an area for typed (keyboard) input, but where the format and characters permitted can be constrained by a mask pattern formed from special characters.

The mask pattern can also contain literal characters that appear in the input and cannot be typed over.

## Useful Properties

You will probably use these properties most often:

| Property    | Description                                                                  |
|-------------|------------------------------------------------------------------------------|
| `Mask`      | The mask pattern to use. See the special mask characters in the table below. |
| `AsciiOnly` | Restricts input to the ASCII letters a-z and A-Z.                            |
| `Text`      | The resulting text input including any literal characters.                   |

## Mask Characters

The mask property accepts a string that can contain a combination of fixed characters and the following special characters:

| Mask Character | Description                                                                                                                                                                             |
|:--------------:|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|      `0`       | Digit, required. This element will accept any single digit between 0 and 9.                                                                                                             |
|      `9`       | Digit or space, optional.                                                                                                                                                               |
|      `#`       | Digit or space, optional. If this position is blank in the mask, it will be rendered as a space in the Text property. Plus (+) and minus (-) signs are allowed.                         |
|      `L`       | Letter, required. Restricts input to the ASCII letters a-z and A-Z                                                                                                                      |
|      `?`       | Letter, optional. Restricts input to the ASCII letters a-z and A-Z                                                                                                                      |
|      `&`       | Character, required. If the AsciiOnly property is true, this element behaves like the "L" element.                                                                                      |
|      `C`       | Character, optional. Any non-control character. If the AsciiOnly property is set to true, this element behaves like the "?" element.                                                    |
|      `A`       | Alphanumeric, required. If the AsciiOnly property is true, the only characters it will accept are the ASCII letters a-z and A-Z. This mask element behaves like the "a" element.        |
|      `a`       | Alphanumeric, optional. If the AsciiOnly property is set to true, the only characters it will accept are the ASCII letters a-z and A-Z. This mask element behaves like the "A" element. |
|      `.`       | Decimal placeholder. The actual display character used will be the decimal symbol appropriate to the format provider, as determined by the control's FormatProvider property.           |
|      `,`       | Thousands placeholder. The actual display character used will be the thousands placeholder appropriate to the format provider, as determined by the control's FormatProvider property.  |
|      `:`       | Time separator. The actual display character used will be the time symbol appropriate to the format provider, as determined by the control's FormatProvider property.                   |
|      `/`       | Date separator. The actual display character used will be the date symbol appropriate to the format provider, as determined by the control's FormatProvider property.                   |
|      `$`       | Currency symbol. The actual character displayed will be the currency symbol appropriate to the format provider, as determined by the control's FormatProvider property.                 |
|      `<`       | Shift down. Converts all characters that follow to lowercase.                                                                                                                           |
|      `>`       | Shift up. Converts all characters that follow to uppercase.                                                                                                                             |
|      `\|`      | Disable a previous shift up or shift down.                                                                                                                                              |
|      `\`       | Escape. Escapes a mask character, turning it into a literal.                                                                                                                            |

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
