---
id: input-controls
title: 输入控件
---

import InputControlsScreenshot from '/img/get-started/test-drive/input-controls.png';

在这个页面上，您将学习如何在一个整洁的布局中添加一些Avalonia输入控件。目标是在水平行中添加带有其关联标签的数字输入；在下面的行中添加一个输出控件。

为了实现这个布局，您将使用内置的网格控件，并将标签和输入控件放置在其单元格中。

这张图片展示了结果布局（运行中）并显示了网格线。网格线是为了可视化布局而显示的 - 在生产界面上通常不会这样做。

<img className="center" src={InputControlsScreenshot} alt="Window showing input controls" />

要使用网格控件创建布局，请按照以下步骤进行操作：

- 如果应用正在运行，请停止应用。
- 找到XAML中的中间堆栈面板，并删除该标签。
- 插入一个`<Grid>`标签，如下所示：

```xml
<Grid ShowGridLines="True" Margin="5"
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">  
</Grid>
```

这将为网格设置列和行的大小（并使网格线可见 - 尽管现在它只会显示为一条直线，因为网格仍然是空的）。

现在在网格的单元格中添加标签和输入控件：

- 添加`<Label>`和`<TextBox>`（文本输入）控件，如下所示：

```xml
<Grid ShowGridLines="True" Margin="5"
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">
   <Label Grid.Row="0" Grid.Column="0">Celsius</Label>
   <TextBox Grid.Row="0" Grid.Column="1"/>
   <Label Grid.Row="1" Grid.Column="0">Fahrenheit</Label>
   <TextBox Grid.Row="1"  Grid.Column="1"/>
</Grid>
```

最后，您可以使用它们的margin属性来整理网格中控件的对齐方式。还可以将按钮移动到网格中，如下所示：

- 修改XAML如下所示：

```xml
<Grid ShowGridLines="True"  Margin="5" 
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">
     <Label Grid.Row="0" Grid.Column="0" Margin="10">Celsius</Label>
     <TextBox Grid.Row="0" Grid.Column="1" Margin="0 5" Text="0"/>
     <Label Grid.Row="1" Grid.Column="0" Margin="10">Fahrenheit</Label>
     <TextBox Grid.Row="1"  Grid.Column="1" Margin="0 5" Text="0"/>
     <Button Grid.Row="2" Grid.Column="1" Margin="0 5">Calculate</Button>
</Grid>
```

- 运行应用以查看结果



:::info
有关Avalonia内置控件的完整信息以及它们的属性，请参阅参考部分[这里](../../reference/controls/)。
:::

在下一页中，您将了解如何通过调整预览窗口中显示的大小来改善设计时体验。