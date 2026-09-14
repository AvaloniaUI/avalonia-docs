---
id: pagination
title: Pagination
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

Paginated output, the paged view of `FlowDocumentPageViewer`, the editor in `DocumentViewMode.PageLayout` and the [PDF export](/controls/input/text-input/richtexteditor/pdf-export) display content by filling pages line by line and consulting the document for where a page may end. This guide covers how to control page layout: explicit page breaks, the three keep rules, and per-section page setup.

The continuous view ignores every one of them except drawing the page-break marker.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## Identical output

There are two pagination engines: the paged view's fill walk and the PDF paginator. Although they have their own processing mechanics, both follow the same rules to decide where a page ends. As a result, the same document breaks on the same lines on screen and in a PDF export.

## Explicit page breaks

There is no page-break element. A break is a request on a block: `Block.BreakPageBefore`.

```csharp title="C#"
heading.BreakPageBefore = true;
```

```xml title="XAML"
<Paragraph BreakPageBefore="True" FontSize="18" FontWeight="Bold">
    <RichRun Text="Appendix A" />
</Paragraph>
```

In the editor, <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (or <kbd>Cmd</kbd>+<kbd>Return</kbd> on macOS) applies `BreakPageBefore` at the caret, replacing any selection. The action is one undo step. The effect of the break on content depends on the caret's position:

- At a block boundary, it sets `BreakPageBefore` on the following block.
- Mid-content, it splits the block like <kbd>Enter</kbd>.

Deleting a break results in a paragraph merge, causing the flagged paragraph to merge with its preceding neighbor and the flag to travel away. If merging is impossible, the deletion only clears the flag.

An explicit break always wins over a keep rule. Forced cuts are never keep-adjusted.

The flag round-trips through every format from the one place it lives:

- In DOCX, it becomes `w:pageBreakBefore`, including style-defined breaks, or `w:br` on read.
- In RTF, it becomes `\pagebb`, or `\page` on read.
- In XAML and plain text, it writes a form feed as the flagged block's separator, and maps form feeds back to the flag on read.

### Seeing breaks in the continuous view

Continuous views mark a flagged block with a dashed rule across its top edge, similar to draft view in MS Word. It is paint-only and never affects layout.

| Member (on `TextViewBase`) | Default | Meaning |
|---|---|---|
| `ShowPageBreakMarkers` | `true` | Whether the rule is drawn |
| `PageBreakMarkerBrush` | `DocumentPageBreakMarkerBrush` | The rule's color |

## Keep rules

Three properties determine where an automatic cut lands. All three move a cut earlier, never later. All three round-trip through DOCX, RTF and XAML; the HTML reader maps `break-inside: avoid`, `break-after: avoid` and `orphans`/`widows` onto them.

| Property | Effect | DOCX | RTF |
|---|---|---|---|
| `Block.KeepTogether` | Move the whole block to the next page rather than split it | `w:keepLines` | `\keep` |
| `Block.KeepWithNext` | Keep the block's end on the same page as the next block's start | `w:keepNext` | `\keepn` |
| `Paragraph.WidowControl` | Keep at least two lines of the paragraph on each side of a break | `w:widowControl` | `\nowidctlpar` when off |
<br />

```csharp
heading.KeepWithNext = true;      // a heading never ends a page alone
table.KeepTogether = true;        // this table moves rather than splits
paragraph.WidowControl = false;   // let this paragraph strand a single line
```

`KeepTogether` cannot prevent a block paginating if it is taller than one page.

`KeepWithNext` chains. You can have consecutive flagged blocks (e.g., a heading, a subheading and the first paragraph) that move as one unit. Like `KeepTogether`, this cannot prevent pagination if the chain is longer than one page.

### Widow control

`Paragraph.WidowControl` is `true` by default, meaning at least two lines stay on the page and at least two move. A three-line paragraph never splits at all.

To let a paragraph strand a single line, turn it off:

```csharp
foreach (var block in document.Blocks)
{
    if (block is Paragraph paragraph)
        paragraph.WidowControl = false;
}
```

The default only applies to paragraphs for which no other settings are in place. A document loaded from DOCX or RTF carries whatever the file says, style-defined values included.

## Per-section page setup

A `Section` can declare its own page setup. `PageWidth`, `PageHeight` and `PagePadding` are inherited from the document's property definitions, or that of an enclosing section, when none are declared.

A section that declares **any** of the three properties is a page-geometry section:

- It starts on a fresh page. The content after it starts on another.
- Its pages use its page size and margins.
- Its content is measured and wrapped at its own content width.
- Entering and leaving it are break edges, so they sever a keep-with-next chain the way an explicit break does.

```xml title="XAML"
<Section PageWidth="1056" PageHeight="816" PagePadding="48">
    <Paragraph FontSize="18" FontWeight="Bold">
        <RichRun Text="Wide Tables" />
    </Paragraph>
    <Paragraph>
        <RichRun Text="This section is US Letter on its side." />
    </Paragraph>
</Section>
```

```csharp title="C#"
using Avalonia;
using Avalonia.Controls.Documents;

var landscape = PageSizes.Landscape(PageSizes.Letter);
var section = new Section
{
    PageWidth = landscape.Width,
    PageHeight = landscape.Height,
    PagePadding = new Thickness(PageSizes.Inches(0.5)),
};
```

A section without page setup stays a pure grouping container with no page semantics. Page bands (i.e., headers and footers) ignore section geometry entirely.

In paged view, each section is rendered at its specified page size, centered on its width. Page navigation, `CurrentPageNumber`, fit zoom and scroll geometry follow the variable stack, i.e., scrolling into a landscape section re-fits to the wider sheet.

PDF export emits a `MediaBox` per page, which breaks the document on identical boundaries.

There is a uniform-paper override. An explicit `PageSize` or `PageMargins` on the viewer, or `PdfSerializerOptions.PageSize` and `Margins`, causes all pages to be the same size. A section with a unique page setup still starts its own page, but does not get the requested page setup.

Section page setup round-trips through DOCX (`sectPr`), RTF and XAML, and travels in range snapshots and `Clone`.

## How content fills a page

For reference, these are the fill rules the page-break policy sits on top of:

- Pages fill line by line. A line that does not fit starts the next page exactly at its content top, and the spacing above it is swallowed at the page top.
- A line taller than a page overflows.
- Paragraphs split mid-content.
- Lists split between and inside items.
- Tables split between rows and never through one. Rows covered by a row-spanning cell move together with their anchor row. The grid closes above the break and reopens below it.
- A split element stays one element whose geometry spans pages. Selection, copy, caret placement and hit-testing all work mid-fragment.

Footnotes take part in the fill. A line carrying anchors reserves its notes' heights at the bottom of its page, and a line that no longer fits moves to the next page with its notes. See [Footnotes](/controls/input/text-input/richtexteditor/footnotes).

Headers or footers that outgrow their margins shorten the page's body. See [Headers and footers](/controls/input/text-input/richtexteditor/headers-and-footers).

## See also

- [PDF export](/controls/input/text-input/richtexteditor/pdf-export) - the same policy, written to a file
- [Headers and footers](/controls/input/text-input/richtexteditor/headers-and-footers) - page bands and the distance that shortens a page
- [Footnotes](/controls/input/text-input/richtexteditor/footnotes) - notes reserve room at the bottom of their page
