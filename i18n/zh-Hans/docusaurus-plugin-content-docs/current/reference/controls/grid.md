---
description: REFERENCE - Controls
---

import GridSpanningColumnsScreenshot from '/img/reference/controls/grid/grid-column-spanning.png';

# Grid

The grid control is useful for arranging child controls in columns and rows. You can define absolute, relative, or proportional row and column geometries for the grid.

Each child control in the grid can be positioned in a cell of the grid, using column and row coordinates. These are zero-based, and both have a zero default.

If you position more than one child control in a cell, they will be drawn in that cell in the sequence they appear in the XAML.

:::warning
If you omit column and row coordinates for the child controls of a grid, they will all be drawn in the top left corner (column=0, row=0).
:::

It is also possible to make a child control span more than one cell in either rows or columns, or both.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="235">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>ColumnDefinitions</code></td><td>Required - a size definition describing the columns in the grid.</td></tr><tr><td><code>RowDefinitions</code></td><td>Required - a size definition describing the rows in the grid.</td></tr><tr><td><code>ShowGridLines</code></td><td>Boolean. Show the gridlines (as dashed lines).</td></tr><tr><td><code>Grid.Column</code></td><td>Attached property to assign the column part of the cell where the child a control into a zero based column</td></tr><tr><td><code>Grid.Row</code></td><td>Attached property to assign a control into a zero based row</td></tr><tr><td><code>Grid.ColumnSpan</code></td><td>Attached property to define the number of columns a control will span</td></tr><tr><td><code>Grid.RowSpan</code></td><td>Attached property to define the number of rows a control will span</td></tr></tbody></table>

### Size Definitions

You can define the size of rows and columns as:

* Absolute (integer) 
* Relative to container
* Automatic - size to fit the contained child control

The size definitions can be written either as a list of short codes, or fully expanded using XAML elements.

#### Absolute Size Definitions

Absolute size definitions are written as integers in the list format. For example:

`ColumnDefinitions="200, 200, 300"`

Using full expanded XAML, this is the same as:

```xml
<Grid>
   <Grid.ColumnDefinitions>
       <ColumnDefinition Width="200"></ColumnDefinition>
       <ColumnDefinition Width="200"></ColumnDefinition>
       <ColumnDefinition Width="300"></ColumnDefinition>
   </Grid.ColumnDefinitions>
</Grid>
```

#### Relative Size Definitions

Relative size definitions are written as proportions of the relevant dimension of the grid's container, using an asterisk. For example, to create two columns with the same width and then one with twice the width:

`ColumnDefinitions="*, *, 2*"`

Using full expanded XAML, this is the same as:

```xml
<Grid>
   <Grid.ColumnDefinitions>
       <ColumnDefinition Width="*"></ColumnDefinition>
       <ColumnDefinition Width="*"></ColumnDefinition>
       <ColumnDefinition Width="2*"></ColumnDefinition>
   </Grid.ColumnDefinitions>
</Grid>
```

#### Automatic Size Definitions

To size a row or column automatically to the largest child control in it, use the code 'Auto'.  For example:

`RowDefinitions="Auto, Auto, Auto"`

Using full expanded XAML, this is the same as:

```xml
<Grid>
   <Grid.RowDefinitions>
       <RowDefinition Height="Auto"></RowDefinition>
       <RowDefinition Height="Auto"></RowDefinition>
       <RowDefinition Height="Auto"></RowDefinition>
   </Grid.RowDefinitions>
</Grid>
```

:::warning
If a child control has its own dimensions these will be obeyed when it is drawn. This means that if it is larger than its grid cell, it will overlap adjacent cells.
:::

#### Mixing Size Definitions

You can mix any of the above in the same size definition sequence. For example:

`ColumnDefinitions="200, *, 2*"`

Using full expanded XAML, this is the same as:

```xml
<Grid>
   <Grid.ColumnDefinitions>
       <ColumnDefinition Width="200"></ColumnDefinition>
       <ColumnDefinition Width="*"></ColumnDefinition>
       <ColumnDefinition Width="2*"></ColumnDefinition>
   </Grid.ColumnDefinitions>
</Grid>
```

## Drawing Rules

When calculating sizes, any proportional columns are made to fit in the space left after the absolute and automatic values have been calculated.

The calculation for automatic sizing is made using the outside of the margin layout zone of a child control.

:::info
To review the concept of control layout zones, see [here](../../concepts/layout/layout-zones). 
:::

Child controls are drawn in their assigned grid cells in the sequence they appear in the XAML. This rule governs both what happens when two child controls are assigned the same cell, and how child controls overlap when they are larger than their allotted cell.

When a child control has its own dimensions , and is smaller than its assigned cell, it will be drawn aligned in the cell according to its horizontal and vertical alignment properties (both are centered by default).

## Example

This example shows:

* How to use the shortened syntax for column and row definitions.
* How to mix absolute and proportional column widths.
* How to assign the cell for child controls.
* How to span rows and columns.

An example of a Grid with 3 equal Rows and 3 Columns with (1 fixed width), (2 grabbing the rest proportionally) would be:

```xml
<Grid ColumnDefinitions="100,1.5*,4*" RowDefinitions="Auto,Auto,Auto"  Margin="4">
  <TextBlock Text="Col0Row0:" Grid.Row="0" Grid.Column="0"/>
  <TextBlock Text="Col0Row1:" Grid.Row="1" Grid.Column="0"/>
  <TextBlock Text="Col0Row2:" Grid.Row="2" Grid.Column="0"/>
  <CheckBox Content="Col2Row0" Grid.Row="0" Grid.Column="2"/>
  <Button Content="SpansCol1-2Row1-2" Grid.Row="1" Grid.Column="1" Grid.RowSpan="2" Grid.ColumnSpan="2"/>
</Grid>
```

Here, after the absolute width 100 has been subtracted (for column 0), column 1 will get 1.5 parts and column 2 will get 4 parts of the remaining width.

The button is drawn to fill the span from the cell (column 1, row 1) plus one column (to the right) and one row down. The result looks like this:

<img src={GridSpanningColumnsScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Grid/).
:::

:::info
View the source code on _GitHub_ [`Grid.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Grid.cs)
:::
