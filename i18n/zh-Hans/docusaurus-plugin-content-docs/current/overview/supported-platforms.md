---
id: supported-platforms
title: 平台支持
---

Avalonia 应用程序可为以下平台开发：

| 平台          | 支持情况   |
|---------------|------------|
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

虽然 Avalonia 应用程序可以在 Windows 7 上成功运行，但我们对这个旧平台仅提供有限支持，不再针对 Windows 7 特有的问题进行 bug 修复。

## macOS

* macOS 10.14 (Mojave)
* macOS 10.15 (Catalina)
* macOS 11 (Big Sur)
* macOS 12 (Monterey)
* macOS 13 (Ventura)
* macOS 14 (Sonoma)
* macOS 15 (Sequoia)

Avalonia 也支持 macOS 10.13 (High Sierra)，但我们正在迁移至 Metal GPU API（当前默认禁用），计划在后续次要更新中启用该功能。

:::important
您可以在 Windows、macOS 和 Linux 系统上开发 macOS 应用程序。如果需要对 macOS 应用进行签名和公证以便分发，则需要安装 XCode 的 Mac 设备。  
:::

## Linux

* Debian 9+
* Ubuntu 16.04+
* Fedora 30+

只要 Linux 发行版支持 .NET SDK 并具备 X11 或 framebuffer 能力，Avalonia 即可稳定运行。虽然我们官方支持 Debian 9+、Ubuntu 16.04+ 和 Fedora 30+，但许多其他发行版也能无障碍运行 Avalonia 应用程序。我们持续努力确保广泛的 Linux 兼容性。

对于拥有[支持协议](https://avaloniaui.net/support)的客户，我们提供更广泛的 Linux 发行版覆盖，并可协助满足特定发行版需求。Wayland 支持目前处于私有预览阶段，将在后续版本中正式发布。

WSL 2 发行版同样受支持，但需单独安装 `libice6`、`libsm6` 和 `libfontconfig1` 依赖项。

:::info
Skia 基于 glibc 2.17 构建。如果您的发行版使用其他库，需在 [SkiaSharp](https://github.com/mono/SkiaSharp) 自行构建 libSkiaSharp.so。您也可访问 SkiaSharp 主页获取支持版本的详细信息。
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

## WebAssembly（浏览器）
从技术上讲，任何完整支持 WebAssembly 的浏览器均可运行 - 详见 https://caniuse.com/wasm。

为获得最佳性能和支持，我们推荐使用最新版本的 Chrome 或 Safari。

:::note
浏览器支持需要 .NET 7。从 11.0.6 版本开始，我们推荐使用 .NET 8。
:::

## 其他平台支持
Avalonia 也支持 Tizen 和 tvOS，但这些支持由社区提供。