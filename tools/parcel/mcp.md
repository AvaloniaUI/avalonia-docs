---
id: mcp
title: Parcel MCP
sidebar_label: Parcel MCP
doc-type: how-to
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is Parcel MCP?

The Parcel MCP server lets AI assistants use Parcel packaging tools. Your assistant can create packaging configurations from .NET projects. It can also configure code signing and notarization, and build packages for Windows, macOS, and Linux.

For a general introduction to MCP, see [AI Tools](/tools/ai-tools/).

## Prerequisites

Before you configure the MCP server, make sure that you have these items:

1. **Parcel .NET tool installed.** Follow the [Setup guide](/tools/parcel/setup).
2. **Valid Avalonia Plus license key.** You can get one from the [Avalonia portal](https://portal.avaloniaui.net/).

### Setting your license key

The MCP server reads the license from the `AVALONIA_TOOLS_LICENSE_KEY` environment variable. Get your license key from the [Avalonia Portal](https://portal.avaloniaui.net/). Parcel MCP is a paid feature and is not included with the Community edition.

Set the key in your shell profile so it persists across sessions:

<Tabs>
<TabItem value="macos-linux" label="macOS / Linux">

Add this line to your shell profile (`~/.zshrc`, `~/.bashrc`, or equivalent):

```bash
export AVALONIA_TOOLS_LICENSE_KEY="your-license-key"
```

Then reload the profile or open a new terminal:

```bash
source ~/.zshrc
```

</TabItem>
<TabItem value="windows-powershell" label="Windows (PowerShell)">

Set a persistent environment variable for your user account:

```powershell
[System.Environment]::SetEnvironmentVariable('AVALONIA_TOOLS_LICENSE_KEY', 'your-license-key', 'User')
```

Restart any open terminals and editors to pick up the change.

</TabItem>
<TabItem value="windows-cmd" label="Windows (Command Prompt)">

```cmd
setx AVALONIA_TOOLS_LICENSE_KEY "your-license-key"
```

Restart any open terminals and editors to pick up the change.

</TabItem>
</Tabs>

:::caution[Editors launched from GUI shortcuts]
If you start your editor from a desktop shortcut or application menu, it might not read environment variables from your shell profile. If the MCP server reports a missing license key, add an `env` block to the MCP configuration:

```json
{
    "env": {
        "AVALONIA_TOOLS_LICENSE_KEY": "your-license-key"
    }
}
```

See the editor-specific setup instructions below for where to place this block.
:::

:::note
Parcel MCP is only available with a full [Avalonia Plus](https://avaloniaui.net/pricing) license.
:::

## Setting up the MCP server

The Parcel MCP server runs as a local process. Its command is `parcel mcp`. You do not need to run this command manually. After configuration, your editor starts the server automatically.

Choose your editor below:

<Tabs groupId="editor">
<TabItem value="vscode" label="VS Code">

**Option A: Command palette**

1. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Run **MCP: Add Server**.
3. Select **stdio** as the server type.
4. Enter `parcel mcp` as the command.
5. Set the server name to `parcel`.
6. Choose whether to install the server for this workspace or globally.

**Option B: Manual configuration**

Add the following to `.vscode/mcp.json` in your workspace root:

```json title=".vscode/mcp.json"
{
    "servers": {
        "parcel": {
            "type": "stdio",
            "command": "parcel",
            "args": ["mcp"]
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
        "parcel": {
            "type": "stdio",
            "command": "parcel",
            "args": ["mcp"]
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
2. Click **Add** and select **stdio** as the transport type.
3. Set the command to `parcel` with argument `mcp`.
4. Set the server name to `parcel`.

**Option B: Manual configuration**

Create or edit `.idea/mcp.json` in your project directory:

```json title=".idea/mcp.json"
{
    "servers": {
        "parcel": {
            "type": "stdio",
            "command": "parcel",
            "args": ["mcp"]
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
        "parcel": {
            "command": "parcel",
            "args": ["mcp"]
        }
    }
}
```

</TabItem>
<TabItem value="claude-code" label="Claude Code">

Run this command in your terminal:

```bash
claude mcp add --scope user parcel -- parcel mcp
```

To verify it was added:

```bash
claude mcp list
```

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

1. Open **Settings** > **Developer** and click **Edit Config**.
2. Add the Parcel MCP server to `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "parcel": {
            "command": "parcel",
            "args": ["mcp"],
            "env": {
                "AVALONIA_TOOLS_LICENSE_KEY": "your-license-key"
            }
        }
    }
}
```

3. Save the file and restart Claude Desktop.

:::note
Claude Desktop does not inherit environment variables from your shell profile, so the license key must be set directly in the configuration as shown above.
:::

</TabItem>
</Tabs>

## Verify the connection

After you configure the MCP server, test the connection:

1. **Check the server is running.** Open your editor's MCP panel or status indicator and confirm `parcel` appears as a connected server. In VS Code, run **MCP: List Servers** from the command palette.
2. **Test with a prompt.** Ask your AI assistant:

```text
"List the available Parcel packaging tools."
```

If the assistant returns a list of capabilities, the connection works.

## Troubleshooting

### "parcel" command not found

The `parcel` command must be on the system `PATH`. For a global .NET tool installation, check for `$HOME/.dotnet/tools` on macOS and Linux. On Windows, check for `%USERPROFILE%\.dotnet\tools`. If the applicable directory is not in `PATH`, add it.

For more information, see [Troubleshooting .NET tool usage issues](https://learn.microsoft.com/en-us/dotnet/core/tools/troubleshoot-usage-issues#executable-file-not-found).

### License key not detected

If the MCP server starts but reports a missing or invalid license key:

- **Confirm the variable is set** by running `echo $AVALONIA_TOOLS_LICENSE_KEY` (macOS/Linux) or `echo %AVALONIA_TOOLS_LICENSE_KEY%` (Windows) in the same terminal where you launch your editor.
- **If your editor is launched from a GUI shortcut**, it may not inherit shell environment variables. Add an `env` block to your MCP configuration as shown in the [license key setup](#setting-your-license-key) section above.

### MCP server does not appear in the editor

- **Restart your editor** after adding or modifying the MCP configuration file. Most editors require a restart to detect new MCP servers.
- **Check the config file location.** Each editor expects the configuration in a specific path. See the setup instructions for your editor above.
- **Validate your JSON.** A syntax error in the configuration file (missing comma, trailing comma, unmatched brace) will silently prevent the server from loading.

### Updating Parcel

If the tools do not work as expected, make sure that you use the latest version:

```bash
dotnet tool update --global AvaloniaUI.Parcel
```

## Capabilities

Once the MCP server is configured, your AI assistant can help with:

### Project configuration

- **Create Parcel configurations** from existing .NET projects
- **Configure application properties** like package name, display name, icons, and bundle identifiers
- **Set up build targets** for multiple platforms and architectures

### Code signing setup

- **Windows Azure Artifact Signing** - Configure certificates and signing parameters
- **macOS Code Signing** - Set up P12 certificates and provisioning profiles
- **macOS Notarization** - Configure Apple ID and app-specific passwords

### Building and packaging

- **Build and package** applications for multiple platforms (Windows, macOS, Linux)
- **Generate packages** in NSIS, MSIX, DMG, PKG, DEB, RPM, and ZIP formats
- **Cross-platform packaging** with runtime-specific outputs

## Usage examples

Describe what you want to accomplish in natural language. The AI assistant calls the MCP tools automatically:

**Project setup:**

```text
"Create a packaging config for my Avalonia project and set up macOS signing."
```

**Packaging:**

```text
"Package my app for macOS as a DMG with code signing enabled."
```

**Configuration management:**

```text
"Update my app's display name and icon, then rebuild the Windows installer."
```

<Video src="/video/parcel/parcel_mcp.mp4" title="Parcel MCP server in action" aspectRatio="1492 / 958" maxWidth="100%" />

## See also

- [AI Tools overview](/tools/ai-tools/)
- [Parcel setup](/tools/parcel/setup)
- [Parcel configuration reference](/tools/parcel/configuration-reference)
- [DevTools MCP](/tools/developer-tools/mcp)
