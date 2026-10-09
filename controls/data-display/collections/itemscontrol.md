---
id: itemscontrol
title: ItemsControl
description: A reference for the ItemsControl in Avalonia, a base control for displaying repeating data with full control over layout and item appearance.
doc-type: reference
---

`ItemsControl` is the base class for controls that display repeating data, like [`ListBox`](/controls/data-display/collections/listbox) or [`ComboBox`](/controls/input/selectors/combobox). It has no built-in formatting, selection, or scroll behavior.

You can use it with data binding, styling and data templates to create a completely custom repeating data control.

## Useful properties

You will probably use these properties most often:

| Property | Description |
|---|---|
| `ItemsSource` | The bound collection that is used as the data source for the control. |
| `ItemTemplate` | A `DataTemplate` that controls how each individual item looks. |
| `ItemsPanel` | The panel that hosts generated items. Defaults to `StackPanel`. See [Custom panel](/docs/how-to/itemscontrol-how-to#custom-panel) for how to change to another panel. |
| `Styles` | Styles applied to child elements of the `ItemsControl`. |
| `DisplayMemberBinding` | A binding that selects the property to display when you do not supply an `ItemTemplate`. |

## Practical notes

- **Use `ObservableCollection<T>`** for your `ItemsSource` if you need the UI to update automatically when you add or remove items at runtime. A plain `List<T>` will not update the control when changed.
- `ItemsControl` **does not virtualize** by default. If you are working with a large number of items, use a [`ListBox`](/controls/data-display/collections/listbox), which virtualizes by default, or [customize the `ItemsPanel` into a virtualizing control](/docs/how-to/itemscontrol-how-to#virtualized-scrollable-items).
- `ItemsControl` **does not have a scrollbar**. Content that overflows the available height is clipped. Wrap your `ItemsControl` in a [`ScrollViewer`](/controls/layout/containers/scrollviewer) if you need scrolling.
- To **arrange items horizontally** instead of vertically, [replace the default `ItemsPanel`](/docs/how-to/itemscontrol-how-to#horizontal-layout).
- **`ItemsRepeater` is no longer supported** as of Avalonia v12. If you use that control in your app, upgrading to `ItemsControl` or one of its derivatives is recommended.

## Example

This example binds an observable collection of crockery items to an `ItemsControl`. Layout and formatting of each item is specified by the `DataTemplate` nested under `ItemsControl.ItemTemplate`.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:vm="using:MyApp">
  <UserControl.DataContext>
    <vm:MainViewModel/>
  </UserControl.DataContext>
  <StackPanel Margin="20">
    <TextBlock Margin="0 5">List of crockery:</TextBlock>
    <ItemsControl ItemsSource="{Binding CrockeryList}">
      <ItemsControl.ItemTemplate>
        <DataTemplate>
          <Border Margin="0,10,0,0"
                  CornerRadius="5"
                  BorderBrush="Gray" BorderThickness="1"
                  Padding="5">
            <StackPanel Orientation="Horizontal">
              <TextBlock Text="{Binding Title}" />
              <TextBlock Margin="5 0" FontWeight="Bold"
                         Text="{Binding Number}" />
            </StackPanel>
          </Border>
        </DataTemplate>
      </ItemsControl.ItemTemplate>
    </ItemsControl>
  </StackPanel>
</UserControl>
```

```csharp
using System.Collections.ObjectModel;

namespace MyApp;

public class Crockery
{
    public string Title { get; set; }
    public int Number { get; set; }

    public Crockery(string title, int number)
    {
        Title = title;
        Number = number;
    }
}

public class MainViewModel
{
    public ObservableCollection<Crockery> CrockeryList { get; set; } = new()
    {
        new Crockery("dinner plate", 12),
        new Crockery("side plate", 12),
        new Crockery("breakfast bowl", 6),
        new Crockery("cup", 10),
        new Crockery("saucer", 10),
        new Crockery("mug", 6),
        new Crockery("milk jug", 1)
    };
}
```

</XamlPreview>

## See also

- [How to: Work with ItemsControl](/docs/how-to/itemscontrol-how-to)
- [ListBox](/controls/data-display/collections/listbox)
- [Carousel](/controls/data-display/collections/carousel)
- [DataGrid](/controls/data-display/structured-data/datagrid)
- [Data templates](/docs/data-templates/introduction-to-data-templates)
- [ItemsControl API reference](/api/avalonia/controls/itemscontrol)
- [`ItemsControl.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ItemsControl.cs)

