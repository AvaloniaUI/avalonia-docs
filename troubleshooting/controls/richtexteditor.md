---
id: richtexteditor
title: RichTextEditor issues
description: Troubleshoot common RichTextEditor problems.
doc-type: troubleshooting
sidebar_label: RichTextEditor
tags:
  - avalonia pro
  - avalonia enterprise
---

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

For reference information on this control, see the [RichTextEditor](/controls/input/text-input/richtexteditor) page. If you are moving a project from 12.x, see [Upgrading to 13.0](/controls/input/text-input/richtexteditor/upgrading-to-13).

## A viewer shows nothing

`FlowDocumentScrollViewer.Document` and `FlowDocumentPageViewer.Document` start out null, so a viewer with no document assigned renders an empty surface rather than reporting a problem.

```csharp
viewer.Document = new FlowDocument
{
    Blocks = { new Paragraph { Inlines = { new RichRun("Hello") } } }
};
```

`RichTextEditor.Document` behaves differently: the editor creates an empty `FlowDocument` for itself, so it is never null unless you assign null over it.

## Undo does nothing

The editor creates an `UndoManager` for you when a document is attached, so there is nothing to install. `RichTextEditor.UndoManager` is read-only and reports the one in use.

Two things do switch undo off:

```csharp
// Recording is disabled
editor.UndoManager!.IsEnabled = false;

// Or the history is too short to hold the edit
editor.UndoLimit = 0;
```

A document you built yourself and assigned to `TextDocument.UndoManager` is used as-is; the editor adopts an existing manager rather than replacing it.

## Edits do not appear

Group several operations into one change so the view updates once and undo treats them as a single step. `BeginChange` returns an `IDisposable`, so the scope ends with the `using` block.

```csharp
using (document.TextDocument.BeginChange())
{
    // Your edits
}
```

## SerializeAsync and DeserializeAsync are gone

`IDocumentSerializer` is synchronous in 13.0. The work is processor-bound and no format performs asynchronous I/O, so the asynchronous pair only moved work to a thread pool thread, which a caller can do better themselves.

```csharp
// Synchronous, on the calling thread
serializer.Serialize(document.CreateSnapshot(), stream);

// Off the calling thread, with the scheduler of your choosing
await Task.Run(() => serializer.Serialize(snapshot, stream, cancellationToken), cancellationToken);
```

`FlowDocument.Save` and `FlowDocument.Load` are back and take a `CancellationToken`. `SaveAsync` and `LoadAsync` remain as thread-offload conveniences.

## A document loaded on a background thread throws on first use

A `FlowDocument` and its elements bind to the dispatcher of the thread that constructs them, so a document assembled on a pool thread throws `InvalidOperationException` the first time the UI thread reads a property from it.

`FlowDocument.LoadAsync` handles this: it parses off the calling thread and then builds the element tree through the UI thread dispatcher.

To stay off the UI thread entirely, work with the model rather than the facade. `TextDocument` is not thread-bound:

```csharp
var snapshot = serializer.Deserialize(stream);
var document = TextDocument.FromSnapshot(snapshot);
```

## IUndoManager or NullUndoManager does not resolve

Both are removed, along with `IUndoManagerInternal` and `IUndoHistory`. `UndoManager` is the single implementation, and `TextDocument.UndoManager` and `RichTextEditor.UndoManager` are typed `UndoManager?`.

Where you used `NullUndoManager.Instance` to mean "no undo", use `null` or a manager whose `IsEnabled` is false. Both record nothing.

## A built-in action type does not resolve

The concrete action classes are internal in 13.0. Reference a built-in action through the `EditorActions` singletons, which is what the shipped toolbar does:

```xml
<toolbar:ButtonTool Action="{x:Static actions:EditorActions.Bold}" />
```

```csharp
await EditorActions.Bold.ExecuteAsync(host);
```

Constructing one directly was never supported: a second instance carries a duplicate `Id` that `EditorActions.GetById` will not return. Your own actions are unaffected, since `IEditorAction`, `EditorAction`, `FormattingToggleAction<T>`, `PropertyAction<T>` and `BlockPropertyAction<T>` all stay public.

## Text in an exported PDF is unreadable

A font whose OS/2 `fsType` forbids embedding cannot be embedded, so the export substitutes one. Ask the exporter what it did rather than guessing:

```csharp
var options = new PdfSerializerOptions
{
    Diagnostics = d => Console.WriteLine($"{d.Kind}: {d.Message}")
};
```

## Debugging threading issues

### Enable thread assertions

Avalonia has built-in thread checking:

```csharp
// Throws if not on UI thread
Dispatcher.UIThread.VerifyAccess();
```

### Common exceptions

**InvalidOperationException**: "The calling thread cannot access this object because a different thread owns it."
- **Cause**: a `FlowDocument` or an element was constructed on one thread and read from another
- **Fix**: build the facade on the UI thread, or work with `TextDocument` and `DocumentSnapshot`, which are not thread-bound

**InvalidOperationException** from a serializer during editing
- **Cause**: serializing a live document while it is being edited
- **Fix**: capture a `DocumentSnapshot` on the UI thread first, then serialize the snapshot from wherever you like

## See also

- [RichTextEditor control](/controls/input/text-input/richtexteditor)
- [Upgrading to 13.0](/controls/input/text-input/richtexteditor/upgrading-to-13)
- [Thread safety](/controls/input/text-input/richtexteditor/thread-safety)
