---
id: setting-up-your-developer-environment-for-android
title: How To Set Up an Android Dev Environment
---

# How To Set Up an Android Dev Environment

This guide shows you how to set up your development environment for work on a mobile Android application.

Follow these steps to install the tools you will need, using the CLI:

-  Check that you have installed a compatible version of the .NET SDK. The lowest version that works with _Avalonia UI_ is 6.0.2.00.

:::info
You can see the versions of the .NET SDK [here](https://dotnet.microsoft.com/en-us/download/dotnet).
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

## Install the Android SDK

There are several ways to install the Android SDK. Choose the one that matches your development environment.

If you have Visual Studio or Visual Studio for Mac then follow the guide found [here](https://docs.microsoft.com/en-us/xamarin/android/get-started/installation/android-sdk).

If you use _JetBrains Rider_ then follow the guide [here](https://www.jetbrains.com/help/rider/Xamarin.html).

Alternatively you can install the _Android_ command line tools from [here](https://developer.android.com/studio#command-tools).

This toolset has a command line based SDK manager that can be used to install the SDK. On successfully installing the Android SDK, add the path to the sdk to your PATH environment variable, directly in bash or in your profile's .bashrc file on Linux.
```
export ANDROID_HOME=/path/to/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```
You can also directly specify the Android SDK location in the `dotnet` commands when you build, run or deploy the dotnet Android project, by setting the `AndroidSdkDirectory` variable in the command:
```
dotnet build ... /p:AndroidSdkDirectory=/path/to/sdk
```
Ensure you've installed the JDK 11 or above using your platform's package manager. This is already done if set up using Visual Studio or JetBrains Rider as stated above.

There is also a tool in development called _MAUI Check_ that can install all the required SDKs and tools for you automatically:

```bash
dotnet tool install -g Redth.Net.Maui.Check
maui-check
```

With the above _Android_ development environment setup, you will be able to build _Android_ applications, and run them in a simulator on your platform.
