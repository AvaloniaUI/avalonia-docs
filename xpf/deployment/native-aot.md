---
id: native-aot
title: Native AOT
description: Publish XPF applications as native executables using ahead-of-time compilation, including trimming requirements and XAML type preservation.
doc-type: how-to
---

Native AOT (Ahead-of-Time) compilation is supported in XPF. Unlike WPF, XPF does not use COM marshalling, which allows it to be compatible with AOT compilation. Large applications using third-party control libraries can be successfully compiled with Native AOT.

## Project configuration

Add `PublishAot` to your `.csproj`.

```xml
<PropertyGroup>
    <PublishAot>true</PublishAot>
</PropertyGroup>
```

## Publishing

### Windows

```bash
dotnet publish -r win-x64 -c Release
```

For ARM64 Windows devices:

```bash
dotnet publish -r win-arm64 -c Release
```

### macOS

Apple Silicon:

```bash
dotnet publish -r osx-arm64 -c Release
```

Intel:

```bash
dotnet publish -r osx-x64 -c Release
```

### Linux

```bash
dotnet publish -r linux-x64 -c Release
```

For ARM64 devices:

```bash
dotnet publish -r linux-arm64 -c Release
```

## Trimming by the Native AOT linker

To use AOT with XPF, trimming and linking must be conservative. `Xpf.Sdk` ships with an `rd.xml` root descriptor that force-includes XPF runtime libraries. If your application references third-party WPF libraries, they must have equivalent trimming configurations. Otherwise, the Native AOT linker may remove types that are only referenced from XAML, because it cannot detect them as being in use.

If you are experiencing runtime errors due to missing types, add a trimmer root descriptor to your project so that application types, or third-party library types referenced only from XAML, are preserved.

```xml
<ItemGroup>
    <TrimmerRootDescriptor Include="TrimmerRoots.xml" />
</ItemGroup>
```

`TrimmerRoots.xml`:

```xml
<linker>
    <assembly fullname="YourAssembly">
        <type fullname="YourAssembly.ViewModels*" preserve="all"/>
        <type fullname="YourAssembly.Views*" preserve="all"/>
    </assembly>
</linker>
```

Adjust the type patterns to match the namespaces your XAML references. Some third-party libraries may require comprehensive entries if they do not ship with a root descriptor.

## See also

- [Native AOT (Avalonia)](/docs/deployment/native-aot): AOT setup for standard Avalonia applications
- [Windows Deployment](/xpf/deployment/windows)
- [macOS Deployment](/xpf/deployment/macos)
- [Linux Deployment](/xpf/deployment/linux)
- [Performance Optimization](/xpf/configuration/performance)
