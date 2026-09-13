---
id: footnotes
title: Footnotes
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

A footnote is two things that always travel together: a `RichFootnoteReference` anchor sitting in the text, and a `Footnote` body holding the note. The anchor shows a number, the body shows the same number beside its content, and the two are paired by `NoteId`. Neither stores the number, which is instead determined by the note's 1-based position among all of the document's notes. Every edit that moves, adds or deletes an anchor renumbers everything without touching a character of text.

This guide covers inserting notes, editing them, numbering, the anchor-owns-its-note lifecycle, citing a note more than once, how notes render in the continuous and page views, and what survives a file round trip.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## Inserting a footnote

In the editor, `EditorActions.InsertFootnote` is the whole gesture. The anchor replaces the selection, an empty note body is created, the anchors renumber, and the caret moves into the new note ready for typing. The entire sequence is one undo unit.

```csharp
using Avalonia.Controls.Documents.Primitives.Actions;

// editor is a RichTextEditor, which implements ITextEditorHost.
if (EditorActions.InsertFootnote.CanExecute(editor))
    EditorActions.InsertFootnote.Execute(editor);
```

There is no default key gesture and no built-in toolbar tool. To allow user access, bind the action to a menu item, a `ButtonTool`, or a key of your choosing. `CanExecute` is `false` while the caret is inside a page band or another note.

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

It returns `null` for an anchor that belongs to another document or has no note yet. The whole set lives in `FlowDocument.Footnotes` (a `FootnoteCollection`), kept in anchor order, with `Find(int noteId)` for a lookup by ID. The text model owns its footnotes, holding all instances of `TextFootnote` in `TextDocument.Footnotes`. As a result, a document snapshotted, cloned, serialized or paginated with no element realized carries every note.

`FlowDocument.FootnotesChanged` fires when the set of notes changes, when a note's ID or label changes, and when the numbering format changes. This event triggers a re-rendering of a view. You can use it as part of a "document modified" flag.

## Authoring in XAML

`FlowDocument.Footnotes` is a collection property, so notes are declared alongside the body and paired by ID:

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

`NoteId` pairs `RichFootnoteReference` with `Footnote`. The `NoteId` value itself is never displayed. The numbers the reader sees come from anchor order, so reordering paragraphs renumbers the notes, but reordering the `Footnote` elements does not.

## Editing a note

A note is a document of its own, presented in the view where it renders:

- Double-clicking an anchor enters its note, as does clicking into the note's container.
- `EditorActions.GoToFootnote` enters the note of the anchor the caret sits on or has just passed.
- `EditorActions.GoToFootnoteReference` goes the other way, leaving the note for the position just after its anchor in the body.
- Escape returns to the body, which finds its selection where it was left. `EditorActions.ReturnToBody` is the command form for a button.

While the caret is in a note, `RichTextEditor.ActiveDocument` is that note. The following conditions apply: (1) the `:footnote-editing` pseudo-class is set, (2) a frame in `PageBandFocusBrush` marks the note's container, and (3) `Selection`, the toolbar and formatting actions apply to the note. 

Undo is still one stack shared with the body. Executing undo restores the caret into the document in which the edit was made.

Because a note is a separate document, a body selection never reaches into it, <kbd>Ctrl</kbd>+<kbd>A</kbd> in the body selects the body alone, and a character delete never crosses a note's edge.

## Numbering

`FlowDocument.FootnoteNumberFormat` (mirroring `TextDocument.FootnoteNumberFormat`, which owns the value) sets the format document-wide. Numbering is continuous in anchor order.

| `FootnoteNumberFormat` | Sequence |
|---|---|
| `Decimal` (default) | 1, 2, 3 |
| `LowerRoman` | i, ii, iii |
| `UpperRoman` | I, II, III |
| `LowerLatin` | a, b, c, then aa, ab |
| `UpperLatin` | A, B, C, then AA, AB |
| `Symbols` | Asterisk, dagger, double dagger, section sign, double vertical line, pilcrow. The seventh note starts over with each symbol doubled, the thirteenth tripled, etc. |

```csharp
document.FootnoteNumberFormat = FootnoteNumberFormat.Symbols;
```

Setting it is one undo unit that re-renders every anchor and every note number; because nothing numeric is stored, no text changes. A value set before the document's `TextDocument` exists applies when it is created, and a nested document (e.g., a band, a note) ignores its own value and follows the owner's.

The anchor's number draws at the superscript scale on the superscript baseline. The note's number follows the numbered-list rule instead: it takes family, size and color from the note's first run and sits in a strip at the note's left edge that every note of the document shares, wide enough for the document's last ordinal. A theme setter on `Footnote` therefore restyles a note's text and its number together:

```xml
<Style Selector="Footnote">
    <Setter Property="FontSize" Value="10" />
    <Setter Property="Foreground" Value="#555555" />
</Style>
```

## Anchor owns its note

```csharp
paragraph.Inlines.Add(anchor);      // creates the paired empty note
paragraph.Inlines.Remove(anchor);   // the note leaves with the anchor
otherParagraph.Inlines.Add(anchor); // and comes back, content intact
```

If removed, an anchor preserves the content of its note, the same way a detached `RichRun` preserves its text. Reattaching the anchor restores the pair in the same document or another, meaning you can move the whole note by moving the anchor.

Similarly, deleting an anchor deletes the note along with it. Remaining footnotes are renumbered as part of the same action. Undo brings the same note back along with its content. A note emptied of content survives in the footnote collection unless its anchor is also deleted.

Copying a range that contains an anchor includes the note in the copy action. Pasting the copied content creates a clone of the note with a fresh ID.

An anchor pasted alone is dropped. It is also dropped if you attempt to paste an anchor into a page band or note body, which cannot host anchors.

## Citing one note twice

A note has exactly one anchor. To reference it again, use `RichFootnoteCitation`, which points at a note by `NoteId` without owning it:

```csharp
paragraph.Inlines.Add(new RichFootnoteCitation { NoteId = anchor.NoteId });
```

It renders exactly like the anchor, the same number, resolved from the note's position and stored nowhere, so adding or deleting a note renumbers every citation of it. What differs is ownership:

| &nbsp; | `RichFootnoteReference` | `RichFootnoteCitation` |
|---|---|---|
| Creates a note when inserted | Yes | No |
| Deleting it deletes the note | Yes | No |
| Legal inside a note body | No | Yes |
| Pasted without its note | Dropped | Dropped |

As indicated by the table above, citing an existing note from inside another note is allowed. If this occurs, the citation numbers against the document that owns the note.

## How notes render

The note bodies are never blocks of the document, so no block-level style selector reaches them and they never flow with the body text.

**Continuous layouts** (`FlowDocumentScrollViewer`, and `RichTextEditor` in `DocumentViewMode.Continuous`) show every note of the document as a region below the last block, under a separator rule, one container per note in anchor order. The region appears whenever the document has notes; its height rides in the layout padding, so the scroll extent and scroll anchoring account for it.

**Paged layouts** (`FlowDocumentPageViewer`, `RichTextEditor` in `DocumentViewMode.PageLayout`) places each note at the bottom of the page its anchor lands on, MS Word-style:

- A line carrying anchors reserves its notes' heights above the page bottom, plus one separator rule per page that has notes.
- A line that no longer fits the reduced height moves to the next page together with its notes, so an anchor and its note always share a page.
- Editing a note reflows the page where it is located.
- A note taller than the page where it appears is placed by the empty-page rules.

Clicking into a note places the caret in the note's document. Hit-testing and caret geometry work inside the containers. `EnsurePositionVisible` can reach a note on an offscreen page or at the end of the flow.

## Round trip

Notes travel as nested snapshots on `DocumentSnapshot.Footnotes`, so `FlowDocument.Clone`, `FromSnapshot` and structural undo all preserve them, and every format below reads and writes them from the same place.

| Format | Notes |
|---|---|
| XAML | Full: bodies, IDs, labels and the numbering format |
| DOCX | Full: as Word footnotes |
| RTF | Full: as RTF footnote groups |
| Markdown | Read and write, addressed by name: `[^label]` citations and `[^label]: ...` definitions. See [Markdown serialization](/controls/input/text-input/richtexteditor/markdown-serialization) |
| PDF | Write only, laid out at the bottom of the anchor's page exactly as the paged view does |
| Plain text | The anchor writes as nothing, as every embedded object does |

`note.Label` is the note's name in formats that require one. It is never displayed. A note created in the `RichTextEditor` control does not have have a `Label` by default, and is named by its position when writing the document to another format. If you need a stable, readable name in the output file, you can set the `Label` explicitly:

```csharp
note.Label = "constant-currency";
```

## See also

- [Pagination](/controls/input/text-input/richtexteditor/pagination) - how notes take part in filling a page
- [Headers and footers](/controls/input/text-input/richtexteditor/headers-and-footers) - the other nested document a page carries
- [Markdown serialization](/controls/input/text-input/richtexteditor/markdown-serialization) - how markdown citations and definitions map onto notes
