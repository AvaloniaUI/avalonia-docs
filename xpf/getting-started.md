---
id: getting-started
title: Getting started
---

:::tip[Use AI to help with migration]
If you use an AI coding assistant that supports MCP (VS Code, Cursor, Rider, Claude Code, and others), the [Build MCP](/tools/ai-tools/build-mcp) server can walk you through this process step by step. Ask your assistant to migrate your WPF project and it will analyze your dependencies, configure the NuGet feed, switch the SDK, and troubleshoot issues interactively. See [Build MCP setup](/tools/ai-tools/build-mcp#setting-up-the-mcp-server) for configuration instructions.
:::

## Step 1: Prepare your WPF project

:::note
This document uses .NET 7.0 as an example, but .NET 6.0 and above are supported by XPF. 

.NET 8 (current LTS) or .NET 9 is recommended.
:::

Make sure that your project has been updated/ported to at least `net6.0-windows` and uses the SDK-style `.csproj` format. SDK-style projects start with `<Project Sdk="Microsoft.NET.Sdk">` rather than the older verbose format with `<Import>` elements.

If your project still uses the legacy `.csproj` format, use the .NET Upgrade Assistant or manually convert it. The key changes are:
- Replace the verbose XML with an SDK-style `<Project Sdk="Microsoft.NET.Sdk">` root element
- Set `<TargetFramework>net8.0-windows</TargetFramework>`
- Add `<UseWpf>true</UseWpf>`
- Remove explicit file includes (SDK-style projects include files automatically)

Confirm that your project builds and runs correctly on .NET 8 (or later) with WPF before proceeding.

:::danger
This step is **vital**. XPF will not work with the old/legacy `.csproj` format or versions of .NET less than 6.0. You must first convert your project, and ensure that WPF works with modern .NET version before attempting to use XPF.
:::

:::danger
If you are running on Linux, see the [linux](/xpf/platforms/linux) guide **before** you install .NET.
:::

## Step 2: Add a `NuGet.config`

Create a `NuGet.config` file at the root of your solution, or modify an existing one to contain the following:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="api.nuget.org" value="https://api.nuget.org/v3/index.json" />
    <add key="xpf" value="https://xpf-nuget-feed.avaloniaui.net/v3/index.json" />
    <add key="avalonia-nightly" value="https://nuget-feed-all.avaloniaui.net/v3/index.json" />
  </packageSources>
  <packageSourceCredentials>
    <xpf>
      <add key="Username" value="license" />
      <add key="ClearTextPassword" value="<YOUR_LICENSE_KEY>" />
    </xpf>
  </packageSourceCredentials>
</configuration>
```

## Step 3: Use the XPF SDK

In the executable WPF project, change the SDK to use the XPF SDK in the `.csproj`. The first line:

```xml
<Project Sdk="Microsoft.NET.Sdk">
``` 

should be changed to:

```xml
<Project Sdk="Xpf.Sdk/1.6.0">
```

:::note
XPF is in active development and the CI build version changes frequently. The version given here was the latest version at the time of writing, but it is likely that newer versions are available. You can find the latest CI build version at https://xpf-nuget-feed.avaloniaui.net/packages/xpf.sdk. See [nightly builds](/xpf/version-info/versioning) for more information.
:::

:::tip
If you have multiple projects which will need to use the same XPF SDK vesion, you can [specify this version in `global.json`](/xpf/configuration/centralizing-multiple-xpf-projects)
:::

## Step 4: Add your Licence Key

In your executable's `.csproj`, add:

```xml
  <ItemGroup>
    <RuntimeHostConfigurationOption Include="AvaloniaUI.Xpf.LicenseKey" Value="<YOUR_LICENSE_KEY>" />
  </ItemGroup>  
```

Note, that if you have a production license, the AssemblyName of the project has to match your license key

## Step 5: Clean your solution

Changing the project SDK requires a clean of existing build artifacts:

- Run `dotnet clean` from the command line; or
- Use `Build -> Clean Solution` from your IDE; or
- Delete your `obj`/`bin` directories manually

## Step 6: Run the project

You should be able to run your project from your preferred IDE with Avalonia XPF or use `dotnet run`.

:::tip
If running on Linux see the [Linux](/xpf/platforms/linux) page for information on how to install .NET and required dependencies.
:::

## Additional projects

If you have non-executable projects that are using WPF APIs and need to build those on Linux or macOS, you can either change the SDK as described above, or if you're targeting `net7.0-windows` add:

```xml
<PropertyGroup>
  <EnableWindowsTargeting>true</EnableWindowsTargeting>
</PropertyGroup>
```

to the corresponding project file.

Alternatively create a `Directory.Build.props` file at the root of your solution with the following contents:

```xml
<Project>
  <PropertyGroup>
    <EnableWindowsTargeting>true</EnableWindowsTargeting>
  </PropertyGroup>
</Project>  
```

## Target framework

Ideally all projects which reference XPF should be using the `net6.0-windows` or `net7.0-windows` TFM. You can use the `net6.0` or `net7.0` TFM but in this case you cannot use `<EnableWindowsTargeting>` and instead must use the XPF SDK.

:::tip
The `-windows` target framework (e.g., `net8.0-windows`) works on all platforms when using the XPF SDK. You do not need to change the target framework to build or run on Linux or macOS. Some third-party libraries require the Windows-specific TFM, so keeping `net8.0-windows` is often the simplest approach.
:::

## WinForms hosting (Windows only)

If your application needs to host WinForms controls inside XPF, add the following to a Windows-conditional `PropertyGroup` in your `.csproj`:

```xml
<PropertyGroup Condition="$([MSBuild]::IsOSPlatform('Windows'))">
    <XpfUseMicrosoftWindowsForms>true</XpfUseMicrosoftWindowsForms>
</PropertyGroup>
```

This disables the WinForms shim layer and enables native WinForms integration. Note that WinForms hosting is only available on Windows and will cause build failures on other platforms if not conditioned appropriately.

## Porting tips

### Project files

1. Convert all projects to .NET 8.0 and above. The old project file format (non-SDK-style `.csproj`) will not work outside of Windows.
2. It is highly recommended to do (1) on Windows first to avoid having to wrangle with hard-to-debug Windows-specific dependency issues on other platforms. Replace or remove deprecated features from .NET 7.0 such as AppDomain, CodeDOM, WCF, `System.Web`, XmlSerializer, and hard Windows-only APIs like `System.Management.Instrumentation` and `System.Drawing.Common` on your app with cross-platform friendly alternatives.
3. While doing (1), watch out for any custom MSBuild Tasks that your app may have. Make sure any said Tasks still work on .NET 7.0 by running `dotnet build`. Don’t test inside Visual Studio so that you can confirm it works outside.
4. Convert all PCL (Portable Class Libraries) into `netstandard` libraries.
5. Remove any `ApplicationDefinition` entries from the `.csproj`.
6. Remove verbose `PropertyGroup` elements that define `Configuration`, `Platform`, `ProjectGuid`, `OutputType`, `RootNamespace`, and similar properties individually. SDK-style projects provide sensible defaults for all of these.

### Dependencies

7. If you had a .NET Framework-based nuget package, please try to find a newer version (`netstandard2.0`, `netcoreapp2.0`+, `net5.0`+) of said package. Most of the time even those .NET Framework packages work cross platform too but it’s not a guarantee. 
8. If there are `Reference` items that are linked to a standalone `dll` on your app's project file, try to find an alternative for it on NuGet as described on (4). If it’s a managed assembly then often times it will work but again, no guarantee.
9. If you have any native binaries, try to find a managed equivalent or recompile them for your target platforms. Use `System.Runtime.InteropServices.NativeLibrary` and `DllImport` for native interop on .NET 8+.
10. Update your dependencies to the latest version, especially third-party components such as Actipro, DevExpress, Syncfusion, and Telerik.

### Windows

11. Avoid custom chrome window controls (e.g. WPF’s WindowChrome, MahApps’s MetroWindow, DevExpress’s DXWindow) and anything that customizes window borders or behaviors because it is not guaranteed to fit into the target platform’s UI design (e.g., a custom MetroWindow on macOS). The best design for XPF target platforms is a single-view app (e.g., like a website or a mobile application).

### Resources and settings

12. Resource Files (`.resx`) don't get regenerated outside of Visual Studio. Consider alternatives to localization like JSON files or other solutions that work independently of Visual Studio.
13. Visual Studio Text Templates (T4, *.template files) are also deprecated on .NET 7.0. Please use source generators as an alternative.
14. Images or Bitmaps in Resource Files (`.resx`) are not compatible with the .NET 7.0: consider using WPF's resources scheme instead.
15. Avoid using `App.Config` / `System.Configuration.ConfigurationManager` due to it not persisting correctly on platforms that don’t allow writes on the same location as the executing assembly (macOS, mobile, WASM, and similar) and use a 3rd party/in-house solution to write persistent configuration data for your apps.

### Filesystem access

16. Make sure that your file access code can handle case-sensitive filesystems and uses `Path.DirectorySeparatorChar` instead of hardcoding the directory separators. 

### Fonts

17. Custom fonts must be included as `<Resource>` items in your `.csproj`. If fonts are not embedded as resources, the application may crash or fall back to a default font on non-Windows platforms:
    ```xml
    <ItemGroup>
        <Resource Include="Fonts\*.ttf" />
    </ItemGroup>
    ```
18. Font matching works differently between WPF and XPF. Fonts with non-standard style names (e.g., "Condense" instead of "Condensed") may not match correctly. If a font is not rendering as expected, verify that the font family name in your XAML matches the internal name in the font file.
19. To customize font fallback behavior (for example, to specify which fonts are used for missing characters), configure `FontManagerOptions` in your [custom initialization](/xpf/configuration/customizing-initialization):
    ```csharp
    .With(new FontManagerOptions
    {
        FontFallbacks = new[]
        {
            new FontFallback { FontFamily = "My Fallback Font" }
        }
    })
    ```

### Unsupported controls

20. Avoid using WPF's Spell checking and XPS features since those are not supported by XPF.
21. If you have any advanced and specialized WPF features that you want to work on your app like Shaders, 3D, and Media, contact the Avalonia team for guidance on the best way forward.
