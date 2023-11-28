---
id: gridsplitter
title: GridSplitter
---

import GridSplitterColumnsScreenshot from '/img/controls/gridsplitter/gridsplitter-in-action-columns.gif';
import GridSplitterRowsScreenshot from '/img/controls/gridsplitter/gridsplitter-in-action-rows.gif';

The `GridSplitter` control is a control that allows a user to resize the space between `Grid` rows or columns.

```markup
<Grid ColumnDefinitions="*, 4, *">
    <Rectangle Grid.Column="0" Fill="Blue"/>
    <GridSplitter Grid.Column="1" Background="Black" ResizeDirection="Columns"/>
    <Rectangle Grid.Column="2" Fill="Red"/>
</Grid>
```

<img className="center" src={GridSplitterColumnsScreenshot} alt="GridSplitter in Action for Columns" />

```markup
<Grid RowDefinitions="*, 4, *">
    <Rectangle Grid.Row="0" Fill="Blue"/>
    <GridSplitter Grid.Row="1" Background="Black" ResizeDirection="Rows"/>
    <Rectangle Grid.Row="2" Fill="Red"/>
</Grid>
```

<img className="center" src={GridSplitterRowsScreenshot} alt="GridSplitter in Action for Rows" />

### Reference

[GridSplitter](http://reference.avaloniaui.net/api/Avalonia.Controls/GridSplitter/)

### Source code

[GridSplitter.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/GridSplitter.cs)
