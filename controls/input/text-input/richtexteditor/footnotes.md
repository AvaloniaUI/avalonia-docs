---
id: footnotes
title: Footnotes
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

A footnote is two things that always travel together: a `RichFootnoteReference` anchor sitting in the text, and a `Footnote` body holding the note. The anchor shows a number, the body shows the same number beside its content, and the two are paired by `NoteId`. Neither stores the number: it is the note's 1-based position among the document's notes, so every edit that moves, adds or deletes an anchor renumbers everything without touching a character of text.

This guide covers inserting notes, editing them, numbering, the anchor-owns-its-note lifecycle, citing one note more than once, how notes render in the continuous and paged views, and what survives a file round trip.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## Inserting a footnote

In the editor, `EditorActions.InsertFootnote` is the whole gesture: the anchor replaces the selection the way typing does, an empty note body is created, the anchors renumber, and the caret moves into the new note ready for typing. All of it is one undo unit.

```csharp
using Avalonia.Controls.Documents.Primitives.Actions;

// editor is a RichTextEditor, which implements ITextEditorHost.
if (EditorActions.InsertFootnote.CanExecute(editor))
    EditorActions.InsertFootnote.Execute(editor);
```

There is no default key gesture and no built-in toolbar tool for it, so bind the action to a menu item, a `ButtonTool`, or a key of your choosing. `CanExecute` is false while the caret is inside a page band or another note, which is where Word refuses a footnote too.

In code, the verb is `TextRange.InsertFootnote`. It returns the created note, whose body is a single empty paragraph:

```csharp
using Avalonia.Controls.Documents;
using Avalonia.Controls.Documents.TextModel;

var caret = document.TextDocument.ContentEnd;
var note = new TextRange(caret, caret).InsertFootnote();

if (note is not null)
{
    var body = (Paragraph)note.Blocks[0];
    body.Inlines.Add(new RichRun("Figures are unaudited."));
}
```

The selection is a range, so the same call works on the editor's live selection and gets replace-selection semantics for free:

```csharp
var note = editor.Selection?.InsertFootnote();
```

`InsertFootnote` returns `null` rather than throwing when the range start cannot host an anchor: inside a page band, inside another note, or in a `TextDocument` with no `FlowDocument` root. Pass your own anchor element to pre-configure its formatting or to keep a reference to it:

```csharp
var anchor = new RichFootnoteReference();
var note = editor.Selection?.InsertFootnote(anchor);
```

## Reaching a note from its anchor

`FlowDocument.FindFootnote` resolves the pairing:

```csharp
Footnote? note = document.FindFootnote(anchor);
```

It returns `null` for an anchor that belongs to another document or has no note yet. The whole set lives in `FlowDocument.Footnotes` (a `FootnoteCollection`), kept in anchor order, with `Find(int noteId)` for a lookup by id. The text model owns them: `TextDocument.Footnotes` holds the `TextFootnote`s, and a document snapshotted, cloned, serialized or paginated with no element realized carries every note.

`FlowDocument.FootnotesChanged` fires when the set of notes changes, when a note's id or label changes, and when the numbering format changes. It is what a view re-renders on, and what a "document modified" flag can hang off.

## Authoring in XAML

`FlowDocument.Footnotes` is a collection property, so notes are declared alongside the body and paired by id:

```xml
<FlowDocument>
    <Paragraph>
        <RichRun Text="Revenue grew twelve percent." /><RichFootnoteReference NoteId="1" />
    </Paragraph>

    <FlowDocument.Footnotes>
        <Footnote NoteId="1">
            <Paragraph>
                <RichRun Text="Constant currency, excluding the Nordic divestment." />
            </Paragraph>
        </Footnote>
    </FlowDocument.Footnotes>
</FlowDocument>
```

The `NoteId` values pair the two; they are never displayed. The numbers the reader sees come from anchor order, so reordering the paragraphs renumbers the notes and reordering the `Footnote` elements does not.

## Editing a note

A note is a document of its own, presented in the view where it renders:

- Double-clicking an anchor enters its note, as does clicking into the note's container.
- `EditorActions.GoToFootnote` enters the note of the anchor the caret sits on or has just passed.
- `EditorActions.GoToFootnoteReference` goes the other way, leaving the note for the position just after its anchor in the body.
- Escape returns to the body, which finds its selection where it was left. `EditorActions.ReturnToBody` is the command form for a button.

While the caret is in a note, `RichTextEditor.ActiveDocument` is that note, the `:footnote-editing` pseudo-class is set, a frame in `PageBandFocusBrush` marks the note's container, and `Selection`, the toolbar and the formatting actions all apply to the note. Undo is still one stack shared with the body, and it restores the caret into the document the edit was made in.

Because a note is a separate document, a body selection never reaches into it, Ctrl+A in the body selects the body alone, and a character delete never crosses a note's edge.

## Numbering

`FlowDocument.FootnoteNumberFormat` (mirroring `TextDocument.FootnoteNumberFormat`, which owns the value) sets the format document-wide. Numbering is continuous in anchor order.

| `FootnoteNumberFormat` | Sequence |
|---|---|
| `Decimal` (default) | 1, 2, 3 |
| `LowerRoman` | i, ii, iii |
| `UpperRoman` | I, II, III |
| `LowerLatin` | a, b, c, then aa, ab |
| `UpperLatin` | A, B, C, then AA, AB |
| `Symbols` | asterisk, dagger, double dagger, section sign, double vertical line, pilcrow; the seventh note starts over with each symbol doubled, the thirteenth tripled |

```csharp
document.FootnoteNumberFormat = FootnoteNumberFormat.Symbols;
```

Setting it is one undo unit that re-renders every anchor and every note number; because nothing numeric is stored, no text changes. A value set before the document's `TextDocument` exists applies when it is created, and a nested document (a band, a note) ignores its own value and follows the owner's.

The anchor's number draws at the superscript scale on the superscript baseline. The note's number follows the numbered-list rule instead: it takes family, size and colour from the note's first run and sits in a strip at the note's left edge that every note of the document shares, wide enough for the document's last ordinal. A theme setter on `Footnote` therefore restyles a note's text and its number together:

```xml
<Style Selector="Footnote">
    <Setter Property="FontSize" Value="10" />
    <Setter Property="Foreground" Value="#555555" />
</Style>
```

## The anchor owns its note

The pairing is a lifecycle, not a convention. Through the element channel:

```csharp
paragraph.Inlines.Add(anchor);      // creates the paired empty note
paragraph.Inlines.Remove(anchor);   // the note leaves with the anchor
otherParagraph.Inlines.Add(anchor); // and comes back, content intact
```

A removed anchor parks its note on itself, the same content-preserving contract a detached `RichRun` has for its text, and re-attaching restores the pair, in the same document or in another one, so moving an anchor moves its note. Through text editing the rule is the same: deleting an anchor deletes its note and renumbers the survivors in one undo transaction, and undo brings the same note back with its content. An emptied note survives until its anchor goes.

Two consequences worth knowing:

- Copy a range that contains an anchor and the note travels with it. Pasting creates the note under a fresh id when the target document already uses that one.
- Copy a range without the anchor and there is no note to carry, so an anchor pasted alone is dropped rather than left as a numbered ghost. The same happens to an anchor pasted into a page band or a note body, which never host anchors.

## Citing one note twice

A note has exactly one anchor. To reference it again, use `RichFootnoteCitation`, which points at a note by `NoteId` without owning it:

```csharp
paragraph.Inlines.Add(new RichFootnoteCitation { NoteId = anchor.NoteId });
```

It renders exactly like the anchor, the same number, resolved from the note's position and stored nowhere, so adding or deleting a note renumbers every citation of it. What differs is ownership:

| | `RichFootnoteReference` | `RichFootnoteCitation` |
|---|---|---|
| Creates a note when inserted | Yes | No |
| Deleting it deletes the note | Yes | No |
| Legal inside a note body | No | Yes |
| Pasted without its note | Dropped | Dropped |

Citing from inside another note is what the "legal inside a note body" row is for: the citation numbers against the document that owns the notes, not against the note it sits in.

## How notes render

The note bodies are never blocks of the document, so no block-level style selector reaches them and they never flow with the body text.

**Continuous views** (`FlowDocumentScrollViewer`, and `RichTextEditor` in `DocumentViewMode.Continuous`) show every note of the document as a region below the last block, under a separator rule, one container per note in anchor order. The region appears whenever the document has notes; its height rides in the layout padding, so the scroll extent and scroll anchoring account for it.

**Paged layout** (`FlowDocumentPageViewer`, `RichTextEditor` in `DocumentViewMode.PageLayout`) places each note at the bottom of the page its anchor lands on, Word-style:

- A line carrying anchors reserves its notes' heights above the page bottom, plus one separator rule per page that books notes.
- A line that no longer fits the reduced height moves to the next page together with its notes, so an anchor and its note always share a page.
- Editing a note reflows the pages that booked it.
- A note taller than the page it books places by the empty-page rules and still books.

Both are live content: clicking into a note places the caret in the note's document, hit-testing and caret geometry work inside the containers, and `EnsurePositionVisible` reaches a note on an off-screen page or at the end of the flow.

## Round trip

Notes travel as nested snapshots on `DocumentSnapshot.Footnotes`, so `FlowDocument.Clone`, `FromSnapshot` and structural undo all preserve them, and every format below reads and writes them from the same place.

| Format | Notes |
|---|---|
| XAML | Full: bodies, ids, labels and the numbering format |
| DOCX | Full, as Word footnotes |
| RTF | Full, as RTF footnote groups |
| Markdown | Read and write, addressed by name: `[^label]` citations and `[^label]: ...` definitions. See [Markdown serialization](/controls/input/text-input/richtexteditor/markdown-serialization) |
| PDF | Write only, laid out at the bottom of the anchor's page exactly as the paged view does |
| Plain text | The anchor writes as nothing, as every embedded object does |

`Footnote.Label` is the note's name in the formats that address notes by name. It is never displayed, and a note created in the editor has none, so the markdown writer then names it by its position. Set it when you want a stable, readable name in the file:

```csharp
note.Label = "constant-currency";
```

## Constraints

| Rule | Why |
|---|---|
| A page band and a note body never host an anchor | Word's rule; `InsertFootnote` returns null there and a pasted anchor is dropped |
| A note owns no notes and no page bands of its own | Nesting stops at one level |
| A note's `Blocks`, `ContentEnd` and every range cover the note body alone | A note is a document, not a region of the body |
| One anchor per note | Further references are `RichFootnoteCitation`s |
| `NoteId` is not the displayed number | Ordinals follow anchor order; ids only pair the two halves |

## See also

- [Pagination](/controls/input/text-input/richtexteditor/pagination) - how notes take part in filling a page
- [Headers and footers](/controls/input/text-input/richtexteditor/headers-and-footers) - the other nested document a page carries
- [Markdown serialization](/controls/input/text-input/richtexteditor/markdown-serialization) - how markdown citations and definitions map onto notes
- [Upgrading to 13.0](/controls/input/text-input/richtexteditor/upgrading-to-13) - markdown footnotes are notes now rather than body content
