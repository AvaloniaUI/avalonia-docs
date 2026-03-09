---
id: separator
title: Separator
description: A visual divider used inside Menu, ContextMenu, and MenuFlyout controls to group related menu items.
doc-type: reference
---

The [`Separator`](/api/avalonia/controls/separator) control draws a horizontal line between menu items, giving you a way to visually group related commands. You can use it inside `Menu`, `ContextMenu`, and `MenuFlyout`.

## Basic usage

Place a `<Separator/>` element between `MenuItem` elements to create a dividing line:

```xml
<Menu DockPanel.Dock="Top">
  <MenuItem Header="_File">
    <MenuItem Header="_New"/>
    <MenuItem Header="_Open..."/>
    <Separator/>
    <MenuItem Header="_Exit"/>
  </MenuItem>
</Menu>
```

In the example above, the separator visually divides the file operations from the exit command.

## In a context menu

`Separator` works the same way inside a `ContextMenu`:

```xml
<TextBox Text="Right-click for options">
  <TextBox.ContextMenu>
    <ContextMenu>
      <MenuItem Header="Cut"/>
      <MenuItem Header="Copy"/>
      <MenuItem Header="Paste"/>
      <Separator/>
      <MenuItem Header="Select All"/>
    </ContextMenu>
  </TextBox.ContextMenu>
</TextBox>
```

## Shorthand syntax

You can produce the same separator line by setting a `MenuItem` header to `"-"`:

```xml
<MenuItem Header="-" />
```

This shorthand is equivalent to using `<Separator/>` and can be useful when building menus from data bindings.

## Styling

You can target `Separator` in your styles to customize its appearance. For example, to change the line color:

```xml
<Style Selector="Separator">
  <Setter Property="Background" Value="Gray"/>
  <Setter Property="Margin" Value="4,2"/>
</Style>
```

## See also

- [Separator API reference](/api/avalonia/controls/separator)
- [`Separator.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Separator.cs)
- [Menu](/controls/menus/menu)
- [ContextMenu](/controls/menus/contextmenu)
- [MenuFlyout](/controls/menus/menuflyout)
