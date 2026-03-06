---
id: linux
title: Linux
---

## Supported Distributions

The following Linux distributions are comprehensively tested and supported:

* **Debian**: Version 9 and newer
* **Ubuntu**: Version 16.04 and newer
* **Fedora**: Version 30 and newer

### Other Distributions

Avalonia XPF can run on many other Linux distributions beyond those listed above. If you are using a distribution that is not officially supported:

* The Avalonia support team can help ensure compatibility with your chosen distribution
* Distribution-specific issues are handled on a case-by-case basis
* Additional configuration or testing may be required

:::note
Reach out to the support team early in your development process if you plan to deploy on a non-listed distribution.
:::


## Installing .NET

Many distributions provide a version of .NET in their package repositories, but these **should not** be used as they do not ship the required `Microsoft.NET.Sdk.WindowsDesktop` SDK. You must install .NET from the Microsoft package feed.

### Ubuntu

```bash
# Register the Microsoft package repository
wget https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

# Install the .NET SDK
sudo apt update
sudo apt install dotnet-sdk-8.0
```

### Debian

```bash
wget https://packages.microsoft.com/config/debian/$(cat /etc/debian_version | cut -d. -f1)/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

sudo apt update
sudo apt install dotnet-sdk-8.0
```

### Fedora

```bash
sudo dnf install dotnet-sdk-8.0
```

Fedora includes Microsoft's .NET packages in its default repositories, and these are compatible with XPF.

### Other Distributions

For other distributions, add the [Microsoft package feed](https://packages.microsoft.com/) to your package manager and install the .NET SDK from there.

### Fixing a Broken .NET Installation

If you previously installed .NET from your distribution's package repository (rather than from Microsoft), you must uninstall it completely before installing from the Microsoft feed. Mixing package sources causes conflicts and missing SDK components.

```bash
# 1. Remove the distribution's .NET packages
sudo apt remove 'dotnet*' 'aspnet*' 'netstandard*'   # Debian/Ubuntu
# or
sudo dnf remove 'dotnet*' 'aspnet*' 'netstandard*'   # Fedora

# 2. Remove any .NET install directories
sudo rm -rf /usr/share/dotnet
sudo rm -rf /usr/lib/dotnet

# 3. Remove the distribution's .NET package source to prevent it from being reinstalled
# On Ubuntu, check for and remove:
sudo rm /etc/apt/sources.list.d/*dotnet* 2>/dev/null
sudo rm /etc/apt/preferences.d/*dotnet* 2>/dev/null

# 4. Install .NET from the Microsoft feed (see instructions above)
```

:::danger
A mixed installation (some packages from your distro, some from Microsoft) will cause hard-to-diagnose build failures. If `dotnet --list-sdks` does not show `Microsoft.NET.Sdk.WindowsDesktop`, your installation is incorrect.
:::

## Other Dependencies

The following dependencies are required to run XPF: `libice6 libsm6 libfontconfig1 libgdiplus`

On a [Debian-based distribution](https://en.wikipedia.org/wiki/Category:Debian-based_distributions) run the following command to install these dependencies:

```bash
sudo apt install libice6 libsm6 libfontconfig1 libgdiplus
```

For other distributions, use the distribution's package manager to install the required dependencies.

## Publishing for Linux

Always publish XPF applications from the command line rather than from Visual Studio. Visual Studio publishing can produce incomplete output that is missing native libraries (such as `libSkiaSharp.so`).

```bash
dotnet publish -r linux-x64 -c Release
```

For self-contained deployments:

```bash
dotnet publish -r linux-x64 -c Release --self-contained
```

:::caution
Publishing via Visual Studio may omit critical native dependencies. If you encounter `DllNotFoundException` for `libSkiaSharp` or similar errors, switch to CLI publishing.
:::

### Native Library Resolution with ReadyToRun

When using `PublishReadyToRun`, the .NET runtime may alter how native libraries are resolved. If your application fails to locate `.so` files at runtime:

- Ensure native libraries are in the same directory as the executable
- For relocated native libraries, set `LD_LIBRARY_PATH` to include the library directory
- Consider using self-contained publishing, which places all dependencies together

## Debugging on Linux

### From Windows (Visual Studio)

To debug an XPF application running on Linux from Visual Studio on Windows:

1. Build for linux-x64 from the command line:
   ```bash
   dotnet publish -r linux-x64 -c Debug
   ```
2. Copy the output to your Linux machine or WSL2 instance
3. Run the application on Linux
4. In Visual Studio, use **Debug > Attach to Process**, select the WSL2 or SSH connection type, and attach to your running process

### From VS Code

Use VS Code with the C# DevKit extension. Configure a `launch.json` for remote debugging over SSH or WSL2.

### From JetBrains Rider

Rider supports remote debugging via SSH natively, and supports WSL2 through the Gateway feature.

:::tip
The `net8.0-windows` target framework works on non-Windows platforms when using the XPF SDK. You do not need to change the target framework to build for Linux.
:::

## Tray Icons

XPF supports system tray icons on Linux through the StatusNotifierItem/AppIndicator protocol.

**GNOME** does not include tray icon support by default. Install the [AppIndicator GNOME Extension](https://extensions.gnome.org/extension/615/appindicator-support/) to enable it.

**KDE Plasma** supports tray icons natively with no additional configuration.

## File Dialogs on Older Distributions

On older Linux distributions (such as RHEL 8), the GNOME version may be too old to support the DBus-based file dialog protocol. This can cause `OpenFolderDialog.InitialDirectory` and similar properties to be ignored.

To work around this, disable the DBus file picker in your [custom initialization](/xpf/guides/customizing-initialization):

```csharp
AppBuilder.Configure<AvaloniaUI.Xpf.Helpers.DefaultXpfAvaloniaApplication>()
    .UsePlatformDetect()
    .With(new X11PlatformOptions { UseDBusFilePicker = false })
    .WithAvaloniaXpf()
    .SetupWithLifetime(new ClassicDesktopStyleApplicationLifetime
    {
        ShutdownMode = ShutdownMode.OnExplicitShutdown
    });
```

This falls back to the GTK file dialog, which supports `InitialDirectory` on older systems.

## Win32 API Shim Conflicts with Native APIs

If your application calls native Linux APIs (such as X11 functions via `DllImport`) and also enables Win32 API shims, the shim layer may intercept those native calls and cause `EntryPointNotFoundException`.

To resolve this, move native Linux API calls to a separate assembly and exclude it from the Win32 shim:

```csharp
AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.AutoEnable(asm =>
{
    // Skip the assembly containing native Linux API calls
    if (asm.GetName().Name == "MyLinuxNativeInterop")
        return true; // true = skip this assembly
    return false;
});
```

Alternatively, use `WinApiShimSetup.AddLibrary` to enable shims only for specific assemblies rather than using `AutoEnable`.

## Launching from systemd

When launching XPF applications as systemd services on X11, a race condition can occur where the application starts before the window manager is fully initialized. This can cause `WindowStyle="None"` to be ignored, resulting in a visible titlebar.

Add a startup delay to your systemd service file:

```ini
[Service]
ExecStartPre=/bin/sleep 5
ExecStart=/path/to/your/application
```

## WebView on Linux

XPF provides web content embedding on Linux through `NativeWebDialog` (from the `Avalonia.Xpf.Controls.WebView` NuGet package). The embeddable `NativeWebView` control is not supported on Linux.

`NativeWebDialog` requires `libwebkit2gtk-4.1-dev`:

```bash
sudo apt install libwebkit2gtk-4.1-dev
```

:::note
Version 4.1 of webkit2gtk is required. Older versions (4.0) do not support all features.
:::

## Known Limitations

- **UI test automation**: Avalonia does not currently support the AT-SPI2 accessibility protocol on Linux. Automated UI testing tools that rely on accessibility APIs (such as pywinauto or Appium) have limited functionality.
- **Transparent window click-through**: As on macOS, XPF does not support clicking through transparent regions of a window on Linux.
- **Wayland keyboard isolation**: On Wayland compositors, only the focused window receives keyboard input. There is no mechanism to direct keyboard input to a non-focused window.
- **Remote desktop transparency**: Some remote desktop tools (such as MobaXterm) do not support alpha-channel transparency, which can cause transparent windows to appear with a white background.
