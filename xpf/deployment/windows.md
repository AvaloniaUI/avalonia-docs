---
id: windows
title: Windows Deployment
---

## Publishing

XPF applications can be published for Windows using standard .NET publishing:

```bash
dotnet publish -r win-x64 -c Release
```

For self-contained deployments (no .NET runtime required on the target machine):

```bash
dotnet publish -r win-x64 -c Release --self-contained
```

For ARM64 Windows devices:

```bash
dotnet publish -r win-arm64 -c Release --self-contained
```

## Single-File Publishing

XPF supports single-file publishing on Windows:

```xml
<PropertyGroup>
    <PublishSingleFile>true</PublishSingleFile>
    <SelfContained>true</SelfContained>
    <RuntimeIdentifier>win-x64</RuntimeIdentifier>
</PropertyGroup>
```

:::warning
When using single-file publishing, `Assembly.GetEntryAssembly().Location` returns an empty string. Use `AppDomain.CurrentDomain.BaseDirectory` to get the application directory.
:::

## ReadyToRun

Enable ReadyToRun for faster startup times:

```xml
<PropertyGroup>
    <PublishReadyToRun>true</PublishReadyToRun>
</PropertyGroup>
```

See [Performance Optimization](/xpf/configuration/performance#reducing-startup-time-with-readytorun) for details.

## WinForms Hosting

If your application hosts WinForms controls, add the following to a Windows-conditional property group:

```xml
<PropertyGroup Condition="$([MSBuild]::IsOSPlatform('Windows'))">
    <XpfUseMicrosoftWindowsForms>true</XpfUseMicrosoftWindowsForms>
</PropertyGroup>
```

This disables the WinForms shim layer and enables native WinForms integration. WinForms hosting is only available on Windows.

## STA Threading

Some Windows APIs (notably clipboard operations and COM interop) require the main thread to be marked as STA (Single-Threaded Apartment). If you encounter `COMException: CoInitialize was not called`, ensure your entry point uses the `[STAThread]` attribute:

```csharp
[STAThread]
public static void Main(string[] args)
{
    // Application startup
}
```

When using [custom initialization](/xpf/configuration/customizing-initialization), the XPF SDK handles this automatically.

## Windows Installers

XPF applications are standard .NET applications and can be packaged using any Windows installer technology:

- **MSIX**: Modern Windows packaging format with auto-update support
- **WiX Toolset**: Open-source installer authoring framework
- **Inno Setup**: Free installer builder
- **NSIS**: Scriptable installation system
