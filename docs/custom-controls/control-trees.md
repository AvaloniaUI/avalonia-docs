---
id: control-trees
title: Control trees
---

import ControlTreesLogicalScreenshot from '/img/concepts/ui-concepts/controls/control-trees-logical.png';
import ControlTreesVisualScreenshot from '/img/concepts/ui-concepts/controls/control-trees-visual.png';
import ControlTreesEventScreenshot from '/img/concepts/ui-concepts/controls/control-trees-events.png';

_Avalonia UI_ creates control trees from the XAML files in an application so that it can render the UI presentation and manage the application functionality.

## Logical Tree

The logical control tree represents the application controls (including the main window) in the hierarchy in which they are defined in the XAML. For example, a control (button) inside another control (stack panel) in a window will have the 3-layer logical tree shown here:

<img src={ControlTreesLogicalScreenshot} alt=""/>

While your application is running, you can show the _Avalonia Dev Tools_ window (hit F12). This displays the logical tree on its **Logical Tree** tab.

## Visual Tree

The visual control tree contains everything that is actually being run by _Avalonia UI_. It shows all the properties set on the controls, and all the additional parts that have been added by _Avalonia UI_ in order to present the UI and manage the application functionality.

<img src={ControlTreesVisualScreenshot} alt=""/>

You can see the visual control tree on the **Visual Tree** tab of the _Avalonia Dev Tools_ window.

## Events

An essential part of application functionality management performed by _Avalonia UI_, is the generation and propagation of events. The **Events** tab logs the source and propagation of events as you move around, and otherwise interact with the running application.

<img src={ControlTreesEventScreenshot} alt=""/>

## Logical Tree vs Visual Tree

The two trees serve different purposes and contain different levels of detail.

| Aspect | Logical Tree | Visual Tree |
|---|---|---|
| Contains | Controls as declared in XAML | All rendered elements including template parts |
| Template expansion | No (templates are single nodes) | Yes (templates are expanded into parts) |
| Used for | Data context inheritance, resource lookup | Rendering, hit testing, layout |
| Navigation API | `LogicalExtensions.GetLogicalParent()` | `VisualExtensions.GetVisualParent()` |

## Navigating the Trees in Code

Avalonia provides extension methods for walking both trees programmatically.

```csharp
// Walk up the logical tree
var parent = myControl.GetLogicalParent();

// Walk up the visual tree
var visualParent = myControl.GetVisualParent();

// Find a specific ancestor in the logical tree
var window = myControl.FindLogicalAncestorOfType<Window>();

// Find a specific ancestor in the visual tree
var border = myControl.FindAncestorOfType<Border>();

// Get all logical children
var children = myControl.GetLogicalChildren();
```

## Tree Traversal in Custom Controls

When building custom controls, you often need to respond to a control being added to or removed from a tree. Override these methods to hook into tree lifecycle events:

- `OnAttachedToLogicalTree` / `OnDetachedFromLogicalTree` for setup and cleanup of data bindings, subscriptions, or inherited properties.
- `OnAttachedToVisualTree` / `OnDetachedFromVisualTree` for rendering-related setup such as acquiring platform resources.

```csharp
protected override void OnAttachedToVisualTree(VisualTreeAttachmentEventArgs e)
{
    base.OnAttachedToVisualTree(e);
    // Control is now part of the visual tree and can be rendered
}

protected override void OnDetachedFromVisualTree(VisualTreeAttachmentEventArgs e)
{
    base.OnDetachedFromVisualTree(e);
    // Clean up rendering resources
}
```

## See Also

- [Visual and Logical Trees](/docs/fundamentals/visual-and-logical-trees): Fundamental concepts.
- [Templated Controls](/docs/custom-controls/templated-controls): How templates expand into the visual tree.
