---
id: lifecycle-events
title: Lifecycle events
description: Control initialization, visual tree attachment, and teardown events in Avalonia.
doc-type: reference
---

Avalonia controls raise several events during their creation, attachment to the visual tree, and removal. Understanding the order and purpose of these events is important for initializing controls, loading data, and cleaning up resources.

## Lifecycle event order

When a control is created and added to the visual tree, events fire in the following order:

| Order | Event / Method | Defined On | Description |
|---|---|---|---|
| 1 | `Initialized` | `StyledElement` | All property values from XAML have been set. The control is not yet part of the visual tree. |
| 2 | `AttachedToVisualTree` | `Visual` | The control has been added to a rooted visual tree. Layout has not yet occurred. |
| 3 | `Loaded` | `Control` | The control is fully attached and ready for interaction. This fires after the visual tree attachment is complete. |

When a control is removed:

| Order | Event / Method | Defined On | Description |
|---|---|---|---|
| 1 | `Unloaded` | `Control` | The control is about to be removed from the visual tree. |
| 2 | `DetachedFromVisualTree` | `Visual` | The control has been removed from the visual tree. |

## Initialized

The `Initialized` event fires when the XAML loader has finished setting all properties defined in markup. At this point, the control's property values are set but the control may not yet be part of a visual tree.

```csharp
public class MyControl : Control
{
    protected override void OnInitialized()
    {
        base.OnInitialized();
        // Properties from XAML are set
        // Visual tree may not be available yet
    }
}
```

Or subscribe externally:

```csharp
myControl.Initialized += (sender, e) =>
{
    // Control is initialized
};
```

**When to use**: Set up internal state that depends on XAML-defined property values but does not require the visual tree.

## AttachedToVisualTree / DetachedFromVisualTree

These events fire when a control is added to or removed from a rooted visual tree (a tree that has a `TopLevel` at its root).

```csharp
public class MyControl : Control
{
    protected override void OnAttachedToVisualTree(VisualTreeAttachmentEventArgs e)
    {
        base.OnAttachedToVisualTree(e);
        // e.RootVisual is the root of the visual tree
        // Start listening to external services, timers, etc.
    }

    protected override void OnDetachedFromVisualTree(VisualTreeAttachmentEventArgs e)
    {
        base.OnDetachedFromVisualTree(e);
        // Clean up external subscriptions, timers, etc.
    }
}
```

The `VisualTreeAttachmentEventArgs` provides:

| Property | Type | Description |
|---|---|---|
| `RootVisual` | `Visual` | The root visual of the tree the control was attached to. |
| `AttachmentPoint` | `Visual` | The visual that the control was directly attached to or detached from. |
| `PresentationSource` | `IPresentationSource` | The presentation source hosting the visual tree. |

**When to use**: Subscribe to or unsubscribe from external services, platform APIs, or events that should only be active while the control is visible.

## Loaded / Unloaded

The `Loaded` event fires after a control is attached to the visual tree and all related initialization is complete. The `Unloaded` event fires when the control is removed.

```csharp
public class MyControl : Control
{
    protected override void OnLoaded(RoutedEventArgs e)
    {
        base.OnLoaded(e);
        // Control is fully ready
        // Layout has occurred, bindings are active
    }

    protected override void OnUnloaded(RoutedEventArgs e)
    {
        base.OnUnloaded(e);
        // Clean up
    }
}
```

Or subscribe via XAML/code:

```csharp
myControl.Loaded += (sender, e) =>
{
    // Control is loaded and ready
};
```

**When to use**: Perform actions that require the control to be fully set up with an active visual tree, such as starting animations, measuring layout, or fetching data.

### Loaded vs AttachedToVisualTree

Both events indicate the control is part of the visual tree. The key difference:

- `AttachedToVisualTree` fires immediately when the control enters the tree. It is a plain CLR event on `Visual`.
- `Loaded` fires after the attachment is fully complete. It is a `RoutedEvent` on `Control`.

For most scenarios, `Loaded` is the right choice. Use `AttachedToVisualTree` when you need access to the `Root` reference or when working with non-`Control` visuals.

## DataContextChanged

The `DataContextChanged` event fires whenever the `DataContext` property changes on a `StyledElement`:

```csharp
myControl.DataContextChanged += (sender, e) =>
{
    var newContext = ((Control)sender!).DataContext;
    // React to the new data context
};
```

This event fires when:
- The `DataContext` is set directly on the control.
- The inherited `DataContext` changes because a parent's `DataContext` changed.
- The control moves to a different part of the visual tree with a different inherited `DataContext`.

## Typical initialization patterns

### Loading data in a view

```csharp
public partial class CustomerView : UserControl
{
    public CustomerView()
    {
        InitializeComponent();
    }

    protected override void OnLoaded(RoutedEventArgs e)
    {
        base.OnLoaded(e);

        if (DataContext is CustomerViewModel vm)
        {
            vm.LoadCustomersCommand.Execute(null);
        }
    }
}
```

### Managing subscriptions

```csharp
public class StatusMonitor : Control
{
    private IDisposable? _subscription;

    protected override void OnAttachedToVisualTree(VisualTreeAttachmentEventArgs e)
    {
        base.OnAttachedToVisualTree(e);
        _subscription = StatusService.StatusChanged.Subscribe(OnStatusChanged);
    }

    protected override void OnDetachedFromVisualTree(VisualTreeAttachmentEventArgs e)
    {
        _subscription?.Dispose();
        _subscription = null;
        base.OnDetachedFromVisualTree(e);
    }

    private void OnStatusChanged(string status)
    {
        // Update the control
    }
}
```

## See also

- [Events Overview](index): How the routed event system works.
- [Application Lifetimes](/docs/fundamentals/application-lifetimes): Application-level lifecycle events.
- [UI Composition](/docs/fundamentals/ui-composition): How controls are composed in the visual tree.
