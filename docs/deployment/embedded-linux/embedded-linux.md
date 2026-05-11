---
id: embedded-linux
title: Embedded Linux
description: Publish, transfer, and run an Avalonia application on an embedded Linux device using DRM/KMS.
doc-type: how-to
---

Deploying an Avalonia application to an embedded Linux device differs from desktop deployment in several ways. There is no package manager on the target (in most cases), no desktop environment to integrate with, and the application typically runs as the sole graphical process. This page covers publishing, transferring, and running your application on an embedded Linux target.

## Publishing

Publish your application as a self-contained, single-file executable targeting the appropriate runtime identifier (RID). Self-contained deployment is strongly recommended for embedded targets because the .NET runtime is unlikely to be pre-installed.

Choose the RID that matches your target hardware:

| Target architecture | RID | Common devices |
|---|---|---|
| ARM 32-bit | `linux-arm` | Raspberry Pi (32-bit OS), older ARM SBCs |
| ARM 64-bit | `linux-arm64` | Raspberry Pi 4/5 (64-bit OS), NVIDIA Jetson, BeagleBone AI, most modern ARM SBCs |
| x64 | `linux-x64` | Intel NUC, industrial panel PCs, AMD embedded boards |

```bash
dotnet publish -c Release -r linux-arm64 --self-contained true \
  -p:PublishSingleFile=true \
  -p:PublishTrimmed=true \
  -p:PublishReadyToRun=true \
  -p:IncludeNativeLibrariesForSelfExtract=true
```

Replace `linux-arm64` with the appropriate RID for your device.

### Publish options explained

| Option | Purpose |
|---|---|
| `--self-contained true` | Bundles the .NET runtime so it does not need to be installed on the target. |
| `-p:PublishSingleFile=true` | Produces a single executable file instead of a directory of assemblies. |
| `-p:PublishTrimmed=true` | Removes unused code, significantly reducing the output size. |
| `-p:PublishReadyToRun=true` | Pre-compiles assemblies to native code for faster startup. |
| `-p:IncludeNativeLibrariesForSelfExtract=true` | Embeds native libraries (SkiaSharp, HarfBuzz) inside the single file. |

:::tip
Trimming can remove code that your application uses via reflection. If you encounter `MissingMethodException` or similar errors at runtime, configure [trimmer root assemblies](https://learn.microsoft.com/en-us/dotnet/core/deploying/trimming/trimming-options) to preserve the affected types.
:::

## Transferring to the device

Copy the published output to the target device. Common approaches:

**SCP (over SSH):**
```bash
scp -r ./publish/ user@device-hostname:/home/user/myapp/
```

**rsync (incremental, faster for repeated deployments):**
```bash
rsync -avz --progress ./publish/ user@device-hostname:/home/user/myapp/
```

**USB drive:**
Copy the publish directory to a USB drive, mount it on the target, and copy the files.

## Running the application

Set the executable permission and run with the `--drm` flag:

```bash
chmod +x /home/user/myapp/MyApp
sudo ./home/user/myapp/MyApp --drm
```

The `--drm` argument tells the application to use DRM/KMS output instead of trying to connect to X11 or Wayland. Running with `sudo` is required because DRM device access typically needs root privileges.

:::tip
To avoid running as root, add your user to the `video` and `input` groups:
```bash
sudo usermod -aG video,input $USER
```
Log out and back in for the group changes to take effect. You can then run the application without `sudo`.
:::

## Auto-starting on boot

For kiosk or appliance scenarios, configure the application to start automatically when the device boots.

### Using a systemd service

Create a service file at `/etc/systemd/system/myapp.service`:

```ini
[Unit]
Description=My Avalonia Application
After=multi-user.target

[Service]
Type=simple
User=appuser
Group=appuser
SupplementaryGroups=video input
ExecStart=/opt/myapp/MyApp --drm
Restart=on-failure
RestartSec=5
Environment=DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1

[Install]
WantedBy=multi-user.target
```

Replace `appuser` with the user account on your device, and adjust the `ExecStart` path to match your deployment location. `/opt/myapp/` is a common convention for application binaries on embedded systems, but any path works.

Enable and start the service:

```bash
sudo systemctl enable myapp.service
sudo systemctl start myapp.service
```

### Viewing logs

```bash
journalctl -u myapp.service -f
```

## Reducing image size

Embedded systems often have limited storage. Several strategies help reduce the deployed application size:

- **Trimming** (enabled above) removes unused .NET assemblies and methods.
- **Native AOT** compilation produces a smaller, fully native binary with no .NET runtime overhead. See [Native AOT deployment](/docs/deployment/native-aot) for details.
- **Invariant globalization** (`DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1`) eliminates ICU library dependencies, saving roughly 30 MB. Only use this if your application does not need locale-specific formatting or collation.

## Required libraries on the target

Even with self-contained deployment, certain native Linux libraries must be present on the target. On Debian-based systems (Raspberry Pi OS, Armbian, Ubuntu):

```bash
sudo apt-get install libgbm1 libgl1-mesa-dri libegl1-mesa libinput10
```

Other distributions will have equivalent packages under slightly different names.

| Package | What it provides | Why Avalonia needs it |
|---|---|---|
| `libgbm1` | Generic Buffer Management (GBM) allocator. Creates GPU-accessible buffers that DRM can scan out to the display. | Avalonia allocates its rendering surfaces through GBM when running in DRM mode. Without it, no framebuffers can be created. |
| `libgl1-mesa-dri` | Mesa's DRI (Direct Rendering Infrastructure) drivers. These are the GPU-specific modules (e.g., `vc4` for Raspberry Pi, `panfrost` for Mali GPUs) that translate OpenGL calls into hardware commands. | Provides the actual GPU acceleration. Even on devices without a dedicated GPU, the software rasterizer (`llvmpipe`) lives here. |
| `libegl1-mesa` | Mesa's implementation of EGL (originally "Embedded-System Graphics Library", now a standalone name maintained by Khronos). EGL is a platform-independent API that sits between a rendering API (such as OpenGL ES) and the native display system. It handles creating rendering contexts, binding them to drawing surfaces, and managing resources like buffers and sync objects. On desktop Linux with X11, EGL talks to the X server. In an embedded DRM setup, EGL talks directly to GBM surfaces instead. | Avalonia uses EGL to create an OpenGL ES rendering context and bind it to a GBM surface backed by a DRM framebuffer. This is what connects Avalonia's drawing commands to actual pixels on the display. |
| `libinput10` | The libinput library. Provides a unified API for reading input events from keyboards, mice, touchpads, and touchscreens via the kernel's evdev interface. | Avalonia reads all user input through libinput when running outside a desktop environment. Without it, touch, mouse, and keyboard input will not work. |

## See also

- [Embedded Linux platform integration](/docs/platform-specific-guides/embedded-linux) for framebuffer and DRM concepts
- [Running on Raspberry Pi](/docs/platform-specific-guides/embedded-linux/raspberry-pi) for a hardware-specific walkthrough
- [Desktop Linux deployment](/docs/deployment/linux) for `.deb` packaging
- [Native AOT deployment](/docs/deployment/native-aot)
