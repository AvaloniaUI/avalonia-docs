---
id: selectabletextblock
title: SelectableTextBlock
description: A read-only text label that allows users to select and copy displayed text.
doc-type: reference
---

The `SelectableTextBlock` is a read-only label for displaying text that your users can select and copy. It behaves like `TextBlock` but adds built-in support for text selection with mouse or keyboard. It can display multiple lines and provides full control over the font used.

## Common properties

| Property                   | Type        | Description                                                                                                                                                                                                           |
| -------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Text`                     | `string`    | The text to display.                                                                                                                                                                                                  |
| `SelectionStart`           | `int`       | The character index for the start of the current selection.                                                                                                                                                           |
| `SelectionEnd`             | `int`       | The character index for the end of the current selection.                                                                                                                                                             |
| `SelectedText`             | `string`    | Gets the currently selected text (read-only).                                                                                                                                                                         |
| `SelectionBrush`           | `IBrush`    | The brush used to highlight selected text.                                                                                                                                                                            |
| `SelectionForegroundBrush` | `IBrush`    | The brush used for the foreground of selected text.                                                                                                                                                                   |
| `FontSize`                 | `double`    | The size of the font.                                                                                                                                                                                                 |
| `FontWeight`               | `FontWeight`| The weight of the font. Default is normal, options include `Bold`.                                                                                                                                                    |
| `FontStyle`                | `FontStyle` | A style to apply to the lettering. Default is normal, options include `Italic`.                                                                                                                                       |
| `TextDecorations`          | `TextDecorationCollection` | A line decoration to apply to the lettering. Default is none, options include `Underline`, `Strikethrough`, `Baseline` and `Overline`. To apply more than one at the same time, list the options with spaces between. |
| `TextWrapping`             | `TextWrapping` | Controls whether text wraps when it reaches the edge of the control. Options include `NoWrap`, `Wrap`, and `WrapWithOverflow`.                                                                                    |
| `xml:space`                | XML attribute | Set `xml:space="preserve"` to direct the XML parser to preserve line breaks and whitespace. Without this attribute, whitespace is stripped by default.                                                              |

## Events

| Event                | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| `CopyingToClipboard` | Raised when the selected text is being copied to the clipboard. Can be used to modify or cancel the copy operation. |

## Basic example

This example shows selectable text used as a heading, a single line with a custom selection brush, and a multi-line display with a pre-set selection range.

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            Width="200"
            Margin="20">
  <SelectableTextBlock Margin="0 5" FontSize="18" FontWeight="Bold">Heading</SelectableTextBlock>
  <SelectableTextBlock Margin="0 5" FontStyle="Italic"
                       xml:space="preserve"
                       SelectionBrush="Red">This is a single line.</SelectableTextBlock>
  <SelectableTextBlock Margin="0 5" xml:space="preserve"
                       SelectionStart="3" SelectionEnd="13">This is a multi-line
  display that has
  returns in it.
  The text block
  respects the
  line breaks
  set out in XAML.</SelectableTextBlock>
</StackPanel>
```

</XamlPreview>

## Selecting text programmatically

You can control which portion of text is selected by setting the `SelectionStart` and `SelectionEnd` properties in your code-behind or view model.

```xml
<SelectableTextBlock x:Name="MyTextBlock"
                     Text="Select part of this text programmatically." />
<Button Content="Select words 2-4" Click="OnSelectClicked" />
```

```csharp
private void OnSelectClicked(object? sender, RoutedEventArgs e)
{
    MyTextBlock.SelectionStart = 7;
    MyTextBlock.SelectionEnd = 24;
}
```

You can also select all text by setting `SelectionStart` to `0` and `SelectionEnd` to the length of the text.

```csharp
MyTextBlock.SelectionStart = 0;
MyTextBlock.SelectionEnd = MyTextBlock.Text?.Length ?? 0;
```

## Customizing selection appearance

You can customize how selected text looks by setting `SelectionBrush` and `SelectionForegroundBrush`.

```xml
<SelectableTextBlock Text="Custom selection colors"
                     SelectionBrush="#335599FF"
                     SelectionForegroundBrush="White" />
```

## See also

- [TextBlock](/controls/data-display/text-display/textblock)
- [Label](/controls/data-display/text-display/label)
- [SelectableTextBlock API reference](/api/avalonia/controls/selectabletextblock)
- [`SelectableTextBlock.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/SelectableTextBlock.cs)
