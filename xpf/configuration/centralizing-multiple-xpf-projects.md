---
id: centralizing-multiple-xpf-projects
title: Centralizing multiple XPF projects
description: Learn how to centralize XPF SDK version management and license key configuration across multiple projects in a single repository.
doc-type: how-to
---

When you manage multiple XPF projects in a single repository, keeping SDK versions and license keys synchronized across every `.csproj` file can become tedious and error-prone. By centralizing these settings, you ensure consistency and simplify future upgrades.

## Centralize the XPF SDK version

You can use a `global.json` file at the root of your repository to pin the XPF SDK version for every project at once. When a `global.json` entry exists for `Xpf.Sdk`, MSBuild resolves that version automatically, so you only need to update the version number in one place.

Create (or update) a `global.json` file in your repository root:

```json title="global.json"
{
  "msbuild-sdks": {
    "Xpf.Sdk": "1.6.7"
  }
}
```

Then, in each `.csproj` file, reference `Xpf.Sdk` **without** a version number:

```xml title="YourProject.csproj"
<Project Sdk="Xpf.Sdk">
```

When you need to upgrade, change the version in `global.json` and every project in the repository picks up the new version on the next build.

## License keys

Storing license keys directly in source-controlled files is a security risk. Instead, you can reference an environment variable in both your `NuGet.config` and `.csproj` files so the actual key value never appears in your repository.

:::tip
You can name the environment variable anything you like. The examples below use `XpfLicenseKey`.
:::

### Set the environment variable

Add an environment variable whose value is your license key:

- **Windows:** Search the **Start** menu for "Environment Variables". Add the variable through the system GUI.
- **macOS:** Run `launchctl setenv XpfLicenseKey [LICENSE_KEY]` in the terminal. You will need to rerun this command after each reboot.
- **Linux:** Set the environment variable in `.bash_profile`, `.bashrc`, or `/etc/environment`.

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

Reference the environment variable in the license key entry of your `.csproj` file. The licensing system differs between XPF versions 1 and 2.

<Tabs>

<TabItem value="xpf2" label="XPF 2.x">

You can get your license key from the [Avalonia portal](https://portal.avaloniaui.net/).

```xml title="YourProject.csproj"
<ItemGroup>
  <AvaloniaUILicenseKey Include="$(XpfLicenseKey)" />
</ItemGroup>
```
</TabItem>

<TabItem value="xpf1" label="XPF 1.x">

```xml title="YourProject.csproj"
<ItemGroup>
  <RuntimeHostConfigurationOption Include="AvaloniaUI.Xpf.LicenseKey"
                                  Value="$(XpfLicenseKey)" />
</ItemGroup>
```

</TabItem>

</Tabs>

## See also

- [Getting started with XPF](/xpf/getting-started)
- [Customizing initialization](/xpf/configuration/customizing-initialization)
- [Performance configuration](/xpf/configuration/performance)
- [Versioning](/xpf/version-info/versioning)