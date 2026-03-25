---
id: swipe-gesture-recognizer
title: SwipeGestureRecognizer
description: Reference for the SwipeGestureRecognizer gesture recognizer in Avalonia UI, which detects swipe and flick gestures for discrete paging interactions.
doc-type: reference
---

# SwipeGestureRecognizer

A gesture recognizer that tracks swipe gestures. This can be attached to a control to detect when a user rapidly drags a pointer in a single direction. It is optimized for discrete paging interactions such as carousel navigation, where a swipe left or right moves to the next or previous page. Unlike `ScrollGestureRecognizer`, it does not include inertia or continuous scrolling physics.

`SwipeGestureRecognizer` provides per-event velocity data, enabling speed-sensitive interactions where the flick speed determines whether a transition completes.

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

```csharp
swipeArea.GestureRecognizers.Add(new SwipeGestureRecognizer
{
    CanHorizontallySwipe = true,
    CanVerticallySwipe = false
});
```

The SwipeGestureRecognizer raises the `SwipeGesture` event during the swipe as the pointer moves. When the swipe ends (pointer released), it raises the `SwipeGestureEnded` event.

## Binding Events

After the SwipeGestureRecognizer has been added to your control, bind the events in your code-behind either through an inline handler or an event function:

```csharp
swipeArea.AddHandler(InputElement.SwipeGestureEvent, (s, e) =>
{
    // Called continuously during the swipe
    var direction = e.SwipeDirection; // Left, Right, Up, or Down
    var delta = e.Delta;             // Pixel delta since last event
    var velocity = e.Velocity;       // Current velocity in pixels/second
});

swipeArea.AddHandler(InputElement.SwipeGestureEndedEvent, (s, e) =>
{
    // Called when the pointer is released
    var velocity = e.Velocity; // Final velocity at release
});
```

Or use the CLR event wrappers directly:

```csharp
swipeArea.SwipeGesture += OnSwipeGesture;
swipeArea.SwipeGestureEnded += OnSwipeGestureEnded;

private void OnSwipeGesture(object? sender, SwipeGestureEventArgs e) { }
private void OnSwipeGestureEnded(object? sender, SwipeGestureEndedEventArgs e) { }
```

If your event handles the gesture completely, you can mark the event as handled by setting:

```csharp
e.Handled = true;
```

## SwipeDirection Values

The `SwipeDirection` property on `SwipeGestureEventArgs` indicates the dominant swipe axis:

| Value | Description |
| ----- | ----------- |
| `Left` | Horizontal swipe toward the left. |
| `Right` | Horizontal swipe toward the right. |
| `Up` | Vertical swipe upward. |
| `Down` | Vertical swipe downward. |

The direction is computed from the delta: if the horizontal distance is greater than or equal to the vertical distance, the direction is `Left` or `Right`; otherwise `Up` or `Down`.

## Useful Properties

You will probably use these properties most often:

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `CanHorizontallySwipe` | `bool` | `false` | Enables tracking of horizontal (left/right) swipes. |
| `CanVerticallySwipe` | `bool` | `false` | Enables tracking of vertical (up/down) swipes. |
| `Threshold` | `double` | `0` | Minimum pointer movement in pixels before the swipe is recognized. When `0`, the platform default threshold is used. |
| `IsMouseEnabled` | `bool` | `false` | When `true`, mouse pointer events trigger swipe gestures in addition to touch and pen. Touch and pen are always enabled. |
| `IsEnabled` | `bool` | `true` | Enables or disables the recognizer entirely. |

## SwipeGestureEventArgs Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `Id` | `int` | Unique identifier for this gesture sequence. |
| `Delta` | `Vector` | Pixel delta since the last event. |
| `Velocity` | `Vector` | Current swipe velocity in pixels per second. |
| `SwipeDirection` | `SwipeDirection` | Dominant swipe direction computed from `Delta`. |

## SwipeGestureEndedEventArgs Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `Id` | `int` | Unique identifier for this gesture sequence. |
| `Velocity` | `Vector` | Swipe velocity at the moment the pointer was released. |

## Example

### Detecting Horizontal Swipes to Navigate Pages

```csharp
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

### Vertical Swipe Detection

```xml
<Border Name="verticalSwipeArea" Background="Transparent">
    <Border.GestureRecognizers>
        <SwipeGestureRecognizer CanVerticallySwipe="True" />
    </Border.GestureRecognizers>
</Border>
```

### Enabling Mouse Support

By default, only touch and pen input trigger swipe gestures. Enable mouse support for desktop scenarios:

```xml
<Border.GestureRecognizers>
    <SwipeGestureRecognizer CanHorizontallySwipe="True"
                            IsMouseEnabled="True" />
</Border.GestureRecognizers>
```

## More Information

:::info
For the complete API documentation about this gesture recognizer, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_GestureRecognizers_SwipeGestureRecognizer).
:::

:::info
View the source code on _GitHub_ [`SwipeGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/SwipeGestureRecognizer.cs)
:::
