---
id: gridsplitter
title: GridSplitter
---

The `GridSplitter` control allows a user to resize the columns or rows in a grid at runtime. The splitter is drawn as a column or row (size can be specified), and has a grip that the user can manipulate at runtime.

## Useful properties

You will probably use these properties most often:

<table><thead><tr><th width="261">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Background</code></td><td>Background color for the splitter bar.</td></tr><tr><td><code>Grid.Column</code></td><td>Attached to give the (column) position of the splitter.</td></tr><tr><td><code>Grid.Row</code></td><td>Attached to give the (row) position of the splitter.</td></tr><tr><td><code>ResizeDirection</code></td><td>The direction of travel for the splitter. (See note below.)</td></tr></tbody></table>

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
