---
id: cross-platform-architecture
title: Cross-platform architecture
description: Understand how Avalonia shares code across platforms and handles platform differences.
doc-type: explanation
---

Avalonia renders controls using Skia rather than wrapping native platform controls. This means your AXAML views, view models, and business logic all produce identical results on every platform. This page covers what you can share, what needs platform-specific handling, and how to choose the right approach.

## Avalonia's approach to code sharing

Because Avalonia draws its own controls, you get a consistent look and behavior across Windows, macOS, Linux, iOS, Android, and the browser. In a typical Avalonia application, the following are fully shared:

- **Views** (AXAML files and code-behind)
- **View models and business logic** (plain C# or F# classes)
- **Styles and themes**
- **Platform services** such as [file pickers](/docs/services/storage/storage-provider), [clipboard](/docs/services/clipboard), [launcher](/docs/services/launcher), [dark mode detection](/docs/services/platform-settings), and [safe area handling](/docs/services/insets-manager)

The areas that sometimes require platform-specific code include:

- Hardware sensors (GPS, accelerometer, gyroscope)
- Push notifications
- Bluetooth, camera, and biometrics
- System tray and other OS-level shell integrations

For device APIs that Avalonia does not abstract, [Microsoft.Maui.Essentials](https://www.nuget.org/packages/Microsoft.Maui.Essentials) provides a common layer that works with Avalonia on .NET 8 and higher. Keep in mind that Maui.Essentials does not cover Linux, browser, or non-Catalyst macOS targets.

## Structuring your solution

The standard Avalonia cross-platform template creates a set of projects designed for maximum code sharing:

| Project | Purpose |
|---|---|
| Core | Views, view models, business logic (shared by all platforms) |
| Desktop | Entry point for Windows, macOS, and Linux |
| Android | Entry point for Android |
| iOS | Entry point for iOS, iPadOS, and Mac Catalyst |
| Browser | Entry point for WebAssembly |

The core project contains the vast majority of your code. Platform-specific projects are thin entry points that reference the core. See [Setting up a cross-platform solution](/docs/app-development/cross-platform-solution-setup) for a full walkthrough.

## Handling platform differences

When you do need platform-specific behavior, Avalonia and .NET offer four approaches, ordered from simplest to most flexible.

### OnPlatform and OnFormFactor

For UI-level adjustments, use the `OnPlatform` or `OnFormFactor` markup extensions directly in AXAML:

```xml
<TextBlock Text="{OnPlatform 'Welcome', iOS='Welcome (iOS)', Android='Welcome (Android)'}"/>
```

`OnPlatform` targets a specific operating system, while `OnFormFactor` targets a device category such as Desktop or Mobile. See [Platform-specific XAML](/docs/platform-specific-guides/xaml) for the full syntax.

### Runtime detection

For simple branching in C# code, use the `OperatingSystem` class:

```csharp
if (OperatingSystem.IsWindows())
{
    // Windows-specific logic
}
```

This works everywhere without changes to your project structure. See [Platform-specific .NET](/docs/platform-specific-guides/dotnet) for the full API reference.

### Conditional compilation

For code that calls platform-specific APIs, use C# preprocessor directives with OS-specific target frameworks:

```csharp
#if ANDROID
    var orientation = GetAndroidOrientation();
#elif IOS
    var orientation = GetiOSOrientation();
#else
    var orientation = DeviceOrientation.Undefined;
#endif
```

This requires your project to multi-target (for example, `net8.0;net8.0-ios;net8.0-android`). See [Platform-specific .NET](/docs/platform-specific-guides/dotnet) for setup details.

### Interface abstraction

For complex platform features, define an interface in your shared project and implement it per platform:

```csharp
// In Core project
public interface IDeviceOrientation
{
    DeviceOrientation GetOrientation();
}

// In platform-specific project
public class AndroidDeviceOrientation : IDeviceOrientation
{
    public DeviceOrientation GetOrientation() { /* Android APIs */ }
}
```

Register each implementation with your dependency injection container so that shared code can consume it without knowing which platform it runs on. See [Platform-specific .NET](/docs/platform-specific-guides/dotnet) for a complete example and [Dependency injection](/docs/app-development/dependency-injection) for DI setup.

## Choosing an approach

| Approach | Best for | Trade-off |
|---|---|---|
| OnPlatform / OnFormFactor | UI tweaks (spacing, text, controls) | XAML only |
| Runtime detection | Simple runtime branching | All platform code ships in every binary |
| Conditional compilation | Platform-specific API calls | Requires multi-targeting |
| Interface abstraction | Complex platform features | More files, requires DI |

Start with the simplest approach that meets your needs and move to a more flexible one only when necessary.

## See also

- [The MVVM pattern](/docs/fundamentals/the-mvvm-pattern)
- [Setting up a cross-platform solution](/docs/app-development/cross-platform-solution-setup)
- [Platform-specific .NET](/docs/platform-specific-guides/dotnet)
- [Platform-specific XAML](/docs/platform-specific-guides/xaml)
- [Dependency injection](/docs/app-development/dependency-injection)
- [Application lifetimes](/docs/fundamentals/application-lifetimes)
