---
id: codehighlighter
title: CodeHighlighter
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

This document explains how to enable syntax highlighting for code blocks in the `Markdown` control by providing a `CodeHighlighter` implementation.

## Installation / Packages

Highlighters are distributed as separate NuGet packages and must be added to your application via PackageReference. Use `dotnet add package` (or add the package reference in your project file) to include the implementation you want:

- ColorCode-based highlighter:

```bash
dotnet add package Avalonia.Controls.Markdown.ColorCode
```

- TextMate-based highlighter:

```bash
dotnet add package Avalonia.Controls.Markdown.TextMate
```

## Overview

To enable syntax highlighting for code blocks inside the `Markdown` control, set the control's `CodeHighlighter` property to one of the provided highlighter implementations (for example, `ColorCodeHighlighter` or `TextMateHighlighter`).

The `Markdown` control will use the provided highlighter to format code blocks when rendering the document.

## Using the `TextMateHighlighter` (XAML)

Add the highlighter to resources and set the `CodeHighlighter` on the `Markdown` control:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:textMate="clr-namespace:Avalonia.Controls;assembly=Avalonia.Controls.Markdown.TextMate">
  <Window.Resources>
    <!-- Create a TextMateHighlighter resource -->
    <textMate:TextMateHighlighter x:Key="textMateHighlighter" Theme="LightPlus"/>
  </Window.Resources>

  <!-- Use the highlighter in a Markdown control -->
  <Markdown Text="# Example\n\n```csharp\nvar x = 1;\n```" CodeHighlighter="{StaticResource textMateHighlighter}" />
</Window>
```

## Using `ColorCodeHighlighter` (C#)

Create and set a `ColorCodeHighlighter` in code:

```csharp
var highlighter = new ColorCodeHighlighter();
myMarkdownControl.CodeHighlighter = highlighter;
```

## Notes

- The `Markdown` control listens for changes from the highlighter and will update the rendered document when necessary.

## See also

- [Markdown control](/controls/data-display/text-display/markdown)
- [Rendering markdown](/docs/ui-development/rendering-markdown)