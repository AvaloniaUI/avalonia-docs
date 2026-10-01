---
id: upgrading-to-xpf2
title: Upgrading to XPF 2
description: How to upgrade your XPF app from version 1 to version 2.
doc-type: migration
---

This guide covers how to upgrade your XPF app to XPF version 2. It is intended for existing apps that are currently using XPF version 1.

## Summary of changes in XPF 2

- Minimum .NET version is .NET 10.0.
- Based on [Avalonia version 12](/docs/avalonia12-breaking-changes).
- Includes a [native Wayland backend](/docs/platform-specific-guides/linux#wayland).
- Supports drag-and-drop on Linux.
- Cross-platform media playback with [`MediaPlayer`](/controls/media/mediaplayer/).
- XAML can be previewed in the Visual Studio WPF designer.

## How to upgrade

To upgrade your app from XPF version 1 to version 2, you must do the following:

1. Update your project to .NET version 10.
1. Update the XPF SDK version.
1. Update your project to Avalonia version 12.
1. Change your license key.
1. Add any missing packages.

### Step 1: Update your project to .NET version 10

If your project uses a .NET version lower than 10, you must update it to at least `net10.0-windows`. You can use the [GitHub Copilot upgrade agent](https://learn.microsoft.com/en-us/dotnet/core/porting/github-copilot-upgrade/dotnet-how-to-upgrade-with-github-copilot) to assist you.

Confirm that your project builds and runs correctly on .NET 10 (or later) with WPF before proceeding.

:::danger
XPF 2.x **does not work** on any project targeting a version of .NET below 10.
:::

### Step 2: Update the XPF SDK version

In the `.csproj` file of the executable WPF project, update the XPF SDK to a 2.x version number.

```xml
<Project Sdk="Xpf.Sdk/2.0.0-beta1">
```

:::note
The CI build version changes frequently. Check the latest CI build version at https://xpf-nuget-feed.avaloniaui.net/packages/xpf.sdk. See [nightly builds](/xpf/version-info/versioning) for more information.
:::

### Step 3: Update your project to Avalonia version 12

If your project uses any Avalonia version 11 code alongside WPF, it should be updated to version 12 to ensure compatibility with XPF version 2.

See [Breaking changes in Avalonia 12](/docs/avalonia12-breaking-changes) for guidance on major changes in this Avalonia version.

### Step 4: Change your license key

XPF version 2 requires a different license key from version 1. Your new license key is available from the [Avalonia portal](https://portal.avaloniaui.net/). Look for **XPF v2 License Key**.

Copy your license key into your executable's `.csproj` file using the `<AvaloniaUILicenseKey>` tag. Remove the old license key along with its `RuntimeHostConfigurationOption` tag, which is no longer recognized in XPF version 2.

```xml
<ItemGroup>
  <!-- Add your new license key -->
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />

  <!-- Remove this line -->
  <RuntimeHostConfigurationOption Include="AvaloniaUI.Xpf.LicenseKey" Value="OLD_LICENSE_KEY" />
</ItemGroup>
```

:::info
This is the same licensing process as used by [Avalonia Pro](/tools/installing-avalonia-pro#add-your-license-key).
:::

### Step 5: Add any missing packages

Some packages are not included in the SDK. If you find that any packages are missing, you must explicitly reference them with a `<PackageReference>` in your `.csproj` file, for example:

```xml
<ItemGroup>
  <PackageReference Include="System.Security.Permissions" Version="10.0.10" />
</ItemGroup>
```

### Step 6: Run the project

Confirm the upgraded project runs using your preferred IDE or `dotnet run`.

## Opt into Wayland

If you wish to use Wayland with your XPF app on Linux, opt in by adding the following to your `.csproj` file.

```xml
<PropertyGroup>
  <XpfEnableWayland>true</XpfEnableWayland>
</PropertyGroup>
```

For more information on Avalonia's native Wayland backend, see [Wayland](/docs/platform-specific-guides/linux#wayland).

## See also

- [Getting started with XPF](/xpf/getting-started): How to configure a WPF project to use XPF.
- [Versioning](/xpf/version-info/versioning): How XPF versioning works.
- [Breaking changes in Avalonia 12](/docs/avalonia12-breaking-changes): Changes to the core Avalonia framework introduced in version 12.
- [Wayland](/docs/platform-specific-guides/linux#wayland): More information on the Avalonia native Wayland backend.
- [`MediaPlayerControl`](/controls/media/mediaplayer/): Control reference page for `MediaPlayerControl`.