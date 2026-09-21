---
id: pdfviewer
title: PdfViewer issues
description: Troubleshoot common PdfViewer problems in Avalonia, including a blank control, license errors, save failures, missing print entries and browser hosting.
doc-type: troubleshooting
sidebar_label: PdfViewer
tags:
  - avalonia pro
  - avalonia enterprise
---

## The control renders nothing

`PdfViewer` has no template until one of its themes is included, so it takes up space but draws nothing.

**Fix:** Add a `StyleInclude` for `Default.axaml` or `Fluent.axaml` to `App.axaml`:

```xml
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="avares://Avalonia.Controls.PdfViewer/Themes/Default.axaml" />
</Application.Styles>
```

See [Getting started](/controls/data-display/pdfviewer#getting-started).

## `AvaloniaLicensingException` when the viewer is first used

The control checks the license key on first use and throws `AvaloniaLicensingException` when the key is missing or does not cover the PDF Viewer.

**Fix:** Reference the `AvaloniaUI.Licensing` package in every application head (desktop, iOS, Android and browser) and add an `AvaloniaUILicenseKey` item to each head's project file. Check that your license includes the PDF Viewer in the [Avalonia portal](https://portal.avaloniaui.net). See [Installing Avalonia Pro](/tools/installing-avalonia-pro).

## XAML cannot find `PdfViewer`

The control lives in the `Avalonia.Controls` namespace, but it is not part of the default Avalonia XAML namespace.

**Fix:** Map the namespace with a prefix and use it on the element:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:pdf="using:Avalonia.Controls">
    <pdf:PdfViewer Source="/path/to/document.pdf" />
</Window>
```

## `SaveAsync` throws `InvalidOperationException`

`SaveAsync` saves in place over `Source`. A document loaded from a stream or byte array has no path to save to. `Save()` reports the same condition through `ErrorMessage` instead of throwing.

**Fix:** Use `SaveDocumentAsync` with a path or stream, or `SaveAsAsync` to show the platform save picker. See [Save a document](/controls/data-display/pdfviewer/loading-and-saving#save-a-document).

## Annotation tools are greyed out

Tools are disabled while `CanEditAnnotations` is `false`: when `IsReadOnly` is `true`, when `AllowAnnotationEditing` is `false`, or when `RespectDocumentPermissions` is on and the document forbids annotation.

**Fix:** Check the `Permissions` property for the document's flags. Set `RespectDocumentPermissions` to `false` to ignore them, or open the document with its owner password, which removes the restrictions. See [Document permissions](/controls/data-display/pdfviewer/loading-and-saving#document-permissions).

## Print or Share is missing from the More Options menu

The entries are hidden when the platform has no built-in service and the app does not handle the request. Print and share are not built in on Linux or in the browser.

**Fix:** Handle `PrintRequested` or `ShareRequested`, set `Handled` to `true`, and take the PDF bytes from `GetDocumentBytesAsync()`. See [Printing and sharing](/controls/data-display/pdfviewer/printing-and-sharing).

## An `*Async` call throws about the UI thread

Every public member of `PdfViewer` must be called on the Avalonia UI thread. The `*Async` members validate this and throw otherwise.

**Fix:** Marshal the call with `Dispatcher.UIThread.InvokeAsync`:

```csharp
await Dispatcher.UIThread.InvokeAsync(() => Viewer.LoadDocumentAsync(path));
```

## Keyboard shortcuts reach the viewer instead of my commands

With `EnableKeyboardShortcuts` on, the viewer handles copy, paste, select all, zoom, bookmark, undo, redo, save, delete and the arrow keys while it has focus.

**Fix:** Set `EnableKeyboardShortcuts` to `false` to leave those keystrokes to the host, or `IsArrowKeyNudgeEnabled` to `false` to keep only the arrow keys for navigation. See [Keyboard shortcuts](/controls/data-display/pdfviewer/navigation-and-search#keyboard-shortcuts).

## The document does not load in the browser

In the browser the app must serve `pdfium.wasm`. A missing file, a script blocked by a strict Content Security Policy, or the multithreaded runtime (`WasmEnableThreads`) stops PDFium from starting. The failure is reported through `LoadError`.

**Fix:** Copy `pdfium.wasm` into `wwwroot`, or set `PdfViewerBrowserOptions.PdfiumWasmUrl` to where it is served. Under a strict policy, serve the bridge scripts as well and set `PdfViewerBrowserOptions.ScriptsBaseUrl`. Load documents from a `Stream` or `byte[]` rather than a path. See [Browser hosting](/controls/data-display/pdfviewer/platforms-and-performance#browser-webassembly-hosting).

## Pages are blank while scrolling quickly

Only the pages near the viewport are decoded. Scrolling faster than pages decode shows placeholders until they catch up.

**Fix:** Raise `PageRenderBuffer` so more pages are decoded ahead of the viewport, and keep `PageRetentionBuffer` at or above it. Higher values use more memory. See [Memory and large documents](/controls/data-display/pdfviewer/platforms-and-performance#memory-and-large-documents).

## Edits made in the viewer look different in another reader

Shapes that carry text are saved as `/Stamp` annotations by default, so other readers can move but not edit them, and the text is preserved.

**Fix:** Set `ShapeSubtypeMode` to `Standard` to write every shape with its standard subtype, or `Strict` to prevent text on shapes. See [Shapes and text](/controls/data-display/pdfviewer/annotations#shapes-and-text).

## See also

- [PdfViewer control](/controls/data-display/pdfviewer)
- [Installing Avalonia Pro](/tools/installing-avalonia-pro)
