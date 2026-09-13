---
id: thread-safety
title: Thread Safety
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

The RichTextEditor architecture uses immutable snapshots for background-safe serialization while requiring UI thread access for live document operations. This guide explains the threading model and safe patterns.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

:::info
Nothing in this library performs asynchronous I/O: every format tokenizes, builds a tree or lays out text against an in-memory buffer. `IDocumentSerializer.SerializeAsync` and `DeserializeAsync` are thread-offload conveniences that run the synchronous body on the thread pool, not asynchronous I/O, and `Serialize` and `Deserialize` run on whichever thread calls them. Either the shipped asynchronous pair or `Task.Run` at the call site moves the work off the UI thread.
:::

## Threading model

### UI thread required

These operations must run on the UI thread:
- **Document editing** (`TextDocument`, `TextPointer`, `TextRange`)
- **Rendering** (`TextViewBase`, `InteractiveTextView`, `PagedTextView`, `ITextView`)
- **User interaction** (`TextSelection`, components)
- **Undo/redo operations**
- **Element access** (`FlowDocument`, `RichTextElement`, and any child elements — they are Avalonia `StyledElement`s)

### Background thread safe

These operations can run on background threads:
- **Serialization via `DocumentSnapshot`** (immutable)
- **`IDocumentSerializer.Serialize` / `Deserialize`**: synchronous and thread-agnostic, so they run on whichever thread calls them. Wrap in `Task.Run` to keep the work off the UI thread
- **RTF tokenization** (streaming)
- **`DocumentSnapshot` consumption** — `TextDocument.CreateSnapshot()` must be called on the UI thread, but the returned object is safe to read from any thread
- **`TextDocument.FromSnapshot`**: `TextDocument` carries the whole document and has no thread affinity, so a document can be materialized with no UI thread involved at all

### Not thread-safe

- **Live `TextDocument`** — no concurrent modification
- **UI element access** — Avalonia controls are not thread-safe
- **`TextPointer`/`TextRange`** — tied to UI-thread document
- **`FlowDocumentBuilder`** — UI-thread only (the resulting `FlowDocument` is itself a `StyledElement`)

## Safe patterns

### Background serialization

```csharp
async Task SaveAsync(string path)
{
    // SaveAsync captures the snapshot on the calling thread, because reading
    // the document requires the thread that owns it, then writes on the pool.
    await using var stream = File.Create(path);
    await editor.SaveAsync(stream, new RtfSerializer());
}
```

If you need manual control over the snapshot (e.g., for a custom format):

```csharp
async Task SaveManualAsync(string path)
{
    // UI thread: snapshot the document through FlowDocument
    await using var stream = File.Create(path);
    await editor.Document.SaveAsync(stream, new RtfSerializer());
}
```

### Background deserialization

```csharp
async Task LoadAsync(string path)
{
    // LoadAsync parses on the thread pool, then builds the element tree
    // on the UI thread.
    await using var stream = File.OpenRead(path);
    await editor.LoadAsync(stream, new RtfSerializer());
}
```

Or load independently of the editor:

```csharp
async Task LoadStandaloneAsync(string path)
{
    await using var stream = File.OpenRead(path);
    var document = await FlowDocument.LoadAsync(stream, new RtfSerializer());

    // Assign on UI thread
    editor.Document = document;
}
```

:::info
`FlowDocument.LoadAsync` parses on the thread pool and then builds the element tree through an explicit `Dispatcher.UIThread.InvokeAsync`. A `FlowDocument` and its `RichTextElement`s are `AvaloniaObject`s and bind to the dispatcher of the thread that constructed them, so a document assembled on a pool thread throws on the first property read from the UI thread. The dispatch is explicit rather than left to an ambient `SynchronizationContext`, which a console host or a caller already off the UI thread does not have.

To stay off the UI thread entirely, skip the element facade: read a `DocumentSnapshot` with the serializer and materialize it with `TextDocument.FromSnapshot`.

```csharp
// Any thread, no dispatcher involved
var snapshot = new RtfSerializer().Deserialize(stream, cancellationToken);
var textDocument = TextDocument.FromSnapshot(snapshot);
```
:::

### Background document processing

```csharp
async Task<string> ExtractPlainTextAsync()
{
    // Read text through the public TextRange API (UI thread)
    string? text = editor.Document.ContentRange?.GetText();
    if (text == null) return string.Empty;

    // Background thread: Process the extracted text
    return await Task.Run(() =>
    {
        return ProcessText(text);
    });
}
```

## Unsafe patterns

### Don't access live document from background thread

```csharp
// WRONG — will throw
await Task.Run(() =>
{
    var doc = editor.Document?.TextDocument;
    string? text = editor.Document.ContentRange?.GetText(); // Exception
});
```

### Don't modify document from background thread

```csharp
// WRONG — will throw
await Task.Run(() =>
{
    document.ContentStart.InsertText("Hello"); // Exception
});
```

### Don't access UI elements from background thread

```csharp
// WRONG — will throw
await Task.Run(() =>
{
    // FlowDocument and RichTextElement are Avalonia StyledElements;
    // touching their properties from a background thread throws.
    var firstParagraph = flowDocument.Blocks.FirstOrDefault();
    var background = firstParagraph?.Background; // Exception
});
```

## DocumentSnapshot design

### Immutable structure

`DocumentSnapshot` is designed for thread safety:
- **Immutable** — cannot be modified after creation
- **No UI references** — pure data structure
- **Shared nodes** — efficient memory sharing with live document
- **Self-contained** — all data copied from live document

### Snapshot hierarchy

```
DocumentSnapshot (thread-safe)
├─ BlockSnapshotNode
│  ├─ InlineSnapshotNode
│  └─ InlineSnapshotNode
└─ BlockSnapshotNode
   └─ InlineSnapshotNode
```

`SnapshotNode` is the base of the tree, with `BlockSnapshotNode` and `InlineSnapshotNode` for the two kinds of content. The tree is built once at capture and not mutated afterwards, and the text it references is an immutable rope snapshot, so reading it from any thread is safe. Read text with `DocumentSnapshot.GetText`, `GetTextMemory` or `WriteTextTo`, and walk it with `EnumerateNodes`.

### Creating snapshots

`SaveAsync` and `LoadAsync` create and consume snapshots internally, so a typical save or load never touches a `DocumentSnapshot` directly:

```csharp
// Save using the async API (handles snapshot internally)
await using var stream = File.Create("output.rtf");
await editor.SaveAsync(stream, new RtfSerializer());
```

To share one snapshot across several consumers, for example exporting to more than one format from the same document state, capture it explicitly with `FlowDocument.CreateSnapshot()` or `TextDocument.CreateSnapshot()` on the UI thread and pass the result to background work:

```csharp
// UI thread
var snapshot = editor.Document.CreateSnapshot();

// Any thread. The serializers are synchronous, so Task.Run is what
// moves the work off the UI thread.
await Task.Run(() =>
{
    using var rtf = File.Create("out.rtf");
    new RtfSerializer().Serialize(snapshot, rtf);

    using var docx = File.Create("out.docx");
    new DocxSerializer().Serialize(snapshot, docx);
});
```

## FlowDocumentBuilder

`FlowDocumentBuilder` provides a fluent API for constructing documents. It runs on the UI thread:

```csharp
var builder = FlowDocumentBuilder.Create();
builder.AddParagraph("First paragraph");
builder.AddParagraph("Second paragraph");
var document = builder.Build();

editor.Document = document;
```

## Synchronization strategies

### Dispatcher pattern

```csharp
async Task UpdateFromBackgroundAsync()
{
    // Background work
    var data = await FetchDataAsync();
    
    // Switch to UI thread
    await Dispatcher.UIThread.InvokeAsync(() =>
    {
        UpdateDocument(data);
    });
}
```

### async/await pattern

```csharp
async Task SaveAndProcessAsync(string path)
{
    // Snapshot on the UI thread, write on the thread pool
    await using var stream = File.Create(path);
    await editor.SaveAsync(stream, new RtfSerializer());

    // Automatically back on UI thread after await
    ShowSaveComplete();
}
```

## Common scenarios

### Spell check on background thread

```csharp
class SpellChecker
{
    public async Task<List<SpellError>> CheckAsync()
    {
        // UI thread: Get full text
        string? text = editor.Document.ContentRange?.GetText();
        if (string.IsNullOrEmpty(text)) return new List<SpellError>();

        // Background: Check spelling
        return await Task.Run(() =>
        {
            var errors = new List<SpellError>();
            // Run spell check algorithm on the extracted text
            return errors;
        });
    }
    
    public async Task ApplyCorrectionsAsync(
        TextDocument document,
        List<SpellError> errors)
    {
        // UI thread: Apply corrections
        await Dispatcher.UIThread.InvokeAsync(() =>
        {
            using (document.BeginChange())
            {
                foreach (var error in errors)
                {
                    var start = document.ContentStart.CreatePointer(error.Offset);
                    var end = document.ContentStart.CreatePointer(error.Offset + error.Length);
                    var range = new TextRange(start, end);
                    range.ReplaceText(error.Correction);
                }
            }
        });
    }
}
```

### Word count in background

```csharp
async Task<int> CountWordsAsync()
{
    // UI thread: Get text through public API
    string? text = editor.Document.ContentRange?.GetText();
    if (string.IsNullOrEmpty(text)) return 0;

    // Background: Count
    return await Task.Run(() =>
    {
        return text.Split(new[] { ' ', '\n', '\r', '\t' },
                         StringSplitOptions.RemoveEmptyEntries).Length;
    });
}
```

### Export to PDF on background thread

`PdfSerializer` is a normal `IDocumentSerializer` and, like every other one, is synchronous and write-only. It takes a snapshot, so the layout runs with no UI involved:

```csharp
async Task ExportPdfAsync(string path)
{
    // UI thread: capture the snapshot
    var snapshot = editor.Document.CreateSnapshot();

    // Background: lay out and write the PDF
    await Task.Run(() =>
    {
        using var stream = File.Create(path);
        new PdfSerializer().Serialize(snapshot, stream);
    });
}
```

## Element lifetime and thread safety

The internal node tree holds weak references to the `RichTextElement` instances it presents, so the model does not pin UI elements in memory. Two consequences reach the public API: an element obtained through `TextPointer.GetContainingElement()` may be `null` until the document materializes it on demand, and every element access is UI-thread only.

```csharp
void SafeAccessElement(TextPointer pointer)
{
    // Pointers are UI-thread only.
    if (!Dispatcher.UIThread.CheckAccess())
    {
        throw new InvalidOperationException("Must be on UI thread");
    }

    var element = pointer.EnsureElement(); // materializes if needed
    if (element != null)
    {
        ProcessElement(element);
    }
}
```

The same holds for reading the element tree directly:

```csharp
// Must be on UI thread
var firstBlock = flowDocument.Blocks.FirstOrDefault();
if (firstBlock != null)
{
    var background = firstBlock.Background;
}
```

## Best practices

### Do's

1. **Create snapshots on UI thread** — fast operation
2. **Process snapshots on background threads** — safe and efficient
3. **Return to UI thread for document updates** — use Dispatcher
4. **Check thread before UI operations** — defensive programming
5. **Use async/await for clean code** — natural thread switching

### Don'ts

1. **Don't access live document from background threads**
2. **Don't modify document from background threads**
3. **Don't access UI elements from background threads**
4. **Don't assume snapshots auto-update** — they're immutable
5. **Don't hold long-lived references to elements**: resolve them from a pointer when you need them; the model holds them weakly and an unrealized element may not exist yet

## Performance considerations

### Snapshot creation cost

- **Small documents (&lt;10KB)**: ~1ms
- **Large documents (1MB)**: ~10ms
- **Impact**: Negligible for background operations

### Thread switching cost

- **Dispatcher invoke**: ~1-2ms overhead
- **Recommendation**: Batch UI updates, don't switch per character

### Optimal pattern

```csharp
// Bad: Too many thread switches
await Task.Run(async () =>
{
    for (int i = 0; i < 1000; i++)
    {
        await Dispatcher.UIThread.InvokeAsync(() =>
        {
            UpdateUI(i); // 1000 dispatches
        });
    }
});

// Good: One switch
var results = await Task.Run(() =>
{
    var items = new List<Item>();
    for (int i = 0; i < 1000; i++)
    {
        items.Add(ProcessItem(i));
    }
    return items;
});

await Dispatcher.UIThread.InvokeAsync(() =>
{
    UpdateUIBatch(results); // 1 dispatch
});
```

## See also

- [RichTextEditor reference](/controls/input/text-input/richtexteditor)
- [Performance tuning](/controls/input/text-input/richtexteditor/performance-tuning)
- [Extension patterns](/controls/input/text-input/richtexteditor/extension-patterns)
