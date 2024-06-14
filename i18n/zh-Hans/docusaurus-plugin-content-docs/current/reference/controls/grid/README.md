---
title: 网格布局
description: REFERENCE - Controls
---

import GridSpanningColumnsScreenshot from '/img/reference/controls/grid/grid-column-spanning.png';

# Grid 网格布局

`Grid` 控件非常适用于按列和行排列子控件。您可以为 `Grid` 定义绝对大小、比例大小和自动大小的行和列几何形状。

每个位于 `Grid` 中的子控件都可以使用列和行坐标定位在 `Grid` 单元格中。这些坐标是从零开始的，并且默认值为零。

如果在同一单元格中定位多个子控件，它们将按照在 XAML 中出现的顺序在该单元格中绘制。这是实现层叠堆叠的另一种策略，除了使用 `Panel`。

:::warning
如果您忽略了 `Grid` 的子控件的列和行坐标，它们都将被绘制在左上角（列=0，行=0）。
:::

也可以使子控件跨越一个或多个单元格的行或列，或两者都跨越。

## 常用属性

您可能最常使用这些属性：

| 属性                     | 描述                                                           |
|------------------------|---------------------------------------------------------------|
| ColumnDefinitions      |  `Grid` 中列宽的尺寸定义。                                  |
| RowDefinitions         |  `Grid` 中行高的尺寸定义。                                  |
| ShowGridLines          | 显示单元格之间的网格线（作为虚线显示）。                        |
| Grid.Column            | 将控件布局到指定的从零开始的列中。                              |
| Grid.Row               | 将控件布局到指定的从零开始的行中。                              |
| Grid.ColumnSpan        | 将控件跨越一个或多个列。                                        |
| Grid.RowSpan           | 将控件跨越一个或多个行。                                        |
| Grid.IsSharedSizeScope | 定义控件为 `SharedSizeGroup` 的包含范围。                        |

## 尺寸定义

您可以如下定义行和列的大小：

* 绝对大小 - 以设备独立像素（整数）为单位。
* 比例大小 - 根据剩余 `Grid` 大小的比例。
* 自动大小 - 根据包含的子控件的大小自动调整。

尺寸定义可以通过简短代码列表或使用 XAML 元素完全展开来编写。

完整定义支持额外的约束，如 `SharedSizeGroup` 和指定最小和最大长度的绝对大小。

### 绝对大小定义

绝对大小定义在列网格式中以整数形式编写。例如：

`ColumnDefinitions="200, 200, 300"`

通过完全展开的 XAML 定义，这与以下相同：

```xml
<Grid>
   <Grid.ColumnDefinitions>
       <ColumnDefinition Width="200"></ColumnDefinition>
       <ColumnDefinition Width="200"></ColumnDefinition>
       <ColumnDefinition Width="300"></ColumnDefinition>
   </Grid.ColumnDefinitions>
</Grid>
```

### 比例大小定义

比例大小定义使用星号表示可用 `Grid` 空间的比例。例如，要创建两个宽度相同的列，然后是一个宽度是前两个的两倍（单个宽度的两倍）的列：

`ColumnDefinitions="*, *, 2*"`

通过完全展开的 XAML 定义，这与以下相同：

```xml
<Grid>
   <Grid.ColumnDefinitions>
       <ColumnDefinition Width="*"></ColumnDefinition>
       <ColumnDefinition Width="*"></ColumnDefinition>
       <ColumnDefinition Width="2*"></ColumnDefinition>
   </Grid.ColumnDefinitions>
</Grid>
```

:::tip
尺寸定义不支持百分比。一个解决方法是创建一个定义，其中所有比例值加起来等于 100，例如 `<Grid ColumnDefinitions="25*, 25*, 50*">` 用于 3 个列，每个列分别占剩余可用宽度的 25%、25% 和 50%。
:::

### 自动大小定义

要自动调整行或列的大小以适应其中最大的子控件，请使用 'Auto' 代码。例如：

`RowDefinitions="Auto, Auto, Auto"`

通过完全展开的 XAML 定义下相同：，这与以

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
如果子控件有自己显式设置的尺寸，当绘制时将遵循这些尺寸。这意味着如果它大于其网格单元格，它将重叠相邻的单元格。
:::

### 混合尺寸定义

您可以在同一尺寸定义序列中混合使用上述任何一种。例如：

`ColumnDefinitions="200, *, 2*"`

通过完全展开的 XAML 定义，这与以下相同：

```xml
<Grid>
   <Grid.ColumnDefinitions>
       <ColumnDefinition Width="200"></ColumnDefinition>
       <ColumnDefinition Width="*"></ColumnDefinition>
       <ColumnDefinition Width="2*"></ColumnDefinition>
   </Grid.ColumnDefinitions>
</Grid>
```

## 绘图规则

在计算尺寸时，任何比例列都将适应在计算绝对值和自动值后剩余的空间。

自动尺寸的计算是使用子控件的边距布局区域外缘进行的。
:::info
要回顾控制布局区域的概念，请参阅[此处](../../../concepts/layout/layout-zones)。
:::

子控件按照它们在 XAML 中出现的顺序在其分配的网格单元格中绘制。这条规则既适用于当两个子控件被分配到同一单元格时的情况，也适用于子控件大于其分配单元格时的重叠情况。

当子控件有自己的尺寸，并且小于其分配的单元格时，它将根据其水平和垂直对齐属性（默认都是居中）在单元格中对齐绘制。

## 示例

这个示例展示了：

* 如何使用简短语法定义列和行。
* 如何混合绝对和比例列宽。
* 如何为子控件分配单元格。
* 如何跨行和列。

一个包含 3 个相等行和 3 列（1 个固定宽度），（2 个按比例抓取剩余宽度）的 `Grid` 的示例是：

```xml
<Grid ColumnDefinitions="100,1.5*,4*" RowDefinitions="Auto,Auto,Auto"  Margin="4">
  <TextBlock Text="Col0Row0:" Grid.Row="0" Grid.Column="0"/>
  <TextBlock Text="Col0Row1:" Grid.Row="1" Grid.Column="0"/>
  <TextBlock Text="Col0Row2:" Grid.Row="2" Grid.Column="0"/>
  <CheckBox Content="Col2Row0" Grid.Row="0" Grid.Column="2"/>
  <Button Content="SpansCol1-2Row1-2" Grid.Row="1" Grid.Column="1" Grid.RowSpan="2" Grid.ColumnSpan="2"/>
</Grid>
```

在这里，100 的绝对宽度被减去后（对于列 0），列 1 将获得 1.5 个部分，列 2 将获得剩余宽度的 4 个部分。

按钮被绘制以填充从单元格（列 1，行 1）加一个列（向右）和一行向下的跨度。结果看起来是这样的：

<img src={GridSpanningColumnsScreenshot} alt="" />

## 更多信息

:::info
要查看此控件的完整 API 文档，请参阅[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/Grid/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`Grid.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Grid.cs)
:::