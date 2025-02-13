---
description: REFERENCE - Gestures
---

# PinchGestureRecognizer

A gesture recognizer that tracks a pinch gesture. A pinch gesture occurs when two pointer contacts are brought towards each other, or away from each other. This is useful in controls that implements a pinch to zoom interaction.

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

The PinchGestureRecognizer raises a `Gestures.PinchEvent` when it detects the start of a pull gesture. When the pull ends, from the pointer being released or another gesture start, it raises a `Gestures.PinchEndedEvent`.
The `Scale` property in the args passed to the `Gestures.PinchEvent` event handler contains the relative size of the pinch since it started.

## Binding Events
After the PinchGestureRecognizer has been added to your control, you need to bind them in your code behind either through an inline handler or to an event function:
```csharp title='C#'
image.AddHandler(Gestures.PinchEvent, (s, e) => { });
image.AddHandler(Gestures.PinchEndedEvent, (s, e) => { });
```
```csharp title='C#'
image.AddHandler(Gestures.PinchEvent, Image_PinchGesture);
image.AddHandler(Gestures.PinchEndedEvent, Image_PinchGestureEnded);
...
private void Image_PinchGesture(object? sender, PinchGestureEventArgs e) { }
private void Image_PinchGestureEnded(object? sender, PinchGestureEndedEventArgs e) { }
```
If your event handles the gesture completely, you can mark the event as handled by setting:
```csharp title='C#'
e.Handled = true;
```

## More Information

:::info
View the source code on _GitHub_ 

[`PinchGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/PinchGestureRecognizer.cs)

[`PinchEventArgs.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/PinchEventArgs.cs)
:::
