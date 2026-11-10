---
id: getting-started
title: Getting started with Avalonia.Controls.Maui
description: Create a .NET MAUI app that renders with Avalonia on desktop, or add Avalonia.Controls.Maui to an existing .NET MAUI single-project app.
doc-type: how-to
---

This page shows how to create a new .NET MAUI app that uses Avalonia.Controls.Maui, and how to add Avalonia.Controls.Maui to an existing .NET MAUI app. In both cases, the app gets a `net11.0` target framework that runs on Windows, macOS, and Linux with Avalonia.

## Prerequisites

- The [.NET 11 SDK](https://dotnet.microsoft.com/download).
- The .NET MAUI workload. On Windows and macOS, install it with `dotnet workload install maui`. On Linux, install `maui-android`, which is the .NET MAUI workload that is available on Linux.
- Avalonia 12.1 or later. The Avalonia.Controls.Maui packages reference Avalonia, so you do not usually add Avalonia packages yourself.

## Create a new app

1. Create a .NET MAUI app with the `--with-avalonia` option:

   ```bash
   dotnet new maui --with-avalonia -n MyMauiApp
   cd MyMauiApp
   ```

   :::note
   The `--with-avalonia` option is ignored when you also include sample content (`--sample-content`). To start from the sample content, create the app without Avalonia, then follow the steps in [Add Avalonia.Controls.Maui to an existing app](#add-avaloniacontrolsmaui-to-an-existing-app).
   :::

2. Run the Avalonia desktop target framework:

   ```bash
   dotnet run -f net11.0
   ```

   The app opens in an Avalonia window. On Linux, Avalonia uses X11. For Wayland, see [Linux and Wayland](/docs/platform-specific-guides/maui/linux).

The other target frameworks in the project, such as `net11.0-android`, build and run as before, with the native .NET MAUI handlers.

### What the template adds

Compared with the standard .NET MAUI template, the `--with-avalonia` option makes these changes:

- It adds `net11.0` to `TargetFrameworks`. This is the Avalonia desktop target framework.
- It adds the `Avalonia.Controls.Maui` package to all target frameworks, and the `Avalonia.Controls.Maui.Desktop` package to `net11.0` only.
- It sets `AvaloniaControlsMauiGenerateBootstrap` to `true`. This generates the Avalonia application class, `AvaloniaApp`, and the desktop `Main` method. For more information, see [Generated bootstrap code](/docs/platform-specific-guides/maui/configuration#generated-bootstrap-code).
- It calls `UseAvaloniaApp` or `UseAvaloniaEmbedding<AvaloniaApp>` in `MauiProgram.cs`, depending on the target framework.

The template does not add a WebAssembly target. To run the app in the browser, see [WebAssembly](/docs/platform-specific-guides/maui/webassembly).

## Add Avalonia.Controls.Maui to an existing app

These steps apply to a .NET MAUI single-project app.

1. In the project file, add `net11.0` to `TargetFrameworks`. Keep it on a separate line so that it applies on every operating system:

   ```xml
   <PropertyGroup>
     <TargetFrameworks>net11.0-android</TargetFrameworks>
     <TargetFrameworks Condition="!$([MSBuild]::IsOSPlatform('linux'))">$(TargetFrameworks);net11.0-ios;net11.0-maccatalyst</TargetFrameworks>
     <TargetFrameworks Condition="$([MSBuild]::IsOSPlatform('windows'))">$(TargetFrameworks);net11.0-windows10.0.19041.0</TargetFrameworks>
     <!-- Avalonia desktop target framework (Windows, macOS, and Linux) -->
     <TargetFrameworks>net11.0;$(TargetFrameworks)</TargetFrameworks>
   </PropertyGroup>
   ```

2. Add the packages. Add `Avalonia.Controls.Maui.Desktop` to the `net11.0` target framework only:

   ```xml
   <ItemGroup>
     <PackageReference Include="Avalonia.Controls.Maui" Version="11.*" />
     <PackageReference Include="Avalonia.Controls.Maui.Desktop" Version="11.*"
                       Condition="'$(TargetFramework)' == 'net11.0'" />
   </ItemGroup>
   ```

3. In `MauiProgram.cs`, call `UseAvaloniaApp` for the Avalonia target frameworks, and `UseAvaloniaEmbedding<AvaloniaApp>` for the native .NET MAUI target frameworks:

   ```csharp
   public static class MauiProgram
   {
       public static MauiApp CreateMauiApp(bool useSingleViewLifetime = false)
       {
           var builder = MauiApp.CreateBuilder();
           builder
               .UseMauiApp<App>()
   #if !IOS && !MACCATALYST && !ANDROID && !WINDOWS
               .UseAvaloniaApp(useSingleViewLifetime)
   #else
               .UseAvaloniaEmbedding<AvaloniaApp>()
   #endif
               .ConfigureFonts(fonts =>
               {
                   fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                   fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
               });

           return builder.Build();
       }
   }
   ```

   `AvaloniaApp` is generated at build time. The `useSingleViewLifetime` parameter is not necessary for the desktop, but it lets a WebAssembly head use the same method. For more information, see [WebAssembly](/docs/platform-specific-guides/maui/webassembly).

   If you do not want Avalonia controls in the native .NET MAUI target frameworks, you can remove the `#else` branch.

4. Run the app:

   ```bash
   dotnet run -f net11.0
   ```

:::tip
In a .NET MAUI single-project app, `AvaloniaControlsMauiGenerateBootstrap` is `true` by default, so you do not have to set it. The template sets it explicitly.
:::

## Add optional features

After the app runs, you can add more packages for other .NET MAUI features. For example, call `UseAvaloniaEssentials` to use `FilePicker` and `Preferences`, or `UseAvaloniaSkiaSharp` to use SkiaSharp views. For more information, see [Configuration](/docs/platform-specific-guides/maui/configuration).

## Troubleshooting

### A custom control does not appear

If the build shows warning `ACMSG004`, a handler derives from `Microsoft.Maui.Handlers.ViewHandler<TVirtualView, TPlatformView>`. On the `net11.0` target framework, that base class does not measure or arrange its control, so the control does not appear. For the fix, see [Custom handlers](/docs/platform-specific-guides/maui/custom-handlers#create-a-handler).

### The build shows warning ACMSG001 or ACMSG002

The generated `AvaloniaApp` calls a static `CreateMauiApp()` method that returns `MauiApp`. Warning `ACMSG001` means that the build found no such method, and `ACMSG002` means that it found more than one. To select the class, set `AvaloniaControlsMauiProgramClass`. For more information, see [Build properties](/docs/platform-specific-guides/maui/configuration#build-properties).

### An Essentials API throws an exception

Some `Microsoft.Maui.Essentials` APIs need `UseAvaloniaEssentials`, and some are not available. For more information, see [Use .NET MAUI Essentials](/docs/platform-specific-guides/maui/configuration#use-net-maui-essentials) and [Limitations](/docs/platform-specific-guides/maui/limitations).

## See also

- [.NET MAUI with Avalonia](/docs/platform-specific-guides/maui)
- [Configuration](/docs/platform-specific-guides/maui/configuration)
- [WebAssembly](/docs/platform-specific-guides/maui/webassembly)
- [Samples on GitHub](https://github.com/AvaloniaUI/avalonia-maui-samples)
