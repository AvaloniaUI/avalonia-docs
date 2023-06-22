---
id: faq
title: FAQ
---

## What is Avalonia?
Avalonia is an open-source, cross-platform UI framework. It is part of the [.NET Foundation](https://dotnetfoundation.org/) and considered to be one of the most active community projects within it. It's designed for creating flexible and beautiful user interfaces. Avalonia supports a wide array of application development platforms, including Windows, Linux, macOS, iOS, Android and WebAssembly.

Built on a modern .NET stack, Avalonia allows developers to write in C# or any other .NET language, and to define UIs using the XAML markup language. Similar to WPF, Avalonia uses a XAML-based styling system, and its layout system and binding infrastructure model offer a familiar environment for developers experienced with XAML-based frameworks.

Avalonia stands out from many other UI frameworks as it doesn't rely on controls provided by the operating system. Instead, it draws the entire UI itself, which enables a high level of customization and a consistent experience across platforms.

---

## How is Avalonia different from other UI frameworks like WPF or Xamarin.Forms?
Avalonia distinguishes itself from other UI frameworks such as WPF and Xamarin.Forms through several key aspects:

* **Cross-platform by design**: Unlike WPF, which is exclusive to Windows, Avalonia is designed from the ground up to be cross-platform. It supports Windows, Linux, macOS, iOS, Android, WebAssembly and more. It's capable of delivering a consistent look and feel across all these platforms.

* **Independent rendering**: While Xamarin.Forms relies on the native controls of the target platform for rendering, Avalonia has its own rendering engine. This means that it doesn't use the native UI controls of the operating system but instead draws the entire UI itself. This provides a high degree of flexibility and customization.

* **Flexible styling**: Avalonia uses a powerful styling system similar to WPF. It uses styles to define the appearance of your controls, and unlike Xamarin.Forms, these styles can be dynamically adjusted based on control state and inherited hierarchically.

* **XAML and code-behind**: Like WPF and Xamarin.Forms, Avalonia lets you define UIs using XAML, a markup language that many .NET developers are familiar with. You can also manipulate your UI directly in code, giving you the flexibility to choose the right approach for your application.

* **Open source and community-driven**: Avalonia is an open-source project with an active community contributing to its development. This means it's continually evolving and improving based on community feedback and needs.

---

## What versions of .NET can I use? 

* .NET Framework 
* .NET Core
* .NET 5
* .NET 6
* .NET 7
* .NET 8 (previews)

---

## Can I use my existing knowledge of WPF or UWP to work with Avalonia?
Yes, you certainly can! Avalonia is heavily influenced by WPF and UWP, and it leverages many of the same concepts, such as XAML for UI definition, data binding, and the MVVM (Model-View-ViewModel) design pattern. So, if you're already familiar with these technologies, you'll likely find Avalonia's learning curve quite gentle.

However, it's important to note that while Avalonia shares many similarities with WPF and UWP, it isn't a direct clone. Avalonia was designed to be cross-platform from the ground up, and as such, it has its own unique features and capabilities that are distinct from WPF and UWP. These differences could include the available controls, styling mechanism, platform-specific integrations, and so on.

Nevertheless, your existing knowledge of WPF or UWP will definitely give you a solid starting point for learning and working with Avalonia.

---

## Is Avalonia suitable for building complex desktop applications?
Yes, Avalonia is indeed suitable for building complex desktop applications. It is designed to allow for the development of flexible and intricate user interfaces across a wide range of platforms, including Windows, macOS, Linux, iOS, Android, and WebAssembly.

Avalonia's powerful styling system, inspired by WPF and CSS, enables you to craft beautiful and unique user interfaces. Moreover, the use of data-binding and the MVVM architecture supports building scalable applications with well-structured, testable, and maintainable code.

In addition to this, Avalonia supports a multitude of other features important for complex desktop applications, such as multi-window support, popup layers, control templates, user controls, and more.

Whether you're developing a simple utility or a large-scale enterprise application, Avalonia offers the tools and flexibility you need to create robust, performant, and stunning applications.

---

## Can I code my UI instead of using XAML?

Yes. You can code your entire UI with your preferred .NET language.

---

## Is there a drag and drop visual designer?

No. Instead of providing a drag and drop designer, the Avalonia IDE extensions support a live previewer, which will render a preview of the UI, refreshing as your modify the XAML.

---

## Does Avalonia support Hot Reload?

You can use a [community project](https://github.com/AvaloniaCommunity/Live.Avalonia) to enable hot reload with Avalonia.

---

## Can Avalonia interop with native APIs?

Yes. See our [guide on using platform specific features](guides/building-cross-platform-applications/dealing-with-platforms#platform-abstraction). 

---

## Can I cross-compile for different platforms?

Yes. You can compile for macOS, Linux, Android and WebAssembly from Windows. You'll likely need to package your app on those platforms to create release packages of your app. 

You will require a Mac to build iOS applications.

---

## Can I build a mobile app with Avalonia?

Yes. You can develop for Android and iOS today. You should however give careful consideration to each platform and ensure that your app behaves well on smaller, touch focused devices.

---


## How can I get involved?

Check out the [community guide](community.md) to see how you can get involved with the project.

---

## What Linux Distros are supported?

* Debian 9 (Stretch)+
* Ubuntu 16.04+
* Fedora 30+

:::info
Skia is built against glibc. If your distro uses something else instead, you need to build your own libSkiaSharp.so at [SkiaSharp](https://github.com/mono/SkiaSharp) . We provide a precompiled binary _only_ for Intel x86-64. ARM/ARM64 support is planned.
:::

## What versions of macOS are supported?

* macOS High Sierra 10.13+

:::note
**Credits** - Portions of this documentation were adapted from [Dotnet docs](https://github.com/dotnet/docs/) licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
:::
