---
id: printing-and-sharing
title: Printing and sharing
description: Print and share PDF documents from the Avalonia PdfViewer through the native print dialog and share sheet, or handle the request with your own pipeline.
doc-type: how-to
tags:
  - avalonia pro
  - avalonia enterprise
---

**Print** and **Share** live in the toolbar's **More Options** menu. These operations are also available through `Print()`, `PrintAsync()`, `Share()`, `ShareAsync()`, `PrintCommand` and `ShareCommand`.

## Platform support

| Platform | Print | Share |
|---|---|---|
| Windows | Standard print dialog, vector output. | Windows share sheet. Falls back to save-a-copy if the share UI is unavailable. |
| macOS | System print panel with preview. | System share picker, anchored to the toolbar button. |
| iOS | System print controller. | System share sheet, as a popover on iPad. |
| Android | System print framework. | Share chooser. No manifest changes are needed. |
| Linux | Not built in. | Not built in. |
| Browser | Not built in. | Not built in. |
<br />

Menu entries are hidden when the platform has no service and the app does not handle the request. `CanPrint` and `CanShare` respectively report whether printing or sharing is possible.

To hide the entries explicitly, set `false` on `IsPrintVisible`, `IsShareVisible` or `IsMoreOptionsVisible`.

## Printing or sharing from code

```csharp
await Viewer.PrintAsync();
await Viewer.ShareAsync();
```

`PrintAsync` accepts `PrintOptions`: `Title`, `PageRange`, `Copies`, `Color`, `Duplex`, `Orientation` and `Scaling`.

`ShareAsync` accepts `ShareOptions`: `Title`, `Text`, and `Subject`.

Both are in the `Avalonia.Controls.Pdf.Services` namespace. In both cases, `Owner` and `Anchor` are automatically filled.

## Handling the request in your app

To handle printing or sharing directly in your app, use `PrintRequested` and `ShareRequested` respectively. Both function similarly—set `Handled` to `true` before the first `await` and the built-in service is skipped. `GetDocumentBytesAsync()` returns the PDF with its edits.

This is the recommended approach to enable printing and sharing on Linux and web browsers.

```csharp
Viewer.PrintRequested += async (_, e) =>
{
    e.Handled = true;
    var pdf = await e.GetDocumentBytesAsync();
    await myPrintPipeline.PrintAsync(pdf, e.Options.Title);
};
```

## Replacing the platform service

To replace the platform implementations with your own, assign your `IPrintService` or `IShareService` to `PrintService` or `ShareService` respectively.

`IPrintService` has `PrintAsync(IPdfDocument, PrintOptions?, CancellationToken)` and `ShowPrintPreviewAsync(IPdfDocument, PrintOptions?)`.

`IShareService` has `ShareAsync(IPdfDocument, ShareOptions?, CancellationToken)` and `ShareFileAsync(string filePath, ShareOptions?, CancellationToken)`.

In either case, setting the service to `null` disables that feature.

```csharp
Viewer.PrintService = new MyPrintService();
Viewer.ShareService = null; // no Share feature
```

## See also

- [PdfViewer control](/controls/data-display/pdfviewer/index)
- [Loading and saving](/controls/data-display/pdfviewer/loading-and-saving)
- [Platforms and performance](/controls/data-display/pdfviewer/platforms-and-performance)
