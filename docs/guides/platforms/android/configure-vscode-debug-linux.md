---
id: configure-vscode-debug-linux
title: Configure debugging in Visual Studio Code (Linux)
---

# Configure debugging in Visual Studio Code (Linux)

For debugging Avalonia-based Android projects on Linux (using Visual Studio Code), follow the steps:

1. Make sure to install the "Mono Debug" extension from [here](https://marketplace.visualstudio.com/items?itemName=ms-vscode.mono-debug).

2. Configure your `launch.json` file to include the following entries (for deploy + debug, and attach respectively):

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

where `port` value can be arbitrary (make sure it's not used already by other applications or OS).

1. Add a new entry to `tasks.json` for deploying to Android (device or emulator) with enabled Mono debug server:

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

where `<ProjectName>` is your Android-specific Avalonia project name.

:::info
Make sure that the value of `port` variable in `launch.json` matches the one of `AndroidSdbHostPort` in `tasks.json`, otherwise the debugger won't be able to connect.
:::

After the setup, you can run the `Debug - Android` task via the Debug panel. Dotnet runtime will build and deploy the app, and Mono debugger will connect to the open port on the device, with all standard debugging functionality available.
