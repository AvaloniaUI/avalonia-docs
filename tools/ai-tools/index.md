---
id: index
title: AI Tools
---

Avalonia Accelerate includes MCP (Model Context Protocol) servers for both DevTools and Parcel, allowing AI coding assistants to interact directly with your running applications and packaging workflows. Rather than copying error messages or describing your UI in text, your AI assistant can inspect the visual tree, take screenshots, set properties, and package your app for you.

## What is MCP?

Model Context Protocol (MCP) is an open standard that allows AI models to use external tools and services through a unified interface. Instead of manually running commands and pasting output into a chat, MCP lets your AI assistant call tools directly, passing structured data back and forth. The result is a tighter feedback loop where the assistant can see your application, make changes, and verify the outcome without you acting as the intermediary.

MCP is supported by a growing number of AI coding assistants, including GitHub Copilot, Claude Code, Cursor, and JetBrains AI Assistant.

## DevTools MCP

The DevTools MCP server gives your AI assistant direct access to your running Avalonia application. It can connect to a live app or the XAML previewer, inspect the visual tree, search for elements by type or name, read and modify properties, capture screenshots, and send input events.

This is particularly powerful for debugging layout issues. Instead of describing a problem, your AI assistant can see it, inspect the relevant properties, and suggest or apply a fix, all within the same conversation.

[Set up DevTools MCP](/tools/developer-tools/mcp)

## Parcel MCP

The Parcel MCP server lets your AI assistant handle application packaging. It can create Parcel configurations from your .NET projects, set up code signing and notarisation, and build installers for Windows, macOS, and Linux.

Packaging, particularly for macOS with its signing and notarisation requirements, is one of those tasks that eats hours. With the Parcel MCP server, you describe what you want in plain English and the AI assistant handles the configuration and execution.

[Set up Parcel MCP](/tools/parcel/mcp)

## Supported AI assistants

Both MCP servers work with any assistant that supports the STDIO transport:

- [VS Code with GitHub Copilot](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [Visual Studio with Copilot](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=vs-2022)
- [Rider AI Assistant](https://www.jetbrains.com/help/ai-assistant/mcp.html)
- [Claude Code](https://claudelog.com/faqs/how-to-setup-claude-code-mcp-servers/)
- [Cursor](https://docs.cursor.com/en/context/mcp)

## See also

- [DevTools MCP](/tools/developer-tools/mcp)
- [Parcel MCP](/tools/parcel/mcp)
- [Avalonia Tools overview](/tools/)
