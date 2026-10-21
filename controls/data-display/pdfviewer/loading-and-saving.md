---
id: loading-and-saving
title: Loading and saving
description: Load PDF documents into the Avalonia PdfViewer from a path, stream or byte array, handle passwords and permissions, and save edits in place or to a copy.
doc-type: how-to
tags:
  - avalonia pro
  - avalonia enterprise
---

## Loading a document

Set `Source` to a file path to have `PdfViewer` load the document at that path.

`DocumentSource` is the bindable alternative for when the source is a file path `string`, a `Stream` or a `byte[]`. A string given to `DocumentSource` is routed through `Source`, so in-place saving still works. From code, call `LoadDocumentAsync`.

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

`DocumentLoaded` is raised when a document finishes loading. It contains `PageCount` and `Metadata` in its arguments.

`LoadError` is raised if loading fails. The message is also shown on the canvas and on the bindable `ErrorMessage` property.

```csharp
Viewer.DocumentLoaded += (_, e) =>
    Title = $"{e.Metadata.Title} ({e.PageCount} pages)";

Viewer.LoadError += (_, e) =>
    Console.WriteLine($"Load failed: {e.Message}");
```

### Methods

| Method | Description |
|---|---|
| `LoadDocumentAsync(string path, string? password = null)` | Loads a PDF from a file path. |
| `LoadDocumentAsync(Stream stream, string? password = null)` | Loads a PDF from a stream. The stream is read from its current position, or from the start if it is seekable and at its end. |
| `LoadDocumentAsync(ReadOnlyMemory<byte> data, string? password = null)` | Loads a PDF from bytes in memory. A whole array is used in place. A slice is copied. |
| `CloseDocument()` | Closes the current document and releases its native state. |
| `ClearError()` | Clears `ErrorMessage`. |

## Password-protected documents

Pass the password to `LoadDocumentAsync`, or set `Password` before setting `Source`. If an encrypted document is loaded without a password, the viewer prompts for one and lets the user retry.

```csharp
await Viewer.LoadDocumentAsync("/path/to/encrypted.pdf", password: "secret");
```

## Document permissions

A PDF can forbid annotation, form filling, copying or printing. With `RespectDocumentPermissions` set to `true` (default), the viewer withholds each of those features if the document forbids it. If `RespectDocumentPermissions` is set to `false`, permission flags are ignored.

A document opened with its owner password is always unrestricted.

The document's flags are exposed on the `Permissions` property as `PdfPermissions`: `CanPrint`, `CanPrintHighQuality`, `CanModify`, `CanCopyContent`, `CanAnnotate`, `CanFillForms`, `CanExtractForAccessibility` and `CanAssemble`.

Your own permissions take precedence over the document's flags. For example, if you set `AllowAnnotationEditing` to `true`, then annotation is allowed and `IsReadOnly` is `false`, even if `RespectDocumentPermissions` is on.

| Property | Effect |
|---|---|
| `IsReadOnly` | Disables annotation and form editing. Tools are disarmed. Selected annotations cannot be moved or deleted. |
| `AllowTextSelection` | Enables text selection and copy. |
| `AllowAnnotationEditing` | Enables creating and editing annotations. |
| `AllowFormEditing` | Enables interactive form field editing. |
| `AllowDocumentSaving` | Enables saving. Gates `SaveCommand` and `SaveAsync`. |

## Saving a document

Every save writes the document with its annotation edits, form values, redactions and bookmarks.

`IsDirty` is `true` while the document has unsaved edits. It is cleared by a successful save or by loading another document.

Set `AutoSave` to `true` to write back to `Source` after each annotation, form or redaction edit. This requires `AllowDocumentSaving` to be `true`.

```csharp
// Save a copy
await Viewer.SaveDocumentAsync("/path/to/output.pdf");

// Save to a stream
await using var output = new MemoryStream();
await Viewer.SaveDocumentAsync(output);
```

| Method | Description |
|---|---|
| `SaveAsync()`, `Save()` | Saves in place over `Source`. Honors `AllowDocumentSaving`. A document loaded from a stream or byte array has no path, so `SaveAsync` throws `InvalidOperationException` and `Save()` reports it through `ErrorMessage`. |
| `SaveDocumentAsync(string filePath)` | Saves to the specified path. |
| `SaveDocumentAsync(Stream stream)` | Saves to the specified stream. |
| `SaveAsAsync()`, `SaveAs()` | Shows the platform's save dialog and writes the document to the chosen file, or raises `SaveAsRequested`. |

### Signed documents

If a document carries digital signatures, it is saved as an incremental update, meaning the original signatures stay intact and are not invalidated by the save.

Unsigned documents are rewritten in full.

## Open, Save and Save As menu entries

The **More Options** menu can show **Open**, **Save** and **Save As** entries. They are disabled by default. Opt in to each with `IsOpenVisible`, `IsSaveVisible` and `IsSaveAsVisible` respectively.

- **Open** shows the platform's file dialog and loads the chosen file.
- **Save** saves to the source file path. This entry is hidden while `AllowDocumentSaving` is `false`. It is disabled for a document loaded from a stream.
- **Save As** shows the platform save dialog and writes the document with any edits. If the user picks another local file, the viewer switches to that file and keeps the current page.

:::tip
**Open** and **Save As** operations are available via `Open()`, `OpenAsync()`, `SaveAs()`, `SaveAsAsync()`, `OpenCommand` and `SaveAsCommand`, whether or not the menu shows them.
:::

### Using your own dialogs

To replace the platform's dialogs, handle `OpenRequested` or `SaveAsRequested` and set `Handled` to `true`. `PdfSaveAsRequestedEventArgs.GetDocumentBytesAsync()` returns the PDF to write.

```csharp
Viewer.SaveAsRequested += async (_, e) =>
{
    e.Handled = true;
    var pdf = await e.GetDocumentBytesAsync();
    await myDocumentStore.SaveAsync(pdf);
};
```

## Lifecycle

- Detaching the viewer from the visual tree, for example when switching tabs, keeps the document, together with its unsaved edits, undo history, current page and zoom. They come back when it is re-attached.
- `Source` can be set before the viewer is attached. The document is drawn when it attaches.
- Closing the window releases the native document, same as `CloseDocument()`.
- A `Stream` passed to the viewer is read once and never disposed. You can dispose it yourself after the load call returns. A `byte[]` is used in place for the document's lifetime and must not be modified while the document is open.

## See also

- [PdfViewer control](/controls/data-display/pdfviewer/)
- [Printing and sharing](/controls/data-display/pdfviewer/printing-and-sharing)
- [Platforms and performance](/controls/data-display/pdfviewer/platforms-and-performance)
