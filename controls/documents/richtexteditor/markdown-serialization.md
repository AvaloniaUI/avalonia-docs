---
id: markdown-serialization
title: Markdown Serialization
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

`MarkdownSerializer` reads Markdown into a document and writes a document back out as Markdown, i.e., reports both `CanRead` and `CanWrite` as `true` and appears in a save-format list like any other serializer. It is found in the package `Avalonia.Controls.Markdown`, and uses the namespace `Avalonia.Controls.Documents.Serialization.Markdown`.

It is the serializer behind opening and saving `.md` files in the editor. It is also used by the [Markdown control](/controls/data-display/text-display/markdown).

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## Reading and writing

```csharp
using Avalonia.Controls.Documents;
using Avalonia.Controls.Documents.Serialization.Markdown;

var serializer = new MarkdownSerializer();

FlowDocument document;
await using (var input = File.OpenRead("notes.md"))
    document = FlowDocument.Load(input, serializer);

await using (var output = File.Create("notes.md"))
    document.Save(output, serializer);
```

String overloads sit beside the stream ones for callers holding text rather than a file:

```csharp
var snapshot = serializer.Deserialize("# Title\n\nBody.");
string markdown = serializer.Serialize(document.CreateSnapshot());
```

The serializer is configured through its constructor and is then immutable and thread-safe for concurrent operations:

```csharp
var serializer = new MarkdownSerializer(
    new MarkdownSerializerOptions { BulletMarker = '*', EmphasisChar = '_' },
    codeHighlighter);
```

The contract is synchronous. Parsing and writing Markdown are processor-bound and assemble their output in memory. There is no asynchronous I/O to await. Wrap the call to move it off a UI thread.

```csharp
var snapshot = document.CreateSnapshot();
await Task.Run(() => serializer.Serialize(snapshot, stream, cancellationToken), cancellationToken);
```

The token is observed per block on both sides. The Markdig parse that precedes rendering runs to completion once entered, so a token cancelled during it takes effect at the next block.

`CanDeserialize` returns `true` for any readable stream. Markdown is always tried last by a format picker.

:::info
Use the constructor to configure the serializer. `Options` and `CodeHighlighter` are still settable, but a serializer handed to a background read and reconfigured through a setter changes format mid-read.
:::

### Output spellings

`MarkdownSerializerOptions` chooses the canonical spellings for syntax the document model does not store. Content is unaffected.

| Option | Default | Valid values |
|---|---|---|
| `BulletMarker` | `-` | `-`, `+`, `*` |
| `EmphasisChar` | `*` | `*`, `_` |
| `FenceChar` | backtick | backtick, `~` |
| `OrderedDelimiter` | `.` | `.`, `)` |
| `HardBreak` | `Backslash` | `Backslash`, `TwoSpaces` |

`MarkdownSerializerOptions.Default` is the default set.

## Typed Markdown elements

Constructs in Markdown get their own element types in the `Avalonia.Controls.Documents` namespace. Data that reproduces the source survives realization and editing, and so the same constructs can be authored through the FlowDocument API.

| Element | Base | Carries |
|---|---|---|
| `MarkdownHeading` | `Paragraph` | `Level` (1-6) |
| `MarkdownCodeBlock` | `Paragraph` | `LanguageId`, `InfoArguments`, `Highlighter` |
| `MarkdownAlertBlock` | `Section` | `AlertKind` ("Note", "Warning", "Tip", "Important", "Caution") |
| `MarkdownHtmlBlock` | `Section` | `RawHtml` |
| `MarkdownHtmlInline` | `RichSpan` | `RawHtml` |
| `MarkdownImage` | `RichImage` | `ImageSource`, `ImageTitle`, `ImageLoader`, and the base `AltText` |
| `MarkdownTaskListItem` | `ListItem` | `IsChecked` |

### Example

```csharp
document.Blocks.Add(new MarkdownHeading { Level = 2, Inlines = { new RichRun("Design notes") } });
```

`new MarkdownHeading { Level = 2 }` writes exactly like a parsed `## `.

:::note
These types keep their base type's style key, so theme and application selectors such as `Paragraph.h1` and `Section.alertBlock` keep matching. Style them through their CSS classes, not their type names. `MarkdownCodeBlock` and `MarkdownImage` keep their own keys.
:::

`MarkdownCodeBlock.InfoArguments` is the rest of a fence's info string after the language identifier, so a directive such as ` ```text title=foo ` survives a save.

## Footnotes

Markdown footnotes load onto the document's own footnote model:

- The first citation of a label becomes a `RichFootnoteReference` anchor, numbered in citation order.
- The definition becomes a `Footnote` in `FlowDocument.Footnotes`, carrying its label as `Footnote.Label`.
- Later citations of the same label, and citations inside a note, become `RichFootnoteCitation` elements pointing at the same note.

The effect of the above is that notes read from Markdown render. They paginate and export like any other document's notes, and the editor's footnote commands work on them. Clicking an anchor or citation scrolls to its note. See [Footnotes](/controls/input/text-input/richtexteditor/footnotes).

On write, each note becomes a `[^label]: ...` definition after the body, in note order. A note keeps the label it carries, spelled as authored. A note without one is named by its position. No two notes can have the same name, because duplicate definitions would merge on re-parse. Labels containing `]`, `[` or `\` are escaped. A definition nothing cites is kept.

A fragment that names no note (e.g., `[Back to top](#top)`, a heading anchor) is left unhandled and keeps bubbling, so an application with its own anchor handling still receives it.

## HTML write-back

An HTML block is converted into rich elements for display, and `MarkdownHtmlBlock.RawHtml` keeps the original source. On write, the block is emitted verbatim while it is unedited. The writer re-converts the raw HTML and compares the resulting text with the block's current text, and any text edit falls back to serializing the converted children as canonical Markdown.

Inline HTML the converter does not recognize is preserved as `MarkdownHtmlInline` rather than dropped, so a stray tag survives a round trip instead of vanishing from the file.

## Round-trip fidelity

Byte-exact reproduction of arbitrary Markdown is not the goal and is not possible without storing source trivia, which the snapshot does not. Instead, the Markdown serializer focuses on the following:

**Semantic equivalence.** For Markdown in the supported construct set, parsing what the writer produced yields a document equivalent to parsing the original.

**Preserved exactly.** The authoring choices a reader would notice in a diff, because the model stores them. These include:

- heading level
- code language, info-string arguments and body
- task-list checked state
- alert kind
- list type and start index
- table column alignment and the header row
- link and image URLs, titles and alt text
- footnote labels
- the raw source of an unedited HTML block or an unrecognized inline tag

**Canonicalized.** Normalized to the spelling `MarkdownSerializerOptions` selects:

- emphasis delimiters and their counts
- bullet characters; ordered-list delimiters
- code-fence character and length (an indented code block is written fenced)
- thematic-break style
- hard-break spelling
- blockquote markers
- indentation
- entity and backslash-escape spellings
- emoji and symbol shortcodes, whose characters round-trip but whose shortcodes are not restored
- soft-break wrap positions, which are not restored

**Not covered:**

| Gap | Effect |
|---|---|
| Grid tables | Read, but written as pipe tables |
| Table column and row spans | Not expressible in pipe form |
| YAML front matter | Not recognized; a leading `---` block parses as a thematic break plus paragraph text |
| Clipboard integration | Markdown is not among the editor's clipboard formats |
<br />

A document that did not come from Markdown, or loaded from RTF or an arbitrary `FlowDocument`, never fails to serialize. It is written as canonical Markdown of whatever structure maps. Any formatting that Markdown cannot express (colors, fonts, spacing, etc.) is dropped.

### Supported construct set

The pipeline is Markdig with `UseSupportedExtensions()`. Supported constructs are:

- auto links
- alert blocks
- emoji and smileys
- footnotes
- grid tables
- pipe tables
- extra emphasis (strikethrough, subscript, superscript, inserted, marked)
- task lists
- the Markdig library's own symbol extension

## See also

- [Markdown control](/controls/data-display/text-display/markdown) - rendering Markdown without an editor
- [Code highlighter](/controls/data-display/text-display/markdown/codehighlighter) - the `CodeHighlighter` the serializer takes
- [Footnotes](/controls/input/text-input/richtexteditor/footnotes) - the model Markdown notes load onto
