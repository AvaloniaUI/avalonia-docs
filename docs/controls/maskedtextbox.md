---
id: maskedtextbox
title: MaskedTextBox
---

The `MaskedTextBox` control is an editable text field where a user can input text.

## Source code <a id="source-code"></a>

[MaskedTextBox.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/MaskedTextBox.cs)

### Basic example line TextBox <a id="basic-example"></a>

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
    <StackPanel Margin="10">
        <MaskedTextBox Mask="(00) 000 - 000 000 00" />
    </StackPanel>
</Window>
```

produces the following output in **Ubuntu**

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/maskedtextbox/maskedtextboxexample1.png" />
  </div>

and it behaves like so when filled in by user input

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/maskedtextbox/maskedtextexample.gif" />
  </div>

### Supported Masks

The `Mask` Property accepts a `string` as Configuration and it follows the same Mask configuration as `WPF` [masks](https://docs.microsoft.com/en-us/dotnet/api/system.windows.forms.maskedtextbox.mask?view=windowsdesktop-6.0#remarks).

| Masking element | Description |
| -- | -- |
0 | Digit, required. This element will accept any single digit between 0 and 9. |
9 |	Digit or space, optional. |
\# |	Digit or space, optional. If this position is blank in the mask, it will be rendered as a space in the Text property. Plus (+) and minus (-) signs are allowed.
L |	Letter, required. Restricts input to the ASCII letters a-z and A-Z | This mask element is equivalent to [a-zA-Z] in regular expressions.
? |	Letter, optional. Restricts input to the ASCII letters a-z and A-Z | This mask element is equivalent to [a-zA-Z]? in regular expressions.
& |	Character, required. If the AsciiOnly property is set to true, this element behaves like the "L" element.
C |	Character, optional. Any non-control character. If the AsciiOnly property is set to true, this element behaves like the "?" element.
A |	Alphanumeric, required. If the AsciiOnly property is set to true, the only characters it will accept are the ASCII letters a-z and A-Z. This mask element behaves like the "a" element.
a | Alphanumeric, optional. If the AsciiOnly property is set to true, the only characters it will accept are the ASCII letters a-z and A-Z. This mask element behaves like the "A" element.
. | Decimal placeholder. The actual display character used will be the decimal symbol appropriate to the format provider, as determined by the control's FormatProvider property.
, | Thousands placeholder. The actual display character used will be the thousands placeholder appropriate to the format provider, as determined by the control's FormatProvider property.
: | Time separator. The actual display character used will be the time symbol appropriate to the format provider, as determined by the control's FormatProvider property.
/ | Date separator. The actual display character used will be the date symbol appropriate to the format provider, as determined by the control's FormatProvider property.
$ | Currency symbol. The actual character displayed will be the currency symbol appropriate to the format provider, as determined by the control's FormatProvider property.
< | Shift down. Converts all characters that follow to lowercase.
\> | Shift up. Converts all characters that follow to uppercase.
\| | Disable a previous shift up or shift down.
\\ | Escape. Escapes a mask character, turning it into a literal. "\\" | is the escape sequence for a backslash.
All other characters | Literals. All non-mask elements will appear as themselves within MaskedTextBox. Literals always occupy a static position in the mask at run time, and cannot be moved or deleted by the user.
