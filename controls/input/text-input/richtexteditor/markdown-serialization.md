---
id: markdown-serialization
title: Markdown Serialization
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

`MarkdownSerializer` (package `Avalonia.Controls.Markdown`, namespace `Avalonia.Controls.Documents.Serialization.Markdown`) reads markdown into a document and writes a document back out as markdown. It is the serializer behind opening a `.md` file in the editor and saving it again, and it is what the [Markdown control](/controls/data-display/text-display/markdown) parses with.

Both directions are supported, so it reports `CanRead` and `CanWrite` as true and appears in a save-format list like any other serializer.

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

The contract is synchronous. Parsing and writing markdown are processor-bound and assemble their output in memory, so there is no asynchronous I/O to await; wrap the call to move it off a UI thread.

```csharp
var snapshot = document.CreateSnapshot();
await Task.Run(() => serializer.Serialize(snapshot, stream, cancellationToken), cancellationToken);
```

The token is observed per block on both sides. The Markdig parse that precedes rendering runs to completion once entered, so a token cancelled during it takes effect at the next block.

`CanDeserialize` returns true for any readable stream: markdown is plain text with no magic bytes. A format-sniffing loop has to try it last.

:::warning
On 12.x the serializer was configured through settable properties, `Serialize` threw, and `CanDeserialize` returned true unconditionally. See [Upgrading to 13.0](/controls/input/text-input/richtexteditor/upgrading-to-13) for what moved.
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

## The typed markdown elements

Markdown constructs the core model has no property for get their own element types, in the `Avalonia.Controls.Documents` namespace, so the data that reproduces the source survives realization and editing, and so the same constructs can be authored through the FlowDocument API.

| Element | Base | Carries |
|---|---|---|
| `MarkdownHeading` | `Paragraph` | `Level` (1-6) |
| `MarkdownCodeBlock` | `Paragraph` | `LanguageId`, `InfoArguments`, `Highlighter` |
| `MarkdownAlertBlock` | `Section` | `AlertKind` ("Note", "Warning", "Tip", "Important", "Caution") |
| `MarkdownHtmlBlock` | `Section` | `RawHtml` |
| `MarkdownHtmlInline` | `RichSpan` | `RawHtml` |
| `MarkdownImage` | `RichImage` | `ImageSource`, `ImageTitle`, `ImageLoader`, and the base `AltText` |
| `MarkdownTaskListItem` | `ListItem` | `IsChecked` |

```csharp
document.Blocks.Add(new MarkdownHeading { Level = 2, Inlines = { new RichRun("Design notes") } });
```

`new MarkdownHeading { Level = 2 }` writes exactly like a parsed `## `.

:::note
These types keep their base type's style key, so theme and application selectors such as `Paragraph.h1` and `Section.alertBlock` keep matching. Style them through their CSS classes, not their type names. `MarkdownCodeBlock` and `MarkdownImage` keep their own keys.
:::

`MarkdownCodeBlock.InfoArguments` is the rest of a fence's info string after the language identifier, so a directive such as ` ```text title=foo ` survives a save.

## Footnotes

Markdown footnotes load onto the document's own footnote model rather than a markdown-only lowering:

- The first citation of a label becomes a `RichFootnoteReference` anchor, numbered in citation order.
- The definition becomes a `Footnote` in `FlowDocument.Footnotes`, carrying its label as `Footnote.Label`.
- Later citations of the same label, and citations inside a note, become `RichFootnoteCitation` elements pointing at the same note.

So notes read from markdown render, paginate and export like any other document's notes, and the editor's footnote commands work on them. Clicking a citation scrolls to its note, as clicking the anchor does. See [Footnotes](/controls/input/text-input/richtexteditor/footnotes).

On write, each note becomes a `[^label]: ...` definition after the body, in note order. A note keeps the label it carries, spelled as authored; a note without one, one created in the editor, is named by its position, and no two notes are given the same name, because duplicate definitions would merge on re-parse. Labels containing `]`, `[` or `\` are escaped. A definition nothing cites is kept rather than dropped.

A fragment that names no note (`[Back to top](#top)`, a heading anchor) is left unhandled and keeps bubbling, so an application with its own anchor handling still receives it.

## HTML write-back

An HTML block is converted into rich elements for display, and `MarkdownHtmlBlock.RawHtml` keeps the original source. On write, the block is emitted verbatim while it is unedited: the writer re-converts the raw HTML and compares the resulting text with the block's current text, and any text edit falls back to serializing the converted children as canonical markdown.

Inline HTML the converter does not recognize is preserved as `MarkdownHtmlInline` rather than dropped, so a stray tag survives a round trip instead of vanishing from the file.

## Round-trip fidelity

Byte-exact reproduction of arbitrary markdown is not the goal and is not possible without storing source trivia, which the snapshot does not. What is promised comes in three tiers.

**Semantic equivalence.** For markdown in the supported construct set, parsing what the writer produced yields a document equivalent to parsing the original. This holds across an editing session: load, realize elements, edit, save, re-parse.

**Preserved exactly**, the authoring choices a reader would notice in a diff, because the model stores them:

heading level; code language, info-string arguments and body; task-list checked state; alert kind; list type and start index; table column alignment and the header row; link and image URLs, titles and alt text; footnote labels; the raw source of an unedited HTML block or an unrecognized inline tag.

**Canonicalized**, normalized to the spelling `MarkdownSerializerOptions` selects:

emphasis delimiters and their counts; bullet characters; ordered-list delimiters; code-fence character and length (an indented code block is written fenced); thematic-break style; hard-break spelling; blockquote markers; indentation; entity and backslash-escape spellings; emoji and symbol shortcodes, whose characters round-trip but whose shortcodes are not restored; soft-break wrap positions, which are not restored.

**Not covered:**

| Gap | Effect |
|---|---|
| Grid tables | Read, but written as pipe tables |
| Table column and row spans | Not expressible in pipe form |
| YAML front matter | Not recognized; a leading `---` block parses as a thematic break plus paragraph text |
| Clipboard integration | Markdown is not among the editor's clipboard formats |

A document that did not come from markdown, one loaded from RTF or an arbitrary `FlowDocument`, never fails to serialize. It is written as canonical markdown of whatever structure maps, and formatting markdown cannot express (colours, fonts, spacing) is dropped. No fidelity guarantee is made there.

### The supported construct set

The pipeline is Markdig with `UseSupportedExtensions()`: auto links, alert blocks, emoji and smileys, footnotes, grid tables, pipe tables, extra emphasis (strikethrough, subscript, superscript, inserted, marked), task lists, and the library's own symbol extension.

## See also

- [Markdown control](/controls/data-display/text-display/markdown) - rendering markdown without an editor
- [Code highlighter](/controls/data-display/text-display/markdown/codehighlighter) - the `CodeHighlighter` the serializer takes
- [Footnotes](/controls/input/text-input/richtexteditor/footnotes) - the model markdown notes load onto
- [Upgrading to 13.0](/controls/input/text-input/richtexteditor/upgrading-to-13) - markdown writing, the constructor-configured serializer, and the task-list style key
