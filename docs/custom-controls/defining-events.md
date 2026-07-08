---
id: defining-events
title: Defining events for custom controls
sidebar_label: Defining events
description: Define and raise routed events on custom Avalonia controls.
doc-type: how-to
---

## Routed events: Summary

Avalonia uses a routed event system, where events travel through the control tree and allow multiple controls to respond to the same event. There are a number of routing strategies, most notably tunneling (where the event travels down the control tree from the root) and bubbling (where the event travels up the control tree from the source).

This page provides guidance on defining custom events for your controls.

For more information on routed events, see [Events overview](/docs/events).

## Custom routed events

Here's an example of a routed event for a custom slider control. In this example, a custom event called `ValueChangedEvent` is defined for the control `MyCustomSlider`. The event is registered using the `RoutedEvent` system, allowing it to be subscribed by users of the control. A CLR event is also defined for convenience, which allows the event to be consumed by standard .NET APIs.

```csharp
public class MyCustomSlider : Control
{
    public static readonly RoutedEvent<RoutedEventArgs> ValueChangedEvent =
        RoutedEvent.Register<MyCustomSlider, RoutedEventArgs>(nameof(ValueChanged), RoutingStrategies.Direct);

    public event EventHandler<RoutedEventArgs> ValueChanged
    {
        add => AddHandler(ValueChangedEvent, value);
        remove => RemoveHandler(ValueChangedEvent, value);
    }

    protected virtual void OnValueChanged()
    {
        RoutedEventArgs args = new RoutedEventArgs(ValueChangedEvent);
        RaiseEvent(args);
    }
}
```

## Custom event arguments

If your event needs to carry additional data, you can customize the args accepted by that event.

Continuing with the example of `ValueChangedEvent` for `MyCustomSlider` from the section above:

1. Start by creating a custom class that inherits from `RoutedEventArgs`.

    ```csharp
    public class ValueChangedEventArgs : RoutedEventArgs
    {
        public ValueChangedEventArgs(RoutedEvent routedEvent, double oldValue, double newValue)
            : base(routedEvent)
        {
            OldValue = oldValue;
            NewValue = newValue;
        }

        public double OldValue { get; }
        public double NewValue { get; }
    }
    ```

2. Update the event registration to use the custom args type.

    ```csharp
    public static readonly RoutedEvent<ValueChangedEventArgs> ValueChangedEvent =
        RoutedEvent.Register<MyCustomSlider, ValueChangedEventArgs>(
            nameof(ValueChanged), RoutingStrategies.Bubble);
    ```

3. Update the CLR event wrapper and raise method to match.

    ```csharp
    public event EventHandler<ValueChangedEventArgs> ValueChanged
    {
        add => AddHandler(ValueChangedEvent, value);
        remove => RemoveHandler(ValueChangedEvent, value);
    }

    protected virtual void OnValueChanged(double oldValue, double newValue)
    {
        var args = new ValueChangedEventArgs(ValueChangedEvent, oldValue, newValue);
        RaiseEvent(args);
    }
    ```

## Handling events in XAML

Users of your custom control can subscribe to the event directly in XAML, with the corresponding handler in code-behind.

<Tabs>

<TabItem value="xaml" label="XAML">

```xml
<local:MyCustomSlider ValueChanged="OnSliderValueChanged" />
```

</TabItem>

<TabItem value="csharp" label="C#">

```csharp
private void OnSliderValueChanged(object? sender, ValueChangedEventArgs e)
{
    Debug.WriteLine($"Value changed from {e.OldValue} to {e.NewValue}");
}
```

</TabItem>

</Tabs>

## Class handlers

Class handlers register event handling logic at the class level rather than on individual instances. They are typically registered in the static constructor. They are invoked before instance handlers, meaning they apply automatically to every instance of the same type.

Class handlers are used for control implementations that need to intercept input events before any instance-level handler can mark them as handled. A common use case is to define default behaviors that should apply to all instances of a control.

```csharp
static MyCustomSlider()
{
    ValueChangedEvent.AddClassHandler<MyCustomSlider>((s, e) => s.OnValueChanged(e));
}

private void OnValueChanged(ValueChangedEventArgs e)
{
    // Handle value change for all instances of MyCustomSlider
}
```

## See also

- [Routed Events](/docs/input-interaction/routed-events): Full routed events reference.
- [Events System](/docs/events): Overview of the events system.
- [Input Events](/docs/events/input-events): Built-in input events.
