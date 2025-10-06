---
id: native-aot
title: Native AOT Deployment
---

Native AOT (Ahead-of-Time) compilation allows you to publish your Avalonia applications as self-contained executables with native performance characteristics. This guide covers Avalonia-specific considerations and setup for Native AOT deployment.

## Benefits for Avalonia Applications

Native AOT compilation provides several advantages specifically relevant to Avalonia applications:

- Faster application startup time, particularly beneficial for desktop applications
- Reduced memory footprint for resource-constrained environments
- Self-contained deployment without requiring .NET runtime installation
- Improved security through reduced attack surface (no JIT compilation)
- Smaller distribution size when combined with trimming

## Setting Up Native AOT for Avalonia

### Project Configuration

Add the following to your csproj file:

```xml
<PropertyGroup>
    <PublishAot>true</PublishAot>
    <!-- Necessary before Avalonia 12.0, was used for accessiblity APIs -->
    <BuiltInComInteropSupport>false</BuiltInComInteropSupport>
</PropertyGroup>
```

## Avalonia-Specific Considerations

### XAML Loading
When using Native AOT, XAML is compiled into the application at build time. Ensure you:
- Use `x:CompileBindings="True"` in your XAML files
- Avoid dynamic XAML loading at runtime
- Use static resource references instead of dynamic resources where possible

### Assets and Resources
- Bundle all assets as embedded resources
- Use `AvaloniaResource` build action for your assets
- Avoid dynamic asset loading from external sources

### ViewModels and Dependency Injection
- Register your ViewModels at startup
- Use compile-time DI configuration
- Avoid reflection-based service location

## Publishing Avalonia Native AOT Applications

### Windows
```bash
dotnet publish -r win-x64 -c Release
```

### Linux
```bash
dotnet publish -r linux-x64 -c Release
```

### macOS
Intel based macOS 
```bash
dotnet publish -r osx-x64 -c Release
```

Apple silicon based macOS 
```bash
dotnet publish -r osx-arm64 -c Release
```

:::tip
You can then use Apple's [lipo tool](https://developer.apple.com/documentation/apple-silicon/building-a-universal-macos-binary) to combine both Intel and Apple Silicon binaries, enabling you to ship  Universal binaries.
:::

## Troubleshooting Common Issues


### 1. Reflection-Related Errors
For ViewModels or services using reflection:
```xml
<ItemGroup>
    <TrimmerRootDescriptor Include="TrimmerRoots.xml" />
</ItemGroup>
```

Create a `TrimmerRoots.xml`:
```xml
<linker>
    <assembly fullname="YourApplication">
        <type fullname="YourApplication.ViewModels*" preserve="all"/>
    </assembly>
</linker>
```

## Known Limitations

When using Native AOT with Avalonia, be aware of these limitations:
- Dynamic control creation must be configured in trimmer settings
- Some third-party Avalonia controls may not be AOT-compatible
- Platform-specific features need explicit configuration
- Live preview in design-time tools may be limited

## Platform Support

For platform support, please refer to [Platform/architecture restrictions](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/#platformarchitecture-restrictions).

## Additional Resources

- [Native AOT deployment](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/?tabs=windows%2Cnet9plus#platformarchitecture-restrictions)
- [Avalonia Sample Applications with Native AOT](https://github.com/AvaloniaUI/Avalonia.Samples)
