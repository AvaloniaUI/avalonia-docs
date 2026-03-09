---
id: itemscontrol-how-to
title: "How to: Work with ItemsControl and ItemsRepeater"
description: Custom collection layouts with ItemsControl and ItemsRepeater beyond what ListBox offers.
doc-type: how-to
---

This guide covers using [`ItemsControl`](/api/avalonia/controls/itemscontrol) and `ItemsRepeater` for custom collection layouts that go beyond what [`ListBox`](/api/avalonia/controls/listbox) offers.

## When to Use Each Control

| Control | Selection | Virtualization | Best For |
|---|---|---|---|
| `ListBox` | Built-in | Yes | Selectable lists |
| `ItemsControl` | None | No (by default) | Small collections, custom layouts |
| `ItemsRepeater` | None | Yes | Large collections, custom layouts, performance |

Use `ItemsControl` when you need to display a collection without selection behavior. Use `ItemsRepeater` when you also need virtualization for large data sets.

## ItemsControl Basics

`ItemsControl` renders each item using a data template, with no selection, hover, or focus styling:

```xml
<ItemsControl ItemsSource="{Binding Tags}">
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <Border Background="#E0E0E0" CornerRadius="12" Padding="8,4" Margin="2">
                <TextBlock Text="{Binding}" />
            </Border>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

### Custom panel

Change how items are arranged using `ItemsPanel`:

```xml
<!-- Wrap items horizontally -->
<ItemsControl ItemsSource="{Binding Tags}">
    <ItemsControl.ItemsPanel>
        <ItemsPanelTemplate>
            <WrapPanel Orientation="Horizontal" />
        </ItemsPanelTemplate>
    </ItemsControl.ItemsPanel>
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <Border Background="#E8E8E8" CornerRadius="16" Padding="12,6" Margin="4">
                <TextBlock Text="{Binding Name}" />
            </Border>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

### Horizontal layout

```xml
<ItemsControl ItemsSource="{Binding Steps}">
    <ItemsControl.ItemsPanel>
        <ItemsPanelTemplate>
            <StackPanel Orientation="Horizontal" Spacing="16" />
        </ItemsPanelTemplate>
    </ItemsControl.ItemsPanel>
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <StackPanel Width="120">
                <Border Width="40" Height="40" CornerRadius="20"
                        Background="#6366F1" HorizontalAlignment="Center">
                    <TextBlock Text="{Binding Number}" Foreground="White"
                               HorizontalAlignment="Center" VerticalAlignment="Center" />
                </Border>
                <TextBlock Text="{Binding Title}" HorizontalAlignment="Center"
                           Margin="0,8,0,0" />
            </StackPanel>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

## ItemsRepeater

`ItemsRepeater` is a lower-level control designed for performance. It supports virtualization and custom layout algorithms.

### Basic usage

`ItemsRepeater` must be placed inside a `ScrollViewer` for scrolling support:

```xml
<ScrollViewer>
    <ItemsRepeater ItemsSource="{Binding Items}">
        <ItemsRepeater.ItemTemplate>
            <DataTemplate>
                <Border Padding="8" Margin="0,0,0,4"
                        BorderBrush="#E0E0E0" BorderThickness="0,0,0,1">
                    <TextBlock Text="{Binding Title}" />
                </Border>
            </DataTemplate>
        </ItemsRepeater.ItemTemplate>
    </ItemsRepeater>
</ScrollViewer>
```

### Stack layout

The default layout stacks items vertically. Configure spacing:

```xml
<ItemsRepeater ItemsSource="{Binding Items}">
    <ItemsRepeater.Layout>
        <StackLayout Spacing="8" Orientation="Vertical" />
    </ItemsRepeater.Layout>
    <ItemsRepeater.ItemTemplate>
        <DataTemplate>
            <Border Background="#F5F5F5" CornerRadius="4" Padding="12">
                <TextBlock Text="{Binding}" />
            </Border>
        </DataTemplate>
    </ItemsRepeater.ItemTemplate>
</ItemsRepeater>
```

### Horizontal stack

```xml
<ScrollViewer HorizontalScrollBarVisibility="Auto"
              VerticalScrollBarVisibility="Disabled">
    <ItemsRepeater ItemsSource="{Binding Cards}">
        <ItemsRepeater.Layout>
            <StackLayout Spacing="12" Orientation="Horizontal" />
        </ItemsRepeater.Layout>
        <ItemsRepeater.ItemTemplate>
            <DataTemplate>
                <Border Width="200" Height="150" Background="#6366F1"
                        CornerRadius="8" Padding="16">
                    <TextBlock Text="{Binding Title}" Foreground="White" />
                </Border>
            </DataTemplate>
        </ItemsRepeater.ItemTemplate>
    </ItemsRepeater>
</ScrollViewer>
```

### Wrap layout (UniformGridLayout)

Display items in a responsive grid that wraps:

```xml
<ScrollViewer>
    <ItemsRepeater ItemsSource="{Binding Photos}">
        <ItemsRepeater.Layout>
            <UniformGridLayout MinItemWidth="150" MinItemHeight="150"
                               MinRowSpacing="8" MinColumnSpacing="8" />
        </ItemsRepeater.Layout>
        <ItemsRepeater.ItemTemplate>
            <DataTemplate>
                <Border CornerRadius="4" ClipToBounds="True">
                    <Image Source="{Binding Thumbnail}" Stretch="UniformToFill" />
                </Border>
            </DataTemplate>
        </ItemsRepeater.ItemTemplate>
    </ItemsRepeater>
</ScrollViewer>
```

`UniformGridLayout` automatically calculates the number of columns based on the available width and `MinItemWidth`.

## Adding Click Handling to ItemsRepeater

Since `ItemsRepeater` has no built-in selection, add click handling with a Button or Tapped event:

```xml
<ItemsRepeater ItemsSource="{Binding Items}">
    <ItemsRepeater.ItemTemplate>
        <DataTemplate>
            <Button Command="{Binding $parent[ItemsRepeater].((vm:MainViewModel)DataContext).SelectCommand}"
                    CommandParameter="{Binding}"
                    HorizontalAlignment="Stretch"
                    HorizontalContentAlignment="Stretch"
                    Background="Transparent" BorderThickness="0" Padding="0">
                <Border Padding="12" Background="#F8F8F8" CornerRadius="4">
                    <TextBlock Text="{Binding Name}" />
                </Border>
            </Button>
        </DataTemplate>
    </ItemsRepeater.ItemTemplate>
</ItemsRepeater>
```

## Empty State

Show a placeholder when the collection is empty:

```xml
<Panel>
    <ScrollViewer>
        <ItemsRepeater ItemsSource="{Binding Items}"
                       IsVisible="{Binding Items.Count}">
            <!-- item template -->
        </ItemsRepeater>
    </ScrollViewer>

    <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center"
                IsVisible="{Binding !Items.Count}" Spacing="8">
        <PathIcon Data="{StaticResource EmptyIcon}" Width="48" Height="48"
                  Foreground="Gray" />
        <TextBlock Text="No items yet" Foreground="Gray" />
    </StackPanel>
</Panel>
```

## Customizing Containers with PreparingContainer

The `PreparingContainer` event fires each time an `ItemsControl` creates or recycles a container for a data item. Use it to apply per-item customizations that cannot be expressed through a `DataTemplate` alone, such as conditional styling based on item data:

```csharp
myItemsControl.PreparingContainer += (sender, e) =>
{
    if (e.Item is TodoItem todo && todo.IsOverdue)
    {
        e.Container.Classes.Add("overdue");
    }
};
```

The companion `ClearingContainer` event fires when a container is being recycled or removed, allowing you to clean up any customizations.

## Performance Tips

- Use `ItemsRepeater` with `StackLayout` or `UniformGridLayout` for automatic virtualization.
- Avoid `WrapPanel` in `ItemsControl.ItemsPanel` for large collections as it does not virtualize.
- Keep item templates lightweight. Complex templates slow down scrolling.
- For very large collections (10,000+ items), prefer `ItemsRepeater` over `ListBox`.

## See Also

- [Performance](/docs/app-development/performance): Virtualization and collection performance.
- [Data Templates](/docs/data-templates/introduction-to-data-templates): How templates work.
- [ListBox How-To](/docs/how-to/listbox-how-to): When selection behavior is needed.
