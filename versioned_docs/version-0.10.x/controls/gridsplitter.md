---
id: gridsplitter
title: GridSplitter
---

The `GridSplitter` control is a control that allows a user to resize the space between `Grid` rows or columns.

```markup
<Grid ColumnDefinitions="*, 4, *">
    <Rectangle Grid.Column="0" Fill="Blue"/>
    <GridSplitter Grid.Column="1" Background="Black" ResizeDirection="Columns"/>
    <Rectangle Grid.Column="2" Fill="Red"/>
</Grid>
```

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/gridsplitter/gridsplitter-in-action-columns.gif" alt="GridSplitter in Action for Columns" />
  </div>

```markup
<Grid RowDefinitions="*, 4, *">
    <Rectangle Grid.Row="0" Fill="Blue"/>
    <GridSplitter Grid.Row="1" Background="Black" ResizeDirection="Rows"/>
    <Rectangle Grid.Row="2" Fill="Red"/>
</Grid>
```

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/gridsplitter/gridsplitter-in-action-rows.gif" alt="GridSplitter in Action for Rows" />
  </div>

### Reference <a id="reference"></a>

[GridSplitter](http://reference.avaloniaui.net/api/Avalonia.Controls/GridSplitter/)

### Source code <a id="source-code"></a>

[GridSplitter.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/GridSplitter.cs)
