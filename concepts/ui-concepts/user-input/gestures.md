---
id: gestures
title: Gestures
description: Learn how Avalonia gesture recognizers detect touch and pointer gestures such as scroll, pinch, and pull on your controls.
doc-type: explanation
---

Controls can detect gestures using gesture recognizers. These recognizers are hosted in controls, and listen for and track pointer events that the control receives. When a recognizer determines that a gesture has started, it raises gesture-specific events that you can handle in your application.

All gesture recognizers derive from the base class `GestureRecognizer`, and you attach them to a control using its `GestureRecognizers` property.

## Available gesture recognizers

Avalonia provides the following built-in gesture recognizers:

| Recognizer | Purpose |
|---|---|
| `ScrollGestureRecognizer` | Detects scrolling (panning) in horizontal, vertical, or both directions. |
| `PinchGestureRecognizer` | Detects pinch-to-zoom interactions where two pointer contacts move toward or away from each other. |
| `PullGestureRecognizer` | Detects pull (drag from edge) gestures in a specified direction, useful for pull-to-refresh patterns. |

## Attaching a gesture recognizer

You can attach a gesture recognizer in AXAML or in code-behind. The following example shows an `Image` hosting a `ScrollGestureRecognizer`:

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

You can attach multiple gesture recognizers to the same control if you need to detect more than one type of gesture.

## Handling gesture events

Each gesture recognizer raises routed events when the gesture starts and ends. You handle these events by calling `AddHandler` on the control:

```csharp title='C#'
image.AddHandler(Gestures.ScrollGestureEvent, (s, e) =>
{
    // Respond to the scroll gesture
});

image.AddHandler(Gestures.ScrollGestureEndedEvent, (s, e) =>
{
    // Respond to the scroll gesture ending
});
```

If your handler fully processes the gesture, set `e.Handled = true` to prevent further propagation through the event routing system.

## How gesture recognizers work

Gesture recognizers intercept low-level pointer events (such as `PointerPressed`, `PointerMoved`, and `PointerReleased`) on the host control. When the pointer activity matches a known gesture pattern, the recognizer raises a higher-level gesture event instead. This separation lets you work with meaningful interactions like "scroll" or "pinch" without manually tracking individual pointer movements.

Because gesture events are routed events, they follow the same tunneling and bubbling behavior as other Avalonia input events. You can handle them at any level of the visual tree.

## Platform considerations

Gesture recognizers work consistently across platforms, but the physical input that triggers them varies:

- **Touch devices (mobile, tablets):** Gestures map directly to touch interactions. Pinch requires two touch contacts, and scroll responds to single-finger drag.
- **Desktop (mouse):** Scroll gestures respond to click-and-drag. Pinch gestures typically require a touchpad that supports multi-touch input.
- **Web (via Avalonia WASM):** Gesture behavior depends on the browser's pointer event support. Most modern browsers provide full touch and pointer event forwarding.

When designing your UI, keep in mind that not all gesture types are practical on every platform. For example, `PinchGestureRecognizer` is most useful on touch-enabled devices.

## Source code

:::info
You can view the source for related classes on GitHub:

- [`GestureRecognizer`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/GestureRecognizer.cs)
- [`GestureRecognizerCollection`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/GestureRecognizerCollection.cs)
:::

## See also

- [Pinch gesture recognizer](/docs/input-interaction/gestures/pinch-gesture-recognizer)
- [Pull gesture recognizer](/docs/input-interaction/gestures/pull-gesture-recognizer)
- [Scroll gesture recognizer](/docs/input-interaction/gestures/scroll-gesture-recognizer)
- [Pointer devices](pointer)
- [Routed events](routed-events)
