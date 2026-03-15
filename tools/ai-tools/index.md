---
id: index
title: AI Tools
doc-type: overview
---

Avalonia provides MCP (Model Context Protocol) servers that connect AI coding assistants to documentation, running applications, and packaging workflows. Rather than copying error messages or describing your UI in text, your AI assistant can search the official docs, inspect the visual tree, take screenshots, set properties, and package your app for you.

## What is MCP?

Model Context Protocol (MCP) is an open standard that allows AI models to use external tools and services through a unified interface. Instead of manually running commands and pasting output into a chat, MCP lets your AI assistant call tools directly, passing structured data back and forth. The result is a tighter feedback loop where the assistant can see your application, make changes, and verify the outcome without you acting as the intermediary.

## Supported AI assistants

Each MCP setup page includes step-by-step configuration instructions for the following editors and CLI tools:

- VS Code with GitHub Copilot
- Visual Studio with Copilot
- JetBrains Rider (AI Assistant and Copilot plugins)
- Cursor
- Windsurf
- Claude Code
- Claude Desktop
- Gemini CLI

## Build MCP

The Build MCP server gives your AI coding assistant direct access to the Avalonia documentation and expert development rules. Your assistant can search guides, tutorials, and API references in real time, load comprehensive coding rules for idiomatic Avalonia development, and use guided prompts for common workflows like creating new projects, recreating a UI from a screenshot, or migrating a WPF application to Avalonia.

Build MCP is **free to use** and requires no license key or local installation. It runs as a remote server that connects over HTTP, so setup takes only a few seconds.

[Set up Build MCP](/tools/ai-tools/build-mcp)

## DevTools MCP

The DevTools MCP server gives your AI assistant direct access to your running Avalonia application. It can connect to a live app or the XAML previewer, inspect the visual tree, search for elements by type or name, read and modify properties, capture screenshots, and send input events.

This is particularly useful for debugging layout issues. Instead of describing a problem, your AI assistant can see it, inspect the relevant properties, and suggest or apply a fix, all within the same conversation.

[Set up DevTools MCP](/tools/developer-tools/mcp)

## Parcel MCP

The Parcel MCP server lets your AI assistant handle application packaging. It can create Parcel configurations from your .NET projects, set up code signing and notarisation, and build installers for Windows, macOS, and Linux.

With the Parcel MCP server, you describe what you want in plain English and the AI assistant handles the configuration and execution, including macOS signing and notarisation.

[Set up Parcel MCP](/tools/parcel/mcp)

## See also

- [Build MCP](/tools/ai-tools/build-mcp)
- [DevTools MCP](/tools/developer-tools/mcp)
- [Parcel MCP](/tools/parcel/mcp)
- [Avalonia Tools overview](/tools/)
