---
id: uniformgrid
title: UniformGrid
description: A panel that arranges its children in a grid where every cell is the same size.
doc-type: reference
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [`UniformGrid`](/api/avalonia/controls/primitives/uniformgrid) divides available space into equally sized cells. You can specify how many rows and columns to create, and each child control is placed into the next available cell in the order it appears. Unlike `Grid`, you do not need to define row and column definitions or assign children to specific cells. This makes `UniformGrid` a good choice when you need a simple, evenly spaced layout such as a toolbar, color palette, or icon grid.

## Common properties

| Property | Type | Description |
|---|---|---|
| `Rows` | `int` | Sets the number of equal rows. When set to `0` (the default), the row count is calculated automatically based on the number of children and the `Columns` value. |
| `Columns` | `int` | Sets the number of equal columns. When set to `0` (the default), the column count is calculated automatically based on the number of children and the `Rows` value. |
| `FirstColumn` | `int` | Sets the column offset for the first child element. Use this to leave empty cells at the beginning of the first row. |
| `RowSpacing` | `double` | Sets the vertical gap between rows. |
| `ColumnSpacing` | `double` | Sets the horizontal gap between columns. |

## How sizing works

When you set both `Rows` and `Columns`, the grid creates exactly that many cells. If you set only one dimension, the other is calculated automatically so that every child fits. If you set neither, `UniformGrid` defaults to a square-ish arrangement.

Each cell is the same width and the same height. The cell size is determined by dividing the total available space (minus spacing) equally among the cells in each direction. Children are stretched to fill their cell by default, but you can control this with `HorizontalAlignment` and `VerticalAlignment` on the individual child controls.

## Basic example

The following example creates a single-row grid with three equally sized colored rectangles.

<XamlPreview>

```xml
<UniformGrid xmlns="https://github.com/avaloniaui"
             Rows="1" Columns="3"
             ColumnSpacing="10"
             Margin="20">
    <Rectangle Fill="Navy" />
    <Rectangle Fill="White" />
    <Rectangle Fill="Red" />
</UniformGrid>
```

</XamlPreview>

## Multi-row grid example

The following example creates a `UniformGrid` with 3 rows and 4 columns and fills it with 12 rectangles. Each `Rectangle` is automatically assigned to the next cell in row-major order.

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<UniformGrid Rows="3" Columns="4">
  <Rectangle Width="50" Height="50" Fill="#330000"/>
  <Rectangle Width="50" Height="50" Fill="#660000"/>
  <Rectangle Width="50" Height="50" Fill="#990000"/>
  <Rectangle Width="50" Height="50" Fill="#CC0000"/>
  <Rectangle Width="50" Height="50" Fill="#FF0000"/>
  <Rectangle Width="50" Height="50" Fill="#FF3300"/>
  <Rectangle Width="50" Height="50" Fill="#FF6600"/>
  <Rectangle Width="50" Height="50" Fill="#FF9900"/>
  <Rectangle Width="50" Height="50" Fill="#FFCC00"/>
  <Rectangle Width="50" Height="50" Fill="#FFFF00"/>
  <Rectangle Width="50" Height="50" Fill="#FFFF33"/>
  <Rectangle Width="50" Height="50" Fill="#FFFF66"/>
</UniformGrid>
```

</TabItem>
<TabItem value="cs">

```csharp
// Create the UniformGrid
var myUniformGrid = new UniformGrid
{
    Rows = 3,
    Columns = 4
};

// Add 12 rectangles with a color gradient
for (int i = 0; i < 12; i++)
{
    var rectangle = new Rectangle
    {
        Fill = new SolidColorBrush(Color.FromRgb((byte)(i * 20), 0, 0)),
        Width = 50,
        Height = 50
    };
    myUniformGrid.Children.Add(rectangle);
}
```

</TabItem>

</Tabs>

## Using `FirstColumn`

You can use the `FirstColumn` property to offset the first child, leaving empty cells at the start of the first row. This is useful when you want to create a layout where the content does not begin at the leftmost cell.

```xml
<UniformGrid Rows="2" Columns="3" FirstColumn="1">
  <Button Content="A" />
  <Button Content="B" />
  <Button Content="C" />
  <Button Content="D" />
  <Button Content="E" />
</UniformGrid>
```

In this example, the first cell in the first row is empty. Button "A" appears in the second column of the first row.

## Tips

- If you need cells of different sizes, use `Grid` instead.
- When you add more children than there are cells, extra children are still laid out but may appear outside the visible area.
- `UniformGrid` respects `Margin` on child controls, so you can add per-item spacing in addition to `RowSpacing` and `ColumnSpacing`.

## See also

- [Grid](grid)
- [WrapPanel](wrappanel)
- [StackPanel](stackpanel)
- [UniformGrid API reference](https://reference.avaloniaui.net/api/Avalonia.Controls.Primitives/UniformGrid/)

