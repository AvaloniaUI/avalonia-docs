---
id: thread-safety
title: Thread Safety
doc-type: guide
tags:
 - accelerate
---

The RichTextEditor architecture uses immutable snapshots for background-safe serialization while requiring UI thread access for live document operations. This guide explains the threading model and safe patterns.

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

## Threading model

### UI thread required

These operations must run on the UI thread:
- **Document editing** (`TextDocument`, `TextPointer`, `TextRange`)
- **Rendering** (`FlowDocumentView`, `ITextView`)
- **User interaction** (`TextSelection`, components)
- **Undo/redo operations**
- **Element access** (weak references to UI elements)

### Background thread safe

These operations can run on background threads:
- **Serialization via `DocumentSnapshot`** (immutable)
- **Document building via `FlowDocumentBuilder`**
- **RTF tokenization** (streaming)
- **Snapshot creation** (returns immutable object)

### Not thread-safe

- **Live `TextDocument`** — no concurrent modification
- **UI element access** — Avalonia controls are not thread-safe
- **`TextPointer`/`TextRange`** — tied to UI-thread document

## Safe patterns

### Background serialization

```csharp
async Task SaveAsync(string path)
{
    // SaveAsync snapshots internally and serializes on background thread
    await using var stream = File.Create(path);
    await editor.SaveAsync(stream, new RtfSerializer());
}
```

If you need manual control over the snapshot (e.g., for a custom format):

```csharp
async Task SaveManualAsync(string path)
{
    // UI thread: snapshot the document through FlowDocument
    var doc = editor.Document;
    if (doc == null) return;

    await using var stream = File.Create(path);
    await doc.SaveAsync(stream, new RtfSerializer());
}
```

### Background deserialization

```csharp
async Task LoadAsync(string path)
{
    // LoadAsync deserializes and builds the document
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

### Background document processing

```csharp
async Task<string> ExtractPlainTextAsync()
{
    // Read text through the public TextRange API (UI thread)
    string? text = editor.Document?.ContentRange?.Text;
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
    string? text = editor.Document?.ContentRange?.Text; // Exception
});
```

### Don't modify document from background thread

```csharp
// WRONG — will throw
await Task.Run(() =>
{
    var pointer = document.CreatePointer(0);
    pointer.InsertText("Hello"); // Exception
});
```

### Don't access UI elements from background thread

```csharp
// WRONG — will throw
await Task.Run(() =>
{
    var node = document.RootNode;
    var element = node.Element; // Weak ref to UI element
    if (element != null)
    {
        var background = element.Background; // Exception
    }
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

All nodes are immutable value types or readonly structures.

### Creating snapshots

Snapshot creation is an internal mechanism used by serializers. The public API for background serialization is through `SaveAsync`/`LoadAsync`:

```csharp
// Save using the async API (handles snapshot internally)
await using var stream = File.Create("output.rtf");
await editor.SaveAsync(stream, new RtfSerializer());
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
    // Save on background via async serializer
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
        string? text = editor.Document?.ContentRange?.Text;
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
                    var range = new TextRange(
                        document.CreatePointer(error.Offset),
                        document.CreatePointer(error.Offset + error.Length)
                    );
                    range.Text = error.Correction;
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
    string? text = editor.Document?.ContentRange?.Text;
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

```csharp
async Task ExportPdfAsync(string path)
{
    // UI thread: Get full document text
    string? text = editor.Document?.ContentRange?.Text;
    if (text == null) return;

    // Background: Generate PDF
    await Task.Run(() =>
    {
        var generator = new PdfGenerator();
        generator.GenerateFromText(text, path);
    });
}
```

## Weak references and thread safety

### Why weak references?

`TextDocumentNode` uses weak references to UI elements:
- Prevents memory leaks
- Allows garbage collection
- No strong coupling

### Thread safety implications

```csharp
// Check element existence before accessing
var node = document.RootNode.Children[0];
var element = node.Element; // Weak reference

if (element != null)
{
    // Must be on UI thread
    var background = element.Background;
}
else
{
    // Element was garbage collected
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
5. **Don't hold long-lived references to UI elements** — use weak refs

## Debugging threading issues

### Enable thread assertions

Avalonia has built-in thread checking:

```csharp
// Throws if not on UI thread
Dispatcher.UIThread.VerifyAccess();
```

### Common exceptions

**InvalidOperationException**: "The calling thread cannot access this object because a different thread owns it."
- **Cause**: Accessing UI thread object from background thread
- **Fix**: Use `Dispatcher.UIThread.InvokeAsync()`

**NullReferenceException** when accessing `Element`
- **Cause**: Weak reference collected or background thread access
- **Fix**: Check null and ensure UI thread

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

- [RichTextEditor reference](../richtexteditor)
- [Performance tuning](performance-tuning)
- [Extension patterns](extension-patterns)
