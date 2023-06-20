---
id: setting-up-your-developer-environment-for-android
title: How To Set Up an Android Dev Environment
---

# How To Set Up an Android Dev Environment

This guide shows you how to set up your development environment for work on a mobile Android application.&#x20;

Follow these steps to install the tools you will need, using the CLI:

* [ ] Check that you have installed a compatible version of the .NET SDK. The lowest version that works with _Avalonia UI_ is 6.0.2.00.

{% hint style="info" %}
You can see the versions of the .NET SDK [here](https://dotnet.microsoft.com/en-us/download/dotnet).
{% endhint %}

* [ ] You may need to uninstall an old version of the _Android Workload._ To do this, type the following command:

```bash
dotnet workload remove android
```

* [ ] Install the _Android Workload._ To do this, type the following command:

```bash
dotnet workload install android
```

{% hint style="info" %}
You may need to run the above commands with _sudo._
{% endhint %}

## Install the Android SDK

There are several ways to install the Android SDK. Choose the one that matches your development environment.

If you have Visual Studio or Visual Studio for Mac then follow the guide found here:

{% embed url="https://docs.microsoft.com/en-us/xamarin/android/get-started/installation/android-sdk" %}

If you use _JetBrains Rider_ then follow the guide here:

{% embed url="https://www.jetbrains.com/help/rider/Xamarin.html" %}

Alternatively you can install the _Android_ command line tools from here:

{% embed url="https://developer.android.com/studio#command-tools" %}

This toolset has a command line based SDK manager that can be used to install the SDK.

There is also a tool in development called _MAUI Check_ that can install all the required SDKs and tools for you automatically:

```bash
dotnet tool install -g Redth.Net.Maui.Check
maui-check
```

With the above _Android_ development environment setup, you will be able to build _Android_ applications, and run them in a simulator on your platform.
