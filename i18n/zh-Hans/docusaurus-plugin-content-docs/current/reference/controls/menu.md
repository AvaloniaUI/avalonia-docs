---
description: REFERENCE - Built-in Controls
---

import MenuTopDockScreenshot from '/img/reference/controls/menu/menu-top-dock.gif';
import MenuIconScreenshot from '/img/reference/controls/menu/menu-icon.gif';

# Menu 菜单

菜单控件可以为应用程序添加菜单结构。通常你会将菜单放置在边缘布局面板控件的顶部边缘，这样它就会绘制在窗口的顶部。

:::info
有关边缘布局面板的参考信息，请参见[这里](dockpanel.md)。
:::

## 菜单项

一个菜单元素通常包含一组嵌套的 `<MenuItem>` 元素。第一层菜单项定义菜单的水平部分。后续层次的菜单项是下拉菜单。

菜单项的标题通过 `Header` 属性设置。菜单项的内容区可以根据需要包含子项。

你可以通过包含 `<Separator>` 元素或添加标题设置为减号的菜单项来添加菜单分隔线，如下所示：

```xml
<MenuItem Header="-" />
```

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="147.33333333333331">元素</th><th width="190">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>Menu</code></td><td><code>DockPanel.Dock</code></td><td>将菜单定位在停靠面板的顶部边缘。</td></tr><tr><td><code>MenuItem</code></td><td><code>Header</code></td><td>菜单项的标题。</td></tr><tr><td><code>MenuItem</code></td><td><code>Command</code></td><td>当菜单项被点击或通过键盘选择时执行的命令。</td></tr><tr><td><code>MenuItem</code></td><td><code>MenuItem.Icon</code></td><td>包含一个图标，用于在菜单项旁显示。</td></tr><tr><td><code>Separator</code></td><td></td><td>菜单项分隔线。</td></tr></tbody></table>

## 示例

此示例创建一个停靠在窗口顶部边缘的菜单。

```xml
<Window ...>
    <DockPanel>
    <Menu DockPanel.Dock="Top">
      <MenuItem Header="_File">
        <MenuItem Header="_Open..."/>
        <Separator/>
        <MenuItem Header="_Exit"/>
      </MenuItem>
      <MenuItem Header="_Edit">
        <MenuItem Header="Copy"/>
        <MenuItem Header="Paste"/>
      </MenuItem>
    </Menu>
    <TextBlock/>
  </DockPanel>
</Window>
```

<img src={MenuTopDockScreenshot} alt="" />

## 快捷键

快捷键通过标题中的下划线和一个字母来标识。例如：

```xml
 <MenuItem Header="_File">
```

这允许用户快速访问菜单项。有时也称为热键、访问键或助记符。

用户可以通过首先按下 Alt 键，然后按下快捷键（或一起按下）来访问此功能。这在上面示例的第二个菜单序列中演示了这一点。

你会看到，一旦按下 Alt 键，定义了快捷键的菜单项就会在菜单上显示下划线。然后，当按下相应的快捷键时，任何子菜单都会下拉。

一旦通过 Alt 键启动了键盘交互，用户还可以使用键盘箭头键导航菜单。菜单项可以通过键盘上的 Enter 键选择。

## 菜单命令

要启动一个操作，可以将菜单项的命令属性绑定到一个 `ICommand` 对象。当菜单项被点击或通过键盘选择时，将执行该命令。例如：

```xml
<Menu>
    <MenuItem Header="_File">
        <MenuItem Header="_Open..." Command="{Binding OpenCommand}"/>
    </MenuItem>
</Menu>
```

:::info
有关如何绑定命令的指导，请参见[这里](/docs/basics/user-interface/adding-interactivity.md)。
:::

## 菜单图标

可以通过在 `<MenuItem.Icon>` 附加属性中放置图像或路径图标来显示菜单图标。例如：

```xml
<MenuItem Header="_Edit">
  <MenuItem Header="Copy">
     <MenuItem.Icon>
        <PathIcon Data="{StaticResource copy_regular}"/>
     </MenuItem.Icon>
  </MenuItem>
  <MenuItem Header="Paste">
     <MenuItem.Icon>
        <PathIcon Data="{StaticResource clipboard_paste_regular}"/>
     </MenuItem.Icon>
</MenuItem>
```

<img src={MenuIconScreenshot} alt="" />

:::info
有关如何向菜单添加图标的详细指导，请参见[这里](/docs/guides/graphics-and-animation/how-to-add-menu-icons.md)。
:::

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Menu)。
:::

:::info
在 _GitHub_ 上查看源代码 [`Menu.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Menu.cs)
:::