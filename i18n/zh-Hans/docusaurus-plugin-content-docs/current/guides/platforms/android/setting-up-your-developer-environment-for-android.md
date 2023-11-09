---
id: setting-up-your-developer-environment-for-android
title: 如何搭建Android开发环境
---

# 如何搭建Android开发环境

本指南将向您展示如何在移动Android应用程序开发中搭建开发环境。

按照以下步骤使用命令行界面（CLI）来安装所需的工具：

- 检查是否已安装兼容的.NET SDK版本。与 _Avalonia UI_ 兼容的最低版本为6.0.2.00。

:::info
您可以在[此处](https://dotnet.microsoft.com/en-us/download/dotnet)查看.NET SDK的版本信息。
:::

- 您可能需要卸载旧版本的 _Android Workload_。要执行此操作，请键入以下命令：

```bash
dotnet workload uninstall android
```

- 安装 _Android Workload_。要执行此操作，请键入以下命令：

```bash
dotnet workload install android
```

:::info
您可能需要以超级用户（sudo）权限运行上述命令。
:::

## 安装Android SDK

有几种安装Android SDK的方法。选择与您的开发环境相匹配的方法。

如果您使用Visual Studio或Visual Studio for Mac，请参考的[此处](https://docs.microsoft.com/en-us/xamarin/android/get-started/installation/android-sdk)指南。

如果您使用 _JetBrains Rider_，请参考[此处](https://www.jetbrains.com/help/rider/Xamarin.html)的指南。

或者，您可以从[此处](https://developer.android.com/studio#command-tools)安装 _Android_ 命令行工具。

该工具集有一个基于命令行的SDK管理器，可用于安装SDK。在成功安装Android SDK后，将SDK的路径添加到您的PATH环境变量中，可以直接在bash中进行，或者在Linux上在您的配置文件 .bashrc 中进行设置。
```
export ANDROID_HOME=/path/to/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```
您还可以在构建、运行或部署dotnet Android项目时，通过在命令中设置 `AndroidSdkDirectory` 变量，直接指定Android SDK的位置：
```
dotnet build ... /p:AndroidSdkDirectory=/path/to/sdk
```
确保您已使用您所在平台的软件包管理器安装了JDK 11或更高版本。如果使用Visual Studio或JetBrains Rider进行设置，已经完成了此步骤。

还有一款名为 _MAUI Check_ 的开发工具可以自动为您安装所有所需的SDK和工具：

```bash
dotnet tool install -g Redth.Net.Maui.Check
maui-check
```

通过以上配置 _Android_ 开发环境，您将能够构建 _Android_ 应用程序，并在模拟器上运行它们。
