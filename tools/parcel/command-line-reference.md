---
id: command-line-reference
title: Parcel command line reference
sidebar_label: Command line reference
doc-type: reference
---

Parcel provides a command-line tool that packages Avalonia apps for Windows, macOS, and Linux. It includes app signing and packaging capabilities to simplify distribution of ready-to-install binaries.

## Prerequisites

Before using Parcel, ensure you have:

1. **Parcel .NET tool installed** - Follow the [Setup guide](/tools/parcel/setup).
2. **Valid license key** - Set the `AVALONIA_TOOLS_LICENSE_KEY` environment variable or use the `--license-key` option with a valid license key from the portal.

:::note
Parcel CLI is only available with a [Avalonia Plus](https://avaloniaui.net/pricing) license.
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
| `--license-key` | License key necessary to run Parcel. If unset, falls back to `AVALONIA_TOOLS_LICENSE_KEY`, then to an existing app session |
| `--verbosity` | Set the verbosity level (quiet, minimal, normal, detailed, diagnostic) |

## Commands

### pack

Builds and packs a project according to pre-defined settings and input parameters.

```bash
parcel pack <project> [options]
```

**Arguments:**

- `<project>` - Parcel project file to load config from

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `-o, --output` | Output directory | `<project-dir>\bin\packages` |
| `-r, --runtimes` | Runtime identifiers to pack application with (can specify multiple) | current platform runtime |
| `-p, --packages` | Package formats to output: `deb`, `dmg`, `msix`, `nsis`, `pkg`, `rpm`, `zip` (can specify multiple) | current platform package  |
| `--no-build` | Skip recompiling input project | false |

**Example:**

```bash
# Pack for current platform
parcel pack MyApp.parcel

# Pack for multiple platforms and formats
parcel pack MyApp.parcel -r osx-x64 -r linux-x64 -p dmg -p deb
```

### step

Runs a specific step from the packaging process. Useful for debugging or customized packaging workflows.

```bash
parcel step [command] <input> <output> [options]
```

**Available Step Commands:**

| Command | Description | Input | Output |
|---------|-------------|-------|--------|
| `publish` | Publishes .NET project for target platform | -unused- | Published application directory |
| `merge-mac` | Merges multiple architectures into universal macOS app | Directory with arch subdirectories (osx-x64, osx-arm64) | Universal app directory |
| `bundle-mac` | Packages macOS app into single bundle | Application directory | App bundle (.app) |
| `sign-mac` | Signs macOS app bundle with credentials | App bundle or flat directory | Signed bundle |
| `notary-mac` | Submits app for Apple notarization | Zipped app bundle or DMG | Notarized file (stapled in case of DMG) |
| `sign-win` | Signs Windows executable | Application executable or installed | Signed executable or installer |
| `create-zip` | Creates zip archive for distribution | Directory or file | Zip archive (.zip) |
| `create-dmg` | Creates DMG disk image for macOS | App bundle (.app) | Unsigned DMG image file |
| `create-pkg` | Creates a macOS installer package | App bundle (.app) | Unsigned PKG installer (.pkg) |
| `create-deb` | Creates Debian package for Linux | Application directory | Debian package (.deb) |
| `create-rpm` | Creates RPM package for Linux | Application directory | RPM package (.rpm) |
| `create-nsis` | Creates Windows NSIS installer | Application directory | Unsigned NSIS installer (.exe) |
| `create-msix` | Creates Windows MSIX package | Application directory | Unsigned MSIX package (.msix) |

**Example:**

While these commands don't have a strict order, and can be executed independently, standard approach is following per platform.

Any of these steps can be replaced with your scripts allowing for higher flexibility than standard "parcel pack" command.


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

Universal packages are necessary if you aim for native performance on both Intel and Apple Silicon processors, avoiding layer of emulation.

As a downside, universal packages are up to x2 in size of executable binaries.

If you don't need that, `merge-mac` step can be skipped completely.

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

- `-p, --project` - Parcel project file to load config from
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

This specific command will pre-download **NSIS** and **DMG** tooling required for Parcel to run.

### mcp

Runs a Model Context Protocol server, allowing Parcel commands to be executed from LLM AI sessions.

```bash
parcel mcp
```

See [Model Context Protocol](/tools/parcel/mcp) for more details on usage.

## Environment Variables

### Parcel and console behavior

| Variable | Description |
|---|---|
| `AVALONIA_TOOLS_LICENSE_KEY` | License key used when `--license-key` is not provided. |
| `AVALONIA_TOOLS_LOG_LEVEL` | Parcel application and MCP log level, such as `Debug` or `Information`. |
| `AVALONIA_TELEMETRY_OPTOUT` | Set to `true` or `1` to disable Avalonia tooling telemetry. |
| `NO_COLOR` | Set to any non-empty value to disable colored console packaging output. |
| `SOURCE_DATE_EPOCH` | Unix timestamp used for deterministic package timestamps. |

### Tool discovery

| Variable | Description |
|---|---|
| `PARCEL_JAVA_EXE` | Explicit path to the Java executable used by cross-platform Windows signing. `JAVA_HOME` is also respected. |
| `PARCEL_SIGNTOOL_EXE` | Explicit path to SignTool on Windows. |
| `PARCEL_WSL_DISTRIBUTION` | WSL2 distribution used by packaging steps that require WSL on Windows. |
| `PARCEL_WSL_USER` | User account used when Parcel starts the selected WSL2 distribution. |

### Cloud signing

| Variable | Description |
|---|---|
| `AZURE_TENANT_ID` | Microsoft Entra tenant used by Azure Artifact Signing or Key Vault. |
| `AZURE_CLIENT_ID` | Azure service principal client ID. |
| `AZURE_CLIENT_SECRET` | Azure service principal secret. |
| `AWS_ACCESS_KEY_ID` | AWS access key used by AWS KMS signing. |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key used by AWS KMS signing. |
| `AWS_SESSION_TOKEN` | Optional AWS temporary-session token. |

## Notes

- All packaging options, signing credentials, and visual customizations are defined in the Parcel project file (.parcel)
- When using `--no-build`, ensure that publish-related settings (trimming, AOT, single-file) match between your build and Parcel configuration

## See also

- [Parcel setup](/tools/parcel/setup)
- [Packaging for macOS](/tools/parcel/packaging-for-macos)
- [Packaging for Windows](/tools/parcel/packaging-for-windows)
- [Packaging for Linux](/tools/parcel/packaging-for-linux)
