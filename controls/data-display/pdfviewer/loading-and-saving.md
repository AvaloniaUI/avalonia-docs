---
id: loading-and-saving
title: Loading and saving documents
description: Load PDF documents into the Avalonia PdfViewer from a path, stream or byte array, handle passwords and permissions, and save edits in place or to a copy.
doc-type: how-to
tags:
  - avalonia pro
  - avalonia enterprise
---

## Load a document

Set `Source` to a file path and the viewer loads it. `DocumentSource` is the bindable alternative when the source may be a file path `string`, a `Stream` or a `byte[]`. A string given to `DocumentSource` is routed through `Source`, so in-place saving still works. From code, call `LoadDocumentAsync`.

```csharp
// From a file path
await Viewer.LoadDocumentAsync("/path/to/document.pdf");

// From a stream
await using var stream = File.OpenRead("/path/to/document.pdf");
await Viewer.LoadDocumentAsync(stream);

// From bytes in memory
byte[] bytes = await File.ReadAllBytesAsync("/path/to/document.pdf");
await Viewer.LoadDocumentAsync(bytes);
```

| Method | Description |
|---|---|
| `LoadDocumentAsync(string path, string? password = null)` | Loads a PDF from a file path. |
| `LoadDocumentAsync(Stream stream, string? password = null)` | Loads a PDF from a stream. The stream is read from its current position, or from the start if it is seekable and at its end. |
| `LoadDocumentAsync(ReadOnlyMemory<byte> data, string? password = null)` | Loads a PDF from bytes in memory. A whole array is used in place; a slice is copied. |
| `CloseDocument()` | Closes the current document and releases its native state. |
| `ClearError()` | Clears `ErrorMessage`. An open document stays open. |

`DocumentLoaded` is raised when a document finishes loading, with `PageCount` and `Metadata` in its args. `LoadError` is raised when loading fails. The message is also shown on the canvas and on the bindable `ErrorMessage` property.

```csharp
Viewer.DocumentLoaded += (_, e) =>
    Title = $"{e.Metadata.Title} ({e.PageCount} pages)";

Viewer.LoadError += (_, e) =>
    Console.WriteLine($"Load failed: {e.Message}");
```

## Password-protected documents

Pass the password to `LoadDocumentAsync`, or set `Password` before setting `Source`. If an encrypted document is loaded without a password, the viewer prompts for one and lets the user retry.

```csharp
await Viewer.LoadDocumentAsync("/path/to/encrypted.pdf", password: "secret");
```

## Document permissions

A PDF can forbid annotation, form filling, copying or printing. With `RespectDocumentPermissions` set to `true` (the default), the viewer withholds each of those features when the document forbids it. A document opened with its owner password is unrestricted. Set `RespectDocumentPermissions` to `false` to ignore the flags.

The document's flags are exposed on the `Permissions` property as `PdfPermissions`, with `CanPrint`, `CanPrintHighQuality`, `CanModify`, `CanCopyContent`, `CanAnnotate`, `CanFillForms`, `CanExtractForAccessibility` and `CanAssemble`. It is `null` while no document is open.

Your own gates are separate:

| Property | Effect |
|---|---|
| `IsReadOnly` | Disables annotation and form editing in one switch. Tools are disarmed, and selected annotations cannot be moved or deleted. |
| `AllowTextSelection` | Enables text selection and copy. |
| `AllowAnnotationEditing` | Enables creating and editing annotations. |
| `AllowFormEditing` | Enables interactive form field editing. |
| `AllowDocumentSaving` | Enables saving. Gates `SaveCommand` and `SaveAsync`. |

`CanEditAnnotations` reports the combined result: not `IsReadOnly`, `AllowAnnotationEditing` is `true`, and the document allows it when `RespectDocumentPermissions` is on.

## Save a document

Every save writes the document with its annotation edits, form values, redactions and bookmarks.

| Method | Description |
|---|---|
| `SaveAsync()` / `Save()` | Saves in place over `Source`. Honours `AllowDocumentSaving`. A document loaded from a stream or byte array has no path: `SaveAsync` throws `InvalidOperationException` and `Save()` reports it through `ErrorMessage`. |
| `SaveDocumentAsync(string filePath)` | Saves to a path. |
| `SaveDocumentAsync(Stream stream)` | Saves to a stream. |
| `SaveAsAsync()` / `SaveAs()` | Shows the platform save picker and writes the document to the chosen file, or raises `SaveAsRequested`. |

```csharp
// Save a copy
await Viewer.SaveDocumentAsync("/path/to/output.pdf");

// Save to a stream
await using var output = new MemoryStream();
await Viewer.SaveDocumentAsync(output);
```

`IsDirty` is `true` while the document has unsaved edits. It is cleared by a successful save and by loading another document.

Set `AutoSave` to `true` to write back to `Source` after each annotation, form or redaction edit. This requires `AllowDocumentSaving` and a document loaded from a path.

### Signed documents

A document with digital signatures is saved as an incremental update, so the signed revision stays intact and readers can still verify it. Other documents are rewritten in full.

## Open, Save and Save As menu entries

The **More Options** menu can also show **Open**, **Save** and **Save As** entries. They are off by default. Opt in per entry with `IsOpenVisible`, `IsSaveVisible` and `IsSaveAsVisible`.

- **Open** shows the platform file picker and loads the chosen file. A file with a local path is opened by path, so in-place saving works. Where the picker gives no path (the browser, some mobile pickers), the file is read through a stream.
- **Save** saves in place. The entry is hidden while `AllowDocumentSaving` is `false`, and disabled for a document loaded from a stream.
- **Save As** shows the platform save picker and writes the document with its edits. If the user picks another local file, the viewer switches to that file and keeps the current page.

All three are also available as `Open()`, `OpenAsync()`, `SaveAs()`, `SaveAsAsync()`, `OpenCommand` and `SaveAsCommand`, whether or not the menu shows them.

### Use your own dialogs

Handle `OpenRequested` or `SaveAsRequested` and set `Handled` to `true` to replace the built-in pickers. `PdfSaveAsRequestedEventArgs.GetDocumentBytesAsync()` returns the PDF to write.

```csharp
Viewer.SaveAsRequested += async (_, e) =>
{
    e.Handled = true;
    var pdf = await e.GetDocumentBytesAsync();
    await myDocumentStore.SaveAsync(pdf);
};
```

## Lifecycle

- Detaching the viewer from the visual tree, for example when switching tabs, keeps the document, its unsaved edits, the undo history, the current page and the zoom. They come back when it is re-attached.
- `Source` can be set before the viewer is attached. The document is drawn once it is.
- Closing the window releases the native document. So does `CloseDocument()`.
- A `Stream` passed to the viewer is read once and never disposed, so dispose it yourself after the load call returns. A `byte[]` is used in place for the document's lifetime and must not be modified while the document is open.

## See also

- [PdfViewer control](index.md)
- [Printing and sharing](printing-and-sharing.md)
- [Platforms and performance](platforms-and-performance.md)
