---
id: control-trees
title: Traversing control trees with custom controls
sidebar_label: Traversing control trees
description: Understand how to use lifecycle events of the logical and visual trees when building a custom control.
doc-type: explanation
---

## Control trees: Summary

Avalonia organizes controls into two parallel tree structures: the **logical tree** and the **visual tree**. The logical tree represents the hierarchy of the application's controls, whereas the visual tree represents all visual elements that are being rendered.

This page provides guidance on working with the control trees when creating a custom control.

For more information on control trees, see [Visual and logical trees](/docs/fundamentals/visual-and-logical-trees).

## Tree traversal in custom controls

When building custom controls, you often need to respond to a control being added to or removed from a tree. Override these methods to hook into tree lifecycle events.

- `OnAttachedToLogicalTree` / `OnDetachedFromLogicalTree` for setup and cleanup of data bindings, subscriptions, or inherited properties.
- `OnAttachedToVisualTree` / `OnDetachedFromVisualTree` for rendering-related setup, such as acquiring platform resources.

Here is an example showing how to hook your custom control to the visual tree lifecycle.

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

## Where to mutate `LogicalChildren`

When a custom container needs to add or remove logical children programmatically (for example, inserting separators between items), do this inside a structured lifecycle hook, e.g., `OnApplyTemplate`, rather than a property-change callback like `DataContextChanged` or `OnPropertyChanged`. Mutating `LogicalChildren` while the logical tree is being walked can result in binding errors.

See [Mutating the logical tree](/docs/fundamentals/visual-and-logical-trees#mutating-the-logical-tree) for more information on safe and unsafe contexts.

## See also

- [Visual and Logical Trees](/docs/fundamentals/visual-and-logical-trees): Fundamental concepts.
- [Templated Controls](/docs/custom-controls/templated-controls): How templates expand into the visual tree.
