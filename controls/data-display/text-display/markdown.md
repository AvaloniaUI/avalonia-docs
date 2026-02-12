---
id: markdown
title: Markdown
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

The Avalonia.Controls.Markdown control renders Markdown-formatted text in Avalonia applications, supporting common Markdown features and theming.

## Usage Examples

### XAML Usage

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

### XAML Usage (with ViewModel Binding)

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

### ViewModel Example (Load from File)

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

## API Overview

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

## Custom Image Loader

See the [Image Loader](/reference/properties/imageloader) page for a detailed example how to customize image loading.

## Code Highlighter

See the [Code Highlighter](/reference/properties/codehighlighter) page for information on enabling syntax highlighting for code blocks, installation packages, and usage examples for the included highlighters.

## Styling

See the [Markdown Styling and Customization](/reference/styles/markdown-styling) page for a full list of resources you can override.

## See also

- [Rendering markdown](/docs/ui-development/rendering-markdown)