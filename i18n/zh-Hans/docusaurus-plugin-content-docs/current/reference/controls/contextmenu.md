---
description: REFERENCE - Built-in Controls
---

import ContextMenuCopyPasteScreenshot from '/img/reference/controls/contextmenu/contextmenu-copy-paste.gif';

# ContextMenu 上下文菜单

上下文菜单可以应用于任何宿主控件，以实现右键点击的“上下文敏感”菜单。这使用了宿主控件的一个**附加属性**。

:::info
要回顾这种使用**附加属性**的概念，请查看[这里](../../concepts/attached-property.md)。
:::

## 示例

在这个例子中，一个上下文菜单被附加到一个多行文本框上：

```xml
<TextBox AcceptsReturn="True" TextWrapping="Wrap">
  <TextBox.ContextMenu>
    <ContextMenu>
      <MenuItem Header="Copy"/>
      <MenuItem Header="Paste"/>
    </ContextMenu>
  </TextBox.ContextMenu>     
</TextBox>
```

<img src={ContextMenuCopyPasteScreenshot} alt="" />

## 上下文弹出菜单

你可以使用上下文弹出菜单作为上下文菜单的替代品。上下文弹出菜单可以提供比简单的上下文菜单更丰富的共享和用户界面体验。

:::warning
一个控件不能同时附加上下文弹出菜单和上下文菜单。
:::

上下文弹出菜单像上下文菜单一样自动调用。

## 更多信息

:::info
要查看有关此控件的完整 API 文档，请查看[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/ContextMenu/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`ContextMenu.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ContextMenu.cs)
:::
