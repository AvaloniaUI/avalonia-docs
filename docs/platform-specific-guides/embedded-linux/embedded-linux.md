---
id: embedded-linux
title: Embedded Linux
---

Avalonia supports running on embedded Linux devices without a desktop environment. This includes single-board computers like the Raspberry Pi, industrial panels, kiosks, and point-of-sale terminals. Instead of connecting through a windowing system like X11, Avalonia renders directly to the display hardware using either the Linux framebuffer or the Direct Rendering Manager (DRM).

## Display output: framebuffer vs DRM

On a desktop Linux system, applications draw into windows managed by a compositor (X11 or Wayland). Embedded devices typically have no compositor. Instead, applications write pixels directly to the display hardware through one of two kernel interfaces.

### Linux framebuffer (`/dev/fb0`)

The Linux framebuffer (fbdev) is the older and simpler of the two interfaces. It exposes the display as a flat memory region that applications can write to. The kernel maps video memory into userspace, and writes to that memory appear on screen.

**How it works:**
1. The kernel driver maps the GPU's scanout buffer into `/dev/fb0`.
2. An application opens the device, calls `mmap()`, and gets a pointer to the pixel data.
3. Writing RGB values to that memory updates the display on the next refresh.

**Advantages:**
- Simple programming model.
- Works on nearly all Linux systems, including very old kernels.
- No GPU acceleration required.

**Limitations:**
- No hardware-accelerated rendering (no OpenGL/Vulkan).
- Single-buffered by default, which can cause visible tearing during updates.
- Only one application can use the framebuffer at a time.
- The fbdev subsystem is in maintenance mode in the Linux kernel. New hardware drivers target DRM instead.

### Direct Rendering Manager (DRM/KMS)

DRM is the modern Linux kernel subsystem for managing GPUs and display controllers. The Kernel Mode Setting (KMS) component of DRM handles display configuration: resolution, refresh rate, and which buffer is currently being scanned out.

**How it works:**
1. An application opens `/dev/dri/card0` (or another card device).
2. It queries available connectors (HDMI, DSI, etc.), encoders, and CRTMs using the KMS API.
3. It allocates GPU buffers (called GEM objects) and sets up a framebuffer object pointing to that memory.
4. It calls `drmModeSetCrtc` or `drmModePageFlip` to display the buffer.
5. Double-buffering is built in: the application draws to a back buffer while the front buffer is being displayed, then flips.

**Advantages:**
- Hardware-accelerated rendering through OpenGL ES or Vulkan (when the GPU supports it).
- Tear-free display through page-flipping.
- Multi-plane support for overlay composition.
- Active development in the Linux kernel with drivers for all modern SoCs.

**Limitations:**
- More complex API than framebuffer.
- Requires a GPU driver that supports KMS (all modern ARM SoCs do, but some very old or obscure hardware may not).

### Which to choose

| Factor | Framebuffer | DRM |
|---|---|---|
| Hardware acceleration | No | Yes (when GPU supports it) |
| Tearing | Possible | Tear-free with page-flip |
| Kernel support | Maintenance mode | Active development |
| Setup complexity | Lower | Moderate |
| Recommended for new projects | No | Yes |

**Use DRM for new projects.** The framebuffer interface works but is considered legacy. DRM provides better performance, tear-free rendering, and is the direction the Linux kernel is heading. Only fall back to framebuffer if your hardware lacks a KMS-capable GPU driver.

## The single-view application lifetime

Desktop Avalonia applications use `IClassicDesktopStyleApplicationLifetime`, which creates windows. On embedded Linux there is no window manager, so Avalonia uses `ISingleViewApplicationLifetime` instead. This lifetime gives you a single root view that fills the entire display.

Your `App.axaml.cs` must handle both lifetimes so the application works on desktop (for development) and on the embedded target:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
        desktop.MainWindow = new MainWindow();
    else if (ApplicationLifetime is ISingleViewApplicationLifetime singleView)
        singleView.MainView = new MainSingleView();

    base.OnFrameworkInitializationCompleted();
}
```

A common pattern is to create a `MainView` UserControl containing your actual UI, then host it in both `MainWindow` (for desktop) and `MainSingleView` (for embedded). This lets you develop and debug on your workstation, then deploy the same UI to the target device.

## Enabling DRM output

Add the `Avalonia.LinuxFramebuffer` package to your project:

```bash
dotnet add package Avalonia.LinuxFramebuffer
```

In `Program.cs`, check for a `--drm` command-line argument and start the appropriate lifetime:

```csharp
public static int Main(string[] args)
{
    var builder = BuildAvaloniaApp();
    if (args.Contains("--drm"))
    {
        SilenceConsole();
        // Avalonia auto-detects the output card.
        // To specify one explicitly: card: "/dev/dri/card1"
        return builder.StartLinuxDrm(args, card: null, options: new DrmOutputOptions
        {
            Scaling = 1.0,
        });
    }

    return builder.StartWithClassicDesktopLifetime(args);
}

private static void SilenceConsole()
{
    new Thread(() =>
    {
        Console.CursorVisible = false;
        while (true)
            Console.ReadKey(true);
    })
    { IsBackground = true }.Start();
}
```

The `SilenceConsole` method captures console input and hides the cursor. Without it, the blinking text cursor appears over your application's output.

## Display scaling

The `Scaling` property on `DrmOutputOptions` controls the DPI scaling factor. Fractional values are supported. For example, on a 1920x1080 display, setting `Scaling = 1.5` makes controls appear larger, as if rendering to a 1280x720 logical surface.

```csharp
return builder.StartLinuxDrm(args, card: null, options: new DrmOutputOptions
{
    Scaling = 1.5,
});
```

For the sharpest results, choose a scaling value that divides your display's physical resolution into whole numbers. For a 1920x1080 display, values like `1.25` (1536x864) and `1.5` (1280x720) work well. Non-integer results (e.g., `1.3`) still work, but edges may appear less crisp because `SnapToDevicePixels` cannot align precisely at all boundaries.

## Screen orientation

Many embedded displays are mounted in portrait or rotated positions. If your Linux display driver does not support hardware rotation, Avalonia can rotate the rendered output in software using the `Orientation` property on `DrmOutputOptions`.

```csharp
return builder.StartLinuxDrm(args, card: null, options: new DrmOutputOptions
{
    Scaling = 1.0,
    Orientation = SurfaceOrientation.Rotation90,
});
```

The available values are:

| Value | Rotation |
|---|---|
| `SurfaceOrientation.Rotation0` | No rotation (default) |
| `SurfaceOrientation.Rotation90` | 90 degrees clockwise |
| `SurfaceOrientation.Rotation180` | 180 degrees |
| `SurfaceOrientation.Rotation270` | 270 degrees clockwise |

Touch input coordinates are automatically adjusted to match the configured orientation. The rotation is set at startup and cannot be changed while the application is running.

:::note
Rotation uses an offscreen framebuffer and an OpenGL shader to transform the image. There is no performance cost when `Rotation0` is used.
:::

## Verifying your DRM setup

Before running an Avalonia application, you can verify that DRM is working with `kmscube`:

```bash
sudo apt-get install kmscube
sudo kmscube
```

If a spinning cube appears on the display, DRM is functioning correctly and Avalonia will be able to render.

## Touch input

Embedded devices frequently use touchscreens as the primary input method. Avalonia reads touch events through `libinput`, which is included in the required libraries listed above. Touch input works automatically when running via DRM.

For applications that need an on-screen keyboard (kiosks, point-of-sale systems, or any device without a physical keyboard), see the [Virtual Keyboard](virtual-keyboard) guide.

## See also

- [Running on Raspberry Pi](raspberry-pi) for a step-by-step hardware tutorial
- [Virtual Keyboard](virtual-keyboard) for on-screen keyboard support
- [Deploying to Embedded Linux](/docs/deployment/embedded-linux)
- [Desktop Linux](/docs/platform-specific-guides/linux) for X11 and Wayland environments
