---
id: windows
title: Windows issues
sidebar_label: Windows
description: Troubleshoot Windows-specific Avalonia issues including signing, rendering, scaling, and dark theme title bar problems.
doc-type: troubleshooting
---

## Packaging and signing

#### Signed executable still triggers SmartScreen warnings

This is normal for new certificates and applications. Different certificate types have different trust timelines:

- **EV certificates and Microsoft Trusted Signing**: Immediate SmartScreen bypass.
- **OV certificates**: Require reputation building (typically 3 to 6 months of consistent distribution).

To accelerate reputation building with an OV certificate:

1. Submit your signed application to the [Microsoft Intelligent Security Graph (ISG)](https://www.microsoft.com/en-us/wdsi/filesubmission) for analysis.
2. Distribute your application through well-known download sources so that Windows Defender telemetry can establish trust.
3. Ensure every release is signed with the same certificate. Switching certificates resets your reputation.

If SmartScreen continues to block your application after several months, verify that the certificate chain is complete and that your timestamp server is reachable during signing. An incomplete chain or missing timestamp can prevent reputation from accumulating.

#### Azure authentication failures

If signing through Azure Trusted Signing fails with authentication errors:

1. Verify that the following environment variables are set correctly: `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`.
2. Confirm that the service principal has the **Trusted Signing Certificate Profile Signer** role assigned in the Azure portal.
3. Check that your Azure Trusted Signing account and certificate profile are in the same region.
4. If you use managed identity instead of a service principal, ensure that the hosting environment (such as Azure DevOps or GitHub Actions) supports it and that the identity is correctly linked.
5. As an alternative, install the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest) and follow the [az login](https://learn.microsoft.com/en-us/cli/azure/reference-index?view=azure-cli-latest#az-login) flow to authenticate interactively and rule out credential issues.

## Rendering

#### Application shows a blank or black window

If your application window appears but shows no content:

1. Check whether you are running under a remote desktop session or a virtual machine without GPU passthrough. Avalonia falls back to software rendering in these environments, but some configurations may still fail.
2. Force software rendering to confirm whether the issue is GPU-related. Add the following to your `Program.cs` before building the app:

```csharp
AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .With(new Win32PlatformOptions
    {
        RenderingMode = new[]
        {
            Win32RenderingMode.Software
        }
    })
    .StartWithClassicDesktopLifetime(args);
```

3. Update your GPU drivers. Outdated or buggy drivers are the most common cause of rendering failures on Windows.

#### Flickering or visual artifacts during window resize

Window resize flickering is a known limitation of the Win32 windowing model. To reduce it:

- Set `Background` on your top-level `Window` so that the clear color matches your application theme. This makes the flicker less noticeable.
- Avoid heavy layout recalculations triggered by resize. Use `LayoutTransformControl` or fixed-size inner panels where possible.

## High-DPI and scaling

#### Controls appear too small or too large on high-DPI displays

Avalonia respects the per-monitor DPI setting on Windows. If your application renders at an unexpected scale:

1. Verify that your application manifest does not override DPI awareness. If you have an `app.manifest` file, ensure it declares per-monitor DPI awareness (or remove any DPI-related entries and let Avalonia handle it).
2. Check the display scaling percentage in **Settings > Display > Scale and layout**. Avalonia should match this value automatically.
3. If you embed Avalonia inside a WPF or WinForms host, the host application's DPI awareness mode takes precedence. Ensure the host is configured for per-monitor V2 awareness.

#### Bitmap or image assets appear blurry

When images appear blurry on high-DPI screens, provide multiple resolution variants of your assets. Avalonia selects the best match for the current DPI. You can place scaled variants alongside your base asset:

```text
/Assets/logo.png        (1x, base)
/Assets/logo@2x.png     (2x, for 200% scaling)
```

## Theme and appearance

#### Title bar stays light when switching to dark theme on Windows 10

On Windows 10, the native title bar does not automatically follow the application's `RequestedThemeVariant`. This is a platform limitation: Windows 10 does not provide an official API for darkening the title bar. On Windows 11, Avalonia handles this automatically.

If you need a dark title bar on Windows 10, you have two options:

- **Use a custom title bar.** Set `ExtendClientAreaToDecorationsHint="True"` and `SystemDecorations="None"` to draw your own title bar with full theme control. See [Custom title bars](/docs/platform-specific-guides/windows#custom-title-bars) for details.
- **Use the undocumented DWM API.** Call `DwmSetWindowAttribute` with `DWMWA_USE_IMMERSIVE_DARK_MODE` (attribute 20) via P/Invoke. This works on Windows 10 build 18985 and later, but it is undocumented and may change in future Windows updates.

```csharp
using System.Runtime.InteropServices;
using Avalonia;

[DllImport("dwmapi.dll", PreserveSig = true)]
private static extern int DwmSetWindowAttribute(
    IntPtr hwnd, int attr, ref int value, int size);

private void SetDarkTitleBar(Window window, bool isDark)
{
    if (!OperatingSystem.IsWindows()) return;

    var handle = window.TryGetPlatformHandle()?.Handle;
    if (handle is null) return;

    int value = isDark ? 1 : 0;
    // Attribute 20: DWMWA_USE_IMMERSIVE_DARK_MODE
    DwmSetWindowAttribute(handle.Value, 20, ref value, sizeof(int));
}
```

Call this method after the window opens and whenever the theme changes (subscribe to `ActualThemeVariantChanged`).

## Window behavior

#### Window position or size not restored correctly

If you save and restore window bounds across sessions, be aware that monitor configurations can change. Always validate restored coordinates against the current screen layout using `Screens.All` before applying them. A window positioned off-screen will not be visible to your users.

#### Taskbar icon missing for borderless or custom-chrome windows

If your window uses `SystemDecorations="None"` or a custom titlebar and does not appear in the taskbar, ensure that you have not set `ShowInTaskbar="False"` unintentionally. Some extended window styles applied by Win32 can also suppress the taskbar entry. Setting `ShowInTaskbar="True"` explicitly resolves this in most cases.

## See also

- [Windows platform guide](/docs/platform-specific-guides/windows) for transparency, Mica, and Win32 integration details
- [macOS issues](macos.md) and [WebAssembly issues](webassembly.md) for other platform-specific troubleshooting
- [Logging errors and warnings](/docs/app-development/logging-errors-and-warnings) for capturing diagnostic output from your application
