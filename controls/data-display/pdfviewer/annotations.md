---
id: annotations
title: Annotations, forms and redaction
description: Use the PdfViewer annotation tools in Avalonia, including text markup, drawing, shapes, sticky notes, stamps, links, redaction, form filling and undo/redo.
doc-type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

Users pick a tool from the toolbar and draw on the page. Every edit takes part in undo and redo, and is written to the file on save.

Annotation methods take 0-based page indexes and PDF page coordinates: the origin is the bottom-left corner of the page and the unit is the PDF point (1/72 inch).

## Tools

`ActiveTool` is the tool the next pointer gesture applies. The built-in toolbar reads and writes the same property, so your own controls can arm any tool even with the toolbar hidden. `SetToolCommand` sets it from a command parameter, either the `PdfViewerTool` value or its name. `ActiveTool` stays `None` while `CanEditAnnotations` is `false`.

| `PdfViewerTool` | Gesture | Result |
|---|---|---|
| `Highlight`, `Underline`, `Strikeout`, `Squiggly` | Drag across text | A text markup annotation in the tool's colour. |
| `Redact` | Drag across text | Removes the covered content from the page. See [Redaction](#redaction). |
| `Draw` | Drag freehand | An ink annotation with `DrawStrokeColor` and `DrawStrokeWidth`. |
| `Shape` | Drag a box | The shape in `SelectedShapeType`: `Line`, `Arrow`, `Rectangle`, `Circle`, `Polygon`, `Star` or `Text`. A rectangle when none is set. |
| `Text` | Click or drag | A text box with the `TextAnnotation*` typography. |
| `Note` | Click | A sticky note with an in-place editor and colour swatches. |
| `Link` | Drag a box | A link annotation. A dialog asks for the URL. |
| `Stamp` | Click | A rubber stamp from the toolbar dropdown. See [Stamps](#stamps). |
| `None` | Click or drag an annotation | Select, move, resize, restyle, copy, paste and delete existing annotations. |

```xml
<pdf:PdfViewer x:Name="Viewer" ActiveTool="Highlight" />

<Button Content="Draw"
        Command="{Binding #Viewer.SetToolCommand}"
        CommandParameter="Draw" />
```

Annotations created in other applications such as Acrobat or Preview can be edited too. They keep their author, dates, subject, opacity and flags, and shapes keep their own appearance, such as dashed or cloudy borders, when moved or resized.

### Tool visibility

Each tool has its own visibility property, so you can offer a subset of the toolbar.

| Property | Tool |
|---|---|
| `IsHighlightToolVisible` | Highlight |
| `IsUnderlineToolVisible` | Underline |
| `IsStrikethroughToolVisible` | Strikeout |
| `IsSquigglyToolVisible` | Squiggly |
| `IsRedactToolVisible` | Redact |
| `IsDrawToolVisible` | Draw |
| `IsShapeToolVisible` | Shape |
| `IsTextToolVisible` | Text box |
| `IsNoteToolVisible` | Sticky note |
| `IsLinkToolVisible` | Link |
| `IsStampToolVisible` | Stamp |

To disable editing altogether rather than hide tools, use `IsReadOnly` or `AllowAnnotationEditing`. See [Document permissions](loading-and-saving.md#document-permissions).

## Markup from a selection

Selecting text shows a context menu with the markup tools. The same operations are available from code and apply to the current selection. Each returns the new annotation's index on the page, or `-1` on failure. Colours are `PdfAnnotationColor` values with `R`, `G`, `B` and `A` byte components.

| Method | Description |
|---|---|
| `HighlightSelectionAsync(PdfAnnotationColor? color = null)` | Highlights the selection. |
| `UnderlineSelectionAsync(PdfAnnotationColor? color = null)` | Underlines the selection. |
| `StrikeoutSelectionAsync(PdfAnnotationColor? color = null)` | Strikes out the selection. |
| `SquigglySelectionAsync(PdfAnnotationColor? color = null)` | Adds a squiggly underline to the selection. |
| `RedactSelectionAsync(PdfAnnotationColor? color = null)` | Redacts the selection. |

When `color` is `null`, the matching colour property (`HighlightColor` and so on) is used.

```csharp
await Viewer.HighlightSelectionAsync();
await Viewer.UnderlineSelectionAsync(new PdfAnnotationColor(0, 0, 255, 255));
```

## Sticky notes

| Method | Description |
|---|---|
| `AddStickyNoteAsync(int pageIndex, double pdfX, double pdfY, string text, PdfAnnotationColor? color = null)` | Adds a sticky note at a PDF-space position. Returns the annotation index, or `-1`. |
| `UpdateStickyNoteAsync(int pageIndex, int annotIndex, string? text, PdfAnnotationColor? color)` | Changes a note's text or colour. |
| `GetAnnotationsAsync(int pageIndex, CancellationToken)` | Lists a page's annotations as `PdfAnnotationInfo` items, with `AnnotationIndex`, `Type`, `Bounds`, `Color`, `Contents` and `Author`. |

```csharp
int index = await Viewer.AddStickyNoteAsync(0, 72, 720, "Check this figure");
await Viewer.UpdateStickyNoteAsync(0, index, "Checked", null);
```

## Stamps

The **Stamp** dropdown offers a list of labels such as **Approved**, **Draft** and **Received**, a style selector and an **Include date** toggle. Stamps are saved as standard `/Stamp` annotations, so other readers render and move them.

| Property | Type | Default | Description |
|---|---|---|---|
| `StampLabels` | `IReadOnlyList<string>` | `DefaultStampLabels` | Labels offered by the dropdown. Drawn in capitals. |
| `StampColor` | `PdfAnnotationColor?` | `null` | Colour for every stamp. `null` picks one by label: green for the built-in approval labels (Approved, Completed, Paid, Received, Reviewed, Final, For Public Release), blue for the built-in status labels (Draft, For Comment, As Is, Experimental, Departmental, Copy), and red for everything else, including your own labels. |
| `StampStyle` | `PdfStampStyle` | `Classic` | Look of new stamps: `Classic`, `Flat`, `Outline`, `Legal` or `Pill`. Kept with each stamp. |
| `IncludeStampDate` | `bool` | `false` | Adds today's date as a second line to new stamps. |
| `StampDateFormat` | `string` | `dd MMM yyyy` | .NET date format for the date line, invariant culture. |

`AddStampAsync(int pageIndex, string label, double pdfX, double pdfY, PdfAnnotationColor? color = null, PdfStampStyle? style = null, bool? includeDate = null)` adds a stamp centred on a PDF-space point. Arguments left `null` fall back to the properties above.

```csharp
Viewer.StampLabels = new[] { "Approved", "Rejected", "Paid" };
await Viewer.AddStampAsync(0, "Approved", 300, 700, includeDate: true);
```

## Shapes and text

Shapes are saved with their standard PDF subtypes (`/Square`, `/Circle`, `/Line`, `/Polygon`), so they stay editable in other readers. Text boxes are `/FreeText`. Curved lines are saved as `/Stamp`. `ShapeSubtypeMode` chooses how shapes that carry text are written.

| `PdfShapeSubtypeMode` | Description |
|---|---|
| `Auto` | Standard subtypes for shapes without text, `/Stamp` for shapes with text. This matches what macOS Preview does. |
| `Standard` | Standard subtypes for everything, text included. The text is lost if another reader edits the shape. |
| `Strict` | Standard subtypes only. Text cannot be added to shapes and lines cannot be curved. |

Non-Latin text in text boxes, shapes and stamps (Cyrillic, Greek, CJK and so on) is embedded as a font subset, so it renders the same in every reader.

### Default colours and typography

| Property | Type | Default | Description |
|---|---|---|---|
| `HighlightColor` | `PdfAnnotationColor` | Yellow, 50% alpha | Highlight colour. |
| `UnderlineColor` | `PdfAnnotationColor` | Green | Underline colour. |
| `StrikeoutColor` | `PdfAnnotationColor` | Red | Strikeout colour. |
| `SquigglyColor` | `PdfAnnotationColor` | Blue | Squiggly colour. |
| `DrawStrokeColor` | `PdfAnnotationColor` | Red | Freehand stroke colour. |
| `DrawStrokeWidth` | `float` | `2.0` | Freehand stroke width in PDF points. |
| `ShapeFillColor` | `PdfAnnotationColor?` | White | Shape fill. `null` is none. |
| `ShapeStrokeColor` | `PdfAnnotationColor?` | Black | Shape stroke. `null` is none. |
| `ShapeStrokeWidth` | `float` | `2.0` | Shape stroke width in PDF points. |
| `SelectedShapeType` | `ShapeType` | `None` | Shape drawn by the `Shape` tool. |
| `TextAnnotationFillColor` | `PdfAnnotationColor?` | `null` | Text box fill. `null` is none. |
| `TextAnnotationStrokeColor` | `PdfAnnotationColor?` | `null` | Text box border. `null` is none. |
| `TextAnnotationStrokeWidth` | `float` | `1.0` | Text box border width. |
| `TextAnnotationTextColor` | `PdfAnnotationColor` | Black | Text box text colour. |
| `TextAnnotationFont` | `string` | `Helvetica` | Text box font. |
| `TextAnnotationFontSize` | `float` | `12` | Text box font size. |
| `TextAnnotationFontAttributes` | `FontAttributes` | `None` | Bold, italic and similar attributes. |
| `TextAnnotationTextAlign` | `TextAnnotationAlignment` | `Center` | Text box alignment. |
| `NoteColor` | `PdfAnnotationColor` | Yellow | Sticky note colour. |

The toolbar's colour picker writes to the same properties.

## Redaction

The `Redact` tool and `RedactSelectionAsync` remove content rather than cover it. The redacted characters are removed from the page, along with images under the area. Vector paths and form XObjects are removed only when fully covered.

With `RedactionRemovesHiddenInformation` set to `true` (the default), a redaction also removes the copies of page content a PDF can keep elsewhere: the tagged structure tree, the page's embedded thumbnail, and the document metadata (title, author, keywords). Outline titles and attachments are not touched.

Redactions are undoable while `IsRedactionUndoEnabled` is `true`. Each redaction keeps a copy of the document as it was before, so the history is bounded separately by `MaxRedactionUndoSteps`.

## Forms

Interactive form fields can be filled with the pointer and keyboard. <kbd>Tab</kbd> into the document reaches the first field on the page, <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd> move between fields with a visible focus ring, and <kbd>Esc</kbd> or tabbing past the last field leaves the form. Form edits take part in undo and redo and are written on save.

`AllowFormEditing` turns form filling off. Form filling is not available in the browser.

## Undo and redo

Annotation edits, form field edits and redactions are recorded. Bookmarks are not.

| Member | Description |
|---|---|
| `Undo()` / `Redo()` | Applies the previous or next history entry. `UndoAsync()` and `RedoAsync()` await it. |
| `CanUndo` / `CanRedo` | Whether there is an entry to apply. Bindable. |
| `UndoRedoStateChanged` | Raised when either changes. |
| `MaxUndoSteps` | Undo history depth, 0 to 1000. Default `100`. `0` disables undo and redo. |
| `MaxRedactionUndoSteps` | How many redactions stay undoable, 0 to 100. Default `10`. The most recent ones are kept. |
| `IsRedactionUndoEnabled` | Whether redactions are recorded at all. Default `true`. |

## Errors

Edits made with the pointer run in the background, so there is nothing to await. Subscribe to `AnnotationError` to be told when one fails. Its args include `Operation`, `Message` and the underlying `Exception`.

```csharp
Viewer.AnnotationError += (_, e) =>
    ShowToast($"{e.Operation} failed: {e.Message}");
```

## Output compatibility

Every annotation is saved with an appearance stream, so edits render in Acrobat, Preview, Chrome and other readers.

Editing an annotation created by another application rebuilds its appearance. Any reply chain (`/Popup`, `/IRT`) attached to it is dropped, and the annotation moves to the end of the page's annotation order.

## See also

- [PdfViewer control](index.md)
- [Loading and saving](loading-and-saving.md)
- [Navigation, zoom and search](navigation-and-search.md)
