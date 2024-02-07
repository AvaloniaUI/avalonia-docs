# Defining Events

Events in Avalonia allow your custom controls to communicate and notify users of specific actions or occurrences. By defining events, you provide a way for users of your controls to respond and react to these events within their applications. This document will guide you through the process of defining events for your custom controls.

## Routed Event

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

## Further Reading

For more information see the [Routed Events Deep Dive](../../../../concepts/input/routed-events.md)
