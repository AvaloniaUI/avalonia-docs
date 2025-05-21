---
id: supported-platforms
title: 支持的平台
---

Avalonia 应用程序可以为以下平台编写：

| 平台    | 支持情况 |
|-------------|-----------|
| `Windows`     | ✔️         |
| `macOS `      | ✔️         |
| `Linux`       | ✔️         |
| `iOS`        | ✔️         |
| `Android`     | ✔️         |
| `WebAssembly` | ✔️         |

## Windows

* Windows 8.1
* Windows 10
* Windows 11

虽然 Avalonia 应用程序可以在 Windows 7 上成功运行，但这个传统平台只获得有限的支持。我们不再为 Windows 7 特有的问题提供错误修复。

## macOS

* macOS 10.14 (Mojave)
* macOS 10.15 (Catalina)
* macOS 11 (Big Sur)
* macOS 12 (Monterey)
* macOS 13 (Ventura)
* macOS 14 (Sonoma)
* macOS 15 (Sequoia)

Avalonia 也可以在 macOS 10.13 (High Sierra) 上运行，但我们正在迁移到 Metal GPU API，该 API 目前默认处于禁用状态。计划在某个小版本更新中启用它。

:::important
可以使用 Avalonia 在 Windows、macOS 和 Linux 上开发 macOS 应用程序。如果您计划签名和公证您的 macOS 应用程序以进行分发，您将需要一台安装了 XCode 的 Mac 设备。
:::

## Linux

* Debian 9+
* Ubuntu 16.04+
* Fedora 30+

Avalonia 在大多数支持 .NET SDK 并具有 X11 或帧缓冲功能的 Linux 发行版上运行良好。虽然我们官方支持 Debian 9+、Ubuntu 16.04+ 和 Fedora 30+，但许多其他发行版也可以毫无问题地运行 Avalonia 应用程序，而且我们积极努力确保广泛的 Linux 兼容性。

对于拥有 [支持协议](https://avaloniaui.net/support) 的客户，我们提供扩展的 Linux 发行版覆盖范围，并可以协助满足特定的发行版需求。Wayland 支持目前处于内部预览阶段，并将在即将发布的版本中提供。

WSL 2 发行版也受支持，但需要单独安装 `libice6`、`libsm6` 和 `libfontconfig1` 依赖项。

:::info
Skia 是基于 glibc 2.17 构建的。如果您的发行版使用的是其他版本，则需要在 [SkiaSharp](https://github.com/mono/SkiaSharp) 上自行构建 libSkiaSharp.so。您也可以访问 SkiaSharp 的主页以获取有关支持版本的更多信息。
:::

## iOS 

* iOS 13
* iOS 14
* iOS 15
* iOS 16
* iOS 17
* iOS 18

:::note
iOS 支持需要 .NET 7。
:::

## Android 

| 名称                | 版本号 | API 级别 |
|---------------------|---------|-----|
| Android Lollipop    | 5.0     | 21  |
| Android Lollipop    | 5.1     | 22  |
| Android Marshmallow | 6.0     | 23  |
| Android Nougat      | 7.0     | 24  |
| Android Nougat      | 7.1     | 25  |
| Android Oreo        | 8.0     | 26  |
| Android Oreo        | 8.1     | 27  |
| Android Pie         | 9       | 28  |
| Android 10          | 10      | 29  |
| Android 11          | 11      | 30  |
| Android 12          | 12      | 31  |
| Android 12L         | 12.1    | 32  |
| Android 13          | 13      | 33  |
| Android 14          | 14      | 34  |
| Android 15          | 15      | 35  |
| Android 16          | 16      | 36  |

:::note
Android 支持需要 .NET 7。
:::

## WebAssembly (浏览器)
从技术上讲，任何具有完整 WebAssembly 支持的浏览器都应该可以运行 - [https://caniuse.com/wasm](https://caniuse.com/wasm)。

为了获得最佳性能和支持，我们推荐使用最新版本的 Chrome 或 Safari。

:::note
浏览器支持需要 .NET 7。从 11.0.6 开始，我们推荐使用 .NET 8。
:::

## 其他平台支持
Avalonia 还支持 Tizen 和 tvOS，但这是由社区提供的。
