---
id: installing-accelerate
title: Installing Avalonia Accelerate
description: Configure your project to use Avalonia Accelerate NuGet packages and add your license key.
doc-type: how-to
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

This guide explains how to configure your project to use Avalonia Accelerate packages.

## Prerequisites

Before you begin, make sure you have:

- An Avalonia project targeting .NET 8 or later.
- A valid Avalonia license key. You can obtain one from the [Avalonia portal](https://portal.avaloniaui.net), including a free [Community Edition](/tools/community-edition) key if you qualify.

## NuGet package source

Avalonia Accelerate packages are distributed via [nuget.org](https://www.nuget.org/). No additional NuGet feed configuration is required.

:::note
Prior to October 13 2025, installing Avalonia Accelerate components required setting up a dedicated NuGet feed. That feed is no longer required. Use [nuget.org](https://www.nuget.org/) instead.
:::

## Add the NuGet package

Install the Avalonia Accelerate package you need by running the `dotnet add package` command. For example, to add the media player control:

```bash
dotnet add package Avalonia.Controls.MediaPlayer
```

Replace the package name with the one you need. The following Accelerate packages are available:

| Package | Description |
|---------|-------------|
| `Avalonia.Controls.MediaPlayer` | Audio and video playback control |
| `Avalonia.Controls.WebView` | Native web content embedding |
| `Avalonia.Controls.Markdown` | Markdown text rendering |
| `Avalonia.Controls.TreeDataGrid` | Hierarchical and flat data grid |

## Add your license key

Include your Avalonia license key in the executable project file (`.csproj`):

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

Replace `YOUR_LICENSE_KEY` with the key from your [Avalonia portal](https://portal.avaloniaui.net) account.

For multi-project solutions, you can store your license key in an [environment variable](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-environment-variables-in-a-build) or a [shared props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022#directorybuildprops-example) to avoid duplication.

:::warning
Do not leave the license key value blank. If left blank, you may be unable to build or open your project.
:::

## Verify the installation

Build your project to confirm that the package restores and your license key is accepted:

```bash
dotnet build
```

If the license key is missing or invalid, you will see a build warning. Check that the `<AvaloniaUILicenseKey>` element is in the correct project file and that the key value matches what is shown in your portal account.

## See also

- [Community edition](/tools/community-edition)
- [Avalonia Tools overview](/tools/)
- [FAQ](/tools/faq)
