---
id: gridsplitter
title: GridSplitter
description: A control that lets users resize columns or rows in a Grid by dragging a splitter bar at runtime.
doc-type: reference
---

The [`GridSplitter`](/api/avalonia/controls/gridsplitter) control allows a user to resize the columns or rows in a `Grid` at runtime. The splitter is drawn as a column or row (size can be specified), and has a grip that the user can manipulate at runtime.

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
|---|---|---|
| `Background` | `IBrush` | Background color for the splitter bar. |
| `ResizeDirection` | `GridResizeDirection` | The direction of travel for the splitter: `Auto`, `Columns`, `Rows`. See note below. |
| `ResizeBehavior` | `GridResizeBehavior` | Which columns/rows are resized: `BasedOnAlignment`, `CurrentAndNext`, `PreviousAndCurrent`, `PreviousAndNext`. |
| `DragIncrement` | `double` | The minimum number of pixels the splitter moves at a time. |
| `ShowsPreview` | `bool` | When `true`, shows a preview line while dragging instead of resizing in real time. |

:::caution
To provide any meaningful movement, the direction of travel of the splitter must be the same as its position definition. That is: for a column splitter specify `ResizeDirection="Columns"` and for a row splitter specify `ResizeDirection="Rows"`.
:::

## Drag behavior

When the user clicks and drags the `GridSplitter`, adjacent columns or rows are resized according to the `ResizeBehavior` property:

- **`BasedOnAlignment`** (default): The columns or rows that are resized depend on the `HorizontalAlignment` or `VerticalAlignment` of the splitter within its cell.
- **`CurrentAndNext`**: Resizes the current column/row and the next one.
- **`PreviousAndCurrent`**: Resizes the previous column/row and the current one.
- **`PreviousAndNext`**: Resizes the previous column/row and the next one, skipping the splitter's own column/row.

If you set `ShowsPreview` to `true`, a translucent preview indicator follows your pointer while dragging. The actual resize is applied only when you release the mouse button. This can improve performance for complex layouts.

The `DragIncrement` property controls the snap granularity. For example, setting `DragIncrement="10"` means the splitter position snaps in increments of 10 pixels.

## Min/max constraints

You can set `MinWidth`/`MaxWidth` on `ColumnDefinition` elements (or `MinHeight`/`MaxHeight` on `RowDefinition` elements) to limit how far the splitter can travel. The `GridSplitter` respects these constraints automatically, so the user cannot drag beyond the defined limits.

```xml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="200" MinWidth="100" MaxWidth="400" />
        <ColumnDefinition Width="4" />
        <ColumnDefinition Width="*" MinWidth="200" />
    </Grid.ColumnDefinitions>
    <Border Grid.Column="0" Background="LightBlue">
        <TextBlock Text="Sidebar (100-400px)" Margin="8" />
    </Border>
    <GridSplitter Grid.Column="1" Background="Gray" ResizeDirection="Columns" />
    <Border Grid.Column="2" Background="LightGreen">
        <TextBlock Text="Content (min 200px)" Margin="8" />
    </Border>
</Grid>
```

## Keyboard support

The `GridSplitter` supports keyboard interaction for accessibility. When the splitter has focus, you can use the following keys:

| Key | Action |
|---|---|
| `Left` / `Right` | Moves a column splitter left or right. |
| `Up` / `Down` | Moves a row splitter up or down. |

Each key press moves the splitter by the amount specified in `DragIncrement` (defaults to 1 pixel).

## Examples

This is a column splitter. Drag the border between the columns to resize them.

<XamlPreview>

```xml
<Grid xmlns="https://github.com/avaloniaui"
      ColumnDefinitions="*, 4, *">
    <Rectangle Grid.Column="0" Fill="Blue"/>
    <GridSplitter Grid.Column="1" Background="Black" ResizeDirection="Columns"/>
    <Rectangle Grid.Column="2" Fill="Red"/>
</Grid>
```

</XamlPreview>

This is a row splitter. Drag the border between the rows to resize them.

<XamlPreview>

```xml
<Grid xmlns="https://github.com/avaloniaui"
      RowDefinitions="*, 4, *">
    <Rectangle Grid.Row="0" Fill="Blue"/>
    <GridSplitter Grid.Row="1" Background="Black" ResizeDirection="Rows"/>
    <Rectangle Grid.Row="2" Fill="Red"/>
</Grid>
```

</XamlPreview>

## See also

- [Grid](grid.md)
- [GridSplitter API reference](/api/avalonia/controls/gridsplitter)
- [`GridSplitter.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/GridSplitter.cs)
