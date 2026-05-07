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

To publish your app, run `dotnet publish` in the command line:

```
dotnet publish -r <current platform> -c Release
```

As an example, `dotnet publish -r osx-arm64 -c Release` would publish the app for Apple Silicon devices.

For more information, please see [Native AOT deployment on the .NET documentation site](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/?tabs=windows%2Cnet8#publish-native-aot-using-the-cli).

## Trimming by the Native AOT linker

To use AOT with XPF, trimming and linking must be conservative.

By default, the XPF SDK ships with an `rd.xml` root descriptor that force-includes XPF runtime libraries, including all built-in WPF assemblies and any user-executable assemblies on which `Xpf.Sdk` is set.

However, if your application references third-party WPF libraries, they must have equivalent trimming configurations. Otherwise, the Native AOT linker may remove types that are only referenced from XAML, which it cannot detect as being in use.

If you are experiencing runtime errors due to missing types, add a trimmer root descriptor to your `.csproj` file. Some third-party libraries may require comprehensive entries if they do not ship with a root descriptor and reference types in XAML only.

```xml title=".csproj"
<ItemGroup>
    <ProjectReference Include="..\YourApp\YourApp.csproj" />
    <TrimmerRootAssembly Include="YourAssembly" />
</ItemGroup>
```

For information, please see [Trimming on the .NET documentation site](https://learn.microsoft.com/en-us/dotnet/core/deploying/trimming/prepare-libraries-for-trimming#csproj-file).

## See also

- [Native AOT (Avalonia)](/docs/deployment/native-aot): AOT setup for standard Avalonia applications
- [Windows Deployment](/xpf/deployment/windows)
- [macOS Deployment](/xpf/deployment/macos)
- [Linux Deployment](/xpf/deployment/linux)
- [Performance Optimization](/xpf/configuration/performance)
