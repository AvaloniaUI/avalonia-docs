---
id: build-feeds
title: XPF Versioning
---

The latest stable version of Avalonia XPF is 1.5.3.

For product releases it is recommended that you use the latest stable version, but for general development you may want to update to the latest development version frequently.

The latest version can be found on our [nuget server](https://xpf-nuget-feed.avaloniaui.net/packages/xpf.sdk).

To log into the web portal, use the following credentials:

- Username: `license`
- Password: `<YOUR_LICENSE_KEY>`

Nightly builds of XPF may depend on pre-release versions of Avalonia, so ensure that you have the following [feeds configured](getting-started#step-2-add-a-nugetconfig) in your `NuGet.config` file:

```xml
    <add key="api.nuget.org" value="https://api.nuget.org/v3/index.json" />
    <add key="xpf" value="https://xpf-nuget-feed.avaloniaui.net/v3/index.json" />
    <add key="avalonia-nightly" value="https://nuget-feed-all.avaloniaui.net/v3/index.json" />
```
