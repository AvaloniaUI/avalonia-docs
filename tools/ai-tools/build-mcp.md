---
id: build-mcp
title: Build MCP
sidebar_label: Build MCP
doc-type: how-to
description: "Set up the Build MCP server so your AI coding assistant can search Avalonia guides, tutorials, API references, and get step-by-step migration guidance."
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
  - wpf migration
  - xpf
tags:
  - mcp
  - ai
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is Build MCP?

The Build MCP server gives your AI coding assistant direct access to the Avalonia documentation and expert development guidance. Instead of relying on training data that may be outdated or incomplete, your assistant can search guides, tutorials, and API references in real time, load Avalonia-specific coding rules, and use guided prompts for common workflows like creating new projects or recreating a UI from a screenshot.

Build MCP is **free to use** and requires no license key or local installation. It runs as a remote server, so setup takes only a few seconds in any MCP-compatible editor or CLI tool.

The server also provides migration tools that guide your assistant through upgrading to the latest Avalonia Developer Tools package and migrating WPF applications to Avalonia using XPF.

For a general introduction to MCP, see [AI Tools](/tools/ai-tools/).

## Available tools

The Build MCP server exposes five tools to your AI assistant:

### Documentation and rules

| Tool | Description |
|------|-------------|
| `search_avalonia_docs` | Searches the full Avalonia documentation, including API references, tutorials, guides, and migration docs. Common topics like "styling", "binding", and "mvvm" are automatically routed to optimized queries for better results. |
| `lookup_avalonia_api` | Looks up a specific Avalonia class, property, method, or event in the API reference. Use this for targeted queries such as `TextBlock`, `Window.Show`, or `StyledProperty`. |
| `get_avalonia_expert_rules` | Returns a comprehensive set of Avalonia development rules covering AXAML syntax, the property system, styling, data binding, MVVM patterns, custom controls, layout, theming, assets, threading, and common mistakes to avoid. Call this at the start of a development session so your assistant writes correct, idiomatic Avalonia code. |

### Migration

| Tool | Description |
|------|-------------|
| `migrate_diagnostics` | Provides step-by-step guidance for setting up or migrating to the current Avalonia Developer Tools package. Covers removing the deprecated `Avalonia.Diagnostics` package, installing `AvaloniaUI.DiagnosticsSupport`, updating `Program.cs` and `App.axaml.cs`, and replacing old API calls. |
| `migrate_to_xpf` | Provides step-by-step guidance for migrating a WPF application to Avalonia using XPF. Covers NuGet feed configuration, SDK switching, license key setup, handling version conflicts, and troubleshooting common issues. |

## Available prompts

In addition to tools, the Build MCP server provides prompts that configure your assistant for specific workflows. MCP prompts are pre-written instructions that set up the assistant's context and behavior for a task.

:::note
Prompt support varies by client. Claude Desktop, Claude Code, and Cursor support MCP prompts. Other editors may not surface them in the UI. If your editor does not support prompts, you can achieve the same effect by asking your assistant to call the `get_avalonia_expert_rules` tool directly.
:::

| Prompt | Description |
|--------|-------------|
| `init` | Initializes an Avalonia expert session for an existing project. Loads development rules, sets up concise response behavior, and configures the assistant to use the documentation tools for every technical question. |
| `new` | Guides you through creating a new Avalonia application. Covers template selection (`avalonia.mvvm` for desktop, `avalonia.xplat` for cross-platform), project creation with CommunityToolkit.Mvvm, compiled bindings setup, and developer tools installation. Accepts an optional `app_name` parameter. |
| `recreate-ui` | Sets up an iterative design workflow for recreating a UI from a screenshot or image. The assistant writes AXAML, previews it using the [DevTools MCP](/tools/developer-tools/mcp) `attach-to-file` tool, takes screenshots to compare against the target, and keeps refining until the result matches. Accepts an optional `theme` parameter (`light` or `dark`). Requires a paid [Accelerate license](https://my.avalonia.dev/) for the DevTools MCP integration. |
| `wpf-migration` | Analyzes a WPF project and recommends the best migration path to Avalonia. The assistant scans for third-party control dependencies (Telerik, DevExpress, Syncfusion, and others) and recommends either Avalonia XPF (preserves existing WPF code and controls) or native Avalonia (full migration with modern controls). Calls the appropriate migration tool automatically based on the recommendation. |

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

**Loading expert rules at the start of a session:**

```text
"Load the Avalonia expert rules so you can help me build my app correctly."
```

**Creating a new project (using the `new` prompt):**

```text
"Create a new Avalonia desktop app called WeatherTracker."
```

**Recreating a UI from a screenshot (using the `recreate-ui` prompt):**

```text
"Recreate this UI in Avalonia. Use the light theme."
```

This prompt works best when combined with the [DevTools MCP](/tools/developer-tools/mcp), which provides the `attach-to-file` tool for live XAML previewing. The assistant writes AXAML, previews it, takes screenshots, and iterates until the result matches your target design. DevTools MCP requires a paid [Accelerate license](https://my.avalonia.dev/).

**Migrating a WPF application (using the `wpf-migration` prompt):**

```text
"Analyze my WPF project and recommend the best migration path to Avalonia."
```

The assistant scans your project for third-party control suites and other dependencies, then recommends either Avalonia XPF or native Avalonia migration. It calls the `migrate_to_xpf` or documentation search tools as needed to walk you through the process.

**Setting up Avalonia Developer Tools:**

```text
"Help me set up the latest Avalonia Developer Tools in my project."
```

The assistant calls the `migrate_diagnostics` tool to guide you through installing `AvaloniaUI.DiagnosticsSupport` and removing the deprecated `Avalonia.Diagnostics` package if present.

## See also

- [AI Tools overview](/tools/ai-tools/)
- [DevTools MCP](/tools/developer-tools/mcp)
- [Parcel MCP](/tools/parcel/mcp)
