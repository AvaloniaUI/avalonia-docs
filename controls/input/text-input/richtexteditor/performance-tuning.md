---
id: performance-tuning
title: Performance Tuning
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

Performance tuning guide for `RichTextEditor`. Covers batch edits, event optimization, memory management, serialization, and profiling strategies.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
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
- Use `TextDocument.Changed` (raised once per commit) instead of `TextDocument.TextChanged` (per edit) for expensive operations
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

// Good — 1 Changed event, 1 layout pass
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

Handle `TextDocument.Changed`, which is raised once per committed change scope, instead of reacting to every edit:

```csharp
// Bad — called for every keystroke
editor.ContentChanged += (s, e) =>
{
    RebuildUI();
};

// Good — called once per batch
var textDoc = editor.Document.TextDocument;
textDoc.Changed += (s, e) =>
{
    // Changed is suppressed on no-op scopes, so e.HasChanges is true here.
    RebuildUI();
};
```

`TextDocument` raises two change events. `TextChanged` fires per text edit with a `TextChangeEventArgs`; `Changed` fires once when a change scope commits, with a `DocumentChangedEventArgs` carrying `HasChanges`. Expensive work belongs on `Changed`.

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

    editor.ContentChanged += (s, e) =>
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
// Bad — creating a pointer per character index
for (int i = 0; i < 1000; i++)
{
    var p = document.ContentStart.CreatePointer(i); // allocates, O(log n) per call
}

// Good — snapshot once and read text in bulk
var snapshot = document.CreateSnapshot();
string slice = snapshot.GetText(offset: 0, length: 1000);
for (int i = 0; i < slice.Length; i++)
{
    char c = slice[i]; // direct array access
}
```

`DocumentSnapshot.GetText`, `GetTextMemory` and `WriteTextTo` all pull a substring without allocating per-character pointers.

### Reuse pointers when possible

```csharp
var pointer = document.ContentStart.CreatePointer(0);
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

`RichTextEditor.UndoManager` and `TextDocument.UndoManager` are both typed `UndoManager?`. To record nothing, either turn the instance off with `IsEnabled` or set the document's manager to `null`; there is no null-object manager to substitute.

```csharp
void LoadLargeDocument(string rtfPath)
{
    UndoManager? undoManager = editor.UndoManager;
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

`IDocumentSerializer` is synchronous: `Serialize` and `Deserialize` run wherever you call them. `SaveAsync` and `LoadAsync` are the shipped wrappers that move the work to the thread pool, so the decision about which thread pays is yours.

```csharp
async Task SaveDocumentAsync(string path)
{
    // SaveAsync captures the snapshot on the calling thread, then writes
    // on the thread pool.
    await using var stream = File.Create(path);
    await editor.SaveAsync(stream, new RtfSerializer());
}
```

**Impact**: No UI blocking during save.

When you drive a serializer yourself, wrap the call:

```csharp
var snapshot = editor.Document.CreateSnapshot();   // UI thread, cheap
await Task.Run(() => serializer.Serialize(snapshot, stream, cancellationToken), cancellationToken);
```

One snapshot can feed several serializers, which avoids a redundant tree walk per format.

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

### Vertical caret navigation

Up and Down walk the document tree structurally rather than scanning visual lines for a Y-coordinate change. Two properties follow:

- Cost is bounded by tree depth, not by the number of visible lines. One keystroke in a 50-row by 50-column table costs on the order of rows plus descent depth.
- The intended column is captured once on the first vertical keystroke and reused until the selection changes by something other than vertical movement. That reuse is what keeps the caret in the same visual column across short lines, empty paragraphs and table cells.

The column intent is discarded by any non-vertical selection change: a click, typing, a programmatic `Select`, or a horizontal arrow, Home, End or word-jump keystroke. Avoid clearing or reassigning `Selection.CaretPosition` between consecutive Up/Down presses if you want the column preserved.

### Paged layout

Page layout keeps its sheets on screen while an edit repaginates, rather than tearing down the break table and rebuilding it in an idle slice. Screen, print and PDF export share one page-break policy, so they break identically and pagination cost is paid once per model.

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
        var pointer = _document.ContentStart.CreatePointer(0);

        // BeginChange returns an IDisposable; there is no public EndChange.
        using (_document.BeginChange())
        {
            for (int i = 0; i < 1000; i++)
            {
                pointer.InsertText("X");
            }
        }
    }
}
```

Run it with:

```csharp
BenchmarkRunner.Run<CustomBenchmark>();
```

## Anti-patterns

### Don't poll document state

```csharp
// Bad: Polling
var timer = new DispatcherTimer { Interval = TimeSpan.FromMilliseconds(100) };
timer.Tick += (s, e) => CheckDocumentState();

// Good: Event-driven
var textDoc = editor.Document.TextDocument;
textDoc.Changed += (s, e) => UpdateState();
```

### Don't rebuild UI on every keystroke

```csharp
// Bad
editor.ContentChanged += (s, e) => RebuildEntireUI();

// Good
var textDoc = editor.Document.TextDocument;
textDoc.Changed += (s, e) =>
{
    if (e.HasChanges)
        RefreshAffectedRegions();
};
```

### Don't store full text copies for undo

```csharp
// Bad: Undo via full text
undoStack.Push(editor.Document.ContentRange?.GetText() ?? "");

// Good: Built-in UndoManager (auto-created by the editor)
editor.UndoLimit = 100;
```

## Profiling tips

### Use diagnostic tools

**Windows**: Visual Studio Performance Profiler  
**macOS/Linux**: dotnet-trace, PerfView

### Hot paths to monitor

1. `TextRange.DeleteText` / `ReplaceText` and `TextPointer.InsertText`
2. Rope operations, which are internal and show up as time spent inside the above
3. Layout in `TextViewBase` / `InteractiveTextView`, and in `PagedTextView` for page layout
4. Event handlers on `TextDocument.TextChanged` and `TextDocument.Changed`

### Red flags

- O(n^2) algorithms in custom event handlers
- Excessive allocations (>1MB for simple edits)
- Layout thrashing (multiple passes per edit)
- Unbounded undo growth

## See also

- [RichTextEditor reference](/controls/input/text-input/richtexteditor)
- [Thread safety](/controls/input/text-input/richtexteditor/thread-safety)
- [Extension patterns](/controls/input/text-input/richtexteditor/extension-patterns)
