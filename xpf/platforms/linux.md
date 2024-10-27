---
id: linux
title: Linux
---

## Installing .NET

Many distributions provide a version of .NET in their package repositories, but these **should not** be used as they do not ship the required `Microsoft.NET.Sdk.WindowsDesktop` SDK.

The .NET documentation provides a guide to install the Microsoft packages for Ubuntu: 

[Register the Microsoft package repository](https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu#register-the-microsoft-package-repository)

For other distributions, refer to your operating system documentation on how to add the [Microsoft package feed](https://packages.microsoft.com/).

:::danger
If you have installed .NET from your distribution's package repository, you must uninstall, clean and reinstall. See ["I need a version of .NET that isn't provided by my Linux distribution"](https://learn.microsoft.com/en-us/dotnet/core/install/linux-package-mixup?pivots=os-linux-ubuntu#i-need-a-version-of-net-that-isnt-provided-by-my-linux-distribution) in the Microsoft documentation for details of how to do this.
:::

## Other Dependencies

The following dependencies are required to run XPF: `libice6 libsm6 libfontconfig1 libgdiplus`

On a [Debian-based distibution](https://en.wikipedia.org/wiki/Category:Debian-based_distributions) run the following command to install these dependencies:

```bash
sudo apt install libice6 libsm6 libfontconfig1 libgdiplus
```

For other distributions, use the distribution's package manager to install the required dependencies.
