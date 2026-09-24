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

`PdfViewer` has no template until one of its themes is included.

**Fix:** Add a `StyleInclude` to `App.axaml`, either `Default.axaml` or `Fluent.axaml`. (See [Getting started](/controls/data-display/pdfviewer#getting-started).)

```xml
<Application.Styles>
    <FluentTheme />
    // highlight-next-line
    <StyleInclude Source="avares://Avalonia.Controls.PdfViewer/Themes/Default.axaml" />
</Application.Styles>
```

## `AvaloniaLicensingException` when the viewer is first used

Your Avalonia license key is missing or does not cover the PDF Viewer.

**Fix:**
- Check your license key in the [Avalonia portal](https://portal.avaloniaui.net). Ensure it covers the PDF viewer.
- Reference the `AvaloniaUI.Licensing` package in every application head (desktop, iOS, Android, browser) and add an `AvaloniaUILicenseKey` item to each head's project file. See [Installing Avalonia Pro](/tools/installing-avalonia-pro).

## XAML cannot find `PdfViewer`

`PdfViewer` is not part of the default Avalonia XAML namespace.

**Fix:** Map the `Avalonia.Controls` namespace with a prefix. Use that prefix on the control.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:pdf="using:Avalonia.Controls">
    <pdf:PdfViewer Source="/path/to/document.pdf" />
</Window>
```

## `SaveAsync` throws `InvalidOperationException`

`SaveAsync` saves in place over `Source`. A document loaded from a stream or byte array has no path to save to.

**Fix:** Use `SaveDocumentAsync` with a path or stream, or `SaveAsAsync` to show the platform save picker. See [Saving a document](/controls/data-display/pdfviewer/loading-and-saving#saving-a-document) for more information on these methods.

## Annotation tools are greyed out

Tools are disabled under the following conditions:

- `CanEditAnnotations` is `false`
- `IsReadOnly` is `true`
- `AllowAnnotationEditing` is `false`
- `RespectDocumentPermissions` is `true` and the document forbids annotations

**Fix:** Check the `Permissions` property for the document's flags. Set `RespectDocumentPermissions` to `false`, or open the document with its owner password, to bypass them. See [Document permissions](/controls/data-display/pdfviewer/loading-and-saving#document-permissions).

## **Print** or **Share** is missing from the **More Options** menu

**Print** and **Share** are hidden if the platform has no built-in service and the app does not handle the request. Linux and web browsers do not have built-in services for printing or sharing.

**Fix:** Handle `PrintRequested` or `ShareRequested`, set `Handled` to `true`, and take PDF bytes from `GetDocumentBytesAsync()`. See [Printing and sharing](/controls/data-display/pdfviewer/printing-and-sharing).

## An `*Async` call throws

Every public member of `PdfViewer` must be called on the UI thread. The `*Async` members validate this and throw otherwise.

**Fix:** Use `Dispatcher.UIThread.InvokeAsync`:

```csharp
await Dispatcher.UIThread.InvokeAsync(() => Viewer.LoadDocumentAsync(path));
```

## Keyboard shortcuts reach the viewer instead of my commands

When `EnableKeyboardShortcuts` is `true`, the viewer handles keyboard shortcuts, such as <kbd>Ctrl</kbd>+<kbd>C</kbd> for copy, while it has focus. See [Keyboard shortcuts](/controls/data-display/pdfviewer/navigation-and-search#keyboard-shortcuts) for the full list.

**Fix:** Set `EnableKeyboardShortcuts` to `false` to free those keystrokes for the host, or `IsArrowKeyNudgeEnabled` to `false` to keep the arrow keys for navigation.

## The document does not load in the browser

In the browser, the app must serve `pdfium.wasm`. PDFium can be blocked by a missing file, a strict content security policy (CSP), or the multithreaded runtime (`WasmEnableThreads`). The failure is reported through `LoadError`.

**Fix:** Copy `pdfium.wasm` into `wwwroot`, or set `PdfViewerBrowserOptions.PdfiumWasmUrl` to where it is served. Under a strict CSP, serve the bridge scripts as well and set `PdfViewerBrowserOptions.ScriptsBaseUrl`. Load documents from a `Stream` or `byte[]` rather than a path. See [Browser hosting](/controls/data-display/pdfviewer/platforms-and-performance#browser-hosting-webassembly).

## Pages are blank when scrolling quickly

Only the pages near the viewport are decoded. Scrolling faster than pages can decode results in placeholders being shown.

**Fix:** Raise `PageRenderBuffer` so more pages are decoded ahead of the viewport. Keep `PageRetentionBuffer` the same or above the render buffer. See [Optimizing memory for large documents](/controls/data-display/pdfviewer/platforms-and-performance#optimizing-memory-for-large-documents).

## Edits made in the PDF viewer look different in another app

Shapes that carry text are saved as `/Stamp` annotations by default. Other PDF readers can move them, although the text is preserved.

**Fix:** Set `ShapeSubtypeMode` to `Standard` to write every shape with its standard subtype, or `Strict` to prevent text on shapes. See [Shapes and text](/controls/data-display/pdfviewer/annotations#shapes-and-text).

## See also

- [PdfViewer control](/controls/data-display/pdfviewer)
- [Installing Avalonia Pro](/tools/installing-avalonia-pro)
