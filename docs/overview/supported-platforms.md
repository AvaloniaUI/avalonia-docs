---
id: supported-platforms
title: Supported Platforms
---

Avalonia apps can be written for the following platforms:

| Platform    | Supported |
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

While Avalonia apps will successfully run on Windows 7, this legacy platform receives limited support. We no longer provide bug fixes for Windows 7-specific issues.

## macOS

* macOS 10.14 (Mojave)
* macOS 10.15 (Catalina)
* macOS 11 (Big Sur)
* macOS 12 (Monterey)
* macOS 13 (Ventura)
* macOS 14 (Sonoma)
* macOS 15 (Sequoia)

Avalonia also runs on macOS 10.13 (High Sierra), but we are in the process of migrating to the Metal GPU API, which is currently disabled by default. It is planned to be enabled during one of minor updates.

:::important
It is possible to develop for macOS on Windows, macOS and Linux using Avalonia. If you plan to sign and notarize your macOS application for distribution, you will require a Mac with XCode installed.  
:::

## Linux

* Debian 9+
* Ubuntu 16.04+
* Fedora 30+

Avalonia works reliably on most Linux distributions as long as they support the .NET SDK and have either X11 or framebuffer capabilities. While we officially support Debian 9+, Ubuntu 16.04+, and Fedora 30+, many other distributions run Avalonia applications without issues, and we actively work to ensure broad Linux compatibility. 

For customers with [support agreements](https://avaloniaui.net/support), we offer expanded Linux distribution coverage and can assist with specific distribution requirements. Wayland support is currently in private preview and will be available in an upcoming release.

WSL 2 distros are supported as well, but `libice6`, `libsm6` and `libfontconfig1` dependencies must be installed individually.

:::info
Skia is built against glibc 2.17. If your distro uses something else instead, you need to build your own libSkiaSharp.so at [SkiaSharp](https://github.com/mono/SkiaSharp). You also can visit SkiaSharp home page for more information about supported versions.
:::

## iOS 

* iOS 13
* iOS 14
* iOS 15
* iOS 16
* iOS 17
* iOS 18

:::note
.NET 7 is required for iOS support.
:::

## Android 

| Name                | Version Number | API Level |
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
.NET 7 is required for Android support.
:::

## WebAssemnly (Browser)
Any browser with full WebAssembly support technically should work - https://caniuse.com/wasm.

For the best performance and support we recommend latest Chrome or Safari versions.

:::note
.NET 7 is required for Browser support. Starting with 11.0.6 we recommend .NET 8.
:::

## Additional platform support
Avalonia also supports Tizen and tvOS, though this is provided by the community.