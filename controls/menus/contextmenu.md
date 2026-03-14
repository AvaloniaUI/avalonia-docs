---
id: contextmenu
title: ContextMenu
description: A popup menu that appears when the user right-clicks a control, providing contextual actions.
doc-type: reference
---

A [`ContextMenu`](/api/avalonia/controls/contextmenu) is a popup menu that appears when you right-click a control. It provides contextual actions relevant to the control or its content. You attach a `ContextMenu` to any host control using an attached property, so any visual element in your application can have its own right-click menu.

:::info
To learn more about how attached properties work, see [Attached properties](/docs/custom-controls/attached-properties).
:::

## Basic example

In this example, a context menu is attached to a multi-line text box. Right-click in the preview area to see the context menu.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
  <TextBox AcceptsReturn="True" TextWrapping="Wrap" Text="Right-click here">
    <TextBox.ContextMenu>
      <ContextMenu>
        <MenuItem Header="Copy"/>
        <MenuItem Header="Paste"/>
      </ContextMenu>
    </TextBox.ContextMenu>
  </TextBox>
</UserControl>
```

</XamlPreview>

## Commands and icons

You can bind menu items to commands and add icons to create a full-featured context menu:

```xml
<ListBox ItemsSource="{Binding Items}">
    <ListBox.ContextMenu>
        <ContextMenu>
            <MenuItem Header="Edit" Command="{Binding EditCommand}">
                <MenuItem.Icon>
                    <PathIcon Data="{StaticResource edit_regular}" />
                </MenuItem.Icon>
            </MenuItem>
            <MenuItem Header="Delete" Command="{Binding DeleteCommand}">
                <MenuItem.Icon>
                    <PathIcon Data="{StaticResource delete_regular}" />
                </MenuItem.Icon>
            </MenuItem>
            <Separator />
            <MenuItem Header="Properties" Command="{Binding PropertiesCommand}" />
        </ContextMenu>
    </ListBox.ContextMenu>
</ListBox>
```

Use `Separator` elements to group related menu items visually.

## Passing context to commands

Use `CommandParameter` to pass the relevant data item to your command. This is especially useful when the context menu is attached to a list or collection control and you need to know which item was right-clicked:

```xml
<ListBox.ContextMenu>
    <ContextMenu>
        <MenuItem Header="Delete"
                  Command="{Binding DeleteCommand}"
                  CommandParameter="{Binding $parent[ListBox].SelectedItem}" />
    </ContextMenu>
</ListBox.ContextMenu>
```

The `$parent[ListBox].SelectedItem` binding walks up the visual tree to find the parent `ListBox` and reads its `SelectedItem` property.

## Dynamically building menu items

If your context menu items depend on runtime data, you can bind `ItemsSource` to a collection in your view model:

```xml
<TextBlock Text="Right-click me">
    <TextBlock.ContextMenu>
        <ContextMenu ItemsSource="{Binding ContextActions}" />
    </TextBlock.ContextMenu>
</TextBlock>
```

Each item in the bound collection becomes a `MenuItem`. You can use a `DataTemplate` or an `ItemContainerTheme` to control how items are displayed.

## Handling opening and closing

You can respond to the context menu lifecycle by handling the `Opening` and `Closing` events. The `Opening` event provides a `CancelEventArgs` argument, so you can prevent the menu from appearing when certain conditions are not met:

```csharp
private void ContextMenu_Opening(object? sender, System.ComponentModel.CancelEventArgs e)
{
    if (!IsActionAllowed)
    {
        e.Cancel = true; // Prevents the context menu from opening
    }
}
```

```xml
<ContextMenu Opening="ContextMenu_Opening" Closing="ContextMenu_Closing">
    <MenuItem Header="Copy" />
</ContextMenu>
```

This is useful when you need to conditionally show or hide the context menu, or when you want to update its items before it appears.

## Context flyout

You can use a `ContextFlyout` as an alternative to a `ContextMenu`. A context flyout can contain arbitrary content, not just menu items, giving you a richer UI experience:

```xml
<Border Background="LightGray" Padding="20">
    <Border.ContextFlyout>
        <Flyout>
            <StackPanel Spacing="8" Width="200">
                <TextBlock Text="Options" FontWeight="Bold" />
                <Button Content="Action" />
            </StackPanel>
        </Flyout>
    </Border.ContextFlyout>
    <TextBlock Text="Right-click for options" />
</Border>
```

:::caution
A control cannot have both a `ContextFlyout` and a `ContextMenu` attached at the same time. If you set both, only one will be used.
:::

## Useful properties

| Property | Type | Description |
|---|---|---|
| `ItemsSource` | `IEnumerable` | Binds menu items to a collection so you can generate them dynamically. |
| `Opening` | `event` | Raised before the context menu opens. Set `Cancel` to `true` to prevent it. |
| `Closing` | `event` | Raised when the context menu closes. |
| `PlacementMode` | `PlacementMode` | Controls where the context menu appears relative to the pointer. |

## See also

- [Menu](/controls/menus/menu)
- [MenuFlyout](/controls/menus/menuflyout)
- [Flyout](/controls/layout/containers/flyout)
- [ContextMenu API reference](/api/avalonia/controls/contextmenu)
- [`ContextMenu.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ContextMenu.cs)
