---
description: REFERENCE - Built-in Controls
---

# RepeatButton 重复按钮

重复按钮是一种控件，其特点是在按住按钮时定期生成点击事件。

## 有用的属性

您可能经常使用以下属性：

| 属性      | 描述                                                                              |
| -------- | --------------------------------------------------------------------------------- |
| `Delay`   | 在开始生成重复点击之前等待的时间（毫秒）。默认为300毫秒。                          |
| `Interval`| 生成点击事件之间的时间间隔（毫秒）。默认为100毫秒。                               |

## 示例代码

下面的示例演示了一个重复按钮，使用默认的间隔和延迟来生成点击事件。


<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             Padding="20">
  <RepeatButton Click="OnClick"
                HorizontalAlignment="Center"
                VerticalAlignment="Center">
    Press and hold down
  </RepeatButton>
</UserControl>
```

```csharp
public partial class MainView : UserControl
{
    private int _clickCount = 0;

    public void OnClick(object sender, RoutedEventArgs args)
    {
        var btn = (RepeatButton)sender;
        btn.Content = $"Clicked: {++_clickCount} times";
    }
}
```

</XamlPreview>

## 更多信息

:::info
有关此控件的完整API文档，请参阅[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_RepeatButton)。
:::

:::info
在_GitHub_上查看源代码 [`RepeatButton.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/RepeatButton.cs)
:::
