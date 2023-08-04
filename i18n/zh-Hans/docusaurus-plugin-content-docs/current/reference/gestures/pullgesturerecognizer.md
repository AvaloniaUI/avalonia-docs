---
description: REFERENCE - Gestures
---

# PullGestureRecognizer

一个用于追踪拉动手势的手势识别器。拉动手势发生在指针从控件的边缘拖动时。拉动的方向由 `PullDirection` 属性定义。

## Using a PullGestureRecognizer
可以通过将 `PullGestureRecognizer` 添加到控件的`GestureRecognizers`属性来将其附加到控件上。
```xml
<Border Width="500"
        Height="500"
        Margin="5"
        Name="border">
  <Border.GestureRecognizers>
    <PullGestureRecognizer PullDirection="TopToBottom"/>
  </Border.GestureRecognizers>
</Border>
```

```csharp title='C#'
border.GestureRecognizers.Add(new PullGestureRecognizer()
            {
                PullDirection = PullDirection.TopToBottom,
            });
```

当 `PullGestureRegonizer` 检测到拉动手势的开始时，会引发`Gestures.PullGestureEvent`事件。当拉动结束，即指针被释放或另一个手势开始时，它会引发`Gestures.PullGestureEndedEvent`事件。

### PullDirection
这定义了拉动的方向。有4个可用的值：
* `PullDirection.TopToBottom` : 拉动从顶部边缘开始向下移动
* `PullDirection.BottomToTop` : 拉动从底部边缘开始向上移动
* `PullDirection.LeftToRight` : 拉动从左边缘开始向右移动
* `PullDirection.RightToLeft` : 拉动从右边缘开始向左移动

## 有用的属性

您可能经常使用以下属性：

<table>
    <thead>
      <tr>
        <th width="266">属性</th>
        <th>描述</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>PullDirection</td>
        <td>定义拉动手势的方向。</td>
      </tr>
    </tbody>
  </table>


## 更多信息

:::info
在 _GitHub_ 上查看源代码：

[`PullGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/PullGestureRecognizer.cs)

[`PullGestureEventArgs.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/PullGestureEventArgs.cs)
:::
