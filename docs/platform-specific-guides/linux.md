---
id: linux
title: Desktop Linux
description: How Avalonia runs on desktop Linux, including the experimental Wayland backend, WSL 2 setup, and accessibility support with AT-SPI2.
doc-type: overview
---

## How Avalonia runs on Linux

Avalonia uses the Win32 API on Windows, its own native Objective-C++ backend on macOS, and on Linux it targets X11 by default. Most Linux distributions that support the .NET SDK and have X11, Wayland, or framebuffer capabilities will run Avalonia applications.

On Wayland desktops, Avalonia applications run through the XWayland compatibility layer by default. Starting with Avalonia 12.1.0, you can instead opt into the native [Wayland backend](#wayland).

## Wayland

The [`Avalonia.Wayland`](https://www.nuget.org/packages/Avalonia.Wayland) package provides a native Wayland backend. It communicates with the compositor using the Wayland protocol directly, instead of going through XWayland.

The backend supports mouse, touch, and keyboard input. It also supports clipboard and drag-and-drop. Rendering uses OpenGL or OpenGL ES through EGL, with an optional [dma-buf swapchain](https://docs.kernel.org/userspace-api/dma-buf-alloc-exchange.html) path.

:::info
The Wayland backend is experimental. `UsePlatformDetect()` does not select it automatically; you must enable it explicitly.
:::

### Enabling the Wayland backend

1. Add the `Avalonia.Wayland` package to your project:

   ```bash
   dotnet add package Avalonia.Wayland
   ```

2. Call `UseWayland()` on your [`AppBuilder`](/api/avalonia/appbuilder) in `Program.cs`:

   ```csharp
   public static AppBuilder BuildAvaloniaApp()
       => AppBuilder.Configure<App>()
           .UseWayland();
   ```

`UseWayland()` always initializes the Wayland backend, and there is no automatic fallback: the application will not start in an environment without a Wayland compositor. For applications that must also run on other operating systems or on X11 sessions, select the backend conditionally. For example, check the `WAYLAND_DISPLAY` environment variable:

```csharp
public static AppBuilder BuildAvaloniaApp()
{
    var builder = AppBuilder.Configure<App>().UsePlatformDetect();

    if (OperatingSystem.IsLinux()
        && Environment.GetEnvironmentVariable("WAYLAND_DISPLAY") is not null)
    {
        builder = builder.UseWayland();
    }

    return builder;
}
```

### Configuration options

To configure the backend, pass a `WaylandPlatformOptions` instance to the `AppBuilder`:

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UseWayland()
        .With(new WaylandPlatformOptions
        {
            UseDmabufSwapchain = true
        });
```

| Option | Default | Description |
|---|---|---|
| `WlDisplayName` | `null` | The Wayland display to connect to (for example, `wayland-0`). When `null`, the `WAYLAND_DISPLAY` environment variable is used. |
| `EnableReconnects` | `true` | Reconnects to the compositor automatically when the connection is lost. |
| `UseDmabufSwapchain` | `null` | Uses a dma-buf-based swapchain for GPU rendering. When `null`, the backend decides based on compositor and driver capabilities. |
| `GlProfiles` | OpenGL 4.0 down to OpenGL ES 2.0 | The OpenGL and OpenGL ES versions to try, in priority order, when creating the GL context. |
| `UseGLibMainLoop` | `false` | Runs the UI thread on a GLib main loop. Enable this when your application uses GLib-based libraries on the main thread. |

#### Advanced options

The following options support specialized scenarios such as compositor integration and backend testing. Typical applications do not need to set them.

| Option | Default | Description |
|---|---|---|
| `DisplayFd` | `null` | An already-opened file descriptor for the Wayland display socket, used instead of connecting to a named display. When set, `WlDisplayName` is ignored and automatic reconnects are disabled, because libwayland consumes the file descriptor. |
| `ForceDrawnDecorations` | `false` | Makes windows behave as if the compositor never advertised server-side decoration support, so client-side decorations are always used. Intended primarily for testing on compositors that otherwise enforce server-side decorations, such as KWin. Marked `[Experimental]`: using it requires suppressing the `AVALONIA_WAYLAND_FORCE_CSD` compiler diagnostic. |
| `ExternalGLibMainLoopExceptionLogger` | `null` | Receives exceptions that would otherwise be ignored because they occur outside an Avalonia-controlled run loop frame. Only used when `UseGLibMainLoop` is enabled. |

### Current limitations

Some KDE-specific integrations are not yet available on the Wayland backend: the global application menu, window icons, and blur-behind effects. Applications that depend on these features should continue to use the X11 backend.

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
