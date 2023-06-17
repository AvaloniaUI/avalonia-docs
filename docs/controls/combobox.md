---
id: combobox
title: ComboBox
---

# ComboBox

## Common Properties

| Property | Description |
| :--- | :--- |
| `SelectedIndex` | Gets or sets the index of the selected item. |
| `SelectedItem` | Gets or sets the selected item. |
| `AutoScrollToSelectedItem` | Gets or sets a value indicating whether to automatically scroll to newly selected items. |
| `IsDropDownOpen` | Gets or sets a value indicating whether the dropdown is currently open. |
| `MaxDropDownHeight` | Gets or sets the maximum height for the dropdown list. |

## Reference

[ComboBox](http://reference.avaloniaui.net/api/Avalonia.Controls/ComboBox/)

## Source code

[ComboBox.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ComboBox.cs)

## Examples <a id="examples"></a>

### Basic ComboBox <a id="basic-combobox"></a>

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
    <StackPanel>
        <ComboBox SelectedIndex="0">
            <ComboBoxItem>Inline Items</ComboBoxItem>
            <ComboBoxItem>Inline Item 2</ComboBoxItem>
            <ComboBoxItem>Inline Item 3</ComboBoxItem>
            <ComboBoxItem>Inline Item 4</ComboBoxItem>
        </ComboBox>
    </StackPanel>
</Window>
```

### ComboBox with custom item templates <a id="combobox-with-custom-item-templates"></a>

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
    <StackPanel>
        <ComboBox SelectedIndex="0">
            <ComboBoxItem>
                <Panel>
                    <Rectangle Fill="{DynamicResource ThemeAccentBrush}"/>
                    <TextBlock Margin="8">Control Items</TextBlock>
                </Panel>
            </ComboBoxItem>
            <ComboBoxItem>
                <Ellipse Width="50" Height="50" Fill="Yellow"/>
            </ComboBoxItem>
            <ComboBoxItem>
                <TextBox Text="TextBox"/>
            </ComboBoxItem>
      </ComboBox>
    </StackPanel>
</Window>
```

### ComboBox with binding <a id="combobox-with-binding"></a>

This example binds the fonts installed to a ComboBox

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
    <StackPanel>
        <ComboBox x:Name="fontComboBox"  SelectedIndex="0">
            <ComboBox.ItemTemplate>
                <DataTemplate>
                    <TextBlock Text="{Binding Name}" FontFamily="{Binding}" />
                </DataTemplate>
            </ComboBox.ItemTemplate>
       </ComboBox>
    </StackPanel>
</Window>
```

With this code behind:

```csharp
var fontComboBox = this.Find<ComboBox>("fontComboBox");
fontComboBox.Items = FontManager.Current.GetInstalledFontFamilyNames().Select(x => new FontFamily(x));
fontComboBox.SelectedIndex = 0;
```
