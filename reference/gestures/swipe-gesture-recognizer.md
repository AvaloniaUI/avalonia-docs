---
id: swipe-gesture-recognizer
title: Swipe
---

A gesture recognizer that tracks swipe gestures for discrete paging interactions. `SwipeGestureRecognizer` detects when a user rapidly drags a pointer in a single direction, providing per-event velocity data that enables speed-sensitive transitions such as carousel page changes. Unlike `ScrollGestureRecognizer`, it does not include inertia or continuous scrolling physics.

Use `SwipeGestureRecognizer` when a control needs to respond to deliberate directional flicks (such as navigating between pages in a carousel). For continuous panning with inertia, use [`ScrollGestureRecognizer`](/docs/input-interaction/gestures/scroll-gesture-recognizer) instead.

## Using a SwipeGestureRecognizer
A SwipeGestureRecognizer can be attached to a control using the control's `GestureRecognizers` property.
```xml
<Border Name="swipeArea" Background="Transparent" Height="300">
    <Border.GestureRecognizers>
        <SwipeGestureRecognizer CanHorizontallySwipe="True" />
    </Border.GestureRecognizers>
    <TextBlock Text="Swipe left or right"
               HorizontalAlignment="Center"
               VerticalAlignment="Center" />
</Border>
```

```csharp title='C#'
swipeArea.GestureRecognizers.Add(new SwipeGestureRecognizer
{
    CanHorizontallySwipe = true,
    CanVerticallySwipe = false
});
```

The SwipeGestureRecognizer raises a `InputElement.SwipeGestureEvent` during the swipe as the pointer moves. When the swipe ends, from the pointer being released or another gesture start, it raises a `InputElement.SwipeGestureEndedEvent`.

## Binding events
After the SwipeGestureRecognizer has been added to your control, you need to bind them in your code behind either through an inline handler or to an event function:
```csharp title='C#'
swipeArea.AddHandler(InputElement.SwipeGestureEvent, (s, e) => { });
swipeArea.AddHandler(InputElement.SwipeGestureEndedEvent, (s, e) => { });
```
```csharp title='C#'
swipeArea.AddHandler(InputElement.SwipeGestureEvent, OnSwipeGesture);
swipeArea.AddHandler(InputElement.SwipeGestureEndedEvent, OnSwipeGestureEnded);
...
private void OnSwipeGesture(object? sender, SwipeGestureEventArgs e) { }
private void OnSwipeGestureEnded(object? sender, SwipeGestureEndedEventArgs e) { }
```
If your event handles the gesture completely, you can mark the event as handled by setting:
```csharp title='C#'
e.Handled = true;
```

## Event args

`SwipeGestureEventArgs` is raised during the gesture:

| Property | Type | Description |
|---|---|---|
| `Id` | `int` | Unique identifier for this gesture sequence. |
| `Delta` | `Vector` | Pixel delta since the last event. |
| `Velocity` | `Vector` | Current swipe velocity in pixels per second. |
| `SwipeDirection` | `SwipeDirection` | Dominant swipe direction: `Left`, `Right`, `Up`, or `Down`. |

`SwipeGestureEndedEventArgs` is raised when the pointer is released:

| Property | Type | Description |
|---|---|---|
| `Id` | `int` | Unique identifier for this gesture sequence. |
| `Velocity` | `Vector` | Swipe velocity at the moment the pointer was released. |

## Useful properties

You will probably use these properties most often:

| Property | Description |
|---|---|
| `CanHorizontallySwipe` | Enables tracking of horizontal (left/right) swipes. Default: `false`. |
| `CanVerticallySwipe` | Enables tracking of vertical (up/down) swipes. Default: `false`. |
| `Threshold` | Minimum pointer movement in pixels before the swipe is recognized. When `0`, the platform default threshold is used. |
| `IsMouseEnabled` | When `true`, mouse pointer events trigger swipe gestures in addition to touch and pen. Default: `false`. |
| `IsEnabled` | Enables or disables the recognizer entirely. Default: `true`. |

## Examples

### Detecting horizontal swipes to navigate pages

```csharp title='C#'
int currentPage = 0;
int totalPages = 5;

swipeArea.AddHandler(InputElement.SwipeGestureEndedEvent, (s, e) =>
{
    if (Math.Abs(e.Velocity.X) > 200) // fast enough flick
    {
        if (e.Velocity.X < 0 && currentPage < totalPages - 1)
            currentPage++;
        else if (e.Velocity.X > 0 && currentPage > 0)
            currentPage--;
    }
});
```

### Vertical swipe detection

```xml
<Border Name="verticalSwipeArea" Background="Transparent">
    <Border.GestureRecognizers>
        <SwipeGestureRecognizer CanVerticallySwipe="True" />
    </Border.GestureRecognizers>
</Border>
```

### Enabling mouse support

By default, only touch and pen input trigger swipe gestures. Enable mouse support for desktop scenarios:

```xml
<Border.GestureRecognizers>
    <SwipeGestureRecognizer CanHorizontallySwipe="True"
                            IsMouseEnabled="True" />
</Border.GestureRecognizers>
```

## More information

:::info
For the complete API documentation about this gesture recognizer, see the [SwipeGestureRecognizer API reference](/api/avalonia/input/gesturerecognizers/swipegesturerecognizer).
:::

:::info
View the source code on _GitHub_ [`SwipeGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/SwipeGestureRecognizer.cs)
:::

## See also

- [Gestures](/docs/input-interaction/gestures): Overview of gesture recognizers and built-in gesture events.
- [Scroll Gesture Recognizer](/docs/input-interaction/gestures/scroll-gesture-recognizer): Scroll gesture for continuous panning with inertia.
- [Pull Gesture Recognizer](/docs/input-interaction/gestures/pull-gesture-recognizer): Pull gesture for pull-to-refresh interactions.
- [Pinch Gesture Recognizer](/docs/input-interaction/gestures/pinch-gesture-recognizer): Pinch gesture for zoom interactions.
