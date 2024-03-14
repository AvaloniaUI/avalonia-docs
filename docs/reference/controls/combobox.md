---
title: ComboBox
description: REFERENCE - Built-in Control
---

import ComboBoxMaxDropDownHeightScreenshot from '/img/reference/controls/combobox/combobox-maxdropdownheight.gif';
import ComboBoxComplexContentScreenshot from '/img/reference/controls/combobox/combobox-complex-content.gif';
import ComboBoxDataTemplateScreenshot from '/img/reference/controls/combobox/combobox-data-template.gif';

# ComboBox

The `ComboBox` presents a selected item and a drop-down button that displays a list of options. The length and height of the combo box are determined by the selected item, unless otherwise defined.

The items in the list can be composed, bound and templated.

:::info
To review the concept behind **data templates**, see [here](../../concepts/templates/).
:::

## Useful Properties

You will probably use these properties most often:

| Property                   | Description                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `Items`                    | The list items collection.                                                                                               |
| `SelectedIndex`            | The index (zero-based) of the selected item.                                                                             |
| `SelectedItem`             | The selected item itself.                                                                                                |
| `SelectedItems`            | A collection of selected items that has more than one item when selection mode is set to multiple.                       |
| `AutoScrollToSelectedItem` | Indicates whether to automatically scroll to newly selected items.                                                       |
| `IsDropDownOpen`           | Indicates whether the dropdown is currently open.                                                                        |
| `MaxDropDownHeight`        | The maximum height for the dropdown list. This is the actual height of the list part, not the number of items that show. |
| `ItemPanel`                | The container panel to place items in. By default, this is a StackPanel. See [this page](../../concepts/custom-itemspanel) to customise the ItemsPanel.|
| `Styles`                   | The style that is applied to any child element of the ItemControl.                                                       |

## Examples

This is basic example with text items has a limit set on the drop-down list height.

```xml
<StackPanel Margin="20">
  <ComboBox SelectedIndex="0" MaxDropDownHeight="100">
    <ComboBoxItem>Text Item 1</ComboBoxItem>
    <ComboBoxItem>Text Item 2</ComboBoxItem>
    <ComboBoxItem>Text Item 3</ComboBoxItem>
    <ComboBoxItem>Text Item 4</ComboBoxItem>
    <ComboBoxItem>Text Item 5</ComboBoxItem>
    <ComboBoxItem>Text Item 6</ComboBoxItem>
    <ComboBoxItem>Text Item 7</ComboBoxItem>
    <ComboBoxItem>Text Item 8</ComboBoxItem>
    <ComboBoxItem>Text Item 9</ComboBoxItem>
  </ComboBox>
</StackPanel>
```

<img src={ComboBoxMaxDropDownHeightScreenshot} alt="" />

This example uses a composed view for each item:

```xml
<StackPanel Margin="20">
  <ComboBox SelectedIndex="0">
    <ComboBoxItem>
      <Panel>
        <Ellipse Width="50" Height="50" Fill="Red"/>
        <TextBlock VerticalAlignment="Center"
                    HorizontalAlignment="Center">Red</TextBlock>
      </Panel>
    </ComboBoxItem>
    <ComboBoxItem>
        <Panel>
          <Ellipse Width="50" Height="50" Fill="Orange"/>
          <TextBlock VerticalAlignment="Center" 
                      HorizontalAlignment="Center">Amber</TextBlock>
        </Panel>
    </ComboBoxItem>
    <ComboBoxItem>
      <Panel>
        <Ellipse Width="50" Height="50" Fill="Green"/>
        <TextBlock VerticalAlignment="Center"
                    HorizontalAlignment="Center">Green</TextBlock>
      </Panel>
    </ComboBoxItem>
  </ComboBox>
</StackPanel>
```

<img src={ComboBoxComplexContentScreenshot} alt="" />

This example binds the items in a combo box using a data template. The C# code-behind loads the installed font family names and binds them to the items property.

```xml
<StackPanel Margin="20">
  <ComboBox x:Name="fontComboBox" SelectedIndex="0"
            Width="200" MaxDropDownHeight="300">
    <ComboBox.ItemTemplate>
      <DataTemplate>
        <TextBlock Text="{Binding Name}" FontFamily="{Binding}" />
      </DataTemplate>
    </ComboBox.ItemTemplate>
  </ComboBox>
</StackPanel>
```

```csharp title='C#'
using Avalonia.Controls;
using Avalonia.Media;
using System.Linq;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();            
            fontComboBox.Items = FontManager.Current
                .GetInstalledFontFamilyNames()
                .Select(x => new FontFamily(x))
                .OrderBy(x=>x.Name);
            fontComboBox.SelectedIndex = 0;
        }
    }
}
```

<img src={ComboBoxDataTemplateScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/ComboBox/).
:::

:::info
View the source code on _GitHub_ [`ComboBox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ComboBox.cs)
:::
