---
info: setting-up-your-developer-environment-for-ios
title: Setting up your developer environment for iOS
---

### Prerequisites

On a Mac you will need to have the latest version of macOS and Xcode installed.

### Install the SDK

First it is very important to install the correct [dotnet SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0). At the time of writing, the lowest sdk version that works is 7.0.102.

### Install the Workload

```bash
dotnet workload install ios
```

{% hint style="info" %}
You may need to run the command with `sudo`\
\
You may also need to uninstall old versions. `dotnet workload remove ios`
{% endhint %}

This will allow you to build applications for iOS on any platform. However you will only be able to test and run them if you have access to actual macOS hardware with Xcode installed.
