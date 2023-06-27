---
id: multi-touch
title: Multi-Touch
---

Avalonia UI offers support for multi-touch inputs, allowing you to provide an enhanced interactive experience to your users. This document guides you through the basics of handling multi-touch events in Avalonia applications.


## Capturing Multi-Touch Events

In Avalonia, touch events are handled just like mouse events. When a touch is detected, Avalonia will raise a set of touch events that you can listen to and act upon. Here are the primary touch events you might be interested in:

* **TouchEnter**: Raised when a touch enters the bounds of an element.
* **TouchLeave**: Raised when a touch leaves the bounds of an element.
* **TouchDown**: Raised when the screen is touched.
* **TouchMove**: Raised when a touch moves on the screen.
* **TouchUp**: Raised when a touch is lifted from the screen.

Each of these events is represented by the `TouchEventArgs` class, which includes a `TouchPoint` property that provides details about the touch event such as its position and the touch device that generated the event.

Here is an example of how to handle the `TouchDown` event in Avalonia:

```cs
void OnTouchDown(object sender, TouchEventArgs e)
{
    var touchPoint = e.GetTouchPoint(this);
    // do something with touchPoint
}
```

The above code will be called whenever a touch down event occurs within the control to which the event handler is attached. The `touchPoint` object will contain details about the touch, including the touch position, which can be accessed through the `Position` property (`touchPoint.Position`).

## Handling Multiple Touches

Handling multiple simultaneous touches in Avalonia is just an extension of handling a single touch. When multiple touch devices interact with the screen at the same time, Avalonia raises touch events for each touch individually.

To track individual touches, you can use the `TouchDevice` property of the `TouchPoint` object. This property uniquely identifies each touch, allowing you to track and handle each touch separately.

Remember, in multi-touch scenarios, touch events can occur in rapid succession and can overlap. Therefore, the design of your touch event handling logic should be able to deal with these situations.


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












