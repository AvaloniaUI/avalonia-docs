---
id: setup
title: Setting up AvaloniaUI Parcel
sidebar_label: Setup
sidebar_position: 1
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

AvaloniaUI Parcel is a packaging tool for Avalonia UI applications. It's designed as a two-app solution (GUI and console tool) that handles building, signing and packaging applications across Windows, macOS, and Linux platforms.

## Prerequisites

| Requirement | Version/Details |
|------------|-----------------|
| .NET Runtime | 6.0 or newer |
| Windows | 10 or newer |
| macOS | 13 or newer |
| Linux | X11 and glibc 2.27 or musl 1.22.2 compatible distros |

## Step 1: Installing AvaloniaUI Parcel

`AvaloniaUI Parcel` is a native [.NET tool](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools), with an update mechanism provided by the SDK.
This guide demonstrates global installation of the tool. Local installation is also possible but be aware: the tool will only work in the project that it's installed into.

<Tabs>
<TabItem value="net10" label=".NET 10+" default>

```bash
dotnet tool install --global AvaloniaUI.Parcel
```

If you are upgrading app from .NET 8/9 installation, you should first uninstall it with `dotnet tool uninstall --global AvaloniaUI.Parcel.Windows`  or `parcel uninstall`.

Parcel can then be updated by running the `dotnet tool update` command.

<details>
<summary>Parcel update command</summary>

```bash
dotnet tool update --global AvaloniaUI.Parcel
```

</details>


</TabItem>
<TabItem value="net8" label=".NET 8/9">

I've you're using .NET SDK older than 10, you must install a specific package depending on the running platform.

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

Parcel can then be updated by running the `dotnet tool update` command.

<details>
<summary>Parcel update commands</summary>

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
- [Model Context Protocol](/tools/parcel/mcp)
- [Windows packaging](/docs/deployment/parcel/windows)
- [macOS packaging](/docs/deployment/parcel/macos)
- [Linux packaging](/docs/deployment/parcel/linux)
