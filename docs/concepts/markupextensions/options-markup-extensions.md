---
id: markupextensions
title: Markup extensions
description: An options markup extension is a special type of markup extension, specialized for switch-like expressions.
---

`OptionsMarkupExtension` is a special type of markup extension, specialized for switch-like expressions. Its purpose is to provide optimization by removing branches that will never be used, trimming the compiler as a result.

## `OnPlatform` markup extension

One example of an options markup extension is the built-in `OnPlatform` markup extension. This markup extension defines values per runtime platform (Windows, macOS, Linux, etc.) to optimize branches, selecting only those relevant to the platform being compiled for. 

With `OnPlatform`, you can, for instance, use the `Markdown` control on Linux and the `WebView` control on other platforms. The unused control would be excluded, thus reducing the binary size.

## Creating custom options markup extensions

Here is an example of a custom implementation with `RuntimeInformation.ProcessArchitecture`. As shown in this example, we recommend using compiler flags or .NET runtime APIs that are effectively constant.

```csharp
public class ArchitectureExtension : IAddChild<On<object>>
{
    [MarkupExtensionOption(nameof(X86))] public object? X86 { get; set; }
    [MarkupExtensionOption(nameof(X64))] public object? X64 { get; set; }
    [MarkupExtensionOption(nameof(Arm))] public object? Arm { get; set; }
    [MarkupExtensionOption(nameof(Arm64))] public object? Arm64 { get; set; }
    [MarkupExtensionOption(nameof(Wasm))] public object? Wasm { get; set; }

    [Content]
    [MarkupExtensionDefaultOption]
    public object? Default { get; set; }

    public static bool ShouldProvideOption(string option)
    {
        var currentArch = RuntimeInformation.ProcessArchitecture;
        return option switch
        {
            nameof(X86) => currentArch == Architecture.X86,
            nameof(X64) => currentArch == Architecture.X64,
            nameof(Arm) => currentArch == Architecture.Arm,
            nameof(Arm64) => currentArch == Architecture.Arm64,
            nameof(Wasm) => currentArch == Architecture.Wasm,
            _ => false,
        };
    }

    // Needed for the compiler.
    public void AddChild(On<object> child) {}
    public object? ProvideValue() => null;
}
```

This class defines several options that are selected through the `ShouldProvideOption` static method. You can then set the options in XAML, like so:

```xml
<Border Background="{local:Architecture Default=White, X64=Green, Arm64=Red, Wasm=Blue}" />
```

### What’s the difference?

The example above, in a non-optimized .NET build, is equivalent to the following code.

```csharp
border.Background = ArchitectureExtension.ShouldProvideOption("X64") ? Brushes.Green
     : ArchitectureExtension.ShouldProvideOption("Arm64") ? Brushes.Red
     : ArchitectureExtension.ShouldProvideOption("Wasm") ? Brushes.Blue
     : Brushes.White;
```

Once optimized and trimmed for specific platform architecture, it is reduced to the following instead.

```csharp
border.Background = Brushes.Red; // assuming app was compiled with dotnet publish -r win-arm64;
```
