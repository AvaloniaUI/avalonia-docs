---
id: pdf-export
title: PDF Export
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

`PdfSerializer` writes a document as vector PDF 1.7. It is found in the package `Avalonia.Controls.Documents.Serialization.Pdf`, and uses the namespace `Avalonia.Controls.Documents.Serialization.Pdf`.

It is write-only: `CanWrite` is true, `CanRead` is false, and `Deserialize` throws `NotSupportedException`. When exporting to PDF, pagination follows the same rules the paged view does, so the sheets on screen and the pages in the file break in the same places.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## Exporting a document

```csharp
using Avalonia.Controls.Documents.Serialization.Pdf;

await using var stream = File.Create(path);
document.Save(stream, new PdfSerializer());
```

`FlowDocument.Save` takes the snapshot and hands it to the serializer. `SaveAsync` does the same and runs the write on the thread pool. The snapshot is still taken on the calling thread, because reading a document needs the thread that owns it:

```csharp
await document.SaveAsync(stream, new PdfSerializer(options));
```

The serializer's own contract is synchronous, so there is no async pair to await. To keep the UI thread free, you can capture a snapshot and then offload:

```csharp
var snapshot = document.CreateSnapshot();   // on the UI thread
await Task.Run(() => new PdfSerializer(options).Serialize(snapshot, stream, cancellationToken),
               cancellationToken);
```

One snapshot can feed several serializers, which can be worth doing for a "save all formats" command that writes PDF alongside DOCX.

## Running off the UI thread

The export pipeline is UI-free: it consumes the `DocumentSnapshot` directly, creates no controls and needs no dispatcher. Live layout is never a dependency.

Despite the above, PDF export does need an initialized Avalonia platform for the font manager and the text shaper. A bare console process with no Avalonia setup cannot export.

`PdfSerializer` is thread-safe for concurrent operations. Its options are fixed at construction.

## Options

| Property | Default | Meaning |
|---|---|---|
| `PageSize` | `null` | Page size in device-independent pixels. `Null` uses the document's fixed `PageWidth` and `PageHeight`, falling back to A4. |
| `Margins` | `null` | Page margins. `Null` uses the document's `PagePadding`, falling back to 2 cm. |
| `FontEmbedding` | `Full` | See below. |
| `Title` | `null` | Written to the PDF metadata. |
| `Author` | `null` | Written to the PDF metadata. |
| `Subject` | `null` | Written to the PDF metadata. |
| `Keywords` | `null` | Written to the PDF metadata. |
| `Language` | `null` | BCP 47, written as the catalog language. |
| `Deterministic` | `false` | Fixed creation date and file ID instead of the current time and a random ID, for byte-stable output. |
| `Diagnostics` | `null` | Callback for accepted fidelity losses. See below. |
| `Document` | new | Shared serializer options. |

:::note
Page properties are device-independent pixels (1/96 inch), never points. For example, US Letter is 816 x 1056 device-independent pixels. Use `PageSizes` and its conversion helpers rather than literals.
:::

A `PageSize` that is infinite and positive on both axes is rejected before a byte reaches the stream, rather than producing a file no viewer opens. An infinite or negative `Margins` falls back to the 2 cm default.

An explicit `PageSize` or `Margins` acts as the uniform-paper override. A [section with unique page geometry](/controls/input/text-input/richtexteditor/pagination#per-section-page-setup) still starts its own page, but follows the uniform size instead of getting its requested page setup.

If an image if left out of the PDF export by `MaxImageBytes` or `ImageEncodingPolicy` from `Document`, its layout box is kept and pagination is unchanged. `ExportMode` has no effect on this.

```csharp
using Avalonia;
using Avalonia.Controls.Documents;
using Avalonia.Controls.Documents.Serialization;
using Avalonia.Controls.Documents.Serialization.Pdf;

var options = new PdfSerializerOptions
{
    PageSize = PageSizes.Letter,
    Margins = new Thickness(PageSizes.Inches(1)),
    FontEmbedding = PdfFontEmbedding.Full,
    Title = "Quarterly Report",
    Author = "Finance",
    Language = "en-US",
    Deterministic = true,
    Diagnostics = diagnostic => log.Warning(diagnostic.Message),
    Document = new DocumentSerializerOptions
    {
        MaxImageBytes = 4 * 1024 * 1024,
        ImageEncodingPolicy = ImageEncodingPolicy.PreserveEncodedOnly,
    },
};
```

## Fonts

| `PdfFontEmbedding` | Behavior |
|---|---|
| `Full` (default) | Embed the complete font file for every font the document uses. |
| `Subset` | Not implemented yet. Behaves like `Full`. |
| `None` | Embed no font programs, leaving viewers to substitute. Metrics are still written, so layout is approximately preserved |

An embedded typeface becomes one Type0 font with full-file embedding (`FontFile2`, or `FontFile3` for CFF), a `W` widths array and a `ToUnicode` CMap.

### When a font cannot be embedded

A font program stays out of the file when:

- `FontEmbedding` is `None`
- The face has no readable stream
- It is a TrueType collection, or
- Its `OS/2` fsType forbids embedding.

The export does not fail and does not silently produce unreadable pages. Instead, the typeface is written as a **simple font**, with a `Differences` array for anything outside it, its own `Widths` array and a one-byte `ToUnicode` CMap. A viewer substitutes a local face and the text still renders, selects and copies out as the document's text.

Simple fonts carry 255 character codes. If a non-embedded font's text needs more than that, the characters past the limit are dropped from the page and a diagnostic says so.

Color fonts can be embedded, but render as monochrome outlines in viewers.

Variable fonts are rendered as their default instance.

## Diagnostics

Every degradation described above is reported through the optional `Diagnostics` callback, and only through it. The export raises nothing if the callback is null.

```csharp
var losses = new List<PdfDiagnostic>();

var serializer = new PdfSerializer(new PdfSerializerOptions
{
    Diagnostics = losses.Add,
});

serializer.Serialize(snapshot, stream);

foreach (var loss in losses)
    log.Warning("{Kind}: {Message}", loss.Kind, loss.Message);
```

| `PdfDiagnosticKind` | Meaning |
|---|---|
| `FontNotEmbedded` | Font program is missing, so viewers must substitute. Text stays selectable and metrics are preserved. |
| `FontFidelity` | Font is embedded but cannot render identically, e.g., color glyph data ignored, or a variable font renders as its default instance. |
| `EncodingExhausted` | A non-embedded font's text needs more than the 255 codes a simple font provides. Characters past the limit are dropped from the page. |

`PdfDiagnostic` is a `readonly record struct` of `Kind` and `Message`. Its `ToString()` is the message. The callback is invoked on the thread running the export, before any bytes reach the target stream.

## What gets exported

- **Text:** Laid out with the same engine as the editor.
- **Blocks:** Including lists, tables, sections, images and hyperlink annotations.
- **Page bands:** Headers and footers. Bands that shorten the page body are exported exactly as shown on screen in paged layouts.
- **Footnotes:** Notes appear at the bottom of the page where its anchor is located, below the separator rule. Hyperlinks inside note bodies keep their annotations.
- **Pagination:** Decided by explicit `BreakPageBefore` breaks, the keep rules, widow control, and atomic table rows. Per-section page setups receive a `MediaBox` per page.

## See also

- [Pagination](/controls/input/text-input/richtexteditor/pagination) - the break rules the export shares with the paged view
- [Headers and footers](/controls/input/text-input/richtexteditor/headers-and-footers) - the bands each page resolves
- [Footnotes](/controls/input/text-input/richtexteditor/footnotes) - notes at the bottom of their anchor's page
- [Thread safety](/controls/input/text-input/richtexteditor/thread-safety) - snapshots and background work
