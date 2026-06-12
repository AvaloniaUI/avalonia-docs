---
id: linux
title: Desktop Linux
description: How Avalonia runs on desktop Linux, including X11 platform options, WSL 2 setup, and accessibility support with AT-SPI2.
doc-type: overview
---

## How Avalonia runs on Linux

Avalonia uses the Win32 API on Windows, its own native Objective-C++ backend on macOS, and on Linux it targets X11 directly. Most Linux distributions that support the .NET SDK and have X11 or framebuffer capabilities will run Avalonia applications.

:::note
Wayland support is coming in Avalonia 12.0.
:::

## Configuring X11 platform options

`X11PlatformOptions` controls how Avalonia renders and integrates with the desktop on Linux. Apply it by passing to `.With()` in the `AppBuilder` in `Program.cs`:

```csharp
AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .With(new X11PlatformOptions
    {
        RenderingMode = new[]
        {
            X11RenderingMode.Glx,
            X11RenderingMode.Software
        },
        UseDBusMenu = true
    });
```

The following options are available.

- [Rendering mode](#rendering-mode)
- [Rendering options](#rendering-options)
- [Desktop integration options](#desktop-integration-options)
- [Input options](#input-options)
- [Event loop options](#event-loop-options)

### Rendering mode

`RenderingMode` is an ordered list of graphics backends. Avalonia tries each one in turn and uses the first that initializes successfully, so the first entry has the highest priority. The default is `Glx`, then `Software`.

| Mode | Description |
|---|---|
| `Glx` | GPU rendering through GLX (OpenGL on X11). The default GPU backend. |
| `Egl` | GPU rendering through native Linux EGL. |
| `Vulkan` | GPU rendering through Vulkan. |
| `Software` | CPU rendering into a framebuffer. |

To support the widest range of devices, including remote sessions and virtual machines without GPU acceleration, include `Software` as a fallback. If none of the listed modes initialize, Avalonia throws an `InvalidOperationException`.

### Rendering options

| Option | Type | Default | Description |
|---|---|---|---|
| `RenderingMode` | `IReadOnlyList<X11RenderingMode>` | `Glx`, `Software` | Ordered list of graphics backends with fallback, described above. |
| `GlProfiles` | `IList<GlVersion>` | OpenGL 4.0, 3.2, 3.0; OpenGL ES 3.2, 3.0, 2.0 | OpenGL and OpenGL ES profiles tried when using `Glx` or `Egl` rendering, in priority order. |
| `GlxRendererBlacklist` | `IList<string>` | `llvmpipe`, `SVGA3D` | GLX renderer names that force a fallback away from `Glx`. The defaults skip the `llvmpipe` software rasterizer and the `SVGA3D` VMware driver. |
| `ShouldRenderOnUIThread` | `bool` | `false` | Renders on the UI thread instead of a dedicated render thread. Useful on single-core devices. |
| `UseRetainedFramebuffer` | `bool?` | `null` | When using software rendering, keeps an offscreen bitmap of the previous frame for each window. Saves a blit at the cost of higher memory use with many windows. |

### Desktop integration options

| Option | Type | Default | Description |
|---|---|---|---|
| `UseDBusMenu` | `bool` | `true` | Exports the application menu over D-Bus for global menu bars on desktop environments that support them, such as KDE, and XFCE or MATE with the appropriate plugin. |
| `UseDBusFilePicker` | `bool` | `true` | Uses the D-Bus portal [file picker](/docs/services/storage/file-picker-options) instead of GTK. |
| `EnableSessionManagement` | `bool` | `true` | Enables the X Session Management Protocol, letting the application respond to session shutdown requests. Set the `AVALONIA_X11_USE_SESSION_MANAGEMENT` environment variable to `0` to disable it by default. |
| `WmClass` | `string?` | entry assembly name | Sets the X11 `WM_CLASS` window property. Window managers use it to group windows and match the application to its `.desktop` entry and icon. |
| `OverlayPopups` | `bool` | `false` | Embeds popups inside the window instead of creating separate top-level popup windows. |

### Input options

| Option | Type | Default | Description |
|---|---|---|---|
| `EnableIme` | `bool?` | `true` | Enables the input method editor for composing characters that are not on the keyboard. Used automatically for Mandarin, Japanese, Vietnamese, and Korean input. |
| `EnableMultiTouch` | `bool?` | `true` | Recognizes more than one simultaneous point of contact on a touchpad or touchscreen. |
| `EnableInputFocusProxy` | `bool` | `false` | Enables the X11 input focus proxy. |

### Event loop options

| Option | Type | Default | Description |
|---|---|---|---|
| `UseGLibMainLoop` | `bool` | `false` | Uses a `GMainLoop`-based dispatcher instead of the default epoll-based one. Enable it to use GLib-based libraries on the main thread. |
| `ExternalGLibMainLoopExceptionLogger` | `Action<Exception>?` | `null` | Callback to inspect managed exceptions raised on a GLib main loop that Avalonia does not control. Relevant only when `UseGLibMainLoop` is `true`. |

:::caution
`EnableDrawnDecorations` and `ForceDrawnDecorations` enable client-side window decorations (titlebar, borders, and resize grips drawn by Avalonia rather than the window manager). Both are experimental, used mainly for testing, and may change or be removed in a future release.
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

[Orca](https://orca.gnome.org/) is the default screen reader on most GNOME-based distributions. To verify your application's accessibility:

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

[Accerciser](https://gitlab.gnome.org/GNOME/accerciser) is an interactive accessibility explorer that displays the AT-SPI2 tree. It is useful for verifying that your controls expose the correct roles, names, and states:

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
