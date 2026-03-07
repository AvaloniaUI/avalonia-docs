---
id: linux
title: Linux Deployment
description: How to publish and deploy XPF applications on Linux, including required native libraries and runtime dependencies.
---

## Publishing

Always publish XPF applications from the command line. Visual Studio publishing can produce incomplete output that is missing native libraries such as `libSkiaSharp.so`.

```bash
dotnet publish -r linux-x64 -c Release
```

For self-contained deployments:

```bash
dotnet publish -r linux-x64 -c Release --self-contained
```

For ARM64 devices:

```bash
dotnet publish -r linux-arm64 -c Release --self-contained
```

## Runtime dependencies

Ensure the following packages are installed on the target system.

### Debian / Ubuntu

```bash
sudo apt install libice6 libsm6 libfontconfig1 libgdiplus
```

### Fedora

```bash
sudo dnf install libICE libSM fontconfig libgdiplus
```

### RHEL / CentOS / Rocky Linux

```bash
sudo dnf install epel-release
sudo dnf install libICE libSM fontconfig libgdiplus
```

For WebView support, also install `libwebkit2gtk-4.1-dev` (Debian/Ubuntu) or `webkit2gtk4.1-devel` (Fedora/RHEL).

See [Linux: Other Dependencies](/xpf/platforms/linux#other-dependencies) for details.

## ReadyToRun

ReadyToRun (R2R) compilation pre-compiles assemblies to native code, significantly reducing startup time. This is particularly beneficial on embedded Linux devices.

```xml
<PropertyGroup>
    <PublishReadyToRun>true</PublishReadyToRun>
</PropertyGroup>
```

```bash
dotnet publish -r linux-x64 -c Release --self-contained
```

:::note
ReadyToRun may change how native `.so` libraries are resolved. See [Linux: Native Library Resolution](/xpf/platforms/linux#native-library-resolution-with-readytorun) for details.
:::

## Framework-dependent vs self-contained

**Framework-dependent** (default): Requires .NET to be installed on the target machine. Produces a smaller deployment package.

**Self-contained**: Includes the .NET runtime. Larger package but no external dependencies beyond system libraries. Recommended for distribution to end users.

```bash
# Framework-dependent
dotnet publish -r linux-x64 -c Release

# Self-contained
dotnet publish -r linux-x64 -c Release --self-contained
```

## Packaging formats

### AppImage

AppImage bundles your application into a single executable file. Use tools like [appimage-builder](https://appimage-builder.readthedocs.io/) or package the published output into an AppImage manually.

### Debian package (.deb)

For Debian-based distributions, create a `.deb` package. Use `dpkg-deb` or a tool like [dotnet-packaging](https://github.com/quamotion/dotnet-packaging):

```bash
dotnet tool install --global dotnet-deb
dotnet deb -r linux-x64 -c Release
```

### RPM package

For Fedora and RHEL-based distributions:

```bash
dotnet tool install --global dotnet-rpm
dotnet rpm -r linux-x64 -c Release
```

### Flatpak and snap

XPF applications can be distributed as Flatpak or Snap packages. Refer to each packaging system's documentation for bundling .NET applications.

## CI/CD

When building XPF applications in CI/CD pipelines:

1. Add a `NuGet.config` with your license key (use CI secrets for the key value)
2. Install required dependencies in the build environment
3. Publish from the command line

Example GitHub Actions step:

```yaml
- name: Publish for Linux
  run: dotnet publish -r linux-x64 -c Release --self-contained
  env:
    XpfLicenseKey: ${{ secrets.XPF_LICENSE_KEY }}
```

See [Centralizing Multiple XPF Projects](/xpf/configuration/centralizing-multiple-xpf-projects#license-keys) for using environment variables with license keys.

## Debugging remote Linux targets

For debugging XPF applications running on Linux from a Windows development machine, see [Linux: Debugging](/xpf/platforms/linux#debugging-on-linux).
