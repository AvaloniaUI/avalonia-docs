---
description: REFERENCE - Built-in Controls
---

import RepeatButtonHoldScreenshot from '/img/reference/controls/buttons/repeatbutton-hold.gif';

# 重复按钮

重复按钮是一种控件，其特点是在按住按钮时定期生成点击事件。

## 有用的属性

您可能经常使用以下属性：

| 属性      | 描述                                                                              |
| -------- | --------------------------------------------------------------------------------- |
| `Delay`   | 在开始生成重复点击之前等待的时间（毫秒）。默认为300毫秒。                          |
| `Interval`| 生成点击事件之间的时间间隔（毫秒）。默认为100毫秒。                               |

## 示例

下面的示例演示了一个重复按钮，使用默认的间隔和延迟来生成点击事件。

```xml
<Grid Margin="20" RowDefinitions="50,*">
  <RepeatButton Grid.Row="0" Click="ClickHandler">Press and hold down</RepeatButton>
  <ScrollViewer Grid.Row="1">
    <TextBlock  Margin="0 10" x:Name="message">Ready...</TextBlock>
  </ScrollViewer>
</Grid>
```

```csharp title='C#'
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    public void ClickHandler(object sender, RoutedEventArgs args)
    {
        message.Text += "\rButton clicked!";
    }
}
```

<img src={RepeatButtonHoldScreenshot} alt="示例图片"/>

## 更多信息

:::info
有关此控件的完整API文档，请参阅[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/RepeatButton/)。
:::

:::info
在_GitHub_上查看源代码 [`RepeatButton.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/RepeatButton.cs)
:::
