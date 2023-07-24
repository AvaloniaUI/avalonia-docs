---
id: solution-setup
title: 建立跨平台解决方案
---

尽管平台多样化，Avalonia项目都使用相同的解决方案文件格式（Visual Studio的`.SLN`文件格式）。解决方案可以在开发环境之间共享，为多平台应用程序开发提供统一的方法。

创建新的跨平台应用程序的第一步是创建一个解决方案。本节将详细介绍接下来的步骤：使用Avalonia构建跨平台应用程序的项目设置过程。

## 填充解决方案

`Avalonia Cross Platform Application`模板创建了一个解决方案结构，其中包括以下项目，以无缝地实现在多个平台上共享和重用代码：

:::info
[确保已安装Avalonia模板。](../../get-started/install#install-avalonia-ui-templates)
:::

### 核心项目
这是应用程序的核心，旨在与平台无关。它包含应用程序的所有可重用组件，包括业务逻辑、视图模型和视图。所有其他项目都引用此核心项目。大部分开发工作应该在这里进行。

### 桌面项目
该项目使应用程序能够在Windows、macOS和Linux平台上运行，输出类型为`WinExe`。

### Android项目
这是一个基于`.NET-Android`的项目，它引用了核心项目。它包含一个从`AvaloniaMainActivity`继承的`MainActivity`，作为Android应用程序的入口点。

### iOS项目
这是一个专为iOS和iPadOS平台定制的`.NET-iOS`项目。该项目的入口点是继承自`AvaloniaAppDelegate`的`AppDelegate`。

### 浏览器项目
这个WebAssembly（WASM）项目允许您的Avalonia应用程序在Web浏览器中运行。它的`RuntimeIdentifier`是`browser-wasm`。

## 核心项目

共享代码项目只应引用在所有平台上普遍可用的程序集。通常包括常见的框架命名空间，如`System`、`System.Core`和`System.Xml`。

这些共享项目旨在尽可能实现应用程序的大部分功能，包括UI组件，从而最大限度地提高代码的可重用性。

通过将功能分离到不同的层中，代码变得更容易管理、测试和在多个平台上重用。Avalonia UI项目中的这种分层架构方法促进了应用程序开发的效率和可扩展性。

## 特定平台的应用程序项目

特定平台的项目必须引用核心项目。特定平台的项目存在的目的是使应用程序能够在包括iOS、Android和WASM在内的独特平台上运行。

虽然桌面平台可以共享一个项目，但为macOS创建一个单独的项目可能更有益，使用[Xamarin.Mac目标框架](https://learn.microsoft.com/en-us/xamarin/mac/platform/target-framework)。这将使您的应用程序更容易分发和打包。



















