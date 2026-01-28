---
id: mcp
title: Model Context Protocol
---

## What is MCP?

Model Context Protocol (MCP) is an open standard that allows AI models to use external tools and services through a unified interface. Parcel provides an MCP server that enables AI assistants like GitHub Copilot, Claude, and Cursor to directly interact with Parcel's packaging tools, making it easier to set up and manage your Avalonia application builds.

## Prerequisites

Before setting up the MCP server, ensure you have:

1. **Parcel .NET tool installed** - Follow the [Getting Started](getting-started) guide
2. **Valid license key** - Set `PARCEL_LICENSE_KEY` environment variable to a valid license key from the portal

:::note
Parcel MCP is only available with a full Accelerate license.
:::

## Supported AI Assistants

Parcel's MCP server works with various AI assistants. 

- **[VSCode with Copilot](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)**
- **[Visual Studio with Copilot](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=vs-2022)**
- **[Rider Copilot](https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer)**
- **[Rider AI Assistant](https://www.jetbrains.com/help/ai-assistant/mcp.html)**
- **[Claude Code](https://claudelog.com/faqs/how-to-setup-claude-code-mcp-servers/)**
- **[Cursor](https://docs.cursor.com/en/context/mcp)**

## Setting Up the MCP Server

Parcel provides a STDIO type MCP server, available by running the `parcel mcp` command. Installation methods depend on your editor and are detailed below.

### Quick Install

Use these one-click installation links to automatically configure the MCP server:

- [Install for VSCode](https://vscode.dev/redirect/mcp/install?name=avalonia_parcel&config=%7b%22type%22%3a%22stdio%22%2c%22command%22%3a%22parcel%22%2c%22args%22%3a%5b%22mcp%22%5d%7d)
- [Install for Cursor](https://cursor.com/en/install-mcp?name=avalonia_parcel&config=eyJ0eXBlIjoic3RkaW8iLCJjb21tYW5kIjoicGFyY2VsIiwiYXJncyI6WyJtY3AiXX0=)

### CLI Install

#### Claude Code

Run this command:

```bash
claude mcp add --scope user avalonia_parcel -- avdt mcp
```

### Manual Configuration (mcp.json)

For editors that support `mcp.json` configuration files (VSCode, Visual Studio, Rider, Cursor), add the following to your configuration:

```json title=".vscode/mcp.json"
{
    "servers": {
        "avalonia_parcel": {
            "type": "stdio",
            "command": "parcel",
            "args": [
                "mcp"
            ]
        }
    }
}
```

:::tip
Refer to your editor's documentation for the exact location to place or edit the `mcp.json` file.
:::

## Supported tools

**create-project**: Creates *.parcel project file with provided context of the application.
**pack**: Builds and packs project per settings, like RIDs and packaging formats.

**setup-trusted-signing**: Enables Windows Trusted Signing in *.parcel file.
**setup-apple-notary**: Enables macOS notary in *.parcel file. Sets up Apple ID and app-specific passwords.
**setup-apple-sign**: Enables macOS codesign in *.parcel file. Sets up P12 certificates and provisioning profiles.

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
