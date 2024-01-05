---
id: faq
title: 常见问题
---

## Avalonia是什么？
Avalonia 是一个开源的跨平台 UI 框架。它是 [.NET 基金会](https://dotnetfoundation.org/) 的一部分，并被认为是其中最活跃的社区项目之一。它专为创建灵活且美观的用户界面而设计。Avalonia 支持多种应用程序开发平台，包括 Windows、Linux、macOS、iOS、Android 和 WebAssembly。

Avalonia 基于现代的 .NET 技术栈，允许开发人员使用 C# 或任何其他 .NET 语言编写代码，并使用 XAML 标记语言定义用户界面。类似于 WPF，Avalonia 使用基于 XAML 的样式系统，其布局系统和绑定基础设施模型为熟悉 XAML 框架的开发人员提供了一个熟悉的环境。

Avalonia 与许多其他 UI 框架不同之处在于，它不依赖于操作系统提供的控件。相反，它自己绘制整个用户界面，从而实现高度的自定义和跨平台一致的体验。

---

## Avalonia 与其他 UI 框架（如 WPF 或 Xamarin.Forms）有何不同？
Avalonia 通过以下几个关键方面与其他 UI 框架（如 WPF 和 Xamarin.Forms）有所区别：

* **跨平台设计**：与 WPF 专为 Windows 开发不同，Avalonia 是从一开始就被设计为跨平台框架。它支持 Windows、Linux、macOS、iOS、Android、WebAssembly 等多个平台，能够在所有这些平台上提供一致的外观和体验。

* **独立渲染**：Xamarin.Forms 依赖目标平台的原生控件进行渲染，而 Avalonia 拥有自己的渲染引擎。这意味着它不使用操作系统的原生 UI 控件，而是自己绘制整个用户界面。这提供了高度的灵活性和自定义能力。

* **灵活的样式系统**：Avalonia 使用类似于 WPF 的强大样式系统。它使用样式来定义控件的外观，与 Xamarin.Forms 不同，这些样式可以根据控件状态动态调整，并且可以在继承层次结构中继承。

* **XAML 和 code-behind**: 与 WPF 和 Xamarin.Forms 一样，Avalonia 允许您使用 XAML 定义用户界面，这是许多 .NET 开发人员熟悉的标记语言。您还可以直接在代码中操作用户界面，使您能够选择适合您的应用程序的正确方法。

* **开源和社区驱动**：Avalonia 是一个开源项目，拥有活跃的社区为其开发做出贡献。这意味着它会根据社区的反馈和需求不断发展和改进。

---

## 我可以使用什么版本的.NET？

* .NET Framework 4.6.2+
* .NET Core 2.0+
* .NET 5+ (包括最新的 .NET 8)

---

## 我可以利用我现有的WPF或UWP知识在Avalonia上吗？
当然可以！Avalonia受到WPF和UWP的强烈影响，它采用了许多相同的概念，例如使用XAML进行UI定义、数据绑定以及MVVM（Model-View-ViewModel）设计模式。因此，如果您已经熟悉这些技术，您可能会发现Avalonia的学习曲线非常平缓。

然而，值得注意的是，虽然Avalonia与WPF和UWP有许多相似之处，但它并不是一个直接的克隆。Avalonia是从头开始设计成跨平台的，因此它具有自己独特的功能和能力，这些功能和能力与WPF和UWP不同。这些差异可能包括可用的控件、样式机制、特定平台的集成等等。

尽管如此，您对WPF或UWP的现有知识绝对会为您学习和使用Avalonia提供坚实的起点。

---

## Avalonia是否适合构建复杂的桌面应用程序？
是的，Avalonia确实非常适合构建复杂的桌面应用程序。它被设计用于在多种平台上开发灵活且复杂的用户界面，包括Windows、macOS、Linux、iOS、Android和WebAssembly。

Avalonia的强大样式系统受到WPF和CSS的启发，使您能够打造美丽且独特的用户界面。此外，数据绑定和MVVM架构的使用支持构建具有良好结构、可测试性和可维护性代码的可扩展应用程序。

除此之外，Avalonia支持众多其他对于复杂桌面应用程序而言重要的功能，例如多窗口支持、弹出层、控件模板、用户控件等等。

无论您是开发简单的实用程序还是大规模的企业应用程序，Avalonia都提供了您所需的工具和灵活性，以创建强大、高性能且令人惊艳的应用程序。

---

## 我可以使用代码而不是使用XAML来编写我的UI吗？

可以的。您可以使用您喜欢的.NET语言编写整个UI。

---

## 是否有拖放式的可视化设计器？

没有。Avalonia没有提供拖放式的设计器，而是支持实时预览功能。预览器会在您修改XAML时即时渲染UI。

---

## Avalonia支持热重载吗？

您可以使用 [社区项目](https://github.com/AvaloniaCommunity/Live.Avalonia) 来实现与Avalonia的热重载。

---

## Avalonia能与原生API进行交互吗？

可以的。请参阅我们的 [指南](guides/building-cross-platform-applications/dealing-with-platforms#平台抽象)，了解如何使用平台特定功能。

---

## 我可以为不同平台进行跨平台编译吗？

可以的。您可以从Windows编译为macOS、Linux、Android和WebAssembly。但您可能需要在这些平台上打包您的应用，以创建应用的发布包。

构建iOS应用程序需要一台Mac。

---

## 我可以使用Avalonia构建移动应用吗？

可以的。您可以开发Android和iOS应用程序。不过，您需要仔细考虑每个平台，并确保您的应用在较小的、触摸操作为主的设备上表现良好。

---


## 如何参与项目？

查看 [社区指南](community.md) 以了解如何参与该项目。

---

## 支持哪些平台？

:::warning
您还必须了解您的.NET版本支持哪些平台。
通常，.NET将停止对较旧的操作系统版本的支持，而Avalonia仍然可以与它们一起使用。因此，您可能需要保持SDK的更新。
例如，[这个列表](https://github.com/dotnet/core/blob/main/release-notes/8.0/supported-os.md)是.NET 8支持的操作系统版本列表。
:::

## Linux发行版

* Debian 9+
* Ubuntu 16.04+
* Fedora 30+

其他发行版可能也能工作。主要的限制在于.NET SDK 的支持和 X11 系统的可用性。
此外，还支持使用 framebuffer linux 后端。
具有 Wayland 支持的版本尚处于预览阶段，尚未发布。

WSL 2 发行版也受支持，但必须单独安装 `libice6`、`libsm6` 和 `libfontconfig1` 依赖项。

:::info
Skia 是针对 glibc 2.17 构建的。如果您的发行版使用其他东西，您需要在 SkiaSharp 处构建自己的 libSkiaSharp.so。您还可以访问 [SkiaSharp](https://github.com/mono/SkiaSharp) 主页以获取有关支持的版本的更多信息。
:::

### 支持哪些 Windows 版本？

* Windows 8.1

Avalonia 也可以在 Windows 7 上运行，但在那里将不提供新的平台特定功能，并且我们不再为此版本提供错误修复。

## 支持哪些版本的macOS？

* macOS 10.14+

Avalonia 也可以在 macOS 10.13 上运行，但我们正在迁移到 Metal GPU API 的过程中，该 API 目前默认禁用。计划在其中一个小更新期间启用它。

## 支持哪些版本的Android？

* Android 5.0+ (API 21)

:::note
Android 支持需要.NET 7。
:::

### 支持哪些 iOS 版本？

* iOS 13.0+

:::note
iOS 支持需要.NET 7。
:::

### 支持哪些浏览器版本？

任何具有完整 WebAssembly 支持的浏览器在技术上都应该可以工作 - https://caniuse.com/wasm。

为了获得最佳性能和支持，我们建议使用最新版本的 Chrome 或 Safari。

:::note
浏览器支持需要.NET 7。
从 11.0.6 开始，我们建议使用.NET 8。
:::

## 鸣谢

* 本文档的部分内容改编自 [Dotnet docs](https://github.com/dotnet/docs/)，根据 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 授权。
