---
id: build-mcp
title: Build MCP
sidebar_label: Build MCP
doc-type: how-to
description: "Set up the Build MCP server so your AI coding assistant can search Avalonia guides, tutorials, and API references directly."
keywords:
  - mcp
  - model context protocol
  - ai assistant
  - documentation
  - copilot
  - claude
  - cursor
  - windsurf
  - gemini
  - ai tools
tags:
  - mcp
  - ai
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is Build MCP?

The Build MCP server gives your AI coding assistant direct access to the Avalonia documentation. Instead of relying on training data that may be outdated or incomplete, your assistant can search guides, tutorials, and API references in real time and return answers grounded in the official docs.

Build MCP is **free to use** and requires no license key or local installation. It runs as a remote server, so setup takes only a few seconds in any MCP-compatible editor or CLI tool.

For a general introduction to MCP, see [AI Tools](/tools/ai-tools/).

## Available tools

The Build MCP server exposes two tools to your AI assistant:

| Tool | Description |
|------|-------------|
| `search_avalonia_docs` | Searches the full Avalonia documentation, including API references, tutorials, guides, and migration docs. Accepts a natural language query and returns matching results with source links. |
| `lookup_avalonia_api` | Looks up a specific Avalonia class, property, method, or event in the API reference. Use this for targeted API queries such as `TextBlock`, `Window.Show`, or `StyledProperty`. |

## Setting up the MCP server

Build MCP uses a remote URL endpoint. Your editor connects to the server over HTTP, so there is nothing to install locally.

Choose your editor or CLI tool below:

<Tabs groupId="editor">
<TabItem value="vscode" label="VS Code">

**Option A: Command palette**

1. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Run **MCP: Add Server**.
3. Select **HTTP** as the server type.
4. Enter `https://docs-mcp.avaloniaui.net/mcp` as the URL.
5. Set the server name to `avalonia-docs`.
6. Choose whether to install the server for this workspace or globally.

**Option B: Manual configuration**

Add the following to `.vscode/mcp.json` in your workspace root:

```json title=".vscode/mcp.json"
{
    "servers": {
        "avalonia-docs": {
            "type": "http",
            "url": "https://docs-mcp.avaloniaui.net/mcp"
        }
    }
}
```

</TabItem>
<TabItem value="visual-studio" label="Visual Studio">

Visual Studio 2022 (17.x and later) supports MCP servers through `mcp.json` configuration files.

Add the following to `.vscode/mcp.json` in your solution directory:

```json title=".vscode/mcp.json"
{
    "servers": {
        "avalonia-docs": {
            "type": "http",
            "url": "https://docs-mcp.avaloniaui.net/mcp"
        }
    }
}
```

:::tip
Visual Studio reads from the same `.vscode/mcp.json` path as VS Code. If you already configured it for VS Code, it works in Visual Studio automatically.
:::

</TabItem>
<TabItem value="rider" label="Rider">

JetBrains Rider supports MCP servers through the AI Assistant plugin and the GitHub Copilot plugin.

**Option A: Settings UI**

1. Open **Settings** > **Tools** > **AI Assistant** > **MCP Servers**.
2. Click **Add** and select **Streamable HTTP** as the transport type.
3. Enter `https://docs-mcp.avaloniaui.net/mcp` as the URL.
4. Set the server name to `avalonia-docs`.

**Option B: Manual configuration**

Create or edit `.idea/mcp.json` in your project directory:

```json title=".idea/mcp.json"
{
    "servers": {
        "avalonia-docs": {
            "type": "http",
            "url": "https://docs-mcp.avaloniaui.net/mcp"
        }
    }
}
```

</TabItem>
<TabItem value="cursor" label="Cursor">

Add the following to `.cursor/mcp.json` in your project directory, or to `~/.cursor/mcp.json` for global configuration:

```json title=".cursor/mcp.json"
{
    "mcpServers": {
        "avalonia-docs": {
            "url": "https://docs-mcp.avaloniaui.net/mcp"
        }
    }
}
```

</TabItem>
<TabItem value="windsurf" label="Windsurf">

Add the following to `~/.codeium/windsurf/mcp_config.json`:

```json title="~/.codeium/windsurf/mcp_config.json"
{
    "mcpServers": {
        "avalonia-docs": {
            "serverUrl": "https://docs-mcp.avaloniaui.net/mcp"
        }
    }
}
```

</TabItem>
<TabItem value="claude-code" label="Claude Code">

Run this command in your terminal:

```bash
claude mcp add --transport http avalonia-docs https://docs-mcp.avaloniaui.net/mcp
```

To verify it was added:

```bash
claude mcp list
```

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

1. Open **Settings** > **Developer** and click **Edit Config**.
2. Add the Build MCP server to `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "avalonia-docs": {
            "type": "url",
            "url": "https://docs-mcp.avaloniaui.net/mcp"
        }
    }
}
```

3. Save the file and restart Claude Desktop.

</TabItem>
<TabItem value="gemini-cli" label="Gemini CLI">

Add the following to `~/.gemini/settings.json` (or the project-level `.gemini/settings.json`):

```json title="~/.gemini/settings.json"
{
    "mcpServers": {
        "avalonia-docs": {
            "httpUrl": "https://docs-mcp.avaloniaui.net/mcp"
        }
    }
}
```

</TabItem>
</Tabs>

## Verify the connection

After configuring the MCP server, verify it is working:

1. **Check the server is listed.** Open your editor's MCP panel or status indicator and confirm `avalonia-docs` appears as a connected server. In VS Code, run **MCP: List Servers** from the command palette.
2. **Test with a prompt.** Ask your AI assistant:

```text
"Search the Avalonia docs for how to set up data binding."
```

If the assistant returns documentation results with source links, setup is complete.

## Troubleshooting

### MCP server does not appear in the editor

- **Restart your editor** after adding or modifying the MCP configuration file. Most editors require a restart to detect new MCP servers.
- **Check the config file location.** Each editor expects the configuration in a specific path. See the setup instructions for your editor above.
- **Validate your JSON.** A syntax error in the configuration file (missing comma, trailing comma, unmatched brace) will silently prevent the server from loading.

### Server appears but tools are not available

- **Confirm your editor supports HTTP transport.** Some older editor versions only support STDIO-based MCP servers. Update your editor to the latest version.
- **Check network connectivity.** The server is hosted at `docs-mcp.avaloniaui.net`. Verify you can reach this domain from your network.

### Results seem outdated

The Build MCP server indexes the published Avalonia documentation. If you notice outdated content, the documentation site may not have been updated yet. Check [docs.avaloniaui.net](https://docs.avaloniaui.net) directly to confirm.

## Usage examples

Describe what you want to accomplish in natural language. The AI assistant calls the MCP tools automatically:

**Searching documentation:**

```text
"Search the Avalonia docs for how to use TreeView with data binding."
```

**Looking up API types:**

```text
"Look up the Avalonia TextBlock control in the API reference."
```

**Migration guidance:**

```text
"Search the Avalonia docs for how to migrate from WPF to Avalonia."
```

**Finding tutorials:**

```text
"Find an Avalonia tutorial on building an MVVM application."
```

## See also

- [AI Tools overview](/tools/ai-tools/)
- [DevTools MCP](/tools/developer-tools/mcp)
- [Parcel MCP](/tools/parcel/mcp)
