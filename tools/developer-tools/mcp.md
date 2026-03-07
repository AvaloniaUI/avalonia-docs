---
id: mcp
title: DevTools MCP
sidebar_label: DevTools MCP
doc-type: how-to
---

## What is DevTools MCP?

The DevTools MCP server lets AI assistants connect to a running Avalonia application and interact with it directly. Your assistant can inspect the visual tree, search for elements by type or name, read and modify properties, capture screenshots, and send input events. It can also attach to the XAML previewer, making it a useful companion for iterating on layouts without leaving your editor.

For a general introduction to MCP, see [AI Tools](/tools/ai-tools/).

## Prerequisites

Before setting up the MCP server, ensure you have:

1. **DevTools .NET tool** installed - Follow the [Getting Started](/tools/developer-tools/installation) guide
2. **Valid license key** - Set `ACCELERATE_LICENSE_KEY` environment variable to a valid license key from the portal

:::note
DevTools MCP is only available with a full Accelerate license.
:::

## Supported AI assistants

DevTools MCP server works with various AI coding assistants.

- **[VSCode with Copilot](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)**
- **[Visual Studio with Copilot](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=vs-2022)**
- **[Rider Copilot](https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer)**
- **[Rider AI Assistant](https://www.jetbrains.com/help/ai-assistant/mcp.html)**
- **[Claude Code](https://claudelog.com/faqs/how-to-setup-claude-code-mcp-servers/)**
- **[Cursor](https://docs.cursor.com/en/context/mcp)**

## Setting up the MCP server

DevTools provides a STDIO type MCP server, available by running the `avdt mcp` command. Installation methods depend on your editor and are detailed below.

### Quick install

Use these one-click installation links to automatically configure the MCP server:

- [Install for VSCode](https://vscode.dev/redirect/mcp/install?name=avalonia_devtools&config=%7b%22type%22%3a%22stdio%22%2c%22command%22%3a%22avdt%22%2c%22args%22%3a%5b%22mcp%22%5d%7d)
- [Install for Cursor](https://cursor.com/en/install-mcp?name=avalonia_devtools&config=eyJ0eXBlIjoic3RkaW8iLCJjb21tYW5kIjoiYXZkdCIsImFyZ3MiOlsibWNwIl19)

### CLI install

#### Claude Code

Run this command:

```bash
claude mcp add --scope user avalonia_devtools -- avdt mcp
```

### Manual configuration (mcp.json)

For editors that support `mcp.json` configuration files (VSCode, Visual Studio, Rider, Cursor), add the following to your configuration:

```json title=".vscode/mcp.json"
{
    "servers": {
        "avalonia_devtools": {
            "type": "stdio",
            "command": "avdt",
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

`attach-to-app`: Connects to a running Avalonia app. Lists apps if no `processId` is found and multiple apps are available.
`attach-to-file`: Connects to the live previewer with the specified XAML file. This is recommended over `attach-to-app` for previewing XAML.

`tree`: Gets child elements. Null `nodeId` returns roots.
`ancestors`: Gets parent chain from root.
`search`: Finds elements by type or `x:Name`.

`props`: Gets property values for a node.
`set-prop`: Sets a property value. Use `null` or `unset` for special values.
`styles`: Gets applied styles and setters for a node.
`pseudo-class`: Sets pseudo-class. Omit `pseudoClass` to list available options.

`resources`: Gets resources. Optionally scoped to a node.
`assets`: Lists embedded assets (images, fonts). Returns URLs for `open-asset`.
`open-asset`: Downloads asset by URL from assets tool.

`screenshot`: Captures a PNG screenshot of a UI element.
`input`: Sends an input event to a UI element.
`action`: Performs an action on a UI element.

## Usage examples

Describe what you want to accomplish in natural language. The AI assistant will use the MCP server to inspect and interact with your running Avalonia application:

**Inspecting UI:**

```text
"Connect to my running app and show me the visual tree structure."
```

**Finding Elements:**

```text
"Find all Button elements in my application."
```

**Debugging Styles:**

```text
"What styles are applied to the MainWindow?"
```

**Taking Screenshots:**

```text
"Take a screenshot of the login panel."
```

The AI assistant will guide you, execute commands, and help you understand your application's UI structure.

## See also

- [AI Tools overview](/tools/ai-tools/)
- [DevTools installation](/tools/developer-tools/installation)
- [Parcel MCP](/tools/parcel/mcp)
