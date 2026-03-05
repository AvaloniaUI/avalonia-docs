---
id: label
title: Label
---

A text label control that does not receive the focus, but transfers it to a defined target control. This behavior occurs on pointer click or when an access key is pressed in combination with the Alt key.

## Common Properties

| Property | Type | Description |
|---|---|---|
| `Content` | `object` | The content to display in the label. |
| `Target` | `IInputElement` | The target control that receives focus when the label is clicked or its access key is pressed. |

## Access Keys

Use an underscore (`_`) before a character to define an access key. When the user presses Alt plus that character, focus moves to the target control:

```xml
<StackPanel Spacing="4">
    <Label Target="nameBox" Content="_Name" />
    <TextBox x:Name="nameBox" />

    <Label Target="emailBox" Content="_Email" />
    <TextBox x:Name="emailBox" />
</StackPanel>
```

Pressing Alt+N focuses the Name TextBox. Pressing Alt+E focuses the Email TextBox.

## Binding Content

```xml
<Label Target="quantityBox" Content="{Binding QuantityLabel}" />
<NumericUpDown x:Name="quantityBox" Value="{Binding Quantity}" />
```

## Label vs TextBlock

| Feature | Label | TextBlock |
|---|---|---|
| Focus transfer | Yes (via `Target`) | No |
| Access key support | Yes | No |
| Rich text formatting | No | Yes (via `Inlines`) |
| Typical use | Form field labels | Display text, paragraphs |

Use `Label` when you need accessibility and keyboard navigation in forms. Use `TextBlock` for general text display.

## See also

- [Label API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Label)
- [`Label.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Label.cs)
