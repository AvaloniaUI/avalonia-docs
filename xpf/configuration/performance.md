---
id: performance
title: Performance Optimization
---

## Reducing startup time with ReadyToRun

XPF applications can benefit significantly from ReadyToRun (R2R) compilation, which pre-compiles assemblies to native code. WPF libraries shipped by Microsoft are normally pre-compiled as R2R, but XPF libraries are not by default.

Enable ReadyToRun in your `.csproj`:

```xml
<PropertyGroup>
    <PublishReadyToRun>true</PublishReadyToRun>
</PropertyGroup>
```

Then publish with a runtime identifier:

```bash
dotnet publish -r linux-x64 -c Release
```

This can reduce application startup time substantially, particularly on Linux embedded devices.

:::note
On Linux, ReadyToRun may change how native `.so` libraries are resolved. See [Linux: Native Library Resolution](/xpf/platforms/linux#native-library-resolution-with-readytorun) for details.
:::

## Rendering performance

### Configuring Skia and composition options

XPF uses Skia as its rendering engine. You can tune rendering performance through `SkiaOptions` and `CompositionOptions` in a [custom initialization](/xpf/configuration/customizing-initialization):

```csharp
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia.Skia;
using AvaloniaUI.Xpf;

AppBuilder.Configure<AvaloniaUI.Xpf.Helpers.DefaultXpfAvaloniaApplication>()
    .UsePlatformDetect()
    .With(new SkiaOptions
    {
        MaxGpuResourceSizeBytes = 512 * 1024 * 1024 // 512 MB GPU resource cache
    })
    .With(new CompositionOptions
    {
        UseRegionDirtyRectClipping = true
    })
    .WithAvaloniaXpf()
    .SetupWithLifetime(new ClassicDesktopStyleApplicationLifetime
    {
        ShutdownMode = ShutdownMode.OnExplicitShutdown
    });
```

- `MaxGpuResourceSizeBytes`: Increases the GPU texture cache, reducing re-uploads for applications with many visual elements.
- `UseRegionDirtyRectClipping`: Limits rendering to only the regions of the screen that have changed, improving performance for partial updates.

### Blur effects

Blur effects (`BlurEffect`, `DropShadowEffect` with blur) are computationally expensive in Skia. A complex UI with blur enabled can reduce the framerate from 60fps to 30fps or lower. If rendering performance is a concern:

- Remove or reduce blur radii where possible
- Consider using solid color backgrounds instead of acrylic/blur effects
- Test on your target hardware early

## Dynamic XAML loading

`XamlReader.Load` parses and instantiates XAML at runtime. For large XAML documents, this can block the UI thread for several seconds. This is a fundamental limitation shared with WPF.

Strategies for improving dynamic XAML performance:

- **Precompile XAML into assemblies**: If the XAML content is known at build time, compile it into a separate assembly and load the assembly dynamically at runtime. Compiled XAML (BAML) loads significantly faster than raw XAML parsing.
- **Break up large XAML**: Split large XAML documents into smaller pieces and load them incrementally.
- **Load on a background thread**: Parse the XAML string on a background thread, then instantiate the resulting object tree on the UI thread.

:::note
BAML (compiled XAML) provides the best loading performance, but there is no supported public API for creating loose BAML files. Compile XAML into assemblies instead.
:::

## Embedding high-performance content

For performance-critical rendering (such as real-time meters, audio visualizations, or 3D content), consider embedding Avalonia controls in your XPF application using [AvaloniaHost](/xpf/interop/embedding-avalonia-in-xpf). Avalonia's `CompositionCustomVisuals` API allows rendering directly on the composition thread, bypassing the WPF dispatcher entirely.

For OpenGL content, see the [OpenGL sample](https://github.com/AvaloniaUI/Avalonia-XPF-Samples/tree/master/src/OpenGLSample) which demonstrates embedding OpenGL rendering within an XPF window using `ICompositionGpuInterop`.
