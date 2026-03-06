---
id: faq
title: Frequently Asked Questions
---

## .NET Version Compatibility

**Which .NET versions does XPF support?**

XPF works with .NET 6, 7, 8, 9, and 10. There is no requirement to use a specific .NET version.

**Are WPF features from newer .NET versions available?**

XPF is a fork of WPF from .NET 6. Features added to WPF in later .NET versions (such as the Fluent theme from .NET 9) are not automatically available. However, the XPF team backports selected features. For example, `OpenFolderDialog` (introduced in .NET 8 WPF) is available in XPF.

## Target Frameworks

**Should I use `net8.0` or `net8.0-windows`?**

Use `net8.0-windows` (or whichever .NET version you prefer with the `-windows` suffix). The XPF SDK makes this target framework work on all platforms, so you do not need to change it when building for Linux or macOS. Many third-party libraries (such as DevExpress) require the Windows-specific TFM to compile.

You can use the plain `net8.0` TFM, but only if all projects in your solution use the XPF SDK rather than `Microsoft.NET.Sdk`. You cannot use `<EnableWindowsTargeting>` with the plain TFM.

**Can I use different target frameworks for different platforms?**

Yes. You can multi-target (e.g., `net8.0-windows;net8.0-macos`) if you need platform-specific APIs. However, for most XPF applications, a single `net8.0-windows` TFM with the XPF SDK is the simplest approach.

## Win32 API Shims

**Do I need to enable Win32 API shims?**

You need Win32 API shims if your application uses third-party controls that call Win32 APIs internally. This is common with DevExpress, Actipro, Syncfusion, Telerik, and other major WPF control vendors.

**How do I know if I need them?**

If your application works on Windows but fails on Linux or macOS with errors like `DllNotFoundException: Unable to load shared library 'user32.dll'`, you need to enable Win32 API shims. Add this to your `App` constructor or `Program.Main`:

```csharp
AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.AutoEnable();
```

See [Third-Party Compatibility](/xpf/third-party-libraries) for details, including how to exclude specific assemblies.

**Do shims need to be enabled on Windows too?**

Enabling shims on Windows redirects Win32 calls through the shim layer instead of native Win32. This is generally safe and ensures consistent behavior across platforms during development. However, if you only deploy on Windows, you do not need them.

## Licensing

**What identifies my application for licensing?**

XPF validates two identifiers at runtime:

1. **Assembly Name**: `Assembly.GetEntryAssembly().GetName().Name`
2. **Process Executable Name**: The name of the running process

Both must match the values registered with your license.

**Can I use the same license for multiple applications?**

Each license covers one application (identified by assembly name and process name). Different applications require separate licenses.

**What happens when my license expires?**

XPF licenses are perpetual. Your application will continue to work indefinitely. An expired license means you no longer receive updates or engineering support, but deployed applications are unaffected.

**How do I start a trial?**

Free 30-day trials are available for Internal and Business licenses through the [Avalonia website](https://avaloniaui.net/xpf). You can start a new trial at any time from the portal. Enterprise licenses are available by contacting sales.

## Platform Support

**Does XPF support Android and iOS?**

Android and iOS support is available with an Enterprise license. The engineering team is actively developing these platforms.

**Does XPF support WebAssembly?**

WebAssembly support is available with an Enterprise license.

**Which Linux distributions are supported?**

All XPF licenses support Tier 1 Linux distributions (the latest versions of Ubuntu, Fedora, and Debian). Enterprise licenses additionally cover Tier 2 and, by arrangement, Tier 3 distributions. See [Supported Platforms](/docs/supported-platforms#desktop-linux) for the full tier breakdown.

## Common Issues

**My application works on Windows but crashes on macOS/Linux. Where do I start?**

1. Check if you need [Win32 API shims](/xpf/third-party-libraries) (look for `DllNotFoundException` errors)
2. Ensure all [Linux dependencies](/xpf/platforms/linux#other-dependencies) are installed
3. Check the [Troubleshooting](/xpf/troubleshooting) page for your specific error
4. Enable [XPF logging](/xpf/troubleshooting#listening-for-xpf-logs) for detailed diagnostics

**Why does `Assembly.GetEntryAssembly().Location` return null?**

This is a .NET 5+ behavior for single-file published applications, not specific to XPF. Use `AppDomain.CurrentDomain.BaseDirectory` instead.

**Why do fonts render differently between Windows and Linux?**

Windows and Linux use different text rendering backends, so some visual differences are expected. Ensure your custom fonts are embedded as resources in your `.csproj` and that font family names in XAML match the internal names in your font files. See [Getting Started: Fonts](/xpf/getting-started#fonts) for configuration details.
