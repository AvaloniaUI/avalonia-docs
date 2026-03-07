---
id: markdown
title: Markdown
description: Render Markdown-formatted text using the Avalonia.Controls.Markdown control with support for theming, selection, and custom image loading.
doc-type: reference
tags:
  - accelerate
---

The Avalonia.Controls.Markdown control renders Markdown-formatted text in Avalonia applications, supporting common Markdown features and theming.


:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Business or higher.
:::

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

### C# Usage

```csharp
var markdown = new Markdown
{
    Text = "# Hello, Markdown!"
};
```

## API overview

### Properties

| Property           | Type                        | Description                                              |
|--------------------|-----------------------------|----------------------------------------------------------|
| Text               | string?                     | Markdown text to render.                                 |
| SelectionBrush     | IBrush?                     | Brush for selection highlight.                           |
| SelectionStart     | int                         | Start index of selection.                                |
| SelectionEnd       | int                         | End index of selection.                                  |
| SelectedText       | string                      | Content of current selection.                            |
| CanCopy            | bool                        | Whether the Copy command can be executed.                |
| ImageLoader        | MarkdownImageLoader         | Loader for resolving images.                             |
| IsSelectionEnabled | bool                        | Enables/disables text selection.                         |

### Methods

| Method         | Description                                  |
|----------------|----------------------------------------------|
| Copy()         | Copies current selection to clipboard.        |
| SelectAll()    | Selects all content.                         |
| ClearSelection()| Clears current selection.                    |

### Events

| Event                | Description                                 |
|----------------------|---------------------------------------------|
| CopyingToClipboard   | Raised when selection is copied to clipboard.|

## Custom image loader

See the [Image Loader](/docs/markdown/imageloader) page for a detailed example how to customize image loading.

## Code highlighter

See the [Code Highlighter](/docs/markdown/codehighlighter) page for information on enabling syntax highlighting for code blocks, installation packages, and usage examples for the included highlighters.

## Styling

See the [Markdown styling](/docs/markdown/markdown-styling) page for a full list of resources you can override.

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
