---
id: document-viewer
title: Document Viewer
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use `FlowDocumentScrollViewer` to display rich documents without editing. This guide covers setup, document loading, styling, layout, and common viewer patterns.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## When to use FlowDocumentScrollViewer

Three controls can host a `FlowDocument`:

| Control | Purpose | Selection / Copy | Caret | Undo | Overhead |
|---|---|---|---|---|---|
| `FlowDocumentScrollViewer` | Read-only display in one continuous column | Yes | No | No | Low |
| `FlowDocumentPageViewer` | Read-only display as discrete page sheets | Yes | No | No | Low |
| `RichTextEditor` | Interactive editing | Yes | Yes | Yes | Higher |
<br />

Use `FlowDocumentScrollViewer` for help panes, report previews, file browsers, and read-only summaries. It supports text selection and clipboard copy out of the box (powered by the same `TextViewMouse` / `TextViewKeyboard` components used by the editor) but exposes no insertion caret, no editing actions, and no undo manager.

Use `FlowDocumentPageViewer` when the reader should see real pages: print preview, page-faithful review, page navigation and zoom. It derives from `FlowDocumentScrollViewer`, and it paginates through the same shared break policy that print and PDF export use, so the three agree by construction.

Use `RichTextEditor` with `IsReadOnly="True"` only when you need an insertion caret on otherwise-read-only content (e.g. for placing a cursor without allowing edits). This pulls in the full editing infrastructure (caret element, undo manager, editing components).

Both viewers select inside page bands and footnotes: a press into a header, footer or note region moves the selection into that nested document.

## Installation

```bash
# Core package (includes FlowDocument, FlowDocumentScrollViewer, PlainTextSerializer)
dotnet add package Avalonia.Controls.RichTextEditor

# Add serializers for the formats you need
dotnet add package Avalonia.Controls.Documents.Serialization.Rtf     # RTF
dotnet add package Avalonia.Controls.Documents.Serialization.Docx    # DOCX (Open XML)
dotnet add package Avalonia.Controls.Documents.Serialization.Xaml    # XAML round-trip
dotnet add package Avalonia.Controls.Documents.Serialization.Html    # HTML import (read only)
dotnet add package Avalonia.Controls.Documents.Serialization.Pdf     # PDF export (write only)
```

All document types (`FlowDocument`, `Paragraph`, `RichRun`, etc.) and `FlowDocumentScrollViewer` are mapped to the default Avalonia XML namespace (`https://github.com/avaloniaui`). No extra `xmlns` declarations are needed.

## Minimal XAML example

`FlowDocument` is the `[Content]` property of `FlowDocumentScrollViewer`, so it can be written directly as a child element:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Document Viewer" Width="800" Height="600">

    <FlowDocumentScrollViewer Padding="20">
        <FlowDocument FontSize="14">
            <Paragraph FontSize="24" FontWeight="Bold">
                <RichRun Text="Welcome" />
            </Paragraph>
            <Paragraph>
                <RichRun Text="This document is displayed in a read-only viewer." />
            </Paragraph>
        </FlowDocument>
    </FlowDocumentScrollViewer>

</Window>
```

The viewer wraps a virtualized `TextViewBase` inside a `ScrollViewer`. Vertical scrolling is enabled by default; horizontal scrolling is disabled.

## Loading documents from files

### Async loading (preferred)

Use `FlowDocument.LoadAsync` to deserialize a file and assign the result to the viewer:

```csharp
await using var stream = File.OpenRead("report.rtf");
var document = await FlowDocument.LoadAsync(stream, new RtfSerializer());
viewer.Document = document;
```

`LoadAsync` parses on the thread pool, then builds the element tree on the UI thread through an explicit dispatcher call. The returned `FlowDocument` is ready to display immediately.

:::info
`IDocumentSerializer` is synchronous. `LoadAsync` and `SaveAsync` are thread-offload conveniences, but the element tree must still be built on the UI thread because a `FlowDocument` and its elements belong to the dispatcher of the thread that constructed them.

If you need to stay off the UI thread entirely, read a `DocumentSnapshot` with the serializer and materialize it with `TextDocument.FromSnapshot`.
:::

### Synchronous loading

```csharp
using var stream = File.OpenRead("report.rtf");
viewer.Document = FlowDocument.Load(stream, new RtfSerializer());
```

`Load` parses and builds on the calling thread, so async loading is preferred for large files. Both overloads take an optional `CancellationToken`.

### Choosing a serializer

Pick a serializer based on the file format:

| Extension | Serializer | Package | Direction |
|---|---|---|---|
| `.rtf` | `RtfSerializer` | `Avalonia.Controls.Documents.Serialization.Rtf` | Read and write |
| `.docx` | `DocxSerializer` | `Avalonia.Controls.Documents.Serialization.Docx` | Read and write |
| `.xaml` / `.axaml` | `XamlSerializer` | `Avalonia.Controls.Documents.Serialization.Xaml` | Read and write |
| `.md` | `MarkdownSerializer` | `Avalonia.Controls.Markdown` | Read and write |
| `.html` | `HtmlSerializer` | `Avalonia.Controls.Documents.Serialization.Html` | Read only |
| `.pdf` | `PdfSerializer` | `Avalonia.Controls.Documents.Serialization.Pdf` | Write only |
| `.txt` | `PlainTextSerializer` | Included in `Avalonia.Controls.Documents` (core) | Read and write |
<br />

Every serializer reports its direction through `CanRead` and `CanWrite`, allowing a format picker to filter the list. There is no built-in format registry, so discovery depends on the application. `MarkdownSerializer` accepts any readable stream, so it is tried last.

A helper method that maps extensions to serializers:

```csharp
static IDocumentSerializer GetSerializer(string path)
{
    return Path.GetExtension(path).ToLowerInvariant() switch
    {
        ".rtf" => new RtfSerializer(),
        ".docx" => new DocxSerializer(),
        ".xaml" or ".axaml" => new XamlSerializer(),
        _ => new PlainTextSerializer()
    };
}
```

### Loading from embedded resources

Use Avalonia's `AssetLoader` to open a stream from an assembly resource.
Use a `.xml` extension for FlowDocument data files — `.axaml` and `.xaml` extensions
trigger Avalonia's XAML compiler, which cannot compile `FlowDocument` root elements.

```csharp
var uri = new Uri("avares://MyApp/Assets/Help.xml");
using var stream = AssetLoader.Open(uri);
viewer.Document = FlowDocument.Load(stream, new XamlSerializer());
```

### Loading from a byte array

```csharp
using var stream = new MemoryStream(rtfBytes);
viewer.Document = await FlowDocument.LoadAsync(stream, new RtfSerializer());
```

## Building documents in code

### Manual construction

```csharp
var document = new FlowDocument();

// Heading
var heading = new Paragraph
{
    FontSize = 24,
    FontWeight = FontWeight.Bold,
    Margin = new Thickness(0, 0, 0, 10)
};
heading.Inlines.Add(new RichRun { Text = "Report Title" });
document.Blocks.Add(heading);

// Body paragraph with mixed formatting
var body = new Paragraph();
body.Inlines.Add(new RichRun { Text = "Status: " });
body.Inlines.Add(new RichBold(new RichRun { Text = "Complete" }));
body.Inlines.Add(new RichRun { Text = ". See " });
body.Inlines.Add(new RichHyperlink(new RichRun { Text = "details" })
{
    NavigateUri = new Uri("https://example.com")
});
body.Inlines.Add(new RichRun { Text = " for more information." });
document.Blocks.Add(body);

viewer.Document = document;
```

### FlowDocumentBuilder (fluent API)

`FlowDocumentBuilder` provides a concise fluent interface for building documents:

```csharp
using Avalonia.Controls.Documents;                             // FlowDocumentBuilder, InlineFactory
using Avalonia.Controls.Documents.Primitives.DocumentNodes;    // TextMarkerStyle

var document = FlowDocumentBuilder.Create()
    .AddParagraph("Report Title")
    .AddParagraph()
    .AddText("Body text with ")
    .AddBold("bold")
    .AddText(" and ")
    .AddItalic("italic")
    .AddText(" formatting.")
    .Build();

viewer.Document = document;
```

The builder supports lists and tables as well:

```csharp
var document = FlowDocumentBuilder.Create()
    .AddParagraph("Shopping List")
    .StartList(TextMarkerStyle.Disc)
        .AddListItem("Apples")
        .AddListItem("Bread")
        .AddListItem("Milk")
    .EndList()
    .AddParagraph("Price Table")
    .StartTable()
        .SetTableColumns(new double[] { 200, 100 })
        .StartTableRow()
            .AddTableCell("Item")
            .AddTableCell("Price")
        .EndTableRow()
        .StartTableRow()
            .AddTableCell("Apples")
            .AddTableCell("$3.00")
        .EndTableRow()
    .EndTable()
    .Build();
```

The `InlineFactory` class provides static factory methods for composing inlines:

```csharp
var doc = FlowDocumentBuilder.Create()
    .AddParagraph(
        InlineFactory.Text("Normal "),
        InlineFactory.Bold("bold "),
        InlineFactory.Italic("italic"))
    .Build();
```

The builder is best suited for linear documents. For deeply nested structures (tables within list items, sections with mixed content), manual construction gives more control.

## Document structure reference

```
FlowDocument
├── Paragraph              Block containing inline elements
│   ├── RichRun            Text with uniform formatting
│   ├── RichBold           Bold wrapper (RichSpan subclass)
│   ├── RichItalic         Italic wrapper
│   ├── RichUnderline      Underline wrapper
│   ├── RichSuperscript    Superscript positioning
│   ├── RichSubscript      Subscript positioning
│   ├── RichSpan           Generic inline container
│   ├── RichHyperlink      Clickable link (NavigateUri)
│   ├── RichLineBreak      Explicit line break
│   └── RichInlineUIContainer  Embedded control (inline)
├── Section                Groups blocks together
├── List                   Bulleted or numbered list
│   └── ListItem           Contains blocks (Paragraph, nested List, ...)
├── Table                  Grid layout
│   ├── TableColumn        Column width definitions
│   └── TableRowGroup      Header/body/footer grouping
│       └── TableRow
│           └── TableCell  Contains blocks
└── BlockUIContainer       Embedded control (full-width block)
```

### Common block properties

All blocks inherit from `Block` and share these properties:

| Property | Type | Description |
|---|---|---|
| `Margin` | `Thickness` | Outer spacing |
| `Padding` | `Thickness` | Inner spacing |
| `BorderThickness` | `Thickness` | Border width |
| `BorderBrush` | `IBrush?` | Border color |
| `CornerRadius` | `CornerRadius` | Rounded corners |
| `TextAlignment` | `TextAlignment` | Left, Center, Right, Justify (inherited) |
| `LineHeight` | `double` | Line spacing |
| `FlowDirection` | `FlowDirection` | LTR or RTL (inherited) |

### Common inline properties

| Property | Type | Available On |
|---|---|---|
| `Text` | `string` | `RichRun` |
| `FontSize` | `double` | All inlines (inherited) |
| `FontWeight` | `FontWeight` | All inlines (inherited) |
| `FontStyle` | `FontStyle` | All inlines (inherited) |
| `FontFamily` | `FontFamily` | All inlines (inherited) |
| `Foreground` | `IBrush?` | All inlines (inherited) |
| `TextDecorations` | `TextDecorationCollection?` | All inlines |
| `BaselineAlignment` | `BaselineAlignment` | All inlines |

## Styling and theming

### Document-level defaults

`FlowDocument` properties cascade to all child elements:

```xml
<FlowDocumentScrollViewer>
    <FlowDocument FontFamily="Segoe UI" FontSize="14"
                  Foreground="#333333" TextAlignment="Left">
        <Paragraph>
            <RichRun Text="Inherits font and color from FlowDocument." />
        </Paragraph>
    </FlowDocument>
</FlowDocumentScrollViewer>
```

Individual elements override the defaults:

```xml
<Paragraph FontSize="24" FontWeight="Bold" Foreground="DarkBlue">
    <RichRun Text="This heading overrides the document defaults." />
</Paragraph>
```

### Theming with styles

Use Avalonia styles to control the viewer's appearance:

```xml
<Window.Styles>
    <Style Selector="FlowDocumentScrollViewer">
        <Setter Property="Background" Value="{DynamicResource SystemRegionBrush}" />
        <Setter Property="Padding" Value="24" />
    </Style>
</Window.Styles>
```

### Hyperlinks

`RichHyperlink` supports the `NavigateUri` property and raises a `RequestNavigate` routed event:

```xml
<Paragraph>
    <RichRun Text="Visit the " />
    <RichHyperlink NavigateUri="https://avaloniaui.net">
        <RichRun Text="Avalonia website" />
    </RichHyperlink>
    <RichRun Text=" for more information." />
</Paragraph>
```

Handle navigation in code-behind:

```csharp
viewer.AddHandler(RichHyperlink.RequestNavigateEvent, (sender, e) =>
{
    if (e.Uri is { } uri)
    {
        Process.Start(new ProcessStartInfo(uri.AbsoluteUri) { UseShellExecute = true });
        e.Handled = true;
    }
});
```

`RichHyperlink` exposes `:pointerover`, `:pressed`, and `:visited` pseudo-classes for styling.

## Page layout

### PageWidth and PagePadding

By default, content fills the available width (`PageWidth = NaN`). Set a fixed `PageWidth` to simulate a fixed-width page:

```xml
<FlowDocumentScrollViewer>
    <FlowDocument PageWidth="700" PagePadding="40">
        <Paragraph>
            <RichRun Text="This content is constrained to a 700 DIP wide page with 40 DIP padding." />
        </Paragraph>
    </FlowDocument>
</FlowDocumentScrollViewer>
```

When `PageWidth` is set, the page area is centered within the viewer and the background outside the page area remains visible.

### ShowPageBounds

Enable `ShowPageBounds` to render visual indicators at the page boundary. This is useful for print-preview scenarios:

```xml
<FlowDocumentScrollViewer ShowPageBounds="True">
    <FlowDocument PageWidth="700" PagePadding="40" PageHeight="900">
        <!-- Content -->
    </FlowDocument>
</FlowDocumentScrollViewer>
```

### Viewer properties

| Property | Type | Description | Default |
|---|---|---|---|
| `IsSelectionEnabled` | `bool` | Set to `False` to make the viewer a pure display control. The inner view stops being focusable, which matters for a viewer inside an items control. | `true` |
| `IsCaretVisible` | `bool` | Shows an insertion caret without enabling editing. | `false` |
| `ShowPageBounds` | `bool` | Draws indicators at the page boundary. | `false` |
| `ShowPageBreakMarkers` | `bool` | Draws a dashed rule across the top edge of a block carrying `BreakPageBefore`. Can be colored by `PageBreakMarkerBrush`. Defaults `false` in the page viewer. | `true` |
| `ShowPageBandsInContinuousLayout` | `bool` | Shows the document's running header above the first block and its running footer below the last. No effect in the page viewer. | `false` |

## Embedding controls

### BlockUIContainer

Embed any Avalonia control as a full-width block element:

```xml
<FlowDocumentScrollViewer>
    <FlowDocument>
        <Paragraph FontSize="20" FontWeight="Bold">
            <RichRun Text="Monthly Revenue" />
        </Paragraph>
        <BlockUIContainer>
            <Image Source="/Assets/revenue-chart.png" MaxHeight="300"
                   HorizontalAlignment="Center" />
        </BlockUIContainer>
        <Paragraph>
            <RichRun Text="Figure 1: Revenue trends for the past 12 months." />
        </Paragraph>
    </FlowDocument>
</FlowDocumentScrollViewer>
```

In code:

```csharp
var container = new BlockUIContainer(new Image
{
    Source = bitmap,
    MaxHeight = 300
});
document.Blocks.Add(container);
```

### RichInlineUIContainer

Embed a small control inline with text:

```xml
<Paragraph>
    <RichRun Text="Status: " />
    <RichInlineUIContainer>
        <Border Background="Green" CornerRadius="4" Padding="4,2">
            <TextBlock Text="Active" Foreground="White" FontSize="11" />
        </Border>
    </RichInlineUIContainer>
    <RichRun Text=" since January 2026." />
</Paragraph>
```

:::note
Embedded controls are live Avalonia controls. They participate in layout and rendering but are not captured in serialization snapshots.
:::

## Background loading and thread safety

### Safe async pattern

`FlowDocument.LoadAsync` deserializes on a background thread and returns a document ready for UI-thread assignment:

```csharp
async Task LoadDocumentAsync(string path)
{
    IDocumentSerializer serializer = GetSerializer(path);

    await using var stream = File.OpenRead(path);
    viewer.Document = await FlowDocument.LoadAsync(stream, serializer);
}
```

### Snapshot-based workflows

For conversion pipelines (load, display, re-export), call `CreateSnapshot()` once and share the result across operations. Snapshots are immutable and safe to use from any thread:

`FlowDocumentScrollViewer.Document` is typed `FlowDocument?`, so check it before dereferencing:

```csharp
// UI thread: take a snapshot
if (viewer.Document is null) return;
var snapshot = viewer.Document.CreateSnapshot();

// Background thread: serialize to multiple formats from one snapshot.
// IDocumentSerializer is synchronous, so Task.Run is what moves the work
// off the UI thread.
await Task.Run(() =>
{
    using var rtfStream = File.Create("output.rtf");
    new RtfSerializer().Serialize(snapshot, rtfStream);

    using var docxStream = File.Create("output.docx");
    new DocxSerializer().Serialize(snapshot, docxStream);
});
```

`SaveAsync` is a convenience wrapper that creates a snapshot and serializes in one call. Use `CreateSnapshot()` directly when you need to serialize to multiple formats from the same document state.

For a detailed discussion of threading constraints, see the [Thread Safety](/controls/input/text-input/richtexteditor/thread-safety) guide.

## Performance considerations

### Virtualization

`FlowDocumentScrollViewer` virtualizes rendering through its inner `TextViewBase`:

- Only blocks within the viewport plus a buffer zone are realized and measured.
- Unrealized blocks use an estimated height that starts at 24 DIPs and adapts dynamically as blocks are measured. The estimate is a running average of all measured block heights.
- As the user scrolls, estimates are replaced by actual measurements. This can cause minor scroll-position adjustments on first scroll through unseen content.

This means documents with thousands of blocks remain responsive — rendering cost is proportional to visible content, not total document size.

### Large documents

For documents with many blocks:

- Use `FlowDocument.LoadAsync` to avoid blocking the UI thread during deserialization.
- Avoid `PageWidth` values significantly wider than the viewport. Wider pages produce longer text lines, increasing line-breaking and rendering work.
- If loading user-provided files, validate file size before opening.

### Reuse snapshots

When a document is used in a preview-then-export pipeline, create a single `DocumentSnapshot` with `CreateSnapshot()` and reuse it. Each call traverses the document tree (O(n) for structure). One snapshot can be serialized to multiple formats without redundant tree walks.

For more optimization techniques, see the [Performance Tuning](/controls/input/text-input/richtexteditor/performance-tuning) guide.

## Common patterns

### File preview pane

A file browser that previews documents as the user selects files. Cancel in-flight loads when the selection changes:

```csharp
public partial class FilePreviewPane : UserControl
{
    private CancellationTokenSource? _loadCts;

    public async Task PreviewFileAsync(string path)
    {
        // Cancel any previous load
        _loadCts?.Cancel();
        _loadCts = new CancellationTokenSource();
        var token = _loadCts.Token;

        try
        {
            IDocumentSerializer serializer = GetSerializer(path);
            await using var stream = File.OpenRead(path);
            var document = await FlowDocument.LoadAsync(stream, serializer, token);

            token.ThrowIfCancellationRequested();
            Viewer.Document = document;
        }
        catch (OperationCanceledException)
        {
            // Selection changed before load completed — expected
        }
    }
}
```

### Help / about viewer

Load a static XAML document from an embedded resource:

```csharp
public partial class HelpWindow : Window
{
    public HelpWindow()
    {
        InitializeComponent();

        var uri = new Uri("avares://MyApp/Assets/Help.xml");
        using var stream = AssetLoader.Open(uri);
        HelpViewer.Document = FlowDocument.Load(stream, new XamlSerializer());
    }
}
```

```xml
<!-- HelpWindow.axaml -->
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="MyApp.HelpWindow"
        Title="Help" Width="600" Height="500">
    <FlowDocumentScrollViewer x:Name="HelpViewer" Padding="20" />
</Window>
```

### Print preview

For a true print preview use `FlowDocumentPageViewer`, which lays the document out as real page sheets with the same pagination that PDF export produces. Within the continuous viewer, `ShowPageBounds` plus a fixed `PageWidth` and `PageHeight` visualizes the page boundaries in the flowing column:

```xml
<FlowDocumentScrollViewer ShowPageBounds="True"
                          Background="#F0F0F0"
                          Padding="40">
    <FlowDocument PageWidth="816" PageHeight="1056" PagePadding="72">
        <!-- US Letter: 8.5 x 11 inches = 816 x 1056 device-independent pixels
             (96 per inch); 72 DIP padding = 0.75 inch margins. -->
        <Paragraph FontSize="20" FontWeight="Bold">
            <RichRun Text="Quarterly Report" />
        </Paragraph>
        <Paragraph>
            <RichRun Text="Content laid out within print margins." />
        </Paragraph>
    </FlowDocument>
</FlowDocumentScrollViewer>
```

### Dynamic report generation

Generate a report from a data model and display it:

```csharp
FlowDocument BuildReport(IReadOnlyList<SalesRecord> records)
{
    var builder = FlowDocumentBuilder.Create()
        .AddParagraph("Sales Report");

    builder.StartTable()
        .SetTableColumns(new double[] { 200, 120, 120 })
        .StartTableRow()
            .AddTableCell("Product")
            .AddTableCell("Quantity")
            .AddTableCell("Revenue")
        .EndTableRow();

    foreach (var record in records)
    {
        builder.StartTableRow()
            .AddTableCell(record.Product)
            .AddTableCell(record.Quantity.ToString())
            .AddTableCell(record.Revenue.ToString("C"))
        .EndTableRow();
    }

    builder.EndTable();

    builder.AddParagraph()
        .AddText("Total revenue: ")
        .AddBold(records.Sum(r => r.Revenue).ToString("C"));

    return builder.Build();
}

// Usage
viewer.Document = BuildReport(salesData);
```

## Limitations

Current limitations of `FlowDocumentScrollViewer`:

| Limitation | Workaround / Details |
|---|---|
| No insertion caret and no editing | Use `RichTextEditor` for editing |
| No built-in search/find | Implement search against document text and scroll programmatically |
| Continuous scroll only | Use `FlowDocumentPageViewer` for discrete page sheets; `ShowPageBounds` shows boundaries in the flowing column |
| Embedded controls not serialized | `BlockUIContainer` / `RichInlineUIContainer` children are excluded from snapshots |
| `ITextView` not publicly exposed | The `TextView` property on `FlowDocumentScrollViewer` is internal; the host's `ITextViewHost.TextView` explicit interface implementation is the only public access |
