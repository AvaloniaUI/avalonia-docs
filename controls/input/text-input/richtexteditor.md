---
id: richtexteditor
title: RichTextEditor
doc-type: reference
---

`Avalonia.Controls.RichTextEditor` is a rich text editing solution for Avalonia applications, offering functionalities for interactive text editing, document architecture and file serialization.

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

## When to use

Use `RichTextEditor` to create an area where users can edit text content and perform common rich text operations, such as format text, highlight, or undo/redo.

## Components

The Avalonia rich text editor consists of three components:

1. `RichTextEditor`: Interactive editing control that renders a document and allows users to type, select, format, undo/redo, etc.
2. `FlowDocumentView`: Read-only viewer that displays a document without editing capabilities.
3. `FlowDocument`: Document model that organizes rich text content into [blocks](#block-elements).

## Block elements

Block elements are used by `FlowDocument` to build the document model and organize content.

| Element | Description |
| --- | --- |
| `Block` | Abstract base class for `FlowDocument` block elements. |
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

Common properties used by block elements.

Some properties have `Null` or `NaN` defaults, meaning their default values are not explicitly set, but are inherited from the parent element or theme settings.

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `Background` | `IBrush` | Color of the block's background, as an ARGB value. | `Null` |
| `BorderBrush`| `IBrush` | Color of the block's borders, as an ARGB value. | `Null` |
| `BorderThickness` | `Thickness` | Thickness of the block's borders. | `Null` |
| `CellSpacing` | `double` | Used by `Table`. The spacing between table cells. | 0 |
| `ColumnSpan` | `int` | Used by `TableCell`. The number of columns the cell spans. | 1 |
| `CornerRadius ` | `CornerRadius` | The radius applied to the block's corners. | `Null` |
| `FlowDirection` | `FlowDirection` | Direction of text flow, i.e., `LeftToRight` or `RightToLeft`. | `Null` |
| `FontFamily` | `FontFamily ` | Font family for text in the block. | `Null` |
| `FontFeatures` | `FontFeatureCollection` | A collection of font features applied to text in the block. |
| `FontSize` | `double` | Font size for text in the block. | `Null` |
| `FontStretch` | `FontStretch` | Font stretch for text in the block, e.g., `Normal`, `Condensed`, `Expanded`. | `Null` |
| `FontStyle` | `FontStyle` | Font style for text in the block, e.g., `Normal`, `Italic`, `Oblique`. | `Null` |
| `FontWeight` | `FontWeight` | Font weight for text in the block, e.g., `Normal`, `Bold`. | `Null` |
| `Foreground` | `IBrush` | Color of the block's foreground, as an ARGB value. | `Null` |
| `LetterSpacing` | `double` | Additional horizontal spacing between characters. The default of 0 indicates normal spacing. | 0 |
| `LineHeight` | `double` | Height of each line of text in the block. | `Null` |
| `Margin` | `Thickness` | Outer spacing around the block element. | `Null` |
| `MarkerOffset` | `double` | Used by `List`. Determines the spacing after a list marker. | `Null` |
| `MarkerStyle` | `MarkerStyle` | Used by `List`. Selects the style of the list marker, e.g., `Disc`, `Decimal`, `LowerAlpha`. | `Null` |
| `Padding` | `Thickness` | Inner spacing between the block's borders and its content. | `Null` |
| `RowSpan` | `int` | Used by `TableCell`. The number of rows the cell spans. | 1 |
| `StartIndex` | `int` | Used by `List`. Specifies the starting index for numbered lists. | 1 |
| `TabStopPositions` | `double` | Positions of tab stops for text in the block. | `Null` |
| `TextAlignment` | `TextAlignment` | Alignment of text in the block, i.e., `Left`, `Center`, `Right`, `Justify`. | `Null` |
| `TextIndent` | `double` | Width of indentation before the first line of text. Negative value can be set to create a handing indent. | `Null` |

## Inline elements

Inline elements are used to specify content styles within a block.

| Element | Description |
| --- | --- |
| `RichBold` | Indicates bolded text. |
| `RichHyperlink` |
| `RichInline` |
| `RichItalic` | Indicates italicized text. |
| `RichLineBreak` |
| `RichRun`| Terminal element in text flow hierarchy, containing a continuous run of unicode characters. Uses the `Text` property to read and write to an attached `TextDocument`. |
| `RichSpan` |
| `RichSubscript` |
| `RichSuperScript` |
| `RichUnderline` | Indicates underlined text. |

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
| 7 | RTF serialization | Import and export Rich Text Format (RTF) documents. | `IDocumentSerializer`, `RtfSerializer`, `DocumentSnapshot`, `FlowDocumentBuilder` |
| 8 | User-facing control | Integration of all layers into a templated Avalonia control. | `RichTextEditor`, `FlowDocument`, `Block` elements, `Inline` elements |

## Samples

- [Sandbox](https://github.com/AvaloniaUI/Avalonia.Controls.RichTextEditor/tree/main/samples/Sandbox)
- [Debugger](https://github.com/AvaloniaUI/Avalonia.Controls.RichTextEditor/tree/main/samples/RichTextEditor.Debugger)