---
id: linux
title: Desktop Linux
description: How Avalonia runs on desktop Linux, including WSL 2 setup and accessibility support with AT-SPI2.
doc-type: guide
---

## How Avalonia runs on Linux

Avalonia uses the Win32 API on Windows, its own native Objective-C++ backend on macOS, and on Linux it targets X11 directly. Most Linux distributions that support the .NET SDK and have X11 or framebuffer capabilities will run Avalonia applications.

:::note
Wayland support is coming in Avalonia 12.0.
:::

## WSL 2 (Windows Subsystem for Linux)

[WSL 2](https://learn.microsoft.com/en-us/windows/wsl/) is a feature of Windows that lets you run a full Linux environment directly on Windows without a traditional virtual machine or dual-boot setup. This is useful for developers who want to build and test Linux applications while staying in a Windows workflow.

Avalonia runs under WSL 2 distributions, but some libraries that are typically pre-installed on full desktop distributions need to be installed manually:

```bash
sudo apt install libice6 libsm6 libfontconfig1
```

## Accessibility

Avalonia exposes the accessibility tree to assistive technologies on Linux through the **AT-SPI2** (Assistive Technology Service Provider Interface) protocol. This allows screen readers such as Orca to discover and interact with Avalonia controls, including announcing control names, reading text content, and tracking focus changes.

AT-SPI2 support is enabled automatically when a D-Bus session bus is available and an accessibility service is running. No additional configuration is required in your application.

### Testing with Orca

[Orca](https://wiki.gnome.org/Projects/Orca) is the default screen reader on most GNOME-based distributions. To verify your application's accessibility:

1. Install Orca if not already present:
   ```bash
   sudo apt install orca
   ```
2. Enable accessibility in your desktop environment. On GNOME, open **Settings > Accessibility** and enable the **Screen Reader** toggle, or launch Orca from the terminal:
   ```bash
   orca &
   ```
3. Run your Avalonia application. Orca should announce controls as they receive focus.

### Testing with Accerciser

[Accerciser](https://wiki.gnome.org/Projects/Accerciser) is an interactive accessibility explorer that displays the AT-SPI2 tree. It is useful for verifying that your controls expose the correct roles, names, and states:

```bash
sudo apt install accerciser
accerciser &
```

Navigate the tree in Accerciser while interacting with your running application to inspect what information each control exposes.

For general guidance on making your application accessible, see [Accessibility](/docs/app-development/accessibility).

## See also

- [Supported platforms](/docs/supported-platforms) for Linux distribution tier support
- [Deploying to Desktop Linux](/docs/deployment/linux)
- [Embedded Linux](/docs/platform-specific-guides/embedded-linux) for framebuffer and DRM scenarios
- [Accessibility](/docs/app-development/accessibility) for automation properties and custom automation peers
