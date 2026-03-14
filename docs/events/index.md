---
id: index
title: Events overview
description: Understand how routed events travel through the element tree in Avalonia.
doc-type: overview
---

Avalonia uses a routed event system similar to WPF. Routed events can travel through the element tree, allowing parent elements to handle events raised by their children. This is fundamental to how input, interaction, and control behavior work in Avalonia.

## Event routing strategies

Every routed event has a routing strategy that determines how the event travels through the element tree:

| Strategy | Direction | Description |
|---|---|---|
| `Bubble` | Child to parent | The event fires on the source element first, then travels up through each parent until it reaches the root. This is the most common strategy. |
| `Tunnel` | Parent to child | The event fires on the root element first, then travels down through the tree to the source element. Tunneling events are typically used for preview/interception scenarios. |
| `Direct` | Source only | The event fires only on the source element. It does not travel through the tree. |

Events can combine strategies. For example, many input events use both `Tunnel | Bubble`, which means the event first tunnels down from the root, then bubbles back up from the source.

### Bubble example

When a user clicks a `Button` inside a `StackPanel` inside a `Window`:

```text
Window          ← event arrives here last (bubble)
  └─ StackPanel ← event arrives here second
       └─ Button ← event starts here (source)
```

### Tunnel example

A tunneling event for the same tree:

```text
Window          ← event starts here first (tunnel)
  └─ StackPanel ← event arrives here second
       └─ Button ← event arrives here last (source)
```

## Handling routed events

### In XAML

Attach an event handler using the event name as an attribute:

```xml
<Button Click="OnButtonClick" Content="Click me" />
```

```csharp
private void OnButtonClick(object? sender, RoutedEventArgs e)
{
    // sender is the Button that was clicked
    // e.Source is the original source of the event
}
```

### In code

Use `AddHandler` and `RemoveHandler`:

```csharp
myButton.AddHandler(Button.ClickEvent, OnButtonClick);

// Later, to unsubscribe:
myButton.RemoveHandler(Button.ClickEvent, OnButtonClick);
```

### Handling bubbled events on a parent

Because events bubble up the tree, you can handle a child's event on a parent element:

```xml
<StackPanel Tapped="OnStackPanelTapped">
    <Button Content="Button 1" />
    <Button Content="Button 2" />
    <Button Content="Button 3" />
</StackPanel>
```

```csharp
private void OnStackPanelTapped(object? sender, TappedEventArgs e)
{
    // sender is the StackPanel (where the handler is attached)
    // e.Source is the specific Button that was tapped
    if (e.Source is Button button)
    {
        Debug.WriteLine($"Tapped: {button.Content}");
    }
}
```

## Marking events as handled

Set `e.Handled = true` to stop an event from continuing to route:

```csharp
private void OnButtonClick(object? sender, RoutedEventArgs e)
{
    e.Handled = true; // Prevents parent handlers from receiving this event
}
```

If you need to receive events that have already been marked as handled, use the `handledEventsToo` parameter:

```csharp
myPanel.AddHandler(Button.ClickEvent, OnButtonClick, RoutingStrategies.Bubble, handledEventsToo: true);
```

## `RoutedEventArgs` properties

| Property | Type | Description |
|---|---|---|
| `Source` | `object?` | The element that originally raised the event. |
| `Handled` | `bool` | Whether the event has been handled. Set to `true` to stop routing. |
| `Route` | `RoutingStrategies` | The current routing phase (`Tunnel`, `Bubble`, or `Direct`). |
| `RoutedEvent` | `RoutedEvent` | The routed event being raised. |

## Registering custom routed events

Define a custom routed event in your control:

```csharp
public class MyControl : Control
{
    public static readonly RoutedEvent<RoutedEventArgs> ValueChangedEvent =
        RoutedEvent.Register<MyControl, RoutedEventArgs>(
            nameof(ValueChanged),
            RoutingStrategies.Bubble);

    public event EventHandler<RoutedEventArgs>? ValueChanged
    {
        add => AddHandler(ValueChangedEvent, value);
        remove => RemoveHandler(ValueChangedEvent, value);
    }

    protected virtual void OnValueChanged()
    {
        RaiseEvent(new RoutedEventArgs(ValueChangedEvent));
    }
}
```

### Custom event args

For events that carry additional data, create a custom `RoutedEventArgs` subclass:

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

## Class handlers

Class handlers let you respond to events for all instances of a type, typically registered in a static constructor. Class handlers run before instance handlers.

```csharp
public class MyControl : Control
{
    static MyControl()
    {
        PointerPressedEvent.AddClassHandler<MyControl>((control, args) =>
        {
            control.OnPointerPressedInternal(args);
        });
    }

    private void OnPointerPressedInternal(PointerPressedEventArgs args)
    {
        // Handle for all instances of MyControl
    }
}
```

Class handlers are useful for control implementations that need to intercept input events before any instance-level handler can mark them as handled.

## Next steps

- [Routed Events](/docs/input-interaction/routed-events): Detailed reference on the routed event system.
- [Lifecycle Events](lifecycle-events): Events that fire during control creation, loading, and teardown.
- [Input Events](input-events): Pointer, keyboard, and gesture events.
- [Adding Interactivity](/docs/input-interaction/adding-interactivity): Practical guide to handling user interaction.
