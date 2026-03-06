---
id: index
title: IDE Support
---

Avalonia works with the .NET IDEs you already use. Whether you prefer Visual Studio, VS Code, or Rider, you can build Avalonia applications with full IntelliSense, debugging, and project support out of the box. Where things differ is the XAML editing experience, specifically previewing, code completion, and designer tooling.

## Visual Studio

The [Avalonia for Visual Studio](/tools/visual-studio-extension) extension is part of Avalonia Accelerate and provides the richest XAML editing experience available. It includes a live previewer, intelligent code completion with automatic namespace imports, error highlighting with fix suggestions, a drag-and-drop designer, and full XAML colorisation.

If you're working on Windows and want the most productive XAML workflow, this is the extension to use.

## Visual Studio Code

The Avalonia for Visual Studio Code extension is built on the same XAML parser that powers the Visual Studio extension, which means both IDEs share the same underlying engine. Every code editing enhancement available in Visual Studio flows directly into VS Code.

The extension provides rich IntelliSense with contextual completions, full `x:DataType` Quick Info for inspecting data context through your bindings, Go to Definition for XAML, automatic namespace imports, event handler generation, and clear, actionable diagnostics. It also includes a reliable XAML previewer with proper DPI handling and Zoom to Fit support.

The Avalonia for VS Code extension is part of Avalonia Accelerate.

## JetBrains Rider

Rider provides excellent .NET support for Avalonia development, including project management, debugging, and code navigation. Rider does not ship with a built-in Avalonia XAML previewer, but the community-maintained [AvalonRider](https://plugins.jetbrains.com/plugin/14839-avalonrider) plugin adds previewer support directly within the IDE.

## See also

- [Avalonia for Visual Studio](/tools/visual-studio-extension)
- [AI Tools](/tools/ai-tools/)
- [Avalonia Tools overview](/tools/)
