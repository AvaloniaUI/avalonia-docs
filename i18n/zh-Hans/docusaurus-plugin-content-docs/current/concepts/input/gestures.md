---
description: CONCEPTS - Input
---

# 手势

控件可以使用手势识别器来检测手势。这些识别器托管在控件中，监听控件接收到的指针事件，并在检测到手势开始时发送手势事件。

所有手势识别器都派生自基类`GestureRecognizer`，可以使用控件的`GestureRecognizers`属性将其附加到控件上。以下示例显示了一个托管了`ScrollGestureRecognizer`的图像：

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

## 更多信息

:::info
您可以在[这里](../../reference/gestures)查看更多关于可用手势识别器的信息。

您可以查看相关类的源代码：

[GestureRecognizer](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/GestureRecognizer.cs)

[GestureRecognizerCollection](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/GestureRecognizerCollection.cs)
:::