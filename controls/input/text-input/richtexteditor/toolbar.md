---
id: toolbar
title: Toolbar and Selection Flyouts
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

import DefaultToolbar from '/img/controls/richtexteditor/default-toolbar.png';
import CustomToolbarMinimal from '/img/controls/richtexteditor/custom-toolbar-minimal.png';
import WordCountTool from '/img/controls/richtexteditor/word-count-tool.png';
import AreaAware from '/img/controls/richtexteditor/area-aware.gif';
import DefaultMiniBar from '/img/controls/richtexteditor/default-mini-bar.png';
import CustomMiniBarMinimal from '/img/controls/richtexteditor/custom-mini-bar-minimal.png';
import DefaultContextMenu from '/img/controls/richtexteditor/default-context-menu.png';
import CustomContextMenu from '/img/controls/richtexteditor/custom-context-menu.png';
import CustomContextMenuSpecialized from '/img/controls/richtexteditor/custom-context-menu-specialized.png';
import CustomThemeToolbar from '/img/controls/richtexteditor/custom-theme-toolbar.png';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

By default, `RichTextEditor` includes a primary toolbar, a selection mini-bar, and a right-click context menu. Each of these toolbars is built from the same basic system and can be customized independently. You can swap layouts, add your own tools, fine-tune the overflow menu, re-theme buttons, and more. This guide takes you through your customization options, from most common to most advanced.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## Toolbar architecture

The toolbar system separates UI presentation from behavioral logic. `EditorToolbar` is a `TemplatedControl` with a strongly-typed `Tools` collection (`AvaloniaList<EditorTool>`) marked as the `[Content]` property — XAML children are added to `Tools` automatically and can only be `EditorTool` instances. Action-bearing tools derive from `ActionTool` (which adds `Action`/`Icon`/`ToolTipText`); separators and groups derive from `EditorTool` directly.

- **`EditorTool`**: the abstract base for any item hosted inside an `EditorToolbar` or `ToolbarGroup`. It carries target-area visibility, overflow metadata, and editor-host discovery.
- **`ActionTool`**: the abstract base for tools that bind to an `IEditorAction`. Adds `Action`, `Icon`, and `ToolTipText`, and synchronizes `IsEnabled` with `Action.CanExecute(host)`. Most concrete tools (button, toggle, combobox, flyout) derive from this.
- **`ToolbarGroup`**: itself an `EditorTool`. Hosts its own strongly-typed `Tools` collection of child tools. Groups share visibility status, i.e., they collapse together into the overflow menu if there is insufficient space. Groups can nest, and a nested group contributes its own children to the enclosing top-level group's overflow section rather than collapsing as a unit, because a group carries no overflow menu item to stand in for its children.
- **`EditorToolbar`**: a `TemplatedControl` that exposes a strongly-typed `Tools` collection (`AvaloniaList<EditorTool>`) marked as the `[Content]` property. Wires items to the editor, pushes the active target areas onto every tool, and runs the overflow-collapse layout pass. Items are inserted into a `Panel` named `PART_ItemsHost` in the control template, published as the constant `EditorToolbar.PartItemsHost`.

Both `EditorToolbar` and `ToolbarGroup` use a `Panel` template part named `PART_ItemsHost`. The default theme uses a `WrapPanel`; the toolbar embedded inside `RichTextEditor` uses a horizontal `StackPanel`. Re-template either control with any panel type to change the layout. Every templated toolbar control declares its parts with `[TemplatePart]` and publishes the names as `public const string Part*` members.

```
RichTextEditor
  └─ EditorToolbar            (TemplatedControl with [Content] Tools : AvaloniaList<EditorTool>)
       ├─ ToolbarGroup        (EditorTool with [Content] Tools, collective visibility)
       │    ├─ ButtonTool     (ActionTool)
       │    ├─ ToggleTool     (ActionTool)
       │    ├─ ToolbarGroup   (groups may nest)
       │    └─ ...
       ├─ SeparatorTool       (EditorTool, no action surface)
       └─ OverflowTool        (ActionTool, the "..." button that hosts collapsed tools)
```

### Namespaces

```csharp
using Avalonia.Controls.Documents.Primitives.Toolbar; // EditorToolbar, tools, groups
using Avalonia.Controls.Documents.Primitives.Actions; // EditorActions, IEditorAction
using Avalonia.Controls.Documents.Primitives; // DocumentTargetAreas, EditorSelectionFlyout, EditorContextMenu
```

All of these types are available in XAML under the default Avalonia namespace (`https://github.com/avaloniaui`).

## Migration from earlier `EditorToolbar` API

If you have existing code that uses the legacy `ItemsControl`-based surface, update it as follows:

| Before | After |
|---|---|
| `EditorToolbar.Items` / `ToolbarGroup.Items` | `Tools` (typed `AvaloniaList<EditorTool>`, `[Content]`) |
| `EditorToolbar.ItemsPanel` / `ItemsSource` | Removed. Re-template the toolbar with a `Panel` named `PART_ItemsHost`. |
| `EditorToolbar`/`ToolbarGroup` derived from `ItemsControl` | Both are now `TemplatedControl`. `ToolbarGroup` derives from `EditorTool`. |
| `EditorTool.Action` / `Icon` / `ToolTipText` | Moved to `ActionTool`. Custom action-bound tools should derive from `ActionTool` (passive tools stay on `EditorTool`). |

Implicit XAML child syntax (`<EditorToolbar><ToolbarGroup>…</ToolbarGroup></EditorToolbar>`) is unchanged — children are added to `Tools` via the `[Content]` attribute. Only explicit `<EditorToolbar.Items>` / `<EditorToolbar.ItemsPanel>` element-form usages need renaming. In code, replace `toolbar.Items.Add(...)` with `toolbar.Tools.Add(...)`.

### Changes in 13.0

| Before | After |
|---|---|
| `ToolbarTargetAreas` in `...Primitives.Adorners` | `DocumentTargetAreas` in `Avalonia.Controls.Documents.Primitives`. The flags keep their names and values; `All` becomes `CaretAreas`, which is what it always was. |
| `EditorToolbar.ActiveTargetAreas` / `EditorTool.ActiveTargetAreas` as settable properties | Read-only. The value is derived from the selection on every selection and document change and pushed onto the tools. Say which areas a tool serves with `EditorTool.TargetAreas`. |
| `EditorToolbar.Editor` typed `RichTextEditor?` | Typed `ITextEditorHost?`. An assignment still compiles; a read typed as `RichTextEditor` needs a cast. |
| Concrete action classes such as `BoldAction` | Internal. Reference a built-in action through its `EditorActions` singleton. `InsertImageAction` and `InsertTableAction` stay public, because each carries a parameterised entry point beyond the interfaces. |
| `IEditorAction.GetState(host)` | `IToggleAction.IsChecked(host)` for a toggle, `IPropertyAction<T>.GetValue(host)` for a property action. A plain command returned `null` and has no replacement. |
| `EditorActions.TextAlignmentAction` | `EditorActions.TextAlignment` |
| `InsertTableRowAction.Before` / `.After`, `InsertTableColumnAction.Before` / `.After` | `EditorActions.InsertRowBefore`, `InsertRowAfter`, `InsertColumnBefore`, `InsertColumnAfter`, the same instances. |
| `InsertTableAction.ExecuteWithSize(host, rows, columns)` | `InsertTableAction.ExecuteWith(host, rowCount, columnCount)`, matching `InsertImageAction.ExecuteWith`. |
| `ColorTool.SelectedColor` typed `Color`, with a protected `IsUnset` | Typed `Color?`, where `null` is "no color". `IsUnset` is gone; test `SelectedColor is null`. |
| Setters on template-binding state such as `AlignmentFlyoutTool.IsAlignLeft` or `TablePickerTool.SelectedRows` | Read-only `DirectProperty`s. Bind one way; there was never anything lasting to set. |
| `ToolbarGroup` throwing when nested | Nesting is supported. |

## Default toolbar

The built-in `EditorToolbar`, populated via `RichTextEditor.Toolbar` in the editor's default control theme, contains the following tools, appearing in this order and sorted into these groups.

<Image light={DefaultToolbar} position="center" cornerRadius="true" alt="The default RichTextEditor toolbar with history, clipboard, font, inline formatting, lists, table, block layout, and overflow groups."/>
<br />

1. **History** — Undo, Redo
2. **Clipboard** — Cut, Copy, Paste, Select All
3. **Font** — Font family, Font size, Foreground color, Background color
4. **Inline formatting** — Bold, Italic, Underline, Strikethrough, Superscript, Subscript, Link
5. **Lists** — Bullet list, Numbered list
6. **Insert** — Insert table, Insert image, Header and footer
7. **Block layout** — Text alignment, Block border
8. **Image** — Image size, shown only while the caret is on an image
9. **Overflow** — "..." button that presents collapsed tools when clicked

A second `EditorToolbar`, built from the same tool infrastructure, is hosted by the table overlay's actions flyout: the "..." button on a hovered cell and on row and column strip selections. It carries the table structure actions only, in row, column and cell-merge groups.

Most tools are context-sensitive, meaning they disappear automatically when out of context, e.g., list tools are hidden outside lists, table tools are hidden outside tables. This is done by declaring the [`DocumentTargetAreas`](#documenttargetareas) of each tool or group.

## Replacing the default toolbar

There are two ways to customize the default toolbar, depending on your UI requirements.

### Option 1: Set `RichTextEditor.Toolbar`

Assign a custom `EditorToolbar` to the `Toolbar` setter on `RichTextEditor`. Place this in the editor's control theme so it applies to every `RichTextEditor` in your application:

```xml
<Application.Resources>
  <ControlTheme x:Key="{x:Type RichTextEditor}"
                TargetType="RichTextEditor"
                BasedOn="{StaticResource {x:Type RichTextEditor}}">
    <Setter Property="Toolbar">
      <Template>
        <EditorToolbar>
          <ToolbarGroup>
            <ButtonTool Action="{x:Static EditorActions.Undo}" />
            <ButtonTool Action="{x:Static EditorActions.Redo}" />
          </ToolbarGroup>

          <SeparatorTool />

          <ToolbarGroup Classes="AreaAware" TargetAreas="Text">
            <ToggleTool Action="{x:Static EditorActions.Bold}" />
            <ToggleTool Action="{x:Static EditorActions.Italic}" />
            <ToggleTool Action="{x:Static EditorActions.Underline}" />
          </ToolbarGroup>

          <OverflowTool />
        </EditorToolbar>
      </Template>
    </Setter>
  </ControlTheme>
</Application.Resources>
```

### Option 2: Build a toolbar separately from the editor

If you need the toolbar to live somewhere other than above the editor (e.g., in a side panel, in a window chrome, shared across multiple editors), you can hide the built-in toolbar and place an `EditorToolbar` wherever you want.

To do so, define the standalone `EditorToolbar` in XAML and attach it to the editor in the corresponding code-behind.

<Tabs>
<TabItem value="xaml" label="XAML">

```xml
<DockPanel>
  <EditorToolbar x:Name="MyToolbar" DockPanel.Dock="Top">
    <ToolbarGroup>
      <ButtonTool Action="{x:Static EditorActions.Undo}" />
      <ButtonTool Action="{x:Static EditorActions.Redo}" />
    </ToolbarGroup>
    <ToolbarGroup Classes="AreaAware" TargetAreas="Text">
      <ToggleTool Action="{x:Static EditorActions.Bold}" />
      <ToggleTool Action="{x:Static EditorActions.Italic}" />
    </ToolbarGroup>
  </EditorToolbar>

  <RichTextEditor x:Name="MyEditor" ShowToolbar="False" />
</DockPanel>
```

</TabItem>
<TabItem value="csharp" label="Code-behind">

```csharp
public MainWindow()
{
    InitializeComponent();
    MyToolbar.Editor = MyEditor;
}
```

</TabItem>
</Tabs>

:::tip
You can wire one `EditorToolbar` to different editors at runtime by reassigning `EditorToolbar.Editor`. This is a common pattern for tabbed document interfaces where a single shared toolbar tracks the active tab.
:::

### Minimalist example

A minimal toolbar with only Undo/Redo and Bold/Italic. Note that tool icons are set in a separate tag from the tool action.

<Image light={CustomToolbarMinimal} position="center" cornerRadius="true" alt="A minimal custom toolbar containing Undo, Redo, Bold, and Italic tools separated by a divider."/>
<br />

```xml
<ControlTheme x:Key="{x:Type RichTextEditor}"
              TargetType="RichTextEditor"
              BasedOn="{StaticResource {x:Type RichTextEditor}}">
  <Setter Property="Toolbar">
    <Template>
      <EditorToolbar Margin="4">

        <ButtonTool Action="{x:Static EditorActions.Undo}">
            <ButtonTool.Icon>
                <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Undo}" />
            </ButtonTool.Icon>
        </ButtonTool>

        <ButtonTool Action="{x:Static EditorActions.Redo}">
            <ButtonTool.Icon>
                <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Redo}" />
            </ButtonTool.Icon>
        </ButtonTool>

        <SeparatorTool />

        <ToggleTool Action="{x:Static EditorActions.Bold}">
            <ToggleTool.Icon>
                <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Bold}" />
            </ToggleTool.Icon>
        </ToggleTool>

        <ToggleTool Action="{x:Static EditorActions.Italic}" >
            <ToggleTool.Icon>
                <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Italic}" />
            </ToggleTool.Icon>
        </ToggleTool>

      </EditorToolbar>
    </Template>
  </Setter>
</ControlTheme>
```

## EditorTool types

Components on the toolbar, such as buttons, toggles, comboboxes, etc., are subclasses of `EditorTool`. The hierarchy is split in two:

- `EditorTool` itself is the abstract base for any toolbar item. It handles target-area visibility, overflow metadata, focus-return helpers, and editor-host discovery. `SeparatorTool` and `ToolbarGroup` derive from it directly because they don't bind to an action.
- `ActionTool` is the abstract intermediate that adds action-bearing properties (`Action`, `Icon`, `ToolTipText`) and keeps state in sync with the editor. Most concrete widgets — buttons, toggles, comboboxes, flyouts — derive from it.

In practice, you'll rarely need to use either base class directly. The built-in subclasses listed below have been designed to meet most use-cases.

### Built-in subclasses

| Class | Base | Widget | Typical use |
|---|---|---|---|
| `ButtonTool` | `ActionTool` | Button | One-shot commands, e.g., Undo, Cut, Paste. |
| `ToggleTool` | `ActionTool` | Toggle button | Formatting, e.g., Bold, Italic. |
| `ListToggleTool` | `ToggleTool` | Split toggle button | List toggles (bullet/numbered) that also reflect the active marker style. |
| `ComboBoxTool` | `ActionTool` | Combobox | Selection from a list, e.g., font family, font size. |
| `ColorTool` | `ActionTool` | Abstract base | Shared base for the two color pickers. Its `SelectedColor` is `Color?`, where `null` means no color. |
| `ColorPickerTool` | `ColorTool` | Split button + Avalonia `ColorPicker` flyout | Pick an arbitrary color, e.g., foreground color, background color. |
| `ColorSwatchTool` | `ColorTool` | Split button + swatch palette flyout | Pick from a fixed palette. |
| `AlignmentFlyoutTool` | `ActionTool` | Button with flyout | Text alignment: Left, Right, Center, Justify. |
| `HyperlinkFlyoutTool` | `ActionTool` | Button with flyout | Insert/edit hyperlinks. |
| `ImageFlyoutTool` | `ActionTool` | Button with flyout | Insert and resize an inline image. |
| `ImageLinkFlyoutTool` | `ActionTool` | Button with flyout | Attach or clear a hyperlink on the selected image. |
| `PageBandFlyoutTool` | `ActionTool` | Button with flyout | Header and footer tools in one flyout: enter or remove either band, the first-page and odd-and-even switches, link-to-previous, the page-number and page-count fields, the band distance, and the way back to the body. |
| `TablePickerTool` | `ActionTool` | Grid picker | Insert a table by sizing a grid. |
| `BorderFlyoutTool` | `ActionTool` | Button with flyout | Block border configuration, e.g., sides, thickness, color. |
| `OverflowTool` | `ActionTool` | "..." button with flyout | Menu flyout that presents collapsed tools. |
| `SeparatorTool` | `EditorTool` | Vertical rule | Visual divider. |

List marker styles are reached through `ListToggleTool`, which the default selection mini-bar uses. Outside a list it behaves as a plain toggle; inside a matching list it becomes a split button whose secondary half opens the marker options for that list type, driving `EditorActions.BulletMarkerStyle` and `EditorActions.NumberedMarkerStyle`. The main toolbar uses plain `ToggleTool`s for the two list toggles, so marker style is not exposed there by default.

### Core properties

`EditorTool` exposes the following on every toolbar item:

| Property | Type | Description |
|---|---|---|
| `TargetAreas` | `DocumentTargetAreas` | Contexts in which this tool should appear. Defaults to `CaretAreas`. See [DocumentTargetAreas](#documenttargetareas). |
| `ActiveTargetAreas` | `DocumentTargetAreas` | Read-only. The areas the caret is currently in, pushed here by the host toolbar as the selection moves. |
| `IsVisibleForTargetArea` | `bool` | Read-only. Whether `TargetAreas` matches `ActiveTargetAreas`. |
| `OverflowMenuItem` | `MenuItem?` | Menu item shown when this tool is collapsed into the overflow menu. `null` means the tool cannot be collapsed. |
| `CanCollapseOverride` | `bool?` | Explicit override for overflow collapse. |

`ActionTool` adds the action-bearing surface (inherited by every interactive tool):

| Property | Type | Description |
|---|---|---|
| `Action` | `IEditorAction?` | The action this tool executes. |
| `Icon` | `object?` | Display icon for the tool. |
| `ToolTipText` | `string?` | Text displayed as tooltip on hover. Defaults to `Action.DisplayName` if unset. |

`EditorToolbar` itself carries:

| Property | Type | Description |
|---|---|---|
| `Editor` | `ITextEditorHost?` | The host this toolbar drives. Reassign it to retarget the toolbar at runtime. |
| `Tools` | `AvaloniaList<EditorTool>` | The `[Content]` collection of toolbar items. |
| `ActiveTargetAreas` | `DocumentTargetAreas` | Read-only. Derived from the selection and pushed onto every tool. |
| `ShowShortcuts` | `bool` | Whether tooltips display the action's keyboard gesture. |
| `ToolSpacing` | `double` | Uniform spacing between items in the toolbar panel. `ToolbarGroup` has one of its own for its children. |

### XAML usage

```xml
<!-- One-shot command -->
<ButtonTool Action="{x:Static EditorActions.Undo}">
  <ButtonTool.Icon>
    <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Undo}" />
  </ButtonTool.Icon>
</ButtonTool>

<!-- Formatting toggle -->
<ToggleTool Action="{x:Static EditorActions.Bold}">
  <ToggleTool.Icon>
    <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Bold}" />
  </ToggleTool.Icon>
</ToggleTool>

<!-- Property combo with custom item template -->
<ComboBoxTool Action="{x:Static EditorActions.FontFamily}" Width="170">
  <ComboBoxTool.ItemTemplate>
    <DataTemplate DataType="FontFamily">
      <TextBlock Text="{Binding Name}" FontFamily="{Binding}" />
    </DataTemplate>
  </ComboBoxTool.ItemTemplate>
</ComboBoxTool>
```

## Creating a custom tool

You can derive a custom implementation if you need a widget that isn't covered by the built-in subclasses. Pick the base class that matches your use case:

- **`EditorTool`** — for passive widgets (status displays, decorative chips) that don't bind to an action. Override `OnApplyTemplate` for template-part lookup and `OnEditorHostAttached` to react when an editor host becomes available.
- **`ActionTool`** — for interactive tools that execute an `IEditorAction`. You inherit `Action`, `Icon`, `ToolTipText`, and an `UpdateState()` virtual that runs whenever the selection/content/document changes.

In both cases:

1. Expose a control template that renders your widget.
2. Override `OnApplyTemplate` to get references to template parts.
3. For `ActionTool`, override `UpdateState` to refresh extra state (e.g., a custom badge). For `EditorTool`, hook `OnEditorHostAttached` and your own event subscriptions.
4. Inside handlers, call `EnsureEditorFocus()` before executing an action so the caret returns to the editor.

### Example: Word count tool

<Image light={WordCountTool} position="center" cornerRadius="true" alt="A custom word count tool docked at the end of the toolbar, displaying the current word count."/>
<br />

The word count display is a passive widget — it doesn't execute an action — so it derives from `EditorTool` directly. `UpdateState` lives on `ActionTool`, so a passive tool refreshes itself by subscribing to the host's own events in `OnEditorHostAttached` and unsubscribing in `OnEditorHostDetached`.

The implementation counts words by walking the document's `DocumentSnapshot`. Enumerating `Run` nodes and treating block boundaries and line breaks as word separators avoids allocating a full plain-text string and avoids merging the last word of one paragraph with the first word of the next.

<Tabs>
<TabItem value="class" label="C#">

```csharp
using Avalonia.Controls;
using Avalonia.Controls.Primitives;
using Avalonia.Controls.Documents.TextModel;
using Avalonia.Controls.Documents.Serialization.Snapshot;

public class WordCountTool : EditorTool
{
    private TextBlock? _countText;

    protected override void OnApplyTemplate(TemplateAppliedEventArgs e)
    {
        base.OnApplyTemplate(e);
        _countText = e.NameScope.Find<TextBlock>("PART_Count");
        Refresh();
    }

    protected override void OnEditorHostAttached()
    {
        base.OnEditorHostAttached();

        if (EditorHost is { } host)
        {
            host.ContentChanged += OnHostChanged;
            host.DocumentChanged += OnHostChanged;
        }

        Refresh();
    }

    protected override void OnEditorHostDetached()
    {
        if (EditorHost is { } host)
        {
            host.ContentChanged -= OnHostChanged;
            host.DocumentChanged -= OnHostChanged;
        }

        base.OnEditorHostDetached();
    }

    private void OnHostChanged(object? sender, EventArgs e) => Refresh();

    private void Refresh()
    {
        if (_countText is null) return;

        var doc = EditorHost?.TextDocument;
        if (doc is null)
        {
            _countText.Text = "0 words";
            return;
        }

        var snapshot = doc.CreateSnapshot();
        int words = CountWords(snapshot);
        _countText.Text = $"{words} word{(words == 1 ? "" : "s")}";
    }

    private static int CountWords(DocumentSnapshot snapshot)
    {
        int count = 0;
        bool inWord = false;

        foreach (var node in snapshot.EnumerateNodes())
        {
            var kind = node.Kind;
            if (kind == TextDocumentNodeKind.Run)
            {
                int remaining = node.Length;
                int pos = node.StartOffset;
                while (remaining > 0)
                {
                    var chunk = snapshot.GetTextMemory(pos, remaining);
                    if (chunk.IsEmpty) break;

                    foreach (char c in chunk.Span)
                    {
                        if (char.IsWhiteSpace(c)) inWord = false;
                        else if (!inWord) { inWord = true; count++; }
                    }

                    pos += chunk.Length;
                    remaining -= chunk.Length;
                }
            }
            else if (kind == TextDocumentNodeKind.LineBreak
                || (kind.Flags & NodeKindFlags.Block) != 0)
            {
                // Block boundary — never merge the last word of one paragraph
                // with the first word of the next.
                inWord = false;
            }
        }

        return count;
    }
}
```

</TabItem>
<TabItem value="theme" label="XAML control theme">

```xml
<ControlTheme x:Key="{x:Type local:WordCountTool}" TargetType="local:WordCountTool">
  <Setter Property="Template">
    <ControlTemplate>
      <Border Padding="8,4"
              MinWidth="72"
              VerticalAlignment="Center">
        <TextBlock Name="PART_Count"
                   Classes="Caption"
                   Foreground="{DynamicResource TextControlForeground}"
                   VerticalAlignment="Center" />
      </Border>
    </ControlTemplate>
  </Setter>
</ControlTheme>
```

</TabItem>
<TabItem value="usage" label="Usage">

```xml
<EditorToolbar>
  <!-- ...other groups... -->
  <SeparatorTool />
  <local:WordCountTool />
</EditorToolbar>
```

</TabItem>
</Tabs>

## Editor actions

Every tool binds to an `IEditorAction` supplied by the static `EditorActions` class. The action tells the tool how to execute the command, when it is available, and (for toggles and property actions) what state to display. Bind from XAML with `{x:Static EditorActions.<Name>}`, or invoke an action directly from code:

```csharp
if (EditorActions.Bold.CanExecute(editorHost))
    EditorActions.Bold.Execute(editorHost);

// Clipboard actions are asynchronous
await EditorActions.Paste.ExecuteAsync(editorHost);

// Property actions get and set typed values
EditorActions.FontSize.SetValue(editorHost, 16.0);
var current = EditorActions.FontSize.GetValue(editorHost);

// Toggles report their checked state
bool isBold = EditorActions.Bold.IsChecked(editorHost);
```

:::info
The `EditorActions` singletons are the supported way to reference a built-in action. The concrete action classes behind them (`BoldAction` and the rest) are internal: none declared a member the interfaces do not, and constructing a second instance produced a duplicate `Id` that `GetById` would never return. `InsertImageAction` and `InsertTableAction` remain public, because each carries a parameterised entry point (`ExecuteWith`) beyond the interfaces. Writing an action of your own is unaffected: `IEditorAction`, `IToggleAction`, `IPropertyAction`, `IPropertyAction<T>`, `IBlockPropertyAction`, `IBlockPropertyAction<T>`, `EditorAction`, `FormattingToggleAction<T>`, `PropertyAction<T>` and `BlockPropertyAction<T>` are all public.
:::

### Reading action state

Each singleton is declared as the narrowest interface its instance implements, so checked state and property values read without a downcast. The untyped `GetState` is gone.

| Actions | Type | State accessor |
|---|---|---|
| `Bold`, `Italic`, `Underline`, `Strikethrough`, `Superscript`, `Subscript`, `BlockBorder`, `AlignLeft`, `AlignCenter`, `AlignRight`, `AlignJustify`, `ToggleBulletList`, `ToggleNumberedList`, `DifferentFirstPage`, `DifferentOddAndEvenPages`, `LinkToPrevious` | `IToggleAction` | `IsChecked(host)` |
| `FontFamily` | `IPropertyAction<FontFamily>` | `GetValue(host)`, `SetValue(host, value)`, `ClearValue(host)` |
| `FontSize` | `IPropertyAction<double>` | same |
| `ForegroundColor`, `BackgroundColor` | `IPropertyAction<IBrush?>` | same |
| `LineHeight` | `IBlockPropertyAction<double>` | same, plus `HasConsistentValue(host)` |
| `Margin`, `Padding`, `BorderThickness` | `IBlockPropertyAction<Thickness>` | same |
| `BlockBackground`, `BorderBrush` | `IBlockPropertyAction<IBrush?>` | same |
| `BulletMarkerStyle`, `NumberedMarkerStyle` | `IBlockPropertyAction<TextMarkerStyle>` | same |
| `TextAlignment` | `IBlockPropertyAction<TextAlignment>` | same |
| `InsertImage` | `InsertImageAction` | `ExecuteWith(host, ...)` |
| `InsertTable` | `InsertTableAction` | `ExecuteWith(host, rowCount, columnCount)` |

`IBlockPropertyAction<T>` derives from `IPropertyAction<T>`, so its value members are inherited rather than redeclared. Invoking a block property action with no value does nothing; `SetValue` is how a block property is applied.

The following actions are built in.

### Edit operations

| Action | Gesture | Description |
|---|---|---|
| `Undo` | Ctrl+Z | Undo the last operation. |
| `Redo` | Ctrl+Y | Redo the last undone operation. |
| `Cut` | Ctrl+X | Cut the current selection to the clipboard. |
| `Copy` | Ctrl+C | Copy the current selection to the clipboard. |
| `Paste` | Ctrl+V | Paste clipboard contents at the caret. |
| `PasteUnformatted` | N/A | Paste clipboard contents as plain text. |
| `SelectAll` | Ctrl+A | Select all content. |

### Text formatting

| Action | Gesture | Description |
|---|---|---|
| `Bold` | Ctrl+B | Toggle bold. |
| `Italic` | Ctrl+I | Toggle italic. |
| `Underline` | Ctrl+U | Toggle underline. |
| `Strikethrough` | Ctrl+- | Toggle strikethrough. |
| `Superscript` | Ctrl+Shift++ | Toggle superscript baseline alignment. |
| `Subscript` | Ctrl++ | Toggle subscript baseline alignment. |
| `FontFamily` | N/A | Get or set the font family. |
| `FontSize` | N/A | Get or set the font size. |

### Colors

| Action | Description |
|---|---|
| `ForegroundColor` | Get or set the text foreground color. |
| `BackgroundColor` | Get or set the text background (highlight) color. |

### Block alignment

| Action | Description |
|---|---|
| `TextAlignment` | Get or set block alignment as a value. |
| `AlignLeft` | Left-align the blocks. |
| `AlignCenter` | Center-align the blocks. |
| `AlignRight` | Right-align the blocks. |
| `AlignJustify` | Justify the blocks. |

### Block spacing and styling

| Action | Description |
|---|---|
| `LineHeight` | Get or set block line height. |
| `Margin` | Get or set block margin. Uniform on all sides. |
| `Padding` | Get or set block padding. Uniform on all sides |
| `BlockBackground` | Get or set block background color. |
| `BorderThickness` | Get or set block border thickness. |
| `BorderBrush` | Get or set block border color. |
| `BlockBorder` | Toggle block border on or off. |

### Lists

| Action | Description |
|---|---|
| `ToggleBulletList` | Wrap or unwrap as an unordered list. |
| `ToggleNumberedList` | Wrap or unwrap as an ordered list. |
| `BulletMarkerStyle` | Set the bullet marker style (e.g., Disc, Circle, Square). |
| `NumberedMarkerStyle` | Set the numbered marker style (e.g., Decimal, LowerLatin, UpperRoman). |

### Tables

| Action | Description |
|---|---|
| `InsertTable` | Insert a table at the caret. Defaults to 3×3. |
| `InsertRowBefore` | Insert a row above the current row. |
| `InsertRowAfter` | Insert a row below the current row. |
| `DeleteRow` | Delete the current row. |
| `InsertColumnBefore` | Insert a column to the left of the current column. |
| `InsertColumnAfter` | Insert a column to the right of the current column. |
| `DeleteColumn` | Delete the current column. |
| `MergeCells` | Merge the selected cells into one. |
| `SplitCell` | Split the current merged cell. |
| `DeleteTable` | Delete the entire table. |

### Images

| Action | Description |
|---|---|
| `InsertImage` | Insert an inline image at the caret. `ExecuteWith` takes the image data directly. |
| `ReplaceImage` | Replace the selected image. |
| `DeleteImage` | Delete the selected image. |

### Headers and footers

| Action | Description |
|---|---|
| `GoToHeader` | Enter the header of the caret's page, creating the running header when the page shows none. |
| `GoToFooter` | Enter the footer of the caret's page, creating the running footer when the page shows none. |
| `RemoveHeader` | Remove the header the caret is in, or the one the caret's page shows. |
| `RemoveFooter` | Remove the corresponding footer. |
| `DifferentFirstPage` | Toggle a separate header and footer on the first page. |
| `DifferentOddAndEvenPages` | Toggle separate odd-page and even-page bands. |
| `LinkToPrevious` | Toggle whether the caret's section inherits the previous section's bands. |
| `InsertPageNumber` | Insert a current-page field. |
| `InsertPageCount` | Insert a page-count field. |
| `ReturnToBody` | Leave the band and return the caret to the body. |

### Footnotes

| Action | Description |
|---|---|
| `InsertFootnote` | Insert a footnote anchor at the caret and open the note. |
| `GoToFootnote` | Move the caret from an anchor into its note. |
| `GoToFootnoteReference` | Move the caret from a note back to its anchor. |

### Lookup by ID

Action IDs follow the pattern `"Category.Name"` (e.g., `"Format.Bold"`, `"Table.InsertRowAfter"`). `EditorActionIds` names the ID of every built-in action as a `public const string`, so a lookup is written against a constant rather than a literal.

```csharp
var action = EditorActions.GetById(EditorActionIds.Bold);
action?.Execute(editorHost);

// Enumerate every built-in action. All is an IReadOnlyList in a stable
// order: declaration order, grouped by category.
foreach (var a in EditorActions.All)
    Console.WriteLine($"{a.Id}: {a.DisplayName}");
```

An action's `Gesture` is what tooltips and menu items display. It registers nothing: the shortcut that actually fires is handled by the editor's keyboard component, so an action whose gesture differs from the one the editor handles advertises a shortcut that does nothing.

### Springload behavior

When the selection is empty, toggle and property actions set a _springload_, meaning the formatting applies to the next character typed. This matches the behavior users expect from common word processors.

## ToolbarGroup

`ToolbarGroup` groups a set of related tools to share collective visibility. If the group's `TargetAreas` don't match the current caret context, the entire group is hidden.

### Nesting groups

Groups can nest: a `ToolbarGroup` is an `EditorTool`, so it can sit in another group's `Tools`. Nesting is how a sub-group gets its own `TargetAreas` or `ToolSpacing` inside a wider group.

Overflow descends the whole tree, and a nested group contributes its own children to the enclosing top-level group's menu section rather than collapsing as a unit. A group carries no `OverflowMenuItem`, so collapsing one would take its tools off the bar with nothing to stand in for them. Setting `CanCollapseOverride="False"` on a nested group pins its children in place.

```xml
<ToolbarGroup Classes="AreaAware" TargetAreas="Text">
  <ToggleTool Action="{x:Static EditorActions.Bold}" />
  <ToggleTool Action="{x:Static EditorActions.Italic}" />

  <!-- Only while the caret is on an image -->
  <ToolbarGroup Classes="AreaAware" TargetAreas="Image">
    <ImageFlyoutTool />
    <ImageLinkFlyoutTool />
  </ToolbarGroup>
</ToolbarGroup>
```

### Applying the `AreaAware` class

`ToolbarGroup` does not react to the editor's active context by default. To enable contextual awareness, add the `AreaAware` class. `TargetAreas` defaults to `CaretAreas`, so an `AreaAware` group with no `TargetAreas` of its own is visible wherever the caret can go.

<Image light={AreaAware} position="center" maxWidth={250} cornerRadius="true" alt="Animation showing toolbar groups appearing and disappearing as the caret moves between body text, a list, and a table."/>
<br />

```xml
<!-- Text formatting group: Only visible when editing text -->
<ToolbarGroup Classes="AreaAware" TargetAreas="Text">
  <ToggleTool Action="{x:Static EditorActions.Bold}" />
  <ToggleTool Action="{x:Static EditorActions.Italic}" />
  <ToggleTool Action="{x:Static EditorActions.Underline}" />
</ToolbarGroup>

<!-- Table actions group: Only visible inside a table -->
<ToolbarGroup Classes="AreaAware" TargetAreas="Table">
  <ButtonTool Action="{x:Static EditorActions.InsertRowAfter}" />
  <ButtonTool Action="{x:Static EditorActions.DeleteRow}" />
</ToolbarGroup>

<!-- Always visible -->
<ToolbarGroup>
  <ButtonTool Action="{x:Static EditorActions.Undo}" />
  <ButtonTool Action="{x:Static EditorActions.Redo}" />
</ToolbarGroup>
```

## DocumentTargetAreas

`DocumentTargetAreas` is a `[Flags]` enum in `Avalonia.Controls.Documents.Primitives` describing the contexts in which a tool, a menu entry or a block adorner applies. `EditorToolbar` derives the active areas from the selection on every selection and document change and pushes them onto every tool.

| Flag | Caret context |
|---|---|
| `None` | No target area. |
| `Text` | The caret is in any text-editable position. |
| `Block` | The caret is in a block-level context. |
| `Table` | The caret is in a table. |
| `List` | The caret is in a list. |
| `Image` | The caret is on an inline image. |
| `TableCells` | The selection is a set of whole table cells. Driven by the selection shape rather than the caret's ancestry. |
| `PageBand` | The caret is in a header or footer. A band is text too, so tools targeting the text areas stay available there. |
| `Footnote` | The caret is in a footnote's document. |
| `CaretAreas` | The caret-derived areas: `Text`, `Block`, `Table`, `List` and `Image`. The default for `EditorTool.TargetAreas`. |

`CaretAreas` is deliberately not every flag. `TableCells`, `PageBand` and `Footnote` are opted into by name, so a tool that lists one of them alone appears only in that context.

:::warning
This enum was `ToolbarTargetAreas` in the `...Primitives.Adorners` namespace before 13.0, and its `All` member is now `CaretAreas` with the same value. The remaining flags keep their names and values, so existing XAML such as `TargetAreas="Text,List"` still binds.
:::

If required, you can combine `DocumentTargetAreas` to make a tool visible in multiple contexts.

```xml
<ToolbarGroup Classes="AreaAware" TargetAreas="Text,List">
```

## Managing the overflow menu

The overflow menu is the "..." button at the end of the toolbar. When the toolbar runs out of horizontal space, `EditorToolbar` collapses tools into this menu, starting from right to left by default.

Collection descends the whole tool tree. A nested `ToolbarGroup` contributes its own children rather than itself, and the menu reads in the same sequence the tools appear on the bar. A tool that is hidden by its target areas is skipped.

### Rules for what collapses

| `CanCollapseOverride` | `OverflowMenuItem` | Result |
|-----------------------|--------------------|---------|
| `null` | set | Collapsible (default) |
| `null` | `null` | Not collapsible |
| `true` | set | Collapsible |
| `true` | `null` | Not collapsible (no menu representation) |
| `false` | set | Not collapsible (pinned) |
| `false` | `null` | Not collapsible |

### Declaring overflow representations

Each collapsible tool must have its own `OverflowMenuItem`. In most cases, the menu item can be a simple `EditorMenuItem`.

```xml
<!-- Collapses into a simple menu item with the same icon -->
<ButtonTool Action="{x:Static EditorActions.Cut}">
  <ButtonTool.Icon>
    <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Cut}" />
  </ButtonTool.Icon>
  <ButtonTool.OverflowMenuItem>
    <EditorMenuItem Action="{x:Static EditorActions.Cut}">
      <EditorMenuItem.Icon>
        <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Cut}" />
      </EditorMenuItem.Icon>
    </EditorMenuItem>
  </ButtonTool.OverflowMenuItem>
</ButtonTool>
```

### Overflow for specialized tools

The following specialized subclasses of `EditorMenuItem` are available for tools that may not work well as plain menu items in an overflow menu.

| Source tool | Overflow item | Behavior |
|---|---|---|
| `ComboBoxTool` (fonts) | `FontFamilyMenuItem` | Submenu of fonts, each rendered in its own typeface. |
| `ComboBoxTool` (generic) | `PropertyMenuItem` | Submenu of values auto-populated from the action. |
| `ColorPickerTool` / `ColorSwatchTool` | `ColorMenuItem` | Submenu with color swatches and optional "No Color". |
| `AlignmentFlyoutTool` | `TextAlignmentMenuItem` | Submenu of alignment options. |

#### Examples

```xml
<!-- Font selector submenu -->
<ComboBoxTool Action="{x:Static EditorActions.FontFamily}" Width="170">
  <ComboBoxTool.OverflowMenuItem>
    <FontFamilyMenuItem Action="{x:Static EditorActions.FontFamily}" />
  </ComboBoxTool.OverflowMenuItem>
</ComboBoxTool>

<!-- Color picker submenu -->
<ColorPickerTool Action="{x:Static EditorActions.ForegroundColor}"
                       ToolTipText="Text color">
  <ColorPickerTool.OverflowMenuItem>
    <ColorMenuItem Action="{x:Static EditorActions.ForegroundColor}"
                         Header="Text color" />
  </ColorPickerTool.OverflowMenuItem>
</ColorPickerTool>

<!-- Text alignment submenu -->
<AlignmentFlyoutTool ToolTipText="Text alignment">
  <AlignmentFlyoutTool.OverflowMenuItem>
    <TextAlignmentMenuItem Header="Text alignment" />
  </AlignmentFlyoutTool.OverflowMenuItem>
</AlignmentFlyoutTool>
```

### Pinning important tools

To guarantee a tool always stays in the toolbar, even when horizontal space is tight, omit `OverflowMenuItem`. Undo and Redo are pinned this way in the default toolbar. Use `CanCollapseOverride="False"` only when you want to keep an overflow definition for conditional toggling.

```xml
<!-- Undo can never be collapsed -->
<ButtonTool Action="{x:Static EditorActions.Undo}">
  <ButtonTool.Icon>
    <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Undo}" />
  </ButtonTool.Icon>
</ButtonTool>
```

## Default mini-bar

When the user selects text, a compact floating toolbar appears near the selection. This is the `SelectionFlyout`, an `EditorSelectionFlyout` (a `Flyout` subclass) that hosts a trimmed-down `EditorToolbar`.

<Image light={DefaultMiniBar} position="center" cornerRadius="true" alt="The default selection mini-bar floating above selected text, showing inline formatting, list, and block configuration tools."/>
<br />

The default mini-bar includes:

- **Inline formatting** (`Text`): Bold, Italic, Underline, Strikethrough, Text color, Highlight color
- **List toggles** (`Text`, `List`): Bullet, Numbered, each a `ListToggleTool` whose split half offers marker styles
- **Block configuration**: Block background, Borders, Text alignment
- **Table cell operations** (`TableCells`): Merge cells, Split cell, Delete row, Delete column
- **Image actions** (`Image`): Align left/center/right, Image size, Replace image, Add or edit link, Delete image

The mini-bar anchors to the block containing the selection, rather than the pointer. Each group declares its own `TargetAreas`, so the cell and image groups appear only for those selections.

## Replacing the default mini-bar

Within the `<RichTextEditor>` XAML tags, add a `<RichTextEditor.SelectionFlyout>` and specify a custom `EditorSelectionFlyout`. This can be used to host an `EditorToolbar`.

The outer `Border` named `PART_Chrome` is required — `EditorSelectionFlyout` uses it to distinguish the chrome from the surrounding shadow gutter when handling dismiss events.

This example shows a minimal mini-bar that only provides basic text formatting options.

<Image light={CustomMiniBarMinimal} position="center" cornerRadius="true" alt="A custom selection mini-bar with only Bold, Italic, and Underline toggles."/>
<br />

```xml
<RichTextEditor>
  <RichTextEditor.SelectionFlyout>
    <EditorSelectionFlyout Placement="TopEdgeAlignedLeft"
                           OverlayDismissEventPassThrough="True">
      <Border Name="PART_Chrome" Classes="EditorMiniBarChrome">
        <EditorToolbar>

          <ToggleTool Action="{x:Static EditorActions.Bold}">
            <ToggleTool.Icon>
              <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Bold}" />
            </ToggleTool.Icon>
          </ToggleTool>

          <ToggleTool Action="{x:Static EditorActions.Italic}">
            <ToggleTool.Icon>
              <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Italic}" />
            </ToggleTool.Icon>
          </ToggleTool>

          <ToggleTool Action="{x:Static EditorActions.Underline}">
            <ToggleTool.Icon>
              <ContentPresenter ContentTemplate="{StaticResource EditorIcons.Underline}" />
            </ToggleTool.Icon>
          </ToggleTool>

        </EditorToolbar>
      </Border>
    </EditorSelectionFlyout>
  </RichTextEditor.SelectionFlyout>
</RichTextEditor>
```

Some recommendations:

- Apply the `EditorMiniBarChrome` style class to the surrounding `Border` for the default rounded, shadowed appearance.
- Keep the set of tools small. The mini-bar should complement the main toolbar, not duplicate it.

### Disabling the mini-bar

Within the `<RichTextEditor>` XAML tags, set `SelectionFlyout` to `{x:Null}` to turn it off entirely.

```xml
<RichTextEditor SelectionFlyout="{x:Null}" />
```

## Default context menu

The contextual menu that opens when right-clicking within the text editor is the `EditorContextMenu` — a `MenuFlyout` subclass attached to `RichTextEditor.ContextFlyout`.

<Image light={DefaultContextMenu} position="center" maxWidth={250} cornerRadius="true" alt="The default right-click context menu with Cut, Copy, Paste, Select All, and table operations."/>
<br />

The default context menu contains:

- Cut, Copy, Paste
- Select All
- Table operations (Insert/Delete row, Insert/Delete column, Merge cells, Split cell, Delete table), visible only when the caret is inside a table
- Image operations (Replace image, Delete image), visible only on an image
- Page band operations (Insert page number, Insert page count, Return to body), visible only inside a header or footer

`EditorContextMenu` reads `TargetAreas` on each `EditorMenuItem` in order to hide items that don't apply to the current context. Unused separator lines left by hidden groups are also hidden automatically. Right-clicking moves the caret to the pressed position first (a press inside the current selection keeps the selection), so the menu opens with the context under the pointer rather than a stale one.

## Replacing the context menu

Within the `<RichTextEditor>` XAML tags, add a `<RichTextEditor.ContextFlyout>` and specify a custom `EditorContextMenu`. To add actions to the menu, add individual tags for `<EditorMenuItem>`.

<Image light={CustomContextMenu} position="center" maxWidth={250} cornerRadius="true" alt="A custom context menu with clipboard commands and context-sensitive table operations."/>
<br />

```xml
<RichTextEditor>
  <RichTextEditor.ContextFlyout>
    <EditorContextMenu Placement="Pointer">
      <EditorMenuItem Action="{x:Static EditorActions.Cut}" />
      <EditorMenuItem Action="{x:Static EditorActions.Copy}" />
      <EditorMenuItem Action="{x:Static EditorActions.Paste}" />

      <Separator />

      <EditorMenuItem Action="{x:Static EditorActions.SelectAll}" />

      <Separator />

      <!-- Only appears in tables -->
      <EditorMenuItem Action="{x:Static EditorActions.InsertRowAfter}"
                      TargetAreas="Table" />
      <EditorMenuItem Action="{x:Static EditorActions.DeleteRow}"
                      TargetAreas="Table" />
      <EditorMenuItem Action="{x:Static EditorActions.DeleteTable}"
                      TargetAreas="Table" />
    </EditorContextMenu>
  </RichTextEditor.ContextFlyout>
</RichTextEditor>
```

### Adding property submenus

The same [specialized menu items used for overflow](#overflow-for-specialized-tools) also work in the context menu.

<Image light={CustomContextMenuSpecialized} position="center" maxWidth={250} cornerRadius="true" alt="A custom context menu with specialized submenus for font family, text color, and alignment."/>
<br />

```xml
<EditorContextMenu Placement="Pointer">
  <EditorMenuItem Action="{x:Static EditorActions.Cut}" />
  <EditorMenuItem Action="{x:Static EditorActions.Copy}" />
  <EditorMenuItem Action="{x:Static EditorActions.Paste}" />

  <Separator />

  <FontFamilyMenuItem Action="{x:Static EditorActions.FontFamily}"
                            Header="Font" />
  <ColorMenuItem Action="{x:Static EditorActions.ForegroundColor}"
                       Header="Text color" />
  <TextAlignmentMenuItem Header="Alignment" TargetAreas="Text,Block" />
</EditorContextMenu>
```

### Disabling the context menu

Within the `<RichTextEditor>` XAML tags, set `ContextFlyout` to `{x:Null}` to turn it off entirely.

```xml
<RichTextEditor ContextFlyout="{x:Null}" />
```

## Theming and styling

Toolbar visuals are controlled through dynamic resources and style classes. You can override default settings at the application level, the window level, or on an individual `EditorToolbar`.

### Sizing and color resources

| Resource | Default | Purpose |
|---|---|---|
| `EditorToolbarToolHeight` | 30 | Tool button height. |
| `EditorToolbarToolMinWidth` | 28 | Minimum tool button width. |
| `EditorToolbarToolPadding` | 6,4 | Internal padding of tool buttons. |
| `EditorToolbarButtonCornerRadius` | 6 | Corner radius of tool buttons. |
| `EditorToolbarToolOpacity` | 0.9 | Tool opacity. |
| `EditorToolbarSeparatorHeight` | 18 | Separator line height. |
| `EditorToolbarSubtleBorderBrush` | Theme | Separator and subtle border color. |
| `EditorToolbarPointerOverBackgroundBrush` | Theme | Hover background color. |
| `EditorToolbarCheckedBackgroundBrush` | Theme | Active/checked background color. |
| `EditorToolbarDisabledForegroundBrush` | Theme | Disabled foreground color. |

#### Example

<Image light={CustomThemeToolbar} position="center" cornerRadius="true" alt="A toolbar with overridden theme resources, showing larger buttons, reduced corner radius, and a custom accent color for checked tools."/>
<br />

```xml
<Application.Resources>
  <ResourceDictionary>
    <!-- Make toolbar buttons bigger -->
    <x:Double x:Key="EditorToolbarToolHeight">36</x:Double>
    <x:Double x:Key="EditorToolbarToolMinWidth">36</x:Double>
    <CornerRadius x:Key="EditorToolbarButtonCornerRadius">4</CornerRadius>

    <!-- Use a custom accent for checked tools -->
    <SolidColorBrush x:Key="EditorToolbarCheckedBackgroundBrush"
                     Color="#4CAF50" Opacity="0.25" />
  </ResourceDictionary>
</Application.Resources>
```

### Style classes

| Class | Applies to | Effect |
|---|---|---|
| `ToolbarTool` | `Button`, `ToggleButton`, `SplitButton` | Standard toolbar button sizing, transparency, hover/checked/disabled visuals, transitions. Apply when embedding a stock button inside an `EditorToolbar` so it blends with surrounding tools. |
| `AreaAware` | `ToolbarGroup`, `ToggleTool`, `SeparatorTool`, `TablePickerTool`, `AlignmentFlyoutTool`, and other `EditorTool` subclasses | Binds the active target area from the ancestor `EditorToolbar` and optionally drives `IsVisible`. Required on `ToolbarGroup` for contextual visibility to work. |
| `EditorMiniBarChrome` | `Border` | Compact rounded-border, drop-shadow appearance used by the default selection mini-bar. |

#### Example

Add a plain `Button` to the toolbar without it looking out of place.

```xml
<EditorToolbar>
  <ToolbarGroup>
    <Button Classes="ToolbarTool" Click="OnExport_Click">
      <PathIcon Data="{StaticResource ExportGeometry}" />
    </Button>
  </ToolbarGroup>
  <!-- ... -->
</EditorToolbar>
```

### Targeted styles

For precise control, write a style selector that targets a specific element within the toolbar.

```xml
<Style Selector="EditorToolbar > ToolbarGroup > ToggleTool">
  <Setter Property="Margin" Value="2,0" />
</Style>
```

## See also

- [RichTextEditor reference](/controls/input/text-input/richtexteditor)
- [Extension Patterns](/controls/input/text-input/richtexteditor/extension-patterns)
- [Performance Tuning](/controls/input/text-input/richtexteditor/performance-tuning)
- [Troubleshooting RichTextEditor](/troubleshooting/controls/richtexteditor)
