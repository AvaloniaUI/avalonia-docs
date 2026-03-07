---
id: animations
title: Animations
description: Overview of animation types in Avalonia including keyframe, transitions, and composition.
doc-type: overview
---

import KeyframeDiagram from '/img/concepts/ui-concepts/animations/animation-keyframe.png';

Avalonia provides three types of animations:

| Type | Description | Use case |
|---|---|---|
| [Keyframe Animations](keyframe-animations) | Change one or more properties over a timeline with multiple keyframes. | Complex, multi-step animations triggered by style selectors. |
| [Control Transitions](control-transitions) | Animate a single property when its value changes. | Smooth visual feedback for property changes (opacity, color, size). |
| [Composition Animations](composition-animations) | Code-driven animations that run on the render thread. | Performance-sensitive or programmatic animations controlled from C#. |

Additionally, [Page Transitions](page-transitions) animate content switching in controls like `TransitioningContentControl` and `Carousel`.

## Keyframe animations

The simplest keyframe animation changes one property value over a specified duration by defining two keyframes: one at the start (0%) and one at the end (100%).

<img src={KeyframeDiagram} alt="Diagram showing a keyframe animation timeline with start and end cue points"/>

The property value is interpolated between keyframes using an easing function. The default is linear interpolation.

### Quick example

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

This creates a pulsing opacity animation that runs forever, alternating between full and partial opacity.

See [Keyframe Animations](keyframe-animations) for the full syntax and more examples.

## Control transitions

Transitions animate a property whenever its value changes, providing smooth visual feedback without writing explicit keyframes:

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

See [Control Transitions](control-transitions) for transition types and configuration.

## Composition animations

Composition animations provide a lower-level, code-driven approach that runs on the render thread. Use them when you need programmatic control or render-thread performance:

```csharp
var visual = ElementComposition.GetElementVisual(myControl);
var compositor = visual.Compositor;

var animation = compositor.CreateVector3KeyFrameAnimation();
animation.Duration = TimeSpan.FromMilliseconds(400);
animation.InsertKeyFrame(0f, new Vector3D(-200, 0, 0));
animation.InsertKeyFrame(1f, new Vector3D(0, 0, 0));

visual.StartAnimation("Offset", animation);
```

See [Composition Animations](composition-animations) for the full API, implicit animations, and integration patterns.

## Triggering animations

Keyframe animations defined in XAML rely on style selectors for their triggering behavior:

- **Unconditional selector** (e.g., `Style Selector="Border"`): The animation starts when the control enters the visual tree.
- **Conditional selector** (e.g., `Style Selector="Border:pointerover"`): The animation runs when the selector matches (pointer is over the border) and stops when it no longer matches.

```xml
<Style Selector="Border:pointerover">
    <Style.Animations>
        <Animation Duration="0:0:0.3">
            <KeyFrame Cue="100%">
                <Setter Property="ScaleTransform.ScaleX" Value="1.1" />
                <Setter Property="ScaleTransform.ScaleY" Value="1.1" />
            </KeyFrame>
        </Animation>
    </Style.Animations>
</Style>
```

## Animation settings

Keyframe animations support these configuration options:

| Setting | Description | Example |
|---|---|---|
| `Duration` | How long one cycle takes. | `0:0:1` (1 second) |
| `Delay` | Time to wait before starting. | `0:0:0.5` |
| `IterationCount` | Number of times to repeat. Use `INFINITE` for forever. | `3`, `INFINITE` |
| `PlaybackDirection` | Direction of playback. | `Normal`, `Reverse`, `Alternate`, `AlternateReverse` |
| `FillMode` | What happens when the animation ends. | `Forward`, `Backward`, `Both`, `None` |
| `Easing` | The interpolation curve between keyframes. | `CubicEaseInOut` |

See [Animation Settings](animation-settings) for details on each option and [Easing Functions](easing-functions) for all available easing types.

## See also

- [Keyframe Animations](keyframe-animations): Full keyframe animation syntax and examples.
- [Control Transitions](control-transitions): Animating property changes.
- [Composition Animations](composition-animations): Code-driven render-thread animations.
- [Page Transitions](page-transitions): Animating content switching.
