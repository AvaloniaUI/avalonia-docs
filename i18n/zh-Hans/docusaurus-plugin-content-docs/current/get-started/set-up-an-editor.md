---
id: set-up-an-editor
title: 设置编辑器
---

import AvaloniaVsExtensionMarketplaceScreenshot from '/img/get-started/avalonia-vs-extension-marketplace.png';
import AvaloniaVsExtensionNuGetScreenshot from '/img/get-started/avalonia-vs-extension-nuget.png';

# 设置编辑器

您可以使用任何代码编辑器创建Avalonia应用程序，但是使用IDE将为您提供Avalonia XAML预览器和代码补全的支持。

## JetBrains Rider

[JetBrains Rider](https://www.jetbrains.com/rider/) IDE在2020.3版本中开始内置支持Avalonia XAML，包括对Avalonia特定XAML功能和自定义代码检查的一流支持。

有关更多信息，请参阅[JetBrains Rider 2020.3版本发布公告](https://www.jetbrains.com/rider/whatsnew/2020-3/#version-2020-3-avalonia-support)。

Rider目前还没有提供可视化设计工具，但正在开发中。请参阅[GitHub项目](https://github.com/ForNeVeR/AvaloniaRider)获取更多信息和安装说明。

## Visual Studio

如果您正在使用Visual Studio开发Avalonia，您应该安装[Avalonia for Visual Studio](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaVS)扩展。

<img className="center" src={AvaloniaVsExtensionMarketplaceScreenshot} alt="" />

该扩展提供了Avalonia XAML的智能感知支持以及预览功能。

安装Avalonia for Visual Studio扩展的步骤如下：

- 在Visual Studio中，点击**扩展**菜单上的**管理扩展**
- 在**搜索**框中，输入"Avalonia"
- 点击**下载**并按照说明进行操作（您需要关闭Visual Studio以完成安装）

<img className="center" src={AvaloniaVsExtensionNuGetScreenshot} alt="" />

:::info
您也可以在[此处](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaVS)下载扩展。
:::

:::info
如果您使用的是VS2019或VS2017，您需要在[此处](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaforVisualStudio)下载适用于旧版本的扩展。
:::