---
info: setting-up-your-developer-environment-for-android
title: Setting up your developer environment for Android
---

### Install the dotnet SDK

First it is very important to install the correct [dotnet SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0). At the time of writing, the lowest sdk version that works is 6.0.200.

### Install the Workload

```bash
dotnet workload install android
```

:::info
You may need to run the command with `sudo`

You may also need to uninstall old versions. `dotnet workload remove android`
:::

### Install the Android SDK

There are a few ways to install the Android SDK.

If you have Visual Studio or Visual Studio for Mac you should follow the guide found here:

[Setting up Android SDK for Xamarin](https://docs.microsoft.com/en-us/xamarin/android/get-started/installation/android-sdk)

If you use Rider then please follow the guide here:

[Xamarin | JetBrains Rider](https://www.jetbrains.com/help/rider/Xamarin.html)

Alternatively you can install the Android command line tools from here:&#x20;

[Download Android Studio & SDK](https://developer.android.com/studio#command-tools)

This has a command line based SDK manager that can be used to install the SDK.

There is also a tool in development called maui check that can do all of this for you automatically:

```bash
dotnet tool install -g Redth.Net.Maui.Check
maui-check
```

This should install all the required SDKs and tools.



This will allow you to build applications for Android and run them in the simulator on any platform.