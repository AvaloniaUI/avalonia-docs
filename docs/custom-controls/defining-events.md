---
id: defining-events
title: Defining events
description: Define and raise routed events on custom Avalonia controls with tunneling and bubbling strategies.
doc-type: how-to
---

Events in Avalonia allow your custom controls to communicate and notify users of specific actions or occurrences. By defining events, you provide a way for users of your controls to respond and react to these events within their applications. This document will guide you through the process of defining events for your custom controls.

## Routed event

Routed events in Avalonia offer a mechanism for handling events that can travel (or "route") through the control tree, allowing multiple controls to respond to the same event. Routed events provide the following key features:

- **Event Routing**: Routed events can propagate up the tree (bubbling) or down the tree (tunneling), enabling controls at different levels to handle the same event. This allows for more flexible and centralized event handling.

- **Event Handlers**: Routed events use event handlers to respond to events. Event handlers are associated with specific controls or can be attached at higher levels in the visual tree to handle events from multiple controls.

- **Handled State**: Routed events have a `Handled` property that can be used to mark an event as handled, preventing further propagation. This allows fine-grained control over event handling.

- **Event Routing Strategies**: Avalonia supports different routing strategies for routed events, such as bubbling, tunneling, and direct routing. These strategies determine the order in which controls receive and handle events.
Avalonia routed events are particularly useful when you need to handle events that may occur within nested controls or when you want to centralize event handling logic higher up in the visual tree.

## Example

Here's an example of how to define a routed event for a hypothetical custom slider control:

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

In this example, a custom routed event called `ValueChangedEvent` is defined for the `MyCustomSlider` control. The event is registered using the `RoutedEvent` system, allowing it to be subscribed by users of the control. A CLR event is also defined for convenience, allowing the event to be consumed in manner consistent with standard .NET APIs.

## Custom event args

When your event needs to carry additional data, create a custom class that inherits from `RoutedEventArgs`:

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

Then update the event registration to use the custom args type:

```csharp
public static readonly RoutedEvent<ValueChangedEventArgs> ValueChangedEvent =
    RoutedEvent.Register<MyCustomSlider, ValueChangedEventArgs>(
        nameof(ValueChanged), RoutingStrategies.Bubble);
```

The CLR event wrapper and raise method should also be updated to match:

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

## Routing strategies

Avalonia supports several routing strategies that control how events propagate through the visual tree:

| Strategy | Behavior |
|----------|----------|
| `Direct` | Event fires only on the source control |
| `Bubble` | Event travels up from source to root |
| `Tunnel` | Event travels down from root to source |
| `Bubble \| Tunnel` | Event tunnels down, then bubbles up |

You can combine strategies using the bitwise OR operator:

```csharp
RoutedEvent.Register<MyControl, RoutedEventArgs>(
    nameof(MyEvent), RoutingStrategies.Bubble | RoutingStrategies.Tunnel);
```

Using `Bubble | Tunnel` together is useful when you want to give parent controls a chance to preview and intercept the event (during the tunnel phase) before the source control handles it (during the bubble phase).

## Handling events in XAML

Users of your custom control can subscribe to the event directly in XAML:

```xml
<local:MyCustomSlider ValueChanged="OnSliderValueChanged" />
```

With the corresponding handler in code-behind:

```csharp
private void OnSliderValueChanged(object? sender, ValueChangedEventArgs e)
{
    Debug.WriteLine($"Value changed from {e.OldValue} to {e.NewValue}");
}
```

## Class handlers

Class handlers let you register event handling logic at the class level rather than on individual instances. This is useful for default behavior that should apply to all instances of a control:

```csharp
static MyCustomSlider()
{
    ValueChangedEvent.AddClassHandler<MyCustomSlider>((s, e) => s.OnValueChanged(e));
}

private void OnValueChanged(ValueChangedEventArgs e)
{
    // Handle value change
}
```

Class handlers are invoked before instance handlers and are registered in the static constructor so they apply automatically to every instance of the control.

## See also

- [Routed Events](/docs/input-interaction/routed-events): Full routed events reference.
- [Events System](/docs/events/index): Overview of the events system.
- [Input Events](/docs/events/input-events): Built-in input events.
