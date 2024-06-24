---
description: REFERENCE - Built-in Controls
---

import GridSplitterColumnsScreenshot from '/img/reference/controls/gridsplitter/gridsplitter-columns.gif';
import GridSplitterRowsScreenshot from '/img/reference/controls/gridsplitter/gridsplitter-rows.gif';

# GridSplitter 网格分割器

网格分割器控件允许用户在运行时调整网格中的列或行的大小。分割器被绘制为一列或一行（可以指定大小），并具有一个用户可以在运行时操作的把手。

## 常用属性

你可能最常使用这些属性：

| 属性                   | 描述                             |
| ---------------------- | -------------------------------- |
| `Background`           | 分割条的背景颜色。               |
| `Grid.Column`          | 附加属性，用来指定分割器的列位置。|
| `Grid.Row`             | 附加属性，用来指定分割器的行位置。|
| `ResizeDirection`      | 分割器的移动方向。（见下面的注释）|

:::warning
为了提供任何有意义的移动，分割器的移动方向必须与其位置定义相同。即：对于列分割器指定 `ResizeDirection="Columns"`，对于行分割器指定 `ResizeDirection="Rows"`。
:::

## 示例

这是一个列分割器：

```xml
<Grid ColumnDefinitions="*, 4, *">
    <Rectangle Grid.Column="0" Fill="Blue"/>
    <GridSplitter Grid.Column="1" Background="Black" ResizeDirection="Columns"/>
    <Rectangle Grid.Column="2" Fill="Red"/>
</Grid>
```

<img src={GridSplitterColumnsScreenshot} alt=""/>

这是一个行分割器：

```xml
<Grid RowDefinitions="*, 4, *">
    <Rectangle Grid.Row="0" Fill="Blue"/>
    <GridSplitter Grid.Row="1" Background="Black" ResizeDirection="Rows"/>
    <Rectangle Grid.Row="2" Fill="Red"/>
</Grid>
```

<img src={GridSplitterRowsScreenshot} alt=""/>

## 更多信息

:::info
查看此控件的完整 API 文档，请访问[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/GridSplitter/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`GridSplitter.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/GridSplitter.cs)
:::