---
id: what-is-avalonia
title: Avalonia是什么？
---

import AvaloniaArchitecture from '/img/overview/Architecture.png';
import MauiComparision from '/img/overview/MAUI-Comparision.png';

Avalonia 是一个开源跨平台 UI 框架，允许开发者使用 .NET 为 Windows、macOS、Linux、iOS、Android 和 WebAssembly 创建应用程序。

它使用自研的渲染引擎绘制 UI 控件，确保在所有支持平台上呈现一致的外观和行为。这意味着开发者可以共享 UI 代码，并保持统一的用户体验，而无需考虑目标平台差异。

<p><img className="image-zoom-medium" src={AvaloniaArchitecture} alt="" /></p>

## Avalonia 适合哪些开发者？

Avalonia 适合希望实现以下目标的开发者：

* 使用 XAML 和 C# 编写跨平台应用，基于单一共享代码库
* 在多个平台间共享 UI、布局和设计
* 跨平台共享代码、测试和业务逻辑

## Avalonia 工作原理
Avalonia 通过与传统跨平台框架不同的独特方法，统一桌面端、移动端和 Web 平台。不同于封装原生 UI 控件的方案，Avalonia 实现了自研的跨平台渲染引擎，确保所有支持平台上的像素级一致性。

### 架构概述
Avalonia 基于 .NET Standard 2.0 构建，可运行在任何支持 .NET 的平台上。框架包含以下关键层级：

#### 核心平台无关层
框架大部分功能位于平台无关的核心层，负责处理：

* UI 控件与布局系统
* 可视化树管理
* 样式系统
* 数据绑定
* 输入处理
* 动画框架

该核心层完全与平台无关，意味着其行为在不同操作系统和设备上完全一致。

#### 渲染引擎
不同于依赖原生 UI 控件的框架，Avalonia 使用基于 Skia 或 Direct2D 的自研渲染引擎。这种设计带来以下优势：

* 应用程序在不同平台具有完全一致的外观和行为
* 自定义控件和视觉效果只需实现一次即可全平台生效
* 框架不受平台特定 UI 能力的限制

#### 平台集成层
Avalonia 只需极少的平台特定代码即可集成到各支持平台。该层负责：

* 窗口管理
* 输入事件处理
* 剪贴板操作
* 原生对话框
* 硬件加速
* 平台特性支持

#### 运行时环境
Avalonia 应用程序可运行在 .NET Core 或 Mono 等 .NET 运行时环境。

#### 与原生方案的对比
与 .NET MAUI 等封装原生 UI 控件的框架不同，Avalonia 采用独特架构：

<p><img className="image-zoom-medium" src={MauiComparision} alt="" /></p>

这种架构差异带来以下优势：

* 跨平台行为一致性
* 像素级完美渲染
* 完整掌控 UI 技术栈
* 简化的平台支持
* 降低维护成本
* 在资源受限设备上性能更优

### 原生平台集成

尽管使用自研渲染引擎，Avalonia 仍能无缝集成原生平台能力：

* **Windows**：支持 Win32 API 和现代 Windows 特性
* **Linux**：兼容 X11、Wayland 和帧缓冲渲染
* **macOS**：集成 Cocoa 和平台服务
* **移动端**：提供原生生命周期管理和平台集成
* **Web**：通过 WebAssembly 运行并实现完整浏览器集成

### 平台支持要求
Avalonia 对平台的核心要求仅包含两项基础能力：

1. 屏幕像素绘制能力
2. 输入事件接收能力

这种极简要求使得 Avalonia 能够支持从桌面操作系统到嵌入式设备，甚至 VNC 服务器等特殊平台的广泛场景。

这种架构使 Avalonia 能够践行"一次编码，无限可能"的理念，同时在关键领域保持高性能和原生平台集成能力。