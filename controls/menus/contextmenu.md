---
id: contextmenu
title: ContextMenu
---

The `ContextMenu` can be applied to any host control to implement a right-click 'context sensitive' menu. This uses an **attached property** of the host control.

:::info
To review the concept behind this use of an **attached property**, see [Attached properties](/docs/custom-controls/attached-properties).
:::

## Example

In this example, a context menu is attached to a multi-line text box. Right-click your mouse in the preview area to see the context menu.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
  <TextBox AcceptsReturn="True" TextWrapping="Wrap">
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

## Context flyout

You can use a context flyout as an alternative to a context menu. A context flyout can provide a sharable and richer UI experience than a simple context menu.

:::caution
A control cannot have a context flyout and a context menu attached at the same time.
:::

A context flyout is invoked automatically like a context menu.

## See also

- [ContextMenu API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_ContextMenu)
- [`ContextMenu.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ContextMenu.cs)
