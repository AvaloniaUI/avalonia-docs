---
title: TextBox
description: REFERENCE - Built-in Controls
---

import TextBoxEntryScreenshot from '/img/controls/textbox/textbox-entry.gif';

The `TextBox` presents an area for typed (keyboard) input. It can be for a single or multiple lines of input.

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
|---|---|---|
| `Text` | `string` | The current text in the input. |
| `PlaceholderText` | `string` | Appears as a faded hint whenever the input is empty. |
| `PlaceholderForeground` | `IBrush` | The brush used to render the placeholder text. |
| `PasswordChar` | `char` | Hides any characters typed, replacing them with the given character instead. |
| `RevealPassword` | `bool` | When `true`, shows the actual password text instead of mask characters. |
| `AcceptsReturn` | `bool` | Makes the input multi-line by allowing the user to enter line returns. |
| `AcceptsTab` | `bool` | Allows the user to insert tab characters instead of moving focus. |
| `TextWrapping` | `TextWrapping` | Defines how horizontal line overflow is handled. Options: `NoWrap`, `Wrap`, `WrapWithOverflow`. |
| `MaxLength` | `int` | Limits the number of characters the user can enter. 0 means no limit. |
| `IsReadOnly` | `bool` | When `true`, the user can select and copy text but cannot edit it. |
| `TextAlignment` | `TextAlignment` | Horizontal alignment of the text: `Left`, `Center`, `Right`. |
| `InnerLeftContent` | `object` | Content displayed inside the TextBox on the left side (for icons or labels). |
| `InnerRightContent` | `object` | Content displayed inside the TextBox on the right side (for buttons or indicators). |
| `LineCount` | `int` | Returns the number of lines in the text content (read-only). Useful for multi-line TextBox scenarios. |
| `MinLines` | `int` | Minimum number of visible lines. The TextBox will size itself to show at least this many lines when `AcceptsReturn` is `true`. |
| `CaretBlinkInterval` | `TimeSpan` | The interval at which the caret blinks. Set to `TimeSpan.Zero` to disable blinking. |
| `HideSuggestions` | `bool` | When `true`, suppresses platform text input suggestions (autocomplete/autocorrect). Useful for password-adjacent fields or code editors. |

## Example

This example has a basic one line text box, a password box, and a text-wrapping multiline text box:

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5" >Name:</TextBlock>
  <TextBox  PlaceholderText="Enter your name"/>
  <TextBlock Margin="0 5" >Password:</TextBlock>
  <TextBox PasswordChar="*" PlaceholderText="Enter your password"/>
  <TextBlock Margin="0 15 0 5">Notes:</TextBlock>
  <TextBox Height="100" AcceptsReturn="True" TextWrapping="Wrap"/>
</StackPanel>
```

<img src={TextBoxEntryScreenshot} alt="" />

## View Model Binding

Bind `Text` with two-way mode (the default for `TextBox.Text`):

```xml
<TextBox Text="{Binding Username}" PlaceholderText="Enter username" />
```

```csharp
[ObservableProperty]
private string _username = "";
```

## Input with Inner Content

Add icons or buttons inside the TextBox:

```xml
<TextBox PlaceholderText="Search...">
    <TextBox.InnerRightContent>
        <Button Content="✕" Command="{Binding ClearSearchCommand}"
                Background="Transparent" BorderThickness="0" Padding="4" />
    </TextBox.InnerRightContent>
</TextBox>
```

## See also

- [TextBox API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_TextBox)
- [`TextBox.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TextBox.cs)
