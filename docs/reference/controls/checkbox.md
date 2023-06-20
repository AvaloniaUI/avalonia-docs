---
description: REFERENCE - Built-in Control
---

# Check Box

The check box control presents a Boolean value where the true value is represented using a check mark, and the false value is an empty box. The check box has an option to present a nullable Boolean, where the null value represents 'unknown' and is drawn as a shaded box.

Click interaction toggles the value in the sequence: checked, unchecked, unknown (if three-state).

## Useful Properties

You will probably use these properties most often:

| Property       | Description                          |
| -------------- | ------------------------------------ |
| `IsChecked`    | Sets the Boolean value.              |
| `IsThreeState` | (Boolean) Sets the three state mode. |

## Examples

This is an example of two-state check boxes:

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="CheckBox sample">
    <StackPanel Margin="20">
        <CheckBox>Not checked by default</CheckBox>
        <CheckBox IsChecked="True">Checked by default</CheckBox>
    </StackPanel>
</Window>
```

Looks like this when running on Windows:

<!--figure><img src="../../.gitbook/assets/checkbox1.gif" alt=""><figcaption></figcaption></figure-->

This is an example of a three-state checkbox:

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="CheckBox sample">
    <StackPanel Margin="20">
        <CheckBox IsThreeState="True" IsChecked="False">Not checked by default</CheckBox>
        <CheckBox IsThreeState="True" IsChecked="True">Checked by default</CheckBox>
        <CheckBox IsThreeState="True" IsChecked="{x:Null}">Unknown by default</CheckBox>
    </StackPanel>
</Window>
```

Looks like this when running on Windows:

<!--figure><img src="../../.gitbook/assets/checkbox2.gif" alt=""><figcaption></figcaption></figure-->

## More Information

For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/CheckBox/).

View the source code on _GitHub_ [`CheckBox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/CheckBox.cs)
