---
id: setup
title: Setting up Avalonia Parcel
description: Install, configure, and activate Avalonia Parcel, the packaging tool for building, signing, and packaging Avalonia applications on Windows, macOS, and Linux.
sidebar_label: Setup
sidebar_position: 1
doc-type: tutorial
tags:
  - avalonia plus
  - avalonia pro
  - avalonia enterprise
---

Avalonia Parcel is a packaging tool for Avalonia applications. It's designed as a two-app solution (GUI and console tool) that handles building, signing and packaging applications across Windows, macOS, and Linux platforms.

## Prerequisites

| Requirement | Version/Details |
|------------|-----------------|
| .NET Runtime | 6.0 or newer |
| Windows | 10 or newer |
| macOS | 13 or newer |
| Linux | X11 and glibc 2.27 or musl 1.22.2 compatible distros |

## Step 1: Installing Avalonia Parcel

`Avalonia Parcel` is a native [.NET tool](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools), with an update mechanism provided by the SDK.
This guide demonstrates global installation of the tool. Local installation is also possible but be aware: the tool will only work in the project that it's installed into.

<Tabs>
<TabItem value="net10" label=".NET 10+" default>

```bash
dotnet tool install --global AvaloniaUI.Parcel
```

If you are upgrading app from .NET 8/9 installation, you should first uninstall it with `dotnet tool uninstall --global AvaloniaUI.Parcel.Windows`  or `parcel uninstall`.

Parcel can then be updated by running the `dotnet tool update` command.

```bash
dotnet tool update --global AvaloniaUI.Parcel
```

</TabItem>
<TabItem value="net8" label=".NET 8/9">

If you're using .NET SDK older than 10, you must install a specific package depending on the running platform.

<details>
<summary>Installation commands</summary>

**Windows:**

```bash
dotnet tool install --global AvaloniaUI.Parcel.Windows
```

**macOS:**

```bash
dotnet tool install --global AvaloniaUI.Parcel.macOS
```

**Linux:**

```bash
dotnet tool install --global AvaloniaUI.Parcel.Linux
```

</details>

Parcel can then be updated by running the `dotnet tool update` command.

<details>
<summary>Update commands</summary>

**Windows:**

```bash
dotnet tool update --global AvaloniaUI.Parcel.Windows
```

**macOS:**

```bash
dotnet tool update --global AvaloniaUI.Parcel.macOS
```

**Linux:**

```bash
dotnet tool update --global AvaloniaUI.Parcel.Linux
```

</details>

</TabItem>
</Tabs>

:::warning
On macOS or Linux, the installation location may not be automatically added to the PATH environment variable. This surfaces as a "command not found" error when trying to run `parcel`.

To resolve this issue, you must append the tool location to the PATH environment variable. The default location is usually `$HOME/.dotnet/tools`.

For more information, see [Troubleshooting .NET tool usage issues](https://learn.microsoft.com/en-us/dotnet/core/tools/troubleshoot-usage-issues#executable-file-not-found).
:::

## Step 2: Run the tool

After installation, you can launch it from terminal using:

```bash
parcel
```

This command will run a GUI application where you can open or create parcel projects.

Alternatively, it's possible to run CLI commands from the terminal on an existing parcel project:

```bash
parcel pack ./SampleApp.parcel -r osx-x64 -p dmg -o ./artifacts
```

This command will bundle, sign and package the application into a dmg file from the pre-configured parcel project.

:::note
CLI is not available in the free community license.
:::

## Step 3: Activate the tool

Once the Parcel has opened, you will be asked to input `AvaloniaUI Portal` credentials that were used to license the tool.

For the CLI, you can set `--licenseKey` option or `PARCEL_LICENSE_KEY` env variable.

## Further Reading

- [Parcel command line reference](/tools/parcel/command-line-reference)
- [Model context protocol (MCP)](/tools/parcel/mcp)
- [Windows packaging](/tools/parcel/packaging-for-windows)
- [macOS packaging](/tools/parcel/packaging-for-macos)
- [Linux packaging](/tools/parcel/packaging-for-linux)
