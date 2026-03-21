---
id: richtexteditor
title: RichTextEditor
doc-type: reference
tags:
 - accelerate
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`Avalonia.Controls.RichTextEditor` is a rich text editing solution for Avalonia applications, offering functionalities for interactive text editing, document architecture and file serialization.

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

## When to use

Use `RichTextEditor` to create an area where users can edit text content and perform common text operations, such as formatting, aligning, highlighting, or undo/redo.

## Basic usage

Use this setup to get started with a basic implementation of the rich text editor.

<Tabs>
<TabItem value="xaml" label="XAML">

    ```xml
    <Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:docs="using:Avalonia.Controls.Documents"
        Title="My Rich Text Editor" 
        Width="800" Height="600">
    
    <docs:RichTextEditor x:Name="Editor">
        <docs:FlowDocument>
            <docs:Paragraph>
                Welcome to <docs:Bold>RichTextEditor</docs:Bold>!
            </docs:Paragraph>
        </docs:FlowDocument>
    </docs:RichTextEditor>
    
    </Window>
    ```
    
</TabItem>

<TabItem value="csharp" label="Code-behind">

  ```csharp
  using Avalonia.Controls.Documents;
  using Avalonia.Controls.Documents.TextModel;

  public partial class MainWindow : Window
  {
      public MainWindow()
      {
          InitializeComponent();
          
          // Access editor
          var editor = this.FindControl<RichTextEditor>("Editor");
          
          // Enable undo/redo
          if (editor?.Document != null)
          {
              editor.Document.TextDocument.UndoManager = new UndoManager();
          }
      }
  }
  ```

</TabItem>
</Tabs>

## Programmatic document construction

If preferred, you can create and edit documents from the code-behind instead of XAML. Do this by directly calling the relevant [components](#components), [block elements](#block-elements), or [inline elements](#inline-elements) from `Avalonia.Controls.Documents`.

<Tabs>
<TabItem value="create" label="Create document">

  ```csharp
  var document = new FlowDocument();
  var paragraph = new Paragraph();
  paragraph.Inlines.Add(new Run("Hello "));
  paragraph.Inlines.Add(new Bold(new Run("World")));
  paragraph.Inlines.Add(new Run("!"));
  document.Blocks.Add(paragraph);
  
  editor.Document = document;
  ```

</TabItem>

<TabItem value="insert" label="Insert text">

  ```csharp
  var doc = editor.Document?.TextDocument;
  if (doc != null)
  { 
      // Insert at start
      var start = doc.CreatePointer(0);
      start.InsertText("Header: ");
    
      // Insert at end
      var end = doc.CreatePointer(doc.Length);
      end.InsertText("\n\nFooter");
  }
  ```

</TabItem>

<TabItem value="formatting" label="Format selected text">

  ```csharp
  var doc = editor.Document?.TextDocument;
  if (doc != null)
  {
      var start = doc.CreatePointer(0);
      var end = doc.CreatePointer(10);
      var range = new TextRange(start, end);
      
      range.ApplyPropertyValue(TextElement.ForegroundProperty, Brushes.Red);
      range.ApplyPropertyValue(TextElement.FontSizeProperty, 20.0);
  }
  ```

</TabItem>
</Tabs>

## Loading and saving files

To load a file, use `File.OpenRead` and specify the target file path.

To save a file, use `File.Create` and specify the target file path.

`RichTextEditor` has built-in support for RTF and plain-text file formats.

```csharp
// Load RTF
using (var stream = File.OpenRead("document.rtf"))
{
    editor.Load(stream, DocumentFormat.Rtf);
}

// Save RTF
using (var stream = File.Create("output.rtf"))
{
    editor.Save(stream, DocumentFormat.Rtf);
}
```

## Adding a word counter

You can create an event that returns a word count. In this example, we add a continuous word counter that updates when the text changes.

```csharp
editor.TextChanged += (sender, args) =>
{
    Console.WriteLine("Document changed");
    UpdateWordCount();
};

void UpdateWordCount()
{
    var doc = editor.Document?.TextDocument;
    if (doc != null)
    {
        string text = doc.GetText(0, doc.Length);
        int wordCount = text.Split(new[] { ' ', '\n', '\r' }, 
                                    StringSplitOptions.RemoveEmptyEntries).Length;
        Console.WriteLine($"Word count: {wordCount}");
    }
}
```

## Customizing selection highlight color

The highlight color of text selections can be customized by specifying an ARGB value for `SelectionBrush`.

```xml
<RichTextEditor SelectionBrush="#ffff529e">
```

## Components

The Avalonia rich text editor consists of three components:

1. `RichTextEditor`: Interactive editing control that renders a document and allows users to type, select, format, undo/redo, etc.
2. `FlowDocumentView`: Read-only viewer that displays a document without editing capabilities.
3. `FlowDocument`: Document model that organizes rich text content into [blocks](#block-elements).

### RichTextEditor properties

These properties are used by the `RichTextEditor` component.

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `AcceptsReturn` | `bool`| Determines whether the editor accepts return key input. | `true` |
| `AcceptsTab` | `bool` | Determines whether the editor accepts tab key input. | `true` |
| `CaretBrush` | `IBrush` | Color of the caret (text cursor).| None |
| `Document` | `FlowDocument` | Selects the document to display and edit. | None |
| `IsReadOnly` | `bool` | Determines whether the editor is read-only. | `false` |
| `SelectionBrush` | `IBrush` | Color of text selections. | None |
| `Toolbar` | `EditorToolbar` | Customizes toolbar design and layout. | `Null` |
| `ShowBlockAdorners` | `bool` | Determines whether block adorner decorations are displayed. | `true` |
| `ShowPageBounds` | `bool` | Determines whether page boundary indicators are displayed. | `false` |
| `ShowToolbar` | `bool` | Determines whether the toolbar is visible. | `true` |
| `UndoLimit` | `int` | Maximum number of operations to retain for undo actions. | 100 |

### FlowDocument properties

These properties are used by the `FlowDocument` component.

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `Background` | `IBrush` | Color of the document's background, as an ARGB value. | `Null` |
| `FontFamily` | `FontFamily ` | Font family for text in the document. | `Null` |
| `FontSize` | `double` | Font size for text in the document. | 12 |
| `FontStretch` | `FontStretch` | Font stretch for text in the document, e.g., `Normal`, `Condensed`, `Expanded`. | `Normal` |
| `FontStyle` | `FontStyle` | Font style for text in the document, e.g., `Normal`, `Italic`, `Oblique`. | `Null` |
| `FontWeight` | `FontWeight` | Font weight for text in the document, e.g., `Normal`, `Bold`. | `Normal` |
| `Foreground` | `IBrush` | Color of the document's foreground, as an ARGB value. | `Null` |
| `PageHeight` | `double` | Height of the page. | `double.NaN` |
| `PagePadding` | `Thickness` | Inner spacing between the block's borders and its content. | `Null` |
| `PageWidth` | `double` | Width of the page. | `double.NaN` |
| `TextAlignment` | `TextAlignment` | Alignment of text in the document, i.e., `Left`, `Center`, `Right`, `Justify`. | `Null` |

## Block elements

Block elements are used by `FlowDocument` to build the document model and organize content.

| Element | Description |
| --- | --- |
| `Block` | Abstract base class for block elements. |
| `BlockUIContainer` | Wrapper to embed UI elements as blocks. |
| `List` | Displays a bulleted or numbered list. |
| `ListItem` | Individual item in a `List`. |
| `Paragraph` | Basic block element that contains rich text content. |
| `Section` | Block element that groups other block elements. |
| `Table` | Displays a table. |
| `TableCell` | Individual cell in a `Table`. |
| `TableColumn` | A column of cells in a `Table`. |
| `TableRow` | A row of cells in a `Table`. |
| `TableRowGroup` | A group of rows in a `Table`. |

### Properties

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `Background` | `IBrush` | Color of the block's background, as an ARGB value. | `Null` |
| `BorderBrush`| `IBrush` | Color of the block's borders, as an ARGB value. | `Null` |
| `BorderThickness` | `Thickness` | Thickness of the block's borders. | `Null` |
| `CellSpacing` | `double` | Used by `Table`. The spacing between table cells. | 0 |
| `Child` | `Control` | Used by `BlockUIContainer`. Defines the control to be placed in the block. | `Null` |
| `ColumnSpan` | `int` | Used by `TableCell`. The number of columns the cell spans. | 1 |
| `CornerRadius ` | `CornerRadius` | The radius applied to the block's corners. | `Null` |
| `FlowDirection` | `FlowDirection` | Direction of text flow, i.e., `LeftToRight` or `RightToLeft`. | `Null` |
| `FontFamily` | `FontFamily ` | Font family for text in the block. | `Null` |
| `FontFeatures` | `FontFeatureCollection` | A collection of font features applied to text in the block. |
| `FontSize` | `double` | Font size for text in the block. | 12 |
| `FontStretch` | `FontStretch` | Font stretch for text in the block, e.g., `Normal`, `Condensed`, `Expanded`. | `Normal` |
| `FontStyle` | `FontStyle` | Font style for text in the block, e.g., `Normal`, `Italic`, `Oblique`. | `Null` |
| `FontWeight` | `FontWeight` | Font weight for text in the block, e.g., `Normal`, `Bold`. | `Normal` |
| `Foreground` | `IBrush` | Color of the block's foreground, as an ARGB value. | `Null` |
| `LetterSpacing` | `double` | Additional horizontal spacing between characters. The default of 0 indicates normal spacing. | 0 |
| `LineHeight` | `double` | Height of each line of text in the block. | `double.NaN` |
| `Margin` | `Thickness` | Outer spacing around the block element. | `Null` |
| `MarkerOffset` | `double` | Used by `List`. Determines the spacing after a list marker. | `double.NaN` |
| `MarkerStyle` | `MarkerStyle` | Used by `List`. Selects the style of the list marker, e.g., `Disc`, `Decimal`, `LowerAlpha`. | `Null` |
| `Padding` | `Thickness` | Inner spacing between the block's borders and its content. | `Null` |
| `RowSpan` | `int` | Used by `TableCell`. The number of rows the cell spans. | 1 |
| `StartIndex` | `int` | Used by `List`. Specifies the starting index for numbered lists. | 1 |
| `TabStopPositions` | `double` | Positions of tab stops for text in the block. | `double.NaN` |
| `TextAlignment` | `TextAlignment` | Alignment of text in the block, i.e., `Left`, `Center`, `Right`, `Justify`. | `Null` |
| `TextDecorations` | `TextDecorations` | Decorative elements applied to text in the block, e.g., `Underline`, `Overline`, `Strikethrough`. |
| `TextIndent` | `double` | Width of indentation before the first line of text. Negative value can be set to create a handing indent. | `double.NaN` |

## Inline elements

Inline elements are used to specify content styles within a block.

| Element | Description |
| --- | --- |
| `RichBold` | Indicates bolded text. Overrides global `FontWeight` property. |
| `RichHyperlink` | Marks an inline hyperlink. |
| `RichInline` | Abstract base class for inline elements. |
| `RichInlineUIContainer` | Wrapper to embed UI elements within text flow. |
| `RichItalic` | Indicates italicized text. Overrides global `FontStyle` property. |
| `RichLineBreak` | Forces a line break. |
| `RichRun`| Basic text run. Allows character-level formatting. Text content is defined by the [`Text` property](#properties-1). |
| `RichSpan` | Inline element that groups other inline elements. |
| `RichSubscript` | Indicates subscript text. Sets `BaselineAlignment` property to `Subscript`.  |
| `RichSuperScript` | Indicates superscript text. Sets `BaselineAlignment` property to `Superscript`. |
| `RichUnderline` | Indicates underlined text. Overrides global `TextDecorations` property. |

### Properties

| Property | Type | Used by | Description |
| --- | --- | --- | --- |
| `Child` | `Control` | `RichInlineUIContainer` | Defines the control to be placed in the inline container. |
| `IsVisited` | `bool` | `RichHyperlink` | Whether the hyperlink has been visited. |
| `NavigateURI` | `Uri` | `RichHyperlink` | The URI to navigate to when hyperlink is clicked. |
| `Text` | `string` | `RichRun` | Gets or sets the text content. Reads/writes to the attached `TextDocument`. If unattached, uses local storage. |
| `Tooltip` | `object` | `RichHyperlink` | Tooltip associated with the hyperlink. |

### RichHyperlink pseudoclasses

`RichHyperlink` sets the following pseudoclasses when the hyperlink text undergoes a state change.

- `:pointerover`: When the pointer is detected stopping over the hyperlink.
- `:pressed`: When the hyperlink is clicked.
- `:visited`: After the hyperlink has been clicked at least once.

## Architecture

The Avalonia rich text editor separates functions into an eight-layer architecture.

| Layer | Name | Description | Key components |
| --- | --- | --- | --- |
| 1 | Document model | Core data storage of text context and document hierarchy. Uses a rope data structure for efficient storage and operations. | `TextDocument`, `TextDocumentNode`, `RopeTextStore`, `RopeSnapshot` |
| 2 | Text pointer API | Position tracking and navigation within documents. | `TextPointer`, `TextRange`, `LogicalDirection` |
| 3 | Rendering | Visual representation, coordinate mapping, hit testing, line queries. | `ITextView`, `FlowDocumentView`, `ITextLine`, `DocumentNodes` |
| 4 | Editing | Handles user input from keyboard, mouse, or other devices. | `TextSelection`, `TextEditorTyping`, `TextEditorKeyboard`, `TextEditorMouse`, `CaretElement` |
| 5 | Highlighting | Visual effects for highlighting, used in selections, annotations, find/replace, etc. | `IHighlightLayer`, `HighlightLayerBase`, `SelectionHighlightLayer` |
| 6 | Undo/Redo | Stores operation history to allow reversals. | `IUndoManager`, `UndoManager` |
| 7 | RTF serialization | Import and export RTF documents. | `IDocumentSerializer`, `RtfSerializer`, `DocumentSnapshot`, `FlowDocumentBuilder` |
| 8 | User-facing control | Integration of all layers into a templated Avalonia control. | `RichTextEditor`, `FlowDocument`, `Block` elements, `Inline` elements |

## Sample projects

- [Sandbox](https://github.com/AvaloniaUI/Avalonia.Controls.RichTextEditor/tree/main/samples/Sandbox)
- [Debugger](https://github.com/AvaloniaUI/Avalonia.Controls.RichTextEditor/tree/main/samples/RichTextEditor.Debugger)

## See also

- [Troubleshooting](/troubleshooting/controls/richtexteditor)