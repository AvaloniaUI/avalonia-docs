---
id: input-events
title: Input events
description: Handle pointer, keyboard, and gesture input events in Avalonia controls.
doc-type: reference
---

Avalonia provides a comprehensive set of input events for handling pointer (mouse/touch/pen), keyboard, and gesture interactions. Most input events use a combined `Tunnel | Bubble` routing strategy, giving parent elements the opportunity to intercept input before it reaches the target.

## Pointer events

Pointer events abstract mouse, touch, and pen input into a unified model. They bubble up the visual tree by default.

| Event | Fires When |
|---|---|
| `PointerEntered` | The pointer enters the bounds of the control. |
| `PointerExited` | The pointer leaves the bounds of the control. |
| `PointerMoved` | The pointer moves within the control. |
| `PointerPressed` | A pointer button is pressed over the control. |
| `PointerReleased` | A pointer button is released over the control. |
| `PointerCaptureLost` | The control loses pointer capture. |
| `PointerWheelChanged` | The mouse wheel or trackpad scrolls over the control. |

### Handling pointer events

```csharp
protected override void OnPointerPressed(PointerPressedEventArgs e)
{
    base.OnPointerPressed(e);

    var point = e.GetPosition(this); // Position relative to this control
    var properties = e.GetCurrentPoint(this).Properties;

    if (properties.IsLeftButtonPressed)
    {
        // Left button pressed at (point.X, point.Y)
    }
}
```

### Key properties on `PointerEventArgs`

| Property / Method | Description |
|---|---|
| `GetPosition(Visual)` | Returns the pointer position relative to the specified visual. |
| `GetCurrentPoint(Visual)` | Returns a `PointerPoint` with position and button state. |
| `Pointer` | The `Pointer` instance, useful for capture operations. |
| `KeyModifiers` | Whether Shift, Control, Alt, or Meta keys are held. |

### Pointer capture

When you capture the pointer, all subsequent pointer events are directed to the capturing control until capture is released:

```csharp
protected override void OnPointerPressed(PointerPressedEventArgs e)
{
    base.OnPointerPressed(e);
    e.Pointer.Capture(this); // Start capturing
}

protected override void OnPointerReleased(PointerReleasedEventArgs e)
{
    base.OnPointerReleased(e);
    e.Pointer.Capture(null); // Release capture
}
```

Only one element can hold pointer capture at a time across the entire application. This matches operating system behavior where a single physical mouse device can only have one captured element. When a different control captures the pointer (for example, in a popup window), the previous capture is released and the original control receives a `PointerCaptureLost` event.

## Keyboard events

Keyboard events fire on the currently focused element and bubble up the tree.

| Event | Fires When |
|---|---|
| `KeyDown` | A key is pressed. |
| `KeyUp` | A key is released. |
| `TextInput` | Character input is received (after IME processing). |

### Handling keyboard events

```csharp
protected override void OnKeyDown(KeyEventArgs e)
{
    base.OnKeyDown(e);

    if (e.Key == Key.Enter)
    {
        // Handle Enter key
        e.Handled = true;
    }

    if (e.Key == Key.C && e.KeyModifiers.HasFlag(KeyModifiers.Control))
    {
        // Handle Ctrl+C
        e.Handled = true;
    }
}
```

### Key properties on `KeyEventArgs`

| Property | Description |
|---|---|
| `Key` | The physical key pressed (from the `Key` enum). |
| `KeyModifiers` | Modifier keys held (Control, Shift, Alt, Meta). |
| `KeySymbol` | The character produced by the key press, if any. |

## Tunneling (preview) events

For input events that use `Tunnel | Bubble` routing, the tunneling phase fires first. You can intercept events during the tunnel phase by using the routing strategy parameter:

```csharp
myControl.AddHandler(InputElement.PointerPressedEvent, OnPreviewPointerPressed,
    RoutingStrategies.Tunnel);
```

```csharp
private void OnPreviewPointerPressed(object? sender, PointerPressedEventArgs e)
{
    // This fires before the bubble phase
    // Set e.Handled = true to prevent the event from reaching child elements
}
```

This is useful for intercepting input at a parent level before child controls process it.

## Gesture events

Avalonia provides high-level gesture events built on top of raw pointer events:

| Event | Fires When |
|---|---|
| `Tapped` | A quick tap/click gesture completes. |
| `DoubleTapped` | A double-tap/double-click gesture completes. |
| `Holding` | A long-press gesture is detected (touch). |

Gesture events bubble up the tree. For more complex gestures (pinch, pull, scroll), see [Gestures](/docs/input-interaction/gestures).

```xml
<Border Tapped="OnBorderTapped" Background="LightGray">
    <TextBlock Text="Tap me" />
</Border>
```

```csharp
private void OnBorderTapped(object? sender, TappedEventArgs e)
{
    // Respond to the tap
}
```

## Common input patterns

### Drag detection

```csharp
private Point _pressPoint;
private bool _isDragging;

protected override void OnPointerPressed(PointerPressedEventArgs e)
{
    base.OnPointerPressed(e);
    _pressPoint = e.GetPosition(this);
    _isDragging = false;
    e.Pointer.Capture(this);
}

protected override void OnPointerMoved(PointerEventArgs e)
{
    base.OnPointerMoved(e);

    if (e.GetCurrentPoint(this).Properties.IsLeftButtonPressed)
    {
        var currentPoint = e.GetPosition(this);
        var delta = currentPoint - _pressPoint;

        if (!_isDragging && (Math.Abs(delta.X) > 3 || Math.Abs(delta.Y) > 3))
        {
            _isDragging = true;
        }

        if (_isDragging)
        {
            // Handle drag
        }
    }
}

protected override void OnPointerReleased(PointerReleasedEventArgs e)
{
    base.OnPointerReleased(e);
    _isDragging = false;
    e.Pointer.Capture(null);
}
```

### Keyboard shortcuts on a window

```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    protected override void OnKeyDown(KeyEventArgs e)
    {
        base.OnKeyDown(e);

        if (e.Key == Key.S && e.KeyModifiers.HasFlag(KeyModifiers.Control))
        {
            SaveDocument();
            e.Handled = true;
        }
    }
}
```

:::tip
For declarative keyboard shortcuts, consider using [KeyBindings and HotKeys](/docs/input-interaction/keyboard-and-hotkeys) instead of handling `KeyDown` manually.
:::

## See also

- [Events Overview](index): How routed events work in Avalonia.
- [Pointer Input](/docs/input-interaction/pointer): Detailed pointer input reference.
- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Keyboard shortcuts and key bindings.
- [Gestures](/docs/input-interaction/gestures): Touch and multi-pointer gesture recognition.
- [Focus](/docs/input-interaction/focus): How keyboard focus works.
