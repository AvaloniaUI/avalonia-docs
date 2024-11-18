---
id: centralized-management
title: Centralized Management
---

If you're managing multiple XPF projects then it can be useful to centralize the management of your SDK versions and license keys.

## Centralize XPF SDK Version

You can use a [`global.json`](https://learn.microsoft.com/en-us/dotnet/core/tools/global-json) file to specify the XPF SDK version to use:

```json title=global.json
{
  "msbuild-sdks": {
    "Xpf.Sdk": "1.1.0"
  }
}
```

And in your `.csproj` simply specify `Xpf.Sdk` without a version:

```xml
<Project Sdk="Xpf.Sdk">
```

## License Keys

Environment variables can be used in [`nuget.config`](https://learn.microsoft.com/en-us/nuget/consume-packages/consuming-packages-authenticated-feeds#credentials-in-nugetconfig-files) file and in `.csproj` files to store license keys. This can be useful to avoid committing license keys to source control.

:::tip
This environment variable can be named however you want, but this documentation will assume `XpfLicenseKey`.
:::

- To get started, add an environment variable named `XpfLicenseKey` with your license key as the value:
  - On Windows, search the start menu for "Environment Variables" and add the variable using the GUI
  - On macOS run `launchctl setenv XpfLicenseKey [LICENSE_KEY]`. Note that this will need to be re-run after each reboot.
  - On Linux, environment variables are commonly set in the `.bash_profile`, `.bashrc` or `/etc/environment` files
- Once you've edited your `nuget.config`/`.csproj` files, restart any command-line session/IDE that is currently open in order for the change to the environment variables to be picked up

### nuget.config

Edit the credentials in your `nuget.config` file to use the environment variable:

```xml
<packageSourceCredentials>
  <xpf>
    <add key="Username" value="license" />
    <add key="ClearTextPassword" value="%XpfLicenseKey%" />
  </xpf>
</packageSourceCredentials>
```

### .csproj Files

Edit the `RuntimeHostConfigurationOption` entry in your `.csproj` files to use the environment variable

```xml
<ItemGroup>
  <RuntimeHostConfigurationOption Include="AvaloniaUI.Xpf.LicenseKey" Value="$(XpfLicenseKey)" />
</ItemGroup>  
```