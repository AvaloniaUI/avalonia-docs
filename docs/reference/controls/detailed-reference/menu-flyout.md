---
title: MenuFlyout
description: REFERENCE - Built-in Controls
---

import MenuFlyoutScreenshot from '/img/reference/controls/detailed-reference/menuflyout/menuflyout-button.gif';

# MenuFlyout

A 'MenuFlyout' allows you to host a simple menu as the flyout for a control. You might use this as an alternative to the context menu.

:::info
For details of the context menu, see the reference [here](../contextmenu.md).
:::

:::info
The properties of a menu flyout are the same as for a flyout. See [here](../flyouts.md).
:::

## Example

This is a simple example of the menu flyout:

```xml
<Button Content="Button" HorizontalAlignment="Center">
  <Button.Flyout>
    <MenuFlyout>
      <MenuItem Header="Open"/>
      <MenuItem Header="-"/>
      <MenuItem Header="Close"/>        
    </MenuFlyout>
  </Button.Flyout>
</Button>
```

:::info
Note the `<Separator/>` element will not work in a menu flyout. To make a separator line, use a `<MenuItem>` element with the header set to '-' as shown above.
:::

The resulting menu flyout looks like this:

<img src={MenuFlyoutScreenshot} alt="" />

## Dynamic MenuFlyout

This is an example for a `MenuFlyout` that is created dynamically during runtime based on a collection `MyMenuItems` with items of type `MyMenuItemViewModel`.

```xml
<Button Content="Button">
  <Button.Flyout>
    <MenuFlyout ItemsSource="{Binding MyMenuItems}">
      <MenuFlyout.ItemContainerTheme>
        <ControlTheme TargetType="MenuItem" BasedOn="{StaticResource {x:Type MenuItem}}" 
          x:DataType="l:MyMenuItemViewModel">

          <Setter Property="Header" Value="{Binding Header}"/>
          <Setter Property="ItemsSource" Value="{Binding Items}"/>
          <Setter Property="Command" Value="{Binding Command}"/>
          <Setter Property="CommandParameter" Value="{Binding CommandParameter}"/>
          
        </ControlTheme>
      </MenuFlyout.ItemContainerTheme>
    </MenuFlyout>
  </Button.Flyout>
</Button>
```

## More Information

For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/MenuFlyout/).

View the source code on _GitHub_ [`MenuFlyout.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Flyouts/MenuFlyout.cs)
