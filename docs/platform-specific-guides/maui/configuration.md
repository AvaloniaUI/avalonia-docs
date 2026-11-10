---
id: configuration
title: Configuring Avalonia.Controls.Maui
description: Configure Avalonia.Controls.Maui with builder methods, fonts, images, raw assets, Essentials, SkiaSharp, build properties, and lifecycle events.
doc-type: reference
---

You configure Avalonia.Controls.Maui in `MauiProgram.cs`, with extension methods on `MauiAppBuilder`, and in the project file, with MSBuild properties. This page describes the available options.

## Builder methods

| Method | Package | Purpose |
|---|---|---|
| `UseAvaloniaApp(bool useSingleViewLifetime = false)` | `Avalonia.Controls.Maui` | Full hosting. Replaces the .NET MAUI handlers with Avalonia handlers. |
| `UseAvaloniaEmbedding<TApp>(Action<AppBuilder>? customizeBuilder = null)` | `Avalonia.Controls.Maui` | Embedding. Registers `AvaloniaView` in a native .NET MAUI app. See [Embedding Avalonia controls](/docs/platform-specific-guides/maui/embedding). |
| `UseAvaloniaEssentials()` | `Avalonia.Controls.Maui.Essentials` | Avalonia implementations of some `Microsoft.Maui.Essentials` APIs. |
| `UseAvaloniaCompatibility()` | `Avalonia.Controls.Maui.Compatibility` | Handlers for deprecated .NET MAUI controls. |
| `UseAvaloniaSkiaSharp(bool forceSoftwareRendering = false)` | `Avalonia.Controls.Maui.SkiaSharp.Views` | Handlers for `SKCanvasView` and `SKGLView`. |

`UseAvaloniaApp` and `UseAvaloniaEmbedding<TApp>` are mutually exclusive. Use one of them for each target framework.

:::note
In full hosting mode, call `UseAvaloniaApp` before `UseAvaloniaEssentials`, `UseAvaloniaCompatibility`, and `UseAvaloniaSkiaSharp`.
:::

A desktop app that uses all of the optional packages has a `MauiProgram.cs` like this:

```csharp
using Avalonia.Controls.Maui.Compatibility;
using Avalonia.Controls.Maui.Essentials;
using Avalonia.Controls.Maui.SkiaSharp.Views;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp(bool useSingleViewLifetime = false)
    {
        var builder = MauiApp.CreateBuilder();

        builder
            .UseMauiApp<App>()
            .UseAvaloniaApp(useSingleViewLifetime)
            .UseAvaloniaCompatibility()
            .UseAvaloniaEssentials()
            .UseAvaloniaSkiaSharp();

        return builder.Build();
    }
}
```

### UseAvaloniaApp

`UseAvaloniaApp` registers the Avalonia handlers for the built-in .NET MAUI controls. It also replaces the .NET MAUI dispatcher, animation ticker, font services, and image services with Avalonia implementations.

Set `useSingleViewLifetime` to `true` when the app runs in a single view instead of a window. This is necessary for WebAssembly. For more information, see [WebAssembly](/docs/platform-specific-guides/maui/webassembly).

### Use .NET MAUI Essentials

Add the `Avalonia.Controls.Maui.Essentials` package and call `UseAvaloniaEssentials`:

```csharp
using Avalonia.Controls.Maui.Essentials;

builder
    .UseMauiApp<App>()
    .UseAvaloniaApp()
    .UseAvaloniaEssentials();
```

If you do not call `UseAvaloniaEssentials`, the Essentials APIs use their default implementations. On the `net11.0` and `net11.0-browser` target frameworks, these usually throw a not-supported exception.

`UseAvaloniaEssentials` implements these APIs:

| API | Notes |
|---|---|
| `Screenshot` | Always gives a PNG image. |
| `FilePicker` | Selects one file or more than one file. |
| `MediaPicker` | Selects photos and videos. Camera capture throws `NotSupportedException`. |
| `FileSystem` | `CacheDirectory`, `AppDataDirectory`, and `OpenAppPackageFileAsync`. |
| `Preferences` | Supports all preference types. Values are stored as JSON. |
| `HapticFeedback` | `IsSupported` is `false`. |

`FilePicker` and `MediaPicker` return `AvaloniaFileResult`, which derives from `FileResult`. To read the file, call `OpenReadAsync` on the `AvaloniaFileResult` type:

```csharp
var result = await FilePicker.Default.PickAsync();
if (result is AvaloniaFileResult file)
{
    using var stream = await file.OpenReadAsync();
    // Read the stream.
}
```

:::caution
If you call `OpenReadAsync` through a `FileResult` reference, the base .NET MAUI implementation runs, and it does not work on these target frameworks. Use `AvaloniaFileResult`, or its `StorageFile` property.
:::

For APIs that are not available, see [Limitations](/docs/platform-specific-guides/maui/limitations).

### Use deprecated controls

`UseAvaloniaCompatibility` registers handlers for .NET MAUI controls that are deprecated. Use it when you move an existing app that still contains these controls:

| Deprecated control | Replacement |
|---|---|
| `Frame` | `Border` |
| `ListView` | `CollectionView` |
| `TableView` | `CollectionView` with grouping |
| `TextCell`, `ImageCell`, `ViewCell`, `SwitchCell`, `EntryCell` | A custom `DataTemplate` |

```csharp
using Avalonia.Controls.Maui.Compatibility;

builder
    .UseMauiApp<App>()
    .UseAvaloniaApp()
    .UseAvaloniaCompatibility();
```

### Use SkiaSharp views

`UseAvaloniaSkiaSharp` registers Avalonia handlers for `SKCanvasView` and `SKGLView` from the `SkiaSharp.Views.Maui` package.

Use `UseAvaloniaSkiaSharp` for the Avalonia target frameworks, and the SkiaSharp `UseSkiaSharp` method for the native .NET MAUI target frameworks:

```csharp
using SkiaSharp.Views.Maui.Controls.Hosting;

builder
    .UseMauiApp<App>()
#if !IOS && !MACCATALYST && !ANDROID && !WINDOWS
    .UseAvaloniaApp()
    .UseAvaloniaSkiaSharp()
#else
    .UseSkiaSharp()
#endif
    ;
```

If GPU rendering is not reliable on a platform, set `forceSoftwareRendering` to `true`:

```csharp
builder.UseAvaloniaSkiaSharp(forceSoftwareRendering: true);
```

The [MapApp sample](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Apps/MapApp) shows an OpenStreetMap map that uses [Mapsui.Maui](https://www.nuget.org/packages/Mapsui.Maui/) and the SkiaSharp views.

## Fonts

Register fonts with `ConfigureFonts`, as in any .NET MAUI app. The first argument to `AddFont` is the file name, and the second is an optional alias:

```csharp
builder
    .UseMauiApp<App>()
    .UseAvaloniaApp()
    .ConfigureFonts(fonts =>
    {
        fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
        fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
    });
```

Add the font files to the project with the `MauiFont` build action:

```xml
<ItemGroup>
  <MauiFont Include="Resources\Fonts\*" />
</ItemGroup>
```

At build time, each `MauiFont` item becomes an Avalonia resource under `Assets/Fonts/` in the assembly. You can set `FontFamily` to the alias or to the file name. The alias is the better choice:

```xml
<Label Text="Hello" FontFamily="OpenSansRegular" />
```

Avalonia reads the family name from the font file, so the font works with any file name or alias.

## Images

Add images with the `MauiImage` build action, as in any .NET MAUI app:

```xml
<ItemGroup>
  <MauiImage Include="Resources\Images\*" />
</ItemGroup>
```

At build time, Resizetizer processes the images, and the build adds them to the assembly as Avalonia resources. Refer to an image by its file name:

```xml
<Image Source="dotnet_bot.png" />
```

### Remote images

`UriImageSource` downloads and caches remote images. Set `CacheValidity` to control how long an image stays in the cache:

```xml
<Image>
    <Image.Source>
        <UriImageSource Uri="https://example.com/image.png"
                        CachingEnabled="True"
                        CacheValidity="1.00:00:00" />
    </Image.Source>
</Image>
```

The image service does not send a `User-Agent` header. If a server requires one, register an `HttpClient` that sets it:

```csharp
builder.Services.AddSingleton(_ =>
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.UserAgent.ParseAdd("MyApp/1.0");
    return client;
});
```

## Raw assets

Add raw files with the `MauiAsset` build action:

```xml
<ItemGroup>
  <MauiAsset Include="Resources\Raw\**" LogicalName="%(RecursiveDir)%(Filename)%(Extension)" />
</ItemGroup>
```

Read them with `FileSystem.OpenAppPackageFileAsync`. This requires `UseAvaloniaEssentials`:

```csharp
using var stream = await FileSystem.OpenAppPackageFileAsync("data.json");
using var reader = new StreamReader(stream);
var content = await reader.ReadToEndAsync();
```

Raw assets are also Avalonia resources, so you can open them with the Avalonia [`AssetLoader`](/api/avalonia/platform/assetloader) and an `avares://` URI:

```csharp
using var stream = AssetLoader.Open(new Uri("avares://MyMauiApp/data.json"));
```

## Generated bootstrap code

An Avalonia app needs an `Application` class, and a desktop app needs a `Main` method. Avalonia.Controls.Maui generates both at build time, so you do not have to write them.

- **`AvaloniaApp`** derives from `MauiAvaloniaApplication`. It applies the Avalonia theme and calls your static `CreateMauiApp()` method. The build finds this method automatically. The class is generated in the project's root namespace.
- **`AvaloniaDesktopProgram`** contains the `Main` method for the `net11.0` target framework. It starts `AvaloniaApp` with the classic desktop lifetime. It is generated only when you reference `Avalonia.Controls.Maui.Desktop`, and only for the `net11.0` target framework.

The generated `Main` method is equal to this code:

```csharp
public static void Main(string[] args) => BuildAvaloniaApp()
    .StartWithClassicDesktopLifetime(args);

public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<AvaloniaApp>()
        .UsePlatformDetect()
        .WithInterFont()
        .LogToTrace();
```

To change the Avalonia `AppBuilder`, for example to use Wayland or to set platform options, turn off the generated `Main` method and write your own. For an example, see [Linux and Wayland](/docs/platform-specific-guides/maui/linux).

## Build properties

Set these MSBuild properties in the project file to control the generated code.

| Property | Default | Description |
|---|---|---|
| `AvaloniaControlsMauiGenerateBootstrap` | `true` in a .NET MAUI single-project app | Generates the Avalonia application class. In other projects, set it to `true` to generate the class. |
| `AvaloniaControlsMauiGenerateDesktopProgram` | `true` for `net11.0` when `Avalonia.Controls.Maui.Desktop` is referenced | Generates the desktop `Main` method. Set it to `false` to write your own entry point. |
| `AvaloniaControlsMauiAppClassName` | `AvaloniaApp` | The name of the generated application class. |
| `AvaloniaControlsMauiProgramClass` | Found automatically | The fully qualified name of the class that contains `CreateMauiApp()`. Set it when the project has more than one such method. |
| `AvaloniaControlsMauiTheme` | `Fluent` | The Avalonia theme: `Fluent` or `Simple`. For `Simple`, also add the `Avalonia.Themes.Simple` package. |
| `AvaloniaControlsMauiThemeVariant` | `Default` | The theme variant: `Default`, `Light`, or `Dark`. `Default` follows the operating system. |
| `AvaloniaControlsMauiIncludeInterFont` | `true` | Adds the Inter font in the generated `Main` method. |

For example, to use the dark theme variant and select the `CreateMauiApp` method explicitly:

```xml
<PropertyGroup>
  <AvaloniaControlsMauiThemeVariant>Dark</AvaloniaControlsMauiThemeVariant>
  <AvaloniaControlsMauiProgramClass>MyMauiApp.MauiProgram</AvaloniaControlsMauiProgramClass>
</PropertyGroup>
```

The generator reports these diagnostics:

| ID | Severity | Meaning |
|---|---|---|
| `ACMSG001` | Warning | No static `CreateMauiApp()` method that returns `MauiApp` was found. The generated code does not compile. |
| `ACMSG002` | Warning | More than one `CreateMauiApp()` method was found. Set `AvaloniaControlsMauiProgramClass`. |
| `ACMSG003` | Info | The bootstrap code was generated. The message names the `CreateMauiApp()` method that it uses. |
| `ACMSG004` | Warning | A handler derives from the .NET MAUI `ViewHandler`. See [Custom handlers](/docs/platform-specific-guides/maui/custom-handlers#create-a-handler). |

## Lifecycle events

Avalonia.Controls.Maui raises lifecycle events that you can handle with `ConfigureLifecycleEvents`. Add the events with the `AddWindows` method from the `Avalonia.Controls.Maui.LifecycleEvents` namespace:

```csharp
using Avalonia.Controls.Maui.LifecycleEvents;
using Microsoft.Maui.LifecycleEvents;

builder.ConfigureLifecycleEvents(events =>
{
    events.AddWindows(avalonia =>
    {
        avalonia.OnLaunched((app, args) => Console.WriteLine("Launched"));
        avalonia.OnWindowCreated(window => window.MinWidth = 400);
    });
});
```

| Event | When it occurs |
|---|---|
| `OnLaunching` | Before the .NET MAUI app is created. |
| `OnLaunched` | After the .NET MAUI app is created. |
| `OnWindowCreated` | After the Avalonia [`Window`](/api/avalonia/controls/window) is created. This event does not occur with a single-view lifetime, such as in the browser. |

The .NET MAUI `Window` and `Application` lifecycle methods, such as `OnStart`, `OnSleep`, and `OnResume`, also work. With a window, minimizing the window calls `OnSleep`, and restoring it calls `OnResume`. With a single-view lifetime, the app does not receive sleep and resume calls.

## See also

- [Getting started](/docs/platform-specific-guides/maui/getting-started)
- [Custom handlers](/docs/platform-specific-guides/maui/custom-handlers)
- [Limitations](/docs/platform-specific-guides/maui/limitations)
