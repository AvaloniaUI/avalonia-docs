---
description: REFERENCE - Built-in Controls
---

import ExpanderClosedScreenshot from '/img/reference/controls/expander/expander-closed.png';
import ExpanderOpenedScreenshot from '/img/reference/controls/expander/expander-opened.png';

# Expander 折叠面板

折叠面板控件具有一个标题区域（始终可见）和一个可折叠的内容部分，该内容部分可以包含单个子控件。

## 常用属性

你可能最常使用这些属性：

| 属性               | 描述                         |
| ------------------ | ---------------------------- |
| Expander.Header    | 定义标题区域中显示的内容。   |

## 示例

```xml
<Expander VerticalAlignment="Top">
    <Expander.Header>
        隐藏搜索
    </Expander.Header>
    <Grid RowDefinitions="*,*" ColumnDefinitions="150,*">
        <TextBlock Grid.Row="0" Grid.Column="0"
                   VerticalAlignment="Center">搜索</TextBlock>
        <TextBox Grid.Row="0" Grid.Column="1"
                 Watermark="搜索文本" Width="200" />
        <TextBlock Grid.Row="1" Grid.Column="0"
                   VerticalAlignment="Center">区分大小写？</TextBlock>
        <CheckBox Grid.Row="1" Grid.Column="1" />
    </Grid>
</Expander>
```

<img src={ExpanderClosedScreenshot} alt="折叠面板关闭时的截图" />

<img src={ExpanderOpenedScreenshot} alt="折叠面板打开时的截图" />

## 更多信息

:::info
要查看此控件的完整 API 文档，请参阅[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Expander)。
:::

:::info
在 _GitHub_ 查看源代码 [`Expander.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Expander.cs)
:::