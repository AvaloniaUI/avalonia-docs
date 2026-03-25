---
id: versioning
title: XPF versioning
description: Learn how to select and configure XPF package versions, including stable releases and nightly builds.
doc-type: guide
---

## Choosing a version

For production releases, you should use the latest stable version. You can find details about each stable release in the [release notes](/xpf/version-info/release-notes). For day-to-day development, you may prefer to update to the latest nightly build to access new features and bug fixes sooner.

You can browse all available versions on the [XPF NuGet server](https://xpf-nuget-feed.avaloniaui.net/packages/xpf.sdk).

## Accessing the NuGet feed

The XPF NuGet feed requires authentication. To log into the web portal or configure your NuGet client, use the following credentials:

- **Username:** `license`
- **Password:** your XPF license key

When you add the feed to your `NuGet.config` file, supply these same credentials so that `dotnet restore` and Visual Studio can pull packages automatically.

## Configuring feeds for nightly builds

Nightly builds of XPF may depend on pre-release versions of Avalonia. To make sure all dependencies resolve correctly, add the following package sources to your `NuGet.config` file (see [getting started, step 2](/xpf/getting-started#step-2-add-a-nugetconfig) for the full setup):

```xml
<add key="api.nuget.org" value="https://api.nuget.org/v3/index.json" />
<add key="xpf" value="https://xpf-nuget-feed.avaloniaui.net/v3/index.json" />
<add key="avalonia-nightly" value="https://nuget-feed-all.avaloniaui.net/v3/index.json" />
```

The `avalonia-nightly` feed is only required when you are consuming nightly XPF builds. If you are using a stable XPF release, you can omit it.

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
