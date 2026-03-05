---
id: decorator
title: Decorator
---

`Decorator` is a base class for controls that wrap and decorate a single child element. It handles hosting one child in both the logical and visual tree, and applies optional padding around it.

You do not typically use `Decorator` directly. Instead, use one of the built-in controls that derive from it, or create your own subclass when you need a custom wrapper with layout or rendering behavior.

## Built-in decorators

These controls inherit from `Decorator`:

| Control | Purpose |
| :--- | :--- |
| [Border](/controls/layout/containers/border) | Draws a border, background, corner radius, and box shadow around its child |
| [Viewbox](/controls/layout/containers/viewbox) | Scales its child to fit available space |
| [LayoutTransformControl](/controls/layout/layouttransformcontrol) | Applies a render transform that participates in layout |

## Useful properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `Child` | `Control` | The single child control to decorate. Marked as `[Content]`, so it can be set directly in XAML |
| `Padding` | `Thickness` | Space between the decorator's edge and its child |

## Example

### Creating a custom decorator

This example shows a minimal custom decorator that draws a colored background behind its child:

```csharp
public class HighlightDecorator : Decorator
{
    public static readonly StyledProperty<IBrush?> HighlightBrushProperty =
        AvaloniaProperty.Register<HighlightDecorator, IBrush?>(
            nameof(HighlightBrush), Brushes.Yellow);

    public IBrush? HighlightBrush
    {
        get => GetValue(HighlightBrushProperty);
        set => SetValue(HighlightBrushProperty, value);
    }

    public override void Render(DrawingContext context)
    {
        if (HighlightBrush is not null)
        {
            context.FillRectangle(HighlightBrush, new Rect(Bounds.Size));
        }
    }
}
```

```xml
<local:HighlightDecorator HighlightBrush="LightBlue" Padding="8">
  <TextBlock Text="Highlighted content" />
</local:HighlightDecorator>
```

### Using Decorator directly

While uncommon, you can use `Decorator` directly as a simple padding wrapper:

```xml
<Decorator Padding="16">
  <TextBlock Text="Padded content" />
</Decorator>
```

This behaves like a `Border` with no border or background, adding only padding around its child.

## See also

- [Border](/controls/layout/containers/border)
- [Viewbox](/controls/layout/containers/viewbox)
- [Decorator API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Decorator)
- [`Decorator.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Decorator.cs)
