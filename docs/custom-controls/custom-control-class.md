---
id: custom-control-class
title: Add a custom control class
description: Create a new custom control class file in an Avalonia project using IDE tooling or manually.
doc-type: how-to
---

Custom controls in Avalonia are built by inheriting from an appropriate base class. If you need full control over rendering, inherit from `Control` and draw directly with a [`DrawingContext`](/api/avalonia/media/drawingcontext). If you want the control's appearance to be defined by a `ControlTemplate` (a lookless control), inherit from `TemplatedControl` instead.

## Choosing a base class

| Base Class | Use When |
|---|---|
| `Control` | You want to render content using `DrawingContext` (custom drawing). |
| `TemplatedControl` | You want the appearance defined by a `ControlTemplate`. |
| `ContentControl` | Your control hosts a single piece of content. |
| `HeaderedContentControl` | Your control has a header and a content area. |
| `ItemsControl` | Your control displays a collection of items. |

All of these ultimately derive from `Control`, so properties like `Width`, `Height`, `Margin`, and `DataContext` are always available.

## Creating a custom drawn control

A custom drawn control inherits from `Control` and overrides the `Render` method to draw with a `DrawingContext`. You can also override `MeasureOverride` and `ArrangeOverride` to participate in layout and report your control's desired size.

The following example creates a simple circle control with a configurable `Fill` property:

```csharp
using System;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;

namespace AvaloniaCCExample.CustomControls
{
    public class CircleControl : Control
    {
        public static readonly StyledProperty<IBrush> FillProperty =
            AvaloniaProperty.Register<CircleControl, IBrush>(nameof(Fill), Brushes.Blue);

        public IBrush Fill
        {
            get => GetValue(FillProperty);
            set => SetValue(FillProperty, value);
        }

        static CircleControl()
        {
            AffectsRender<CircleControl>(FillProperty);
        }

        public override void Render(DrawingContext context)
        {
            var radius = Math.Min(Bounds.Width, Bounds.Height) / 2;
            var center = new Point(Bounds.Width / 2, Bounds.Height / 2);
            context.DrawEllipse(Fill, null, center, radius, radius);
        }
    }
}
```

Key points:

- **`FillProperty`** is a styled property, so it can be set in XAML, bound to data, and targeted by styles.
- The static constructor calls `AffectsRender`, which tells Avalonia to redraw the control whenever `Fill` changes.
- **`Render`** receives a `DrawingContext` that provides methods such as `DrawEllipse`, `DrawRectangle`, `DrawLine`, and `DrawText`.

## Using in XAML

To use a custom control in XAML, add an XML namespace that maps to the CLR namespace where your control lives. Then reference the control by its class name.

```xml title='XAML'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:cc="using:AvaloniaCCExample.CustomControls"
        x:Class="AvaloniaCCExample.MainWindow"
        Title="Avalonia Custom Control">
  <cc:CircleControl Height="200" Width="200" Fill="Red" />
</Window>
```

The `cc` prefix is arbitrary. It simply maps `AvaloniaCCExample.CustomControls` so the XAML parser can resolve `CircleControl`.

:::info
If your control lives in a separate class library, see [Custom Control Library](/docs/custom-controls/custom-control-library) for additional setup steps.
:::

## Invalidating rendering

Avalonia provides several mechanisms for telling the layout and rendering system that a control needs to be updated.

### AffectsRender, AffectsMeasure, and AffectsArrange

Call these static helpers in your control's static constructor to declare which properties trigger which stage of the rendering pipeline:

```csharp
static CircleControl()
{
    AffectsRender<CircleControl>(FillProperty);
    AffectsMeasure<CircleControl>(SomeOtherProperty);
    AffectsArrange<CircleControl>(YetAnotherProperty);
}
```

- **`AffectsRender`** causes a repaint (calls `Render` again) when the property changes.
- **`AffectsMeasure`** triggers a new measure pass, which is appropriate when a property changes the control's desired size.
- **`AffectsArrange`** triggers a new arrange pass, which is appropriate when a property changes how the control positions its content.

### Manual invalidation

If you need to trigger a repaint in response to something other than a property change (for example, a timer tick), call `InvalidateVisual()` on the control instance. This queues a new render pass for that control.

```csharp
// Force a repaint from code
InvalidateVisual();
```

Use manual invalidation sparingly. Declaring property dependencies with `AffectsRender` is preferred because it keeps invalidation automatic and predictable.

## See also

- [Templated Controls](/docs/custom-controls/templated-controls)
- [Drawing Custom Controls](/docs/custom-controls/drawing-custom-controls)
- [Defining Properties](/docs/custom-controls/defining-properties)
