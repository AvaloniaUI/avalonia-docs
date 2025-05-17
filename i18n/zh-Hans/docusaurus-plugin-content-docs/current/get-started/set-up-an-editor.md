---
id: set-up-an-editor
title: 设置编辑器
---

import AvaloniaVsExtensionMarketplaceScreenshot from '/img/get-started/avalonia-vs-extension-marketplace.png';
import AvaloniaVsExtensionNuGetScreenshot from '/img/get-started/avalonia-vs-extension-nuget.png';

# 设置编辑器

您可以使用任何代码编辑器创建 Avalonia 应用程序，但是使用 IDE 将为您提供 Avalonia XAML 预览器和代码补全的支持。

## 推荐的IDE：JetBrains Rider

[JetBrains Rider](https://www.jetbrains.com/rider/) IDE 从 2020.3 版本中开始内置对 Avalonia XAML 的支持，包括对 Avalonia 特定 XAML 功能和自定义代码检查的一流支持。现在 Rider 可供个人免费使用，我们强烈建议将其作为 Avalonia 开发的主要 IDE，尤其是对于 macOS 和 Linux 上的开发人员。

Rider 为 Avalonia 提供了最完整、最精致的开发体验，其内置功能包括：

* 高级 XAML 完成和导航
* 丰富的代码分析和快速修复
* 全面的调试工具
* 内置性能分析

### AvaloniaRider 插件
第三方的 [AvaloniaRider](https://plugins.jetbrains.com/plugin/14839-avaloniarider) 插件为 Rider 添加了 [Avalonia 文件模板](./install.md) 功能。并启用实时 XAML 预览功能。

虽然 Rider 开箱即用地包含原生 Avalonia XAML 支持，但此插件可在您键入时提供 XAML 更改的实时预览，类似于 Visual Studio 和 Visual Studio Code 中提供的预览功能。

请注意，该插件是可选的 - 您可以在没有它的情况下在 Rider 中开发 Avalonia 应用程序，但实时预览功能使 XAML 开发更加高效。

## Visual Studio

如果您正在使用 Visual Studio 开发 Avalonia，您应该安装[Avalonia for Visual Studio](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaVS)扩展。

<img className="center" src={AvaloniaVsExtensionMarketplaceScreenshot} alt="" />

该扩展提供了 Avalonia XAML 的智能感知支持以及预览功能。

安装 Avalonia for Visual Studio 扩展的步骤如下：

- 在 Visual Studio 中，点击**扩展**菜单上的**管理扩展**
- 在**搜索**框中，输入"Avalonia"
- 点击**下载**并按照说明进行操作（您需要关闭 Visual Studio 以完成安装）

<img className="center" src={AvaloniaVsExtensionNuGetScreenshot} alt="" />

:::info
您也可以在[此处](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaVS)下载扩展。
:::

:::info
如果您使用的是VS2019或VS2017，您需要在[此处](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaforVisualStudio)下载适用于旧版本的扩展。
:::

## Visual Studio Code 
Avalonia 的 [Visual Studio Code 扩展](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.vscode-avalonia) 包含对 Avalonia XAML 自动完成和预览器的基本支持。虽然功能齐全，但开发体验不如 Rider 或 Visual Studio 中那样丰富。对于需要完整 IDE 体验的 macOS 和 Linux 开发人员，我们建议改用 JetBrains Rider。

如果您仍然喜欢使用 VS Code，则可以从 [Visual Studio Code 市场](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.vscode-avalonia) 安装扩展。

## 编辑器比较

为了获得最佳的 Avalonia 开发体验：

* **Windows**: 使用 JetBrains Rider 或 Visual Studio
* **macOS/Linux**: 使用 JetBrains Rider
* **轻量级编辑器**: 可以使用 Visual Studio Code，但功能集较有限
