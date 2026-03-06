---
id: contextmenu
title: ContextMenu
---

The `ContextMenu` can be applied to any host control to implement a right-click "context sensitive" menu. This uses an **attached property** of the host control.

:::info
To review the concept behind this use of an **attached property**, see [Attached properties](/docs/custom-controls/attached-properties).
:::

## Basic Example

In this example, a context menu is attached to a multi-line text box. Right-click your mouse in the preview area to see the context menu.

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

## Commands and Icons

Bind menu items to commands and add icons for a complete context menu:

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

## Passing Context to Commands

Use `CommandParameter` to pass the relevant item:

```xml
<ListBox.ContextMenu>
    <ContextMenu>
        <MenuItem Header="Delete"
                  Command="{Binding DeleteCommand}"
                  CommandParameter="{Binding $parent[ListBox].SelectedItem}" />
    </ContextMenu>
</ListBox.ContextMenu>
```

## Handling Opening and Closing

Respond to the context menu lifecycle:

```csharp
private void ContextMenu_Opening(object? sender, System.ComponentModel.CancelEventArgs e)
{
    // Set e.Cancel = true to prevent the context menu from opening
}
```

```xml
<ContextMenu Opening="ContextMenu_Opening">
    <MenuItem Header="Copy" />
</ContextMenu>
```

## Context Flyout

You can use a context flyout as an alternative to a context menu. A context flyout can provide a richer UI experience with arbitrary content:

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
A control cannot have a context flyout and a context menu attached at the same time.
:::

## Useful Properties

| Property | Type | Description |
|---|---|---|
| `ItemsSource` | `IEnumerable` | Bind menu items to a collection. |
| `Opening` | `event` | Raised before the context menu opens. Can be cancelled. |
| `Closing` | `event` | Raised when the context menu closes. |

## See also

- [ContextMenu API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_ContextMenu)
- [`ContextMenu.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ContextMenu.cs)
