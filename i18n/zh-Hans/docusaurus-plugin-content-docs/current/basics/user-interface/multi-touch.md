---
id: multi-touch
title: 多点触控
---

与其他一些框架不同，Avalonia UI 不区分触摸事件。相反，它使用一个指针事件系统，将鼠标、笔和触摸事件统一起来。这意味着您不需要单独的 `TouchEnter` 或 `TouchLeave` 事件，而是可以使用 `PointerPressed`、`PointerMoved` 和 `PointerReleased` 事件来跟踪触摸输入。


## 使用手势识别器

除了基本的触摸事件外，Avalonia 还提供了内置的手势识别器，可以轻松处理常见的触摸手势，如捏合和滚动。以下是如何使用它们：

```xml
<Image Stretch="UniformToFill"
       Margin="5"
       Name="PinchImage"
       Source="/Assets/delicate-arch-896885_640.jpg">
    <Image.GestureRecognizers>
        <PinchGestureRecognizer/>
        <ScrollGestureRecognizer CanHorizontallyScroll="True" CanVerticallyScroll="True"/>
    </Image.GestureRecognizers>
</Image>
```

在这个例子中，一个 `Image` 控件被设置为响应捏合和滚动手势。`PinchGestureRecognizer` 启用了捏合缩放功能，而 `ScrollGestureRecognizer` 允许图像在水平和垂直方向上滚动。








