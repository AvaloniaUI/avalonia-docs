---
id: multi-touch
title: Multi-Touch
---

Avalonia UI, unlike some other frameworks, doesn't segregate touch events. Instead, it uses a pointer event system which unifies mouse, stylus, and touch events. This means that rather than having separate `TouchEnter` or `TouchLeave` events, you would use `PointerPressed`, `PointerMoved`, and `PointerReleased` events to track touch inputs.


## Using Gesture Recognizers

In addition to basic touch events, Avalonia provides built-in gesture recognizers that make handling common touch gestures like pinch and scroll a breeze. Here's how you can use them:

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

In this example, an `Image` control is set up to respond to pinch and scroll gestures. The `PinchGestureRecognizer` enables pinch-to-zoom functionality, and the `ScrollGestureRecognizer` allows the image to be scrolled both horizontally and vertically.








