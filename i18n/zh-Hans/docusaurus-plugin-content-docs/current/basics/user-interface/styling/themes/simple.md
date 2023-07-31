---
id: simple
title: Simple 主题
---

## 简介

Avalonia Simple 主题专门设计为简约且轻量，具有有限的内置样式。它为构建自定义样式提供了简单干净的基础。低视觉和结构复杂性使其成为在嵌入式设备上运行的应用程序的理想选择。

![Simple 主题](/img/basics/user-interface/styling/simple-theme.png)

## 如何使用

首先，需要安装 [Avalonia.Themes.Simple](https://www.nuget.org/packages/Avalonia.Themes.Simple/) NuGet 包。

:::info
关于如何添加 NuGet 包，您可以参考 NuGet 页面或 [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)、[Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html) 文档中的步骤。
:::

然后，将主题包含在 Application 类中：

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    // highlight-start
    <SimpleTheme />
    // highlight-end
  </Application.Styles>
</Application>

```

:::note
如果需要指定主题为暗色或浅色变体，请参阅[主题变体](../../../../guides/styles-and-resources/how-to-use-theme-variants.md)文档。
:::