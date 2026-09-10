---
id: pagination
title: Pagination
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

Paginated output, the paged view (`FlowDocumentPageViewer`, the editor in `DocumentViewMode.PageLayout`) and the [PDF export](/controls/input/text-input/richtexteditor/pdf-export), fills pages line by line and consults the document for where a page may end. This guide covers the controls a document has over that: explicit page breaks, the three keep rules, and per-section page setup.

The continuous flow ignores every one of them except the page-break marker it draws. Keep rules and page geometry are page concepts; there are no pages in a single column.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## One policy, identical output

Both pagination engines, the paged view's fill walk and the PDF paginator, ask the same cut-decision policy where a page may end, with the same inputs. They keep their own mechanics but not their own rules, so the same document breaks on the same lines on screen and in the exported file. The paged view is a live preview of the exported pages, not an approximation of one.

## Explicit page breaks

There is no page-break element. A break is a request on a block: `Block.BreakPageBefore`.

```csharp
heading.BreakPageBefore = true;
```

```xml
<Paragraph BreakPageBefore="True" FontSize="18" FontWeight="Bold">
    <RichRun Text="Appendix A" />
</Paragraph>
```

In the editor, Ctrl+Enter (Cmd+Enter on macOS) applies one at the caret, replacing any selection the way typing does, in one undo step:

- At a block boundary it sets `BreakPageBefore` on the following block.
- Mid-content it splits the block exactly like Enter and flags the remainder.

Deleting a break is the ordinary paragraph merge: Backspace at the start of a flagged block merges it with its neighbour and the flag travels away with the merged block; where the neighbour cannot merge, Backspace clears the flag alone.

An explicit break always wins over a keep rule, and forced cuts are never keep-adjusted.

The flag round-trips through every format from the one place it lives: DOCX (`w:pageBreakBefore`, including style-defined breaks, and `w:br` on read), RTF (`\pagebb`, `\page` on read), XAML, and plain text, which writes a form feed as the flagged block's separator and maps form feeds back to the flag on read.

### Seeing breaks in the continuous view

The continuous views mark a flagged block with a dashed rule across its top edge, Word draft-view style. It is paint-only and never affects layout.

| Member (on `TextViewBase`) | Default | Meaning |
|---|---|---|
| `ShowPageBreakMarkers` | `true` | Whether the rule is drawn |
| `PageBreakMarkerBrush` | `DocumentPageBreakMarkerBrush` | The rule's colour |

The paged view draws no marker: there the request shows up as the page transition itself.

## Keep rules

Three properties adjust where an automatic cut lands. All three move a cut earlier, never later, and all three round-trip through DOCX, RTF and XAML; the HTML reader maps `break-inside: avoid`, `break-after: avoid` and `orphans`/`widows` onto them.

| Property | Effect | DOCX | RTF |
|---|---|---|---|
| `Block.KeepTogether` | Move the whole block to the next page rather than split it | `w:keepLines` | `\keep` |
| `Block.KeepWithNext` | Keep the block's end on the same page as the next block's start | `w:keepNext` | `\keepn` |
| `Paragraph.WidowControl` | Keep at least two lines of the paragraph on each side of a break | `w:widowControl` | `\nowidctlpar` when off |

```csharp
heading.KeepWithNext = true;      // a heading never ends a page alone
table.KeepTogether = true;        // this table moves rather than splits
paragraph.WidowControl = false;   // let this one strand a single line
```

`KeepTogether` is best effort: a block taller than one page still splits, because there is nowhere else for it to go.

`KeepWithNext` chains. Consecutive flagged blocks, a heading, a subheading and the first paragraph, move as one unit. A chain that grows past a page gives up and paginates normally, which is deliberate: the alternative is a chain that can never be placed and a page left blank in front of it.

### Widow control

`Paragraph.WidowControl` is `true` by default, matching Word. At least two lines stay on the page and at least two move, so a three-line paragraph never splits at all.

To let a paragraph strand a single line, turn it off:

```csharp
foreach (var block in document.Blocks)
{
    if (block is Paragraph paragraph)
        paragraph.WidowControl = false;
}
```

A document loaded from DOCX or RTF carries whatever the file says, style-defined values included, so the default only governs paragraphs nothing else has spoken for.

## Per-section page setup

A `Section` can declare its own paper. `PageWidth`, `PageHeight` and `PagePadding` are the document's own property definitions added to `Section`, so they inherit through the element tree: a section that declares none reads the document's, or an enclosing section's.

A section that declares **any** of the three is a page-geometry section, which is what Word's section break means:

- It starts on a fresh page, and the content after it starts on another.
- Its pages use its paper and margins, and its content is measured and wrapped at its own content width.
- Entering and leaving it are break edges, so they sever a keep-with-next chain the way an explicit break does.

```xml
<Section PageWidth="1056" PageHeight="816" PagePadding="48">
    <Paragraph FontSize="18" FontWeight="Bold">
        <RichRun Text="Wide Tables" />
    </Paragraph>
    <Paragraph>
        <RichRun Text="This section is US Letter on its side." />
    </Paragraph>
</Section>
```

The same in code, without the unit trap: every page property speaks device-independent pixels (1/96 inch), not points.

```csharp
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

A section without page setup stays a pure grouping container with no page semantics. Page bands ignore section geometry entirely: a band pins its own, so it never inherits the owner's paper.

The paged view renders each sheet at its own page's size, centred on its own width; page navigation, `CurrentPageNumber` and scroll geometry follow the variable stack, and the fit zoom modes resolve against the current page, so scrolling into a landscape section re-fits to the wide sheet. The PDF export emits a MediaBox per page. Both break the document on identical boundaries.

An explicit `PageSize` or `PageMargins` on the viewer, or `PdfSerializerOptions.PageSize` and `Margins`, remains the uniform-paper override: the section still starts its own page, it just does not get its own paper.

Section page setup round-trips through DOCX (`sectPr`), RTF and XAML, and travels in range snapshots and `Clone`.

## How content fills a page

For reference, the fill rules the policy sits on top of:

- Pages fill line by line. A line that does not fit starts the next page exactly at its content top, and the spacing above it is swallowed at the page top.
- Paragraphs split mid-content; lists split between and inside items; a line taller than a page overflows its own page.
- Tables split between rows and never through one. Rows covered by a row-spanning cell move together with their anchor row, and the grid closes above the break and reopens below it.
- A split element stays one element whose geometry spans the pages, so selection, copy, caret placement and hit-testing all work mid-fragment.

Footnotes take part in the fill too: a line carrying anchors reserves its notes' heights at the bottom of its page, and a line that no longer fits moves to the next page with its notes. See [Footnotes](/controls/input/text-input/richtexteditor/footnotes). A header or footer that outgrows its margin shortens the page's body; see [Headers and footers](/controls/input/text-input/richtexteditor/headers-and-footers).

## See also

- [PDF export](/controls/input/text-input/richtexteditor/pdf-export) - the same policy, written to a file
- [Headers and footers](/controls/input/text-input/richtexteditor/headers-and-footers) - page bands and the distance that shortens a page
- [Footnotes](/controls/input/text-input/richtexteditor/footnotes) - notes reserve room at the bottom of their page
- [Upgrading to 13.0](/controls/input/text-input/richtexteditor/upgrading-to-13) - the move of page geometry onto `PageSetup`
