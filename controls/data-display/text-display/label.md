---
id: label
title: Label
description: A control that displays text and transfers focus to a target input element when clicked or activated by an access key.
doc-type: reference
---

The [`Label`](/api/avalonia/controls/label) control displays text and transfers focus to a designated target control. When you click the label or press its access key in combination with the Alt key, focus moves to the control specified by the `Target` property. This makes `Label` especially useful for building accessible forms where each input has a corresponding text label.

## Common properties

| Property | Type | Description |
|---|---|---|
| `Content` | `object` | The content to display in the label. You can set this to a string or bind it to a view model property. |
| `Target` | `IInputElement` | The target control that receives focus when the label is clicked or its access key is pressed. Set this to the `x:Name` of the target control. |

## Basic usage

To associate a `Label` with an input control, set the `Target` property to the name of the input control. When your user clicks the label text, focus moves to the target:

```xml
<StackPanel Spacing="4">
    <Label Target="nameBox" Content="Name" />
    <TextBox x:Name="nameBox" />
</StackPanel>
```

## Access keys

You can define a keyboard shortcut (access key) by placing an underscore (`_`) before a character in the `Content` string. Letters, numbers, and accented characters are all supported. When your user presses Alt plus that character, focus moves to the target control:

```xml
<StackPanel Spacing="4">
    <Label Target="nameBox" Content="_Name" />
    <TextBox x:Name="nameBox" />

    <Label Target="emailBox" Content="_Email" />
    <TextBox x:Name="emailBox" />
</StackPanel>
```

In the example above, pressing Alt+N focuses the Name `TextBox` and pressing Alt+E focuses the Email `TextBox`.

:::tip
Choose unique access key characters within each view to avoid conflicts. The underlined character is visible to your users as a hint when they press the Alt key.
:::

## Binding content

You can bind the `Content` property to a view model property so that label text updates dynamically:

```xml
<Label Target="quantityBox" Content="{Binding QuantityLabel}" />
<NumericUpDown x:Name="quantityBox" Value="{Binding Quantity}" />
```

```csharp
public string QuantityLabel => "Quantity";
```

## Building accessible forms

The `Label` control is a key building block for accessible forms. By pairing each input with a `Label` that has a `Target`, you give your users two ways to focus a field: clicking the label or pressing its access key. The following example shows a complete form layout:

```xml
<Grid ColumnDefinitions="Auto,*" RowDefinitions="Auto,Auto,Auto" Margin="8">
    <Label Grid.Row="0" Grid.Column="0" Target="firstNameBox" Content="_First name" Margin="0,0,8,4" />
    <TextBox Grid.Row="0" Grid.Column="1" x:Name="firstNameBox" />

    <Label Grid.Row="1" Grid.Column="0" Target="lastNameBox" Content="_Last name" Margin="0,0,8,4" />
    <TextBox Grid.Row="1" Grid.Column="1" x:Name="lastNameBox" />

    <Label Grid.Row="2" Grid.Column="0" Target="ageBox" Content="_Age" Margin="0,0,8,4" />
    <NumericUpDown Grid.Row="2" Grid.Column="1" x:Name="ageBox" />
</Grid>
```

## Label vs TextBlock

| Feature | `Label` | `TextBlock` |
|---|---|---|
| Focus transfer | Yes (via `Target`) | No |
| Access key support | Yes | No |
| Rich text formatting | No | Yes (via `Inlines`) |
| Typical use | Form field labels | Display text, paragraphs |

Use `Label` when you need accessibility and keyboard navigation in forms. Use `TextBlock` for general-purpose text display where focus transfer is not required.

## See also

- [TextBlock](textblock)
- [SelectableTextBlock](selectabletextblock)
- [Label API reference](/api/avalonia/controls/label)
- [`Label.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Label.cs)
