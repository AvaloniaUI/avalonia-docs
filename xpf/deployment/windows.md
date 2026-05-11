---
id: windows
title: Windows Deployment
description: Learn how to publish, package, and deploy your Avalonia XPF application on Windows, including self-contained builds, single-file publishing, and installer options.
doc-type: guide
---

## Publishing

You can publish your XPF application for Windows using the standard .NET CLI. To create a framework-dependent deployment (requires the .NET runtime on the target machine), run:

```bash
dotnet publish -r win-x64 -c Release
```

For a self-contained deployment that bundles the .NET runtime so your users do not need to install it separately, add the `--self-contained` flag:

```bash
dotnet publish -r win-x64 -c Release --self-contained
```

If you are targeting ARM64 Windows devices, use the `win-arm64` runtime identifier instead:

```bash
dotnet publish -r win-arm64 -c Release --self-contained
```

## Single-file publishing

XPF supports single-file publishing on Windows. This bundles your application and its dependencies into a single executable. Add the following properties to your project file:

```xml
<PropertyGroup>
    <PublishSingleFile>true</PublishSingleFile>
    <SelfContained>true</SelfContained>
    <RuntimeIdentifier>win-x64</RuntimeIdentifier>
</PropertyGroup>
```

:::caution
When you use single-file publishing, `Assembly.GetEntryAssembly().Location` returns an empty string. Use `AppDomain.CurrentDomain.BaseDirectory` to get the application directory instead.
:::

## ReadyToRun compilation

You can enable ReadyToRun (R2R) ahead-of-time compilation to reduce your application's startup time. Add the following property to your project file:

```xml
<PropertyGroup>
    <PublishReadyToRun>true</PublishReadyToRun>
</PropertyGroup>
```

ReadyToRun pre-compiles your managed assemblies to native code, which means the JIT compiler does less work at startup. The trade-off is a larger published output size.

See [Performance Optimization](/xpf/configuration/performance#reducing-startup-time-with-readytorun) for more details.

## WinForms hosting

If your application hosts WinForms controls, add the following property to a Windows-conditional property group in your project file:

```xml
<PropertyGroup Condition="$([MSBuild]::IsOSPlatform('Windows'))">
    <XpfUseMicrosoftWindowsForms>true</XpfUseMicrosoftWindowsForms>
</PropertyGroup>
```

Setting `XpfUseMicrosoftWindowsForms` to `true` disables the WinForms shim layer and enables native WinForms integration. This option is only available on Windows, which is why the condition guard is necessary.

## STA threading

Some Windows APIs (notably clipboard operations and COM interop) require the main thread to use a Single-Threaded Apartment (STA) model. If you encounter a `COMException` with the message "CoInitialize was not called," ensure your entry point uses the `[STAThread]` attribute:

```csharp
[STAThread]
public static void Main(string[] args)
{
    // Your application startup code
}
```

When you use [custom initialization](/xpf/configuration/customizing-initialization), the XPF SDK handles STA threading automatically.

## Windows installers

Your published XPF application is a standard .NET application, so you can package it using any Windows installer technology. Common options include:

- **MSIX**: The modern Windows packaging format with support for auto-updates and clean install/uninstall.
- **WiX Toolset**: An open-source installer authoring framework for creating MSI and MSIX packages.
- **Inno Setup**: A free and widely used installer builder for Windows applications.
- **NSIS**: A scriptable installation system with a large plugin ecosystem.

## See also

- [macOS Deployment](/xpf/deployment/macos)
- [Linux Deployment](/xpf/deployment/linux)
- [Customizing Initialization](/xpf/configuration/customizing-initialization)
- [Performance Optimization](/xpf/configuration/performance)
