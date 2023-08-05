---
info: dependencyproperty
title: DependencyProperty
---

The Avalonia equivalent of `DependencyProperty` is `StyledProperty`, however Avalonia [has a richer property system than WPF](../authoring-controls/defining-properties), and includes `DirectProperty` for turning standard CLR properties into Avalonia properties. The common base class of `StyledProperty` and `DirectProperty` is `AvaloniaProperty`.

If your dependency property uses `FrameworkPropertyMetadataOptions.AffectsMeasure` now you should use `AffectsMeasure<TControl>(MyProperty)` to obtain desired effect.

**WPF**
```csharp
// SplitterPanel control
public static readonly DependencyProperty OrientationProperty =
    DependencyProperty.Register(
        "Orientation",
        typeof(Orientation),
        typeof(SplitterPanel),
        new FrameworkPropertyMetadata(
            Orientation.Horizontal,
            FrameworkPropertyMetadataOptions.AffectsMeasure));
```

**Avalonia**
```csharp
// SplitterPanel control
public static readonly StyledProperty<Orientation> OrientationProperty =
    AvaloniaProperty.Register<SplitterPanel, Orientation>(nameof(Orientation), Orientation.Horizontal);

static SplitterPanel()
{
    AffectsMeasure<SplitterPanel>(OrientationProperty);
}
```