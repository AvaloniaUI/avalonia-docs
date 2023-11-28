---
description: REFERENCE - Built-in Controls
---

# Native Menu

The native menu can display a menu on _macOS_ and some Linux distributions.

:::warning
This control can only be used attached to a tray icon. For full details about the tray icon, see the reference [here](detailed-reference/tray-icon.md).
:::

You can create sub-menus by nesting `<MenuItem>` elements.

You can add menu separator lines by including a `<NativeMenuItemSeparator>` element or by adding a menu item with its header set to the minus sign, like this:

```xml
<NativeMenuItemSeparator Header="-" />
```

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="204">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Header</code></td><td>The menu caption.</td></tr><tr><td><code>Command</code></td><td>A command to execute when the user clicks the menu item.</td></tr></tbody></table>

## Example

This example defines a native menu that can be attached to a tray icon:

```xml
<NativeMenu>
  <NativeMenuItem Header="Settings">
    <NativeMenu>
      <NativeMenuItem Header="Option 1"   />
      <NativeMenuItem Header="Option 2"   />
      <NativeMenuItemSeparator />
      <NativeMenuItem Header="Option 3"  />
    </NativeMenu>
  </NativeMenuItem>
</NativeMenu>
```

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/NativeMenu/).
:::

:::info
View the source code on GitHub [NativeMenu.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/NativeMenu.cs)
:::
