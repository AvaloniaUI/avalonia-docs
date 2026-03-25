---
id: pinch-gesture-recognizer
title: PinchGestureRecognizer
description: Reference for PinchGestureRecognizer, a gesture recognizer that detects pinch (zoom) gestures from two-pointer contact in Avalonia UI.
doc-type: reference
---

# PinchGestureRecognizer

The `PinchGestureRecognizer` tracks a pinch gesture. A pinch gesture occurs when two pointer contacts are brought towards each other, or away from each other. This is useful in controls that implement pinch-to-zoom interactions, such as images or maps.

## Using a PinchGestureRecognizer

You can attach a `PinchGestureRecognizer` to a control using the control's `GestureRecognizers` property.

```xml title="XAML"
<Image Stretch="UniformToFill"
       Margin="5"
       Name="image"
       Source="/image.jpg">
  <Image.GestureRecognizers>
    <PinchGestureRecognizer/>
  </Image.GestureRecognizers>
</Image>
```

```csharp title="C#"
image.GestureRecognizers.Add(new PinchGestureRecognizer());
```

The `PinchGestureRecognizer` raises a `Gestures.PinchEvent` when it detects the start of a pinch gesture. When the pinch ends (because the pointer is released or another gesture starts), it raises a `Gestures.PinchEndedEvent`.

## Event arguments

The `PinchEventArgs` passed to your `Gestures.PinchEvent` handler exposes the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `Scale` | `double` | The relative scale of the pinch since it started. Values less than 1.0 indicate pinching inward (zoom out), and values greater than 1.0 indicate pinching outward (zoom in). |

The `PinchGestureEndedEventArgs` passed to your `Gestures.PinchEndedEvent` handler signals that the pinch gesture has completed.

## Handling events

After you add a `PinchGestureRecognizer` to your control, you need to subscribe to the gesture events in your code-behind. You can use an inline handler or a named event method.

Using inline handlers:

```csharp title="C#"
image.AddHandler(Gestures.PinchEvent, (s, e) => { });
image.AddHandler(Gestures.PinchEndedEvent, (s, e) => { });
```

Using named methods:

```csharp title="C#"
image.AddHandler(Gestures.PinchEvent, Image_PinchGesture);
image.AddHandler(Gestures.PinchEndedEvent, Image_PinchGestureEnded);

// ...

private void Image_PinchGesture(object? sender, PinchGestureEventArgs e)
{
    // Use e.Scale to adjust your content's zoom level
}

private void Image_PinchGestureEnded(object? sender, PinchGestureEndedEventArgs e)
{
    // Handle the end of the pinch gesture
}
```

If your event handler fully processes the gesture, you can mark the event as handled to prevent it from propagating further:

```csharp title="C#"
e.Handled = true;
```

## Source code

:::info
View the source code on GitHub:

- [`PinchGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/PinchGestureRecognizer.cs)
- [`PinchEventArgs.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/PinchEventArgs.cs)
:::

## See also

- [ScrollGestureRecognizer](scroll-gesture-recognizer.md)
- [PullGestureRecognizer](pull-gesture-recognizer.md)
