---
id: toolbar-customization
title: Customizing the toolbar
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

:::note
**Migrating from earlier releases?** `EditorToolbar` and `ToolbarGroup` no longer derive from `ItemsControl`. Use the `Tools` property (typed `AvaloniaList<EditorTool>` and marked as the `[Content]` property) instead of `Items`/`ItemsSource`/`ItemsPanel`, and re-template with a `Panel` named `PART_ItemsHost` to change the layout. Action-bearing properties (`Action`, `Icon`, `ToolTipText`) moved from `EditorTool` to a new abstract `ActionTool` base — concrete tools like `ButtonTool`/`ToggleTool` still expose them. See the migration table at the end of [Toolbar and Selection Flyout](toolbar.md#migration-from-earlier-editortoolbar-api).
:::

## How the toolbar is assembled

- **`EditorTool`**: the abstract base for any item hosted inside an `EditorToolbar` or `ToolbarGroup`. It carries target-area visibility, overflow metadata, and editor-host discovery.
- **`ActionTool`**: the abstract base for tools that bind to an `IEditorAction`. Adds `Action`, `Icon`, and `ToolTipText`, and synchronizes `IsEnabled` with `Action.CanExecute(host)`. Most concrete tools (button, toggle, combobox, flyout) derive from this.
- **`ToolbarGroup`**: itself an `EditorTool`. Hosts its own strongly-typed `Tools` collection of child tools. Groups share visibility status, i.e., they collapse together into the overflow menu if there is insufficient space. Nested `ToolbarGroup` instances are not supported.
- **`EditorToolbar`**: a `TemplatedControl` that exposes a strongly-typed `Tools` collection (`AvaloniaList<EditorTool>`) marked as the `[Content]` property. Wires items to the editor, propagates `ActiveTargetAreas`, and runs the overflow-collapse layout pass. Items are inserted into a `Panel` named `PART_ItemsHost` in the control template.

The primary toolbar lives inside `RichTextEditor`'s control template as a `Border` named `PART_ToolbarContainer` that hosts an `EditorToolbar`; visibility is controlled by `RichTextEditor.ShowToolbar`. The selection mini-bar (`EditorSelectionFlyout`) and the context menu (`EditorContextMenu`) are hosted by flyout controls and are configured separately.

## Default toolbar


The built-in `EditorToolbar`, populated via `RichTextEditor.Toolbar` in the editor's default control theme, contains the following tools, appearing in this order and sorted into these groups.

<Image light={DefaultToolbar} position="center" cornerRadius="true" alt="The default RichTextEditor toolbar with history, clipboard, font, inline formatting, lists, table, block layout, and overflow groups."/>
<br />

1. **History** — Undo, Redo
2. **Clipboard** — Cut, Copy, Paste, Select All
3. **Font** — Font family, Font size, Foreground color, Background color
4. **Inline formatting** — Bold, Italic, Underline, Strikethrough, Superscript, Subscript, Link
5. **Lists** — Bullet list, Numbered list
6. **Tables** — Insert table
7. **Block layout** — Text alignment, Block border
8. **Overflow** — "..." button that presents collapsed tools when clicked

Most tools are context-sensitive, meaning they disappear automatically when out of context, e.g., list tools are hidden outside lists, table tools are hidden outside tables. This is done by declaring the [`ToolbarTargetAreas`](#toolbartargetareas) of each tool or group.

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
| `ColorPickerTool` | `ColorTool` | Split button + Avalonia `ColorPicker` flyout | Pick an arbitrary color, e.g., foreground color, background color. |
| `ColorSwatchTool` | `ColorTool` | Split button + swatch palette flyout | Pick from a fixed palette. |
| `AlignmentFlyoutTool` | `ActionTool` | Button with flyout | Text alignment—Left, Right, Center, Justify. |
| `HyperlinkFlyoutTool` | `ActionTool` | Button with flyout | Insert/edit hyperlinks. |
| `TablePickerTool` | `ActionTool` | Grid picker | Insert a table by sizing a grid. |
| `BorderFlyoutTool` | `ActionTool` | Button with flyout | Block border configuration, e.g., sides, thickness, color. |
| `OverflowTool` | `ActionTool` | "..." button with flyout | Menu flyout that presents collapsed tools. |
| `SeparatorTool` | `EditorTool` | Vertical rule | Visual divider. |

Bullet- and numbered-list marker styles are exposed in the default theme via `ButtonTool` instances paired with a `PropertyMenuItem` overflow representation that drives `EditorActions.BulletMarkerStyle` / `EditorActions.NumberedMarkerStyle` — there is no dedicated `BulletMarkerFlyoutTool` / `NumberedMarkerFlyoutTool`.

### Core properties

`EditorTool` exposes the following on every toolbar item:

| Property | Type | Description |
|---|---|---|
| `TargetAreas` | `ToolbarTargetAreas` | Contexts in which this tool should appear. See [ToolbarTargetAreas](#toolbartargetareas). |
| `OverflowMenuItem` | `MenuItem?` | Menu item shown when this tool is collapsed into the overflow menu. `null` means the tool cannot be collapsed. |
| `CanCollapseOverride` | `bool?` | Explicit override for overflow collapse. |

`ActionTool` adds the action-bearing surface (inherited by every interactive tool):

| Property | Type | Description |
|---|---|---|
| `Action` | `IEditorAction?` | The action this tool executes. |
| `Icon` | `object?` | Display icon for the tool. |
| `ToolTipText` | `string?` | Text displayed as tooltip on hover. Defaults to `Action.DisplayName` if unset. |

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

The word count display is a passive widget — it doesn't execute an action — so it derives from `EditorTool` directly.

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
        Refresh();
    }

    protected override void UpdateState()
    {
        base.UpdateState();
        Refresh();
    }

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
```

The following actions are built in.

### Edit operations

| Action | Gesture | Description |
|---|---|---|
| `Undo` | Ctrl+Z | Undo the last operation. |
| `Redo` | Ctrl+Y | Redo the last undone operation. |
| `Cut` | Ctrl+X | Cut the current selection to the clipboard. |
| `Copy` | Ctrl+C | Copy the current selection to the clipboard. |
| `Paste` | Ctrl+V | Paste clipboard contents at the caret. |
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
| `DeleteTable` | Delete the entire table. |

### Lookup by ID

Action IDs follow the pattern `"Category.Name"` (e.g., `"Format.Bold"`, `"Table.InsertRowAfter"`). Use `GetById` to resolve an action at runtime.

```csharp
var action = EditorActions.GetById("Format.Bold");
action?.Execute(editorHost);

// Enumerate every built-in action
foreach (var a in EditorActions.All)
    Console.WriteLine($"{a.Id} — {a.DisplayName}");
```

### Springload behavior

When the selection is empty, toggle and property actions set a _springload_, meaning the formatting applies to the next character typed. This matches the behavior users expect from common word processors.

## ToolbarGroup

`ToolbarGroup` groups a set of related tools to share collective visibility. If the group's `TargetAreas` don't match the current caret context, the entire group is hidden. Additionally, the entire group [overflows](#managing-the-overflow-menu) together if the layout changes.

### Applying the `AreaAware` class

`ToolbarGroup` does not react to the editor's active context by default. To enable contextual awareness, add the `AreaAware` class. If unset, `AreaAware` defaults to `All`, and the group is always visible.

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

## ToolbarTargetAreas

`ToolbarTargetAreas` is a `[Flags]` enum describing the editing contexts in which a tool or group should be visible. `EditorToolbar` detects the active context on every selection change and propagates them to `AreaAware` children.

| Flag | Caret context |
|---|---|
| `Text` | The caret is in any text-editable position. |
| `Block` | The caret is in a block-level context. |
| `Table` | The caret is in a table. |
| `List` | The caret is in a list. |
| `All` | Always visible. (Default) |

If required, you can combine `ToolbarTargetAreas` to make a tool visible in multiple contexts.

```xml
<ToolbarGroup Classes="AreaAware" TargetAreas="Text,List">
```

## Managing the overflow menu

The overflow menu is the "..." button at the end of the toolbar. When the toolbar runs out of horizontal space, `EditorToolbar` collapses tools into this menu, starting from right to left by default.

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

- **Inline formatting**: Bold, Italic, Underline, Strikethrough, Link
- **List toggles**: Bullet, Numbered
- **Block configuration**: Background color, Borders, Text alignment

The mini-bar anchors to the block containing the selection, rather than the pointer.

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
- Table operations (Insert/Delete row, Insert/Delete column, Delete table) — visible only when the caret is inside a table.

`EditorContextMenu` can read `TargetAreas` on each `EditorMenuItem` in order to hide items that don't apply to the current context. Unused separator lines left by hidden groups are also hidden automatically.

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
- [Extension Patterns](/controls/input/text-input/richtexteditor-guides/extension-patterns.md)
- [Performance Tuning](/controls/input/text-input/richtexteditor-guides/performance-tuning.md)
- [Troubleshooting: RichTextEditor](/troubleshooting/controls/richtexteditor)
