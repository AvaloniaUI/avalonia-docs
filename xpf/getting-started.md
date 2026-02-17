---
id: getting-started
title: Getting started
---

## Step 1: Prepare your WPF project

:::note
This document uses .NET 7.0 as an example, but .NET 6.0 and above are supported by XPF. 

We recommend using .NET 8 (current LTS) or .NET 9. 
:::

Make sure that your project has been updated/ported to at least `net6.0-windows` and uses the new [SDK](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview) csproj format. 

For more information see the Microsoft [How to upgrade a WPF desktop app to .NET 7](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/migration) guide.

Confirm that your project runs acceptably on .NET 7 with WPF.

:::danger
This step is **vital**. XPF will not work with the old/legacy `.csproj` format or versions of .NET less than 6.0. You must first convert your project, and ensure that WPF works with modern .NET version before attempting to use XPF.
:::

:::danger
If you are running on Linux, see the [linux](xpf/platforms/linux) guide **before** you install .NET.
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
<Project Sdk="Xpf.Sdk/1.4.0">
```

:::note
XPF is in active development and the CI build version changes frequently. The version given here was the latest version at the time of writing, but it is likely that newer versions are available. You can find the latest CI build version at https://xpf-nuget-feed.avaloniaui.net/packages/xpf.sdk. See [nightly builds](/xpf/versioning) for more information.
:::

:::tip
If you have multiple projects which will need to use the same XPF SDK vesion, you can [specify this version in `global.json`](advanced/centralized-management)
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

## Additional Projects

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

## Target Framework

Ideally all projects which reference XPF should be using the `net6.0-windows` or `net7.0-windows` TFM. You can use the `net6.0` or `net7.0` TFM but in this case you cannot use `<EnableWindowsTargeting>` and instead must use the XPF SDK.

## Porting tips

### Project Files

1. Convert all projects to .NET 7.0 and above. The old project file format that precedes the new [.NET SDK style csproj](https://web.archive.org/web/20230712075209/https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview) will not work outside of Windows.
2. We highly recommend doing (1) on Windows first to avoid having to wrangle with hard to debug windows-specific dependency issues on other platforms. Please try to replace or remove deprecated features from .NET 7.0 such as AppDomain, CodeDOM, WCF, `System.Web`, XmlSerializer, and hard Windows-only API’s like `System.Management.Instrumentation`, `System.Drawing.Common` etc. on your app with cross-platform friendly alternatives.
3. While doing (1), watch out for any custom MSBuild Tasks that your app may have. Make sure any said Tasks still work on .NET 7.0 by running `dotnet build`. Don’t test inside Visual Studio so that you can confirm it works outside.
4. Convert all PCL (Portable Class Libraries) into `netstandard` libraries.
5. Remove any `ApplicationDefinition` entries from the `.csproj`.
6. Remove `PropertyGroup` elements that look like [this](https://github.com/microsoft/WPF-Samples/blob/main/Clipboard/ClipboardViewer/ClipboardViewer.csproj#L7-L18) and use the default configuration provided by the SDK where possible

### Dependencies

7. If you had a .NET Framework-based nuget package, please try to find a newer version (`netstandard2.0`, `netcoreapp2.0`+, `net5.0`+) of said package. Most of the time even those .NET Framework packages work cross platform too but it’s not a guarantee. 
8. If there are `Reference` items that are linked to a standalone `dll` on your app's project file, try to find an alternative for it on NuGet as described on (4). If it’s a managed assembly then often times it will work but again, no guarantee.
9. If you have any native binaries, please try to find a managed equivalent or, if you have the sources for those native bins: try to recompile them to the target platforms you desire. Make sure to use [NativeLibrary APIs](https://web.archive.org/web/20230326113052/https://developers.redhat.com/blog/2019/09/06/interacting-with-native-libraries-in-net-core-3-0) to interop to those afterwards.
10. We recommend updating your dependencies to the latest version; especially 3rd party components such as Actipro, DevExpress, Syncfusion, Telerik etc.

### Windows

11. We discourage any form of custom chrome window controls (e.g. WPF's WindowChrome, MahApps's MetroWindow, DevExpress's DXWindow) and anything that customizes window borders or behaviors because it’s not guaranteed to fit into the target platform’s UI design (e.g., a custom MetroWindow on a macOS). The best design for XPF target platforms is single view app (e.g., like a website or a mobile application).

### Resources & Settings

12. Resource Files (`.resx`) don't get regenerated outside of Visual Studio. We suggest making use of alternatives to localization like JSON files etc. or other solutions that works independently of Visual Studio. (Subject to review once .NET 8.0 is out)
13. Visual Studio Text Templates (T4, *.template files) are also deprecated on .NET 7.0. Please use source generators as an alternative.
14. Images or Bitmaps in Resource Files (`.resx`) are not compatible with the .NET 7.0: consider using WPF's resources scheme instead.
15. Avoid using `App.Config` / `System.Configuration.ConfigurationManager` due to it not persisting correctly on platforms that doesn’t allow writes on the same location as the executing assembly (macOS, mobile, WASM, etc.) and use a 3rd party/in-house solution to write persistent configuration data for your apps. 

### Filesystem Access

16. Make sure that your file access code can handle case-sensitive filesystems and uses `Path.DirectorySeparatorChar` instead of hardcoding the directory separators. 

### Unsupported Controls

17. Avoid using WPF's Spell checking and XPS features since those are not supported by XPF.
18. If you have any advanced & specialized WPF features that you want to work on your app like Shaders, 3D, Media, etc., Please contact us so that we can help you figure out the best way forward.
