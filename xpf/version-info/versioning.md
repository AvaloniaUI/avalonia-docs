---
id: versioning
title: XPF versioning
description: Learn how to select and configure XPF package versions, including stable releases and nightly builds.
doc-type: how-to
---

## Choosing a version

For production releases, you should use the latest stable version. You can find details about each stable release in the [release notes](/xpf/version-info/release-notes). For day-to-day development, you may prefer to update to the latest [nightly build](#configuring-feeds-for-nightly-builds) to access new features and bug fixes sooner.

You can browse all available versions on the [XPF NuGet server](https://xpf-nuget-feed.avaloniaui.net/packages/xpf.sdk).

## Accessing the NuGet feed

The XPF NuGet feed requires authentication. To log into the web portal or configure your NuGet client, use the following credentials:

- **Username:** license
- **Password:** (your XPF license key)

When you add the feed to your `NuGet.config` file, supply these same credentials so that `dotnet restore` and Visual Studio can pull packages automatically.

## Configuring feeds for nightly builds

To use nightly builds of XPF, add the package source `https://xpf-nightly-nuget-feed.avaloniaui.net/v3/index.json` to your `nuget.config` file. (See [Add a `nuget.config`](/xpf/getting-started#step-2-add-a-nugetconfig) for the full setup.)

XPF nightly builds may depend on pre-release versions of Avalonia. To make sure all dependencies resolve correctly, you should also add the Avalonia nightly package source, `https://nuget-feed-nightly.avaloniaui.net/v3/index.json`.

You must also add an `<xpf-nightly>` entry under `packageSourceCredentials` in the same file, using "license" as the username and your XPF license key as the password.

```xml title="nuget.config"
<packageSources>
  <!-- XPF nightly feed -->
  <add key="xpf-nightly" value="https://xpf-nightly-nuget-feed.avaloniaui.net/v3/index.json" />

  <!-- Avalonia nightly feed to ensure dependencies resolve -->
  <add key="avalonia-nightly" value="https://nuget-feed-nightly.avaloniaui.net/v3/index.json" />
</packageSources>

<packageSourceCredentials>
  <!-- Add credentials for xpf-nightly. Credentials stored for xpf are not applied automatically. -->
  <xpf-nightly>
    <add key="Username" value="license" />
    <add key="ClearTextPassword" value="YOUR_LICENSE_KEY" />
  </xpf-nightly>
</packageSourceCredentials>
```

## Pinning a specific version

To lock your project to a particular XPF version, set the `XpfVersion` property in your project file or a `Directory.Build.props`:

```xml
<PropertyGroup>
  <XpfVersion>1.6.0</XpfVersion>
</PropertyGroup>
```

Pinning a version prevents unexpected upgrades and ensures that every developer on your team builds against the same packages.

## See also

- [Release notes](/xpf/version-info/release-notes)
- [Missing features](/xpf/version-info/missing-features)
- [Getting started](/xpf/getting-started)
