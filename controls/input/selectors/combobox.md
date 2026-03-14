---
id: combobox
title: ComboBox
description: A drop-down selector that lets users pick a single item from a list, with optional editable text input and placeholder support.
doc-type: reference
---

import ComboBoxDataTemplateScreenshot from '/img/controls/combobox/combobox-data-template.gif';

The `ComboBox` presents a selected item and a drop-down button that displays a list of options. The length and height of the combo box are determined by the selected item, unless you define them explicitly.

You can compose, bind, and template the items in the list.

:::info
To review the concept behind **data templates**, see [Introduction to data templates](/docs/data-templates/introduction-to-data-templates).
:::

## Useful properties

You will probably use these properties most often:

| Property                   | Type       | Description                                                                                                              |
| -------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| `Items`                    | `IEnumerable` | The list items collection.                                                                                            |
| `SelectedIndex`            | `int`      | The index (zero-based) of the selected item.                                                                             |
| `SelectedItem`             | `object?`  | The selected item itself.                                                                                                |
| `SelectedValue`            | `object?`  | The value of the selected item, determined by `SelectedValueBinding`.                                                    |
| `IsEditable`               | `bool`     | Enables text editing, allowing you to type into the combo box to filter or enter custom values.                           |
| `Text`                     | `string?`  | Gets or sets the text value when `IsEditable` is `true`.                                                                 |
| `PlaceholderText`          | `string?`  | Text shown when no item is selected.                                                                                     |
| `AutoScrollToSelectedItem` | `bool`     | Indicates whether to automatically scroll to newly selected items.                                                       |
| `IsDropDownOpen`           | `bool`     | Indicates whether the dropdown is currently open.                                                                        |
| `MaxDropDownHeight`        | `double`   | The maximum height for the dropdown list. This is the actual height of the list part, not the number of items that show.  |
| `ItemPanel`                | `ITemplate<Panel>` | The container panel to place items in. By default, this is a `StackPanel`. See [this page](/docs/custom-controls/custom-itemspanel) to customise the `ItemPanel`. |

## Practical notes

- Always set `SelectedIndex` or `SelectedItem` to an initial value when you want the control to display a selection on load. If neither is set and you have not provided `PlaceholderText`, the control appears blank.
- When you bind `ItemsSource` to a collection of complex objects, provide an `ItemTemplate` so the control knows how to render each item. Without a template, the control calls `ToString()` on each object.
- Use `PlaceholderText` to give your users a hint (for example, "Select a category...") when nothing is selected yet.
- If you need to clear the selection programmatically, set `SelectedIndex` to `-1` or `SelectedItem` to `null`.
- The `SelectionChanged` event fires whenever the selected item changes, which is useful for running side-effect logic outside the view model.

## Examples

This basic example with text items has a limit set on the drop-down list height.

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

This example binds the items in a combo box using a data template. The C# code-behind loads the installed font family names and binds them to the `ItemsSource` property.

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

<img src={ComboBoxDataTemplateScreenshot} alt="ComboBox with data template showing font families" />

## Binding to a view model

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

## Editable ComboBox

Set `IsEditable` to `true` to allow you to type text directly into the combo box. As you type, the control searches the items for a match and updates `SelectedItem` accordingly. The `Text` property holds the current text value.

```xml
<ComboBox IsEditable="True"
          Text="{Binding SearchText}"
          ItemsSource="{Binding Countries}"
          SelectedItem="{Binding SelectedCountry}"
          PlaceholderText="Type a country..." />
```

### `TextSearch.TextBinding`

When items are complex objects, use `TextSearch.TextBinding` to specify which property the editable text should match against:

```xml
<ComboBox IsEditable="True"
          ItemsSource="{Binding People}"
          SelectedItem="{Binding SelectedPerson}"
          TextSearch.TextBinding="{Binding FullName}">
    <ComboBox.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding FullName}" />
        </DataTemplate>
    </ComboBox.ItemTemplate>
</ComboBox>
```

## Placeholder text

Show placeholder text when no item is selected:

```xml
<ComboBox PlaceholderText="Choose an option..."
          ItemsSource="{Binding Options}"
          SelectedItem="{Binding SelectedOption}" />
```

## See also

- [ListBox](../../data-display/collections/listbox)
- [AutoCompleteBox](../text-input/autocompletebox)
- [RadioButton](../buttons/radiobutton)
- [Data templates](/docs/data-templates/introduction-to-data-templates)
- [ComboBox API reference](/api/avalonia/controls/combobox)
- [`ComboBox.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ComboBox.cs)
