---
id: pdf-export
title: PDF Export
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

`PdfSerializer` (package `Avalonia.Controls.Documents.Serialization.Pdf`, namespace `Avalonia.Controls.Documents.Serialization.Pdf`) writes a document as vector PDF 1.7. It paginates with the same rules the paged view does, so the sheets on screen and the pages in the file break in the same places.

It is write-only: `CanWrite` is true, `CanRead` is false, and `Deserialize` throws `NotSupportedException`. Filter serializer lists on `CanRead`/`CanWrite` rather than catching that.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## Exporting a document

```csharp
using Avalonia.Controls.Documents.Serialization.Pdf;

await using var stream = File.Create(path);
document.Save(stream, new PdfSerializer());
```

`FlowDocument.Save` takes the snapshot and hands it to the serializer. `SaveAsync` does the same and runs the write on the thread pool; the snapshot is still taken on the calling thread, because reading a document needs the thread that owns it:

```csharp
await document.SaveAsync(stream, new PdfSerializer(options));
```

The serializer's own contract is synchronous, and deliberately so: nothing here performs asynchronous I/O, so there is no async pair to await. To keep the cost off a UI thread yourself, capture and then offload:

```csharp
var snapshot = document.CreateSnapshot();   // on the UI thread
await Task.Run(() => new PdfSerializer(options).Serialize(snapshot, stream, cancellationToken),
               cancellationToken);
```

One snapshot can feed several serializers, which is worth doing when a "save all formats" command writes PDF alongside DOCX.

:::info
The synchronous `IDocumentSerializer` contract is a 13.0 change. See [Upgrading to 13.0](/controls/input/text-input/richtexteditor/upgrading-to-13#serializing-off-the-calling-thread) for the pattern that replaces an awaited `SerializeAsync`.
:::

## Running off the UI thread

The export pipeline is UI-free: it consumes the `DocumentSnapshot` directly, creates no controls and needs no dispatcher, so it runs on any thread. Live layout is never a dependency; the layout it does is its own.

It does need an initialized Avalonia platform for the font manager and the text shaper. A bare console process with no Avalonia set up cannot export.

`PdfSerializer` is thread-safe for concurrent operations: its options are fixed at construction.

## Options

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

| Property | Default | Meaning |
|---|---|---|
| `PageSize` | `null` | Page size in device-independent pixels. Null uses the document's fixed `PageWidth`/`PageHeight`, falling back to A4 per axis |
| `Margins` | `null` | Page margins. Null uses the document's `PagePadding`, falling back to 2 cm |
| `FontEmbedding` | `Full` | See below |
| `Title`, `Author`, `Subject`, `Keywords` | `null` | Written to the PDF metadata |
| `Language` | `null` | BCP 47, written as the catalog language |
| `Deterministic` | `false` | Fixed creation date and file identifier instead of the current time and a random id, for byte-stable output |
| `Diagnostics` | `null` | Callback for accepted fidelity losses; see below |
| `Document` | new | Shared serializer options |

:::note
Page properties are device-independent pixels (1/96 inch), never points. US Letter is 612 x 792 points but 816 x 1056 device-independent pixels. Use `PageSizes` and its conversion helpers rather than literals.
:::

A `PageSize` that is not finite and positive on both axes is rejected before a byte reaches the stream, rather than producing a file no viewer opens. A non-finite or negative `Margins` component falls back to the 2 cm default.

An explicit `PageSize` or `Margins` is the uniform-paper override. A [page-geometry section](/controls/input/text-input/richtexteditor/pagination#per-section-page-setup) still starts its own page; it just does not get its own paper.

From `Document` the export reads `MaxImageBytes` and `ImageEncodingPolicy`. An image those two rule out is left out of the file with its layout box kept, so pagination is unchanged. `ExportMode` has no effect here: it chooses between round-trip markers and native constructs, and PDF is not a format this library reads back.

## Fonts

| `PdfFontEmbedding` | Behaviour |
|---|---|
| `Full` (default) | Embed the complete font file for every font the document uses |
| `Subset` | Not implemented yet; behaves like `Full` |
| `None` | Embed no font programs. Viewers substitute; metrics are still written, so layout is approximately preserved |

An embedded typeface becomes one Type0 font with full-file embedding (`FontFile2`, or `FontFile3` for CFF), a `W` widths array and a `ToUnicode` CMap.

### When a font cannot be embedded

A font program stays out of the file when `FontEmbedding` is `None`, when the face has no readable stream, when it is a TrueType collection, or when its `OS/2` fsType forbids embedding. The fsType gate tests each licence bit on its own, so a font restricted to bitmap embedding, or one pairing the restricted-licence bit with another usage bit, is refused.

The export does not fail and does not silently produce unreadable pages. The typeface is written as a **simple font** instead: single-byte character codes over `WinAnsiEncoding`, with a `Differences` array for anything outside it, its own `Widths` array and a one-byte `ToUnicode` CMap. A viewer substitutes a local face and the text still renders, selects and copies out as the document's text; the letterforms are the substitute's, not the document's.

Simple fonts carry 255 character codes. Where a non-embedded font's text needs more than that, the characters past the limit are dropped from the page and a diagnostic says so.

Two more fidelity limits worth knowing: a colour font embeds but renders as monochrome outlines in viewers, and a variable font renders its default instance.

## Diagnostics

Every degradation above is reported through the optional `Diagnostics` callback, and only through it. The export raises nothing when the callback is null, and the checks cost nothing then.

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
| `FontNotEmbedded` | The font program is missing, so viewers substitute. Text stays selectable and metrics are preserved; the letterforms are not the document's |
| `FontFidelity` | The font is embedded but cannot render identically: colour glyph data ignored, or a variable font at its default instance |
| `EncodingExhausted` | A non-embedded font's text needs more than the 255 codes a simple font provides; the characters past the limit are dropped from the page |

`PdfDiagnostic` is a `readonly record struct` of `Kind` and `Message`, and its `ToString()` is the message. The callback is invoked on the thread running the export, before any bytes reach the target stream.

## What gets exported

- **Text** laid out with the same engine as the editor: line breaking, wrapping, alignment, line height, letter spacing, bidi and font fallback, emitted glyph-exact with kerning adjustments. Underline, strikethrough and overline; run and block backgrounds; faux bold and oblique for simulated faces.
- **Blocks**: lists with the editor's shared marker column, tables (Pixel/Auto/Star columns, merged cells, vertical alignment, row-group, row and cell backgrounds, interior gridlines), sections, images (JPEG passthrough, everything else re-encoded with an alpha SMask), and hyperlink annotations.
- **Page bands**: the header and footer each page resolves through the shared policy, in the margin areas one band distance from the sheet edge. A band with page-number fields composes per page, so PAGE and NUMPAGES show that page's numbers, and a band that outgrows its margin shortens the page's body exactly as on screen.
- **Footnotes**: each note at the bottom of the page its anchor lands on, below the separator rule, with its number in the shared strip. Hyperlinks inside note bodies keep their annotations.
- **Pagination**: explicit `BreakPageBefore` breaks, the keep rules, widow control, atomic table rows, and per-section page setup as a MediaBox per page.

## Limitations

| Limitation | Notes |
|---|---|
| Write only | `Deserialize` throws `NotSupportedException` |
| No font subsetting | `PdfFontEmbedding.Subset` behaves like `Full` |
| Colour fonts render monochrome | Reported as `FontFidelity` |
| Variable fonts render their default instance | Reported as `FontFidelity` |
| No tagged-PDF structure tree | `Language` and the metadata fields are the accessibility surface today |

## See also

- [Pagination](/controls/input/text-input/richtexteditor/pagination) - the break rules the export shares with the paged view
- [Headers and footers](/controls/input/text-input/richtexteditor/headers-and-footers) - the bands each page resolves
- [Footnotes](/controls/input/text-input/richtexteditor/footnotes) - notes at the bottom of their anchor's page
- [Thread safety](/controls/input/text-input/richtexteditor/thread-safety) - snapshots and background work
- [Upgrading to 13.0](/controls/input/text-input/richtexteditor/upgrading-to-13) - the synchronous serializer contract
