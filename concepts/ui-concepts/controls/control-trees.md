---
id: control-trees
title: Control trees
description: Understand the logical tree, visual tree, and event propagation that Avalonia builds from your XAML.
doc-type: explanation
---

import ControlTreesLogicalScreenshot from '/img/concepts/ui-concepts/controls/control-trees-logical.png';
import ControlTreesVisualScreenshot from '/img/concepts/ui-concepts/controls/control-trees-visual.png';
import ControlTreesEventScreenshot from '/img/concepts/ui-concepts/controls/control-trees-events.png';

When Avalonia loads your XAML, it builds two parallel tree structures: a **logical tree** that mirrors the controls you declared, and a **visual tree** that includes every element needed to render those controls on screen. Understanding both trees helps you debug layout issues, write efficient styles, and reason about how events travel through your UI.

## Logical tree

The logical tree represents the controls in your application (including the main window) in the hierarchy in which you defined them in XAML. For example, placing a `Button` inside a `StackPanel` inside a `Window` produces a three-level logical tree:

<img src={ControlTreesLogicalScreenshot} alt="The Avalonia DevTools window showing a three-level logical tree: Window, StackPanel, Button."/>

### Why the logical tree matters

- **Data context inheritance.** A control that does not set its own `DataContext` inherits the value from its logical parent. When a binding fails, checking the logical tree is the fastest way to see where the data context changes.
- **Style resolution.** Avalonia walks the logical tree when it resolves styles and resources. A `Style` defined inside a `UserControl` applies only to controls in that part of the logical tree.
- **Name lookup.** When you call `this.FindControl<T>("myName")` from code-behind, Avalonia searches the logical tree starting from the current control.

### Navigating the logical tree in code

You can walk the logical tree at runtime through the `ILogical` interface:

```csharp
// Walk up to find the nearest ancestor of a given type
var parentPanel = myButton.FindAncestorOfType<StackPanel>();

// Enumerate immediate logical children
foreach (var child in myPanel.GetLogicalChildren())
{
    // ...
}
```

While your application is running, you can open the DevTools window by pressing **F12**. The **Logical Tree** tab displays the full logical hierarchy.

## Visual tree

The visual tree contains every element that Avalonia actually renders. It includes the controls you declared plus additional parts added by each control's template (borders, content presenters, scroll viewers, and so on). Because a single logical control can expand into many visual elements, the visual tree is always deeper than the logical tree.

<img src={ControlTreesVisualScreenshot} alt="The Avalonia DevTools window showing the visual tree, which is deeper than the logical tree because it includes template parts."/>

### When to use the visual tree

- **Debugging rendering issues.** If a control is not appearing as expected, inspect the visual tree to see which template part is misconfigured.
- **Hit-testing.** Avalonia performs hit-testing against the visual tree, so understanding its structure helps you troubleshoot pointer and gesture handling.
- **Custom controls.** When you build a templated control, you work directly with visual-tree concepts such as template parts and `OnApplyTemplate`.

### Navigating the visual tree in code

The `Visual` base class exposes the visual tree:

```csharp
// Walk up the visual tree
var parentBorder = myButton.FindAncestorOfType<Border>(includeSelf: false);

// Enumerate visual children
foreach (var child in myPanel.GetVisualChildren())
{
    // ...
}
```

You can view the visual tree on the **Visual Tree** tab of the DevTools window.

## Events

Avalonia uses a routed-event system in which events travel through the control tree in up to three phases: tunneling (down the tree), direct (at the target), and bubbling (back up the tree). Understanding the tree structure is essential for predicting which handlers an event will reach.

The **Events** tab in DevTools logs the source and propagation of events as you interact with your running application, making it straightforward to trace the path an event takes.

<img src={ControlTreesEventScreenshot} alt="The Avalonia DevTools Events tab showing a log of routed events and their propagation paths."/>

### Practical tips for events

- **Tunneling events** (prefixed with `Preview`) travel down the visual tree before the corresponding bubbling event travels back up. Use them when a parent control needs to intercept input before a child handles it.
- **Mark an event as handled** by setting `e.Handled = true` in your handler. This stops further propagation, but you can still register a handler that receives handled events when you need to observe without interfering.
- **Attached events** let you listen for events on controls that do not define them. For example, you can listen for `Button.ClickEvent` on a parent panel to handle clicks from any button inside it.

## See also

- [Routed events](../user-input/routed-events)
- [Attached properties](attached-properties)
- [Layout](../layout)
- [DevTools keyboard shortcuts](../../../tools/developer-tools/shortcuts)
