---
id: supported-platforms
title: Supported Platforms
---

Avalonia apps can target Windows, macOS, Linux, iOS, Android, and WebAssembly. The level of support varies by operating system version, organised into three tiers. We review these tiers with each major Avalonia release, so platforms may move between tiers over time.

## Support tiers

### Tier 1

These are the operating systems we test against for every release. If something is broken on a Tier 1 platform, we'll fix it. We actively review and merge community PRs for these platforms too.

| Platform | Versions |
|---|---|
| Windows | 11 |
| macOS | 26 |
| iOS | 26 |
| iPadOS | 26 |
| Android | 16 |
| Ubuntu | 25.x |
| Fedora | 43 |
| Debian | 13 |

### Tier 2

Tier 2 platforms aren't part of our test matrix, but we do our best to keep things working where we can. That said, there are no guarantees here. Issues on Tier 2 platforms will always be deprioritised behind Tier 1 work, and some may never get fixed.

We'll consider community PRs for Tier 2 platforms, but it's at the maintainers' discretion. If a fix adds complexity or creates a maintenance burden that could affect Tier 1 stability, we may decline it. In some cases, we may ask that Tier 2 fixes be backed by a commercial engagement through [Enhanced Support](https://avaloniaui.net/support) or [Professional Services](https://avaloniaui.net/services), because even well-intentioned patches carry a long-tail cost to maintain over time.

| Platform | Versions |
|---|---|
| Windows | 10 |
| macOS | 14, 15 |
| iOS | 18+ |
| Android | 12+ |
| Ubuntu | 16+ |
| Fedora | 30+ |
| Debian | 9+ |

### Tier 3

If a platform isn't listed above, it's Tier 3. That includes older OS versions that have dropped out of Tier 1 or 2, plus Linux distributions we don't explicitly list (Arch, Alpine, NixOS, Gentoo, and so on).

We don't support Tier 3 platforms through the open-source project. Issues will be closed, and PRs won't be reviewed or merged. Even small, seemingly harmless fixes carry ongoing testing and maintenance costs that the project can't absorb for free.

If you need Avalonia to work on a Tier 3 platform, we're happy to help through [Enhanced Support](https://avaloniaui.net/support) or [Professional Services](https://avaloniaui.net/professional-services).

## Contributing platform-specific fixes

We love platform-specific contributions, but they need to align with the tiers above to keep the project healthy.

**Tier 1** fixes are always welcome and go through the normal review process.

**Tier 2** fixes are evaluated case by case. We'll look at the complexity involved, the risk of regression to Tier 1, and the ongoing cost to maintain it. If the maintenance burden is significant, we may ask that the work be backed by a commercial engagement.

**Tier 3** fixes require a commercial engagement before we'll review them. This applies no matter how small the change looks, because the cost isn't in the patch itself, it's in maintaining and testing it release after release.

If you're not sure whether your contribution needs a commercial engagement, just ask before you start work. We'd rather save you time up front.

## Platform notes

### Windows

Avalonia uses the Win32 API directly. No additional workloads or dependencies are needed beyond the .NET SDK.

### macOS

Avalonia ships its own native backend and doesn't require the .NET macOS workload. You can build macOS apps from Windows or Linux. If you need to sign and notarise your app for distribution, you'll need a Mac with Xcode installed. See the [macOS platform integration guide](/docs/platform-specific-guides/macos) for details.

### Linux

Avalonia works on most Linux distributions that support the .NET SDK and have either X11 or framebuffer capabilities. Wayland support is currently in private preview and will be available in an upcoming release.

Only the distributions listed in Tier 1 and Tier 2 are supported through the open-source project. Everything else, including musl-based distros like Alpine, rolling-release distros like Arch and NixOS, and source-based distros like Gentoo, falls under Tier 3.

WSL 2 distributions are supported, but you'll need to install `libice6`, `libsm6`, and `libfontconfig1` separately.

:::info
Skia is built against glibc 2.17. If your distribution uses a different C library, you'll need to build your own `libSkiaSharp.so`. See [SkiaSharp](https://github.com/mono/SkiaSharp) for details. Distributions that require a custom Skia build are considered Tier 3.
:::

### iOS and Android

.NET support on iOS and Android follows the MAUI lifecycle. See the [MAUI support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/maui) for details on which .NET SDK versions support which mobile OS versions. When Microsoft drops support for a mobile OS version under the MAUI policy, our support for that version ends too.

### WebAssembly

Avalonia runs in any browser with full WebAssembly support. See [Can I use WebAssembly](https://caniuse.com/wasm) for browser compatibility. WebAssembly support requires .NET 8 or later.
