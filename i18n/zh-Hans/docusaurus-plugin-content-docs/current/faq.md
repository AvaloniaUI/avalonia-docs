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

* .NET Framework 
* .NET Core
* .NET 5
* .NET 6
* .NET 7
* .NET 8 (previews)

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

可以的。请参阅我们的 [指南](guides/building-cross-platform-applications/dealing-with-platforms#platform-abstraction)，了解如何使用平台特定功能。

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

## 支持哪些Linux发行版？

* Debian 9 (Stretch)+
* Ubuntu 16.04+
* Fedora 30+

:::info
Skia是针对glibc构建的。如果您的发行版使用了其他替代品，您需要在 [SkiaSharp](https://github.com/mono/SkiaSharp) 中构建自己的libSkiaSharp.so。我们仅提供Intel x86-64的预编译二进制文件。ARM/ARM64支持正在计划中。
:::

## 支持哪些版本的macOS？

* macOS High Sierra 10.13+

## 支持哪些版本的Android？

* Android 5.0+ (API 21)

:::note
**鸣谢** - 部分文档内容来源于 [Dotnet docs](https://github.com/dotnet/docs/)，使用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 许可证授权。
:::
