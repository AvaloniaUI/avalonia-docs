# Property Change Events

Avalonia defines several events that are raised in response to a change in the value of a property. Often the property is a styled property (Avalonia's equivalent to WPF's dependency properties). The event itself is sometimes a routed event and sometimes a standard .NET event. The definition of the event varies depending on the scenario, because some property changes are more appropriately routed through a control tree, whereas other property changes are generally only of concern to the object where the property changed.

## Identifying a Property Change Event

Not all events that report a property change are explicitly identified as a property changed event, either by virtue of a signature pattern or a naming pattern. Generally, the description of the event in the Avalonia documentation indicates whether the event is directly tied to a property value change and provides cross-references between the property and event.

## PropertyChanged Events
In Avalonia, property change events typically use the standard .NET ```EventHandler<AvaloniaPropertyChangedEventArgs>``` delegate. The ```AvaloniaPropertyChangedEventArgs``` contains information about the property that changed, including the old and new values.

Unlike WPF, Avalonia doesn't have a direct equivalent to ```RoutedPropertyChangedEventArgs<T>```. Instead, property change events in Avalonia are typically implemented as standard .NET events.

When handling property change events, it's generally not recommended to change the property values again from within the event handler, as this may cause unintended recursion depending on how your handler is implemented.

For custom styled properties or when working with derived classes where you have defined the instantiation code, Avalonia provides mechanisms for tracking property changes that are built into the property system: ```CoerceValue``` and ```Changed``` callbacks. For more details about how you can use the Avalonia property system for validation and coercion, refer to the Avalonia documentation on styled properties.

## Property Triggers
Avalonia supports a concept similar to WPF's property triggers through its styling system. In Avalonia, you can use styles with setters that are conditionally applied based on property values.

The property for a style trigger must be a styled property. It can be (and frequently is) a read-only styled property. Properties that start with "Is" are often read-only Boolean styled properties where the primary scenario for the property is reporting control state that might have consequences to the real-time UI.

Compared to a true property changed event, using a style trigger to act on a property change has some limitations.
Style triggers in Avalonia work through a condition-based logic. You specify a property and a condition that indicates when the trigger will act. For instance:

```xml
<Style Selector="Button:pointerover">
    <Setter Property="Background" Value="Red"/>
</Style>
```

This is analogous to an "if" statement in programming. If the trigger condition is true, then the "body" of the style is "applied". The "body" of a style trigger is not code, it is markup. That markup is limited to using one or more Setter elements to set other properties of the object where the style is being applied.

Style triggers are generally appropriate for scenarios where one or more appearance properties should change, based on the state of another property on the same element.