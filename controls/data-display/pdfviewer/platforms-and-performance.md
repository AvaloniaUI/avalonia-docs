---
id: platforms-and-performance
title: Platforms and performance
description: Package targets, WebAssembly hosting, memory use on large documents, trimming, diagnostics and known limitations of the Avalonia PdfViewer control.
doc-type: how-to
tags:
  - avalonia pro
  - avalonia enterprise
---

## Package targets

`PdfViewer` ships `net10.0`, `net10.0-ios`, `net10.0-android` and `net10.0-browser` assets. Each depends only on the PDFium packages for its own platforms. NuGet picks the right one per application head.

## Browser hosting (WebAssembly)

In the browser, PDFium runs as a separate WebAssembly module. Because of this, your app has to serve it as a static file, `pdfium.wasm`. This is supplied by the `bblanchon.PDFium.WebAssembly` package.

1. Reference that package from the browser head by adding `ExcludeAssets="native"`. This exclusion ensures the WebAssembly SDK does not try to link it.

  ```xml
  <PackageReference Include="bblanchon.PDFium.WebAssembly" Version="155.0.8044" ExcludeAssets="native" />
  ```

2. Copy `runtimes/browser-wasm/native/pdfium.wasm` from the package into `wwwroot`, for example with an MSBuild target in the browser head.

  ```xml
  <Target Name="CopyPdfiumWasm" AfterTargets="Build">
    <Copy SourceFiles="$(NuGetPackageRoot)bblanchon.pdfium.webassembly/155.0.8044/runtimes/browser-wasm/native/pdfium.wasm"
          DestinationFolder="wwwroot" />
  </Target>
  ```

By default, the control fetches `./pdfium.wasm` relative to the page. If the file is served from elsewhere, such as a content delivery network (CDN), set the URL before the first document loads. It is safe to set `PdfViewerBrowserOptions` at app start.

```csharp
#if BROWSER
PdfViewerBrowserOptions.PdfiumWasmUrl = "https://cdn.example.com/pdf/pdfium.wasm";
#endif
```

### Content Security Policy (CSP)

By default, JavaScript used by `PdfViewer` is embedded and evaluated from a `data:` URL, which a content security policy (CSP) without `data:` and `'unsafe-eval'` blocks. For such a host, serve `pdfium-bridge.js` and `pdfium.wrapped.js` from the package's `browser/` folder, next to `pdfium.wasm`, and point the control at them.

`script-src 'self' 'wasm-unsafe-eval'` is enough. Note that .NET itself needs `wasm-unsafe-eval`.

```csharp
#if BROWSER
PdfViewerBrowserOptions.ScriptsBaseUrl = "./";
#endif
```

### Browser limitations

- The multithreaded runtime (`WasmEnableThreads`) is not supported.
- A failed start, such as a blocked script or missing WASM file, is reported through `LoadError`. It is retried on the next load.
- Form fields are drawn, but cannot be edited.
- There is no file system. You must load documents from a `Stream` or `byte[]`, downloading them if needed.
- Print, share and built-in save and open dialogs are unavailable. To provide these services, you must handle `PrintRequested`, `ShareRequested`, `OpenRequested` and/or `SaveAsRequested`. (See [Printing and sharing](/controls/data-display/pdfviewer/printing-and-sharing) and [Loading and saving](/controls/data-display/pdfviewer/loading-and-saving).)

## Optimizing memory for large documents

### Scrolling

In continuous view modes, only the pages near the viewport are decoded. Pages that scroll out of range are released, so memory does not grow with document length. The thumbnail strip works the same way.

Two properties tune the tradeoff between memory use and scroll smoothness.

| Property | Default | Description |
|---|---|---|
| `PageRenderBuffer` | `2` | Pages decoded on each side of the viewport. Increase to reduce blank placeholders while scrolling fast. Decrease to save memory. Must be in the range of 0 to 10. |
| `PageRetentionBuffer` | `4` | Pages kept decoded on each side before they are released. Keep above `PageRenderBuffer` to avoid re-rendering on short back-and-forth scrolling. Must be in the range of 0 to 20. |
<br />

```xml
<pdf:PdfViewer Source="/path/to/large.pdf"
               PageRenderBuffer="3"
               PageRetentionBuffer="8" />
```

### Zooming

A page bitmap never exceeds 8192 pixels on a side, or 30 megapixels total. At zoom levels beyond that, the page is decoded at a lower resolution and scaled up. `MaxRenderScale` is capped at 4.

## Trimming and AOT

The library is trimmable and ahead-of-time (AOT) compatible.

## Diagnostics

`PdfViewer` logs through Avalonia's logging system, under the `PdfViewer` area. This includes Release builds.

```csharp
AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .LogToTrace(LogEventLevel.Warning, "PdfViewer");
```

Anything a user needs to act on is also surfaced on the bindable `ErrorMessage` property.

Annotation failures are surfaced through the `AnnotationError` event instead. See [Errors](annotations.md#errors).

## Known limitations

- Page content is not exposed to assistive technology as text. See [Accessibility](theming-and-localization.md#accessibility).
- Print and share are not built-in on Linux or in the browser.
- Form filling and built-in file dialogs are not available in the browser.
- Text selection cannot span pages.
- Redaction does not remove content drawn by a partially covered form XObject.

## See also

- [PdfViewer control](/controls/data-display/pdfviewer/)
- [Loading and saving](/controls/data-display/pdfviewer/loading-and-saving)
- [Printing and sharing](/controls/data-display/pdfviewer/printing-and-sharing)
- [Troubleshooting](/troubleshooting/controls/pdfviewer)
