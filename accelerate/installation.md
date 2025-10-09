# Installation

This guide explains how to configure your project to use Avalonia Accelerate packages.

## NuGet Package Source

Avalonia Accelerate packages are distributed via [nuget.org](https://www.nuget.org/).

:::note
Prior to October 13 2025, installing Avalonia Accelerate components required setting up a dedicated NuGet feed. That feed is no longer required and you should use [nuget.org](https://www.nuget.org/) instead.
:::

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
