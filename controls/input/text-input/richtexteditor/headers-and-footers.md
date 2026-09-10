---
id: headers-and-footers
title: Headers and Footers
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

A page header or footer here is a `PageBand`: a small document of its own that the owning document holds and that page layout repeats on every sheet it serves. A band has a `Role` (header or footer) and a `Rule` saying which pages it claims; a `Section` can also name a band explicitly, so one band can serve any number of sections.

This guide covers building bands, page numbers, which band a page gets, the distance from the sheet edge, editing bands in place, and showing the running bands in the continuous view.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## A running header and footer

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

The same in code:

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

Ownership is exclusive and it is the text model that holds it: `TextDocument.PageBands` owns the `TextPageBand`s, `FlowDocument.PageBands` materializes a `PageBand` element over each on demand. A band snapshots, clones and exports with its document whether or not anything is realized, its undo joins the owner's stack, and removing it clears every section reference to it. A nested document, a band or a footnote, owns no bands of its own.

`FlowDocument.PageBandsChanged` fires when the set of bands changes or a band's role or rule changes.

## Page numbers

`RichPageNumberField` is an inline standing for a number that depends on pagination, not on the document, so one header renders on every sheet with a different number and nothing numeric is stored. The field occupies a single object replacement character and resolves against the page it lands on.

| `Kind` | Resolves to | Word's field |
|---|---|---|
| `CurrentPage` (default) | The number of the page the field lands on | PAGE |
| `PageCount` | The document's total page count | NUMPAGES |

In the editor, `EditorActions.InsertPageNumber` and `EditorActions.InsertPageCount` insert them; both are enabled only while the caret is in a band, because in the body the field would only show a cached result. The model verb is `TextRange.InsertPageNumberField(kind)`, one undo unit, refused inside a footnote body (a note has no page of its own).

The field edits as one atomic unit, and layout with no pages at all reads as a single page.

## Which band a page gets

Every band carries a `Rule` saying which pages it claims by itself:

| `PageBandRule` | Claims |
|---|---|
| `Default` | Every page nothing else claims, the running band |
| `FirstPage` | The document's first page |
| `EvenPage` | Even pages nothing explicit claims; its presence is what turns facing pages on |
| `None` | Nothing by itself; shown only where a section references it |

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

## Band distance, and bands that push the body

The distance from the sheet edge to a band belongs to the document, because it decides where pages break: the header's top sits that far below the sheet top, the footer's bottom that far above the sheet bottom.

| Member | Meaning |
|---|---|
| `TextDocument.PageBandDistance` | `double?`; the model's value, null when unset |
| `TextDocument.ResolvePageBandDistance()` | The value actually used, falling back to the default |
| `FlowDocument.PageBandDistance` | The element mirror; `NaN` (the default) leaves it to the fallback |
| `PagedTextView.PageBandDistance`, `RichTextEditor.PageBandDistance` | View-level handles: setting one writes through to the document, and each follows a distance the document brings with it |

`PageBandPolicy.DefaultDistance` is the fallback, 12.5 mm, about half an inch and the common word-processor default.

```csharp
document.PageBandDistance = PageSizes.Inches(0.75);
```

Because the value is the document's, the paged view and the PDF export break the same document on the same lines. A copy kept per view could not.

Where a band plus its distance outgrows the margin it sits in, the band does not clip: the page's body starts below the header, or ends above the footer, instead. Pages of one section can therefore differ in body height, since a taller first-page or even-page band shortens its own page, and editing a band that changes its height paginates again.

## Editing bands in place

In `DocumentViewMode.PageLayout` the editor shows every sheet's resolved header and footer as live content, and a click into one switches the editor's selection to that band's document. There is one editor, one caret, one toolbar and one undo stack for the document and its bands.

| Member | Meaning |
|---|---|
| `RichTextEditor.ActiveDocument` | The band the caret is in; null in the body |
| `ActiveDocumentChanged` | Raised as the caret enters or leaves a band |
| `ActivateDocument(document, position)` | Enters a band, or returns to the body with `null` |

While the caret is in a band the `:band-editing` pseudo-class is set, a frame in `PageBandFocusBrush` marks the band's placement, `Selection` is the band's, and `DocumentTargetAreas.PageBand` lets a toolbar tool target bands alone. Escape returns to the body, which finds its selection where it was left.

The band commands are on `EditorActions`, each one undo unit:

| Action | Behaviour |
|---|---|
| `GoToHeader` / `GoToFooter` | Enter the band of the caret's page, creating the document's running band when the page shows none. From the continuous view the editor switches to page layout first, as Word switches to print layout |
| `RemoveHeader` / `RemoveFooter` | Remove the band the caret is in, or the one the caret's page shows; every section reference to it goes too |
| `DifferentFirstPage` | Word's checkbox: adds or removes the document's first-page bands. Derived state |
| `DifferentOddAndEvenPages` | Word's checkbox: adds or removes the document's even-page bands. Derived state |
| `LinkToPrevious` | Links the caret's top-level section to the running bands, or gives it bands of its own, cloned from what its pages showed |
| `InsertPageNumber` / `InsertPageCount` | Insert the fields, inside a band |
| `ReturnToBody` | Escape's command form |

```csharp
if (EditorActions.GoToFooter.CanExecute(editor))
    EditorActions.GoToFooter.Execute(editor);
```

`PageBandFlyoutTool`, in the shipped toolbar's insert group, presents all of them together with the band distance, and the context menu inside a band offers the fields and the way back to the body.

## Bands in the continuous view

The continuous flow is Word's draft view: it shows the body only, and page-level chrome is not part of it. Turn on `ShowPageBandsInContinuousLayout` to show the document's running header above the first block and its running footer below the last:

```xml
<RichTextEditor ShowPageBandsInContinuousLayout="True" />
<FlowDocumentScrollViewer ShowPageBandsInContinuousLayout="True" />
```

The property is off by default and lives on `TextViewBase`, so the read-only viewer takes it too. What it shows:

- The running (`Default`) bands only. First-page bands, even-page bands and a section's own bands are page concepts and appear in page layout alone.
- The same containers the sheets use, so the bands edit in place there as well, and with the flag on, `GoToHeader` and `GoToFooter` stay in the continuous view instead of switching to page layout.
- A page-number field shows its cached result, there being no page to resolve against.

A paged view shows the bands on its sheets regardless of this property.

## Round trip

Bands travel as nested snapshots on `DocumentSnapshot.PageBands`, with role, rule and identity, and a section's references travel as those identities, so `Clone`, `FromSnapshot` and structural undo all preserve them. XAML, DOCX (header and footer parts) and RTF read and write them; the PDF export emits the band each page resolves, composing a band with page-number fields once per page. Plain text never sees bands. A section pasted from another document arrives without references, since the band identities it named do not exist in the target.

## Constraints

| Rule | Notes |
|---|---|
| A band never hosts footnotes or bands of its own | Nesting stops at one level |
| A band's selection is its own | A body selection never reaches into a band, and a drag never crosses documents |
| Layout consults top-level sections only | A nested section's band references are ignored |
| A band pins its own page geometry | It never inherits the owner's paper, so `Section.PageWidth` and friends do not reach it |

## See also

- [Pagination](/controls/input/text-input/richtexteditor/pagination) - page breaks, keep rules and per-section page setup
- [PDF export](/controls/input/text-input/richtexteditor/pdf-export) - the bands each exported page resolves
- [Footnotes](/controls/input/text-input/richtexteditor/footnotes) - the other nested document a page carries
- [Upgrading to 13.0](/controls/input/text-input/richtexteditor/upgrading-to-13) - page geometry moved onto `PageSetup`, and `ToolbarTargetAreas` became `DocumentTargetAreas`
