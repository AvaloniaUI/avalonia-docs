---
id: swipe-gesture-recognizer
title: Swipe
doc-type: reference
description: Swipe gesture recognizer detects when a user rapidly drags a pointer in a single direction, providing per-event velocity data to support transition effects.
---

A gesture recognizer that tracks swipe gestures for discrete paging interactions. `SwipeGestureRecognizer` detects when a user rapidly drags a pointer in a single direction, providing per-event velocity data that enables speed-sensitive transitions such as carousel page changes. Unlike `ScrollGestureRecognizer`, it does not include inertia or continuous scrolling physics.

Use `SwipeGestureRecognizer` when a control needs to respond to deliberate directional flicks (such as navigating between pages in a carousel). For continuous panning with inertia, use [`ScrollGestureRecognizer`](/docs/input-interaction/gestures/scroll-gesture-recognizer) instead.

## Using a SwipeGestureRecognizer

A `SwipeGestureRecognizer` can be attached to a control using the control's `GestureRecognizers` property.
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

The `SwipeGestureRecognizer` raises an `InputElement.SwipeGestureEvent` during the swipe as the pointer moves. When the swipe ends, from the pointer being released or another gesture starting, it raises an `InputElement.SwipeGestureEndedEvent`.

## Binding events

After the `SwipeGestureRecognizer` has been added to your control, bind them in your code-behind, either through an inline handler or to an event function:

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

If your event handles the gesture completely, mark the event as handled by setting:

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

## Properties

You will probably use these properties most often:

| Property | Type | Description | Default |
|---|---|---|---|
| `CanHorizontallySwipe` | `bool` | Enables tracking of horizontal (left/right) swipes. | `false` |
| `CanVerticallySwipe` | `bool` | Enables tracking of vertical (up/down) swipes. | `false` |
| `Threshold` | `double` | Minimum pointer movement in pixels before the swipe is recognized. If set to 0, the platform default threshold is used. | 0 |
| `IsMouseEnabled` | `bool` | When `true`, mouse pointer events trigger swipe gestures in addition to touch and pen. | `false` |
| `IsEnabled` | `bool` | Enables or disables the recognizer entirely. | `true`. |

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

## See also

- [API reference](/api/avalonia/input/gesturerecognizers/swipegesturerecognizer)
- [Source code](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/SwipeGestureRecognizer.cs)
- [Gestures](/docs/input-interaction/gestures): Overview of gesture recognizers and built-in gesture events.
- [Scroll](/docs/input-interaction/gestures/scroll-gesture-recognizer): Scroll gesture for continuous panning with inertia.
- [Pull](/docs/input-interaction/gestures/pull-gesture-recognizer): Pull gesture for pull-to-refresh interactions.
- [Pinch](/docs/input-interaction/gestures/pinch-gesture-recognizer): Pinch gesture for zoom interactions.
