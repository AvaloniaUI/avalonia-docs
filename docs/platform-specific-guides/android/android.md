---
id: android
title: Developing with Avalonia for Android
---

## Setting up your developer environment

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

### Install the Android SDK

There are several ways to install the Android SDK. Choose the one that matches your development environment.

If you have Visual Studio or Visual Studio for Mac then follow the guide found [here](https://docs.microsoft.com/en-us/xamarin/android/get-started/installation/android-sdk).

If you use _JetBrains Rider_ then follow the guide [here](https://www.jetbrains.com/help/rider/Xamarin.html).

Alternatively you can install the _Android_ command line tools from [here](https://developer.android.com/studio#command-tools).

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

## Running your app on an Android device

To deploy and run the Application on a real Android device, make sure of the following:

1. Have the Android version on the device match the supported or target versions in AndroidManifest.xml (if no versions are specified, assume that target version is latest, supported by Xamarin/MAUI),
2. Connect the device to development machine and enable USB Debugging in developer settings,
3. If default connection mode is "battery charging only", switch to MTP or another mode (otherwise ADB won't connect to the device),
4. Have matching Android SDK installed to the target SDK version in AndroidManifest.xml,

Deployment is done via running the `dotnet run` command (if using console), or via the following setup (if using Visual Studio Code):

tasks.json:

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"label": "build-android",
			"command": "dotnet",
			"type": "process",
			"args": [
				"build",
				"--no-restore",
				"${workspaceFolder}/<ProjectName>.csproj",
				"-p:TargetFramework=net6.0-android",
				"-p:Configuration=Debug"
			],
			"problemMatcher": "$msCompile"
		}
	]
}
```

where `<ProjectName>` is your Android-specific Avalonia project name.

## Running your app on an Android simulator

Assuming you have created a project called `HelloWorld`. Enter the directory `HelloWorld.Android` from the command line.

To build the project for Android run the following command.

```bash
dotnet build
```

To run the project in a simulator, run the following command.

```bash
dotnet run
```
