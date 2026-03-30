---
id: extension-patterns
title: Extension Patterns
doc-type: guide
tags:
 - accelerate
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The RichTextEditor is designed for extensibility at multiple levels. This guide covers patterns for extending functionality without modifying core code.

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

## Extension points

1. **Custom document elements** — new block/inline types
2. **Custom highlight layers** — find, spell check, annotations
3. **Custom serialization formats** — HTML, Markdown, etc.
4. **Custom editor components** — new input handlers
5. **Custom undo units** — special operations

## Custom document elements

Custom document elements require three pieces:

1. **Element class** — the model type (extends `RichSpan`, `RichHyperlink`, `Section`, etc.)
2. **Snapshot node** — preserves custom data through snapshot/undo round-trips
3. **Handler** — creates elements, captures snapshots, and restores formatting

Register each element at startup via `TextDocumentNodeKind.Register`:

```csharp
using Avalonia.Controls.Documents.TextModel;

public static class CustomNodeRegistration
{
    public static TextDocumentNodeKind CalloutBlockKind { get; private set; }
    public static TextDocumentNodeKind MentionInlineKind { get; private set; }

    public static void Register()
    {
        CalloutBlockKind = TextDocumentNodeKind.Register(
            "CalloutBlock",
            NodeKindFlags.Block | NodeKindFlags.BlockContainer,
            typeof(CalloutBlock),
            new CalloutBlockHandler());

        MentionInlineKind = TextDocumentNodeKind.Register(
            "MentionInline",
            NodeKindFlags.Inline,
            typeof(MentionInline),
            new MentionHandler());
    }
}
```

### Creating a custom inline element

This example creates a `MentionInline` that extends `RichHyperlink`, so mentions get pointer-over effects, click handling, and tooltips for free. The handler sets `NavigateUri` to a `mention:{userId}` URI — handle `RequestNavigate` on the editor to intercept clicks.

<Tabs>
<TabItem value="element" label="Element">

```csharp
using Avalonia.Controls.Documents;

public class MentionInline : RichHyperlink
{
    public string? UserId { get; set; }
    public string? DisplayName { get; set; }
}
```

</TabItem>
<TabItem value="snapshot" label="Snapshot node">

Preserves `UserId` / `DisplayName` through undo and serialization:

```csharp
using Avalonia.Controls.Documents.TextModel;
using Avalonia.Controls.Documents.TextModel.Snapshot;

public class MentionSnapshotNode : InlineSnapshotNode
{
    public string? UserId { get; }
    public string? DisplayName { get; }

    public MentionSnapshotNode(
        TextDocumentNodeKind kind,
        int startOffset,
        int length,
        InlineFormatting inlineFormatting,
        SnapshotNodeChildren children,
        TextElementFormatting textElementFormatting,
        string? userId,
        string? displayName)
        : base(kind, startOffset, length, inlineFormatting, children, textElementFormatting)
    {
        UserId = userId;
        DisplayName = displayName;
    }
}
```

</TabItem>
<TabItem value="handler" label="Handler">

```csharp
using Avalonia.Controls.Documents;
using Avalonia.Controls.Documents.TextModel;
using Avalonia.Controls.Documents.TextModel.Handlers;
using Avalonia.Controls.Documents.TextModel.Snapshot;
using Avalonia.Media;

public class MentionHandler : InlineNodeKindHandler
{
    private static readonly ISolidColorBrush MentionBackground =
        new SolidColorBrush(Color.Parse("#E3F2FD"));
    private static readonly ISolidColorBrush MentionForeground =
        new SolidColorBrush(Color.Parse("#1565C0"));

    public override RichTextElement? CreateElement(TextDocumentNodeKind kind)
    {
        var mention = new MentionInline();
        ApplyDefaultStyle(mention);
        return mention;
    }

    protected override SnapshotNode CreateInlineSnapshot(
        TextDocumentNodeKind kind, int startOffset, int length,
        InlineFormatting inlineFormatting, SnapshotNodeChildren children,
        TextElementFormatting textElementFormatting,
        RichTextElement? element, SnapshotNode? deferredSnapshot)
    {
        string? userId = null;
        string? displayName = null;

        if (deferredSnapshot is MentionSnapshotNode ms)
        {
            userId = ms.UserId;
            displayName = ms.DisplayName;
        }
        if (element is MentionInline mention)
        {
            userId = mention.UserId;
            displayName = mention.DisplayName;
        }

        return new MentionSnapshotNode(
            kind, startOffset, length,
            inlineFormatting, children, textElementFormatting,
            userId, displayName);
    }

    public override void ApplyFormatting(RichTextElement element, SnapshotNode snapshotNode)
    {
        base.ApplyFormatting(element, snapshotNode);

        if (element is MentionInline mention && snapshotNode is MentionSnapshotNode ms)
        {
            mention.UserId = ms.UserId;
            mention.DisplayName = ms.DisplayName;
            ApplyDefaultStyle(mention);
        }
    }

    public static void ApplyDefaultStyle(MentionInline mention)
    {
        mention.Background = MentionBackground;
        mention.Foreground = MentionForeground;
        mention.FontWeight = FontWeight.SemiBold;

        if (mention.UserId is { } userId)
        {
            mention.NavigateUri = new Uri($"mention:{userId}");
            mention.ToolTip = mention.DisplayName is { } name
                ? $"@{name} ({userId})"
                : $"@{userId}";
        }
    }
}
```

</TabItem>
</Tabs>

**Usage:**

```csharp
var mention = new MentionInline { UserId = "alice", DisplayName = "Alice" };
mention.Inlines.Add(new RichRun { Text = "@Alice" });
MentionHandler.ApplyDefaultStyle(mention);
paragraph.Inlines.Add(mention);
```

### Creating a custom block element

This example creates a `CalloutBlock` that extends `Section` (a block container) and provides a custom `StackLayoutNode` subclass that paints a colored accent bar and tinted background. The `CalloutType` enum controls the color scheme.

<Tabs>
<TabItem value="element" label="Element">

```csharp
using Avalonia.Controls.Documents;

public enum CalloutType { Note, Warning, Tip, Important }

public class CalloutBlock : Section
{
    public CalloutType Type { get; set; }
}
```

</TabItem>
<TabItem value="snapshot" label="Snapshot node">

```csharp
using Avalonia.Controls.Documents.TextModel;
using Avalonia.Controls.Documents.TextModel.Snapshot;

public class CalloutSnapshotNode : BlockSnapshotNode
{
    public CalloutType CalloutType { get; }

    public CalloutSnapshotNode(
        TextDocumentNodeKind kind,
        int startOffset,
        int length,
        BlockFormatting blockFormatting,
        SnapshotNodeChildren children,
        TextElementFormatting textElementFormatting,
        CalloutType calloutType)
        : base(kind, startOffset, length, blockFormatting, children, textElementFormatting)
    {
        CalloutType = calloutType;
    }
}
```

</TabItem>
<TabItem value="docnode" label="DocumentNode">

Custom rendering with accent bar and tinted background:

```csharp
using Avalonia;
using Avalonia.Controls.Documents;
using Avalonia.Controls.Documents.DocumentNodes;
using Avalonia.Media;

public class CalloutDocumentNode : StackLayoutNode
{
    private const double AccentBarWidth = 4;
    private readonly CalloutBlock _callout;

    public CalloutDocumentNode(CalloutBlock callout) : base(callout)
    {
        _callout = callout;
    }

    protected override IEnumerable<RichTextElement> GetEnumerable() => _callout.Blocks;

    public override void Render(DrawingContext context)
    {
        var bounds = new Rect(Bounds.Size);
        context.FillRectangle(GetBackgroundBrush(_callout.Type), bounds);
        context.FillRectangle(GetAccentBrush(_callout.Type),
            new Rect(0, 0, AccentBarWidth, bounds.Height));
    }

    private static ISolidColorBrush GetAccentBrush(CalloutType type) => type switch
    {
        CalloutType.Note     => new SolidColorBrush(Color.Parse("#1976D2")),
        CalloutType.Warning  => new SolidColorBrush(Color.Parse("#F57C00")),
        CalloutType.Tip      => new SolidColorBrush(Color.Parse("#388E3C")),
        CalloutType.Important => new SolidColorBrush(Color.Parse("#D32F2F")),
        _ => new SolidColorBrush(Color.Parse("#757575"))
    };

    private static ISolidColorBrush GetBackgroundBrush(CalloutType type) => type switch
    {
        CalloutType.Note     => new SolidColorBrush(Color.Parse("#E3F2FD")),
        CalloutType.Warning  => new SolidColorBrush(Color.Parse("#FFF3E0")),
        CalloutType.Tip      => new SolidColorBrush(Color.Parse("#E8F5E9")),
        CalloutType.Important => new SolidColorBrush(Color.Parse("#FFEBEE")),
        _ => new SolidColorBrush(Color.Parse("#F5F5F5"))
    };
}
```

</TabItem>
<TabItem value="handler" label="Handler">

```csharp
using Avalonia;
using Avalonia.Controls.Documents;
using Avalonia.Controls.Documents.DocumentNodes;
using Avalonia.Controls.Documents.TextModel;
using Avalonia.Controls.Documents.TextModel.Handlers;
using Avalonia.Controls.Documents.TextModel.Snapshot;

public class CalloutBlockHandler : BlockNodeKindHandler
{
    public override RichTextElement? CreateElement(TextDocumentNodeKind kind)
    {
        return new CalloutBlock { Padding = new Thickness(12, 6, 6, 6) };
    }

    protected override SnapshotNode CreateBlockSnapshot(
        TextDocumentNodeKind kind, int startOffset, int length,
        BlockFormatting blockFormatting, SnapshotNodeChildren children,
        TextElementFormatting textElementFormatting,
        RichTextElement? element, SnapshotNode? deferredSnapshot)
    {
        var calloutType = CalloutType.Note;

        if (deferredSnapshot is CalloutSnapshotNode cs)
            calloutType = cs.CalloutType;
        if (element is CalloutBlock callout)
            calloutType = callout.Type;

        return new CalloutSnapshotNode(
            kind, startOffset, length,
            blockFormatting, children, textElementFormatting,
            calloutType);
    }

    public override void ApplyFormatting(RichTextElement element, SnapshotNode snapshotNode)
    {
        base.ApplyFormatting(element, snapshotNode);

        if (element is CalloutBlock callout && snapshotNode is CalloutSnapshotNode cs)
        {
            callout.Type = cs.CalloutType;
            callout.Padding = new Thickness(12, 6, 6, 6);
        }
    }

    public override DocumentNode? CreateDocumentNode(RichTextElement element)
        => element is CalloutBlock callout ? new CalloutDocumentNode(callout) : null;
}
```

</TabItem>
</Tabs>

**Usage:**

```csharp
var callout = new CalloutBlock
{
    Type = CalloutType.Warning,
    Padding = new Thickness(12, 6, 6, 6),
    Margin = new Thickness(0, 5, 0, 5)
};
var body = new Paragraph();
body.Inlines.Add(new RichRun { Text = "Breaking changes ahead." });
callout.Blocks.Add(body);
doc.Blocks.Add(callout);
```

## Custom highlight layers

### Find/replace highlight layer

```csharp
using Avalonia.Controls; // HighlightLayerBase, HighlightRegion, HighlightStyle

public class FindHighlightLayer : HighlightLayerBase
{
    public FindHighlightLayer()
        : base(name: "Find", zIndex: 50)
    {
    }

    public void HighlightMatches(IEnumerable<TextRange> matches)
    {
        ClearRegions();

        foreach (var match in matches)
        {
            var region = new HighlightRegion(
                match.Start,
                match.End,
                brush: Brushes.Yellow,
                opacity: 0.4);
            AddRegion(region);
        }

        OnRegionsChanged();
    }

    public void HighlightCurrent(TextRange current)
    {
        var region = new HighlightRegion(
            current.Start,
            current.End,
            brush: Brushes.Orange,
            opacity: 0.5);
        AddRegion(region);
        OnRegionsChanged();
    }
}
```

**Integration:**

```csharp
var findLayer = new FindHighlightLayer();
editor.HighlightLayers.Add(findLayer);

// Find matches
var matches = FindInDocument(searchText);
findLayer.HighlightMatches(matches);
```

### Spell check layer

```csharp
public class SpellCheckHighlightLayer : HighlightLayerBase
{
    public SpellCheckHighlightLayer()
        : base(name: "SpellCheck", zIndex: 10)
    {
    }

    public async Task CheckSpellingAsync(TextDocument document)
    {
        var errors = await RunSpellCheckAsync(document);

        // Update highlights on UI thread
        await Dispatcher.UIThread.InvokeAsync(() =>
        {
            ClearRegions();

            foreach (var error in errors)
            {
                var region = new HighlightRegion(
                    document.CreatePointer(error.Offset),
                    document.CreatePointer(error.Offset + error.Length),
                    brush: Brushes.Red,
                    style: HighlightStyle.WavyUnderline);
                AddRegion(region);
            }

            OnRegionsChanged();
        });
    }

    private Task<List<SpellError>> RunSpellCheckAsync(TextDocument doc)
    {
        return Task.Run(() =>
        {
            // Spell check logic here
            return new List<SpellError>();
        });
    }
}
```

## Custom serialization formats

### HTML serializer

```csharp
using Avalonia.Controls.Documents;
using Avalonia.Controls.Documents.TextModel;
using Avalonia.Controls.Documents.TextModel.Snapshot;

public class HtmlSerializer : IDocumentSerializer
{
    public string FormatName => "Html";
    public string FileExtension => ".html";
    public string MimeType => "text/html";

    public bool CanDeserialize(Stream stream) => true;

    public async Task<DocumentSnapshot> DeserializeAsync(
        Stream stream, CancellationToken cancellationToken = default)
    {
        using var reader = new StreamReader(stream);
        string html = await reader.ReadToEndAsync(cancellationToken);

        var builder = FlowDocumentBuilder.Create();
        ParseHtml(html, builder);
        var doc = builder.Build();
        var textDoc = doc.EnsureTextDocument();
        return textDoc.CreateSnapshot();
    }

    public Task SerializeAsync(
        DocumentSnapshot snapshot, Stream stream,
        CancellationToken cancellationToken = default)
    {
        using var writer = new StreamWriter(stream);
        writer.WriteLine("<html><body>");

        foreach (var child in snapshot.Root.Children)
        {
            if (child is BlockSnapshotNode block)
                WriteBlock(block, snapshot, writer);
        }

        writer.WriteLine("</body></html>");
        return Task.CompletedTask;
    }

    private void WriteBlock(BlockSnapshotNode block,
                            DocumentSnapshot snapshot, StreamWriter writer)
    {
        writer.Write("<p>");

        foreach (var child in block.Children)
        {
            if (child is InlineSnapshotNode inline)
                WriteInline(inline, snapshot, writer);
        }

        writer.WriteLine("</p>");
    }

    private void WriteInline(InlineSnapshotNode inline,
                             DocumentSnapshot snapshot, StreamWriter writer)
    {
        var text = snapshot.GetText(inline.StartOffset, inline.Length);

        bool isBold = inline.Kind == TextDocumentNodeKind.Bold;
        bool isItalic = inline.Kind == TextDocumentNodeKind.Italic;

        if (isBold) writer.Write("<strong>");
        if (isItalic) writer.Write("<em>");

        // Encode text to prevent XSS
        writer.Write(System.Net.WebUtility.HtmlEncode(text));

        if (isItalic) writer.Write("</em>");
        if (isBold) writer.Write("</strong>");
    }

    private void ParseHtml(string html, FlowDocumentBuilder builder)
    {
        // Parse HTML and populate builder
    }
}
```

**Usage:**

```csharp
var serializer = new HtmlSerializer();
await using var stream = File.Create("output.html");
await editor.SaveAsync(stream, serializer);
```

## Custom editor components

### Auto-complete component

The `ITextEditorComponent` interface allows creating input handler components that integrate with the editor's host infrastructure.

```csharp
using Avalonia.Controls; // ITextEditorComponent, ITextEditorHost
using Avalonia.Controls.Documents.TextModel;

public class AutoCompleteComponent : ITextEditorComponent
{
    private ITextEditorHost? _host;
    private Popup? _completionPopup;
    private ListBox? _completionList;

    public bool IsAttached => _host is not null;

    public void OnAttach(ITextEditorHost host)
    {
        if (_host is not null)
            OnDetach();

        _host = host;
        _host.TextChanged += OnTextChanged;
        InitializePopup();
    }

    public void OnDetach()
    {
        if (_host is null)
            return;

        _host.TextChanged -= OnTextChanged;
        _host = null;
        _completionPopup = null;
    }

    private void OnTextChanged(object? sender, EventArgs e)
    {
        var selection = _host?.Selection;
        if (selection is not { IsEmpty: true }) return;

        var caretPos = selection.Start;
        string wordBeforeCaret = GetWordBeforeCaret(caretPos);

        if (wordBeforeCaret.Length >= 3)
            ShowCompletions(wordBeforeCaret);
        else
            HideCompletions();
    }

    private string GetWordBeforeCaret(TextPointer caret)
    {
        var doc = caret.TextDocument;
        if (doc == null) return string.Empty;

        int offset = caret.Offset;
        int readStart = Math.Max(0, offset - 64);
        if (readStart >= offset) return string.Empty;

        var start = doc.CreatePointer(readStart);
        var range = new TextRange(start, caret);
        string text = range.Text;

        int i = text.Length - 1;
        while (i >= 0 && char.IsLetterOrDigit(text[i]))
            i--;

        return text[(i + 1)..];
    }

    private void InsertCompletion()
    {
        if (_completionList?.SelectedItem is string completion)
        {
            var editor = _host as RichTextEditor;
            var caret = editor?.Selection?.CaretPosition;
            if (caret == null) return;

            string prefix = GetWordBeforeCaret(caret);
            var start = caret.GetPositionAtOffset(-prefix.Length);
            if (start != null)
            {
                var range = new TextRange(start, caret);
                range.Text = completion;
            }

            HideCompletions();
        }
    }

    private void ShowCompletions(string prefix) { /* ... */ }
    private void HideCompletions() { /* ... */ }
    private void InitializePopup() { /* ... */ }
}
```

**Registration:**

```csharp
editor.RegisterComponent(new AutoCompleteComponent());
```

## Custom undo units

### Grouping operations into a single undo step

Use `UndoManager.BeginUndoUnit` to record everything inside the scope as one undoable action:

```csharp
using Avalonia.Controls.Documents.Undo;

var undoManager = editor.UndoManager;
if (undoManager != null)
{
    using (undoManager.BeginUndoUnit("Find and Replace All"))
    {
        // All edits inside this scope are a single undo step
        foreach (var match in matches)
        {
            match.Text = replacement;
        }
    }
}
```

`IUndoUnit` is the public interface for inspecting recorded undo entries (read-only `Description` property). The internal undo/redo mechanics are handled by the framework. Use `BeginUndoUnit` rather than creating custom undo unit types.

## Best practices

### Do's

1. **Implement `ITextEditorComponent`** — use the attach/detach lifecycle for proper cleanup and initial-scan support
2. **Subscribe to input events on `host.UIScope`** — the host itself does not receive input events; only the UIScope does
3. **Use `RoutingStrategies.Tunnel` for pointer interception** — built-in components like `TextEditorMouse` mark events as handled on Bubble; use Tunnel to inspect events first
4. **Use `ITextView.GetTextPositionFromPoint` for hit-testing** — selection state may be stale (especially during Tunnel); hit-test the click point directly
5. **Inherit from base classes** — use `HighlightLayerBase`, not raw `IHighlightLayer`
6. **Handle nulls gracefully** — hosts, UIScope, and TextView can be null during transitions
7. **Write unit tests** — test extensions thoroughly
8. **Use async for long operations** — don't block the UI thread

### Don'ts

1. **Don't subscribe to events on the host/editor directly** — use `host.UIScope` via `AddHandler`/`RemoveHandler`
2. **Don't rely on selection state in pointer handlers** — hit-test the point instead; selection hasn't been updated yet during the Tunnel phase
3. **Don't access internals** — use public APIs only
4. **Don't hold strong document references** — causes memory leaks
5. **Don't block UI thread** — use async for CPU/IO work
6. **Don't assume document structure** — validate before accessing
7. **Don't bypass undo system** — always record undoable operations
8. **Don't forget to detach** — clean up event handlers

## Complete example: Smart link detection

This component detects URLs in the document, highlights them with a blue underline, and supports Ctrl+Click to open links. Key patterns demonstrated:

- **`ITextEditorComponent` lifecycle** — scans on attach (existing content) and on every subsequent text or document change
- **`host.UIScope`** — subscribes to pointer events on the UIScope, not the host itself, because only the UIScope receives input events
- **`RoutingStrategies.Tunnel`** — subscribes in the Tunnel phase so the handler fires before `TextEditorMouse` marks the event as handled in the Bubble phase
- **`ITextView` hit-testing** — uses `GetTextPositionFromPoint` to resolve the click position to a `TextPointer`; selection state is stale during the Tunnel phase

```csharp
// Register via editor.RegisterComponent(new SmartLinkExtension()).
// Unregister via editor.UnregisterComponent(component).

public class SmartLinkExtension : ITextEditorComponent
{
    private ITextEditorHost? _host;
    private readonly LinkHighlightLayer _linkLayer = new();
    private readonly List<DetectedLink> _links = new();

    public bool IsAttached => _host is not null;

    public event Action<Uri>? LinkActivated;

    public void OnAttach(ITextEditorHost host)
    {
        if (_host is not null)
            OnDetach();

        _host = host;

        if (_host is RichTextEditor editor)
            editor.HighlightLayers.Add(_linkLayer);

        _host.TextChanged += OnTextChanged;
        _host.DocumentChanged += OnDocumentChanged;

        // Subscribe on UIScope (the element that receives input events)
        // using Tunnel so we fire before TextEditorMouse's Bubble handler.
        _host.UIScope?.AddHandler(
            InputElement.PointerPressedEvent,
            OnPointerPressed,
            RoutingStrategies.Tunnel);

        // Scan existing content immediately
        _ = DetectLinksAsync();
    }

    public void OnDetach()
    {
        if (_host is null)
            return;

        _host.TextChanged -= OnTextChanged;
        _host.DocumentChanged -= OnDocumentChanged;

        _host.UIScope?.RemoveHandler(
            InputElement.PointerPressedEvent,
            OnPointerPressed);

        if (_host is RichTextEditor editor)
            editor.HighlightLayers.Remove(_linkLayer);

        _links.Clear();
        _linkLayer.ClearHighlights();
        _host = null;
    }

    private async void OnTextChanged(object? sender, EventArgs e)
        => await DetectLinksAsync();

    private async void OnDocumentChanged(object? sender, EventArgs e)
        => await DetectLinksAsync();

    private async Task DetectLinksAsync()
    {
        var doc = _host?.TextDocument;
        if (doc is null) return;

        var start = doc.CreatePointer(0);
        var end = doc.CreatePointer(doc.Length);
        string text = new TextRange(start, end).Text;

        var found = await Task.Run(() => FindUrls(text));

        await Dispatcher.UIThread.InvokeAsync(() =>
        {
            // Guard against detach or document swap while awaiting
            if (_host is null) return;
            var currentDoc = _host.TextDocument;
            if (currentDoc != doc) return;

            _links.Clear();
            _linkLayer.ClearHighlights();

            foreach (var (offset, length, uri) in found)
            {
                _links.Add(new DetectedLink(
                    offset, offset + length, uri));
                _linkLayer.AddLink(
                    currentDoc.CreatePointer(offset),
                    currentDoc.CreatePointer(offset + length));
            }

            _linkLayer.RaiseChanged();
        });
    }

    private void OnPointerPressed(object? sender, PointerPressedEventArgs e)
    {
        var host = _host;
        if (host is null) return;

        var uiScope = host.UIScope;
        var textView = host.TextView;
        if (uiScope is null || textView is null) return;

        if (!e.KeyModifiers.HasFlag(KeyModifiers.Control)) return;
        if (!e.GetCurrentPoint(uiScope).Properties.IsLeftButtonPressed) return;

        // Hit-test the click point — don't rely on selection state,
        // which hasn't been updated yet during the Tunnel phase.
        var clickPoint = e.GetPosition((Visual)textView);
        var pointer = textView.GetTextPositionFromPoint(
            clickPoint, snapToText: false);
        if (pointer is null) return;

        int offset = pointer.Offset;
        var link = _links.Find(l => offset >= l.Start && offset <= l.End);

        if (link is not null)
        {
            LinkActivated?.Invoke(link.Uri);
            e.Handled = true;
        }
    }

    private record DetectedLink(int Start, int End, Uri Uri);
}
```

## Testing extensions

```csharp
public class MentionInlineTests
{
    [Fact]
    public void MentionInline_PreservesUserIdThroughSnapshot()
    {
        // Arrange — register the custom kind
        var kind = TextDocumentNodeKind.Register(
            "TestMention", NodeKindFlags.Inline,
            typeof(MentionInline), new MentionHandler());

        var doc = new FlowDocument();
        var para = new Paragraph();
        var mention = new MentionInline { UserId = "alice", DisplayName = "Alice" };
        mention.Inlines.Add(new RichRun { Text = "@Alice" });
        MentionHandler.ApplyDefaultStyle(mention);
        para.Inlines.Add(mention);
        doc.Blocks.Add(para);

        var textDoc = doc.EnsureTextDocument();

        // Act — snapshot round-trip
        var snapshot = textDoc.CreateSnapshot();
        var restored = snapshot.ToFlowDocument();
        var restoredDoc = restored.EnsureTextDocument();

        // Assert
        var restoredMention = restoredDoc.Root
            .DescendantsOfKind(kind)
            .First().Element as MentionInline;

        Assert.NotNull(restoredMention);
        Assert.Equal("alice", restoredMention.UserId);
        Assert.Equal("Alice", restoredMention.DisplayName);
    }
}
```

## See also

- [RichTextEditor reference](../richtexteditor)
- [Performance tuning](performance-tuning)
- [Thread safety](thread-safety)
