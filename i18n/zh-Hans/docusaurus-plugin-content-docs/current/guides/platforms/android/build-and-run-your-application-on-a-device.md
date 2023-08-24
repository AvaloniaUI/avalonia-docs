---
id: build-and-run-your-application-on-a-device
title: 在物理设备上构建和运行您的应用程序
---

# 在物理设备上构建和运行您的应用程序

要在真实的Android设备上部署和运行应用程序，请确保完成以下步骤：

1. 确保设备上的Android版本与AndroidManifest.xml中支持的或目标版本相匹配（如果未指定版本，则假定目标版本为最新版本，支持Xamarin/MAUI）。
2. 将设备连接到开发计算机，并在开发者设置中启用USB调试。
3. 如果默认连接模式为“仅充电”，请切换到MTP或其他模式（否则ADB将无法连接到设备）。
4. 在AndroidManifest.xml中，安装与目标SDK版本相匹配的Android SDK。

通过运行`dotnet run`命令（如果使用控制台），或者通过以下设置（如果使用Visual Studio Code），来完成部署：

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

其中`<ProjectName>`是您的Android特定的Avalonia项目名称。
