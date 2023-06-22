---
description: CONCEPTS - Input
---

# Mouse and Pointer Devices

In _Avalonia UI_ you implement the interaction of pointing devices with your application using a 'pointer' abstraction. This can represent devices including, but not limited to a mouse, touchpad, and pen. _Avalonia UI_ controls have events that allow you to subscribe to pointer movements, clicks and wheel movements. These are as follows:

* PointerEnter
* PointerLeave
* PointerMoved
* PointerPressed
* PointerReleased
* PointerWheelChanged
* Tapped
* DoubleTapped

For example, you can subscribe to the event for one of the pointer buttons being pressed on a control, like this:

```csharp title='C#'
private void PointerPressedHandler (object sender, PointerPressedEventArgs args)
{
    var point = args.GetCurrentPoint(sender as Control);
    var x = point.Position.X;
    var y = point.Position.Y;
    var msg = $"Pointer press at {x}, {y} relative to sender.";
    if (point.Properties.IsLeftButtonPressed)
    {
        msg += " Left button pressed.";
    }
    if (point.Properties.IsRightButtonPressed)
    {
        msg += " Right button pressed.";
    }
    results.Text = msg ;
}
```

```xml title='XAML'
<StackPanel Margin="20" Background="AliceBlue" 
                PointerPressed="PointerPressedHandler" >
  <TextBlock x:Name="results" Margin="5">Ready...</TextBlock>
</StackPanel>
```

<img src="/img/gitbook-import/assets/pressed.gif" alt=""/>

## Pointer Position

In the example above, the pointer coordinates (`x` and `y`) have been calculated relative to the sender control origin (top, left), in this case the stack panel. If you want the coordinates relative to the containing window, then you can use the `GetCurrentPoint` method as follows:

```csharp
var point = args.GetCurrentPoint(this);
```

## Tap Events

Controls also have special gesture events, these are: `Tapped` and `DoubleTapped`. The tapped event is raised after the pointer is pressed on the control and then released. Double tapped is raised after pointer is pressed twice in the same place.&#x20;

:::info
Note that the maximum distance between a first and second tap, and the time delay between them, will depend on the target platform and usually is bigger for touch devices.
:::

## More Information

For the complete API documentation about pointer and tap events, see [here](http://reference.avaloniaui.net/api/Avalonia.Input/PointerEventArgs/).
