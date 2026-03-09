---
id: android
title: Developing with Avalonia for Android
description: Setting up the Android development environment for building Avalonia applications, including SDK and workload installation.
doc-type: guide
---

## Setting up your developer environment

Follow these steps to install the tools you will need, using the CLI:

-  Check that you have installed a compatible version of the .NET SDK. The lowest version that works with Avalonia is 6.0.2.00.

:::info
You can see the [available .NET SDK versions](https://dotnet.microsoft.com/en-us/download/dotnet).
:::

-  You may need to uninstall an old version of the _Android Workload._ To do this, type the following command:

```bash
dotnet workload uninstall android
```

-  Install the _Android Workload._ To do this, type the following command:

```bash
dotnet workload install android
```

:::info
You may need to run the above commands with _sudo._
:::

:::caution[Linux users: use the official Microsoft .NET SDK]
The `dotnet workload` command requires the official Microsoft .NET SDK. .NET packages from Linux distribution repositories (such as Arch Linux AUR, Ubuntu `dotnet-sdk` apt packages, or Fedora `dotnet` dnf packages) may not include workload support. If `dotnet workload install android` fails with error `NETSDK1139`, install the SDK from [Microsoft's .NET download page](https://dotnet.microsoft.com/download) or use the [install script](https://learn.microsoft.com/dotnet/core/tools/dotnet-install-script):

```bash
curl -sSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin --channel 10.0
```
:::

### Install the Android SDK

There are several ways to install the Android SDK. Choose the one that matches your development environment.

If you have Visual Studio or Visual Studio for Mac then follow the [Android SDK installation guide](https://docs.microsoft.com/en-us/xamarin/android/get-started/installation/android-sdk).

If you use _JetBrains Rider_ then follow the [Rider Xamarin setup guide](https://www.jetbrains.com/help/rider/Xamarin.html).

Alternatively you can install the [Android command line tools](https://developer.android.com/studio#command-tools).

This toolset has a command line based SDK manager that can be used to install the SDK. On successfully installing the Android SDK, add the path to the sdk to your PATH environment variable, directly in bash or in your profile's .bashrc file on Linux.

```bash
export ANDROID_HOME=/path/to/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

You can also directly specify the Android SDK location in the `dotnet` commands when you build, run or deploy the dotnet Android project, by setting the `AndroidSdkDirectory` variable in the command:

```bash
dotnet build ... /p:AndroidSdkDirectory=/path/to/sdk
```

Ensure you've installed the JDK 11 or above using your platform's package manager. This is already done if set up using Visual Studio or JetBrains Rider as stated above.

There is also a tool in development called _MAUI Check_ that can install all the required SDKs and tools for you automatically:

```bash
dotnet tool install -g Redth.Net.Maui.Check
maui-check
```

With the above _Android_ development environment setup, you will be able to build _Android_ applications, and run them in a simulator on your platform.

## See also

- [Deploying on Android](/docs/deployment/android) (emulator, device, and publishing)
- [Configure Android debugging in Visual Studio Code on Linux](/tools/visual-studio-code/configure-vscode-debug-linux)
