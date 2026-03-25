---
id: animations
title: Animations
description: Understand the animation systems available in Avalonia, including keyframe animations, control transitions, and composition animations, and learn when to use each one.
doc-type: explanation
---

import KeyframeDiagram from '/img/concepts/ui-concepts/animations/animation-keyframe.png';

Avalonia provides three animation systems, each suited to different scenarios. Understanding how they work and when to reach for each one helps you build responsive, polished user interfaces.

## Animation types at a glance

| Type | Defined in | Triggered by | Best for |
|---|---|---|---|
| [Keyframe animations](/docs/graphics-animation/keyframe-animations) | XAML styles | Style selectors | Multi-step, timeline-based animations (fade, rotate, pulse) |
| [Control transitions](/docs/graphics-animation/control-transitions) | XAML (inline or styles) | Property value changes | Smooth visual feedback when a property changes (opacity, color, size) |
| [Composition animations](/docs/graphics-animation/composition-animations) | C# code | `StartAnimation()` or implicit property changes | Performance-sensitive or programmatic animations on the render thread |

Additionally, [page transitions](/docs/graphics-animation/page-transitions) animate content switching in controls like `TransitioningContentControl` and `Carousel`.

## Keyframe animations

Keyframe animations change one or more property values over a specified duration. You define keyframes at cue points along a timeline, and Avalonia interpolates between them using an easing function (linear by default).

<img src={KeyframeDiagram} alt="Diagram showing a keyframe animation timeline with start and end cue points"/>

The simplest keyframe animation uses two cue points: 0% (start) and 100% (end). You can add intermediate cue points to create more complex motion sequences.

Keyframe animations are defined inside `Style.Animations` elements and rely on style selectors for triggering. If the selector is unconditional (for example, `Border`), the animation starts as soon as a matching control enters the visual tree. If the selector is conditional (for example, `Border:pointerover`), the animation runs only while the selector matches and stops when it no longer applies.

```xml
<Border Background="Blue" Width="100" Height="100">
    <Border.Styles>
        <Style Selector="Border">
            <Style.Animations>
                <Animation Duration="0:0:1" IterationCount="INFINITE"
                           PlaybackDirection="Alternate">
                    <KeyFrame Cue="0%">
                        <Setter Property="Opacity" Value="1.0" />
                    </KeyFrame>
                    <KeyFrame Cue="100%">
                        <Setter Property="Opacity" Value="0.3" />
                    </KeyFrame>
                </Animation>
            </Style.Animations>
        </Style>
    </Border.Styles>
</Border>
```

This creates a pulsing opacity effect that runs indefinitely, alternating between full and partial opacity.

### Choosing keyframe animations

Use keyframe animations when you need to:

- Animate multiple properties on the same timeline
- Create multi-step motion with intermediate cue points
- Trigger animations through style selectors and pseudo-classes (`:pointerover`, `:pressed`, and so on)
- Define animations entirely in XAML

## Control transitions

Transitions animate a property whenever its value changes, giving you smooth visual feedback without explicit keyframes. You attach them to a control's `Transitions` property or define them in a style.

```xml
<Button Content="Hover me" Background="Blue">
    <Button.Transitions>
        <Transitions>
            <BrushTransition Property="Background" Duration="0:0:0.3" />
            <DoubleTransition Property="Opacity" Duration="0:0:0.2" />
        </Transitions>
    </Button.Transitions>
</Button>
```

Each transition type corresponds to a property type. For example, use `DoubleTransition` for `double` properties like `Opacity`, `BrushTransition` for `IBrush` properties like `Background`, and `ThicknessTransition` for `Thickness` properties like `Margin`.

### Choosing transitions

Use transitions when you need to:

- Smoothly animate a single property change (such as opacity on hover)
- React automatically to property value changes without managing animation state
- Keep your animation logic simple and declarative

## Composition animations

Composition animations are a code-driven system that runs on the render thread. They offer fine-grained programmatic control and high performance because they do not block the UI thread.

```csharp
var visual = ElementComposition.GetElementVisual(myControl);
var compositor = visual.Compositor;

var animation = compositor.CreateVector3KeyFrameAnimation();
animation.Duration = TimeSpan.FromMilliseconds(400);
animation.InsertKeyFrame(0f, new Vector3D(-200, 0, 0));
animation.InsertKeyFrame(1f, new Vector3D(0, 0, 0));

visual.StartAnimation("Offset", animation);
```

You can also set up implicit composition animations that fire automatically whenever a visual property changes, which is useful for smooth repositioning in list controls.

### Choosing composition animations

Use composition animations when you need to:

- Drive animations from C# code (for example, in response to scroll position, gestures, or data changes)
- Run animations on the render thread for maximum smoothness
- Animate properties not reachable through XAML keyframe animations

For style-driven scenarios, keyframe animations and control transitions are simpler.

## Animation settings

Keyframe animations support several configuration options that control timing and playback behavior:

| Setting | Description | Example values |
|---|---|---|
| `Duration` | How long one cycle takes. | `0:0:1` (1 second) |
| `Delay` | Time to wait before starting. | `0:0:0.5` |
| `IterationCount` | Number of times to repeat. Use `INFINITE` for indefinite playback. | `3`, `INFINITE` |
| `PlaybackDirection` | Direction of playback. | `Normal`, `Reverse`, `Alternate`, `AlternateReverse` |
| `FillMode` | How the animated property behaves after the animation ends. | `Forward`, `Backward`, `Both`, `None` |
| `Easing` | The interpolation curve between keyframes. | `LinearEasing`, `CubicEaseInOut`, `BounceEaseIn` |

See [Animation Settings](/docs/graphics-animation/animation-settings) for details on each option and [Easing Functions](/docs/graphics-animation/easing-functions) for all available easing types.

## See also

- [Keyframe Animations](/docs/graphics-animation/keyframe-animations): Full keyframe animation syntax and examples.
- [Control Transitions](/docs/graphics-animation/control-transitions): Animating property changes with transitions.
- [Composition Animations](/docs/graphics-animation/composition-animations): Code-driven render-thread animations.
- [Page Transitions](/docs/graphics-animation/page-transitions): Animating content switching.
- [Animation Settings](/docs/graphics-animation/animation-settings): Duration, delay, iteration count, and playback direction.
- [Easing Functions](/docs/graphics-animation/easing-functions): All available easing function curves.
