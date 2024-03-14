---
id: keyframe-animations
title: How To Use Keyframe Animations
---

import AnimationKeyframeDiagram from '/img/basics/user-interface/animation-keyframe.png';
import KeyframeFadeScreenshot from '/img/guides/graphics-and-animations/keyframe-fade.gif';
import KeyframeCompositeAnimationScreenshot from '/img/guides/graphics-and-animations/keyframe-composite-animation.gif';
import LinearEasingScreenshot from '/img/guides/graphics-and-animations/linear-easing.gif';
import BounceEaseInScreenshot from '/img/guides/graphics-and-animations/bounce-ease-in.gif';

# How To Use Keyframe Animations

You can use a keyframe animation to change one or more control properties following a timeline. The keyframes are defined in _Avalonia UI_ styles with **cue** points along the **duration** of the animation, and set the intermediate values of the properties at a point in time.

<img src={AnimationKeyframeDiagram} alt=""/>

The property values between keyframes are set following the profile of an **easing function**. The default easing function is a straight-line interpolation.

The animation is triggered to start, and then can run any number of times, in either direction. There are also options to delay the start of the animation, and to repeat it.

:::info
If you are familiar with keyframe animations keyframe work in CSS, you will recognise the similarity with how they are done in in _Avalonia UI_.
:::

## Example

You define a keyframe animation using styles.

:::info
To revise how _Avalonia UI_ uses styles, see the concept [here](../../basics/user-interface/styling).
:::

Follow this procedure to define a simple color fade animation using XAML:

-  Create a styles collection at your chosen level.
-  Add a style to the collection with a selector that can target the control you want to animate.
-  Add a `Setter` element to define the property that you wan the animation to change. In this example `<Setter Property="Fill" Value="Red"/>`
-  Add a `Style.Animations` element to contain your animation.
-  Add an `Animation` element and set its `Duration` attribute. This is in the format `"Hours:Minutes:Seconds"`.
-  Now define the keyframes for the animation. This example uses cues at 0% and 100%.
-  Add `Setter` elements to each keyframe for value of the fill opacity. This example animates between opacity values of 0.0 and 1.0.

The finished code will look like this: 

```
<Window xmlns="https://github.com/avaloniaui">
    <Window.Styles>
        <Style Selector="Rectangle.red">
            <Setter Property="Fill" Value="Red"/>
            <Style.Animations>
                <Animation Duration="0:0:3"> 
                    <KeyFrame Cue="0%">
                        <Setter Property="Opacity" Value="0.0"/>
                    </KeyFrame>
                    <KeyFrame Cue="100%">
                        <Setter Property="Opacity" Value="1.0"/>
                    </KeyFrame>
                </Animation>
            </Style.Animations>
        </Style>
    </Window.Styles>

    <Rectangle Classes="red" Width="100" Height="100"/>
</Window>
```

The resulting animation looks like this:

<img src={KeyframeFadeScreenshot} alt=""/>

The animation runs as soon as the rectangle control is loaded and can be selected by the style. In fact it runs in the preview pane as well!

## Animate Two Properties

This example shows you how to animate two properties on the same timeline.

```xml
<Window.Styles>
    <Style Selector="Rectangle.red">
      <Setter Property="Fill" Value="Red"/>
      <Style.Animations>
        <Animation Duration="0:0:3" IterationCount="4">
          <KeyFrame Cue="0%">
            <Setter Property="Opacity" Value="0.0"/>
            <Setter Property="RotateTransform.Angle" Value="0.0"/>
          </KeyFrame>
          <KeyFrame Cue="100%"> 
            <Setter Property="Opacity" Value="1.0"/>
            <Setter Property="RotateTransform.Angle" Value="90.0"/>
          </KeyFrame>
        </Animation> 
    </Style.Animations>
    </Style>
  </Window.Styles>
```

The red rectangle is faded-in and rotated at the same time.

<img src={KeyframeCompositeAnimationScreenshot} alt=""/>

## Delay

You can add a delay to the start of an animation by setting the delay attribute of the animation element. For example:

```xml
<Animation Duration="0:0:1"
           Delay="0:0:1"> 
    ...
</Animation>
```

## Repeat

You can make an animation repeat for a set number of times, or indefinitely. To repeat for a finite number of iterations set the `IterationCount` attribute on the animation element like this:

```xml
<Animation IterationCount="5">
    ...
</Animation>
```

To repeat an animation indefinitely, use the special  `"INFINITE"` value. For example:

```xml
<Animation IterationCount="INFINITE">
    ...
</Animation>
```

## Playback Direction

By default an animation plays forward. That is it follows the profile of the easing function from left to right. You can alter this behavior by setting the `PlaybackDirection` attribute on the animation element. For example:

```xml
<Animation IterationCount="9" PlaybackDirection="AlternateReverse">
    ...
</Animation>
```

The following table describes the options:

<table><thead><tr><th width="245">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>Normal</code></td><td>(Default) The animation is played forwards.</td></tr><tr><td><code>Reverse</code></td><td>The animation is played in reverse direction.</td></tr><tr><td><code>Alternate</code></td><td>The animation is played forwards first, then backwards.</td></tr><tr><td><code>AlternateReverse</code></td><td>The animation is played backwards first, then forwards.</td></tr></tbody></table>

## Fill Mode

The fill mode attribute of an animation defines how the properties being set will persist after it runs, or during any gaps between runs. For example:

```xml
<Animation IterationCount="9" FillMode="Backward">
    ...
</Animation>
```

The following table describes the options:

<table><thead><tr><th width="240">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>None</code></td><td>Value will not persist after animation nor the first value will be applied when the animation is delayed.</td></tr><tr><td><code>Forward</code></td><td>The last interpolated value will be persisted to the target property.</td></tr><tr><td><code>Backward</code></td><td>The first interpolated value will be displayed on animation delay.</td></tr><tr><td><code>Both</code></td><td>Both <code>Forward</code> and <code>Backward</code> behaviors will be applied.</td></tr></tbody></table>

## Easing Function

An easing function defines how a property is varied over time during an animation.

<div>

<img src={LinearEasingScreenshot} alt=""/>

<img src={BounceEaseInScreenshot} alt=""/>

</div>

The default easing function is linear (above left), but you use another pattern by setting the name of the desired function in the easing attribute. For example to use the 'bounce ease in' function (above right):

```xml
<Animation Duration="0:0:1"
           Delay="0:0:1"
           Easing="BounceEaseIn"> 
    ...
</Animation>
```

:::info
For a full list of the _Avalonia UI_ easing functions, see the reference [here](../../reference/animation-settings.md).
:::

You can also add your own custom easing function class like this:

```xml
<Animation Duration="0:0:1"
           Delay="0:0:1">
    <Animation.Easing>
        <local:YourCustomEasingClassHere/>
    </Animation.Easing> 
    ...
</Animation>
```
