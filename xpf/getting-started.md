---
id: getting-started
title: Getting started
---

## Step 1: Prepare your WPF project

Make sure that your project has been updated/ported to `net7.0-windows` and uses the new [SDK](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview) csproj format. 

For more information see the Microsoft [How to upgrade a WPF desktop app to .NET 7](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/migration) guide.

Confirm that your project runs acceptably on .NET 7 with WPF.

:::danger
This step is **vital**. XPF will not work with the old/legacy `.csproj` format or versions of .NET less than 6.0. You must first convert your project, and ensure that WPF works with modern .NET version before attempting to use XPF.
:::

:::danger
If you are running on Linux, see the [linux](platforms/linux) guide **before** you install .NET.
:::

:::tip
See our [porting tips](porting-tips) for a more detailed run-through of this step.
:::

:::note
This document specifies .NET 7.0, but `net6.0` should also work
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
<Project Sdk="Xpf.Sdk/1.3.0">
```
or for XPF Indie users, please use the following: 
```xml
<Project Sdk="Xpf.Sdk/1.4.0-cibuild001853">
```

:::note
XPF is in active development and the CI build version changes frequently. The version given here was the latest version at the time of writing, but it is likely that newer versions are available. You can find the latest CI build version at https://xpf-nuget-feed.avaloniaui.net/packages/xpf.sdk. See [nightly builds](build-feeds) for more information.
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
If running on Linux see the [Linux](platforms/linux) page for information on how to install .NET and required dependencies.
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
