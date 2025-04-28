---
id: what-is-avalonia
title: 什么是 Avalonia?
---

import AvaloniaArchitecture from '/img/overview/Architecture.png';
import MauiComparision from '/img/overview/MAUI-Comparision.png';

Avalonia 是一个开源的跨平台 UI 框架，使开发者能够使用 .NET 为 Windows、macOS、Linux、iOS、Android 和 WebAssembly 创建应用程序。

它使用自己的渲染引擎来绘制 UI 控件，确保在所有支持的平台上具有一致的外观和行为。这意味着开发者可以共享他们的 UI 代码，并且无论目标平台是什么，都能保持统一的外观和体验。

<p><img className="image-zoom-medium" src={AvaloniaArchitecture} alt="" /></p>


## Avalonia 适合谁？

Avalonia 适合以下开发者：

* 希望使用 XAML 和 C# 从单一共享代码库开发跨平台应用
* 希望在多个平台上共享 UI、布局和设计
* 希望跨平台共享代码、测试和业务逻辑


## Avalonia 是如何工作的？
Avalonia 通过一种独特的方法统一了桌面、移动和网页平台，这与传统的跨平台框架有所不同。Avalonia 并非包装原生 UI 控件，而是实现了自己的跨平台渲染引擎，确保在所有支持的平台上实现像素级的一致性。

### 架构概述
Avalonia 构建于 .NET Standard 2.0 之上，使其能够在任何支持 .NET 的平台上运行。该框架由几个关键层组成：

#### 核心平台无关层
Avalonia 的大部分功能都位于平台无关的核心层中，该层负责处理：

* UI 控件和布局
* 视觉树管理
* 样式系统
* 数据绑定
* 输入处理
* 动画框架

这个核心层完全独立于平台，意味着无论在什么操作系统或设备上，它的行为都是相同的。

#### 渲染引擎
与依赖原生UI控件的框架不同，Avalonia使用自己的渲染引擎，由Skia或Direct2D提供支持。这种方法意味着：

* 应用程序在所有平台上的外观和行为完全一致
* 自定义控件和视觉效果只需实现一次，即可在所有平台上运行
* 框架不受平台特定UI能力的限制

#### 平台集成层
Avalonia 只需少量特定于平台的代码即可与每个支持的平台集成。该层处理：

* 窗口管理
* 输入事件
* 剪贴板操作
* 原生对话框
* 硬件加速
* 平台特定功能

#### 运行时环境
Avalonia 应用程序运行在 .NET 运行时上，无论是 .NET Core 还是 Mono。

#### 与原生方法的比较
虽然像 .NET MAUI 这样的框架抽象了原生 UI 控件，但 Avalonia 采用了不同的方法：

<p><img className="image-zoom-medium" src={MauiComparision} alt="" /></p>

这种架构差异提供了几个优势：

* 跨平台一致的行为
* 像素级精确渲染
* 对 UI 栈的完全控制
* 简化的平台支持
* 降低维护成本
* 在资源受限设备上获得更好的性能

### 与原生平台的集成

虽然 Avalonia 使用自己的渲染引擎，但它仍然与原生平台功能无缝集成：

* **Windows**：支持 Win32 API 和现代 Windows 功能
* **Linux**：适用于 X11、Wayland 和帧缓冲区渲染
* **macOS**：集成了 Cocoa 和平台服务
* **移动设备**：提供原生生命周期管理和平台集成
* **Web**：通过 WebAssembly 运行，完全集成浏览器功能

### 平台支持要求
本质上，Avalonia 只需要两项基本功能即可支持新平台：

1. 能够在屏幕上绘制像素
2. 能够接收输入事件

这种最小需求集使 Avalonia 能够支持广泛的平台，从桌面操作系统到嵌入式设备，甚至是像 VNC 服务器这样的非常规平台。

这种架构使 Avalonia 能够实现其“一份代码库，无限可能"的承诺，同时在最重要的地方保持高性能和原生平台集成。