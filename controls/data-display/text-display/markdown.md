---
id: markdown
title: Markdown
description: Render Markdown-formatted text using the Avalonia.Controls.Markdown control, built on the shared FlowDocument model with full DocumentNode styling, selection, streaming, and custom image loading.
doc-type: reference
tags:
  - accelerate
---

The `Markdown` control renders Markdown-formatted text in Avalonia applications. It is built on the same FlowDocument model used by the [RichTextEditor](/controls/input/text-input/richtexteditor), giving it full support for DocumentNode-based styling, text selection, and high-performance streaming updates.

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Business or higher.
:::

## Architecture

The `Markdown` control converts Markdown text into a live `FlowDocument` using the following pipeline:

1. **Markdown text** is parsed into a Markdig AST.
2. The AST is rendered into a `DocumentSnapshot` (an immutable, thread-safe representation).
3. The snapshot is applied to a `FlowDocument`, which owns the live document tree.
4. An `EditorTextView` (the same renderer used by `RichTextEditor`) renders the document.

Because the control shares the document model with `RichTextEditor`, all document elements (`Paragraph`, `Section`, `Table`, `RichSpan`, `RichHyperlink`, etc.) are full `StyledElement` instances. This means you can target them with Avalonia style selectors and CSS-like classes, not just named resources.

## Usage examples

### XAML usage

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="using:MarkdownSample"
        mc:Ignorable="d"
        x:Class="MarkdownSample.MainWindow">
 <Markdown xml:space="preserve">
  # Markdown
  ## Headings
  ### Heading 3
  #### Heading 4
  ##### Heading 5
  ###### Heading 6

  **Bold Text**
  *Italic Text*
  ~~Strikethrough~~
  __Bold__ and _Italic_

  [Link to Avalonia](https://avaloniaui.net)

  `Inline code`

  - Unordered list item 1
  - Unordered list item 2
    - Nested item 2a
    - Nested item 2b
  ---
  1. Ordered list item 1
  2. Ordered list item 2
     1. Nested ordered 2a
     2. Nested ordered 2b
  ---  
  > Blockquote example
  >> Nested blockquote
  ---
  | Header 1 | Header 2 |
  |----------|----------|
  | Cell 1   | Cell 2   |
  | Cell 3   | Cell 4   |

  ![Sample Image](https://private-user-images.githubusercontent.com/552074/446176752-21950b56-cd28-4574-9a0a-73bb17b89d31.png)
 </Markdown>
</Window>
```
> **Note:** The `xml:space="preserve"` attribute in the XAML example is important. It ensures that whitespace and line breaks inside the Markdown text are preserved and not normalized by the XAML compiler. Always include this attribute when embedding Markdown directly in XAML.

### XAML usage (with view model binding)

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="using:MarkdownSample"
        mc:Ignorable="d"
        x:Class="MarkdownSample.MainWindow">
    <Window.DataContext>
        <local:MarkdownViewModel/>
    </Window.DataContext>
    <Markdown Text="{Binding MarkdownText}" />
</Window>
```

### View model example (load from file)

```csharp
namespace MarkdownSample;

public class MarkdownViewModel
{
    public string MarkdownText { get; }

    public MarkdownViewModel()
    {
        MarkdownText = File.ReadAllText("Example.md");
    }
}
```

### C# usage

```csharp
var markdown = new Markdown
{
    Text = "# Hello, Markdown!"
};
```

### Streaming usage

The `Markdown` control supports incremental text appending, which is useful for rendering content from an LLM or other streaming source:

```csharp
// Simple convenience method with automatic session management
markdown.AppendText("# Streaming\n\nContent arrives ");
markdown.AppendText("incrementally...");

// Full control via a streaming session
using var session = markdown.BeginStreaming();
session.Append("# Response\n\n");
session.Append("Paragraph text...");
await session.CompleteAsync();
```

The streaming engine runs Markdown parsing on a background thread, diffs the AST against the previous version, and applies only the changed blocks to the live document. Set `AutoScrollToEnd="True"` to keep the viewport pinned to the bottom during streaming.

## API overview

### Properties

| Property           | Type                        | Description                                              |
|--------------------|-----------------------------|----------------------------------------------------------|
| Text               | string?                     | Markdown text to render.                                 |
| SelectionBrush     | IBrush?                     | Brush for selection highlight.                           |
| CaretBrush         | IBrush?                     | Brush for the caret cursor.                              |
| SelectedText       | string                      | Read-only. Content of the current selection.             |
| CanCopy            | bool                        | Read-only. Whether the Copy command can be executed.     |
| AutoScrollToEnd    | bool                        | Keeps the viewport scrolled to the bottom during streaming. |

### Methods

| Method                            | Description                                                        |
|-----------------------------------|--------------------------------------------------------------------|
| Copy()                            | Copies the current selection to the clipboard.                     |
| SelectAll()                       | Selects all content.                                               |
| ClearSelection()                  | Clears the current selection.                                      |
| ScrollToEnd()                     | Scrolls the viewport to the end of the document.                   |
| BeginStreaming()                   | Starts a `MarkdownStreamingSession` for incremental appending.     |
| AppendText(string, TimeSpan?)     | Convenience method that creates or reuses a streaming session.     |

### Events

| Event                | Description                                          |
|----------------------|------------------------------------------------------|
| CopyingToClipboard   | Raised before selection is copied to the clipboard. Can be handled to prevent the copy. |
| SelectionChanged     | Raised when the text selection changes.              |

## Custom image loader

Image loading is handled by the `MarkdownImage` document element, not the `Markdown` control itself. You assign a loader via a style that targets `MarkdownImage`:

```xml
<Style Selector="MarkdownImage">
    <Setter Property="ImageLoader" Value="{StaticResource MyCustomLoader}" />
</Style>
```

See the [Image Loader](/controls/data-display/text-display/imageloader) page for a detailed example of how to implement a custom `MarkdownImageLoader`.

## Code highlighter

Syntax highlighting is handled by the `MarkdownCodeBlock` document element. You assign a highlighter via a style:

```xml
<Style Selector="MarkdownCodeBlock">
    <Setter Property="Highlighter" Value="{StaticResource TextMateHighlighter}" />
</Style>
```

See the [Code Highlighter](/controls/data-display/text-display/codehighlighter) page for installation packages and usage examples.

## Styling

Because the `Markdown` control is built on the shared document model, all rendered elements (`Paragraph`, `Section`, `Table`, `RichSpan`, `RichHyperlink`, etc.) are full Avalonia `StyledElement` instances with CSS-like classes. You can style them with standard Avalonia style selectors:

```xml
<!-- Make all H1 headings red -->
<Style Selector="Paragraph.h1">
    <Setter Property="Foreground" Value="Red" />
</Style>

<!-- Custom quote block background -->
<Style Selector="Section.quoteBlock">
    <Setter Property="Background" Value="#f0f0f0" />
</Style>
```

Named resources are also available for common values such as font sizes, margins, and theme-variant colors.

See the [Markdown styling](/controls/data-display/text-display/markdown-styling) page for the full list of style selectors and resources.

## Installation

See the [Installation Guide](/tools/installing-accelerate) for step-by-step instructions on how to install Accelerate components.

Add the Markdown package to your project:

```bash
dotnet add package Avalonia.Controls.Markdown
```

Add the resources by referencing the shipped `Default.axaml` theme via a `StyleInclude` in `App.axaml`:

```xml
<Application.Styles>
   <StyleInclude Source="avares://Avalonia.Controls.Markdown/Themes/Default.axaml" />
   <!-- other styles -->
</Application.Styles>
```

## See also

- [Markdown styling](/controls/data-display/text-display/markdown-styling)
- [Image loader](/controls/data-display/text-display/imageloader)
- [Code highlighter](/controls/data-display/text-display/codehighlighter)
- [Rendering markdown](/docs/app-development/rendering-markdown)
