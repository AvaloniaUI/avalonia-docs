---
id: defining-events
title: Defining events
description: Define and raise routed events on custom Avalonia controls with various strategies, such as tunneling or bubbling.
doc-type: how-to
---

Events allow your custom controls to recognize and communicate specific actions or occurrences. By defining events, you provide a way for users of your controls to respond and react to these events.

In Avalonia, **routed events** offer a mechanism for handling events that can travel (or "route") through the control tree, allowing multiple controls to respond to the same event. They can be used to handle events occurring within nested controls, or to centralize event handling logic at a common shared level higher up the visual tree.

## Routed events

Routed events provide the following key features:

- **Event routing:** Routed events can propagate up the tree (bubbling) or down the tree (tunneling), enabling controls at different levels to handle the same event. This allows for more flexible, centralized event handling.

- **Event handlers:** Routed events use event handlers to respond to events. Event handlers can be associated with specific controls, or attached at higher levels in the visual tree to handle events from multiple controls.

- **Handled state:** Routed events have a `Handled` property that can be used to mark an event as handled, preventing further propagation. This allows fine-grained control over event handling.

- **Routing strategies:** Avalonia supports different routing strategies for routed events, such as bubbling, tunneling, or direct routing. These strategies determine the order in which controls receive and handle events.

### Example

Here's an example of a routed event for a custom slider control. In this example, a custom routed event called `ValueChangedEvent` is defined for the control `MyCustomSlider`. The event is registered using the `RoutedEvent` system, allowing it to be subscribed by users of the control. A CLR event is also defined for convenience, which allows the event to be consumed by standard .NET APIs.

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

## Routing strategies

Avalonia supports the following routing strategies. These control how events propagate through the visual tree.

| Strategy | Behavior |
|----------|----------|
| `Direct` | Event fires only on the source control. |
| `Bubble` | Event travels up from source to root. |
| `Tunnel` | Event travels down from root to source. |
| `Bubble \| Tunnel` | Event tunnels down, then bubbles up. |

`Bubble | Tunnel` is an example of a combined strategy, which is defined using the bitwise OR operator like so:

```csharp
RoutedEvent.Register<MyControl, RoutedEventArgs>(
    nameof(MyEvent), RoutingStrategies.Bubble | RoutingStrategies.Tunnel);
```

Using `Bubble | Tunnel` together can be useful when you want to give parent controls a chance to preview and intercept the event (during the tunnel phase) before the source control handles it (during the bubble phase).

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

Class handlers register event handling logic at the class level rather than on individual instances. They are invoked before instance handlers and are registered in the static constructor, meaning they apply automatically to every instance of the same control. They are intended to define default behaviors that should apply to all instances of a control.

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

## See also

- [Routed Events](/docs/input-interaction/routed-events): Full routed events reference.
- [Events System](/docs/events): Overview of the events system.
- [Input Events](/docs/events/input-events): Built-in input events.
