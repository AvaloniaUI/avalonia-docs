---
id: toolbar
title: Toolbar and Selection Flyout
doc-type: guide
tags:
 - avalonia pro
 - avalonia enterprise
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide covers customizing the `RichTextEditor` toolbar, the selection mini-bar, and the right-click context menu.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## Toolbar architecture

The toolbar system separates UI presentation from behavioral logic. `EditorToolbar` is a `TemplatedControl` with a strongly-typed `Tools` collection (`AvaloniaList<EditorTool>`) marked as the `[Content]` property — XAML children are added to `Tools` automatically and can only be `EditorTool` instances. Action-bearing tools derive from `ActionTool` (which adds `Action`/`Icon`/`ToolTipText`); separators and groups derive from `EditorTool` directly.

```
RichTextEditor
  └─ EditorToolbar            (TemplatedControl with [Content] Tools : AvaloniaList<EditorTool>)
       ├─ ToolbarGroup        (EditorTool with [Content] Tools — collective visibility)
       │    ├─ ButtonTool     (ActionTool)
       │    ├─ ToggleTool     (ActionTool)
       │    └─ ...
       ├─ SeparatorTool       (EditorTool, no action surface)
       └─ OverflowTool        (ActionTool — "..." button, hosts collapsed tools)
```

Both `EditorToolbar` and `ToolbarGroup` use a `Panel` template part named `PART_ItemsHost`. The default theme uses a `WrapPanel`; the toolbar embedded inside `RichTextEditor` uses a horizontal `StackPanel`. Re-template either control with any panel type to change the layout.

**Namespaces used in this guide:**

```csharp
using Avalonia.Controls.Documents.Primitives.Toolbar; // EditorToolbar, tools, groups
using Avalonia.Controls.Documents.Primitives.Actions; // EditorActions, IEditorAction
using Avalonia.Controls.Documents.Primitives.Adorners; // ToolbarTargetAreas
using Avalonia.Controls.Documents.Primitives; // EditorSelectionFlyout, EditorContextMenu
```

All of these types are also available in XAML under the default Avalonia namespace (`https://github.com/avaloniaui`).

---

## Tool types

Action-bearing tools derive from `ActionTool` (which exposes `Action`, `Icon`, `ToolTipText`). `SeparatorTool` and `ToolbarGroup` derive from `EditorTool` directly and do not carry action surface.

| Class | Base | Widget | Use case |
|---|---|---|---|
| `ButtonTool` | `ActionTool` | Button | One-shot commands: Undo, Redo, Cut, Copy, Paste |
| `ToggleTool` | `ActionTool` | ToggleButton | Formatting toggles: Bold, Italic, Underline |
| `ListToggleTool` | `ToggleTool` | ToggleButton | List toggles that also reflect the active marker style |
| `ComboBoxTool` | `ActionTool` | ComboBox | Property selection: FontFamily, FontSize |
| `ColorPickerTool` | `ColorTool` | Split button + color picker flyout | Pick an arbitrary color |
| `ColorSwatchTool` | `ColorTool` | Split button + swatch palette flyout | Pick from a fixed palette |
| `AlignmentFlyoutTool` | `ActionTool` | Button with flyout | Text alignment (Left, Center, Right, Justify) |
| `BorderFlyoutTool` | `ActionTool` | Button with flyout | Block border configuration |
| `HyperlinkFlyoutTool` | `ActionTool` | Button with flyout | Insert/edit hyperlinks |
| `TablePickerTool` | `ActionTool` | Grid picker | Insert a table by dragging over a grid |
| `SeparatorTool` | `EditorTool` | Vertical line | Visual separator |
| `OverflowTool` | `ActionTool` | Button with MenuFlyout | Hosts collapsed tools — place last in toolbar |

---

## Replacing the default toolbar

### Inline replacement

Assign `RichTextEditor.Toolbar` to replace the built-in toolbar entirely:

```xml
<RichTextEditor x:Name="Editor">
  <RichTextEditor.Toolbar>
    <EditorToolbar>
      <ButtonTool Action="{x:Static EditorActions.Undo}" />
      <ButtonTool Action="{x:Static EditorActions.Redo}" />
      <SeparatorTool />
      <ToggleTool Action="{x:Static EditorActions.Bold}" />
      <ToggleTool Action="{x:Static EditorActions.Italic}" />
      <ToggleTool Action="{x:Static EditorActions.Underline}" />
    </EditorToolbar>
  </RichTextEditor.Toolbar>
</RichTextEditor>
```

### Standalone toolbar

Place the toolbar outside the `RichTextEditor` and wire it explicitly. Set `ShowToolbar="False"` to hide the built-in toolbar:

```xml
<StackPanel>
  <EditorToolbar x:Name="MyToolbar">
    <ToggleTool Action="{x:Static EditorActions.Bold}" />
    <ToggleTool Action="{x:Static EditorActions.Italic}" />
    <ComboBoxTool Action="{x:Static EditorActions.FontFamily}" Width="170" />
  </EditorToolbar>

  <RichTextEditor x:Name="MyEditor" ShowToolbar="False" />
</StackPanel>
```

```csharp
MyToolbar.Editor = MyEditor;
```

### Hiding the toolbar

```xml
<RichTextEditor ShowToolbar="False" />
```

---

## Grouping tools with ToolbarGroup

`ToolbarGroup` groups related tools and can show or hide the entire group based on the editing context (text, list, table, etc.). Apply the `AreaAware` style class so the group receives context updates from the parent `EditorToolbar`.

```xml
<EditorToolbar>
  <!-- Always-visible group — no AreaAware needed -->
  <ToolbarGroup>
    <ButtonTool Action="{x:Static EditorActions.Undo}" />
    <ButtonTool Action="{x:Static EditorActions.Redo}" />
  </ToolbarGroup>

  <SeparatorTool />

  <!-- Visible only in text-editing context -->
  <ToolbarGroup Classes="AreaAware" TargetAreas="Text">
    <ToggleTool Action="{x:Static EditorActions.Bold}" />
    <ToggleTool Action="{x:Static EditorActions.Italic}" />
    <ToggleTool Action="{x:Static EditorActions.Underline}" />
  </ToolbarGroup>

  <SeparatorTool />

  <!-- Visible only when the caret is inside a table -->
  <ToolbarGroup Classes="AreaAware" TargetAreas="Table">
    <ButtonTool Action="{x:Static EditorActions.InsertRowAfter}" />
    <ButtonTool Action="{x:Static EditorActions.DeleteRow}" />
    <ButtonTool Action="{x:Static EditorActions.InsertColumnAfter}" />
    <ButtonTool Action="{x:Static EditorActions.DeleteColumn}" />
  </ToolbarGroup>
</EditorToolbar>
```

### ToolbarTargetAreas

`ToolbarTargetAreas` is a `[Flags]` enum that defines which editing context a tool or group is relevant for:

| Value | Meaning |
|---|---|
| `Text` | Caret is in a text-editable position |
| `Block` | Block-level element (alignment, border) |
| `Table` | Caret is inside a `Table` |
| `List` | Caret is inside a `List` |
| `All` | Always visible (default) |

Values can be combined: `TargetAreas="Text,List"` makes a group visible when the caret is in text context or inside a list.

---

## Overflow menu

When the toolbar is narrower than its content, tools collapse into an overflow "..." button (`OverflowTool`). A tool is collapsible when it has an `OverflowMenuItem` set. The overflow representation can be a plain `EditorMenuItem` or a specialized subclass.

```xml
<EditorToolbar>
  <!-- Tool with overflow representation -->
  <ToggleTool Action="{x:Static EditorActions.Bold}">
    <ToggleTool.OverflowMenuItem>
      <EditorMenuItem Action="{x:Static EditorActions.Bold}" />
    </ToggleTool.OverflowMenuItem>
  </ToggleTool>

  <!-- Font family combo with font-preview overflow -->
  <ComboBoxTool Action="{x:Static EditorActions.FontFamily}" Width="170">
    <ComboBoxTool.OverflowMenuItem>
      <FontFamilyMenuItem Action="{x:Static EditorActions.FontFamily}" />
    </ComboBoxTool.OverflowMenuItem>
  </ComboBoxTool>

  <!-- Font size combo with property-list overflow -->
  <ComboBoxTool Action="{x:Static EditorActions.FontSize}">
    <ComboBoxTool.OverflowMenuItem>
      <PropertyMenuItem Action="{x:Static EditorActions.FontSize}" />
    </ComboBoxTool.OverflowMenuItem>
  </ComboBoxTool>

  <!-- Color tool with palette overflow -->
  <ColorPickerTool Action="{x:Static EditorActions.ForegroundColor}">
    <ColorPickerTool.OverflowMenuItem>
      <ColorMenuItem Action="{x:Static EditorActions.ForegroundColor}" Header="Text Color" />
    </ColorPickerTool.OverflowMenuItem>
  </ColorPickerTool>

  <!-- Alignment flyout with submenu overflow -->
  <AlignmentFlyoutTool>
    <AlignmentFlyoutTool.OverflowMenuItem>
      <TextAlignmentMenuItem Header="Text Alignment" />
    </AlignmentFlyoutTool.OverflowMenuItem>
  </AlignmentFlyoutTool>

  <!-- Tool with NO OverflowMenuItem — never collapses -->
  <ButtonTool Action="{x:Static EditorActions.Undo}" />

  <!-- Overflow button — always place last -->
  <OverflowTool />
</EditorToolbar>
```

To pin a tool so it never collapses even though it has an `OverflowMenuItem`, set `CanCollapseOverride="False"`:

```xml
<ToggleTool Action="{x:Static EditorActions.Bold}" CanCollapseOverride="False">
  <ToggleTool.OverflowMenuItem>
    <EditorMenuItem Action="{x:Static EditorActions.Bold}" />
  </ToggleTool.OverflowMenuItem>
</ToggleTool>
```

### Specialized overflow menu item types

| Type | Description |
|---|---|
| `EditorMenuItem` | Basic action menu item. Header and gesture auto-populated from the action. |
| `PropertyMenuItem` | Submenu auto-populated from `IPropertyAction.GetAvailableValues()`. |
| `FontFamilyMenuItem` | Font family submenu with live typeface preview per item. |
| `ColorMenuItem` | Color palette submenu with swatch icons. |
| `TextAlignmentMenuItem` | Alignment submenu (Left, Center, Right, Justify) with glyphs. |

---

## Selection mini-bar

The selection mini-bar (`EditorSelectionFlyout`) opens automatically above a non-empty selection. It is an `EditorSelectionFlyout` — a `Flyout` subclass that hosts an inner `EditorToolbar`.

### Hiding the mini-bar

```xml
<!-- Hide without removing -->
<RichTextEditor ShowSelectionFlyout="False" />
```

```csharp
editor.ShowSelectionFlyout = false;
```

### Suppressing the mini-bar

Set `SelectionFlyout` to `null` to remove it entirely:

```xml
<RichTextEditor SelectionFlyout="{x:Null}" />
```

### Replacing the mini-bar

Assign a custom `EditorSelectionFlyout` to `RichTextEditor.SelectionFlyout`. The inner `EditorToolbar` is wired to the editor automatically when the flyout opens.

The outer `Border` named `PART_Chrome` is required — the editor uses it to distinguish the chrome from the surrounding shadow gutter for dismiss handling.

```xml
<RichTextEditor x:Name="Editor">
  <RichTextEditor.SelectionFlyout>
    <EditorSelectionFlyout Placement="TopEdgeAlignedLeft"
                           OverlayDismissEventPassThrough="True">
      <Border Name="PART_Chrome" Classes="EditorMiniBarChrome">
        <EditorToolbar>
          <ToolbarGroup Classes="AreaAware" TargetAreas="Text">
            <ToggleTool Action="{x:Static EditorActions.Bold}" />
            <ToggleTool Action="{x:Static EditorActions.Italic}" />
            <ToggleTool Action="{x:Static EditorActions.Underline}" />
          </ToolbarGroup>
          <SeparatorTool />
          <ToolbarGroup Classes="AreaAware" TargetAreas="Text">
            <ColorSwatchTool Action="{x:Static EditorActions.ForegroundColor}" />
          </ToolbarGroup>
        </EditorToolbar>
      </Border>
    </EditorSelectionFlyout>
  </RichTextEditor.SelectionFlyout>
</RichTextEditor>
```

The `EditorMiniBarChrome` style class applies compact sizing with rounded corners and a subtle drop shadow.

---

## Right-click context menu

The default context menu is an `EditorContextMenu` — a `MenuFlyout` subclass with context-aware `EditorMenuItem` visibility. Items that use `TargetAreas` are automatically hidden when the caret is not in the relevant context, and surrounding `Separator` controls collapse to avoid double separators.

### Replacing the context menu

Set `RichTextEditor.ContextFlyout` without redefining the control template:

```xml
<RichTextEditor>
  <RichTextEditor.ContextFlyout>
    <EditorContextMenu Placement="Pointer">
      <EditorMenuItem Header="Cut"        Action="{x:Static EditorActions.Cut}" />
      <EditorMenuItem Header="Copy"       Action="{x:Static EditorActions.Copy}" />
      <EditorMenuItem Header="Paste"      Action="{x:Static EditorActions.Paste}" />
      <Separator />
      <EditorMenuItem Header="Select All" Action="{x:Static EditorActions.SelectAll}" />
      <Separator />
      <!-- Table items — hidden when caret is not inside a table -->
      <EditorMenuItem Header="Insert row below"    Action="{x:Static EditorActions.InsertRowAfter}"    TargetAreas="Table" />
      <EditorMenuItem Header="Delete row"          Action="{x:Static EditorActions.DeleteRow}"         TargetAreas="Table" />
      <Separator />
      <EditorMenuItem Header="Insert column after" Action="{x:Static EditorActions.InsertColumnAfter}" TargetAreas="Table" />
      <EditorMenuItem Header="Delete column"       Action="{x:Static EditorActions.DeleteColumn}"      TargetAreas="Table" />
      <Separator />
      <EditorMenuItem Header="Delete table"        Action="{x:Static EditorActions.DeleteTable}"       TargetAreas="Table" />
    </EditorContextMenu>
  </RichTextEditor.ContextFlyout>
</RichTextEditor>
```

### Removing the context menu

```xml
<RichTextEditor ContextFlyout="{x:Null}" />
```

---

## Creating a custom tool

Subclass `EditorTool` for a passive widget (status display, decorative chip, etc.) and override `OnEditorHostAttached` to react when an editor host becomes available. For an action-bound tool, subclass `ActionTool` instead — it adds `Action`/`Icon`/`ToolTipText` and an `UpdateState()` virtual driven by editor host events.

`EditorHost` is the resolved `IInteractiveTextHost` (set automatically by the attach logic). For tools that need to react to selection/document changes continuously, derive from `ActionTool` and override `UpdateState()` — the base class subscribes you to the relevant editor events automatically.

For a full worked example, see [Customizing the toolbar — Creating a custom tool](/controls/input/text-input/richtexteditor-guides/toolbar-customization#creating-a-custom-tool).

---

## Migration from earlier `EditorToolbar` API

If you have existing code that uses the legacy `ItemsControl`-based surface, update it as follows:

| Before | After |
|---|---|
| `EditorToolbar.Items` / `ToolbarGroup.Items` | `Tools` (typed `AvaloniaList<EditorTool>`, `[Content]`) |
| `EditorToolbar.ItemsPanel` / `ItemsSource` | Removed. Re-template the toolbar with a `Panel` named `PART_ItemsHost`. |
| `EditorToolbar`/`ToolbarGroup` derived from `ItemsControl` | Both are now `TemplatedControl`. `ToolbarGroup` derives from `EditorTool`. |
| `EditorTool.Action` / `Icon` / `ToolTipText` | Moved to `ActionTool`. Custom action-bound tools should derive from `ActionTool` (passive tools stay on `EditorTool`). |

Implicit XAML child syntax (`<EditorToolbar><ToolbarGroup>…</ToolbarGroup></EditorToolbar>`) is unchanged — children are added to `Tools` via the `[Content]` attribute. Only explicit `<EditorToolbar.Items>` / `<EditorToolbar.ItemsPanel>` element-form usages need renaming. In code, replace `toolbar.Items.Add(...)` with `toolbar.Tools.Add(...)`.

---

## See also

- [RichTextEditor reference](/controls/input/text-input/richtexteditor)
- [Extension Patterns](/controls/input/text-input/richtexteditor-guides/extension-patterns) — custom document nodes, highlight layers, serializers, components
