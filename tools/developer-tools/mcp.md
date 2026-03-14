---
id: mcp
title: DevTools MCP
sidebar_label: DevTools MCP
doc-type: how-to
description: "Set up the DevTools MCP server to let AI assistants inspect, debug, and modify your running Avalonia application."
keywords:
  - mcp
  - model context protocol
  - ai assistant
  - devtools
  - copilot
  - claude
  - cursor
  - ai tools
tags:
  - mcp
  - ai
  - accelerate
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is DevTools MCP?

The DevTools MCP server lets AI assistants connect to a running Avalonia application and interact with it directly. Your assistant can inspect the visual tree, search for elements by type or name, read and modify properties, capture screenshots, and send input events. It can also attach to the XAML previewer, making it a useful companion for iterating on layouts without leaving your editor.

For a general introduction to MCP, see [AI Tools](/tools/ai-tools/).

## Prerequisites

Before setting up the MCP server, ensure you have:

1. **DevTools .NET tool** installed. Follow the [Getting Started](/tools/developer-tools/installation) guide.
2. **Valid Accelerate license key.** You can get one from the [Avalonia portal](https://my.avalonia.dev/).

### Setting your license key

The MCP server reads your license from the `ACCELERATE_LICENSE_KEY` environment variable. You can find your license key in the [Avalonia Customer Portal](https://my.avalonia.dev/). MCP is a paid feature and is not included with the Community edition.

Set the key in your shell profile so it persists across sessions:

<Tabs>
<TabItem value="macos-linux" label="macOS / Linux">

Add this line to your shell profile (`~/.zshrc`, `~/.bashrc`, or equivalent):

```bash
export ACCELERATE_LICENSE_KEY="your-license-key"
```

Then reload the profile or open a new terminal:

```bash
source ~/.zshrc
```

</TabItem>
<TabItem value="windows-powershell" label="Windows (PowerShell)">

Set a persistent environment variable for your user account:

```powershell
[System.Environment]::SetEnvironmentVariable('ACCELERATE_LICENSE_KEY', 'your-license-key', 'User')
```

Restart any open terminals and editors to pick up the change.

</TabItem>
<TabItem value="windows-cmd" label="Windows (Command Prompt)">

```cmd
setx ACCELERATE_LICENSE_KEY "your-license-key"
```

Restart any open terminals and editors to pick up the change.

</TabItem>
</Tabs>

:::caution[Editors launched from GUI shortcuts]
If you launch your editor from a desktop shortcut or application menu (rather than from a terminal), it may not inherit environment variables from your shell profile. If the MCP server reports a missing license key, you can set it directly in the MCP configuration by adding an `env` block:

```json
{
    "env": {
        "ACCELERATE_LICENSE_KEY": "your-license-key"
    }
}
```

See the editor-specific setup instructions below for where to place this block.
:::

:::note
DevTools MCP is only available with a full Accelerate license.
:::

## Prepare your application

The MCP server communicates with your Avalonia application through the `AvaloniaUI.DiagnosticsSupport` package. Without this package and the required startup call, the MCP server cannot discover or attach to your running app.

:::caution[Required for MCP connectivity]
This step is required for `attach-to-app` to work. If you skip it, the MCP server will repeatedly fail to connect with no clear error. The `attach-to-file` tool (XAML previewer) does not require a running application, but still requires the package to be installed.
:::

**1. Add the diagnostics support package to your project:**

```bash
dotnet add package AvaloniaUI.DiagnosticsSupport
```

**2. Enable developer tools in your application startup.**

Choose one of the following approaches:

<Tabs>
<TabItem value="appbuilder" label="App builder (Program.cs)">

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .WithDeveloperTools();
```

</TabItem>
<TabItem value="application" label="Application class (App.axaml.cs)">

```csharp
public override void Initialize()
{
    AvaloniaXamlLoader.Load(this);

#if DEBUG
    this.AttachDeveloperTools();
#endif
}
```

</TabItem>
</Tabs>

For the full installation walkthrough, including platform-specific requirements and activation, see [Installing the Accelerate developer tools](/tools/developer-tools/installation).

## Setting up the MCP server

DevTools provides an MCP server that runs as a local process. The underlying command is `avdt mcp`, but you do not need to run it manually. Your editor starts it automatically once configured.

Choose your editor below:

<Tabs groupId="editor">
<TabItem value="vscode" label="VS Code">

**Option A: One-click install**

[Install DevTools MCP for VS Code](https://vscode.dev/redirect/mcp/install?name=avalonia_devtools&config=%7b%22type%22%3a%22stdio%22%2c%22command%22%3a%22avdt%22%2c%22args%22%3a%5b%22mcp%22%5d%7d)

**Option B: Command palette**

1. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Run **MCP: Add Server**.
3. Select **stdio** as the server type.
4. Enter `avdt mcp` as the command.
5. Set the server name to `avalonia_devtools`.
6. Choose whether to install the server for this workspace or globally.

**Option C: Manual configuration**

Add the following to `.vscode/mcp.json` in your workspace root:

```json title=".vscode/mcp.json"
{
    "servers": {
        "avalonia_devtools": {
            "type": "stdio",
            "command": "avdt",
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
        "avalonia_devtools": {
            "type": "stdio",
            "command": "avdt",
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
3. Set the command to `avdt` with argument `mcp`.
4. Set the server name to `avalonia_devtools`.

**Option B: Manual configuration**

Create or edit `.idea/mcp.json` in your project directory:

```json title=".idea/mcp.json"
{
    "servers": {
        "avalonia_devtools": {
            "type": "stdio",
            "command": "avdt",
            "args": ["mcp"]
        }
    }
}
```

</TabItem>
<TabItem value="cursor" label="Cursor">

**Option A: One-click install**

[Install DevTools MCP for Cursor](https://cursor.com/en/install-mcp?name=avalonia_devtools&config=eyJ0eXBlIjoic3RkaW8iLCJjb21tYW5kIjoiYXZkdCIsImFyZ3MiOlsibWNwIl19)

**Option B: Manual configuration**

Add the following to `.cursor/mcp.json` in your project directory, or to `~/.cursor/mcp.json` for global configuration:

```json title=".cursor/mcp.json"
{
    "mcpServers": {
        "avalonia_devtools": {
            "command": "avdt",
            "args": ["mcp"]
        }
    }
}
```

</TabItem>
<TabItem value="claude-code" label="Claude Code">

Run this command in your terminal:

```bash
claude mcp add --scope user avalonia_devtools -- avdt mcp
```

To verify it was added:

```bash
claude mcp list
```

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

1. Open **Settings** > **Developer** and click **Edit Config**.
2. Add the DevTools MCP server to `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "avalonia_devtools": {
            "command": "avdt",
            "args": ["mcp"],
            "env": {
                "ACCELERATE_LICENSE_KEY": "your-license-key"
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

After configuring the MCP server, verify it is working:

1. **Check the server is running.** Open your editor's MCP panel or status indicator and confirm `avalonia_devtools` appears as a connected server. In VS Code, run **MCP: List Servers** from the command palette.
2. **Start your Avalonia application** (or open a XAML file if using the previewer).
3. **Test with a prompt.** Ask your AI assistant:

```text
"Connect to my running Avalonia app and show me the visual tree."
```

If the assistant returns the tree structure, setup is complete.

## Troubleshooting

### "avdt" command not found

The `avdt` command must be on your system PATH. If you installed it as a global .NET tool, ensure `~/.dotnet/tools` (macOS/Linux) or `%USERPROFILE%\.dotnet\tools` (Windows) is in your PATH.

You can verify the tool is installed by running:

```bash
dotnet tool list -g
```

### License key not detected

If the MCP server starts but reports a missing or invalid license key:

- **Confirm the variable is set** by running `echo $ACCELERATE_LICENSE_KEY` (macOS/Linux) or `echo %ACCELERATE_LICENSE_KEY%` (Windows) in the same terminal where you launch your editor.
- **If your editor is launched from a GUI shortcut**, it may not inherit shell environment variables. Add an `env` block to your MCP configuration as shown in the [license key setup](#setting-your-license-key) section above.

### MCP server does not appear in the editor

- **Restart your editor** after adding or modifying the MCP configuration file. Most editors require a restart to detect new MCP servers.
- **Check the config file location.** Each editor expects the configuration in a specific path. See the setup instructions for your editor above.
- **Validate your JSON.** A syntax error in the configuration file (missing comma, trailing comma, unmatched brace) will silently prevent the server from loading.

### Server connects but cannot find the application

- **Verify your app has the diagnostics package installed.** The `AvaloniaUI.DiagnosticsSupport` NuGet package must be added to your project, and you must call `.WithDeveloperTools()` on your app builder or `this.AttachDeveloperTools()` in your `Application` class. See [Prepare your application](#prepare-your-application) above.
- **Ensure your Avalonia application is running** before asking the assistant to connect.
- If multiple Avalonia apps are running, the assistant will list them and ask which one to attach to.
- For XAML previewing, use `attach-to-file` instead of `attach-to-app`. This connects to the XAML previewer and does not require a running application.

### Cannot attach to a running application

This is the most common issue when first setting up the MCP server. The `attach-to-app` tool requires all of the following:

1. The `AvaloniaUI.DiagnosticsSupport` package is installed in your project.
2. `.WithDeveloperTools()` or `.AttachDeveloperTools()` is called at app startup.
3. The application is running and has fully started (past the splash screen or initialization phase).

If any of these are missing, the MCP server will fail to find your application. Pressing F12 in your app has no effect on MCP connectivity; that shortcut opens the standalone DevTools window, not the MCP connection.

### Updating DevTools

If tools behave unexpectedly, ensure you are running the latest version:

```bash
dotnet tool update -g avdt
```

## Available tools

### Connection

| Tool | Description |
|------|-------------|
| `attach-to-app` | Connects to a running Avalonia app. If multiple apps are running, lists them for selection. |
| `attach-to-file` | Connects to the XAML previewer for a specified file. Recommended over `attach-to-app` for previewing XAML layouts. |
| `detach` | Disconnects from the current app or previewer session. |

### Inspection

| Tool | Description |
|------|-------------|
| `tree` | Returns child elements of a node. Pass a null `nodeId` to get the root elements. |
| `ancestors` | Returns the parent chain from a node up to the root. |
| `search` | Finds elements by type name or `x:Name`. |
| `screenshot` | Captures a PNG screenshot of a specific UI element. |

### Properties and styles

| Tool | Description |
|------|-------------|
| `props` | Returns all property values for a node. |
| `set-prop` | Sets a property value on a node. Use `null` or `unset` to clear a value. |
| `styles` | Returns applied styles and their setters for a node. |
| `pseudo-class` | Activates a pseudo-class on a node (for example, `:pointerover`). Omit the pseudo-class name to list available options. |

### Resources and assets

| Tool | Description |
|------|-------------|
| `resources` | Returns resources defined in the application. Optionally scoped to a specific node. |
| `assets` | Lists embedded assets (images, fonts). Returns URLs for use with `open-asset`. |
| `open-asset` | Downloads an embedded asset by its URL (as returned by the `assets` tool). |

### Interaction

| Tool | Description |
|------|-------------|
| `input` | Sends an input event (click, key press, etc.) to a UI element. |
| `action` | Performs a higher-level action on a UI element. |

## Usage examples

Describe what you want to accomplish in natural language. The AI assistant calls the MCP tools automatically:

**Inspecting UI:**

```text
"Connect to my running app and show me the visual tree structure."
```

**Finding elements:**

```text
"Find all Button elements in my application."
```

**Debugging styles:**

```text
"What styles are applied to the MainWindow?"
```

**Taking screenshots:**

```text
"Take a screenshot of the login panel."
```

**Modifying properties at runtime:**

```text
"Set the Background of the sidebar panel to #F0F0F0."
```

**Iterating on UI design with screenshots:**

The following prompt demonstrates a complete design iteration workflow. The AI assistant writes XAML, previews it with `attach-to-file`, takes screenshots, and keeps refining until the result matches the target design:

```text
"Create an Avalonia application and recreate the attached UI. You can write XAML
and prefer MVVM-friendly code. Use the Avalonia MCP server to periodically confirm
if designs match. Design for the light theme. If the design doesn't match, you must
continue to iterate on it until it does. Use the Avalonia MVVM template and install
AvaloniaUI.DiagnosticsSupport and add .WithDeveloperTools() to the app builder to
enable MCP. Only use the attach-to-file tool. Don't call detach. You don't need to
rebuild the project on change."
```

This prompt works well because it:

- Tells the assistant to use `attach-to-file` (which connects to the XAML previewer without needing to rebuild).
- Includes the app instrumentation instructions (`DiagnosticsSupport` + `.WithDeveloperTools()`) directly in the prompt, so the assistant sets up the project correctly from the start.
- Creates a feedback loop where the assistant keeps iterating until the design matches.

## See also

- [AI Tools overview](/tools/ai-tools/)
- [DevTools installation](/tools/developer-tools/installation)
- [Parcel MCP](/tools/parcel/mcp)
