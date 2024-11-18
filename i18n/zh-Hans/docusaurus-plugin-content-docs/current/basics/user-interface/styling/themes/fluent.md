---
id: fluent
title: Fluent 主题
---

import FluentThemeNormalScreenshot from '/img/basics/user-interface/styling/fluent-theme-normal.png';
import FluentThemeForestScreenshot from '/img/basics/user-interface/styling/fluent-theme-forest.png';

## Introduction

Avalonia Fluent 主题受到微软的 Fluent Design System 的启发，该系统是一组用于创建视觉吸引力和交互式用户界面的设计指南和组件。Fluent Design System 强调现代、清晰的美学，平滑的动画和直观的交互。它在不同平台上提供了一致而精致的外观和感觉，同时为开发人员提供了我们的样式系统的灵活性。

<p><img className="medium-image-zoom" src={FluentThemeNormalScreenshot} alt="Fluent 主题" /></p>

## 如何使用

首先，需要安装 [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent/) NuGet 包。

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
    <FluentTheme />
    // highlight-end
  </Application.Styles>
</Application>
```

:::note
如果需要指定主题为暗色或浅色变体，请参阅[主题变体](../../../../guides/styles-and-resources/how-to-use-theme-variants.md)文档。
:::

## 更改主题密度

Fluent 主题有两套预定义的密度变体。
要切换到更紧凑的外观，可以通过 `DensityStyle` 属性设置：

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    // highlight-start
    <FluentTheme DensityStyle="Compact" />
    // highlight-end
  </Application.Styles>
</Application>
```

## 创建自定义颜色调色板

虽然 FluentTheme 有内置的暗色和浅色变体资源，但仍然可以重写这些变体的基础调色板。
这在开发人员想要使用相同的基本主题但具有不同颜色时非常有用。

要实现这一点，需要定义：

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme>
    // highlight-start
      <FluentTheme.Palettes>
        <!-- 适用于浅色主题变体的调色板 -->
        <ColorPaletteResources x:Key="Light" Accent="Green" RegionColor="White" ErrorText="Red" />
        <!-- 适用于暗色主题变体的调色板 -->
        <ColorPaletteResources x:Key="Dark" Accent="DarkGreen" RegionColor="Black" ErrorText="Yellow" />
      </FluentTheme.Palettes>
    // highlight-end
    </FluentTheme>
  </Application.Styles>
</Application>
```

虽然 `ColorPaletteResources` 具有许多可以单独为每个变体重写的颜色属性，但是只能重新定义所需的最小集合，其他所有内容保持默认值。如上面的示例中，仅覆盖了几种颜色。

如果未重写 Accent，Avalonia 将使用平台 OS 的强调颜色（如果可用）。
另外，Accent 支持绑定，并且可以在运行时更改，但其他属性不支持，因为它们在应用程序启动后被读取一次，并且为了性能原因而静态使用。

可以在代码中构建调色板，但是同样的规则适用——只有 Accent 可以在运行时更新，并且调色板应该在样式或主题加载后设置为不可变。

:::note
FluentTheme 仅支持暗色和浅色主题变体，不支持为自定义变体定义调色板。
:::

## 使用在线编辑器创建自定义颜色调色板

Microsoft Fluent Theme Editor 已移植到 Avalonia，现在也可以与我们的 FluentTheme 一起使用。
它可在 https://theme.xaml.live/ 页面上使用，并支持以下功能：

1. 编辑浅色和暗色变体的调色板颜色。
2. 预览当前调色板。
3. 将当前调色板导出为可以复制粘贴到 `App.axaml` 文件中的 XAML 代码。
4. 将当前颜色保存在 JSON 文件中，并从文件系统加载它。
5. 在调色板的颜色之间有低对比度时，自动提示。
6. 提供几个快速启动预设。

以下是使用 Forest 调色板预设的 FluentTheme 示例：
<p><img className="medium-image-zoom" src={FluentThemeForestScreenshot} alt="Fluent 主题 Forest 调色板" /></p>