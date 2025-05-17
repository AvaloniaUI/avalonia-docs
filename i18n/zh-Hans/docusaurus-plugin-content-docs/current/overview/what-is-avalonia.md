---
id: what-is-avalonia
title: 什么是 Avalonia?
---

import AvaloniaArchitecture from '/img/overview/Architecture.png';
import MauiComparision from '/img/overview/MAUI-Comparision.png';

Avalonia 是一个开源的跨平台 UI 框架，使开发者能够使用 .NET 为 Windows、macOS、Linux、iOS、Android 和 WebAssembly 创建应用程序。

它使用自己的渲染引擎来绘制 UI 控件，确保在所有支持的平台上具有一致的外观和行为。这意味着开发者可以共享他们的 UI 代码，并在不同的目标平台上保持统一的外观和体验。

<p><img className="image-zoom-medium" src={AvaloniaArchitecture} alt="" /></p>


## Avalonia 适合哪些人?

Avalonia 适合以下开发者：

* 希望使用 XAML 和 C# 从单一共享代码库开发跨平台应用程序
* 希望跨多个平台共享 UI、布局和设计
* 希望跨多个平台共享代码、测试和业务逻辑


## Avalonia 是如何工作的?
Avalonia 通过一种不同于传统跨平台框架的方法统一了桌面、移动和 Web 平台。Avalonia 不会包装原生 UI 控件，而是实现自己的跨平台渲染引擎，确保所有受支持的平台上像素级的一致性。

### 架构概述
Avalonia 基于 .NET Standard 2.0 构建，因此可以在任何支持 .NET 的平台上运行。该框架由几个关键层组成：

#### 核心平台无关层
Avalonia 的大部分功能位于与平台无关的核心层中，该层处理：

* UI 控件和布局
* 可视化树管理
* 样式系统
* 数据绑定
* 输入处理
* 动画框架

该核心层完全独立于平台，这意味着无论操作系统或设备如何，其行为都相同。

#### 渲染引擎
与依赖原生 UI 控件的框架不同，Avalonia 使用由 Skia 或 Direct2D 提供支持的自己的渲染引擎。这种方法意味着：

* 应用程序在各个平台上的外观和行为均相同
* 自定义控件和视觉效果可以实现一次并在任何地方工作
* 该框架不受平台特定 UI 功能的限制

#### 平台集成层
Avalonia 在每个受支持的平台都需要集成少量的的平台特定代码。此层处理：

* 窗口管理
* 输入事件
* 剪贴板操作
* 原生对话框
* 硬件加速
* 平台特定功能

#### 运行环境
Avalonia 应用程序在 .NET 运行时上运行，无论是 .NET Core 还是 Mono。 

#### 与原生方法的比较
虽然 .NET MAUI 等框架对原生 UI 控件进行了抽象，但 Avalonia 采用了不同的方法：

<p><img className="image-zoom-medium" src={MauiComparision} alt="" /></p>

这种架构差异提供了几个好处：

* 跨平台的一致行为
* 像素完美渲染
* 完全控制 UI 堆栈
* 简化的平台支持
* 减少维护费用
* 在资源受限的设备上实现更好的性能

### 与原生平台集成

虽然 Avalonia 使用自己的渲染引擎，但它仍然可以与原生平台功能无缝集成：

* **Windows**: 支持 Win32 API 和现代 Windows 功能
* **Linux**: 适用于 X11、Wayland 和帧缓冲区渲染
* **macOS**: 与 Cocoa 和平台服务集成
* **Mobile**: 提供原生生命周期管理和平台集成
* **Web**: 通过 WebAssembly 运行，与浏览器完全集成

### 平台支持要求
从本质上讲，Avalonia 只需要两个基本功能来支持新平台：

1. 在屏幕上绘制像素的能力
2. 接收输入事件的能力

这组最低要求使得 Avalonia 能够支持如此广泛的平台，从桌面操作系统到嵌入式设备，甚至是 VNC 服务器等不常见的平台。

这种架构使 Avalonia 能够兑现“一个代码库，无限可能”的承诺，同时在最重要的地方保持高性能和原生平台集成。