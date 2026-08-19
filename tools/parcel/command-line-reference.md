---
id: command-line-reference
title: Parcel command line reference
sidebar_label: Command line reference
doc-type: reference
---

Use the Parcel command-line tool to package Avalonia applications for Windows, macOS, and Linux. Parcel can also sign applications and packages.

## Prerequisites

Before you use Parcel, make sure that you have these items:

1. **Parcel .NET tool** - Follow the [setup guide](/tools/parcel/setup) to install it.
2. **Valid license key** - Set the `AVALONIA_TOOLS_LICENSE_KEY` environment variable or use the `--license-key` option. Get a license key from the [Avalonia Portal](https://portal.avaloniaui.net/).

:::note
Parcel CLI is only available with an [Avalonia Plus](https://avaloniaui.net/pricing) license.
:::

## Overview

```bash
parcel [command] [options]
```

## Global Options

| Option | Description |
|--------|-------------|
| `-?, -h, --help` | Show help and usage information |
| `--version` | Show version information |
| `--license-key` | Set the Parcel license key. If you omit this option, Parcel uses `AVALONIA_TOOLS_LICENSE_KEY` and then an existing application session |
| `--verbosity` | Set the verbosity level (quiet, minimal, normal, detailed, diagnostic) |

## Commands

### pack

Builds and packages a project with the specified settings and parameters.

```bash
parcel pack <project> [options]
```

**Arguments:**

- `<project>` - Parcel project file that contains the configuration

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `-o, --output` | Output directory | `<project-dir>\bin\packages` |
| `-r, --runtimes` | Runtime identifiers to package. You can specify this option more than once. | Current platform runtime |
| `-p, --packages` | Output formats: `deb`, `dmg`, `msix`, `nsis`, `pkg`, `rpm`, or `zip`. You can specify this option more than once. | Current platform package |
| `--no-build` | Do not rebuild the input project. | `false` |

**Example:**

```bash
# Pack for current platform
parcel pack MyApp.parcel

# Pack for multiple platforms and formats
parcel pack MyApp.parcel -r osx-x64 -r linux-x64 -p dmg -p deb
```

### step

Runs one packaging step. Use this command to debug or customize a packaging workflow.

```bash
parcel step [command] <input> <output> [options]
```

**Available Step Commands:**

| Command | Description | Input | Output |
|---------|-------------|-------|--------|
| `publish` | Publishes the .NET project for a target platform and runtime | No explicit input. Parcel reads the project from the `.parcel` file. | Published application directory |
| `merge-mac` | Merges architecture builds into a universal macOS application bundle | Directory with architecture-specific subdirectories (`osx-x64`, `osx-arm64`) | Universal application directory |
| `bundle-mac` | Packages a macOS application and its dependencies into one bundle | Application directory | Application bundle (`.app`) |
| `sign-mac` | Signs a macOS application bundle and its components with the credentials in the project settings | Application bundle or flat directory | Signed application bundle or directory |
| `notary-mac` | Submits an application for Apple notarization and staples the ticket if Apple accepts it | Zipped application bundle or DMG file | Notarized file |
| `sign-win` | Signs a Windows application executable with the provider in the project settings | Application directory with an executable that matches `AssemblyName` | Signed executable |
| `create-zip` | Creates a ZIP archive and preserves file permissions and symbolic links | Directory or file that contains application files | ZIP archive (`.zip`) |
| `create-dmg` | Creates DMG disk image for macOS | App bundle (.app) | Unsigned DMG image file |
| `create-pkg` | Creates a macOS installer package with the settings in the Parcel project | Application bundle (`.app`) | PKG installer (`.pkg`) |
| `create-deb` | Creates Debian package for Linux | Application directory | Debian package (.deb) |
| `create-rpm` | Creates an RPM package for Linux | Application directory | RPM package (`.rpm`) |
| `create-nsis` | Creates Windows NSIS installer | Application directory | Unsigned NSIS installer (.exe) |
| `create-msix` | Creates a Windows MSIX package. Parcel generates the manifest or patches a project template. | Application directory | MSIX package (`.msix`) |

**Example:**

The step commands are independent and do not have a required order. The following examples show a typical order for each platform.

You can replace a step with your own script to customize the workflow.


<Tabs>
<TabItem value="win" label="Windows" default>

```bash
# `parcel step publish ./publish -r win-x64 -p project.parcel` can be used instead
dotnet publish -r win-x64 -o ./publish

# signing, with parameters populated from .parcel config file
parcel step sign-win ./publish ./signed -p project.parcel

# installer
parcel step create-nsis ./signed ./installer.exe -p project.parcel

# or ZIP archive
parcel step create-zip ./signed ./archive.zip -p project.parcel
```

</TabItem>
<TabItem value="mac" label="macOS">

```bash
mkdir ./publish

# for universal packages, need to publish both archs
dotnet publish -r osx-x64 -o ./publish/osx-x64
dotnet publish -r osx-arm64 -o ./publish/osx-arm64

# merge two archs into a universal one
parcel step merge-mac ./publish ./merged -p project.parcel

# create app bundle
parcel step bundle-mac ./merged ./bundle.app -p project.parcel

# signing, with parameters populated from .parcel config file
parcel step sign-mac ./bundle.app ./signed.app -p project.parcel

# notarization
parcel step notary-mac ./signed.app ./notarized.app -p project.parcel

# DMG package
parcel step create-dmg ./notarized.app ./package.dmg -p project.parcel

# or ZIP archive
parcel step create-zip ./notarized.app ./archive.zip -p project.parcel
```

:::note

Use a universal package to get native performance on both Intel and Apple silicon processors. A universal executable can be up to twice the size of a single-architecture executable.

If you do not need a universal package, omit the `merge-mac` step.

:::

</TabItem>
<TabItem value="lin" label="Linux">


```bash
# `parcel step publish ./ ./publish -r linux-x64 -p project.parcel` can be used instead
dotnet publish -r linux-x64 -o ./publish 

# installer
parcel step create-deb ./publish ./installer.deb -p project.parcel

# or ZIP archive
parcel step create-zip ./publish ./archive.zip -p project.parcel
```

</TabItem>
</Tabs>

**Common Options:**

- `-p, --project` - Parcel project file that contains the configuration
- `-w, --overwrite` - Overwrite existing output files
- `-r, --runtime` - Runtime identifier (for publish command)

### install-tools

Downloads or updates tool dependencies required for the packaging configuration.

```bash
parcel install-tools [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `-r, --runtimes` | Runtime identifiers (can specify multiple) |
| `-p, --packages` | Package formats: `deb`, `dmg`, `msix`, `nsis`, `pkg`, `rpm`, `zip` (can specify multiple) |

**Example:**

```bash
# Install dependencies for specific platforms and package formats
parcel install-tools -r win-x64 -r osx-x64 -p nsis -p dmg
```

This command downloads the NSIS and DMG tools before Parcel needs them.

### mcp

Runs a Model Context Protocol (MCP) server. The server lets an AI assistant run Parcel commands.

```bash
parcel mcp
```

For setup and usage information, see [Parcel MCP](/tools/parcel/mcp).

## Environment Variables

### Parcel and console behavior

| Variable | Description |
|---|---|
| `AVALONIA_TOOLS_LICENSE_KEY` | License key used when `--license-key` is not provided. |
| `AVALONIA_TOOLS_LOG_LEVEL` | Sets the Parcel application and MCP log level, such as `Debug` or `Information`. |

### Tool discovery

| Variable | Description |
|---|---|
| `PARCEL_JAVA_EXE` | Sets the path to the Java executable for cross-platform Windows signing. Parcel also reads `JAVA_HOME`. |
| `PARCEL_SIGNTOOL_EXE` | Sets the path to SignTool on Windows. |
| `PARCEL_WSL_DISTRIBUTION` | WSL2 distribution used by packaging steps that require WSL on Windows. |
| `PARCEL_WSL_USER` | Sets the user account for the selected WSL2 distribution. |

### Cloud signing

| Variable | Description |
|---|---|
| `AZURE_TENANT_ID` | Microsoft Entra tenant used by Azure Artifact Signing or Key Vault. |
| `AZURE_CLIENT_ID` | Azure service principal client ID. |
| `AZURE_CLIENT_SECRET` | Azure service principal secret. |
| `AWS_ACCESS_KEY_ID` | AWS access key used by AWS KMS signing. |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key used by AWS KMS signing. |
| `AWS_SESSION_TOKEN` | Optional AWS temporary-session token. |

You can override supported scalar settings with automatic `PARCEL_<SECTION>_<SETTING>` environment variables. See the [Parcel configuration reference](/tools/parcel/configuration-reference) for the exact name of each setting.

## Notes

- Define all packaging options, signing credentials, and visual settings in the Parcel project file (`.parcel`).
- When you use `--no-build`, make sure that the publish settings match your Parcel configuration. These settings include trimming, AOT, and single-file publishing.

## See also

- [Parcel setup](/tools/parcel/setup)
- [Parcel configuration reference](/tools/parcel/configuration-reference)
- [Packaging for macOS](/tools/parcel/packaging-for-macos)
- [Packaging for Windows](/tools/parcel/packaging-for-windows)
- [Packaging for Linux](/tools/parcel/packaging-for-linux)
