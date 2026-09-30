---
id: getting-started
title: Getting started
---

:::tip[Use AI to help with migration]
If you use an AI coding assistant that supports MCP (VS Code, Cursor, Rider, Claude Code, and others), the [Build MCP](/tools/ai-tools/build-mcp) server can walk you through this process step by step. Ask your assistant to migrate your WPF project and it will analyze your dependencies, configure the NuGet feed, switch the SDK, and troubleshoot issues interactively. See [Build MCP setup](/tools/ai-tools/build-mcp#setting-up-the-mcp-server) for configuration instructions.
:::

## Step 1: Prepare your WPF project

:::note
.NET 10 or above is recommended.
:::

Make sure that your project has been updated or ported to at least `net10.0-windows` and uses the SDK-style `.csproj` format. SDK-style projects start with `<Project Sdk="Microsoft.NET.Sdk">` rather than the older verbose format with `<Import>` elements.

If your project still uses the legacy `.csproj` format, use the [GitHub Copilot upgrade agent](https://learn.microsoft.com/en-us/dotnet/core/porting/github-copilot-upgrade/overview) or manually convert it. The key changes are:
- Replace the verbose XML with an SDK-style `<Project Sdk="Microsoft.NET.Sdk">` root element
- Set `<TargetFramework>net10.0-windows</TargetFramework>`
- Add `<UseWpf>true</UseWpf>`
- Remove explicit file includes. SDK-style projects include files automatically.

Confirm that your project builds and runs correctly on .NET 10 (or later) with WPF before proceeding.

:::danger
XPF will **not work** with the legacy `.csproj` format or versions of .NET less than 6.0. You must first convert your project and ensure it works with a newer .NET version before attempting to use XPF.

If you are running on Linux, see the [Linux](/xpf/platforms/linux) guide **before** you install .NET.
:::

## Step 2: Add a `NuGet.config`

Create a `NuGet.config` file at the root of your solution, or modify an existing one to contain the following.

You can get your license key from the [Avalonia portal](https://portal.avaloniaui.net/).

```xml title="NuGet.config"
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

In the executable WPF project, change the SDK to use the XPF SDK in the `.csproj`. This is the first line of the file.

```xml title="YourProject.csproj"
<!-- Don't use this -->
<Project Sdk="Microsoft.NET.Sdk">

<!-- Change to this -->
<Project Sdk="Xpf.Sdk/1.6.7">
```

If you have multiple projects which need to use the same XPF SDK version, you can [specify this version in `global.json`](/xpf/configuration/centralizing-multiple-xpf-projects)

:::note
XPF is in active development. The CI build version changes frequently. You can find the latest CI build version at https://xpf-nuget-feed.avaloniaui.net/packages/xpf.sdk. See [nightly builds](/xpf/version-info/versioning) for more information.
:::

## Step 4: Add your license key

Add your license key to your executable project's `.csproj` file.

Note that the licensing system differs between XPF versions 1 and 2.

<Tabs>

<TabItem value="xpf2" label="XPF 2.x">

You can get your license key from the [Avalonia portal](https://portal.avaloniaui.net/).

```xml title="YourProject.csproj"
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

If you were previously using the XPF 1.x licensing format (`<RuntimeHostConfigurationOption>`), you can now remove it from your `.csproj`.

</TabItem>

<TabItem value="xpf1" label="XPF 1.x">

If you have a production license, the `AssemblyName` of the project must match your license key.

```xml title="YourProject.csproj"
<ItemGroup>
  <RuntimeHostConfigurationOption Include="AvaloniaUI.Xpf.LicenseKey" Value="<YOUR_LICENSE_KEY>" />
</ItemGroup>  
```

</TabItem>

</Tabs>

## Step 5: Clean your solution

Changing the project SDK requires a clean of existing build artifacts. You can either:

- Run `dotnet clean` from the command line, or
- Use **Build → Clean Solution** from your IDE, or
- Delete your `obj` or `bin` directories manually.

## Step 6: Run the project

You can now run your project using your preferred IDE or `dotnet run`.

:::tip
If running on Linux, see the [Linux page](/xpf/platforms/linux) for how to install .NET and required dependencies.
:::

## Additional projects

If you have non-executable projects that are using WPF APIs and need to be built on Linux or macOS, you can either change the SDK [as described above](#step-3-use-the-xpf-sdk), or add the following to the `.csproj` file:

```xml
<PropertyGroup>
  <EnableWindowsTargeting>true</EnableWindowsTargeting>
</PropertyGroup>
```

As an alternative, you can share the configuration between all projects in the same solution by creating a `Directory.Build.props` file at the root of the solution. Add the following to the file:

```xml
<Project>
  <PropertyGroup>
    <EnableWindowsTargeting>true</EnableWindowsTargeting>
  </PropertyGroup>
</Project>  
```

## Target framework

All projects that reference XPF should use the `net10.0-windows` TFM. You can use a TFM without `-windows`, but `<EnableWindowsTargeting>` will not work and you must [add the XPF SDK](#step-3-use-the-xpf-sdk) to each project.

:::tip
The `-windows` target framework (e.g., `net10.0-windows`) works on all platforms when using the XPF SDK. You do not need to change the target framework to build or run on other platforms. Some third-party libraries require the Windows-specific TFM, so keeping `net10.0-windows` is often the simplest approach.
:::

## WinForms hosting (Windows only)

If your application needs to host WinForms controls inside XPF, add the following to a Windows-conditional `PropertyGroup` in your `.csproj`:

```xml
<PropertyGroup Condition="$([MSBuild]::IsOSPlatform('Windows'))">
    <XpfUseMicrosoftWindowsForms>true</XpfUseMicrosoftWindowsForms>
</PropertyGroup>
```

This setting disables the WinForms shim layer and enables native WinForms integration.

:::danger
WinForms hosting is only available on Windows and will cause build failures on other platforms if not conditioned appropriately.
:::

## Porting tips

### Project files

1. Convert all projects to .NET 10.0 and above. The old project file format (non-SDK-style `.csproj`) will not work outside of Windows.
2. It is highly recommended to first upgrade .NET on Windows to avoid encountering dependency issues on other platforms. Remove deprecated features from older .NET versions and replace them with cross-platform alternatives.
3. Watch out for any custom MSBuild tasks your app may have. Make sure any such tasks still work by running `dotnet build`. Do not test inside Visual Studio so that you can confirm it works outside.
4. Convert all PCLs (Portable Class Libraries) into `netstandard` libraries.
5. Remove any `ApplicationDefinition` entries from the `.csproj`.
6. Remove verbose `PropertyGroup` elements that define `Configuration`, `Platform`, `ProjectGuid`, `OutputType`, `RootNamespace`, and similar properties. SDK-style projects provide sensible defaults for all of them.

### Dependencies

7. If you had a .NET Framework-based NuGet package, try to find a newer version of that package.
8. If there are `Reference` items that are linked to a standalone `dll` in your app's project file, try to find an alternative.
9. If you have any native binaries, try to find a managed equivalent or recompile them for your target platforms. Use `System.Runtime.InteropServices.NativeLibrary` and `DllImport` for native interop.
10. Update your dependencies to the latest versions, especially third-party components.

### Windows

11. Avoid custom chrome window controls (e.g. WPF’s WindowChrome, MahApps’s MetroWindow, DevExpress’s DXWindow) and anything that customizes window borders or behaviors. These are not guaranteed to fit into the target platform’s UI.

### Resources and settings

12. Resource files (`.resx`) do not regenerate outside of Visual Studio. See [Localizing](/docs/app-development/localizing) for guidance on how to manage resource files outside of Visual Studio, or consider alternative approaches to localization, like JSON files.
13. Visual Studio Text Templates (T4, *.template files) are deprecated. Use source generators as an alternative.
14. Images or Bitmaps in Resource files (`.resx`) are Windows-only. Use WPF's resources scheme instead.
15. Avoid using `App.Config` or `System.Configuration.ConfigurationManager`. Persistence is problematic on platforms that do not allow writes on the same location as the executing assembly. Instead, use a 3rd party or in-house solution to write persistent configuration data for your apps.

### Filesystem access

16. Make sure that your file access code can handle case-sensitive filesystems and uses `Path.DirectorySeparatorChar` instead of hardcoding the directory separators. 

### Fonts

17. Custom fonts must be included as `<Resource>` items in your `.csproj`. If your fonts are not embedded as resources, the application may crash or fall back to a default font on non-Windows platforms:
    ```xml
    <ItemGroup>
        <Resource Include="Fonts\*.ttf" />
    </ItemGroup>
    ```
18. Font matching works differently between in XPF. Fonts with non-standard style names (e.g., "Condense" instead of "Condensed") may not match correctly. If a font is not rendering as expected, verify that the font family name in your XAML matches the internal name in the font file.
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

20. Avoid using WPF's spell checking and XPS features. These are not supported by XPF.
21. If you have any advanced and specialized WPF features that you want to work on your app, contact us for guidance on the best way forward.
