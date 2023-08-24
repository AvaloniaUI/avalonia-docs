---
description: REFERENCE - Gestures
---

# ScrollGestureRecognizer

一个用于跟踪滚动手势的手势识别器。可以将其附加到控件上，以便在控件的边界内检测指针在特定方向上的移动。当控件水平、垂直或同时进行内容平移时，这将特别有用。

## 使用 ScrollGestureRecognizer
可以使用控件的 `GestureRecognizers` 属性将 `ScrollGestureRecognizer` 附加到控件上。
```xml
<Image Stretch="UniformToFill"
        Margin="5"
        Name="image"
        Source="/image.jpg">
  <Image.GestureRecognizers>
    <ScrollGestureRecognizer CanHorizontallyScroll="True"
                              CanVerticallyScroll="True"/>
  </Image.GestureRecognizers>
</Image>
```

```csharp title='C#'
image.GestureRecognizers.Add(new ScrollGestureRecognizer()
            {
                CanVerticallyScroll = true,
                CanHorizontallyScroll = true,
            });
```

当 `ScrollGestureRecognizer` 检测到滚动手势的开始时，它会引发 `Gestures.ScrollGestureEvent` 事件。当滚动结束（指针释放或其他手势开始）时，它会引发 `Gestures.ScrollGestureEndedEvent` 事件。

## 有用的属性

You will probably use these properties most often:

<table>
    <thead>
      <tr>
        <th width="266">属性</th>
        <th>描述</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CanVerticallyScroll</td>
        <td>定义内容是否可以垂直滚动。</td>
      </tr>
      <tr>
        <td>CanHorizontallyScroll</td>
        <td>定义内容是否可以水平滚动。</td>
      </tr>
    </tbody>
  </table>


## 更多信息

:::info
有关此手势识别器的完整 API 文档，请参阅 [此处](https://reference.avaloniaui.net/api/Avalonia.Input.GestureRecognizers/ScrollGestureRecognizer/).
:::

:::info
在 _GitHub_ 上查看源代码 [`ScrollGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/ScrollGestureRecognizer.cs)
:::
