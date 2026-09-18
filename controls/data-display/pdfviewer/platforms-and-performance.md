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

The package ships `net10.0` (Windows, macOS and Linux), `net10.0-ios`, `net10.0-android` and `net10.0-browser` assets. Each depends only on the PDFium packages for its own platforms, and NuGet picks the right one per application head.

## Browser (WebAssembly) hosting

In the browser PDFium runs as a separate WebAssembly module, and the app has to serve it as a static file, `pdfium.wasm`. The `bblanchon.PDFium.WebAssembly` package supplies it.

1. Reference that package from the browser head with `ExcludeAssets="native"`, so the WebAssembly SDK does not try to link it.

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

By default the control fetches `./pdfium.wasm` relative to the page. If the file is served from elsewhere, such as a CDN, set the URL before the first document loads. `PdfViewerBrowserOptions` is a static class, so setting it at app start is safe.

```csharp
#if BROWSER
PdfViewerBrowserOptions.PdfiumWasmUrl = "https://cdn.example.com/pdf/pdfium.wasm";
#endif
```

### Content Security Policy

By default the control's JavaScript is embedded and evaluated from a `data:` URL, which a Content Security Policy without `data:` and `'unsafe-eval'` blocks. For such a host, serve `pdfium-bridge.js` and `pdfium.wrapped.js` from the package's `browser/` folder next to `pdfium.wasm`, and point the control at them.

```csharp
#if BROWSER
PdfViewerBrowserOptions.ScriptsBaseUrl = "./";
#endif
```

`script-src 'self' 'wasm-unsafe-eval'` is then enough. .NET itself needs `wasm-unsafe-eval`.

### Browser limitations

- The multithreaded runtime (`WasmEnableThreads`) is not supported.
- A failed start, such as a blocked script or a missing wasm file, is reported through `LoadError` and retried on the next load.
- Form fields are drawn but cannot be edited.
- There is no file system. Load documents from a `Stream` or `byte[]`, downloading them yourself if needed.
- Print, share and the built-in save and open dialogs are not available. Handle `PrintRequested`, `ShareRequested`, `OpenRequested` and `SaveAsRequested` to provide them.

## Memory and large documents

In the continuous view modes only the pages near the viewport are decoded, and pages that scroll out of range are released, so memory does not grow with document length. The thumbnail strip works the same way.

Two properties tune the trade-off between scrolling smoothness and memory.

| Property | Default | Description |
|---|---|---|
| `PageRenderBuffer` | `2` | Pages decoded ahead on each side of the viewport. Increase it to reduce blank placeholders while scrolling fast, decrease it to save memory. Clamped to 0 to 10. |
| `PageRetentionBuffer` | `4` | Pages kept decoded on each side before they are released. Keeping it above `PageRenderBuffer` avoids re-rendering on short back-and-forth scrolling. Clamped to 0 to 20. |

```xml
<pdf:PdfViewer Source="/path/to/large.pdf"
               PageRenderBuffer="3"
               PageRetentionBuffer="8" />
```

A page bitmap never exceeds 8192 pixels on a side or 30 megapixels. At zoom levels beyond that, the page is decoded at a lower resolution and scaled up. `MaxRenderScale` is capped at 4.

## Trimming and AOT

The library is trimmable and AOT compatible. A trimmed or AOT-published app gets no warnings from it.

## Diagnostics

The viewer logs through Avalonia's logging under the `PdfViewer` area, including in Release builds.

```csharp
AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .LogToTrace(LogEventLevel.Warning, "PdfViewer");
```

Anything a user needs to act on is also surfaced on the bindable `ErrorMessage` property and, for annotation failures, through the `AnnotationError` event. See [Errors](annotations.md#errors).

## Known limitations

- Page content is not exposed to assistive technology as text. See [Accessibility](theming-and-localization.md#accessibility).
- Print and share are not built in on Linux or in the browser. Form filling and the built-in file dialogs are not available in the browser.
- A text selection cannot span pages.
- Redaction removes text, images and fully covered vector content, but not content drawn by a partially covered form XObject.

## See also

- [PdfViewer control](index.md)
- [Loading and saving](loading-and-saving.md)
- [Printing and sharing](printing-and-sharing.md)
- [Troubleshooting](/troubleshooting/controls/pdfviewer)
