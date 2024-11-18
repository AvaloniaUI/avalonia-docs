---
id: build-and-run-your-application-on-a-device
title: Build and run your Application on a physical device
---

# Build and run your Application on a physical device

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
