---
id: pinch-gesture-recognizer
title: Pinch
---

A gesture recognizer that tracks a pinch gesture. A pinch gesture occurs when two pointer contacts are brought towards each other, or away from each other. This is useful in controls that implement a pinch-to-zoom interaction.

<div style={{textAlign: 'center', margin: '24px 0'}}>
<svg width="240" height="190" viewBox="0 0 240 190" fill="none" xmlns="http://www.w3.org/2000/svg">
  {/* Trackpad surface */}
  <rect x="20" y="10" width="200" height="140" rx="14"
    fill="currentColor" fillOpacity="0.03"
    stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12"/>
  <rect x="24" y="14" width="192" height="132" rx="11"
    fill="none"
    stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.06"/>
  {/* Left touch point */}
  <circle cy="80" r="14"
    fill="currentColor" fillOpacity="0.08"
    stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35">
    <animate attributeName="cx"
      values="108;108;62;62;108;108"
      keyTimes="0;0.06;0.44;0.56;0.94;1"
      calcMode="spline"
      keySplines="0 0 1 1;0.25 0.1 0.25 1;0 0 1 1;0.25 0.1 0.25 1;0 0 1 1"
      dur="5s" repeatCount="indefinite"/>
  </circle>
  {/* Right touch point */}
  <circle cy="80" r="14"
    fill="currentColor" fillOpacity="0.08"
    stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35">
    <animate attributeName="cx"
      values="132;132;178;178;132;132"
      keyTimes="0;0.06;0.44;0.56;0.94;1"
      calcMode="spline"
      keySplines="0 0 1 1;0.25 0.1 0.25 1;0 0 1 1;0.25 0.1 0.25 1;0 0 1 1"
      dur="5s" repeatCount="indefinite"/>
  </circle>
  {/* Label: Zoom in */}
  <text x="120" y="176" textAnchor="middle"
    fill="currentColor" fontSize="13" fontFamily="system-ui, sans-serif">
    <animate attributeName="opacity"
      values="0.5;0.5;0;0;0.5"
      keyTimes="0;0.46;0.5;0.96;1"
      dur="5s" repeatCount="indefinite"/>
    Zoom in
  </text>
  {/* Label: Zoom out */}
  <text x="120" y="176" textAnchor="middle"
    fill="currentColor" fontSize="13" fontFamily="system-ui, sans-serif">
    <animate attributeName="opacity"
      values="0;0;0.5;0.5;0"
      keyTimes="0;0.46;0.5;0.96;1"
      dur="5s" repeatCount="indefinite"/>
    Zoom out
  </text>
</svg>
</div>

## Using a PinchGestureRecognizer
A PinchGestureRecognizer can be attached to a control using the control's `GestureRecognizers` property.
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

The PinchGestureRecognizer raises a `InputElement.PinchEvent` when it detects the start of a pull gesture. When the pull ends, from the pointer being released or another gesture start, it raises a `InputElement.PinchEndedEvent`.
The `Scale` property in the args passed to the `InputElement.PinchEvent` event handler contains the relative size of the pinch since it started.

## Binding events
After the PinchGestureRecognizer has been added to your control, you need to bind them in your code behind either through an inline handler or to an event function:
```csharp title='C#'
image.AddHandler(InputElement.PinchEvent, (s, e) => { });
image.AddHandler(InputElement.PinchEndedEvent, (s, e) => { });
```
```csharp title='C#'
image.AddHandler(InputElement.PinchEvent, Image_PinchGesture);
image.AddHandler(InputElement.PinchEndedEvent, Image_PinchGestureEnded);
...
private void Image_PinchGesture(object? sender, PinchGestureEventArgs e) { }
private void Image_PinchGestureEnded(object? sender, PinchGestureEndedEventArgs e) { }
```
If your event handles the gesture completely, you can mark the event as handled by setting:
```csharp title='C#'
e.Handled = true;
```

## More information

:::info
View the source code on _GitHub_

[`PinchGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/PinchGestureRecognizer.cs)

[`PinchEventArgs.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/PinchEventArgs.cs)
:::

## See also

- [Gestures](/docs/input-interaction/gestures): Overview of gesture recognizers and built-in gesture events.
- [Scroll Gesture Recognizer](/docs/input-interaction/gestures/scroll-gesture-recognizer): Scroll gesture for panning content.
- [Pull Gesture Recognizer](/docs/input-interaction/gestures/pull-gesture-recognizer): Pull gesture for pull-to-refresh interactions.
