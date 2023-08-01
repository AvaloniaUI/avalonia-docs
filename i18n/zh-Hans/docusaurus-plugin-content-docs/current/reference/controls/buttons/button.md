---
description: REFERENCE - Built-in Controls
---

# 按钮

按钮是一种对指针动作做出反应的控件（也有一些键盘等效操作）。当指针按下时，它会呈现出被按下的状态。

将指针按下到释放的序列解释为点击；此行为是可配置的。

:::info
点击是众多按钮事件之一，完整列表请参阅[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/Button/#Events)。
:::

按钮可以在代码后台引发点击事件。或者，您可以将`ICommand`的实例绑定到`Command`属性。绑定的命令将在每次按钮被点击时执行。

:::info
有关如何绑定到命令的指南，请参阅[这里](../../../basics/user-interface/adding-interactivity)。
:::

## 有用的属性

您可能最常用到以下属性：

| 属性         | 描述                                                   |
| ------------ | ------------------------------------------------------ |
| `ClickMode`  | 描述按钮如何对点击做出反应。                          |
| `Command`    | 点击按钮时要调用的`ICommand`实例。                     |

## 示例

以下示例展示了一个简单的按钮和一个C#代码后台的点击事件处理程序。

```xml
<StackPanel Margin="20">
  <Button Click="ClickHandler">Press Me!</Button>
  <TextBlock Margin="0 10" x:Name="message">Ready...</TextBlock>
</StackPanel>
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
        message.Text = "Button clicked!";
    }
}
```

<img src='/img/gitbook-import/assets/button.gif' alt='' />

## 更多信息

:::info
有关该控件的完整API文档，请参阅[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/Button/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`Button.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Button.cs)。
:::