---
description: REFERENCE - Gestures
---

# PinchGestureRecognizer

一个用于追踪捏合手势的手势识别器。捏合手势发生在两个触控点向彼此靠近或远离的情况下。这在实现捏合缩放交互的控件中非常有用。

## Using a PinchGestureRecognizer
可以通过将 `PinchGestureRecognizer` 添加到控件的 `GestureRecognizers` 属性来将其附加到控件上。
```xml
<Image Stretch="UniformToFill"
        Margin="5"
        Name="image"
        Source="/image.jpg">
  <Image.GestureRecognizers>
    <PinchGestureRecognizer/>
  </Image.GestureRecognizers>
</Image>
```

```csharp title='C#'
image.GestureRecognizers.Add(new PinchGestureRecognizer());
```

当 `PinchGestureRegonizer` 检测到拉动手势的开始时，会触发 `Gestures.PinchEvent` 事件。当拉动结束（指针被释放或开始另一个手势）时，它会触发 `Gestures.PinchEndedEvent` 事件。
传递给 `Gestures.PinchEvent` 事件处理程序的参数中的 `Scale` 属性包含自从捏合手势开始以来的相对大小。

## 更多信息

:::info
在 _GitHub_ 上查看源代码

[`PinchGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/PinchGestureRecognizer.cs)

[`PinchEventArgs.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/PinchEventArgs.cs)
:::
