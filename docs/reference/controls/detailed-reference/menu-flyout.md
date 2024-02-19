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

```
<Button HorizontalAlignment="Center">
  <Button.Flyout>
    <MenuFlyout>
      <MenuItem Header="Open"/>
      <MenuItem Header="-"/>
      <MenuItem Header="Close"/>        
    </MenuFlyout>
  </Button.Flyout>
  Button
</Button>
```

:::info
Note the `<Separator/>` element will not work in a menu flyout. To make a separator line, use a `<MenuItem>` element with the header set to '-' as shown above.
:::

The resulting menu flyout looks like this:

<img src={MenuFlyoutScreenshot} alt="" />

## More Information

For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/MenuFlyout/).

View the source code on _GitHub_ [`MenuFlyout.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Flyouts/MenuFlyout.cs)
