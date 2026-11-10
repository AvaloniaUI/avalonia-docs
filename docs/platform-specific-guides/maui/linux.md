---
id: linux
title: Linux and Wayland with .NET MAUI
description: Run a .NET MAUI app on Linux with Avalonia.Controls.Maui, write a custom desktop entry point, and use the native Wayland backend.
doc-type: how-to
---

On Linux, the `net11.0` target framework of a .NET MAUI app runs with the Avalonia desktop backends. By default, Avalonia uses X11. On a Wayland desktop, the app runs through XWayland.

This page shows how to replace the generated desktop entry point with your own, so that you can configure the Avalonia `AppBuilder`. It then uses this entry point to enable the native Wayland backend.

## Write a custom desktop entry point

[Avalonia.Controls.Maui.Desktop](/docs/platform-specific-guides/maui/configuration#generated-bootstrap-code) generates a `Main` method that calls `UsePlatformDetect()` with no other options. To configure the `AppBuilder`, for example to set `X11PlatformOptions` or to use Wayland, turn off the generated `Main` method and write your own.

1. In the project file, set `AvaloniaControlsMauiGenerateDesktopProgram` to `false`. The build still generates the `AvaloniaApp` class.

   ```xml
   <PropertyGroup>
     <AvaloniaControlsMauiGenerateDesktopProgram>false</AvaloniaControlsMauiGenerateDesktopProgram>
   </PropertyGroup>
   ```

2. Create `Platforms/Desktop/Program.cs`:

   ```csharp
   using Avalonia;

   namespace MyMauiApp;

   internal static class Program
   {
       [STAThread]
       public static void Main(string[] args) => BuildAvaloniaApp()
           .StartWithClassicDesktopLifetime(args);

       public static AppBuilder BuildAvaloniaApp()
           => AppBuilder.Configure<AvaloniaApp>()
               .UsePlatformDetect()
               .WithInterFont()
               .LogToTrace();
   }
   ```

3. In a single-project app, .NET MAUI compiles only the `Platforms` folders that it knows, such as `Platforms/Android`. Add the `Platforms/Desktop` folder for the `net11.0` target framework:

   ```xml
   <ItemGroup Condition="'$(TargetFramework)' == 'net11.0'">
     <MauiPlatformSpecificFolder Include="Platforms\Desktop\" />
   </ItemGroup>
   ```

You can now change `BuildAvaloniaApp` as in any Avalonia desktop app. For the Linux options, see [Configuring X11 platform options](/docs/platform-specific-guides/linux#configuring-x11-platform-options).

## Use the Wayland backend

The [`Avalonia.Wayland`](https://www.nuget.org/packages/Avalonia.Wayland) package provides a native Wayland backend. The [WaylandSupport sample](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Fundamentals/WaylandSupport) shows the result of these steps.

1. Write a custom desktop entry point, as described in [Write a custom desktop entry point](#write-a-custom-desktop-entry-point).

2. Add the `Avalonia.Wayland` package to the `net11.0` target framework. Use the same version as the other Avalonia packages:

   ```xml
   <ItemGroup Condition="'$(TargetFramework)' == 'net11.0'">
     <PackageReference Include="Avalonia.Wayland" Version="12.*" />
   </ItemGroup>
   ```

3. In `Platforms/Desktop/Program.cs`, call `UseWaylandWithFallback()` after `UsePlatformDetect()`:

   ```csharp
   public static AppBuilder BuildAvaloniaApp()
       => AppBuilder.Configure<AvaloniaApp>()
           .UsePlatformDetect()
           .UseWaylandWithFallback()
           .With(new WaylandPlatformOptions { AppId = "com.companyname.mymauiapp" })
           .WithInterFont()
           .LogToTrace();
   ```

   On Linux, the app uses Wayland when a Wayland compositor is available, and X11 when it is not. On Windows and macOS, `UseWaylandWithFallback()` has no effect.

   To use Wayland with no X11 fallback, call `UseWayland()` instead. The app then does not start without a Wayland compositor.

   `WaylandPlatformOptions` is optional. `AppId` sets the Wayland app ID, which the compositor uses to match the window to its `.desktop` file. The default is the name of the entry assembly.

4. Run the app:

   ```bash
   dotnet run -f net11.0
   ```

To make sure that the X11 fallback works in a Wayland session, start the app with a Wayland display that does not exist:

```bash
WAYLAND_DISPLAY=no-wayland dotnet run -f net11.0
```

:::caution
The Avalonia Wayland backend does not yet have all the features of the X11 backend. For more information, see [Wayland](/docs/platform-specific-guides/linux#wayland).
:::

## See also

- [Desktop Linux](/docs/platform-specific-guides/linux)
- [Deploying to Desktop Linux](/docs/deployment/linux)
- [Configuration](/docs/platform-specific-guides/maui/configuration)
- [WaylandSupport sample](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Fundamentals/WaylandSupport)
