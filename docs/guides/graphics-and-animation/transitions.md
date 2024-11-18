---
id: transitions
title: How To Use Transitions
---


# How To Use Transitions

Transitions in Avalonia are also heavily inspired by CSS Animations. They listen to any changes in target property's value and subsequently animates the change according to its parameters. They can be defined on any `Control` via `Transitions` property:

```xml
<Window xmlns="https://github.com/avaloniaui">
    <Window.Styles>
        <Style Selector="Rectangle.red">
            <Setter Property="Height" Value="100"/>
            <Setter Property="Width" Value="100"/>
            <Setter Property="Fill" Value="Red"/>
            <Setter Property="Opacity" Value="0.5"/>
        </Style>
        <Style Selector="Rectangle.red:pointerover">
            <Setter Property="Opacity" Value="1"/>
        </Style>
    </Window.Styles>

    <Rectangle Classes="red">
        <Rectangle.Transitions>
            <Transitions>
                <DoubleTransition Property="Opacity" Duration="0:0:0.2"/>
            </Transitions>
        </Rectangle.Transitions>
    </Rectangle>

</Window>
```

The above example will listen to changes in the `Rectangle`'s `Opacity` property, and when the value changes, apply a smooth transition from the old value to the new value over 2 seconds.

Transitions can also be defined in any style by using a `Setter` with `Transitions` as the target property and encapsulating them in a `Transitions` object, like so:

```xml
<Window xmlns="https://github.com/avaloniaui">
    <Window.Styles>
        <Style Selector="Rectangle.red">
            <Setter Property="Height" Value="100"/>
            <Setter Property="Width" Value="100"/>
            <Setter Property="Fill" Value="Red"/>
            <Setter Property="Opacity" Value="0.5"/>
            <Setter Property="Transitions">
                <Transitions>
                    <DoubleTransition Property="Opacity" Duration="0:0:0.2"/>
                </Transitions>
            </Setter>
        </Style>
        <Style Selector="Rectangle.red:pointerover">
            <Setter Property="Opacity" Value="1"/>
        </Style>
    </Window.Styles>

    <Rectangle Classes="red"/>

</Window>
```

Every transition has a `Property`, `Delay`, `Duration` and an optional `Easing` property.

`Property` refers to a transition's target for listening and animating values upon.

`Delay` refers to the amount of time before the transition is applied to the target.

`Duration` refers to the amount of time that the transition plays.

The easing functions are the same as those described in [Keyframe Animations](./keyframe-animations#easings).

The following transition types are available. The correct type must be used depending on the type of the property being animated.

* `BoxShadowsTransition`: For `BoxShadows` target properties
* `BrushTransition`: For `IBrush` target properties
* `ColorTransition`: For `Color` target properties
* `CornerRadiusTransition`: For `CornerRadius` target properties
* `DoubleTransitions`: For `double` target properties
* `FloatTransitions`: For `float` target properties
* `IntegerTransitions`: For `int` target properties
* `PointTransition`: For `Point` target properties
* `SizeTransition`: For `Size` target properties
* `ThicknessTransition`: For `Thickness` target properties
* `TransformOperationsTransition`: For `ITransform` target properties
* `VectorTransition`: For `Vector` target properties

## Transitioning Render Transforms

Render transforms applied to controls using CSS-like syntax can be transitioned. The following example shows a Border which rotates 45 degrees when the pointer is hovered over it:

```xml title='XAML'
<Border Width="100" Height="100" Background="Red">
    <Border.Styles>
        <Style Selector="Border">
            <Setter Property="RenderTransform" Value="rotate(0)"/>
        </Style>
        <Style Selector="Border:pointerover">
            <Setter Property="RenderTransform" Value="rotate(45deg)"/>
        </Style>
    </Border.Styles>
    <Border.Transitions>
        <Transitions>
            <TransformOperationsTransition Property="RenderTransform" Duration="0:0:1"/>
        </Transitions>
    </Border.Transitions>
</Border>
```

```csharp title='C#'
new Border
{
    Width = 100,
    Height = 100,
    Background = Brushes.Red,
    Styles =
    {
        new Style(x => x.OfType<Border>())
        {
            Setters =
            {
                new Setter(
                    Border.RenderTransformProperty,
                    TransformOperations.Parse("rotate(0)"))
            },
        },
        new Style(x => x.OfType<Border>().Class(":pointerover"))
        {
            Setters =
            {
                new Setter(
                    Border.RenderTransformProperty,
                    TransformOperations.Parse("rotate(45deg)"))
            },
        },
    },
    Transitions = new Transitions
    {
        new TransformOperationsTransition
        {
            Property = Border.RenderTransformProperty,
            Duration = TimeSpan.FromSeconds(1),
        }
    }
};
```

The available transitions are:

| Transition   | Sample                                    | Acceptable units             |
| ------------ | ----------------------------------------- | ---------------------------- |
| `translate`  | `translate(10px)`, `translate(0px, 10px)` | `px`                         |
| `translateX` | `translateX(10px)`                        | `px`                         |
| `translateY` | `translateY(10px)`                        | `px`                         |
| `scale`      | `scale(10)`, `scale(0, 10)`               |                              |
| `scaleX`     | `scaleX(10)`                              |                              |
| `scaleY`     | `scaleY(10)`                              |                              |
| `skew`       | `skew(90deg)`, `skew(0, 90deg)`           | `deg`, `grad`, `rad`, `turn` |
| `skewX`      | `skewX(90deg)`                            | `deg`, `grad`, `rad`, `turn` |
| `skewY`      | `skewY(90deg)`                            | `deg`, `grad`, `rad`, `turn` |
| `rotate`     | `rotate(90deg)`                           | `deg`, `grad`, `rad`, `turn` |
| `matrix`     | `matrix(1,2,3,4,5,6)`                     |                              |

:::info
Avalonia also supports WPF-style render transforms such as `RotateTransform`, `ScaleTransform`, etc. These transforms cannot be transitioned: always use the CSS-like format if you want to apply a transition to a render transform.
:::
