---
id: itemscontrol-how-to
title: "How to: Work with ItemsControl"
description: Customize collection layouts using ItemsControl
doc-type: how-to
---

This guide covers using [`ItemsControl`](/controls/data-display/collections/itemscontrol) to create custom collection layouts.

## `ItemsControl` vs. `ListBox`

Use `ItemsControl` when you need to display a small-to-medium collection without selection behavior. Use `ListBox` when you need a virtualized, selectable collection.

| Control | Selection | Virtualization | Best For |
|---|---|---|---|
| `ListBox` | Built-in | Yes | Selectable lists |
| `ItemsControl` | None | No (by default) | Custom layouts |

## `ItemsControl` basic usage

`ItemsControl` renders each item identically according to a data template. It does not provide selection, hover, or focus styling.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:vm="using:BasicItemsControl">
  <UserControl.DataContext>
    <vm:MainViewModel/>
  </UserControl.DataContext>
  <ItemsControl ItemsSource="{Binding Tags}">
    <ItemsControl.ItemTemplate>
      <DataTemplate>
        <Border Background="gray"
                CornerRadius="12"
                Padding="8,4"
                Margin="2"
                HorizontalAlignment="Left">
          <TextBlock Text="{Binding}" />
        </Border>
      </DataTemplate>
    </ItemsControl.ItemTemplate>
  </ItemsControl>
</UserControl>
```

```csharp
using System.Collections.ObjectModel;

namespace BasicItemsControl;

public class MainViewModel
{
    public ObservableCollection<string> Tags { get; set; } = new()
    {
        "avalonia",
        "xaml",
        "mvvm",
        "cross-platform"
    };
}
```

</XamlPreview>

### Custom panel

`ItemsControl` displays its content in an `ItemsPanel`, which is a layout control that defaults to `StackPanel`.

To change how items are arranged, you can replace the `StackPanel` with a different control. Use `ItemsPanelTemplate` to override the default, then add a layout control of your choice.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:vm="using:CustomItemsPanel">

  <UserControl.DataContext>
    <vm:MainViewModel/>
  </UserControl.DataContext>

  <ItemsControl ItemsSource="{Binding Tags}">
    <ItemsControl.ItemsPanel>
        <!-- Change to a WrapPanel to wrap items horizontally -->
        <ItemsPanelTemplate>
            <WrapPanel Orientation="Horizontal" />
        </ItemsPanelTemplate>
    </ItemsControl.ItemsPanel>
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <Border Background="gray"
                    CornerRadius="16" 
                    Padding="12,6"
                    Margin="4">
                <TextBlock Text="{Binding}" />
            </Border>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
  </ItemsControl>

</UserControl>
```

```csharp
using System.Collections.ObjectModel;

namespace CustomItemsPanel;

public class MainViewModel
{
    public ObservableCollection<string> Tags { get; set; } = new()
    {
        "avalonia",
        "xaml",
        "mvvm",
        "cross-platform"
    };
}
```

</XamlPreview>

### Horizontal layout

`StackPanel` arranges items in a vertical stack by default. To display items horizontally, customize the `ItemsPanelTemplate` as shown in the previous example and set `Orientation="Horizontal"`.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:vm="using:HorizontalLayout">
  <UserControl.DataContext>
    <vm:MainViewModel/>
  </UserControl.DataContext>

  <ItemsControl ItemsSource="{Binding Steps}">
    <ItemsControl.ItemsPanel>
      <ItemsPanelTemplate>
        <StackPanel Orientation="Horizontal" Spacing="16" />
      </ItemsPanelTemplate>
    </ItemsControl.ItemsPanel>
    <ItemsControl.ItemTemplate>
      <DataTemplate>
        <StackPanel Width="120">
          <Border Width="40" Height="40"
                  CornerRadius="20"
                  Background="#6366F1"
                  HorizontalAlignment="Center">
          <TextBlock Text="{Binding Number}"
                     Foreground="White"
                     HorizontalAlignment="Center"
                     VerticalAlignment="Center" />
          </Border>
          <TextBlock Text="{Binding Title}"
                     HorizontalAlignment="Center"
                     Margin="0,8,0,0" />
        </StackPanel>
      </DataTemplate>
    </ItemsControl.ItemTemplate>
  </ItemsControl>
</UserControl>
```

```csharp
using System.Collections.ObjectModel;

namespace HorizontalLayout;

public class Step
{
    public string Title { get; set; }
    public int Number { get; set; }

    public Step(string title, int number)
    {
        Title = title;
        Number = number;
    }
}

public class MainViewModel
{
    public ObservableCollection<Step> Steps { get; set; } = new()
    {
        new Step("Step 1", 1),
        new Step("Step 2", 2)
    };
}
```

</XamlPreview>

### Empty state

To show an empty state indicator when the collection is empty, wrap `ItemsControl` in a `Panel` and set a second control that becomes visible when there are no items in the collection.

In this example, a `TextBlock` is used to display a simple text message. Its `IsVisible` property is bound to the `ItemsControl.ItemCount` property, so the message only appears when `ItemCount` is zero.

```xml
<!-- Set a resource that converts string to int, so that ItemCount can compare correctly. -->
<Window.Resources>
  <x:Int32 x:Key="Zero">0</x:Int32>
</Window.Resources>

<!-- Only one of ItemsControl or TextBlock is ever displayed, so wrap everything in a Panel. -->
<Panel>

  <!-- Give the ItemsControl a name, so the TextBlock can refer to it. -->
  <ItemsControl x:Name="TagsList"
                ItemsSource="{Binding Tags}">
    <ItemsControl.ItemTemplate>
      <DataTemplate>
        <Border Background="gray"
                CornerRadius="12"
                Padding="8,4"
                Margin="2"
                HorizontalAlignment="Left">
          <TextBlock Text="{Binding}" />
        </Border>
      </DataTemplate>
    </ItemsControl.ItemTemplate>
  </ItemsControl>

  <!-- Use IsVisible to display the TextBlock when the TagsList ItemsControl has no items, as counted by the ItemCount property. -->
  <TextBlock Text="No tags"
             Margin="2"
             Opacity="0.6"
             HorizontalAlignment="Left"
             VerticalAlignment="Top"
             IsVisible="{Binding #TagsList.ItemCount,
                         Converter={x:Static ObjectConverters.Equal},
                         ConverterParameter={StaticResource Zero}}" />
</Panel>
```

### Virtualized scrollable items

To turn `ItemsControl` into a virtualized, scrollable display, you can wrap it in a [ScrollViewer](/controls/layout/containers/scrollviewer) and [customize the `ItemsPanel`](#custom-panel) into a [`VirtualizingStackPanel`](/api/avalonia/controls/virtualizingstackpanel).

The resulting control displays items similarly as a [`ListBox`](/controls/data-display/collections/listbox), but without selection behavior.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:vm="using:VirtualizingScrollingItems">
  <UserControl.DataContext>
    <vm:MainViewModel/>
  </UserControl.DataContext>

  <ScrollViewer>
    <ItemsControl ItemsSource="{Binding Tags}">
      <ItemsControl.ItemsPanel>
        <ItemsPanelTemplate>
          <VirtualizingStackPanel />
        </ItemsPanelTemplate>
      </ItemsControl.ItemsPanel>
      <ItemsControl.ItemTemplate>
        <DataTemplate>
          <Border Background="gray"
                  CornerRadius="12"
                  Padding="8,4"
                  Margin="2"
                  HorizontalAlignment="Left">
            <TextBlock Text="{Binding}" />
          </Border>
        </DataTemplate>
      </ItemsControl.ItemTemplate>
    </ItemsControl>
  </ScrollViewer>
</UserControl>
```

```csharp
using System.Collections.ObjectModel;

namespace VirtualizingScrollingItems;

public class MainViewModel
{
    public ObservableCollection<string> Tags { get; set; } = new()
    {
        "apples",
        "oranges",
        "bananas",
        "pears",
        "mangoes",
        "guavas",
        "grapes",
        "dragonfruits",
        "lemons",
        "limes",
        "kiwis",
        "watermelons",
        "strawberries",
        "blueberries",
        "cherries",
        "passionfruits",
        "peaches",
        "plums",
        "figs",
        "kumquats",
    };
}
```

</XamlPreview>

## Customizing containers with `PreparingContainer`

The `PreparingContainer` event fires each time `ItemsControl` creates or recycles a container for a data item. Use it to apply per-item customizations, such as conditional styling based on item data:

```csharp
myItemsControl.PreparingContainer += (sender, e) =>
{
    if (e.Item is TodoItem todo && todo.IsOverdue)
    {
        e.Container.Classes.Add("overdue");
    }
};
```

The companion `ContainerClearing` event fires when a container is removed. Use this event to clean up customizations, if required.

## Performance tips

- Avoid using `WrapPanel` as the `ItemsPanel` for large collections, as it does not virtualize.
- Keep item templates lightweight. Complex templates slow down scrolling.

For more general tips on optimizing performance, see [Performance](/docs/app-development/performance).

## See also

- [ItemsControl](/controls/data-display/collections/itemscontrol)
- [ItemsControl API reference](/api/avalonia/controls/itemscontrol)
- [Data Templates](/docs/data-templates/introduction-to-data-templates): How templates work.
- [ListBox How-To](/docs/how-to/listbox-how-to): When selection behavior is needed.
