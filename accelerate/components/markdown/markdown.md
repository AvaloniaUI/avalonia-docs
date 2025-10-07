# Markdown

The Avalonia.Controls.Markdown control renders Markdown-formatted text in Avalonia applications, supporting common Markdown features and theming.

## Usage Examples

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

#### ViewModel Example (Load from File)

[Example.md](./Example.md)

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

See the dedicated [Custom Image Loader](custom-image-loader.md) page for a detailed example how to customize image loading.

## Styling

See the dedicated [Markdown Styling and Customization](styling.md) page for a full list of resources you can override.
