---
id: pull-gesture-recognizer
title: Pull
---

A gesture recognizer that tracks a pull gesture. A pull gesture occurs when a pointer is dragged from the edge of a control in a single, specific direction defined by the `PullDirection` property. The typical use case is pull-to-refresh, where the user drags down from the top of a list to trigger a data reload.

Unlike [`ScrollGestureRecognizer`](/docs/input-interaction/gestures/scroll-gesture-recognizer), `PullGestureRecognizer` is designed for deliberate, single-direction interactions rather than free-form panning. It requires a larger initial drag distance before activation, only recognizes movement in one configured direction, and does not apply inertia. These characteristics make it suitable for actions that need a clear user intent before triggering.

<div style={{textAlign: 'center', margin: '24px 0'}}>
<svg width="240" height="190" viewBox="0 0 240 190" fill="none" xmlns="http://www.w3.org/2000/svg">
  {/* Trackpad surface */}
  <rect x="20" y="10" width="200" height="140" rx="14"
    fill="currentColor" fillOpacity="0.03"
    stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12"/>
  <rect x="24" y="14" width="192" height="132" rx="11"
    fill="none"
    stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.06"/>
  {/* Touch point 1: Top to bottom (active 0-22%) */}
  <circle cx="120" r="14"
    fill="currentColor" fillOpacity="0.08"
    stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35">
    <animate attributeName="cy"
      values="30;30;115;115;30;30"
      keyTimes="0;0.03;0.20;0.22;0.24;1"
      calcMode="spline"
      keySplines="0 0 1 1;0.25 0.1 0.25 1;0 0 1 1;0 0 1 1;0 0 1 1"
      dur="10s" repeatCount="indefinite"/>
    <animate attributeName="opacity"
      values="0;1;1;0;0;0"
      keyTimes="0;0.02;0.20;0.23;0.25;1"
      dur="10s" repeatCount="indefinite"/>
  </circle>
  {/* Touch point 2: Bottom to top (active 25-47%) */}
  <circle cx="120" r="14"
    fill="currentColor" fillOpacity="0.08"
    stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35">
    <animate attributeName="cy"
      values="130;130;130;40;40;130;130"
      keyTimes="0;0.25;0.28;0.45;0.47;0.49;1"
      calcMode="spline"
      keySplines="0 0 1 1;0 0 1 1;0.25 0.1 0.25 1;0 0 1 1;0 0 1 1;0 0 1 1"
      dur="10s" repeatCount="indefinite"/>
    <animate attributeName="opacity"
      values="0;0;0;1;1;0;0"
      keyTimes="0;0.25;0.27;0.28;0.45;0.48;1"
      dur="10s" repeatCount="indefinite"/>
  </circle>
  {/* Touch point 3: Left to right (active 50-72%) */}
  <circle cy="80" r="14"
    fill="currentColor" fillOpacity="0.08"
    stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35">
    <animate attributeName="cx"
      values="40;40;40;200;200;40;40"
      keyTimes="0;0.50;0.53;0.70;0.72;0.74;1"
      calcMode="spline"
      keySplines="0 0 1 1;0 0 1 1;0.25 0.1 0.25 1;0 0 1 1;0 0 1 1;0 0 1 1"
      dur="10s" repeatCount="indefinite"/>
    <animate attributeName="opacity"
      values="0;0;0;1;1;0;0"
      keyTimes="0;0.50;0.52;0.53;0.70;0.73;1"
      dur="10s" repeatCount="indefinite"/>
  </circle>
  {/* Touch point 4: Right to left (active 75-97%) */}
  <circle cy="80" r="14"
    fill="currentColor" fillOpacity="0.08"
    stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35">
    <animate attributeName="cx"
      values="200;200;200;40;40;200;200"
      keyTimes="0;0.75;0.78;0.95;0.97;0.99;1"
      calcMode="spline"
      keySplines="0 0 1 1;0 0 1 1;0.25 0.1 0.25 1;0 0 1 1;0 0 1 1;0 0 1 1"
      dur="10s" repeatCount="indefinite"/>
    <animate attributeName="opacity"
      values="0;0;0;1;1;0;0"
      keyTimes="0;0.75;0.77;0.78;0.95;0.98;1"
      dur="10s" repeatCount="indefinite"/>
  </circle>
  {/* Labels */}
  <text x="120" y="176" textAnchor="middle"
    fill="currentColor" fontSize="13" fontFamily="system-ui, sans-serif">
    <animate attributeName="opacity"
      values="0;0.5;0.5;0;0;0;0;0;0"
      keyTimes="0;0.02;0.20;0.23;0.25;0.50;0.75;0.98;1"
      dur="10s" repeatCount="indefinite"/>
    Top to bottom
  </text>
  <text x="120" y="176" textAnchor="middle"
    fill="currentColor" fontSize="13" fontFamily="system-ui, sans-serif">
    <animate attributeName="opacity"
      values="0;0;0;0.5;0.5;0;0;0;0"
      keyTimes="0;0.23;0.27;0.28;0.45;0.48;0.50;0.98;1"
      dur="10s" repeatCount="indefinite"/>
    Bottom to top
  </text>
  <text x="120" y="176" textAnchor="middle"
    fill="currentColor" fontSize="13" fontFamily="system-ui, sans-serif">
    <animate attributeName="opacity"
      values="0;0;0;0.5;0.5;0;0"
      keyTimes="0;0.48;0.52;0.53;0.70;0.73;1"
      dur="10s" repeatCount="indefinite"/>
    Left to right
  </text>
  <text x="120" y="176" textAnchor="middle"
    fill="currentColor" fontSize="13" fontFamily="system-ui, sans-serif">
    <animate attributeName="opacity"
      values="0;0;0;0.5;0.5;0;0"
      keyTimes="0;0.73;0.77;0.78;0.95;0.98;1"
      dur="10s" repeatCount="indefinite"/>
    Right to left
  </text>
</svg>
</div>

## Using a PullGestureRecognizer
A PullGestureRecognizer can be attached to a control using the control's `GestureRecognizers` property.
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

The `PullGestureRecognizer` raises `InputElement.PullGestureEvent` continuously as the pointer moves in the configured direction. When the pull ends (the pointer is released or another gesture starts), it raises `InputElement.PullGestureEndedEvent`.

Controls listening for pull gestures should reset their visual state when `PullGestureEndedEvent` fires, unless the pull distance crossed a threshold that triggers the intended action. For example, a pull-to-refresh indicator should snap back if the user releases before pulling far enough.

### PullDirection
This defines the direction of the pull. There are 4 available values;
* `PullDirection.TopToBottom` : Pull starts from the top edge and moves towards the bottom
* `PullDirection.BottomToTop` : Pull starts from the bottom edge and moves towards the top
* `PullDirection.LeftToRight` : Pull starts from the left edge and moves towards the right
* `PullDirection.RightToLeft` : Pull starts from the right edge and moves towards the left

## Binding events
After the PullGestureRecognizer has been added to your control, you need to bind them in your code behind either through an inline handler or to an event function:
```csharp title='C#'
image.AddHandler(InputElement.PullGestureEvent, (s, e) => { });
image.AddHandler(InputElement.PullGestureEndedEvent, (s, e) => { });
```
```csharp title='C#'
image.AddHandler(InputElement.PullGestureEvent, Image_PullGesture);
image.AddHandler(InputElement.PullGestureEndedEvent, Image_PullGestureEnded);
...
private void Image_PullGesture(object? sender, PullGestureEventArgs e) { }
private void Image_PullGestureEnded(object? sender, PullGestureEndedEventArgs e) { }
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
        <td>PullDirection</td>
        <td>Defines the direction of the pull gesture. </td>
      </tr>
    </tbody>
  </table>


## More information

:::info
View the source code on _GitHub_

[`PullGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/PullGestureRecognizer.cs)

[`PullGestureEventArgs.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/PullGestureEventArgs.cs)
:::

## See also

- [Gestures](/docs/input-interaction/gestures): Overview of gesture recognizers and built-in gesture events.
- [Scroll Gesture Recognizer](/docs/input-interaction/gestures/scroll-gesture-recognizer): Scroll gesture for panning content.
- [Pinch Gesture Recognizer](/docs/input-interaction/gestures/pinch-gesture-recognizer): Pinch gesture for zoom interactions.
