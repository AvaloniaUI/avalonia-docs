---
id: easing-functions
title: Easing functions
description: Available easing functions for controlling animation timing curves in Avalonia.
doc-type: reference
---

Easing functions control the rate of change during an animation, giving motion a natural feel. Instead of animating at a constant speed (linear), easing functions accelerate, decelerate, or bounce values to create more engaging transitions.

## Using easing functions

Specify an easing function on a `KeyFrame` within a keyframe animation:

```xml
<Border Background="Blue" Width="50" Height="50">
    <Border.Styles>
        <Style Selector="Border">
            <Style.Animations>
                <Animation Duration="0:0:1" IterationCount="Infinite" PlaybackDirection="Alternate">
                    <KeyFrame Cue="0%" KeySpline="0.1,0.9,0.2,1.0">
                        <Setter Property="TranslateTransform.X" Value="0" />
                    </KeyFrame>
                    <KeyFrame Cue="100%">
                        <Setter Property="TranslateTransform.X" Value="300" />
                    </KeyFrame>
                </Animation>
            </Style.Animations>
        </Style>
    </Border.Styles>
</Border>
```

Or set the easing on the entire `Animation`:

```xml
<Animation Duration="0:0:0.5" Easing="CubicEaseOut">
    <KeyFrame Cue="0%">
        <Setter Property="Opacity" Value="0" />
    </KeyFrame>
    <KeyFrame Cue="100%">
        <Setter Property="Opacity" Value="1" />
    </KeyFrame>
</Animation>
```

Easing functions are also used in `Transitions` for property change animations:

```xml
<Border.Transitions>
    <DoubleTransition Property="Opacity" Duration="0:0:0.3" Easing="QuadraticEaseOut" />
</Border.Transitions>
```

## Built-in easing functions

Avalonia includes a comprehensive set of easing functions. Each function comes in three variants:

- **EaseIn**: Starts slow, accelerates toward the end
- **EaseOut**: Starts fast, decelerates toward the end
- **EaseInOut**: Starts slow, speeds up in the middle, then slows down at the end

### Linear

| Name | Behavior |
|---|---|
| `LinearEasing` | Constant speed. No acceleration or deceleration. |

### Sine

Easing based on a sine curve. Produces gentle, smooth motion.

| Name | Variant |
|---|---|
| `SineEaseIn` | Slow start, accelerates |
| `SineEaseOut` | Fast start, decelerates |
| `SineEaseInOut` | Slow start and end |

### Quadratic

Easing based on a squared curve (t^2). Slightly more pronounced than sine.

| Name | Variant |
|---|---|
| `QuadraticEaseIn` | Slow start |
| `QuadraticEaseOut` | Fast start |
| `QuadraticEaseInOut` | Slow start and end |

### Cubic

Easing based on a cubed curve (t^3). More dramatic than quadratic.

| Name | Variant |
|---|---|
| `CubicEaseIn` | Slow start |
| [`CubicEaseOut`](/api/avalonia/animation/easings/cubiceaseout) | Fast start |
| `CubicEaseInOut` | Slow start and end |

### Quartic

Easing based on t^4. Even stronger acceleration than cubic.

| Name | Variant |
|---|---|
| `QuarticEaseIn` | Slow start |
| `QuarticEaseOut` | Fast start |
| `QuarticEaseInOut` | Slow start and end |

### Quintic

Easing based on t^5. The most aggressive polynomial easing.

| Name | Variant |
|---|---|
| `QuinticEaseIn` | Slow start |
| `QuinticEaseOut` | Fast start |
| `QuinticEaseInOut` | Slow start and end |

### Exponential

Easing based on an exponential curve. Produces a very sharp acceleration.

| Name | Variant |
|---|---|
| `ExponentialEaseIn` | Very slow start, sharp acceleration |
| `ExponentialEaseOut` | Sharp deceleration, very slow end |
| `ExponentialEaseInOut` | Sharp acceleration and deceleration |

### Circular

Easing based on a circular curve. Produces a natural-feeling motion.

| Name | Variant |
|---|---|
| `CircularEaseIn` | Slow start |
| `CircularEaseOut` | Fast start |
| `CircularEaseInOut` | Slow start and end |

### Back

Overshoots the target before settling. Creates a "pull back" effect.

| Name | Variant |
|---|---|
| `BackEaseIn` | Pulls back before accelerating forward |
| [`BackEaseOut`](/api/avalonia/animation/easings/backeaseout) | Overshoots target, then settles back |
| `BackEaseInOut` | Pull back, overshoot, then settle |

### Bounce

Simulates a bouncing effect at the boundary.

| Name | Variant |
|---|---|
| `BounceEaseIn` | Bounces at the start |
| `BounceEaseOut` | Bounces at the end |
| `BounceEaseInOut` | Bounces at both ends |

### Elastic

Simulates a spring or rubber band effect with oscillation.

| Name | Variant |
|---|---|
| `ElasticEaseIn` | Oscillation at the start |
| [`ElasticEaseOut`](/api/avalonia/animation/easings/elasticeaseout) | Oscillation at the end |
| `ElasticEaseInOut` | Oscillation at both ends |

## Choosing an easing function

Common use cases for each easing type:

| Scenario | Recommended Easing |
|---|---|
| Fade in/out | `QuadraticEaseOut` or `CubicEaseOut` |
| Slide a panel in | `CubicEaseOut` |
| Slide a panel out | `CubicEaseIn` |
| Button press feedback | `QuadraticEaseInOut` |
| Expand/collapse | `CubicEaseInOut` |
| Notification pop-in | `BackEaseOut` |
| Playful bouncing | `BounceEaseOut` |
| Spring-like motion | `ElasticEaseOut` or `SpringEasing` |
| Subtle hover effect | `SineEaseOut` |

## SplineEasing (Custom Cubic Bezier)

For custom easing curves that do not match any built-in function, use `SplineEasing` with four control points that define a cubic bezier curve:

```xml
<Animation Duration="0:0:0.5">
    <Animation.Easing>
        <SplineEasing X1="0.25" Y1="0.1" X2="0.25" Y2="1.0" />
    </Animation.Easing>
    <KeyFrame Cue="0%">
        <Setter Property="Opacity" Value="0" />
    </KeyFrame>
    <KeyFrame Cue="100%">
        <Setter Property="Opacity" Value="1" />
    </KeyFrame>
</Animation>
```

You can also specify a spline easing inline using the `KeySpline` shorthand with comma-separated values:

```xml
<KeyFrame Cue="0%" KeySpline="0.25,0.1,0.25,1.0">
    <Setter Property="TranslateTransform.X" Value="0" />
</KeyFrame>
```

The four values (`X1`, `Y1`, `X2`, `Y2`) define two control points of a cubic bezier curve from (0,0) to (1,1). These match CSS `cubic-bezier()` values. Common presets:

| Curve | X1 | Y1 | X2 | Y2 | Equivalent |
|---|---|---|---|---|---|
| ease | 0.25 | 0.1 | 0.25 | 1.0 | CSS `ease` |
| ease-in | 0.42 | 0 | 1.0 | 1.0 | CSS `ease-in` |
| ease-out | 0 | 0 | 0.58 | 1.0 | CSS `ease-out` |
| ease-in-out | 0.42 | 0 | 0.58 | 1.0 | CSS `ease-in-out` |

## SpringEasing

`SpringEasing` simulates physics-based spring motion. Unlike the built-in elastic easing functions, spring easing lets you control the physical properties of the spring:

```xml
<Animation Duration="0:0:1">
    <Animation.Easing>
        <SpringEasing Mass="1" Stiffness="100" Damping="10" InitialVelocity="0" />
    </Animation.Easing>
    <KeyFrame Cue="0%">
        <Setter Property="TranslateTransform.Y" Value="-50" />
    </KeyFrame>
    <KeyFrame Cue="100%">
        <Setter Property="TranslateTransform.Y" Value="0" />
    </KeyFrame>
</Animation>
```

### Spring parameters

| Parameter | Description | Effect of increasing |
|---|---|---|
| `Mass` | Weight of the object on the spring | Slower, heavier motion |
| `Stiffness` | How stiff the spring is | Faster oscillation, snappier |
| `Damping` | Friction that slows the spring | Less oscillation, settles faster |
| `InitialVelocity` | Starting velocity of the motion | Stronger initial movement |

Low damping produces more "bouncy" motion. High damping produces overdamped motion where the value approaches the target without oscillating.

## Custom easing functions

Create a custom easing function by subclassing `Easing` and overriding the `Ease` method:

```csharp
using Avalonia.Animation.Easings;

public class StepEasing : Easing
{
    public int Steps { get; set; } = 4;

    public override double Ease(double progress)
    {
        return Math.Floor(progress * Steps) / Steps;
    }
}
```

Use the custom easing in XAML by referencing the namespace:

```xml
<Animation Duration="0:0:1">
    <Animation.Easing>
        <local:StepEasing Steps="8" />
    </Animation.Easing>
    <!-- keyframes -->
</Animation>
```

The `Ease` method receives a `progress` value from 0.0 to 1.0 representing the linear time progress, and returns a modified value (also typically 0.0 to 1.0, though overshooting is allowed for effects like `BackEaseOut` and `ElasticEaseOut`).

## See also

- [Keyframe Animations](/docs/graphics-animation/keyframe-animations): Using keyframes and easing in animations.
- [Control Transitions](/docs/graphics-animation/control-transitions): Automatic transitions on property changes.
- [Animation Settings](/docs/graphics-animation/animation-settings): Duration, delay, iteration count, and playback direction.
