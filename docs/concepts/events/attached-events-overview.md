---
description: CONCEPTS
---

# Attached Events Overview

Extensible Application Markup Language (XAML) defines a language component and type of event called an attached event. The concept of an attached event enables you to add a handler for a particular event to an arbitrary element rather than to an element that actually defines or inherits the event. In this case, neither the object potentially raising the event nor the destination handling instance defines or otherwise "owns" the event.

## Prerequisites
This topic assumes that you have a basic understanding of Avalonia's event system and XAML.

## Attached Event Syntax

Attached events have a XAML syntax and a coding pattern that must be used by the backing code in order to support the attached event usage.

In XAML syntax, the attached event is specified not just by its event name, but by its owning type plus the event name, separated by a dot (.). Because the event name is qualified with the name of its owning type, the attached event syntax allows any attached event to be attached to any element that can be instantiated.

For example, the following is the XAML syntax for attaching a handler for a custom ```NeedsCleaning``` attached event:

```xml
<aqua:Aquarium Name="theAquarium" 
               Height="600" 
               Width="800" 
               aqua:AquariumFilter.NeedsCleaning="WashMe"/>
```

Note the ```aqua:``` prefix; the prefix is necessary in this case because the attached event is a custom event that comes from a custom mapped xmlns.

## How Avalonia Implements Attached Events

In Avalonia, attached events are typically implemented using ```RoutedEvent<T>``` and are routed through the visual tree after they are raised. The source of the attached event (the object that raises the event) is often a system or service source, and the object that runs the code that raises the event is therefore not a direct part of the visual tree.

## Scenarios for Attached Events

In Avalonia, attached events are present in certain feature areas where there is service-level abstraction, such as for input-related events. Classes that interact with or use the service can either use the event in the attached event syntax, or they can choose to surface the attached event as a routed event that is part of how the class integrates the capabilities of the service.

## Handling an Attached Event in Avalonia

The process for handling an attached event, and the handler code that you will write, is basically the same as for a routed event.

In general, an Avalonia attached event is not very different from an Avalonia routed event. The differences are how the event is sourced and how it is exposed by a class as a member (which also affects the XAML handler syntax

## Defining Your Own Attached Events as Routed Events

If you are deriving from common Avalonia base classes, you can implement your own attached events by including certain pattern methods in your class and by using utility methods that are already present on the base classes.

The pattern is as follows:

1. A method ```AddEventNameHandler``` with two parameters. The first parameter is the instance to which the event handler is added. The second parameter is the event handler to add. The method must be public and static, with no return value.
2. 
3. A method ```RemoveEventNameHandler``` with two parameters. The first parameter is the instance from which the event handler is removed. The second parameter is the event handler to remove. The method must be public and static, with no return value.

For example, the following code defines the ```NeedsCleaning``` attached event on the owner class ```Aquarium```, using the Avalonia attached event strategy of declaring the attached event as a routed event:

```csharp
public static readonly RoutedEvent<RoutedEventArgs> NeedsCleaningEvent =
    RoutedEvent.Register<Aquarium, RoutedEventArgs>(nameof(NeedsCleaning), RoutingStrategies.Bubble);

public static void AddNeedsCleaningHandler(IAvaloniaObject target, EventHandler<RoutedEventArgs> handler)
{
    target.AddHandler(NeedsCleaningEvent, handler);
}

public static void RemoveNeedsCleaningHandler(IAvaloniaObject target, EventHandler<RoutedEventArgs> handler)
{
    target.RemoveHandler(NeedsCleaningEvent, handler);
}
```

Note that the method used to establish the attached event identifier field, ```RoutedEvent.Register```, is actually the same method that is used to register a non-attached routed event. Attached events and routed events all are registered to a centralized internal store.

## Raising an Avalonia Attached Event

You do not typically need to raise existing Avalonia-defined attached events from your code. These events follow the general "service" conceptual model, and service classes are responsible for raising the events.

However, if you are defining a custom attached event based on the Avalonia model of basing attached events on ```RoutedEvent<T>```, you can use ```RaiseEvent``` to raise an attached event from any ```Visual``` or ```Interactive```. Raising a routed event (attached or not) requires that you declare a particular element in the visual tree as the event source; that source is reported as the ```RaiseEvent``` caller. Determining which element is reported as the source in the tree is your service's responsibility.