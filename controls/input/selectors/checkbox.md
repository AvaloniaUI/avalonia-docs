---
id: checkbox
title: CheckBox
---

import CheckBoxTwoStateScreenshot from '/img/reference/controls/checkbox/checkbox-two-state.gif';
import CheckBoxThreeStateScreenshot from '/img/reference/controls/checkbox/checkbox-three-state.gif';

The `CheckBox` control presents a Boolean value where the true value is represented using a check mark, and the false value is an empty box. The check box has an option to present a nullable Boolean, where the null value represents 'unknown' and is drawn as a shaded box.

Click interaction toggles the value in the sequence: checked, unchecked, unknown (if three-state).

## Useful properties

You will probably use these properties most often:

| Property       | Description                          |
| -------------- | ------------------------------------ |
| `IsChecked`    | Sets the Boolean value.              |
| `IsThreeState` | (Boolean) Sets the three state mode. |

## Examples

This is an example of two-state check boxes:

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
    <StackPanel Margin="20">
        <CheckBox>Not checked by default</CheckBox>
        <CheckBox IsChecked="True">Checked by default</CheckBox>
    </StackPanel>
</UserControl>
```

</XamlPreview>

This is an example of a three-state checkbox:

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <StackPanel Margin="20">
        <CheckBox IsThreeState="True" IsChecked="False">Not checked by default</CheckBox>
        <CheckBox IsThreeState="True" IsChecked="True">Checked by default</CheckBox>
        <CheckBox IsThreeState="True" IsChecked="{x:Null}">Unknown by default</CheckBox>
    </StackPanel>
</UserControl>
```
</XamlPreview>

## Binding to a View Model

```csharp
public partial class SettingsViewModel : ObservableObject
{
    [ObservableProperty]
    private bool _autoSave = true;

    [ObservableProperty]
    private bool _showLineNumbers;
}
```

```xml
<StackPanel Spacing="8">
    <CheckBox IsChecked="{Binding AutoSave}" Content="Auto-save on exit" />
    <CheckBox IsChecked="{Binding ShowLineNumbers}" Content="Show line numbers" />
</StackPanel>
```

## CheckBox List from a Collection

Create a list of checkable items by combining a `ListBox` with `CheckBox` items:

```xml
<ItemsControl ItemsSource="{Binding Features}">
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <CheckBox IsChecked="{Binding IsEnabled}" Content="{Binding Name}" />
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

## Select All Pattern

Use a three-state checkbox to represent the state of a group:

```csharp
[ObservableProperty]
private bool? _selectAll = false;

partial void OnSelectAllChanged(bool? value)
{
    if (value.HasValue)
    {
        foreach (var item in Items)
            item.IsSelected = value.Value;
    }
}
```

## See also

- [CheckBox API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_CheckBox)
- [`CheckBox.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/CheckBox.cs)
