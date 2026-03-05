---
id: gridsplitter
title: GridSplitter
---

The `GridSplitter` control allows a user to resize the columns or rows in a grid at runtime. The splitter is drawn as a column or row (size can be specified), and has a grip that the user can manipulate at runtime.

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
|---|---|---|
| `Background` | `IBrush` | Background color for the splitter bar. |
| `ResizeDirection` | `GridResizeDirection` | The direction of travel for the splitter: `Auto`, `Columns`, `Rows`. See note below. |
| `ResizeBehavior` | `GridResizeBehavior` | Which columns/rows are resized: `BasedOnAlignment`, `CurrentAndNext`, `PreviousAndCurrent`, `PreviousAndNext`. |
| `DragIncrement` | `double` | The minimum number of pixels the splitter moves at a time. |
| `ShowsPreview` | `bool` | When `true`, shows a preview line while dragging instead of resizing in real-time. |

:::caution
To provide any meaningful movement, the direction of travel of the splitter must be the same as its position definition. That is: for a column splitter specify `ResizeDirection="Columns"` and for a row splitter specify `ResizeDirection="Rows"`.
:::

## Examples

This is a column splitter. Drag the border of the columns to resize.

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

## Min/Max Constraints

Set minimum and maximum sizes on the columns or rows to limit how far the splitter can move:

```xml
<Grid ColumnDefinitions="200,4,*">
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

This is a row splitter. Drag the border of the rows to resize.

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

- [GridSplitter API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_GridSplitter)
- [`GridSplitter.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/GridSplitter.cs)
