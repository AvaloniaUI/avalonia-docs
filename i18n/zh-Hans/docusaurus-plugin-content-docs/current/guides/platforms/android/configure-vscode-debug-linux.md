---
id: configure-vscode-debug-linux
title: 在Visual Studio Code中配置调试（Linux）
---

# 在Visual Studio Code中配置调试（Linux）

要在Linux上调试基于Avalonia的Android项目（使用Visual Studio Code），请按照以下步骤进行：

1. 确保从[这里](https://marketplace.visualstudio.com/items?itemName=ms-vscode.mono-debug)安装了 `Mono Debug` 扩展。

2. 配置您的`launch.json`文件，包含以下条目（分别用于部署+调试和附加）：

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Debug - Android",
			"type": "mono",
			"preLaunchTask": "run-debug-android",
			"request": "attach",
      			"address": "localhost",
      			"port": 10000
		},
		{
			"name": "Attach - Android",
			"type": "mono",
			"request": "attach",
			"address": "localhost",
			"port": 10000
		}
	]
}
```

其中，`port`的值可以是任意的（请确保其他应用程序或操作系统没有使用相同的端口）。

1. 在`tasks.json`中添加一个新条目，用于将应用部署到启用了Mono调试服务器的Android设备或模拟器：

```json
{
	"version": "2.0.0",
	"tasks": [
		/* ... */
		{
			"label": "run-debug-android",
			"command": "dotnet",
			"type": "shell",
			"args": [
				"build",
				"--no-restore",
				"-t:Run",
				"${workspaceFolder}/<ProjectName>.Android.csproj",
				"-p:TargetFramework=net6.0-android",
				"-p:Configuration=Debug",
				"-p:AndroidAttachDebugger=true",
				"-p:AndroidSdbHostPort=10000"
			],
			"problemMatcher": "$msCompile"
		}
	]
}
```

其中，`<ProjectName>`是您的Android特定Avalonia项目名称。

:::info
请确保`launch.json`中`port`变量的值与`tasks.json`中`AndroidSdbHostPort`的值相匹配，否则调试器将无法连接。
:::

设置完成后，您可以通过调试面板运行`Debug - Android`任务。 Dotnet运行时将构建和部署应用程序，而Mono调试器将连接到设备上的开放端口，并提供所有标准的调试功能。
