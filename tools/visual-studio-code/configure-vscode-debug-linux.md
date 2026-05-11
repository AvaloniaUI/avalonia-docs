---
id: configure-vscode-debug-linux
title: Configure Android debugging on Linux
sidebar_label: Android debugging (Linux)
description: Set up Visual Studio Code on Linux to build, deploy, and debug Avalonia Android projects using the Mono debugger.
doc-type: how-to
---

# Configure Android debugging on Linux

This guide walks you through configuring Visual Studio Code on Linux so you can build, deploy, and debug Avalonia-based Android projects. The workflow uses the Mono Debug extension to attach to a running Android app over a local port.

## Prerequisites

Before you begin, make sure you have:

- Visual Studio Code installed on Linux.
- The .NET SDK (6.0 or later) installed and available on your `PATH`.
- An Android emulator running, or a physical Android device connected via USB with developer mode enabled.
- The **Mono Debug** extension installed from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode.mono-debug).

## Configure the launch profile

Open (or create) the `.vscode/launch.json` file in your workspace and add two configurations: one that builds and deploys before attaching, and one that attaches to an already-running app.

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

The `port` value can be any port that is not already in use by another application or the operating system. The example above uses `10000`.

- **Debug - Android** runs a pre-launch task that builds and deploys your app, then attaches the debugger.
- **Attach - Android** skips the build step and connects to an app that is already running on the device or emulator.

## Configure the build task

Open (or create) the `.vscode/tasks.json` file and add a task that builds and deploys your Android project with the Mono debug server enabled.

```json
{
  "version": "2.0.0",
  "tasks": [
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
        "-p:AndroidSdbHostPort=10000",
        "-p:AndroidSdbTargetPort=10000"
      ],
      "problemMatcher": "$msCompile"
    }
  ]
}
```

Replace `<ProjectName>` with the name of your Android-specific Avalonia project.

:::info
The `port` value in `launch.json` must match the `AndroidSdbHostPort` and `AndroidSdbTargetPort` values in `tasks.json`. If these values differ, the debugger will not be able to connect.
:::

## Start debugging

1. Open the **Run and Debug** panel in Visual Studio Code (Ctrl+Shift+D).
2. Select **Debug - Android** from the configuration dropdown.
3. Press **F5** or click the green play button.

The .NET runtime builds and deploys your app to the connected device or emulator. Once the app launches, the Mono debugger attaches to the configured port and you can set breakpoints, inspect variables, and step through your code as usual.

If your app is already running on the device, select **Attach - Android** instead to skip the build step and connect directly.

## See also

- [IDE support](/tools/ide/)
- [Avalonia tools overview](/tools/)
- [Visual Studio extension](/tools/visual-studio-extension)
