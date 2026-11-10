---
id: webassembly
title: Running .NET MAUI apps in the browser
description: Add a WebAssembly head to a .NET MAUI app that uses Avalonia.Controls.Maui, for a single-project app or a multi-project app.
doc-type: how-to
---

With Avalonia.Controls.Maui, a .NET MAUI app can run in the browser with WebAssembly. The browser target framework, `net11.0-browser`, needs the `Microsoft.NET.Sdk.WebAssembly` SDK. A .NET MAUI single project cannot use this SDK, so the browser app is a separate project, called the browser head, that references your .NET MAUI code.

This page shows two project structures:

- [Single-project app](#add-a-browser-head-to-a-single-project-app): the browser head references your .NET MAUI single project. Use this structure for an app that you created from the .NET MAUI template.
- [Multi-project app](#add-a-browser-head-to-a-multi-project-app): your .NET MAUI code is in a shared library, and each platform has its own head project.

## Prerequisites

- An app that runs with Avalonia.Controls.Maui on the desktop. See [Getting started](/docs/platform-specific-guides/maui/getting-started).
- The `wasm-tools` workload:

  ```bash
  dotnet workload install wasm-tools
  ```

## Single-view lifetime

In the browser, the app runs in one HTML element instead of a window. Avalonia calls this a single-view lifetime. In the browser head, call `UseAvaloniaApp` with `useSingleViewLifetime` set to `true`:

```csharp
builder.UseAvaloniaApp(useSingleViewLifetime: true);
```

The .NET MAUI app still creates a `Window`, but Avalonia.Controls.Maui shows its content in the browser element. The app does not receive sleep and resume calls, and the Avalonia.Controls.Maui `OnWindowCreated` lifecycle event does not occur.

## Add a browser head to a single-project app

The [WasmPlusSingleProject sample](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Fundamentals/WasmPlusSingleProject) shows the result of these steps.

1. In the .NET MAUI project file, change the line that adds `net11.0` so that it also adds `net11.0-browser`. For this target framework, the project builds as a library, so set `OutputType` to `Exe` for the other target frameworks only:

   ```xml
   <PropertyGroup>
     <TargetFrameworks>net11.0;net11.0-browser;$(TargetFrameworks)</TargetFrameworks>
     <OutputType Condition="'$(TargetFramework)' != 'net11.0-browser'">Exe</OutputType>
   </PropertyGroup>
   ```

   Make sure that `Avalonia.Controls.Maui.Desktop` is referenced for `net11.0` only:

   ```xml
   <PackageReference Include="Avalonia.Controls.Maui.Desktop" Version="11.*"
                     Condition="'$(TargetFramework)' == 'net11.0'" />
   ```

2. Make sure that `CreateMauiApp` in `MauiProgram.cs` has a `useSingleViewLifetime` parameter and passes it to `UseAvaloniaApp`. The `--with-avalonia` template already does this:

   ```csharp
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
           ;

       return builder.Build();
   }
   ```

3. Create the browser head project next to the .NET MAUI project, for example `MyMauiApp.Browser/MyMauiApp.Browser.csproj`:

   ```xml
   <Project Sdk="Microsoft.NET.Sdk.WebAssembly">
     <PropertyGroup>
       <TargetFramework>net11.0-browser</TargetFramework>
       <OutputType>Exe</OutputType>
       <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
       <Nullable>enable</Nullable>
       <UseMaui>true</UseMaui>
       <RootNamespace>MyMauiApp</RootNamespace>
     </PropertyGroup>

     <ItemGroup>
       <PackageReference Include="Avalonia" Version="12.*" />
       <PackageReference Include="Avalonia.Themes.Fluent" Version="12.*" />
       <PackageReference Include="Avalonia.Fonts.Inter" Version="12.*" />
       <PackageReference Include="Avalonia.Browser" Version="12.*" />
       <PackageReference Include="Microsoft.Maui.Controls" Version="$(MauiVersion)" />
     </ItemGroup>

     <ItemGroup>
       <ProjectReference Include="../MyMauiApp/MyMauiApp.csproj" />
     </ItemGroup>
   </Project>
   ```

4. Add an Avalonia application class to the browser head. It calls `CreateMauiApp` with `true`, so the app uses the single-view lifetime.

   `App.axaml`:

   ```xml
   <Application xmlns="https://github.com/avaloniaui"
                xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                x:Class="MyMauiApp.AvaloniaApp">
     <Application.Styles>
       <FluentTheme />
     </Application.Styles>
   </Application>
   ```

   `App.axaml.cs`:

   ```csharp
   using Avalonia.Controls.Maui.Platform;
   using Avalonia.Markup.Xaml;
   using Microsoft.Maui.Hosting;

   namespace MyMauiApp;

   public class AvaloniaApp : MauiAvaloniaApplication
   {
       public override void Initialize()
       {
           AvaloniaXamlLoader.Load(this);
       }

       protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp(true);
   }
   ```

   The .NET MAUI project also generates a class named `AvaloniaApp`, but that class is `internal`, so it does not conflict with this one.

5. Add `Program.cs`. It starts the app in the HTML element with the ID `out`:

   ```csharp
   using Avalonia;
   using Avalonia.Browser;
   using System.Threading.Tasks;

   namespace MyMauiApp;

   internal sealed partial class Program
   {
       private static Task Main(string[] args) => BuildAvaloniaApp()
           .WithInterFont()
           .StartBrowserAppAsync("out");

       public static AppBuilder BuildAvaloniaApp()
           => AppBuilder.Configure<AvaloniaApp>();
   }
   ```

6. Add the web files in a `wwwroot` folder: `index.html`, `main.js`, and `app.css`. The page must contain an element with the ID that you passed to `StartBrowserAppAsync`. You can copy these files from the sample, or from a project that you create with the Avalonia `avalonia.xplat` template. See [WebAssembly](/docs/platform-specific-guides/webassembly).

7. Run the browser head:

   ```bash
   dotnet run --project MyMauiApp.Browser
   ```

   Open the `App url` that the command shows.

## Add a browser head to a multi-project app

In a multi-project app, your pages, resources, and app class are in a shared library that targets `net11.0`. Each head project has its own `MauiProgram`, and each head generates its own `AvaloniaApp`. The [WasmPlusMultiProject sample](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Fundamentals/WasmPlusMultiProject) uses this structure.

1. In the shared library, put the common configuration in an extension method:

   ```csharp
   public static class MauiProgramExtensions
   {
       public static MauiAppBuilder UseSharedMauiApp(this MauiAppBuilder builder)
       {
           builder
               .UseMauiApp<App>()
               .ConfigureFonts(fonts =>
               {
                   fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
               });

           return builder;
       }
   }
   ```

   The shared library references `Avalonia.Controls.Maui`, and does not generate bootstrap code:

   ```xml
   <PropertyGroup>
     <TargetFramework>net11.0</TargetFramework>
     <UseMaui>true</UseMaui>
     <SingleProject>true</SingleProject>
     <AvaloniaControlsMauiGenerateBootstrap>false</AvaloniaControlsMauiGenerateBootstrap>
   </PropertyGroup>
   ```

2. Create the browser head with the `Microsoft.NET.Sdk.WebAssembly` SDK. Set `AvaloniaControlsMauiGenerateBootstrap` to `true`, so that the build generates `AvaloniaApp` in this project:

   ```xml
   <Project Sdk="Microsoft.NET.Sdk.WebAssembly">
     <PropertyGroup>
       <TargetFramework>net11.0-browser</TargetFramework>
       <OutputType>Exe</OutputType>
       <RootNamespace>MyMauiApp.Browser</RootNamespace>
       <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
       <UseMaui>true</UseMaui>
       <AvaloniaControlsMauiGenerateBootstrap>true</AvaloniaControlsMauiGenerateBootstrap>
     </PropertyGroup>

     <ItemGroup>
       <PackageReference Include="Avalonia" Version="12.*" />
       <PackageReference Include="Avalonia.Themes.Fluent" Version="12.*" />
       <PackageReference Include="Avalonia.Fonts.Inter" Version="12.*" />
       <PackageReference Include="Avalonia.Browser" Version="12.*" />
       <PackageReference Include="Microsoft.Maui.Controls" Version="$(MauiVersion)" />
       <PackageReference Include="Avalonia.Controls.Maui" Version="11.*" />
     </ItemGroup>

     <ItemGroup>
       <ProjectReference Include="..\MyMauiApp\MyMauiApp.csproj" />
     </ItemGroup>
   </Project>
   ```

3. Add a `MauiProgram` to the browser head that always uses the single-view lifetime. The generated `AvaloniaApp` calls this method:

   ```csharp
   namespace MyMauiApp.Browser;

   public static class MauiProgram
   {
       public static MauiApp CreateMauiApp()
       {
           var builder = MauiApp.CreateBuilder();

           builder
               .UseSharedMauiApp()
               .UseAvaloniaApp(useSingleViewLifetime: true);

           return builder.Build();
       }
   }
   ```

4. Add `Program.cs` and the `wwwroot` files, as in steps 5 and 6 of the [single-project steps](#add-a-browser-head-to-a-single-project-app).

5. Run the browser head:

   ```bash
   dotnet run --project MyMauiApp.Browser
   ```

The other heads follow the same pattern. A desktop head targets `net11.0`, references `Avalonia.Controls.Maui.Desktop`, and calls `UseAvaloniaApp()`. The Android, iOS, Mac Catalyst, and WinUI heads call `UseAvaloniaEmbedding<AvaloniaApp>()`.

## Browser considerations

- **Network requests**: The browser applies cross-origin resource sharing (CORS) rules to `HttpClient` requests. If an API that your app calls does not allow requests from your site, the requests fail. The [MyConference sample](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Apps/MyConference) sends its requests through a proxy for this reason.
- **SkiaSharp views**: If you use `UseAvaloniaSkiaSharp` and GPU rendering is not reliable, set `forceSoftwareRendering` to `true`. See [Use SkiaSharp views](/docs/platform-specific-guides/maui/configuration#use-skiasharp-views).
- **Platform options**: To set `BrowserPlatformOptions`, such as the rendering mode, pass them to `StartBrowserAppAsync` in `Program.cs`. See [Configuring browser platform options](/docs/platform-specific-guides/webassembly#configuring-browser-platform-options).

## Deployment

To publish the app, publish the browser head. For more information, see [Deploying WebAssembly](/docs/deployment/webassembly).

## See also

- [WebAssembly](/docs/platform-specific-guides/webassembly)
- [Configuration](/docs/platform-specific-guides/maui/configuration)
- [WasmPlusSingleProject sample](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Fundamentals/WasmPlusSingleProject)
- [WasmPlusMultiProject sample](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Fundamentals/WasmPlusMultiProject)
