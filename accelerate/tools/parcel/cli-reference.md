---
id: cli-reference
title: Parcel CLI reference
---

Parcel provides a command-line tool that packages Avalonia apps for Windows, macOS, and Linux. It includes app signing and packaging capabilities to simplify distribution of ready-to-install binaries.

## Prerequisites

Before setting up the MCP server, ensure you have:

1. **Parcel .NET tool installed** - Follow the [Getting Started](getting-started) guide
2. **Valid license key** - Set `PARCEL_LICENSE_KEY` environment variable or `--license-key` option to a valid license key from the portal

:::note
Parcel CLI is only available for full Accelerate license
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
| `--license-key` | License key necessary to run Parcel. If unset, falls back to the "PARCEL_LICENSE_KEY" environment variable, or existing app session |

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
| `-p, --packages` | Package formats to output: `deb`, `dmg`, `nsis`, `zip` (can specify multiple) | current platform package  |
| `--no-build` | Skip recompiling input project | false |

**Example:**

```bash
# Pack for current platform
parcel pack MyApp.parcel.xml

# Pack for multiple platforms and formats
parcel pack MyApp.parcel.xml -r osx-x64 -r linux-x64 -p dmg -p deb
```

### step

Runs a specific step from the packaging process. Useful for debugging or customized packaging workflows.

```bash
parcel step [command] <input> <output> [options]
```

**Available Step Commands:**

| Command | Description | Input | Output |
|---------|-------------|-------|--------|
| `publish` | Publishes .NET project for target platform | - | Published application directory |
| `merge-mac` | Merges multiple architectures into universal macOS app | Directory with arch subdirectories (osx-x64, osx-arm64) | Universal app directory |
| `bundle-mac` | Packages macOS app into single bundle | macOS app directory | App bundle (.app) |
| `sign-mac` | Signs macOS app bundle with credentials | App bundle or directory | Signed app bundle |
| `notary-mac` | Submits app for Apple notarization | Zipped app bundle or DMG | Notarized file |
| `sign-win` | Signs Windows executable | Application directory | Signed executable |
| `create-zip` | Creates zip archive for distribution | Directory or file | Zip archive (.zip) |
| `create-dmg` | Creates DMG disk image for macOS | App bundle (.app) | DMG image file |
| `create-deb` | Creates Debian package for Linux | Application directory | Debian package (.deb) |
| `create-nsis` | Creates Windows NSIS installer | Application directory | NSIS installer (.exe) |

**Common Options:**

- `-p, --project` - Parcel project file to load config from
- `-w, --overwrite` - Overwrite existing output files
- `-r, --runtime` - Runtime identifier (for publish command)

### install-build-deps

Downloads or updates tool dependencies necessary for the packaging configuration.

```bash
parcel install-build-deps <project> [options]
```

**Arguments:**

- `<project>` - Parcel project file to load config from

**Options:**

| Option | Description |
|--------|-------------|---------|
| `-r, --runtimes` | Runtime identifiers (can specify multiple) |
| `-p, --packages` | Package formats: `deb`, `dmg`, `nsis`, `zip` (can specify multiple) |

**Example:**

```bash
# Install dependencies for specific platforms and formats
parcel install-build-deps MyApp.parcel -r win-x64 -r osx-x64 -p nsis -p dmg
```

For instance, this command will pre-download **NSIS** and **DMG** tooling necessary for Parcel to run.

### mcp

Runs Model Context Protocol server, allowing Parcel commands to be executed from LLM AI sessions.

```bash
parcel mcp
```

See [Model Context Protocol](mcp.md) for more details on usage.

## Environment Variables

- `PARCEL_LICENSE_KEY` - Default license key used when `--license-key` option is not provided

## Notes

- All packaging options, signing credentials, and visual customizations are defined in the Parcel project file (.parcel)
- When using `--no-build`, ensure that publish-related settings (trimming, AOT, single-file) match between your build and Parcel configuration
