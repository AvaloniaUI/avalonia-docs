---
id: annotations
title: Annotations, forms and redaction
description: How to use the PdfViewer annotation tools in Avalonia, including text markup, drawing, shapes, sticky notes, stamps, links, redaction, form filling and undo/redo.
doc-type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

`PdfViewer` offers tools that allow users to add new content on a PDF document, such as highlighting, shape drawing and redaction. Edits made with these tools are part of the undo/redo history. They are written to the file on save.

## Editing tools

The tools listed in the table below are included with `PdfViewer` and are accessed from the built-in toolbar. The currently active tool is `ActiveTool`. This value is always `None` while `CanEditAnnotations` is `false`.

| `PdfViewerTool` | Gesture | Result |
|---|---|---|
| `Highlight`, `Underline`, `Strikeout`, `Squiggly` | Drag across text | Text markup annotation in the tool's color. |
| `Redact` | Drag across text | Removes the covered content from the page. See [Redaction](#redaction). |
| `Draw` | Drag freehand | Ink annotation. Appearance defined by `DrawStrokeColor` and `DrawStrokeWidth`. |
| `Shape` | Drag | Shape defined by `SelectedShapeType`: `Line`, `Arrow`, `Rectangle`, `Circle`, `Polygon`, `Star` or `Text`. Rectangle is the default if unset. |
| `Text` | Click or drag | Text box with the `TextAnnotation*` typography. |
| `Note` | Click | Sticky note with an in-place editor and color swatch. |
| `Link` | Drag | Link annotation. A dialog asks for the URL. |
| `Stamp` | Click | Rubber stamp from the toolbar dropdown. See [Stamps](#stamps). |
| `None` | Click or drag an annotation | Select, move, resize, restyle, copy, paste and delete existing annotations. |

### Activating tools from controls

You can set any `PdfViewerTool` to be activated from your own controls. This works even if the toolbar is hidden. Use `SetToolCommand` to sets one from a command parameter, either the `PdfViewerTool` value or its name.

```xml
<pdf:PdfViewer x:Name="Viewer" ActiveTool="Highlight" />

<Button Content="Draw"
        Command="{Binding #Viewer.SetToolCommand}"
        CommandParameter="Draw" />
```

### Working with annotations

The position of an annotation is recorded using a 0-based page index and page coordinates. The origin point is the bottom-left corner of the page. Each unit is one PDF point, which is 1/72 inches or ~0.352 mm.

Annotations created in other applications, such as Acrobat or Preview, can be edited. They keep their author, date, subject, opacity and flags. Shapes keep their appearances, such as dashed or cloudy borders.

### Tool visibility

Each tool has its own visibility property, allowing you to decide exactly which tools the toolbar offers.

Hiding a tool does not prevent it being accessible via commands. If you need to completely disable editing, use `IsReadOnly` or `AllowAnnotationEditing`. (See [Document permissions](loading-and-saving.md#document-permissions).)

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

## Markup from a selection

When text is selected, a contextual menu shows the text markup tools. These are the same operations as [described above](#editing-tools). Any operation executed from the menu is applied to the current selection.

If a new annotation is added, the operation returns the new annotation's index on the page. It returns `-1` on failure.

The color is a `PdfAnnotationColor` value with `R`, `G`, `B` and `A` byte components. If color is `null`, the [default of the matching color property](#default-colors-and-typography) is used (e.g., green for `UnderlineColor`).

```csharp
await Viewer.HighlightSelectionAsync();
await Viewer.UnderlineSelectionAsync(new PdfAnnotationColor(0, 0, 255, 255));
```

| Method | Description |
|---|---|
| `HighlightSelectionAsync(PdfAnnotationColor? color = null)` | Highlights the selection. |
| `UnderlineSelectionAsync(PdfAnnotationColor? color = null)` | Underlines the selection. |
| `StrikeoutSelectionAsync(PdfAnnotationColor? color = null)` | Strikes out the selection. |
| `SquigglySelectionAsync(PdfAnnotationColor? color = null)` | Adds a squiggly underline to the selection. |
| `RedactSelectionAsync(PdfAnnotationColor? color = null)` | Redacts the selection. |

## Sticky notes

```csharp
int index = await Viewer.AddStickyNoteAsync(0, 72, 720, "Check this figure");
await Viewer.UpdateStickyNoteAsync(0, index, "Checked", null);
```

| Method | Description |
|---|---|
| `AddStickyNoteAsync(int pageIndex, double pdfX, double pdfY, string text, PdfAnnotationColor? color = null)` | Adds a sticky note at the specified page coordinates. Returns the annotation index, or `-1` on failure. |
| `UpdateStickyNoteAsync(int pageIndex, int annotIndex, string? text, PdfAnnotationColor? color)` | Changes a note's text or color. |
| `GetAnnotationsAsync(int pageIndex, CancellationToken)` | Lists a page's annotations as `PdfAnnotationInfo` items, with `AnnotationIndex`, `Type`, `Bounds`, `Color`, `Contents` and `Author`. |

## Stamps

The **Stamp** dropdown offers a list of labels such as **Approved**, **Draft** and **Received**, drawn in capitals. It includes a style selector and an **Include date** toggle. Stamps are saved as standard `/Stamp` annotations, so other readers can render and move them.

`AddStampAsync(int pageIndex, string label, double pdfX, double pdfY, PdfAnnotationColor? color = null, PdfStampStyle? style = null, bool? includeDate = null)` adds a stamp centered on the specified page coordinates. Arguments left `null` fall back to the defaults listed in the table below.

```csharp
Viewer.StampLabels = new[] { "Approved", "Rejected", "Paid" };
await Viewer.AddStampAsync(0, "Approved", 300, 700, includeDate: true);
```

| Property | Type | Default | Description |
|---|---|---|---|
| `StampLabels` | `IReadOnlyList<string>` | `DefaultStampLabels` | Labels offered by the dropdown. |
| `StampColor` | `PdfAnnotationColor?` | `null` | Color of the stamp. `null` falls back to a default color depending on the label type: green for approvals, blue for statuses, red for everything else (including custom labels). |
| `StampStyle` | `PdfStampStyle` | `Classic` | Artistic style of the stamp: `Classic`, `Flat`, `Outline`, `Legal` or `Pill`. |
| `IncludeStampDate` | `bool` | `false` | Adds the current date as a second line to stamps. |
| `StampDateFormat` | `string` | `dd MMM yyyy` | .NET date format for the date line, invariant culture. |

## Shapes and text

Shapes are saved with their standard PDF subtypes (`/Square`, `/Circle`, `/Line`, `/Polygon`), so they stay editable in other readers. Similarly, text boxes are saved as `/FreeText`, and curved lines are saved as `/Stamp`.

`ShapeSubtypeMode` chooses how shapes that carry text are written.

Non-Latin text in text boxes, shapes and stamps (Cyrillic, Greek, CJK and so on) is embedded as a font subset, so it renders the same in every reader.

| `PdfShapeSubtypeMode` | Description |
|---|---|
| `Auto` | Standard shape subtypes for shapes without text. `/Stamp` for shapes with text. |
| `Standard` | Standard shape subtypes for everything, including shapes with text. The text may be lost if another reader edits the shape. |
| `Strict` | Standard shape subtypes only. Text cannot be added to shapes, and lines cannot be curved. |

### Default colors and typography

The color picker on the toolbar writes to these properties.

| Property | Type | Default | Description |
|---|---|---|---|
| `HighlightColor` | `PdfAnnotationColor` | Yellow, 50% transparent | Highlight color. |
| `UnderlineColor` | `PdfAnnotationColor` | Green | Underline color. |
| `StrikeoutColor` | `PdfAnnotationColor` | Red | Strikeout color. |
| `SquigglyColor` | `PdfAnnotationColor` | Blue | Squiggly color. |
| `DrawStrokeColor` | `PdfAnnotationColor` | Red | Freehand stroke color. |
| `DrawStrokeWidth` | `float` | `2.0` | Freehand stroke width in PDF points. |
| `ShapeFillColor` | `PdfAnnotationColor?` | White | Shape fill. `null` is none. |
| `ShapeStrokeColor` | `PdfAnnotationColor?` | Black | Shape border color. `null` is none. |
| `ShapeStrokeWidth` | `float` | `2.0` | Shape border width in PDF points. |
| `SelectedShapeType` | `ShapeType` | `None` | Shape drawn by the `Shape` tool. |
| `TextAnnotationFillColor` | `PdfAnnotationColor?` | `null` | Text box fill. `null` is none. |
| `TextAnnotationStrokeColor` | `PdfAnnotationColor?` | `null` | Text box border color. `null` is none. |
| `TextAnnotationStrokeWidth` | `float` | `1.0` | Text box border width. |
| `TextAnnotationTextColor` | `PdfAnnotationColor` | Black | Text box text color. |
| `TextAnnotationFont` | `string` | `Helvetica` | Text box font. |
| `TextAnnotationFontSize` | `float` | `12` | Text box font size. |
| `TextAnnotationFontAttributes` | `FontAttributes` | `None` | Bold, italic, etc. |
| `TextAnnotationTextAlign` | `TextAnnotationAlignment` | `Center` | Text box alignment. |
| `NoteColor` | `PdfAnnotationColor` | Yellow | Sticky note color. |

## Redaction

The `Redact` tool and `RedactSelectionAsync` remove content from the page. Text characters and images under the redaction area are removed. Vector paths and form XObjects are removed only when fully covered.

With `RedactionRemovesHiddenInformation` set to `true` (the default), redaction also removes the copies of page content a PDF can keep elsewhere, namely, the tagged structure tree, the page's embedded thumbnail, and the document metadata (title, author, keywords). Outline titles and attachments are not affected.

Redaction is undoable while `IsRedactionUndoEnabled` is `true`. The undo history is limited by a separate property, `MaxRedactionUndoSteps`.

## Forms

Interactive form fields can be filled with the pointer and keyboard.

Pressing <kbd>Tab</kbd> in the document goes to the first form field on the page. While in a form field, <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd> move between fields with a visible focus ring. <kbd>Esc</kbd>, or tabbing past the last field, exits the form.

Form edits take part in undo/redo and are written on save.

Setting `AllowFormEditing` to `false` disables form filling.

Form filling is not available in the browser.

## Undo and redo

Annotation edits, form field edits and redactions are recorded in the undo/redo history. Bookmarks are not.

| Member | Description |
|---|---|
| `Undo()`, `Redo()` | Applies the previous or next history entry. `UndoAsync()` and `RedoAsync()` await. |
| `CanUndo`, `CanRedo` | Whether there is an entry that can be applied. Bindable. |
| `UndoRedoStateChanged` | Raised when either changes. |
| `MaxUndoSteps` | Maximum undo history, 0 to 1000. Default `100`. `0` disables undo/redo. |
| `MaxRedactionUndoSteps` | Maximum undo history for redactions, 0 to 100. Default `10`. |
| `IsRedactionUndoEnabled` | Whether redactions are recorded at all. Default `true`. |

## Errors

Edits made with the pointer run in the background. Subscribe to `AnnotationError` to be told if one fails. You may find it useful to include the arguments `Operation`, `Message` and `Exception`.

```csharp
Viewer.AnnotationError += (_, e) =>
    ShowToast($"{e.Operation} failed: {e.Message}");
```

## Output compatibility

Every annotation is saved with an appearance stream to ensure edits render in other readers.

Editing an annotation created by another application rebuilds its appearance. If an annotation has an attached reply chain (`/Popup`, `/IRT`), it is dropped, and the annotation moves to the end of the page's annotation order.

## See also

- [PdfViewer control](index.md)
- [Loading and saving](loading-and-saving.md)
- [Navigation, zoom and search](navigation-and-search.md)
