---
description: CONCEPTS - Input
---

# Gestures

Controls can detect gestures using Gesture Recognizers. These recognizers are hosted in controls, and listen for and track pointer events that the control receives, sending gesture events when they have detected a gesture has started.

All gesture recognizers derive from the base class `GestureRecognizer`, and can be attached to a control using the control's `GestureRecognizers` property. The following shows an Image hosting a `ScrollGestureRecognizer`;

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

## More Information

:::info
You can view more information on the available gesture recognizers [here](../../reference/gestures)

You can view the source for related classes

[GestureRecognizer](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/GestureRecognizer.cs)

[GestureRecognizerCollection](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/GestureRecognizerCollection.cs)
:::