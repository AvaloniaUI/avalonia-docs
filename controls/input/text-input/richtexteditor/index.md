---
id: index
title: RichTextEditor control
doc-type: reference
tags:
 - avalonia pro
 - avalonia enterprise
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`Avalonia.Controls.RichTextEditor` is a rich text editing solution for Avalonia applications, offering functionalities for interactive text editing, document architecture and file serialization.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## When to use

Use `RichTextEditor` to create an area where users can edit text content and perform common text operations, such as formatting, aligning, highlighting, or undo/redo.

## Getting started

1. Install the `Avalonia.Controls.RichTextEditor` NuGet package by running `dotnet add package`. Optionally, install serializers for specific file formats you need.

```bash
# Core editor control and document model, includes plain text serialization
dotnet add package Avalonia.Controls.RichTextEditor

# Serializers (add only what you need)
dotnet add package Avalonia.Controls.Documents.Serialization.Rtf     # RTF support
dotnet add package Avalonia.Controls.Documents.Serialization.Docx    # DOCX (Open XML) support
dotnet add package Avalonia.Controls.Documents.Serialization.Xaml    # XAML serialization
dotnet add package Avalonia.Controls.Documents.Serialization.Html    # HTML import (read only)
dotnet add package Avalonia.Controls.Documents.Serialization.Pdf     # PDF export (write only)
dotnet add package Avalonia.Controls.Markdown                        # Markdown viewer and serializer
```

2. Include your Avalonia license key in the executable project file (`.csproj`). Your license key is available from the [Avalonia portal](https://portal.avaloniaui.net).

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

:::tip
For multi-project solutions, you can store your licence key in an [environment variable](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-environment-variables-in-a-build) or a [shared props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022#directorybuildprops-example) to avoid duplication.
:::

3. Reference the `RichTextEditor` default theme via a `StyleInclude` in your `App.axaml` file. This adds the resources needed to render the control.

```xml
<Application.Styles>
   <StyleInclude Source="avares://Avalonia.Controls.RichTextEditor/Themes/Default.axaml" />
   <!-- other styles -->
</Application.Styles>
```

For more information on installing Avalonia Pro controls, see [Installing Avalonia Pro](/tools/installing-avalonia-pro).

## Basic usage

Use this setup to get started with a basic implementation of the rich text editor.

<Tabs>
<TabItem value="xaml" label="XAML">

    ```xml
    <Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="My Rich Text Editor" 
        Width="800" Height="600">
    
    <RichTextEditor x:Name="Editor">
        <RichTextEditor.Document>
            <FlowDocument>
                <Paragraph>
                    <RichRun Text="Welcome to " />
                    <RichBold>
                        <RichRun Text="RichTextEditor" />
                    </RichBold>
                    <RichRun Text="!" />
                </Paragraph>
            </FlowDocument>
        </RichTextEditor.Document>
    </RichTextEditor>
    
    </Window>
    ```
    
</TabItem>

<TabItem value="csharp" label="Code-behind">

  ```csharp
  using Avalonia.Controls;
  using Avalonia.Controls.Documents;

  public partial class MainWindow : Window
  {
      public MainWindow()
      {
          InitializeComponent();
          
          var editor = this.FindControl<RichTextEditor>("Editor");

          // Undo/redo is ready to use: the editor creates an UndoManager
          // automatically when a Document is attached. UndoManager is the
          // single sealed implementation, and editor.UndoManager is typed
          // UndoManager?. To change the limit:
          // editor.UndoLimit = 50;
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
  paragraph.Inlines.Add(new RichRun("Hello "));
  paragraph.Inlines.Add(new RichBold(new RichRun("World")));
  paragraph.Inlines.Add(new RichRun("!"));
  document.Blocks.Add(paragraph);
  
  editor.Document = document;
  ```

</TabItem>

<TabItem value="insert" label="Insert text">

  ```csharp
  // FlowDocument.TextDocument creates the backing store on first read,
  // so it is never null.
  var doc = editor.Document.TextDocument;

  // Insert at start
  doc.ContentStart.InsertText("Header: ");

  // Insert at end
  doc.ContentEnd.InsertText("\n\nFooter");
  ```

</TabItem>

<TabItem value="formatting" label="Format selected text">

  ```csharp
  var doc = editor.Document.TextDocument;
  var range = new TextRange(doc.ContentStart, doc.ContentStart.GetPositionAtOffset(10));

  range.ApplyPropertyValue(RichTextElement.ForegroundProperty, Brushes.Red);
  range.ApplyPropertyValue(RichTextElement.FontSizeProperty, 20.0);
  ```

</TabItem>
</Tabs>

## Loading and saving files

Load and Save accept an `IDocumentSerializer` instance. Each format lives in its own package.

```csharp
using Avalonia.Controls.Documents.Serialization.Rtf;

// Load RTF, keeping the parse off the UI thread
await using (var stream = File.OpenRead("document.rtf"))
{
    await editor.LoadAsync(stream, new RtfSerializer());
}

// Save RTF, keeping the write off the UI thread
await using (var stream = File.Create("output.rtf"))
{
    await editor.SaveAsync(stream, new RtfSerializer());
}
```

Synchronous overloads are also available, and run the whole cost on the calling thread:

```csharp
editor.Load(stream, new RtfSerializer());
editor.Save(stream, new RtfSerializer());
```

:::info
`IDocumentSerializer` is synchronous: `Serialize` and `Deserialize` are the whole contract. No format here performs asynchronous I/O, so `LoadAsync` and `SaveAsync` are thread-offload conveniences that wrap the synchronous call in `Task.Run` rather than asynchronous I/O. `LoadAsync` parses on the thread pool and then builds the element tree on the UI thread, because a `FlowDocument` and its elements belong to the dispatcher of the thread that constructed them.
:::

Available serializers:

| Serializer | Package | Extension | Direction |
|---|---|---|---|
| `RtfSerializer` | `Avalonia.Controls.Documents.Serialization.Rtf` | `.rtf` | Read and write |
| `DocxSerializer` | `Avalonia.Controls.Documents.Serialization.Docx` | `.docx` | Read and write |
| `XamlSerializer` | `Avalonia.Controls.Documents.Serialization.Xaml` | `.xaml` | Read and write |
| `MarkdownSerializer` | `Avalonia.Controls.Markdown` | `.md` | Read and write |
| `HtmlSerializer` | `Avalonia.Controls.Documents.Serialization.Html` | `.html` | Read only (`CanWrite` is `false`) |
| `PdfSerializer` | `Avalonia.Controls.Documents.Serialization.Pdf` | `.pdf` | Write only (`CanRead` is `false`) |
| `PlainTextSerializer` | `Avalonia.Controls.Documents` (core) | `.txt` | Read and write |

`CanRead` and `CanWrite` report the direction on every serializer, so a format picker can filter the list instead of catching an exception. `PdfSerializer` is the supported route to paper.

### Loading a document without an editor

`FlowDocument.Load` and `FlowDocument.LoadAsync` create a document directly from a stream, useful for preview or conversion scenarios. Both take an optional `CancellationToken`:

```csharp
await using var stream = File.OpenRead("document.rtf");
var document = await FlowDocument.LoadAsync(stream, new RtfSerializer(), cancellationToken);
```

To load with no UI thread involved at all, skip the element facade: read a `DocumentSnapshot` with the serializer and materialize it with `TextDocument.FromSnapshot`, which carries the whole document and has no thread affinity.

## Adding a word counter

You can create an event that returns a word count. In this example, we add a continuous word counter that updates when the text changes.

```csharp
editor.ContentChanged += (sender, args) =>
{
    Console.WriteLine("Document changed");
    UpdateWordCount();
};

void UpdateWordCount()
{
    string? text = editor.Document.ContentRange?.GetText();
    if (text != null)
    {
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

The Avalonia rich text editor consists of four components:

1. `RichTextEditor`: Interactive editing control that renders a document and allows users to type, select, format, undo/redo, etc.
2. `FlowDocumentScrollViewer`: Read-only viewer that displays a document as one continuous column, without editing capabilities.
3. `FlowDocumentPageViewer`: Read-only viewer that displays a document as discrete page sheets, the way a word processor's print layout does. It derives from `FlowDocumentScrollViewer`.
4. `FlowDocument`: Document model that organizes rich text content into [blocks](#block-elements).

A document also owns two kinds of nested document, each a `FlowDocument` in its own right: page bands (running headers and footers, in `FlowDocument.PageBands`) and footnotes (in `FlowDocument.Footnotes`). One editor retargets to whichever of them the caret is in; there is no nested `RichTextEditor`.

### RichTextEditor properties

These properties are used by the `RichTextEditor` component.

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `AcceptsReturn` | `bool`| Determines whether the editor accepts return key input. | `true` |
| `AcceptsTab` | `bool` | Determines whether the editor accepts tab key input. | `true` |
| `CaretBrush` | `IBrush?` | Color of the caret (text cursor).| None |
| `Document` | `FlowDocument` | Selects the document to display and edit. | A new empty `FlowDocument` |
| `IsReadOnly` | `bool` | Determines whether the editor is read-only. | `false` |
| `PageBandDistance` | `double` | Distance from the sheet edge to a running header or footer. Writes through to the document, which owns the value. | 12.5 mm |
| `PageGap` | `double` | Gap between page sheets in page layout. | 24 |
| `PageMargins` | `Thickness?` | Page margins used in page layout. Falls back to the document's `PagePadding`. | `null` |
| `PageSize` | `Size?` | Page size used in page layout. Falls back to the document's page dimensions, then A4. | `null` |
| `SelectionBrush` | `IBrush?` | Color of text selections. | None |
| `SelectionFlyout` | `EditorSelectionFlyout?` | Mini toolbar shown above a selection. Set to `null` to remove it. | `null`; the default theme supplies one |
| `ShowBlockAdorners` | `bool` | Determines whether block adorner decorations are displayed. | `true` |
| `ShowPageBandsInContinuousLayout` | `bool` | Shows the running header above the first block and the running footer below the last, in continuous layout. It has no effect in page layout, where the bands render on every sheet. | `false` |
| `ShowPageBounds` | `bool` | Determines whether page boundary indicators are displayed. | `false` |
| `ShowSelectionFlyout` | `bool` | Show or hide the selection flyout without replacing it. | `true` |
| `ShowToolbar` | `bool` | Determines whether the toolbar is visible. | `true` |
| `Toolbar` | `EditorToolbar?` | Customizes toolbar design and layout. | `null`; the default theme supplies one |
| `UndoLimit` | `int` | Maximum number of operations to retain for undo actions. | 100 |
| `ViewMode` | `DocumentViewMode` | `Continuous` for one flowing column, `PageLayout` for discrete page sheets. | `Continuous` |

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
| `FootnoteNumberFormat` | `FootnoteNumberFormat` | Numbering used for footnote anchors, e.g., `Decimal`, `LowerRoman`, `Symbols`. | `Decimal` |
| `Foreground` | `IBrush` | Color of the document's foreground, as an ARGB value. | `Null` |
| `PageBandDistance` | `double` | Distance from the sheet edge to a running header or footer. `NaN` means the document declares none and the default applies. | `double.NaN` |
| `PageHeight` | `double` | Height of the page. | `double.NaN` |
| `PagePadding` | `Thickness` | Inner spacing between the block's borders and its content. | `Null` |
| `PageWidth` | `double` | Width of the page. | `double.NaN` |
| `TextAlignment` | `TextAlignment` | Alignment of text in the document, i.e., `Left`, `Center`, `Right`, `Justify`. | `Null` |

`FlowDocument` also owns two collections of nested documents: `PageBands` (running headers and footers) and `Footnotes`. Both survive a snapshot round trip and join their undo to the owning document's, so they are present whether or not any element is realized.

## Block elements

Block elements are used by `FlowDocument` to build the document model and organize content.

| Element | Description |
| --- | --- |
| `Block` | Abstract base class for block elements. |
| `BlockUIContainer` | Wrapper to embed UI elements as blocks. |
| `List` | Displays a bulleted or numbered list. |
| `ListItem` | Individual item in a `List`. |
| `Paragraph` | Basic block element that contains rich text content. |
| `Section` | Block element that groups other block elements. Carries its own `PageWidth`, `PageHeight` and `PagePadding`, so page setup can vary per section. |
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
| `BreakPageBefore` | `bool` | Starts the block on a new page in paged layout, print and PDF export. Ctrl+Enter sets it. | `false` |
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
| `Height` | `double` | Used by `TableRow`. Minimum row height. Zero sizes the row to its content. | 0 |
| `InsideBorderBrush` | `IBrush?` | Used by `Table`. Color of the interior gridlines between cells. | `Null` |
| `InsideBorderThickness` | `double` | Used by `Table`. Thickness of the interior gridlines between cells. | 0 |
| `KeepTogether` | `bool` | Keeps the whole block on one page rather than splitting it across a page break. | `false` |
| `KeepWithNext` | `bool` | Keeps the block on the same page as the block that follows it. | `false` |
| `LetterSpacing` | `double` | Additional horizontal spacing between characters. The default of 0 indicates normal spacing. | 0 |
| `LineHeight` | `double` | Height of each line of text in the block. | `double.NaN` |
| `Margin` | `Thickness` | Outer spacing around the block element. | `Null` |
| `MarkerAlignment` | `TextAlignment` | Used by `List`. Aligns the marker within its column, `Left` or `Right`. | `Left` |
| `MarkerOffset` | `double` | Used by `List`. Determines the spacing after a list marker. | `double.NaN` |
| `MarkerStyle` | `TextMarkerStyle` | Used by `List`. Selects the style of the list marker, e.g., `Disc`, `Decimal`, `LowerLatin`. | `Null` |
| `Padding` | `Thickness` | Inner spacing between the block's borders and its content. | `Null` |
| `RowSpan` | `int` | Used by `TableCell`. The number of rows the cell spans. | 1 |
| `StartIndex` | `int` | Used by `List`. Specifies the starting index for numbered lists. | 1 |
| `TabStopPositions` | `IReadOnlyList<double>?` | Positions of tab stops for text in the block. | `Null` |
| `TextAlignment` | `TextAlignment` | Alignment of text in the block, i.e., `Left`, `Center`, `Right`, `Justify`. | `Null` |
| `TextDecorations` | `TextDecorations` | Decorative elements applied to text in the block, e.g., `Underline`, `Overline`, `Strikethrough`. |
| `TextIndent` | `double` | Width of indentation before the first line of text. Negative value can be set to create a handing indent. | `double.NaN` |
| `VerticalAlignment` | `VerticalAlignment` | Used by `TableCell`. Aligns the cell's content within the row height, `Top`, `Center` or `Bottom`. | `Top` |
| `WidowControl` | `bool` | Used by `Paragraph`. Keeps at least two lines of the paragraph on each side of a page break. | `true` |

## Inline elements

Inline elements are used to specify content styles within a block.

| Element | Description |
| --- | --- |
| `RichBold` | Indicates bolded text. Overrides global `FontWeight` property. |
| `RichFootnoteCitation` | A further citation of a note whose anchor is elsewhere. Paired with a `Footnote` by `NoteId`. |
| `RichFootnoteReference` | Atomic anchor for a footnote, paired with a `Footnote` in `FlowDocument.Footnotes` by `NoteId`. |
| `RichHyperlink` | Marks an inline hyperlink. |
| `RichImage` | Inline image. Content comes from a `RichImageSource`; occupies a single object replacement character. |
| `RichInline` | Abstract base class for inline elements. |
| `RichInlineUIContainer` | Wrapper to embed UI elements within text flow. |
| `RichItalic` | Indicates italicized text. Overrides global `FontStyle` property. |
| `RichLineBreak` | Forces a line break. |
| `RichPageNumberField` | Page number field, `CurrentPage` or `PageCount`. Stores no number: the value comes from pagination, so one header band renders a different one per page. |
| `RichRun`| Basic text run. Allows character-level formatting. Text content is defined by the [`Text` property](#properties-1). |
| `RichSpan` | Inline element that groups other inline elements. |
| `RichSubscript` | Indicates subscript text. Sets `BaselineAlignment` property to `Subscript`.  |
| `RichSuperscript` | Indicates superscript text. Sets `BaselineAlignment` property to `Superscript`. |
| `RichUnderline` | Indicates underlined text. Overrides global `TextDecorations` property. |

### Properties

| Property | Type | Used by | Description |
| --- | --- | --- | --- |
| `AltText` | `string?` | `RichImage` | Alternative text for the image. |
| `Child` | `Control` | `RichInlineUIContainer` | Defines the control to be placed in the inline container. |
| `Height` | `double` | `RichImage` | Display height in device-independent pixels. Unset uses the image's intrinsic height. |
| `IsVisited` | `bool` | `RichHyperlink` | Whether the hyperlink has been visited. |
| `Kind` | `PageNumberFieldKind` | `RichPageNumberField` | `CurrentPage` or `PageCount`. |
| `NavigateUri` | `Uri?` | `RichHyperlink` | The URI to navigate to when hyperlink is clicked. |
| `NoteId` | `int` | `RichFootnoteReference`, `RichFootnoteCitation` | Pairs the anchor with its `Footnote`. |
| `Source` | `RichImageSource?` | `RichImage` | The image content. `EmbeddedImageSource`, `DeferredImageSource` or `PixelImageSource`. |
| `Text` | `string` | `RichRun` | Gets or sets the text content. Reads/writes to the attached `TextDocument`. If unattached, uses local storage. |
| `ToolTip` | `object?` | `RichHyperlink` | Tooltip associated with the hyperlink. |
| `UnderlineStyle` | `UnderlineStyle?` | All inlines | The underline variant, e.g., `Single`, `Double`, `Dotted`, `Wave`. Inherited. |
| `Width` | `double` | `RichImage` | Display width in device-independent pixels. Unset uses the image's intrinsic width. |

### RichHyperlink pseudoclasses

`RichHyperlink` sets the following pseudoclasses when the hyperlink text undergoes a state change.

- `:pointerover`: When the pointer is detected stopping over the hyperlink.
- `:pressed`: When the hyperlink is clicked.
- `:visited`: After the hyperlink has been clicked at least once.

## Architecture

The Avalonia rich text editor separates functions into an eight-layer architecture.

| Layer | Name | Description | Key components |
| --- | --- | --- | --- |
| 1 | Document model | Core data storage of text context and document hierarchy. Uses a rope data structure for efficient storage and operations. | `TextDocument`, `FlowDocument` |
| 2 | Text pointer API | Position tracking and navigation within documents. `TextRange` owns positional mutation. | `TextPointer`, `TextRange`, `LogicalDirection` |
| 3 | Rendering | Visual representation, coordinate mapping, hit testing, line queries. `TextViewBase` is abstract and `PagedTextView` is sealed; extend a view with a component or a highlight layer rather than by subclassing it. | `ITextView`, `TextViewBase`, `InteractiveTextView`, `PagedTextView`, `ITextLine`, `DocumentNode` |
| 4 | Editing | Handles user input from keyboard, mouse, or other devices. | `TextSelection`, `TextViewKeyboard`, `TextViewMouse`, `TextEditorKeyboard`, `CaretElement` |
| 5 | Highlighting | Visual effects for highlighting, used in selections, annotations, find/replace, etc. | `IHighlightLayer`, `HighlightLayerBase`, `HighlightLayerCollection`, `SelectionHighlightLayer` |
| 6 | Undo/Redo | Stores operation history to allow reversals. `UndoManager` is the single sealed implementation; there is no undo interface to substitute. | `UndoManager`, `IUndoUnit`, `IUndoScope`, `SelectionSnapshot` |
| 7 | Serialization | Import and export documents in multiple formats (RTF, DOCX, XAML, HTML, Markdown, PDF, plain text). Serializers are synchronous and UI-free. | `IDocumentSerializer`, `DocumentSnapshot`, `DocumentSnapshotBuilder` |
| 8 | User-facing control | Integration of all layers into a templated Avalonia control. | `RichTextEditor`, `FlowDocumentScrollViewer`, `FlowDocumentPageViewer`, `FlowDocument`, block and inline elements |

## See also

- [Document Viewer](/controls/input/text-input/richtexteditor/document-viewer) — read-only `FlowDocumentScrollViewer` setup
- [Toolbar and Selection Flyouts](/controls/input/text-input/richtexteditor/toolbar) — customizing the toolbar, mini-bar, and context menu
- [Extension Patterns](/controls/input/text-input/richtexteditor/extension-patterns) — custom nodes, highlight layers, serializers, components
- [Performance Tuning](/controls/input/text-input/richtexteditor/performance-tuning)
- [Thread Safety](/controls/input/text-input/richtexteditor/thread-safety)
- [Troubleshooting](/troubleshooting/controls/richtexteditor)