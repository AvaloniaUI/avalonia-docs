---
id: linux
title: Linux
---

## How Avalonia runs on Linux

Avalonia uses the Win32 API on Windows, its own native Objective-C++ backend on macOS, and on Linux it targets X11 directly. Most Linux distributions that support the .NET SDK and have X11 or framebuffer capabilities will run Avalonia applications.

Wayland support is currently in private preview and will be available in an upcoming release.

## WSL 2

Avalonia runs under WSL 2 distributions, but some libraries that are typically pre-installed on full desktop distributions need to be installed manually:

```bash
sudo apt install libice6 libsm6 libfontconfig1
```

## See also

- [Supported platforms](/docs/supported-platforms) for Linux distribution tier support
- [Deploying to Linux](/docs/deployment/linux)
- [Raspberry Pi](/docs/platform-specific-guides/raspberry-pi)
