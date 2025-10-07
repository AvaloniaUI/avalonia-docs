# Installation Guide for Avalonia Accelerate

This guide explains how to configure your project to use Avalonia Accelerate packages, including setting up the NuGet package source and license key.

## Configure the NuGet Package Source

Avalonia Accelerate packages are distributed through a dedicated NuGet feed that requires authentication with your Avalonia Accelerate license key.

### Option 1: Configure via `nuget.config` (Recommended)

1. Locate or create a `nuget.config` file:
    - Look for an existing `nuget.config` file in your solution directory
    - If none exists, create a new file named `nuget.config` in the same folder as your solution file (`.sln`)

2. Add the following configuration:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="api.nuget.org" value="https://api.nuget.org/v3/index.json" />
    <add key="avalonia-accelerate" value="https://accelerate-nuget-feed.avaloniaui.net/v3/index.json" />
  </packageSources>
  <packageSourceCredentials>
    <avalonia-accelerate>
      <add key="Username" value="license" />
      <add key="ClearTextPassword" value="YOUR_LICENSE_KEY" />
    </avalonia-accelerate>
  </packageSourceCredentials>
</configuration>
```

3. Replace `YOUR_LICENSE_KEY` with your actual Avalonia license key.

### Option 2: Configure via Visual Studio

1. Open Visual Studio and go to _Tools → NuGet Package Manager → Package Manager Settings_
2. Navigate to _Package Sources_
3. Click the _+_ button to add a new source:
    - **Name**: `avalonia-accelerate`
    - **Source**: https://accelerate-nuget-feed.avaloniaui.net/v3/index.json
4. Click _Update_ to save the new source
5. When prompted for credentials during package installation:
    - **Username**: `license`
    - **Password**: Your Avalonia license key

## Add the NuGet Package

Add the desired Avalonia Accelerate package to your project:

```bash
dotnet add package Avalonia.Controls.MediaPlayer
```

*(Replace with the package name you need, e.g., `Avalonia.Controls.WebView`, `Avalonia.Controls.Markdown`, etc.)*

## Add the License Key

Include your Avalonia UI license key in the executable project file (`.csproj`):

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

> For multi-project solutions, you can store your license key in an [environment variable](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-environment-variables-in-a-build) or a [shared props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022#directorybuildprops-example) to avoid duplication.
