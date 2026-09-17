---
id: headers-and-footers
title: Headers and Footers
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

A page header or footer here is a `PageBand`. It is a small document that the owning document holds and repeats on every sheet it serves. A band has a `Role` (header or footer) and a `Rule` saying which pages it claims; a `Section` can also name a band explicitly, so one band can serve any number of sections.

This guide covers building bands, page numbers, which band a page gets, the distance from the sheet edge, editing bands in place, and showing the running bands in the continuous view.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## Running header and footer

`FlowDocument.PageBands` is a collection property, so bands are declared next to the body:

```xml
<FlowDocument PageWidth="816" PageHeight="1056" PagePadding="72">
    <FlowDocument.PageBands>
        <PageBand Role="Header" Rule="Default">
            <Paragraph FontSize="11">
                <RichRun Text="Quarterly Report" />
            </Paragraph>
        </PageBand>
        <PageBand Role="Footer" Rule="Default">
            <Paragraph FontSize="11" TextAlignment="Center">
                <RichRun Text="Page " />
                <RichPageNumberField />
                <RichRun Text=" of " />
                <RichPageNumberField Kind="PageCount" />
            </Paragraph>
        </PageBand>
    </FlowDocument.PageBands>

    <Paragraph>
        <RichRun Text="Body text." />
    </Paragraph>
</FlowDocument>
```

The same footer as above, in code:

```csharp
using Avalonia.Controls.Documents;
using Avalonia.Media;

var footer = new PageBand { Role = PageBandRole.Footer, Rule = PageBandRule.Default };
var line = new Paragraph { TextAlignment = TextAlignment.Center };
line.Inlines.Add(new RichRun("Page "));
line.Inlines.Add(new RichPageNumberField());
line.Inlines.Add(new RichRun(" of "));
line.Inlines.Add(new RichPageNumberField { Kind = PageNumberFieldKind.PageCount });
footer.Blocks.Add(line);

document.PageBands.Add(footer);
```

Bands added before the document's `TextDocument` exists wait as pending, exactly as blocks do, so markup order does not matter and a document populated from XAML stays lazy.

`TextDocument.PageBands` exclusively owns all instances of `TextPageBand`. `FlowDocument.PageBands` materializes a `PageBand` element on demand. A band snapshots, clones and exports with its document whether or not anything is realized. Additionally, its undo joins the owner's stack, and removing it clears every section reference to it. A nested document, band or footnote cannot own bands.

`FlowDocument.PageBandsChanged` fires when the set of bands changes or a band's role or rule changes.

## Page numbers

`RichPageNumberField` is an inline standing for a number that depends on pagination, not on the document, so one header renders on every sheet with a different number and nothing numeric is stored. The field occupies a single object replacement character and resolves against the page it lands on.

| `Kind` | Resolves to | MS Word equivalent |
|---|---|---|
| `CurrentPage` (default) | The number of the page the field lands on | PAGE |
| `PageCount` | The document's total page count | NUMPAGES |
<br />

In the editor, `EditorActions.InsertPageNumber` inserts `CurrentPage`. `EditorActions.InsertPageCount` inserts `PageCount`. Both are enabled only while the caret is in a band. In the body, these fields only show a cached result.

The model verb is `TextRange.InsertPageNumberField(kind)`. This action is one undo unit, and is refused inside a [footnote](/controls/input/text-input/richtexteditor/footnotes) body because a note has no page.

The field edits as one atomic unit. Layouts with no pages at all are considered to have a single page.

## Which band a page gets

Every band carries a `Rule` saying which pages it claims by itself:

| `PageBandRule` | Claims |
|---|---|
| `Default` | Every page nothing else claims, the running band |
| `FirstPage` | The document's first page |
| `EvenPage` | Even pages nothing explicit claims; its presence is what turns facing pages on |
| `None` | Nothing by itself; shown only where a section references it |
<br />

A top-level `Section` can also point at a band directly, whatever that band's rule, through four properties: `Header` and `Footer` for its running pages, `FirstPageHeader` and `FirstPageFooter` for its first page. Setting a first-page property is what makes that section's first page special; setting an unowned band adopts it into the document, and a band owned by another document is refused.

`PageBandPolicy` is the one rule both the paged view and the PDF export apply, in this order, per role:

1. The section's first-page reference, on the section's first page.
2. The document's `FirstPage` band, on page one.
3. The document's `EvenPage` band, on even pages.
4. The section's running reference.
5. The document's `Default` band.

A rule with no band for a role does not blank the page: the running band applies. What resolves to nothing shows nothing. The first band with a given role and rule is the one that rule places.

You can ask the policy directly, which is useful for a preview pane or a test:

```csharp
PageBand? header = PageBandPolicy.Resolve(
    document,
    section: null,           // null for content at the document root
    PageBandRole.Header,
    isSectionFirstPage: true,
    pageNumber: 1);
```

`document.PageBands.Find(PageBandRole.Header, PageBandRule.Default)` looks a band up by role and rule, and `Find(Guid id)` by the identity `PageBand.Id` that section references and snapshots use.

## Band distance and bands that push the body

The distance from the sheet edge to a band belongs to the document, because it decides where pages break.

| Member | Meaning |
|---|---|
| `TextDocument.PageBandDistance` | `double?`. The model's value, null when unset. |
| `TextDocument.ResolvePageBandDistance()` | The value actually used, falling back to the default. |
| `FlowDocument.PageBandDistance` | The element mirror. `NaN` (default) leaves it to the fallback. |
| `PagedTextView.PageBandDistance`, `RichTextEditor.PageBandDistance` | View-level handles. Setting one writes through to the document, and each follows a distance the document brings with it. |

`PageBandPolicy.DefaultDistance` is the fallback, 12.5 mm, about half an inch and the common word-processor default.

```csharp
document.PageBandDistance = PageSizes.Inches(0.75);
```

Because the value is the document's, the paged view and the PDF export break the same document on the same lines.

Where a band plus its distance outgrows the margin it sits in, the band does not clip. The page's body starts below the header, or ends above the footer, instead. Pages of one section can therefore differ in body height, since a taller first-page or even-page band shortens its own page.

## Editing bands in place

In `DocumentViewMode.PageLayout`, the editor shows every sheet's resolved header and footer as live content. A click into one switches the editor's selection to that band's document. There is one editor, one caret, one toolbar and one undo stack for the document and its bands.

| Member | Meaning |
|---|---|
| `RichTextEditor.ActiveDocument` | The band the caret is in; null in the body |
| `ActiveDocumentChanged` | Raised as the caret enters or leaves a band |
| `ActivateDocument(document, position)` | Enters a band, or returns to the body with `null` |
<br />

While the caret is in a band, the following occur:

- The `:band-editing` pseudo-class is set
- A frame in `PageBandFocusBrush` marks the band's placement
- `Selection` is the band's
- `ToolbarTargetAreas.PageBand` lets a toolbar tool target bands alone.

<kbd>Esc</kbd> returns to the body, which finds its selection where it was left.

## Band commands

The band commands are on `EditorActions`. Each is one undo unit:

| Action | Behavior |
|---|---|
| `GoToHeader` / `GoToFooter` | Enter the band of the caret's page. Creates the document's running band if the page has none. If in the continuous view, the editor switches to page layout. |
| `RemoveHeader` / `RemoveFooter` | Remove the band the caret is in, or the one shown by the caret's page. Every section reference to it is also removed. |
| `DifferentFirstPage` | Adds or removes the document's first-page bands. Derived state. |
| `DifferentOddAndEvenPages` | Adds or removes the document's even-page bands. Derived state .|
| `LinkToPrevious` | Links the caret's top-level section to the running bands, or gives it bands of its own, cloned from what its pages showed. |
| `InsertPageNumber` / `InsertPageCount` | Insert the respective fields inside a band. |
| `ReturnToBody` | Command form of <kbd>Esc</kbd>, i.e., return to the body at the selection where it was left. |

```csharp
if (EditorActions.GoToFooter.CanExecute(editor))
    EditorActions.GoToFooter.Execute(editor);
```

`PageBandFlyoutTool`, in the shipped toolbar's insert group, presents all of them together with the band distance, and the context menu inside a band offers the fields and the way back to the body.

## Bands in the continuous view

The continuous flow is similar to draft view in MS Word: it shows the body only, and page-level chrome is not part of it. Turn on `ShowPageBandsInContinuousLayout` to show the document's running header above the first block and its running footer below the last:

```xml
<RichTextEditor ShowPageBandsInContinuousLayout="True" />
<FlowDocumentScrollViewer ShowPageBandsInContinuousLayout="True" />
```

The property is off by default and lives on `TextViewBase`, so the read-only viewer takes it too. When enabled, the following elements are shown:

- The running (`Default`) bands only. First-page bands, even-page bands and a section's own bands are page concepts and appear in page layout alone.
- The same containers the sheets use, so the bands edit in place there as well. `GoToHeader` and `GoToFooter` stay in the continuous layout instead of switching to page layout.
- A page-number field shows its cached result, there being no page to resolve against.

## Round trip

Bands travel as nested snapshots on `DocumentSnapshot.PageBands`, with their role, rule and identity. `Clone`, `FromSnapshot` and structural undo all preserve a section's references.

- XAML, DOCX (header and footer parts) and RTF can read and write bands. 
- PDF export emits the band each page resolves, composing a band with page-number fields once per page.
- Plain text never sees bands. A section pasted from another document arrives without references.

## See also

- [Pagination](/controls/input/text-input/richtexteditor/pagination) - page breaks, keep rules and per-section page setup
- [PDF export](/controls/input/text-input/richtexteditor/pdf-export) - the bands each exported page resolves
- [Footnotes](/controls/input/text-input/richtexteditor/footnotes) - the other nested document a page carries
