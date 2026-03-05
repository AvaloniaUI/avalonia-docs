---
id: combobox
title: ComboBox
---

import ComboBoxDataTemplateScreenshot from '/img/controls/combobox/combobox-data-template.gif';

The `ComboBox` presents a selected item and a drop-down button that displays a list of options. The length and height of the combo box are determined by the selected item, unless otherwise defined.

The items in the list can be composed, bound and templated.

:::info
To review the concept behind **data templates**, see [Introduction to data templates](/docs/data-templates/introduction-to-data-templates).
:::

## Useful properties

You will probably use these properties most often:

| Property                   | Description                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `Items`                    | The list items collection.                                                                                               |
| `SelectedIndex`            | The index (zero-based) of the selected item.                                                                             |
| `SelectedItem`             | The selected item itself.                                                                                                |
| `AutoScrollToSelectedItem` | Indicates whether to automatically scroll to newly selected items.                                                       |
| `IsDropDownOpen`           | Indicates whether the dropdown is currently open.                                                                        |
| `MaxDropDownHeight`        | The maximum height for the dropdown list. This is the actual height of the list part, not the number of items that show. |
| `ItemPanel`                | The container panel to place items in. By default, this is a StackPanel. See [this page](/docs/custom-controls/custom-itemspanel) to customise the ItemsPanel.|
| `Styles`                   | The style that is applied to any child element of the ItemControl.                                                       |

## Examples

This is basic example with text items has a limit set on the drop-down list height.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
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
</UserControl>
```

</XamlPreview>

This example uses a composed view for each item:

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
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
</UserControl>
```

</XamlPreview>

This example binds the items in a combo box using a data template. The C# code-behind loads the installed font family names and binds them to the items property.

```xml
<StackPanel Margin="20">
  <ComboBox x:Name="fontComboBox" SelectedIndex="0"
            Width="200" MaxDropDownHeight="300"
            ItemsSource="{Binding FontFamilies}"
            SelectedValue="{Binding SelectedFont}">
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
using Avalonia.Media.Fonts;
using System.Collections.Generic;
using System.Linq;

namespace TmpAvaloniaApp;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        IFontCollection fontCollection = FontManager.Current.SystemFonts;
        FontFamilies = new List<FontFamily>(fontCollection).OrderBy(x=>x.Name).ToList();
        DataContext = this;
    }

    public FontFamily? SelectedFont { get; set; }

    public List<FontFamily> FontFamilies { get; set; }
}
```

<img src={ComboBoxDataTemplateScreenshot} alt="" />

## Binding to a View Model

Bind `ItemsSource`, `SelectedItem`, and use an `ItemTemplate`:

```csharp
public partial class MainViewModel : ObservableObject
{
    public ObservableCollection<string> Categories { get; } = new()
    {
        "Electronics", "Clothing", "Books", "Food"
    };

    [ObservableProperty]
    private string? _selectedCategory;
}
```

```xml
<ComboBox ItemsSource="{Binding Categories}"
          SelectedItem="{Binding SelectedCategory}"
          PlaceholderText="Select a category" />
```

## PlaceholderText

Show placeholder text when no item is selected:

```xml
<ComboBox PlaceholderText="Choose an option..."
          ItemsSource="{Binding Options}"
          SelectedItem="{Binding SelectedOption}" />
```

## See also

- [ComboBox API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_ComboBox)
- [`ComboBox.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ComboBox.cs)
