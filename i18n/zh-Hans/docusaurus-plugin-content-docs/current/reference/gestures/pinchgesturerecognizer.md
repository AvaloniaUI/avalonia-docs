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

The PinchGestureRegonizer raises a `Gestures.PinchEvent` when it detects the start of a pull gesture. When the pull ends, from the pointer being released or another gesture start, it raises a `Gestures.PinchEndedEvent`.
The `Scale` property in the args passed to the `Gestures.PinchEvent` event handler contains the relative size of the pinch since it started.

## More Information

:::info
View the source code on _GitHub_ 

[`PinchGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/PinchGestureRecognizer.cs)

[`PinchEventArgs.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/PinchEventArgs.cs)
:::
