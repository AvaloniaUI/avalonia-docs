---
id: custom-drawn-controls
title: Custom-drawn controls
description: Create a custom control class with a unique visual appearance specified from code.
doc-type: how-to
---

If you need full control over the visual appearance of your custom control, create a new control class inheriting from `Control`. Override the `Render` method to draw the new class directly with a [`DrawingContext`](/api/avalonia/media/drawingcontext). You can even override `MeasureOverride` and `ArrangeOverride` to have the custom control participate in the layout pass.

## Creating a custom-drawn control

The following example creates a simple circle control with a configurable `Fill` property.

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

Notes:

- `FillProperty` is a styled property, so it can be set in XAML, bound to data, and targeted by styles.
- The static constructor calls `AffectsRender`, which tells Avalonia to redraw the control whenever `Fill` changes.
- `Render` receives a `DrawingContext` that provides methods such as `DrawEllipse`, `DrawRectangle`, `DrawLine`, and `DrawText`. For more information on how to use `DrawingContext`, see [Drawing custom controls](/docs/custom-controls/drawing-custom-controls).

## Using in XAML

To use a custom control in XAML, add an XML namespace that maps to the CLR namespace where your control lives. Then, reference the control by its class name.

```xml title='XAML'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        // highlight-next-line
        xmlns:cc="using:AvaloniaCCExample.CustomControls"
        x:Class="AvaloniaCCExample.MainWindow"
        Title="Avalonia Custom Control">
  // highlight-next-line
  <cc:CircleControl Height="200" Width="200" Fill="Red" />
</Window>
```

The `cc` prefix is arbitrary. Its purpose is to map `AvaloniaCCExample.CustomControls`, so the XAML parser can resolve `CircleControl`.

:::info
If your control lives in a separate class library, see [Custom Control Library](/docs/custom-controls/custom-control-library) for additional setup steps.
:::

## Invalidating rendering

Avalonia provides two mechanisms to tell the layout and rendering system that a control needs to be updated: The [`Affects` helpers](#affectsrender-affectsmeasure-and-affectsarrange) and [manual invalidation](#manual-invalidation).

### `AffectsRender`, `AffectsMeasure`, and `AffectsArrange`

`AffectsRender`, `AffectsMeasure`, and `AffectsArrange` are static helpers. Call them in your control's static constructor to declare which properties trigger which stage of the rendering pipeline.

```csharp
static CircleControl()
{
    AffectsRender<CircleControl>(FillProperty);
    AffectsMeasure<CircleControl>(SomeOtherProperty);
    AffectsArrange<CircleControl>(YetAnotherProperty);
}
```

- `AffectsRender` causes a repaint (i.e., calls `Render` again) when the property changes.
- `AffectsMeasure` triggers a new measure pass, which is appropriate when a property changes the control's desired size.
- `AffectsArrange` triggers a new arrange pass, which is appropriate when a property changes how the control positions its content.

### Manual invalidation

To trigger a visual update of the control in response to something other than a property change (for example, a timer tick), you can call a manual invalidation on the control instance.

```csharp
// Forces a repaint
InvalidateVisual();

// Forces a measure pass
InvalidateMeasure();

// Forces an arrange pass
InvalidateArrange();
```

:::tip
Use manual invalidation sparingly. Declaring property dependencies with `AffectsRender` is preferred because it keeps invalidation automatic and predictable.
:::

## See also

- [Drawing custom controls](/docs/custom-controls/drawing-custom-controls): Reference for the `DrawingContext` methods you call from `Render`.
- [Defining properties](/docs/custom-controls/defining-properties): Add styled, direct, and attached properties to a custom control.
- [Custom templated controls](/docs/custom-controls/templated-controls): The alternative approach, where a control theme defines the appearance.
- [Creating custom controls](/docs/custom-controls): Overview of the custom control types.
- [Custom control sample project](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CustomControls/SnowflakesControlSample): Practical sample showing a custom-drawn control.
