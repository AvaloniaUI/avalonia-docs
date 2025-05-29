---
description: REFERENCE - Built-in Controls
---

# NativeMenu 原生菜单

原生菜单可以在 _macOS_ 和一些 Linux 发行版上显示菜单。

你可以通过嵌套 `<MenuItem>` 元素来创建子菜单。

你可以通过包含一个 `<NativeMenuItemSeparator>` 元素或添加一个其标题设置为减号的菜单项来添加菜单分隔线，如下所示：

```xml
<NativeMenuItemSeparator Header="-" />
```

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="204">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>Header</code></td><td>菜单标题。</td></tr><tr><td><code>Command</code></td><td>用户点击菜单项时执行的命令。</td></tr></tbody></table>

## 示例

此示例定义了一个可以附加到托盘图标的本地菜单：

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

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/NativeMenu/)。
:::

:::info
在 GitHub 上查看源代码 [NativeMenu.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/NativeMenu.cs)
:::
