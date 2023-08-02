---
id: how-to-add-menu-icons
title: 如何添加菜单图标
---


# 如何添加菜单图标

在 Avalonia 中，通过为菜单项添加图标，您可以增强应用程序的外观和用户体验。图标可以为菜单项的操作提供视觉提示，使用户更容易浏览您的应用程序。本指南将指导您如何在 Avalonia 中为菜单项添加图标。

## 添加菜单项图标

使用 `MenuItem.Icon` 属性可以为菜单项设置图标。您可以使用各种类型的图像源作为图标，包括资源 URI、文件路径或 web URL。以下是一个将图标添加到菜单项的示例：

```xml
<Menu>
  <MenuItem Header="File">
    <MenuItem Header="Open" Command="{Binding OpenCommand}">
      <MenuItem.Icon>
        <Image Width="16" Height="16" Source="avares://MyApp/Assets/open_icon.png" />
      </MenuItem.Icon>
    </MenuItem>
  </MenuItem>
</Menu>
```

在此示例中，`MenuItem.Icon` 属性被设置为一个 `Image` 控件，用于显示来自应用程序资源的图像。`Image` 控件的 `Source` 属性被设置为表示图像源的资源 URI。`Width` 和 `Height` 属性用于控制图像的大小。

