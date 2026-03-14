---
id: scroll-gesture-recognizer
title: Scroll
---

A gesture recognizer that tracks a scrolling gesture for panning content. `ScrollGestureRecognizer` detects when a pointer drags inside a control's bounds and translates the movement into scroll deltas, with support for inertia (the content continues scrolling after the pointer is released and gradually decelerates). It supports horizontal scrolling, vertical scrolling, or both simultaneously.

Use `ScrollGestureRecognizer` when a control needs to pan its content freely in one or more directions. For a deliberate, single-direction edge-to-edge drag (such as pull-to-refresh), use [`PullGestureRecognizer`](/docs/input-interaction/gestures/pull-gesture-recognizer) instead.

<div style={{textAlign: 'center', margin: '24px 0'}}>
<svg width="240" height="190" viewBox="0 0 240 190" fill="none" xmlns="http://www.w3.org/2000/svg">
  {/* Trackpad surface */}
  <rect x="20" y="10" width="200" height="140" rx="14"
    fill="currentColor" fillOpacity="0.03"
    stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12"/>
  <rect x="24" y="14" width="192" height="132" rx="11"
    fill="none"
    stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.06"/>
  {/* Touch point 1: Vertical scroll (active 0-45%) */}
  <circle cx="120" r="14"
    fill="currentColor" fillOpacity="0.08"
    stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35">
    <animate attributeName="cy"
      values="40;40;120;120;40;40"
      keyTimes="0;0.04;0.40;0.44;0.48;1"
      calcMode="spline"
      keySplines="0 0 1 1;0.25 0.1 0.25 1;0 0 1 1;0 0 1 1;0 0 1 1"
      dur="6s" repeatCount="indefinite"/>
    <animate attributeName="opacity"
      values="0;1;1;0;0;0"
      keyTimes="0;0.03;0.40;0.45;0.48;1"
      dur="6s" repeatCount="indefinite"/>
  </circle>
  {/* Touch point 2: Horizontal scroll (active 50-95%) */}
  <circle cy="80" r="14"
    fill="currentColor" fillOpacity="0.08"
    stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35">
    <animate attributeName="cx"
      values="50;50;50;190;190;50;50"
      keyTimes="0;0.50;0.54;0.90;0.94;0.98;1"
      calcMode="spline"
      keySplines="0 0 1 1;0 0 1 1;0.25 0.1 0.25 1;0 0 1 1;0 0 1 1;0 0 1 1"
      dur="6s" repeatCount="indefinite"/>
    <animate attributeName="opacity"
      values="0;0;0;1;1;0;0"
      keyTimes="0;0.50;0.52;0.54;0.90;0.95;1"
      dur="6s" repeatCount="indefinite"/>
  </circle>
  {/* Labels */}
  <text x="120" y="176" textAnchor="middle"
    fill="currentColor" fontSize="13" fontFamily="system-ui, sans-serif">
    <animate attributeName="opacity"
      values="0.5;0.5;0;0;0.5"
      keyTimes="0;0.44;0.48;0.96;1"
      dur="6s" repeatCount="indefinite"/>
    Vertical
  </text>
  <text x="120" y="176" textAnchor="middle"
    fill="currentColor" fontSize="13" fontFamily="system-ui, sans-serif">
    <animate attributeName="opacity"
      values="0;0;0.5;0.5;0"
      keyTimes="0;0.48;0.52;0.94;1"
      dur="6s" repeatCount="indefinite"/>
    Horizontal
  </text>
</svg>
</div>

## Using a ScrollGestureRecognizer
A ScrollGestureRecognizer can be attached to a control using the control's `GestureRecognizers` property.
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

The ScrollGestureRecognizer raises a `InputElement.ScrollGestureEvent` when it detects the start of a scroll gesture. When the scroll ends, from the pointer being released or another gesture start, it raises a `InputElement.ScrollGestureEndedEvent`.

## Binding events
After the ScrollGestureRecognizer has been added to your control, you need to bind them in your code behind either through an inline handler or to an event function:
```csharp title='C#'
image.AddHandler(InputElement.ScrollGestureEvent, (s, e) => { });
image.AddHandler(InputElement.ScrollGestureEndedEvent, (s, e) => { });
```
```csharp title='C#'
image.AddHandler(InputElement.ScrollGestureEvent, Image_ScrollGesture);
image.AddHandler(InputElement.ScrollGestureEndedEvent, Image_ScrollGestureEnded);
...
private void Image_ScrollGesture(object? sender, ScrollGestureEventArgs e) { }
private void Image_ScrollGestureEnded(object? sender, ScrollGestureEndedEventArgs e) { }
```
If your event handles the gesture completely, you can mark the event as handled by setting:
```csharp title='C#'
e.Handled = true;
```
## Useful properties

You will probably use these properties most often:

<table>
    <thead>
      <tr>
        <th width="266">Property</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CanVerticallyScroll</td>
        <td>Defines whether the content can be scrolled vertically. </td>
      </tr>
      <tr>
        <td>CanHorizontallyScroll</td>
        <td>Defines whether the content can be scrolled horizontally. </td>
      </tr>
    </tbody>
  </table>


## More information

:::info
For the complete API documentation about this gesture recognizer, see the [ScrollGestureRecognizer API reference](/api/avalonia/input/gesturerecognizers/scrollgesturerecognizer).
:::

:::info
View the source code on _GitHub_ [`ScrollGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/ScrollGestureRecognizer.cs)
:::

## See also

- [Gestures](/docs/input-interaction/gestures): Overview of gesture recognizers and built-in gesture events.
- [Pull Gesture Recognizer](/docs/input-interaction/gestures/pull-gesture-recognizer): Pull gesture for pull-to-refresh interactions.
- [Pinch Gesture Recognizer](/docs/input-interaction/gestures/pinch-gesture-recognizer): Pinch gesture for zoom interactions.
