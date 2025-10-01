
# Markdown

The Avalonia.Controls.Markdown control renders Markdown-formatted text in Avalonia applications, supporting common Markdown features and theming.

## Usage Examples
### XAML Usage

```xml
  <Markdown Text="
# Markdown&#x0a;
## Headings&#x0a;
### Heading 3&#x0a;
#### Heading 4&#x0a;
##### Heading 5&#x0a;
###### Heading 6&#x0a;
&#x0a;
**Bold Text**&#x0a;
*Italic Text*&#x0a;
~~Strikethrough~~&#x0a;
__Bold__ and _Italic_&#x0a;
&#x0a;
[Link to Avalonia](https://avaloniaui.net)&#x0a;
&#x0a;
`Inline code`&#x0a;
&#x0a;
&#x0a;
- Unordered list item 1&#x0a;
- Unordered list item 2&#x0a;
  - Nested item 2a&#x0a;
  - Nested item 2b&#x0a;
&#x0a;
1. Ordered list item 1&#x0a;
2. Ordered list item 2&#x0a;
   1. Nested ordered 2a&#x0a;
   2. Nested ordered 2b&#x0a;
&#x0a;
&#x0a;
> Blockquote example&#x0a;
>> Nested blockquote&#x0a;
&#x0a;
| Header 1 | Header 2 |&#x0a;
|----------|----------|&#x0a;
| Cell 1   | Cell 2   |&#x0a;
| Cell 3   | Cell 4   |&#x0a;
&#x0a;
![Sample Image](https://private-user-images.githubusercontent.com/552074/446176752-21950b56-cd28-4574-9a0a-73bb17b89d31.png)&#x0a;
"/>
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
