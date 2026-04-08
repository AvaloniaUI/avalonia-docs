---
id: performance-tuning
title: Performance Tuning
doc-type: guide
tags:
 - accelerate
---

Performance tuning guide for `RichTextEditor`. Covers batch edits, event optimization, memory management, serialization, and profiling strategies.

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

## Core performance characteristics

### Time complexity

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| Insert text | O(log n) | Rope data structure |
| Delete text | O(log n) | Balanced tree update |
| Find position | O(log n) | Tree traversal |
| Undo/Redo | O(1) - O(log n) | Structural undo |
| Serialize | O(n) | Streaming tokenizer |
| Render | O(visible nodes) | Viewport culling |

### Memory usage

- **Document**: O(n) text + O(m) nodes
- **Rope overhead**: ~2x base text
- **Undo stack**: ~10% with structural undo (vs 100x traditional)
- **Snapshots**: Shared structure, minimal overhead

## Performance checklist

- Batch all multi-edit operations
- Use `UpdateFinished` instead of `Changed` for expensive operations
- Debounce user-triggered updates
- Set appropriate `UndoLimit` on the editor
- Disable undo during bulk loads
- Use background threads for serialization
- Minimize pointer allocations
- Profile before optimizing

## Batch edit optimization

### Always batch multiple operations

Single change notification instead of one per edit:

```csharp
// Bad — 100 Changed events, 100 layout passes
for (int i = 0; i < 100; i++)
{
    pointer.InsertText("Line " + i + "\n");
}

// Good — 1 UpdateFinished event, 1 layout pass
using (document.BeginChange())
{
    for (int i = 0; i < 100; i++)
    {
        pointer.InsertText("Line " + i + "\n");
    }
}
```

**Impact**: 10-100x speedup for bulk operations.

## Event handler optimization

### Defer expensive operations

Use `UpdateFinished` instead of reacting to every edit:

```csharp
// Bad — called for every keystroke
editor.TextChanged += (s, e) =>
{
    RebuildUI();
};

// Good — called once per batch
var textDoc = editor.Document?.TextDocument;
textDoc.UpdateFinished += (s, e) =>
{
    RebuildUI();
};
```

### Debounce user-triggered updates

```csharp
private DispatcherTimer _updateTimer;

void Setup()
{
    _updateTimer = new DispatcherTimer
    {
        Interval = TimeSpan.FromMilliseconds(300)
    };
    _updateTimer.Tick += OnDelayedUpdate;

    editor.TextChanged += (s, e) =>
    {
        _updateTimer.Stop();
        _updateTimer.Start(); // Restart timer
    };
}

void OnDelayedUpdate(object? sender, EventArgs e)
{
    _updateTimer.Stop();
    // Expensive operation (word count, spell check, etc.)
    UpdateStatistics();
}
```

**Impact**: Reduces CPU usage during continuous typing.

## Pointer and range optimization

### Minimize pointer allocations

```csharp
// Bad — creating many pointers
for (int i = 0; i < 1000; i++)
{
    var p = document.CreatePointer(i); // O(log n) each
    char c = p.TextDocument.GetCharAt(p.Offset);
}

// Good — direct access
for (int i = 0; i < 1000; i++)
{
    char c = document.GetCharAt(i); // Direct O(log n)
}
```

### Reuse pointers when possible

```csharp
var pointer = document.CreatePointer(0);
for (int i = 0; i < 100; i++)
{
    pointer.InsertText("Line\n");
    // pointer auto-updates to after insertion
}
```

## Memory management

### Undo stack limits

```csharp
// Default: 100 operations (set via RichTextEditor.UndoLimit)
editor.UndoLimit = 50;  // Reduce for memory-constrained environments
editor.UndoLimit = 200; // Increase for power users
```

**Trade-off**: Memory vs undo history depth.

### Disable undo for bulk loads

```csharp
void LoadLargeDocument(string rtfPath)
{
    var undoManager = editor.UndoManager;
    if (undoManager != null)
        undoManager.IsEnabled = false;

    try
    {
        using var stream = File.OpenRead(rtfPath);
        editor.Load(stream, new RtfSerializer());
    }
    finally
    {
        if (undoManager != null)
            undoManager.IsEnabled = true;
    }
}
```

**Impact**: 50% faster load, no undo memory overhead.

### Clear undo history when needed

```csharp
// After saving document
editor.ClearUndoHistory();
```

## Serialization performance

### Use background threads

```csharp
async Task SaveDocumentAsync(string path)
{
    // SaveAsync handles snapshot creation internally
    await using var stream = File.Create(path);
    await editor.SaveAsync(stream, new RtfSerializer());
}
```

**Impact**: No UI blocking during save.

### Stream large files

```csharp
// Streaming tokenizer handles large files efficiently
await using var stream = File.OpenRead("large.rtf");
await editor.LoadAsync(stream, new RtfSerializer());
// Memory usage: O(output size), not O(file size)
```

## Rendering performance

### Viewport culling

Built-in: only visible elements are rendered. No action needed.

### Reduce layout passes

```csharp
// Batch formatting changes
using (document.BeginChange())
{
    range1.ApplyPropertyValue(prop1, value1);
    range2.ApplyPropertyValue(prop2, value2);
    range3.ApplyPropertyValue(prop3, value3);
}
// Single layout pass
```

### Simplify complex documents

- Limit nesting depth (< 10 levels)
- Merge adjacent runs with same formatting
- Use metadata normalization

## Large document strategies

### Tested limits

- 10,000+ paragraphs
- 1MB+ RTF files
- 100+ undo operations

### For very large documents (100MB+)

Consider:
1. **Pagination** — load sections on demand
2. **Virtual scrolling** — render visible pages only
3. **Read-only mode** — disable undo for memory savings via `FlowDocumentScrollViewer`
4. **Streaming** — process in chunks

## Benchmarking

### Built-in benchmarks

```bash
cd benchmarks/Avalonia.Controls.Documents.Benchmarks
dotnet run -c Release
```

Benchmarks cover:
- Text insertion/deletion
- Batch edits
- Serialization
- Metadata normalization

### Custom benchmarks

```csharp
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

[MemoryDiagnoser]
public class CustomBenchmark
{
    private TextDocument _document;
    
    [GlobalSetup]
    public void Setup()
    {
        _document = new TextDocument("Initial text");
    }
    
    [Benchmark]
    public void BulkInsert()
    {
        var pointer = _document.CreatePointer(0);
        _document.BeginChange();
        for (int i = 0; i < 1000; i++)
        {
            pointer.InsertText("X");
        }
        _document.EndChange();
    }
}

BenchmarkRunner.Run<CustomBenchmark>();
```

## Anti-patterns

### Don't poll document state

```csharp
// Bad: Polling
var timer = new DispatcherTimer { Interval = TimeSpan.FromMilliseconds(100) };
timer.Tick += (s, e) => CheckDocumentState();

// Good: Event-driven
var textDoc = editor.Document?.TextDocument;
if (textDoc != null)
    textDoc.UpdateFinished += (s, e) => UpdateState();
```

### Don't rebuild UI on every keystroke

```csharp
// Bad
editor.TextChanged += (s, e) => RebuildEntireUI();

// Good
var textDoc = editor.Document?.TextDocument;
if (textDoc != null)
{
    textDoc.UpdateFinished += (s, e) =>
    {
        if (e.HasChanges)
            RefreshAffectedRegions();
    };
}
```

### Don't store full text copies for undo

```csharp
// Bad: Undo via full text
undoStack.Push(editor.Document?.ContentRange?.Text ?? "");

// Good: Built-in UndoManager (auto-created by the editor)
editor.UndoLimit = 100;
```

## Profiling tips

### Use diagnostic tools

**Windows**: Visual Studio Performance Profiler  
**macOS/Linux**: dotnet-trace, PerfView

### Hot paths to monitor

1. `TextDocument.InsertText/DeleteText`
2. `RopeTextStore` operations
3. Layout in `FlowDocumentView`
4. Event handlers (`Changed`, `UpdateFinished`)

### Red flags

- O(n^2) algorithms in custom event handlers
- Excessive allocations (>1MB for simple edits)
- Layout thrashing (multiple passes per edit)
- Unbounded undo growth

## See also

- [RichTextEditor reference](../richtexteditor)
- [Thread safety](thread-safety)
- [Extension patterns](extension-patterns)
