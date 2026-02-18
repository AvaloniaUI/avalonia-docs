---
id: mcp
title: Model context protocol (MCP) for Parcel
sidebar_label: Model context protocol (MCP)
---

## What is MCP?

Model Context Protocol (MCP) is an open standard that allows AI models to use external tools and services through a unified interface. Parcel provides an MCP server that enables AI assistants like GitHub Copilot, Claude, and Cursor to directly interact with Parcel's packaging tools, making it easier to set up and manage your Avalonia application builds.

## Prerequisites

Before setting up the MCP server, ensure you have:

1. **Parcel .NET tool installed** - Follow the [Setup guide](/docs/deployment/parcel/setup).
2. **Valid license key** - Set the `PARCEL_LICENSE_KEY` environment variable or use the `--license-key` option with a valid license key from the portal.

:::note
Parcel MCP is only available with a full Accelerate license.
:::

## Supported AI Assistants

Parcel's MCP server works with various AI coding assistants:

- **[VSCode with GitHub Copilot](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)** (used in examples below)
- **[Visual Studio with Copilot](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=vs-2022)** - Supports similar `mcp.json` file formats
- **[Claude Code](https://claudelog.com/faqs/how-to-setup-claude-code-mcp-servers/)**
- **[Cursor](https://docs.cursor.com/en/context/mcp)**

## Setting Up the MCP Server

Parcel provides an STDIO type MCP server, available by running the `parcel mcp` command.

### Adding MCP Server in VSCode

1. Open the command palette and run **"MCP: Add Server"**
2. Select **"stdio"** server type
3. Set the command to run as:

   ```bash
   parcel mcp
   ```

4. Set server name to **"parcel"**
5. Choose to install the server locally or globally

VSCode will generate a `.vscode/mcp.json` file:

```json title=".vscode/mcp.json"
{
    "servers": {
        "parcel": {
            "type": "stdio",
            "command": "parcel",
            "args": [
                "mcp"
            ]
        }
    },
    "inputs": []
}
```

### Adding MCP Server in Claude Desktop

1. Open Claude's Setting -> Developer page, you will find "Edit Config" button
2. This button opens "claude_desktop_config.json" manifest file.
3. Edit this file to include Parcel MCP server:

```json
{
    "mcpServers": {
        "parcel": {
            "command": "parcel",
            "args": [
                "mcp"
            ],
            "env": {
                "PARCEL_LICENSE_KEY": "YOUR_ACCELERATE_LICENSE_KEY"
            }
        }
    }
}
```

4. You will also likely need standard FileSystem MCP server in addition to Parcel MCP. Claude Desktop doesn't have it enabled by default.

:::note

Unlike VSCode, in our testing, Claude Desktop didn't pass system-wide env variable to the MCP servers. Which is why this config has `PARCEL_LICENSE_KEY` defined explicitly.

:::

## Capabilities

Once the MCP server is configured, your AI assistant can help with:

### Project Configuration

- **Create parcel configurations** from existing .NET projects
- **Configure application properties** like package name, display name, icons, and bundle identifiers
- **Set up build targets** for multiple platforms and architectures

### Code Signing Setup

- **Windows Azure Trusted Signing** - Configure certificates and signing parameters
- **macOS Code Signing** - Set up P12 certificates and provisioning profiles
- **macOS Notarization** - Configure Apple ID and app-specific passwords

### Building and Packaging

- **Build and package** applications for multiple platforms (Windows, macOS, Linux)
- **Generate installers** in various formats (DMG, DEB, NSIS, ZIP, etc.)
- **Cross-platform packaging** with runtime-specific outputs

## Usage Examples

Simply describe what you want to accomplish in natural language. The AI assistant will use the MCP server to execute the appropriate Parcel commands:

**Project Setup:**

```text
"Create a packaging config for my Avalonia project and set up macOS signing"
```

**Packaging:**

```text
"Package my app for macOS as a DMG with code signing enabled"
```

**Configuration Management:**

```text
"Update my app's display name and icon, then rebuild the Windows installer"
```

The AI assistant will guide you through the process, execute commands, and help resolve any configuration issues that arise.

<video controls width="90%">
  <source src="/video/parcel/parcel_mcp.mp4" />
</video>
