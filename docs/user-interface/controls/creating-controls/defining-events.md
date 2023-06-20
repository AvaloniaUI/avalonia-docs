# Defining Events

Events in Avalonia allow your custom controls to communicate and notify users of specific actions or occurrences. By defining events, you provide a way for users of your controls to respond and react to these events within their applications. This document will guide you through the process of defining events for your custom controls.

## Why Define Control Events?

Defining events for your custom controls offers several benefits:

- **Interactivity**: Events enable users of your controls to respond to user interactions or specific occurrences within the control, such as button clicks, value changes, or state transitions.

- **Extensibility**: By defining events, you provide extension points for developers to customize the behavior of your controls or integrate them with other components or systems.

- **Decoupling**: Events facilitate loose coupling between your control and the consuming application, allowing developers to handle events independently and separate concerns effectively.

## Example

Here's an example of how to define a routed event for a hypothetical custom slider control:

```csharp
public class MyCustomSlider : Control
{
    public static readonly RoutedEvent<RoutedEventArgs> ValueChangedEvent =
        RoutedEvent.Register<MyCustomSlider, RoutedEventArgs>(nameof(ValueChanged), RoutingStrategies.Bubble);

    public event EventHandler<RoutedEventArgs> ValueChanged
    {
        add => AddHandler(ValueChangedEvent, value);
        remove => RemoveHandler(ValueChangedEvent, value);
    }

    protected virtual void OnValueChanged()
    {
        RoutedEventArgs args = new RoutedEventArgs(ValueChangedEvent, this);
        RaiseEvent(args);
    }
}
```

## Routed Events vs. CLR Events

There are two types of events commonly used in Avalonia: routed events and CLR (Common Language Runtime) events. Understanding the differences between these event systems is essential for effectively handling and raising events in your applications.

### Routed Events

Routed events are a powerful event system in Avalonia that allow events to travel or "route" through the visual tree. Routed events provide a convenient way to handle events at various levels of the visual tree hierarchy, from individual controls to their parent containers or even higher-level elements.

Key characteristics of routed events include:

- **Routing Strategies**: Routed events support three routing strategies: Bubble, Tunnel, and Direct. The routing strategy determines the direction in which the event travels through the visual tree, allowing parent or child elements to handle the event.

- **Event Routing**: Routed events are not limited to the control that raises them. They can be handled by any element along the route, including ancestor or descendant controls. This enables event handling at various levels of the visual tree.

- **Handled State**: Routed events have a "handled" state, which allows an event handler to mark an event as handled, preventing further routing of the event. This can be useful to control event handling and avoid redundant processing.

Routed events are well-suited for scenarios where you need to handle events at multiple levels of the visual tree or when you want to provide extensibility points for event handling in your controls.

### CLR Events

CLR events, also known as traditional events, are the standard event system provided by the .NET Framework. CLR events follow a simple event publishing and subscription model, where an object defines events and event handlers subscribe to and handle those events.

Key characteristics of CLR events include:

- **Direct Event Handling**: CLR events are directly handled by the object that raises the event. Event handlers are registered and invoked explicitly by the object raising the event.

- **Local Event Scope**: CLR events are limited to the control or object that defines them. Event handlers subscribed to a CLR event will only be invoked when the event is raised by that specific control.

- **Delegate-Based Event Model**: CLR events are based on delegates, with event handlers subscribing to events by providing a method with the same signature as the event delegate.

CLR events are straightforward to use and are typically used when you only need to handle events within a single control or object.

## Choosing Between Routed and CLR Events

When deciding whether to use routed events or CLR events in your Avalonia application, consider the following factors:

- **Event Scope**: If you need to handle events at multiple levels of the visual tree or provide extensibility points for event handling, routed events are a suitable choice.

- **Control-Specific Events**: For events that are specific to a particular control and are not expected to be handled by other elements in the visual tree, CLR events offer a simpler and more direct approach.

In some cases, a combination of both routed events and CLR events may be appropriate, depending on the requirements of your application and the desired event handling behavior.

## Conclusion

Understanding the differences between routed events and CLR events in Avalonia is crucial for designing effective event systems in your applications. Routed events offer flexibility and extensibility, allowing events to propagate through the visual tree, while CLR events provide a simpler model for handling events within a
