---
id: pointer
title: Mouse & Pointer devices
---

Avalonia operates on the abstraction called pointer devices. These devices including, but not limited to mouse, touch, pen etc. Each control in Avalonia provides following events which allow developer to subscribe to the pointer device movements, clicks and wheel movements: 
- PointerEnter
- PointerLeave
- PointerMoved
- PointerPressed
- PointerReleased
- PointerWheelChanged

Example how to react on pointer button pressed.

```csharp
control.PointerPressed += (args) =>
{
    var point = args.GetCurrentPoint();
    var x = point.Position.X;
    var y = point.Position.Y;
    if (point.Properties.IsLeftButtonPressed)
    {
        // left button pressed
    }
    if (point.Properties.IsRightButtonPressed)
    {
        // right button pressed
    }
}
```

In the example above, coordinates `x` and `y` are relatively to the window origin. If you want coordinates relative to the specific control, you may pass it to `PointerEventArgs.GetCurrentPoint` method like this: `var pointControlCoords = args.GetCurrentPoint(control);`

# Tapped event args

Each control also has special gesture events: Tapped and DoubleTapped.
Tapped is raised, when pointer was pressed on the control and then released. 
While DoubleTapped is raised after pointer was pressed twice on the same place. Allowed size (distance between first and second "tap") and time (delay between them) depend on the platform and usually is bigger for the touch devices. 

### Reference <a id="reference"></a>

[Control](http://reference.avaloniaui.net/api/Avalonia.Controls/Control/)
[PointerEventArgs](http://reference.avaloniaui.net/api/Avalonia.Input/PointerEventArgs/)