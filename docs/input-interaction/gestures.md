---
id: gestures
title: Gestures
---

Avalonia uses a unified pointer event system. Mouse, touch, and stylus input all flow through the same `PointerPressed`, `PointerMoved`, and `PointerReleased` events rather than having separate event types for each device. Pointer events tell you what the hardware did: a button went down, a finger moved.

Gestures are a higher-level abstraction built on top of pointer events that represent what the user *intended*: a tap, a pinch-to-zoom, a scroll.

Avalonia provides two kinds of gestures:

**Built-in gesture events** cover the most common interactions:

| Event | Description |
|---|---|
| `Tapped` | A pointer was pressed and released on a control. |
| `DoubleTapped` | Two taps occurred in the same location within the platform's double-tap time and distance threshold. |
| `Holding` | A pointer was pressed and held without moving. Must be enabled per control with `InputElement.IsHoldingEnabled`. |

**Gesture recognizers** detect more complex multi-pointer or directional patterns. You attach them to a control's `GestureRecognizers` collection, and they monitor the control's pointer events to detect specific patterns:

| Recognizer | Description |
|---|---|
| [`PinchGestureRecognizer`](/docs/input-interaction/gestures/pinch-gesture-recognizer) | Two pointers moving towards or away from each other. Used for pinch-to-zoom. |
| [`PullGestureRecognizer`](/docs/input-interaction/gestures/pull-gesture-recognizer) | A pointer dragged from the edge of a control in a specific direction. Used for pull-to-refresh. |
| [`ScrollGestureRecognizer`](/docs/input-interaction/gestures/scroll-gesture-recognizer) | A pointer dragged to scroll content horizontally, vertically, or both. |

## Attaching a gesture recognizer

Gesture recognizers are added to a control in XAML or code-behind:

```xml
<Image Stretch="UniformToFill" Name="image" Source="/image.jpg">
  <Image.GestureRecognizers>
    <PinchGestureRecognizer />
  </Image.GestureRecognizers>
</Image>
```

```csharp title='C#'
image.GestureRecognizers.Add(new PinchGestureRecognizer());
```

Once attached, the recognizer watches the control's pointer events and raises gesture-specific events when it detects a match. Each recognizer raises a start event (e.g. `InputElement.PinchEvent`) and an end event (e.g. `InputElement.PinchEndedEvent`).

## Subscribing to gesture events

Gesture recognizer events are routed events. Subscribe using `AddHandler`:

```csharp title='C#'
image.AddHandler(InputElement.PinchEvent, (sender, args) =>
{
    var scale = args.Scale;
    // Handle pinch
});
```

If your handler fully processes the gesture, mark it as handled to prevent it from bubbling further:

```csharp title='C#'
args.Handled = true;
```

## Holding gesture

Unlike `Tapped` and `DoubleTapped`, the `Holding` gesture must be enabled per control by setting the `InputElement.IsHoldingEnabled` attached property:

```xml
<Border InputElement.IsHoldingEnabled="True" Holding="OnHolding" />
```

The hold duration is defined by `PlatformSettings.HoldWaitDuration` on the `TopLevel`. When the duration elapses, a `Holding` event fires with `HoldingState.Started`. On pointer release, it fires again with `HoldingState.Completed`. If a new gesture begins or a second pointer is pressed while holding, it fires with `HoldingState.Canceled`.

To allow mouse pointers (not just touch) to trigger holding, set `InputElement.IsHoldWithMouseEnabled`:

```xml
<Border InputElement.IsHoldingEnabled="True"
        InputElement.IsHoldWithMouseEnabled="True"
        Holding="OnHolding" />
```

## See also

- [Pointer Events](/docs/input-interaction/pointer): Lower-level pointer events that gestures are built on.
- [Routed Events](/docs/input-interaction/routed-events): How events propagate through the element tree.
