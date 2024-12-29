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

### 1. Project Configuration

Add the following to your csproj file:

```xml
<PropertyGroup>
    <PublishAot>true</PublishAot>
    <!-- Recommended Avalonia trimming settings for Native AOT -->
    <BuiltInComInteropSupport>false</BuiltInComInteropSupport>
    <TrimMode>link</TrimMode>
</PropertyGroup>
```

### 2. Trimming Configuration

Native AOT requires trimming. Add these trim settings specific to Avalonia:

```xml
<ItemGroup>
    <!-- Preserve Avalonia types for reflection -->
    <TrimmerRootAssembly Include="Avalonia.Themes.Fluent" />
    <TrimmerRootAssembly Include="Avalonia.Themes.Default" />
</ItemGroup>
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

### 1. Missing XAML Controls
If controls are missing at runtime:
```xml
<ItemGroup>
    <!-- Add specific Avalonia controls you're using -->
    <TrimmerRootAssembly Include="Avalonia.Controls" />
</ItemGroup>
```

### 2. Reflection-Related Errors
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

| Platform | Status |
|----------|--------|
| Windows x64 | ✅ Supported | 
| Windows Arm64 | ✅ Supported | 
| Linux x64 | ✅ Supported | |
| Linux Arm64 | ✅ Supported | 
| macOS x64 | ✅ Supported | |
| macOS Arm64 | ✅ Supported | 
| Browser | ❌ Not Supported |

## Best Practices

1. **Application Structure**
   - Use MVVM pattern consistently
   - Minimize reflection usage
   - Prefer compile-time configuration

2. **Resource Management**
   - Use static resources when possible
   - Bundle all required assets
   - Implement proper cleanup in IDisposable

3. **Performance Optimization**
   - Enable binding compilation
   - Use compiled bindings
   - Implement proper virtualization for large collections

## Additional Resources

- [Avalonia Sample Applications with Native AOT](https://github.com/AvaloniaUI/Avalonia.Samples)