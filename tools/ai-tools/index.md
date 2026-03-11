---
id: index
title: AI Tools
doc-type: overview
---

Avalonia Accelerate includes MCP (Model Context Protocol) servers for both DevTools and Parcel, allowing AI coding assistants to interact directly with your running applications and packaging workflows. Rather than copying error messages or describing your UI in text, your AI assistant can inspect the visual tree, take screenshots, set properties, and package your app for you.

## What is MCP?

Model Context Protocol (MCP) is an open standard that allows AI models to use external tools and services through a unified interface. Instead of manually running commands and pasting output into a chat, MCP lets your AI assistant call tools directly, passing structured data back and forth. The result is a tighter feedback loop where the assistant can see your application, make changes, and verify the outcome without you acting as the intermediary.

## Supported AI assistants

Both MCP servers work with any assistant that supports the STDIO transport. Each MCP setup page includes step-by-step configuration instructions for the following editors:

- VS Code with GitHub Copilot
- Visual Studio with Copilot
- JetBrains Rider (AI Assistant and Copilot plugins)
- Cursor
- Claude Code
- Claude Desktop

## DevTools MCP

The DevTools MCP server gives your AI assistant direct access to your running Avalonia application. It can connect to a live app or the XAML previewer, inspect the visual tree, search for elements by type or name, read and modify properties, capture screenshots, and send input events.

This is particularly useful for debugging layout issues. Instead of describing a problem, your AI assistant can see it, inspect the relevant properties, and suggest or apply a fix, all within the same conversation.

[Set up DevTools MCP](/tools/developer-tools/mcp)

## Parcel MCP

The Parcel MCP server lets your AI assistant handle application packaging. It can create Parcel configurations from your .NET projects, set up code signing and notarisation, and build installers for Windows, macOS, and Linux.

With the Parcel MCP server, you describe what you want in plain English and the AI assistant handles the configuration and execution, including macOS signing and notarisation.

[Set up Parcel MCP](/tools/parcel/mcp)

## See also

- [DevTools MCP](/tools/developer-tools/mcp)
- [Parcel MCP](/tools/parcel/mcp)
- [Avalonia Tools overview](/tools/)
