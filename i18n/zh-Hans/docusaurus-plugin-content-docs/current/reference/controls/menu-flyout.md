---
description: REFERENCE - Built-in Controls
---

import MenuFlyoutScreenshot from '/img/reference/controls/menuflyout/menuflyout-button.gif';

# MenuFlyout 弹出菜单

`MenuFlyout` 允许您将一个简单的菜单作为控件的弹出菜单。您可以将其用作上下文菜单的替代方案。

:::info
有关上下文菜单的详细信息，请参阅[此处](./contextmenu)的参考。
:::

:::info
弹出菜单的属性与弹出菜单相同。请参阅[此处](flyouts)。
:::

## 示例

这是一个简单的弹出菜单示例：

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
请注意，`<Separator/>` 元素在弹出菜单中不起作用。要制作分隔线，请使用 `Header` 设置为 '-' 的 `<MenuItem>` 元素，如上所示。
:::

生成的弹出菜单如下所示：

<img src={MenuFlyoutScreenshot} alt="" />

## 动态弹出菜单

这是一个在运行时根据类型为 `MyMenuItemViewModel` 的集合 `MyMenuItems` 动态创建 `MenuFlyout` 的示例。

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

## 更多信息

有关此控件的完整 API 文档，请参阅[此处](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_MenuFlyout)。

在 _GitHub_ 上查看源代码 [`MenuFlyout.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Flyouts/MenuFlyout.cs)
