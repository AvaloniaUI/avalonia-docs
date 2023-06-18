---
id: faq
title: FAQ
---

## **Can I code my UI instead of using XAML?**

Yes. You can code your entire UI with your preferred .NET language.

### Is there a drag and drop visual designer?

No. Instead of providing a drag and drop designer, the Avalonia IDE extensions support a live previewer, which will render a preview of the UI, refreshing as your modify the XAML.

### Does Avalonia support Hot Reload?

You can use a [community project](https://github.com/AvaloniaCommunity/Live.Avalonia) to enable hot reload with Avalonia.

### Can Avalonia interop with native APIs?

Yes.

### Can I cross-compile for different platforms?

Yes. You can compile for macOS and Linux from Windows. You'll likely need to package your app on those platforms to create release packages of your app.

### Can I build a mobile app with Avalonia?

Yes. You can develop for Android today and we have a preview demonstrating the beginnings of iOS support. You should however give careful consideration to each platform and ensure that your app behaves well on smaller, touch focused devices.

### Can I build a website with Avalonia?

Its early days and not ready for production , but yes you can. Avalonia now supports [webassembly](https://webassembly.org). See a quick demo: [NodeEditor Demo](https://wieslawsoltes.github.io/NodeEditor/). This means that your full Avalonia application can run in all modern web browsers.

### How can I get involved?

Check out the [community guide](community.md) to see how you can get involved with the project.

### What Linux Distros are supported?

* Debian 9 (Stretch)+
* Ubuntu 16.04+
* Fedora 30+

:::info
Skia is built against glibc. If your distro uses something else instead, you need to build your own libSkiaSharp.so at [SkiaSharp](https://github.com/mono/SkiaSharp) . We provide a precompiled binary _only_ for Intel x86-64. ARM/ARM64 support is planned.
:::

### What versions of macOS are supported?

* macOS High Sierra 10.13+

:::success
**Credits**

Portions of this documentation were adapted from [Dotnet docs](https://github.com/dotnet/docs/) licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
:::
