---
id: animations
title: Animations
---

import KeyframeDiagram from '/img/basics/user-interface/animation-keyframe.png';

# Animations

There are two types of animations in _Avalonia UI_:

* Keyframe Animation -  can change one or more property values using a timeline. Keyframes are defined along the timeline at cue points. The properties being changed are adjusted between keyframes using an easing function (which is a straight-line interpolation by default). Keyframe animations are a very versatile type of animation.
* Transitions - can change a single property.

## Keyframe Animation

The simplest keyframe animation will change one property value over a a specified duration by defining two keyframes with cue points at the start (0% of the duration) and the end (100% of the duration).

<img src={KeyframeDiagram} alt=''/>

The property value is then changed over time between the keyframes using the profile defined by an easing function. The default easing function is also the simplest - a straight-line interpolation between two keyframes.

:::info
You can see the full range of easing functions in the reference, [here](../../reference/animation-settings.md).
:::

## Triggering Animations

_Avalonia UI_ animations defined in XAML rely on selectors for their triggering behavior. Selectors can always apply to a control, or they can conditionally apply (for example if the control has a style class applied).

If the selector is not conditional then the animation will be triggered when a matching `Control` is spawned into the visual tree. Otherwise, the animations will run whenever its selector is activated. When the selector no longer matches, the currently running animation will be cancelled.

## Other Animation Settings

* Delay
* Repeat
* Playback Direction
* Value Fill Mode
* Easing Function
