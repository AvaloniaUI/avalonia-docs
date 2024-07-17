# Object Lifetime Events

This topic describes the specific Avalonia events that signify stages in an object lifetime of creation, use, and destruction.

## Prerequisites

This topic assumes that you understand dependency properties from the perspective of a consumer of existing dependency properties on Avalonia classes, and have read the Dependency Properties Overview topic. In order to follow the examples in this topic, you should also understand XAML and know how to write Avalonia applications.

## Object Lifetime Events

All objects in .NET managed code go through a similar set of stages of life: creation, use, and destruction. Many objects also have a finalization stage of life that occurs as part of the destruction phase. Avalonia objects, more specifically the visual objects that Avalonia identifies as controls, also have a set of common stages of object life. The Avalonia programming and application models expose these stages as a series of events. There are four main types of objects in Avalonia with respect to lifetime events: controls in general, window controls, top-level controls, and application objects. Windows and top-level controls are also within the larger grouping of visual objects (controls). This topic describes the lifetime events that are common to all controls and then introduces the more specific ones that apply to application definitions, windows, or top-level controls.

## Common Lifetime Events for Controls

Any Avalonia control (those objects deriving from ```Control```) has three common lifetime events: ```Initialized```, ```Loaded```, and ```Unloaded```.

### Initialized

```Initialized``` is raised first and roughly corresponds to the initialization of the object by the call to its constructor. Because the event happens in response to initialization, you are guaranteed that all properties of the object are set. (An exception is expression usages such as dynamic resources or binding; these will be unevaluated expressions.) As a consequence of the requirement that all properties are set, the sequence of ```Initialized``` being raised by nested controls that are defined in markup appears to occur in order of deepest controls in the control tree first, then parent controls toward the root. This order is because the parent-child relationships and containment are properties, and therefore the parent cannot report initialization until the child controls that fill the property are also completely initialized.

When you are writing handlers in response to the ```Initialized``` event, you must consider that there is no guarantee that all other controls in the control tree (either logical tree or visual tree) around where the handler is attached have been created, particularly parent controls. Member variables may be null, or data sources might not yet be populated by the underlying binding (even at the expression level).

### Loaded

```Loaded``` is raised next. The ```Loaded``` event is raised before the final rendering, but after the layout system has calculated all necessary values for rendering. ```Loaded``` entails that the logical tree that a control is contained within is complete, and connects to a presentation source that provides the rendering surface. Standard data binding (binding to local sources, such as other properties or directly defined data sources) will have occurred prior to ```Loaded```. Asynchronous data binding (external or dynamic sources) might have occurred, but by definition of its asynchronous nature cannot be guaranteed to have occurred.

The mechanism by which the ```Loaded``` event is raised is different than ```Initialized```. The ```Initialized``` event is raised control by control, without direct coordination by a completed control tree. By contrast, the ```Loaded``` event is raised as a coordinated effort throughout the entire control tree (specifically, the logical tree). When all controls in the tree are in a state where they are considered loaded, the ```Loaded``` event is first raised on the root control. The ```Loaded``` event is then raised successively on each child control.

:::note 
This behavior might superficially resemble tunneling for a routed event. However, no information is carried from event to event. Each control always has the opportunity to handle its ```Loaded``` event, and marking the event data as handled has no effect beyond that control.
:::

### Unloaded

```Unloaded``` is raised last and is initiated by either the presentation source or the visual parent being removed. When ```Unloaded``` is raised and handled, the control that is the event source parent (as determined by ```Parent``` property) or any given control upwards in the logical or visual trees may have already been unset, meaning that data binding, resource references, and styles may not be set to their normal or last known run-time value.