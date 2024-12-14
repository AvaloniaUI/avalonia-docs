---
id: input-controls
title: 输入控件
---

import InputControlsScreenshot from '/img/get-started/test-drive/input-controls.png';

在这个页面上，您将学习如何添加一些Avalonia输入控件并将其排列整齐。目标是在一行中添加带有标签的数字输入控件，并在其下面一行中添加对应的输出控件。

为了实现这个布局，您将使用内置的网格控件，并将标签和输入控件放置在其单元格中。

这张图片展示了结果布局（运行中）并显示了网格线。网格线是为了可视化布局而显示的 - 在生产界面上通常不会这样做。

<img className="center" src={InputControlsScreenshot} alt="Window showing input controls" />

要使用网格控件创建布局，请按照以下步骤进行操作：

- 如果应用正在运行，请停止应用。
- 在 XAML 中找到 `<Border>` 和 `<Button>` 之间的空行
- 插入一个`<Grid>`标签，如下所示：

```xml
<StackPanel>
    <Border Margin="5" CornerRadius="10" Background="LightBlue">
        <TextBlock Margin="5"
            HorizontalAlignment="Center"
            FontSize="24"
            Text="Temperature Converter" />
    </Border>
    // highlight-start
    <Grid ShowGridLines="True" Margin="5" 
          ColumnDefinitions="120, 100"
          RowDefinitions="Auto, Auto, Auto">
    </Grid>
    // highlight-end
    <Button HorizontalAlignment="Center">Calculate</Button>
</StackPanel>
```

该标签可以用于指定网格的行和列，设置其的大小，并控制网格线是否可见。目前它只会显示为一条直线，因为网格内部是空的。`Auto` 表明行的大小与其内容相同，并且在添加内容之前高度为零。

- 在 `Grid` 中添加 `<Label>` 和 `<TextBox>`（文本输入）控件，如下所示：

```xml
<Grid ShowGridLines="True" Margin="5"
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">
    // highlight-start
    <Label Grid.Row="0" Grid.Column="0">Celsius</Label>
    <TextBox Grid.Row="0" Grid.Column="1"/>
    <Label Grid.Row="1" Grid.Column="0">Fahrenheit</Label>
    <TextBox Grid.Row="1"  Grid.Column="1"/>
    // highlight-end
</Grid>
```

最后，您可以使用它们的 `Margin` 属性来整理网格中控件的对齐方式。还可以将按钮移动到网格中，如下所示：

```xml
<Grid ShowGridLines="True"  Margin="5" 
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">
    // highlight-start
    <Label Grid.Row="0" Grid.Column="0" Margin="10">Celsius</Label>
    <TextBox Grid.Row="0" Grid.Column="1" Margin="0 5" Text="0"/>
    <Label Grid.Row="1" Grid.Column="0" Margin="10">Fahrenheit</Label>
    <TextBox Grid.Row="1"  Grid.Column="1" Margin="0 5" Text="0"/>
    <Button Grid.Row="2" Grid.Column="1" Margin="0 5">Calculate</Button>
    // highlight-end
</Grid>
```

- 运行应用以查看结果

:::info
有关Avalonia内置控件的完整信息以及它们的属性，请参阅参考部分[这里](../../reference/controls/)。
:::

在下一页中，您将了解如何通过调整预览窗口中显示的大小来改善设计时体验。