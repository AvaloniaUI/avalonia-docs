---
id: upgrading-to-13
title: Upgrading to 13.0
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

This guide takes a project from `Avalonia.Controls.RichTextEditor` 12.2.3, the last 12.x release, to 13.0. A major version is where the library removes what it has replaced rather than carrying both shapes: 13.0 ships hard removals with no `[Obsolete]` shims, so an upgraded call site fails to compile against a name that no longer exists and the compiler says nothing about what took its place. That is what the tables below are for. Every removal has a row naming the replacement.

The changes that produce no compile error come first, because nothing else will point them out. Read that section even if your build is green.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

:::warning
Names introduced and withdrawn between 12.2.3 and 13.0 are not listed here: they were never on a shipped assembly. If you are moving off a 13.0 prerelease build rather than off 12.2.3, see [names that changed inside this release cycle](#names-that-changed-inside-this-release-cycle).
:::

## Changes with no compile error

These change what the library does without changing a signature. A build that succeeds tells you nothing about them.

### `Paragraph.WidowControl` defaults on

Paged layout, printing and PDF export now keep at least two lines of a paragraph on each side of a page break, which is Word's default. Existing documents repaginate: a page break can move by a line, so page counts and per-page content differ from earlier releases. Screen layout in the continuous flow is unaffected, because it does not paginate.

To restore the old cuts, turn it off per paragraph, or in the file the document comes from:

| Where | How |
|---|---|
| Model | `paragraph.WidowControl = false` |
| RTF | `\nowidctlpar` |
| DOCX | `<w:widowControl w:val="false"/>` |

The keep rules and the rest of the break policy are covered in [Pagination](/controls/input/text-input/richtexteditor/pagination).

### The markdown alert header and footnotes are no longer document content

Two generated visuals moved from the document into the render layer.

The alert kind header ("Note", "Warning") was the alert `Section`'s first child paragraph and is now drawn by the alert block itself. Two consequences: the `Section` loses its first child, so a positional selector or any code indexing `Section.alertBlock`'s children shifts by one; and the kind text leaves the document, so `GetText()`, select-all, copy and text search no longer see it, and the caret cannot be placed in it. Style the header through `Section.alertBlock` itself, which reaches it through `FontFamily`, `FontSize` and `Foreground`; those are inherited by the alert body as well, and there is no separate selector for the header.

The dead theme rules that used to select the old header element are gone with it: `BlockUIContainer.alertBlockHeader` and its five per-kind icon rules, the five `MarkdownAlertBlockHeader{Kind}ContentTemplate` templates, `MarkdownAlertBlockHeaderMargin`, the five `Section.alertBlock Paragraph.{kind}` rules and the `MarkdownAlertBlock{Kind}ParagraphForeground` brushes. An application that overrode one of those keys had no effect before and still has none.

Markdown footnotes are no longer lowered into the body as a superscript hyperlink per citation plus loose paragraphs per definition. A citation is now a `RichFootnoteReference` anchor and a definition is a `Footnote` in `FlowDocument.Footnotes`, rendered as a nested document below the flow. Styles and code that targeted the lowering match nothing, a definition's text is no longer part of the document's text, and no style selector reaches a note's blocks: a note's paragraphs style like every other paragraph. See [Footnotes](/controls/input/text-input/richtexteditor/footnotes) and [Markdown serialization](/controls/input/text-input/richtexteditor/markdown-serialization).

### `MarkdownTaskListItem` styles as `ListItem`

`MarkdownTaskListItem` overrides its style key to `ListItem`, so `<Style Selector="Markdown MarkdownTaskListItem">` matches nothing, with no compile error and no warning: the styling simply stops. Use `ListItem.taskListItem` instead. The same change makes the shipped theme's own `ListItem.taskListItem` and `.checked` rules apply for the first time, so an application that never styled task items sees a visual change on upgrade.

### `ContentRange` returns a fresh range per read

`TextDocument.ContentRange` and `FlowDocument.ContentRange` returned one cached instance and now build a new `TextRange` on every read. The cached range was mutable by its own operations: `doc.ContentRange.DeleteCurrentBlock()` collapsed the document's cached range onto the deletion point, and every later read at that generation handed back the collapsed range.

Two reads compare equal and are no longer the same object. Reference identity across reads is gone, and so is a subscription's usefulness: `doc.ContentRange.Changed += ...` now attaches a handler to a range nothing else will ever see. Hold the range in a local if you need one instance.

### `ToolbarGroup` no longer throws when nested

Adding a `ToolbarGroup` to another group's `Tools` threw an `InvalidOperationException` from a collection-changed handler, which surfaced as an `XamlLoadException` wrapping it at parse time. Nesting is supported now, so markup that used to fail loudly builds a tree. Overflow descends it: a nested group contributes its own children to the enclosing top-level group's menu section rather than collapsing as a unit, because a group carries no overflow menu item to stand in for its children.

### Toolbar target areas are computed, not set

`EditorToolbar.ActiveTargetAreas` and `EditorTool.ActiveTargetAreas` are derived from the selection on every selection and document change and pushed onto the tools. A value written in XAML survived only until the next caret move; the property no longer accepts the write at all. Say which areas a tool serves with `EditorTool.TargetAreas`.

### Highlight layers reject what they used to swallow

`HighlightLayerCollection.Add` throws when a layer's `Name` is already in the collection: that name is the key `GetLayer` looks up, and two layers under one name made the lookup arbitrary. `HighlightLayerBase.RenderRegion` throws for a highlight style it has no renderer for instead of drawing nothing, which used to read as a layer that never reported its regions.

### `EditorActions.All` has an order

`All` enumerated a dictionary's values in whatever order they landed. It is now a list in declaration order, grouped by category. A menu or toolbar built by iterating it comes out in a different, stable order.

### `FlowDocumentScrollViewer` raises the host events it used to discard

`ContentChanged` and `DocumentChanged` were explicit interface implementations with empty `add`/`remove` accessors, so a subscription through `IInteractiveTextHost` was silently dropped. Both are ordinary public events now and are raised. A handler that never ran starts running.

### Invoking a block property action is a no-op, not an exception

`BlockPropertyAction<T>.Execute` threw `NotSupportedException`, and every entry point that invokes an action (a `ButtonTool`, an `EditorMenuItem`, a keyboard shortcut) awaited the resulting task with no observer, so binding a tool to `EditorActions.Margin`, `Padding`, `LineHeight`, `BlockBackground`, `BorderThickness`, `BorderBrush` or `TextAlignment` and clicking it took the host process down. Invoking a block property action with no value does nothing now, matching the inline property actions; `SetValue` is still how a block property is applied. Code that relied on catching that exception catches nothing.

### A custom `ITextEditorHost` gets grouped undo

`BlockPropertyAction<T>` reached the undo manager by downcasting the host to the concrete `RichTextEditor`, so a consumer-authored host recorded one undo unit per affected block. It goes through `ITextEditorHost.TextDocument` now: applying a block property across three paragraphs is one undo entry on any host.

### `FlowDocument.LoadAsync` builds elements on the UI thread

Parsing runs on the thread pool as before, and the element tree is then built through an explicit `Dispatcher.UIThread.InvokeAsync`. A `FlowDocument` and its elements belong to the dispatcher of the thread that constructed them, so a document assembled on a pool thread threw on the first property read from the UI thread. The dispatch no longer depends on an ambient `SynchronizationContext`, which a console host or a caller already off the UI thread does not have. To load with no UI thread involved at all, read a `DocumentSnapshot` with the serializer and materialize it with `TextDocument.FromSnapshot`, which has no thread affinity.

### `MarkdownSerializer` sniffs and cancels

`CanDeserialize` returned an unconditional `true`, including for a null or unreadable stream, so a format-sniffing loop that tried serializers in order always stopped at markdown. It now returns false for a stream it cannot read. Markdown still accepts any readable stream, so it has to be tried last, next to `PlainTextSerializer`. The serializer also observes the `CancellationToken` it used to accept and ignore: a large import can now end early, per block, where it previously ran to completion.

### `TableRowGroup.Table` is derived

The settable back-pointer could name a table that did not hold the group. The getter now reports the logical parent, so it tells the truth, and it answers differently for any code that assigned it by hand.

## Removed and renamed members

### Undo

The undo abstraction is gone. `UndoManager` is the one sealed implementation, and it is the type every undo entry point now names.

| Member | Status | Replacement |
|---|---|---|
| `IUndoManager` | **removed** | `UndoManager`, the one implementation |
| `IUndoHistory` | **removed** | no public replacement; the unit stacks are internal |
| `NullUndoManager`, `NullUndoManager.Instance` | **removed** | `null`, or an `UndoManager` whose `IsEnabled` is `false`; both record nothing |
| `IUndoManager.Record(IUndoUnit)`, `UndoManager.Record(IUndoUnit)` | **removed** | none: the method type-tested against an internal interface and threw for every unit an outside caller could construct. Group edits with `TextDocument.BeginChange()` |
| `UndoManager.UndoUnits` | demoted to `internal` | `UndoManager.CanUndo` for whether there is anything to undo |
| `UndoManager.RedoUnits` | demoted to `internal` | `UndoManager.CanRedo` |
| `TextDocument.UndoManager` (`IUndoManager?`) | **retyped** | `UndoManager?` |
| `RichTextEditor.UndoManager` (`IUndoManager?`) | **retyped** | `UndoManager?` |

`IUndoUnit`, `IUndoScope`, `EmptyUndoUnit` and `SelectionSnapshot` are unchanged. `SelectionSnapshot.Capture(TextSelection)` is new, and gives the type the public way to build one that it never had.

### Serializer contract

`IDocumentSerializer` drops its async pair. Every format is processor-bound and assembled in memory, so the task the old members returned never represented I/O.

| Member | Status | Replacement |
|---|---|---|
| `IDocumentSerializer.SerializeAsync(DocumentSnapshot, Stream, CancellationToken)` | **removed** | `IDocumentSerializer.Serialize(DocumentSnapshot, Stream, CancellationToken)`, wrapped in `Task.Run` when the caller wants it off its own thread |
| `IDocumentSerializer.DeserializeAsync(Stream, CancellationToken)` | **removed** | `IDocumentSerializer.Deserialize(Stream, CancellationToken)`, same wrapping |
| `RtfSerializer.SerializeAsync`, `RtfSerializer.DeserializeAsync` | **removed** | `RtfSerializer.Serialize`, `RtfSerializer.Deserialize`, which the type already had |
| `DocxSerializer.SerializeAsync`, `DocxSerializer.DeserializeAsync` | **removed** | `DocxSerializer.Serialize`, `DocxSerializer.Deserialize` |
| `XamlSerializer.SerializeAsync`, `XamlSerializer.DeserializeAsync` | **removed** | `XamlSerializer.Serialize`, `XamlSerializer.Deserialize` |
| `PlainTextSerializer.SerializeAsync`, `PlainTextSerializer.DeserializeAsync` | **removed** | `PlainTextSerializer.Serialize`, `PlainTextSerializer.Deserialize` |
| `MarkdownSerializer.SerializeAsync`, `MarkdownSerializer.DeserializeAsync` | **removed** | `MarkdownSerializer.Serialize`, `MarkdownSerializer.Deserialize`; `Serialize` no longer throws, markdown writing ships in this release |
| `IDocumentSerializer.CanRead`, `IDocumentSerializer.CanWrite` default bodies | **removed** | declare both on the implementation; every shipped serializer does |
| `MarkdownSerializer.CodeHighlighter` setter | **removed** | the `MarkdownSerializer(MarkdownSerializerOptions?, CodeHighlighter?)` constructor; the property is get-only |

Two parameterless constructors gained optional parameters, which is source-compatible and binary-breaking: `XamlSerializer(DocumentSerializerOptions?)` and `MarkdownSerializer(MarkdownSerializerOptions?, CodeHighlighter?)`. Recompile against 13.0 rather than binding to the old signature.

`PlainTextSerializer` declares `CanRead` and `CanWrite` of its own. The HTML package's `HtmlSerializer`, `HtmlSerializerOptions`, `IHtmlTagHandler` and `HtmlReaderContext` become public, having been unreachable internals in 12.2.3, so nothing there is a break. The PDF package is new in this release; see [PDF export](/controls/input/text-input/richtexteditor/pdf-export). There is no format registry either: every serializer package depends on the core one, so a registry there could not reference them back. Discovery is the application's job, and [Extension patterns](/controls/input/text-input/richtexteditor/extension-patterns) covers a hand-written picker.

### Serializer metadata records

Each of these appeared in the public surface only as the element type of a property on an internal class, so no caller outside the assembly could obtain one.

| Member | Status | Replacement |
|---|---|---|
| `RtfBorderMetadata` | demoted to `internal` | none |
| `RtfTabStopMetadata` | demoted to `internal` | none |
| `DocxTabStop` | demoted to `internal` | none |
| `DocxLevelOverride` | demoted to `internal` | none |
| `DocxNumberingLevelDefinition` | demoted to `internal` | none |

### Document save and load

| Member | Status | Replacement |
|---|---|---|
| `TextRange.Save(Stream, IDocumentSerializer)` | **removed** | `serializer.Serialize(range.CreateSnapshot()!, stream, cancellationToken)` |
| `TextRange.Load(Stream, IDocumentSerializer)` | **removed** | `range.InsertSnapshot(serializer.Deserialize(stream, cancellationToken))` |
| `FlowDocument.Save(Stream, IDocumentSerializer)` | **signature change** | `FlowDocument.Save(stream, serializer, cancellationToken)`, the token defaulted |
| `FlowDocument.Load(Stream, IDocumentSerializer)` | **signature change** | `FlowDocument.Load(stream, serializer, cancellationToken)`, the token defaulted |
| `FlowDocument.EnsureTextDocument()` | **removed** | `FlowDocument.TextDocument`, which creates the backing store on first read |
| `FlowDocument.InitializeTextDocument()` | **removed** | `FlowDocument.TextDocument` |
| `FlowDocument.IsDocumentInitialized` | **removed** | no replacement: the distinction is an internal lazy-init detail |
| `FlowDocument.TextDocument` (`TextDocument?`, non-creating) | **retyped** | `TextDocument` (non-nullable, creating) |
| `FlowDocumentBuilder.GetDocument()` | **removed** | `FlowDocumentBuilder.Build()` |

`FlowDocument.SaveAsync` and `FlowDocument.LoadAsync` keep their signatures. The trailing `CancellationToken cancellationToken = default` on `Save` and `Load` is source-compatible and binary-breaking, and both run the whole cost on the calling thread now that the serializer interface hides no task. `SaveAsync` is what it always was in practice: the snapshot is captured on the calling thread and the write is wrapped in `Task.Run`.

### FlowDocument formatting helpers

Six element-formatting helpers left the public surface. Each took a formatting struct and pushed its fields onto one element, which is the model layer's own job when a snapshot is materialized, and never something a caller had to reach for: assigning the element's properties inside a change scope does the same thing and records one undo unit.

| Member | Status | Replacement |
|---|---|---|
| `FlowDocument.ApplyBlockFormatting(Block, BlockFormatting)` | **removed** | set the properties on the `Block` inside a `TextDocument.BeginChange()` scope, or `range.ApplyPropertyValue(property, value)` |
| `FlowDocument.ApplyInlineFormatting(RichInline, InlineFormatting)` | **removed** | `range.ApplyPropertyValue(property, value)` |
| `FlowDocument.ApplyTextElementFormatting(RichTextElement, TextElementFormatting)` | **removed** | set the properties on the element inside a change scope |
| `FlowDocument.ApplyListItemFormatting(ListItem, BlockFormatting)` | **removed** | set the properties on the `ListItem` inside a change scope |
| `FlowDocument.ApplyTableCellFormatting(TableCell, BlockFormatting)` | **removed** | set the properties on the `TableCell` inside a change scope |
| `FlowDocument.ApplyTableRowFormatting(TableRow, BlockFormatting)` | **removed** | set the properties on the `TableRow` inside a change scope |

### Page geometry

The five page-geometry properties were plain auto-properties on `TextDocument`, so a page size set through the model survived neither undo nor an attached view. They live on the `PageSetup` record now, and assigning it records one undo unit and marks the change scope.

| Member | Status | Replacement |
|---|---|---|
| `TextDocument.PagePadding` | **removed** | `TextDocument.PageSetup`, whose `PagePadding` carries the value |
| `TextDocument.PageWidth` | **removed** | `PageSetup.PageWidth` |
| `TextDocument.IsPageWidthFixed` | **removed** | `PageSetup.IsPageWidthFixed` |
| `TextDocument.PageHeight` | **removed** | `PageSetup.PageHeight` |
| `TextDocument.IsPageHeightFixed` | **removed** | `PageSetup.IsPageHeightFixed` |

### TextRange and TextPointer

| Member | Status | Replacement |
|---|---|---|
| `TextRange.SetImageSize(RichImage, double, double)` | **removed** | `image.Width` and `image.Height` inside one `TextDocument.BeginChange()` scope |
| `TextRange.SetImageAltText(RichImage, string?)` | **removed** | `image.AltText` inside the same scope |
| `TextRange.DeleteCurrentBlock(TextPointer?)` | **signature change** to `TextRange.DeleteCurrentBlock()` | `new TextRange(position, position).DeleteCurrentBlock()` to delete the block at another position |
| `TextRange.Delete()` returning `TextPointer?` | **return type change** | returns `TextPointer`; a `TextSelection` subclass overriding `Delete` follows |
| `TextPointer.InsertText(string)`, `TextPointer.InsertText(ReadOnlyMemory<char>)` returning `TextPointer?` | **return type change** | both return `TextPointer` |
| `protected TextRange(TextDocument?)` | **signature change** | `TextRange(TextDocument)`, non-nullable |

`TextPointer.Clone()` is public in 13.0. It was internal, although the documentation of `TextDocument.ContentStart`/`ContentEnd` and `RichTextElement.ContentStart`/`ContentEnd` has always said a clone is mandatory before the pointer is stored.

### Element tree

| Member | Status | Replacement |
|---|---|---|
| `Table.CellSpacing`, `Table.CellSpacingProperty` | **removed** | `TableCell.Padding` for interior space, `Table.InsideBorderThickness` for gridlines; nothing read the old property, so rendering is unchanged |
| `TableColumn` (unsealed) | **sealed** | none: derive nothing from it |
| `TableColumn.Width` (plain CLR property) | backed by `TableColumn.WidthProperty` | same accessor; a width set after first layout now re-measures the table |
| `TableRowGroup.Table` setter | **removed** | `table.RowGroups.Add(group)`, which is what actually reparents |
| `BlockCollection(AvaloniaObject)` | ctor demoted to `internal` | `paragraph.Blocks`, `section.Blocks`, `cell.Blocks`, `document.Blocks` |
| `RichInlineCollection(RichTextElement)` | ctor demoted to `internal` | `paragraph.Inlines`, `span.Inlines` |
| `TableColumnCollection(Table)` | ctor demoted to `internal`, type sealed | `table.Columns` |

### `RichTextElementCollection<T>`

| Member | Status | Replacement |
|---|---|---|
| `RichTextElementCollection<T>(AvaloniaObject)` | ctor demoted to `internal` | the owning element's typed collection (`Table.RowGroups`, `TableRow.Cells`, `List.ListItems`) |
| `RichTextElementCollection<T>.FirstOrDefault()` | **renamed** | `RichTextElementCollection<T>.FirstOrNull()` |
| `RichTextElementCollection<T>.LastOrDefault()` | **renamed** | `RichTextElementCollection<T>.LastOrNull()` |

The two shadowed the LINQ extensions of the same name and returned something different from them, which is why they were renamed rather than left in place: the old spelling still compiles, now resolving to LINQ. The predicate-taking LINQ overloads are unaffected.

### Formatting structs hand out immutable arrays

| Member | Status | Replacement |
|---|---|---|
| `BlockFormatting.TabStopPositions` (`double[]?`) | **retyped** | `ImmutableArray<double>`; test `IsDefaultOrEmpty` where you tested `!= null` |
| `TableFormatting.Columns` (`TableColumnWidth[]?`) | **retyped** | `ImmutableArray<TableColumnWidth>` |
| `TextElementFormatting.FontFeatures` (`FontFeature[]?`) | **retyped** | `ImmutableArray<FontFeature>` |

### Custom node kinds

| Member | Status | Replacement |
|---|---|---|
| `TextDocumentNodeKind.Register(string, NodeKindFlags, Type)` | **removed** | `TextDocumentNodeKind.Register<TElement>(string, NodeKindFlags)` where `TElement : RichTextElement` |
| `TextDocumentNodeKind.Register(string, NodeKindFlags, Type, INodeKindHandler)` | **removed** | `TextDocumentNodeKind.Register<TElement>(string, NodeKindFlags, INodeKindHandler)` |

### Snapshots and authoring

| Member | Status | Replacement |
|---|---|---|
| `DocumentSnapshot.CaptureTextElementFormatting(RichTextElement)` | demoted to `internal` | `TextDocument.CreateSnapshot()` / `FlowDocument.CreateSnapshot()` |
| `DocumentSnapshot.CaptureInlineFormatting(RichTextElement)` | demoted to `internal` | same |
| `DocumentSnapshot.CaptureBlockFormatting(Block)` | demoted to `internal` | same |
| `DocumentSnapshot.CaptureTableCellFormatting(TableCell)` | demoted to `internal` | same |
| `DocumentSnapshot.CaptureTableRowFormatting(TableRow)` | demoted to `internal` | same |
| `DocumentSnapshotBuilder.StartSection(BlockFormatting, TextElementFormatting)` | **signature change** | `DocumentSnapshotBuilder.StartSection(formatting, textElementFormatting, pageSetup)`, all three defaulted, so an existing two-argument call still compiles |
| `SnapshotNode.FormatMetadata` | demoted to `internal` | `SnapshotNode.GetFormatMetadata<T>()` / `SnapshotNode.SetFormatMetadata<T>(T?)` |
| `InlineDraft.FormatMetadata` | demoted to `internal` | `InlineDraft.GetFormatMetadata<T>()` / `InlineDraft.SetFormatMetadata<T>(T?)` |
| `SnapshotNodeChildren(SnapshotNode[]?, int)` | ctor demoted to `internal` | `DocumentSnapshotBuilder`, which owns the offset bookkeeping |

### Clipboard and keyboard components

`async void` is gone from every clipboard entry point, so a caller can await the write and see its exception.

| Member | Status | Replacement |
|---|---|---|
| `FlowDocumentScrollViewer.Copy()` (`async void`) | **renamed** | `FlowDocumentScrollViewer.CopyAsync(CancellationToken)` |
| `TextViewKeyboard.Copy()` (`async void`) | **renamed** | `TextViewKeyboard.CopyAsync(CancellationToken)` |
| `TextEditorKeyboard.Copy()` (`async void`) | **renamed** | `TextEditorKeyboard.CopyAsync(CancellationToken)` |
| `TextEditorKeyboard.Cut()` (`async void`) | **renamed** | `TextEditorKeyboard.CutAsync()` |
| `Markdown.Copy()` (`async void`) | **renamed** | `Markdown.CopyAsync()`, returning `Task<bool>`; the result is `false` when there was nothing to copy, a `CopyingToClipboard` handler took over, or the control has no top level |
| `ClipboardOperations.CopyAsync(TextSelection, Visual, IReadOnlyList<IDocumentSerializer>?)` | trailing `CancellationToken` added | source-compatible, binary-breaking |
| `ClipboardOperations.CutAsync(TextSelection, Visual, IReadOnlyList<IDocumentSerializer>?)` | trailing `CancellationToken` added | source-compatible, binary-breaking |
| `TextViewKeyboard()` | ctor demoted to `internal` | none: the view registers `TextViewKeyboard` itself. Intercept keys with an `ITextViewComponent` |
| `TextEditorTyping` | demoted to `internal` | none: it declared only protected overrides, so `GetComponent<T>()` handed back an object with nothing to call |
| `TextEditorSelectionFlyout` | demoted to `internal` | none, same reason |

### View, nodes and highlighting

| Member | Status | Replacement |
|---|---|---|
| `TextViewBase` (concrete) | **abstract** | `InteractiveTextView` where a concrete view is needed; extend a view with an `ITextViewComponent` or an `IHighlightLayer` |
| `TextViewBase.Document`, `TextViewBase.DocumentProperty` | **retyped** | `FlowDocument?` and `StyledProperty<FlowDocument?>`; they always could be null and a dereference now warns |
| `FlowDocumentScrollViewer.Document`, `FlowDocumentScrollViewer.DocumentProperty` | **retyped** | same |
| `ITextLine.ContainingElement` (`object?`) | **retyped** | `DocumentNode?`; drop the cast at the call site |
| `TextLineInfo.ContainingElement` (`object?`) | **retyped** | `DocumentNode?` |
| `TextLineInfo(StaticTextPointer, StaticTextPointer, Rect, double, bool, object?)` | **signature change** | the last parameter is `DocumentNode?` |
| `DocumentNode._contentRect` (protected field) | **removed** | `DocumentNode.ContentRect`, a protected property with a private setter |
| `DocumentNode.CollapseMargin(Thickness)` (protected virtual) | demoted to `private protected` | none: margin collapsing is a layout detail of the node tree, not an extension point |
| `StackLayoutNode(RichTextElement)` | ctor demoted to `protected internal` | none: only a derived type could ever call it |
| `HighlightStyle.Custom` | **removed** | none: the member named a callback that never existed and rendered nothing. Override `HighlightLayerBase.RenderRegion` to draw what the built-in styles cannot express |
| `HighlightLayerCollection.GetLayers()` | **removed** | enumerate the collection, which is an `IReadOnlyList<IHighlightLayer>` in Z order |
| `HighlightLayerCollection` (unsealed) | **sealed** | none |

`FlowDocumentScrollViewer` now implements `ContentChanged`, `DocumentChanged`, `TextDocument` and `UIScope` implicitly, so the casts to `IInteractiveTextHost` those reads needed can go. `IInteractiveTextHost` gains a required `ActiveDocumentChanged` event: an implementer must declare it and raise it when the selection enters or leaves a page band or a footnote.

### Block adorners

`Visibility` and `IsEnabled` collided with Avalonia's own vocabulary for other ideas.

| Member | Status | Replacement |
|---|---|---|
| `BlockAdornerVisibility` | **renamed** | `BlockAdornerScope` |
| `BlockAdornerVisibility.Always` | **renamed** | `BlockAdornerScope.AllBlocks` |
| `BlockAdornerVisibility.ContextOnly` | **renamed** | `BlockAdornerScope.ContextBlockOnly` |
| `BlockAdorner.Visibility`, `BlockAdorner.VisibilityProperty` | **renamed** | `BlockAdorner.AppliesTo`, `BlockAdorner.AppliesToProperty` |
| `BlockAdorner.IsEnabled`, `BlockAdorner.IsEnabledProperty` | **renamed** | `BlockAdorner.IsActive`, `BlockAdorner.IsActiveProperty` |
| `BlockAdorner.ZIndex` (`public virtual`, get-only) | **no longer virtual** | a settable styled property backed by `BlockAdorner.ZIndexProperty`: replace `public override int ZIndex => n;` with `ZIndex = n;` in the constructor |
| `BlockAdorner.TargetAreas` (`ToolbarTargetAreas`) | **retyped** | `DocumentTargetAreas`, see below |

### `ToolbarTargetAreas` is `DocumentTargetAreas`

A toolbar taxonomy living in the adorner namespace, whose `All` was not all. The flags keep their names and values.

| Member | Status | Replacement |
|---|---|---|
| `ToolbarTargetAreas` (namespace `...Primitives.Adorners`) | **renamed and moved** | `DocumentTargetAreas` in `Avalonia.Controls.Documents.Primitives` |
| `ToolbarTargetAreas.All` | **renamed** | `DocumentTargetAreas.CaretAreas`, same value; it never included `TableCells` |
| `EditorTool.TargetAreas`, `EditorTool.TargetAreasProperty` | **retyped** | same names typed `DocumentTargetAreas` |
| `EditorMenuItem.TargetAreas`, `EditorMenuItem.TargetAreasProperty` | **retyped** | same names typed `DocumentTargetAreas` |

### Editor actions

The concrete action classes carry nothing the interfaces do not, so they are internal. `EditorActions` is how a built-in action is referenced, and each singleton is now typed as the interface that actually describes it, so checked state and property values read without a downcast.

| Member | Status | Replacement |
|---|---|---|
| `IEditorAction.GetState(ITextEditorHost)` | **removed** | `IToggleAction.IsChecked(host)` for a toggle, `IPropertyAction.GetValueAsObject(host)` or `IPropertyAction<T>.GetValue(host)` for a property action; a plain command returned `null` and has no replacement |
| `EditorAction.GetState(ITextEditorHost)` | **removed** | same |
| `FormattingToggleAction<T>.GetState(ITextEditorHost)` | **removed** | `IsChecked(host)` |
| `PropertyAction<T>.GetState(ITextEditorHost)` | **removed** | `GetValue(host)` |
| `BlockPropertyAction<T>.GetState(ITextEditorHost)` | **removed** | `GetValue(host)` |
| `EditorActions.TextAlignmentAction` | **renamed** | `EditorActions.TextAlignment` |
| `EditorActions.All` (`IEnumerable<IEditorAction>`) | **retyped** | `IReadOnlyList<IEditorAction>` in a stable order; an assignment to an `IEnumerable<IEditorAction>` still compiles |
| `InsertTableRowAction.Before`, `InsertTableRowAction.After` | **removed** | `EditorActions.InsertRowBefore`, `EditorActions.InsertRowAfter`, the same instances |
| `InsertTableColumnAction.Before`, `InsertTableColumnAction.After` | **removed** | `EditorActions.InsertColumnBefore`, `EditorActions.InsertColumnAfter` |
| `InsertTableAction.ExecuteWithSize(ITextEditorHost, int, int)` | **renamed** | `InsertTableAction.ExecuteWith(host, rowCount, columnCount)`, matching `InsertImageAction.ExecuteWith` |
| `IPropertyAction<T>` (no `ClearValue`) | `ClearValue` redeclared on it | a hand-written `IPropertyAction<T>` must implement `ClearValue`; `((IPropertyAction)EditorActions.FontSize).ClearValue(host)` becomes `EditorActions.FontSize.ClearValue(host)` |

`EditorActionIds` is new and names the `Id` of every built-in action as a `public const string`, so a `GetById` lookup is written against a constant. The identifiers the old `EditorActions` and `IEditorAction` documentation gave as examples (`"Format.RichBold"`, `"Paragraph.AlignLeft"`, `"Paragraph.BulletList"`) named nothing that exists; the real ids are `"Format.Bold"`, `"Block.TextAlignment.Left"` and `"List.ToggleBulletList"`.

#### `IBlockPropertyAction<T>` derives from `IPropertyAction<T>`

Its three value members are inherited now rather than redeclared, with identical signatures. A class implementing `IBlockPropertyAction<T>` by hand satisfies `IPropertyAction<T>` for free; an explicit interface implementation naming `IBlockPropertyAction<T>` has to name `IPropertyAction<T>` instead.

| Member | Status | Replacement |
|---|---|---|
| `IBlockPropertyAction<T>.GetValue(ITextEditorHost)` | **moved to the base interface** | `IPropertyAction<T>.GetValue` |
| `IBlockPropertyAction<T>.SetValue(ITextEditorHost, T)` | **moved to the base interface** | `IPropertyAction<T>.SetValue` |
| `IBlockPropertyAction<T>.GetAvailableValues()` | **moved to the base interface** | `IPropertyAction<T>.GetAvailableValues` |

`IBlockPropertyAction.HasConsistentValue(ITextEditorHost)` stays on the non-generic interface, because mixed state is the one idea block actions add.

#### The singletons are retyped

Every `EditorActions` singleton is declared as the narrowest interface its instance implements instead of `IEditorAction`. An assignment to an `IEditorAction`-typed local still compiles; a member lookup that used to need a cast no longer does.

| Member | Status | Replacement |
|---|---|---|
| `EditorActions.Bold`, `EditorActions.Italic`, `EditorActions.Underline`, `EditorActions.Strikethrough`, `EditorActions.Superscript`, `EditorActions.Subscript`, `EditorActions.BlockBorder` | **retyped** | `IToggleAction` |
| `EditorActions.AlignLeft`, `EditorActions.AlignCenter`, `EditorActions.AlignRight`, `EditorActions.AlignJustify`, `EditorActions.ToggleBulletList`, `EditorActions.ToggleNumberedList` | **retyped** | `IToggleAction` |
| `EditorActions.FontFamily` | **retyped** | `IPropertyAction<FontFamily>` |
| `EditorActions.FontSize` | **retyped** | `IPropertyAction<double>` |
| `EditorActions.ForegroundColor`, `EditorActions.BackgroundColor` | **retyped** | `IPropertyAction<IBrush?>` |
| `EditorActions.LineHeight` | **retyped** | `IBlockPropertyAction<double>` |
| `EditorActions.Margin`, `EditorActions.Padding`, `EditorActions.BorderThickness` | **retyped** | `IBlockPropertyAction<Thickness>` |
| `EditorActions.BlockBackground`, `EditorActions.BorderBrush` | **retyped** | `IBlockPropertyAction<IBrush?>` |
| `EditorActions.BulletMarkerStyle`, `EditorActions.NumberedMarkerStyle` | **retyped** | `IBlockPropertyAction<TextMarkerStyle>` |
| `EditorActions.TextAlignment` | **retyped** | `IBlockPropertyAction<TextAlignment>` |
| `EditorActions.InsertImage` | **retyped** | `InsertImageAction`, so `ExecuteWith` is reachable without a cast |
| `EditorActions.InsertTable` | **retyped** | `InsertTableAction`, so `ExecuteWith` is reachable without a cast |

#### The concrete action classes are internal

Each was reachable exactly once, as an `EditorActions` singleton; none declared a member the interfaces do not; and a second instance carried a duplicate `Id` that `GetById` will not return. `InsertImageAction` and `InsertTableAction` stay public, because each carries a parameterised entry point beyond the interfaces. Writing an action of your own is unaffected: `IEditorAction`, `IToggleAction`, `IPropertyAction`, `IPropertyAction<T>`, `IBlockPropertyAction`, `IBlockPropertyAction<T>`, `EditorAction`, `FormattingToggleAction<T>`, `PropertyAction<T>`, `BlockPropertyAction<T>` and `EditorActions` are all still public.

| Member | Status | Replacement |
|---|---|---|
| `BackgroundColorAction` | demoted to `internal` | `EditorActions.BackgroundColor` |
| `BlockBackgroundAction` | demoted to `internal` | `EditorActions.BlockBackground` |
| `BlockBorderToggleAction` | demoted to `internal` | `EditorActions.BlockBorder` |
| `BoldAction` | demoted to `internal` | `EditorActions.Bold` |
| `BorderBrushAction` | demoted to `internal` | `EditorActions.BorderBrush` |
| `BorderThicknessAction` | demoted to `internal` | `EditorActions.BorderThickness` |
| `BulletMarkerStyleAction` | demoted to `internal` | `EditorActions.BulletMarkerStyle` |
| `CopyAction` | demoted to `internal` | `EditorActions.Copy` |
| `CutAction` | demoted to `internal` | `EditorActions.Cut` |
| `DeleteImageAction` | demoted to `internal` | `EditorActions.DeleteImage` |
| `DeleteTableAction` | demoted to `internal` | `EditorActions.DeleteTable` |
| `DeleteTableColumnAction` | demoted to `internal` | `EditorActions.DeleteColumn` |
| `DeleteTableRowAction` | demoted to `internal` | `EditorActions.DeleteRow` |
| `FontFamilyAction` | demoted to `internal` | `EditorActions.FontFamily` |
| `FontSizeAction` | demoted to `internal` | `EditorActions.FontSize` |
| `ForegroundColorAction` | demoted to `internal` | `EditorActions.ForegroundColor` |
| `InsertTableColumnAction` | demoted to `internal` | `EditorActions.InsertColumnBefore`, `EditorActions.InsertColumnAfter` |
| `InsertTableRowAction` | demoted to `internal` | `EditorActions.InsertRowBefore`, `EditorActions.InsertRowAfter` |
| `ItalicAction` | demoted to `internal` | `EditorActions.Italic` |
| `LineHeightAction` | demoted to `internal` | `EditorActions.LineHeight` |
| `ListToggleAction` | demoted to `internal` | `EditorActions.ToggleBulletList`, `EditorActions.ToggleNumberedList` |
| `MarginAction` | demoted to `internal` | `EditorActions.Margin` |
| `MergeTableCellsAction` | demoted to `internal` | `EditorActions.MergeCells` |
| `NumberedMarkerStyleAction` | demoted to `internal` | `EditorActions.NumberedMarkerStyle` |
| `PaddingAction` | demoted to `internal` | `EditorActions.Padding` |
| `PasteAction` | demoted to `internal` | `EditorActions.Paste` |
| `PasteUnformattedAction` | demoted to `internal` | `EditorActions.PasteUnformatted` |
| `RedoAction` | demoted to `internal` | `EditorActions.Redo` |
| `ReplaceImageAction` | demoted to `internal` | `EditorActions.ReplaceImage` |
| `SelectAllAction` | demoted to `internal` | `EditorActions.SelectAll` |
| `SplitTableCellAction` | demoted to `internal` | `EditorActions.SplitCell` |
| `StrikethroughAction` | demoted to `internal` | `EditorActions.Strikethrough` |
| `SubscriptAction` | demoted to `internal` | `EditorActions.Subscript` |
| `SuperscriptAction` | demoted to `internal` | `EditorActions.Superscript` |
| `TextAlignmentAction` | demoted to `internal` | `EditorActions.TextAlignment` |
| `TextAlignmentToggleAction` | demoted to `internal` | `EditorActions.AlignLeft`, `EditorActions.AlignCenter`, `EditorActions.AlignRight`, `EditorActions.AlignJustify` |
| `UnderlineAction` | demoted to `internal` | `EditorActions.Underline` |
| `UndoAction` | demoted to `internal` | `EditorActions.Undo` |

`BlockBackgroundAction`, `BorderBrushAction`, `BorderThicknessAction`, `LineHeightAction`, `MarginAction`, `PaddingAction` and `TextAlignmentAction` were also unsealed. A class deriving from one of them derives from `BlockPropertyAction<T>` instead: none of the seven declared a virtual member of its own.

### Editor host, toolbar and tools

| Member | Status | Replacement |
|---|---|---|
| `ITextEditorHost.SelectionFlyout` | **removed** from the contract | `RichTextEditor.SelectionFlyout`; the mini-bar is chrome a control chooses to show, not an editing capability |
| `ITextEditorHost.ShowSelectionFlyout` | **removed** from the contract | `RichTextEditor.ShowSelectionFlyout` |
| `ITextEditorHost.Undo()`, `ITextEditorHost.Redo()` default implementations | **removed** | declare both: the defaults forwarded straight to the undo manager and skipped the caret restoration every caller depends on |
| `ITextEditorHost.IsReadOnlyChanged` default implementation | **removed** | declare `public event EventHandler? IsReadOnlyChanged;` and raise it from the `IsReadOnly` setter. The old default had empty accessors and discarded every subscription, so a toolbar over a custom host stayed permanently stale |
| `EditorToolbar.Editor`, `EditorToolbar.EditorProperty` (`RichTextEditor?`) | **retyped** | `ITextEditorHost?`; an assignment still compiles, a read typed as `RichTextEditor` needs a cast |
| `EditorToolbar.ActiveTargetAreas`, `EditorToolbar.ActiveTargetAreasProperty` | **removed** | the value is derived from the selection; set `EditorTool.TargetAreas` on the tool instead |
| `EditorTool.ActiveTargetAreas`, `EditorTool.ActiveTargetAreasProperty` | **removed** | same |
| `ColorTool.SelectedColor`, `ColorTool.SelectedColorProperty` (`Color`) | **retyped** | `Color?`; `null` is "no colour" |
| `ColorTool.IsUnset` (protected) | **removed** | `SelectedColor is null` |
| `RichTextEditor.CoerceDocument(FlowDocument)` | **parameter now nullable** | `RichTextEditor.CoerceDocument(FlowDocument?)`, which is what the body and its documentation always said; an existing override keeps compiling |

`EditorTool.EnsureEditorFocus()` went the other way and is `protected` rather than internal: a consumer-authored tool can now return focus to the text view the way every built-in tool does. Every templated toolbar control declares its parts with `[TemplatePart]` and publishes the names as `public const string Part*` members.

#### Template-binding state is read-only

These carried scratch state a template binds to, computed from the selection and overwritten on the next selection change. Each keeps its name and its getter; the setter is gone, and the `StyledProperty` registration is replaced by a read-only `DirectProperty`. A XAML setter on one of them no longer compiles, and had no lasting effect before.

| Member | Status | Replacement |
|---|---|---|
| `AlignmentFlyoutTool.IsAlignLeft`, `AlignmentFlyoutTool.IsAlignCenter`, `AlignmentFlyoutTool.IsAlignRight`, `AlignmentFlyoutTool.IsAlignJustify`, `AlignmentFlyoutTool.IsAlignmentKnown`, `AlignmentFlyoutTool.IconOpacity` | setter **removed** | read the value; it is derived from the selection |
| `AlignmentFlyoutTool.IsAlignLeftProperty`, `AlignmentFlyoutTool.IsAlignCenterProperty`, `AlignmentFlyoutTool.IsAlignRightProperty`, `AlignmentFlyoutTool.IsAlignJustifyProperty`, `AlignmentFlyoutTool.IsAlignmentKnownProperty`, `AlignmentFlyoutTool.IconOpacityProperty` | **retyped** to a `DirectProperty` | bind one way; there is nothing to set |
| `HyperlinkFlyoutTool.IsEditing`, `HyperlinkFlyoutTool.IconOpacity` | setter **removed** | read the value |
| `HyperlinkFlyoutTool.IsEditingProperty`, `HyperlinkFlyoutTool.IconOpacityProperty` | **retyped** to a `DirectProperty` | bind one way |
| `ImageFlyoutTool.IconOpacity` | setter **removed** | read the value |
| `ImageFlyoutTool.IconOpacityProperty` | **retyped** to a `DirectProperty` | bind one way |
| `ImageLinkFlyoutTool.HasLink`, `ImageLinkFlyoutTool.IconOpacity` | setter **removed** | read the value |
| `ImageLinkFlyoutTool.HasLinkProperty`, `ImageLinkFlyoutTool.IconOpacityProperty` | **retyped** to a `DirectProperty` | bind one way |
| `TablePickerTool.SelectedRows`, `TablePickerTool.SelectedColumns`, `TablePickerTool.SizeLabel`, `TablePickerTool.IconOpacity` | setter **removed** | read the value |
| `TablePickerTool.SelectedRowsProperty`, `TablePickerTool.SelectedColumnsProperty`, `TablePickerTool.SizeLabelProperty`, `TablePickerTool.IconOpacityProperty` | **retyped** to a `DirectProperty` | bind one way |
| `BorderFlyoutTool.SelectedSides` | setter **removed** | read the value |
| `BorderFlyoutTool.SelectedSidesProperty` | **retyped** to a `DirectProperty` | bind one way |
| `ComboBoxTool.SelectedItem` | setter **removed** | read the value |
| `ComboBoxTool.SelectedItemProperty` | **retyped** to a `DirectProperty` | bind one way |

### Markdown

Two markdown members are listed with their neighbours rather than here: the `Markdown` control's clipboard rename is in the clipboard table above, and the serializer's highlighter property is in the serializer contract table. What is left is the styling, which no compiler will mention.

| What | Status | Replacement |
|---|---|---|
| `<Style Selector="Markdown MarkdownTaskListItem">` | matches nothing | `ListItem.taskListItem` (see the silent changes above) |
| markdown alert header theme rules and resources | **removed** | none: nothing produced the elements they selected |

`CodeHighlighter` can be derived from now: its constructor is `protected`, `Highlight` is `protected abstract` and `BuildHighlightDocument` is `protected internal static`, where all three used to be internal and only the two bundled adapters could subclass it. `Markdown.CodeHighlighter` and `Markdown.ImageLoader` are new inheriting attached properties, so attaching a highlighter no longer means writing a style setter against an element type the control builds internally.

### Names that changed inside this release cycle

These were introduced after 12.2.3 and renamed or closed before 13.0 shipped, so they are on no released assembly. They matter only if you built against a 13.0 prerelease or followed documentation written during that cycle.

| Earlier name | Now |
|---|---|
| `TextViewBase.ShowPageBands`, `ShowPageBandsProperty` | `ShowPageBandsInContinuousLayout`, `ShowPageBandsInContinuousLayoutProperty`, which is what the property has always meant: it has no effect in page layout. `RichTextEditor` and `FlowDocumentScrollViewer` take it through `AddOwner` |
| `TextViewBase.ShowsPageBreakMarkers` (internal virtual) | `public bool ShowPageBreakMarkers`, backed by `ShowPageBreakMarkersProperty`; suppressing the dashed rule no longer means clearing its brush |
| `NestedDocumentNode.Document`, `PageContext`, `NoteNumber`, `StripWidth` | internal: no public API hands out a `NestedDocumentNode` |
| `FootnoteReferenceRun`, `PageNumberFieldRun` | internal: no public API produced or consumed one |
| `DocumentSnapshotBuilder.AddPageBand` returning `Guid` | returns the builder, with the band's identity in an `out Guid` parameter: `builder.AddPageBand(content, role, rule, out var id, name)` |
| `PageBandReferences` indexer and `With` taking a `bool` | they take a `PageBandRule`: pass `PageBandRule.Default` where `false` stood and `PageBandRule.FirstPage` where `true` did |

## Migration patterns

### Serializing off the calling thread

The interface is synchronous. Where a call used to be awaited, it now runs where you put it, and `Task.Run` is how it leaves the calling thread.

Before, on 12.2.3:

```csharp
var snapshot = document.CreateSnapshot();
await new RtfSerializer().SerializeAsync(snapshot, stream, cancellationToken);

var loaded = await new RtfSerializer().DeserializeAsync(source, cancellationToken);
```

After, on 13.0:

```csharp
var serializer = new RtfSerializer();
var snapshot = document.CreateSnapshot();          // on the UI thread, cheap
await Task.Run(() => serializer.Serialize(snapshot, stream, cancellationToken), cancellationToken);

var loaded = await Task.Run(() => serializer.Deserialize(source, cancellationToken), cancellationToken);
```

A custom `IDocumentSerializer` on 13.0 drops both async members, declares the synchronous pair, and declares `CanRead` and `CanWrite` rather than inheriting a default body. `ReadDocument`, `WriteDocument` and `LooksLikeMyFormat` below stand for whatever your own format does:

```csharp
public sealed class MyFormatSerializer : IDocumentSerializer
{
    public string FormatName => "MyFormat";
    public string FileExtension => ".myf";
    public string MimeType => "application/x-myformat";

    public bool CanRead => true;
    public bool CanWrite => true;

    public DocumentSnapshot Deserialize(Stream stream, CancellationToken cancellationToken = default) => ReadDocument(stream, cancellationToken);

    public void Serialize(DocumentSnapshot snapshot, Stream stream, CancellationToken cancellationToken = default) => WriteDocument(snapshot, stream, cancellationToken);

    public bool CanDeserialize(Stream stream) => LooksLikeMyFormat(stream);
}
```

A highlighter passed to the markdown serializer moves from an initializer to the constructor, where both properties are now get-only.

Before, on 12.2.3:

```csharp
var markdown = new MarkdownSerializer { Options = options, CodeHighlighter = highlighter };
```

After, on 13.0:

```csharp
var markdown = new MarkdownSerializer(options, highlighter);
```

### Range save and load

`TextRange.Save` and `Load` did nothing beyond a decomposition that was already public, and neither took a cancellation token.

Before, on 12.2.3:

```csharp
range.Save(stream, serializer);
range.Load(stream, serializer);
```

After, on 13.0:

```csharp
serializer.Serialize(range.CreateSnapshot()!, stream, cancellationToken);
range.InsertSnapshot(serializer.Deserialize(stream, cancellationToken));
```

Written out, the snapshot can also be reused across formats instead of being rebuilt per stream.

### Element mutation moves off `TextRange`, page geometry onto `PageSetup`

`SetImageSize` and `SetImageAltText` never read the range's position: they were element mutation parked on the positional type. Write the element's properties inside one change scope, which collapses into the same single undo entry. The five page-geometry properties were plain auto-properties, so a page size set through the model survived neither undo nor an attached view; `PageSetup` records one undo unit and marks the change scope.

Before, on 12.2.3:

```csharp
range.SetImageSize(image, 320, 240);
range.SetImageAltText(image, "Quarterly revenue");

var textDocument = document.EnsureTextDocument();
textDocument.PageWidth = 816;
textDocument.IsPageWidthFixed = true;
textDocument.PagePadding = new Thickness(96);
```

After, on 13.0:

```csharp
using (image.TextDocument!.BeginChange())
{
    image.Width = 320;
    image.Height = 240;
    image.AltText = "Quarterly revenue";
}

var textDocument = document.TextDocument;
textDocument.PageSetup = textDocument.PageSetup with
{
    PageWidth = 816,
    IsPageWidthFixed = true,
    PagePadding = new Thickness(96),
};
```

The same change scope replaces the `FlowDocument.Apply*Formatting` helpers, which pushed a formatting struct onto one element:

Before, on 12.2.3:

```csharp
document.ApplyBlockFormatting(paragraph, new BlockFormatting { TextAlignment = TextAlignment.Center });
```

After, on 13.0:

```csharp
using (document.TextDocument.BeginChange())
{
    paragraph.TextAlignment = TextAlignment.Center;
}
```

### Substituting an undo manager

There is one implementation and no interface to substitute. A manager that records nothing is `null`, or `UndoManager` with `IsEnabled` off, which keeps the instance and its subscribers.

Before, on 12.2.3:

```csharp
var textDocument = document.EnsureTextDocument();
textDocument.UndoManager = NullUndoManager.Instance;

IUndoManager? manager = editor.UndoManager;
IReadOnlyList<IUndoUnit> units = ((IUndoHistory)manager!).UndoUnits;
```

After, on 13.0:

```csharp
var textDocument = document.TextDocument;
textDocument.UndoManager = null;                    // records nothing, no manager at all

textDocument.UndoManager = new UndoManager { IsEnabled = false };   // records nothing, manager kept

UndoManager? manager = editor.UndoManager;
```

The unit lists have no public replacement. `UndoManager.CanUndo`, `CanRedo` and `StateChanged` are what a UI needs, and they are unchanged.

### Referencing a built-in action

A built-in action is the `EditorActions` singleton. Constructing one produced a second instance with a duplicate `Id` that `GetById` would never return, and a type test against the class stopped identifying the action the toolbar actually holds.

Before, on 12.2.3:

```csharp
IEditorAction bold = new BoldAction();
if (bold.GetState(host) is bool isChecked && isChecked)
    MarkToolChecked();

IEditorAction alignLeft = new TextAlignmentToggleAction(TextAlignment.Left, "Left", "Align Left");
IEditorAction insertRow = InsertTableRowAction.After;

if (someAction is BoldAction)
    HighlightBoldTool();
```

After, on 13.0:

```csharp
IToggleAction bold = EditorActions.Bold;
if (bold.IsChecked(host))
    MarkToolChecked();

IToggleAction alignLeft = EditorActions.AlignLeft;
IEditorAction insertRow = EditorActions.InsertRowAfter;

if (ReferenceEquals(someAction, EditorActions.Bold))
    HighlightBoldTool();
```

## Why the serializers are synchronous

No format in this library performs asynchronous I/O. Every one of them tokenizes, builds a tree or lays out text against an in-memory buffer, and assembles its output in memory rather than streaming it. The async pair was therefore either a completed task around synchronous work, which froze the UI for the whole of a large DOCX or PDF export while its signature said it did not, or a `Task.Run` that occupied a pool thread for the duration of processor-bound work while its signature said it released one. Neither is what `await` is for.

Making the contract synchronous puts the decision where the information is. The caller knows whether it is on the UI thread, whether the document is a paragraph or a hundred pages, and whether it wants a thread at all; one `Task.Run` at the call site expresses that, and the shipped `FlowDocument.SaveAsync` and `LoadAsync` do exactly that for the common case. It is also what comparable libraries do: PDFsharp, QuestPDF, ClosedXML and the Open XML SDK all expose synchronous document APIs for the same reason.

## Why the undo interfaces went

`IUndoManager` was an abstraction with one implementation and no valid external implementer. Its write surface could not be satisfied from outside the assembly: `Record` type-tested its argument against an internal interface and threw for every `IUndoUnit` an outside caller could construct, and a manager that was not the in-tree one silently lost the change origin, so undo and redo replays were recorded as fresh edits. `IUndoHistory` was a second interface every in-tree manager already implemented, so reading the stacks meant a cast that could only ever succeed.

What is left is the part that was always real: one sealed `UndoManager`, `IUndoUnit` and `IUndoScope` for reading and grouping, and `IsEnabled` or `null` for turning recording off. Nothing an application could do through the interfaces is missing.

## See also

- [Pagination](/controls/input/text-input/richtexteditor/pagination) - where widow control changes existing page breaks
- [Footnotes](/controls/input/text-input/richtexteditor/footnotes) - the model markdown footnotes now load onto
- [Markdown serialization](/controls/input/text-input/richtexteditor/markdown-serialization) - the constructor-configured serializer, and markdown writing
- [PDF export](/controls/input/text-input/richtexteditor/pdf-export) - the package that is new in 13.0
- [Extension patterns](/controls/input/text-input/richtexteditor/extension-patterns) - custom serializers, components and highlight layers on the 13.0 contracts
