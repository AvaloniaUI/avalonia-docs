---
id: create-a-cross-platform-solution
title: How To Develop Cross-platform Solutions
---


# 👉 How To Develop Cross-platform Solutions

This guide shows you how to create a single solution compatible with Desktop, Mobile and Web.

Make sure you use latest .NET SDK. iOS especially requires developers to use 6.0.202 SDK or above.

Install the _Avalonia UI_ .NET templates. Version `0.10.13` and above adds support for mobile.

```bash
dotnet new install avalonia.templates
```

Once the templates are installed you can generate a new project.

Create a folder name that matches the name of your project. Then enter that folder. For example:

```bash
mkdir AvaloniaCrossPlatform
cd AvaloniaCrossPlatform
```

Now create a cross platform solution using the template:

```bash
dotnet new avalonia.xplat
```

Alternatively, use you IDE to create the solution.

This will create a project with the following structure:

* AvaloniaCrossPlatform (The _Avalonia UI_ project with Views and ViewModels).
* AvaloniaCrossPlatform.Android (_Avalonia UI_ bootstrap code for Android).
* AvaloniaCrossPlatform.Desktop (_Avalonia UI_ bootstrap code for Desktop - Windows, macOS and Linux).
* AvaloniaCrossPlatform.iOS (_Avalonia UI_ bootstrap code for iOS).
* AvaloniaCrossPlatform.Web (_Avalonia UI_ bootstrap code for Web).
* nuget.config (gives access to nightly builds of _Avalonia UI_).
* global.json (forces use of latest sdk).
* Directory.Build.props (sets the _Avalonia UI_ version your application will target).
* AvaloniaCrossPlatform.sln (the solution file if you used an IDE - see illustration below).

<!--<!--<figure><img src="/img/gitbook-import/assets/image (7).png" alt=""><figcaption></figcaption></figure>-->-->

:::info
To see how to set up the your development environment for iOS, see [here](ios/setting-up-your-developer-environment-for-ios.md).
:::

:::info
To see how to set up the your development environment for Android, see here.
:::
