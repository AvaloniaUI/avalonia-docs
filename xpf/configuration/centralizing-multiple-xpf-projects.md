---
id: centralizing-multiple-xpf-projects
title: Centralizing multiple XPF projects
description: Learn how to centralize XPF SDK version management and license key configuration across multiple projects in a single repository.
doc-type: guide
---

When you manage multiple XPF projects in a single repository, keeping SDK versions and license keys synchronized across every `.csproj` file can become tedious and error-prone. By centralizing these settings, you ensure consistency and simplify future upgrades.

## Centralize the XPF SDK version

You can use a `global.json` file at the root of your repository to pin the XPF SDK version for every project at once. When a `global.json` entry exists for `Xpf.Sdk`, MSBuild resolves that version automatically, so you only need to update the version number in one place.

Create (or update) a `global.json` file in your repository root:

```json title="global.json"
{
  "msbuild-sdks": {
    "Xpf.Sdk": "1.6.0"
  }
}
```

Then, in each `.csproj` file, reference `Xpf.Sdk` **without** a version number:

```xml title="MyApp.csproj"
<Project Sdk="Xpf.Sdk">
```

When you need to upgrade, change the version in `global.json` and every project in the repository picks up the new version on the next build.

## License keys

Storing license keys directly in source-controlled files is a security risk. Instead, you can reference an environment variable in both your `NuGet.config` and `.csproj` files so the actual key value never appears in your repository.

:::tip
You can name the environment variable anything you like. The examples below use `XpfLicenseKey`.
:::

### Set the environment variable

Add an environment variable called `XpfLicenseKey` whose value is your license key:

- **Windows**: search the Start menu for "Environment Variables" and add the variable through the system GUI.
- **macOS**: run `launchctl setenv XpfLicenseKey [LICENSE_KEY]`. You will need to re-run this command after each reboot.
- **Linux**: environment variables are commonly set in `.bash_profile`, `.bashrc`, or `/etc/environment`.

After you create or change the variable, restart any open terminal sessions and IDEs so they pick up the new value.

### Update `nuget.config`

Edit the credentials section of your `nuget.config` file to reference the environment variable:

```xml title="nuget.config"
<packageSourceCredentials>
  <xpf>
    <add key="Username" value="license" />
    <add key="ClearTextPassword" value="%XpfLicenseKey%" />
  </xpf>
</packageSourceCredentials>
```

### Update `.csproj` files

Edit the `RuntimeHostConfigurationOption` entry in each `.csproj` file to read the key from the environment variable:

```xml title="MyApp.csproj"
<ItemGroup>
  <RuntimeHostConfigurationOption Include="AvaloniaUI.Xpf.LicenseKey"
                                  Value="$(XpfLicenseKey)" />
</ItemGroup>
```

## See also

- [Getting started with XPF](../getting-started.md)
- [Customizing initialization](customizing-initialization.md)
- [Performance configuration](performance.md)
- [Versioning](../version-info/versioning.md)