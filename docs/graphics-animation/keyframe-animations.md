---
id: keyframe-animations
title: Using keyframe animations
description: Define keyframe animations in XAML to animate control properties over a timeline.
doc-type: how-to
---

import AnimationKeyframeDiagram from '/img/guides/ui-development/graphics/animation-keyframe.png';
import KeyframeFadeScreenshot from '/img/guides/ui-development/graphics/keyframe-fade.gif';
import KeyframeCompositeAnimationScreenshot from '/img/guides/ui-development/graphics/keyframe-composite-animation.gif';
import LinearEasingScreenshot from '/img/guides/ui-development/graphics/linear-easing.gif';
import BounceEaseInScreenshot from '/img/guides/ui-development/graphics/bounce-ease-in.gif';

You can use a keyframe animation to change one or more control properties following a timeline. The keyframes are defined in _Avalonia UI_ styles with **cue** points along the **duration** of the animation, and set the intermediate values of the properties at a point in time.

<Image light={AnimationKeyframeDiagram} alt="Diagram showing keyframe animation timeline with cue points" position="center" maxWidth={400} cornerRadius="true"/>
<br />

The property values between keyframes are set following the profile of an **easing function**. The default easing function is a straight-line interpolation.

The animation is triggered to start, and then can run any number of times, in either direction. There are also options to delay the start of the animation, and to repeat it.

In Avalonia, keyframe animations are defined using styles. See [Styles](/docs/styling/styles) for more information.

## Animating a property

To define a one-property animation on a control, such as a color fade:

1.  Create a styles collection at your chosen level.
2.  Add a style to the collection with a selector targeting the control.
3.  Add a `Setter` to define the property you want the animation to change, e.g., `Fill` in the below example.
4.  Add a `Style.Animations` tag for the animation itself.
5.  Add an `Animation` tag and set its `Duration` attribute. This is in the format `"Hours:Minutes:Seconds"`.
6.  Define the keyframes for the animation. The below example uses cues at 0% and 100%.
7. Each keyframe needs its own `Setter` to the value of the fill opacity.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
  <UserControl.Styles>
    <Style Selector="Rectangle.blue">
      <Setter Property="Fill" Value="Blue"/>
        <Style.Animations>
          <Animation Duration="0:0:3"
                     IterationCount="infinite"> 
            <KeyFrame Cue="0%">
              <Setter Property="Opacity" Value="0.0"/>
            </KeyFrame>
            <KeyFrame Cue="100%">
              <Setter Property="Opacity" Value="1.0"/>
            </KeyFrame>
          </Animation>
        </Style.Animations>
    </Style>
  </UserControl.Styles>

  <Rectangle Classes="blue" Width="100" Height="100"/>
</UserControl>
```

</XamlPreview>

## Animate two properties

This example shows you how to animate two properties on one timeline. This time, the blue rectangle fades and rotates at the same time.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
  <UserControl.Styles>
    <Style Selector="Rectangle.blue">
      <Setter Property="Fill" Value="Blue"/>
        <Style.Animations>
          <Animation Duration="0:0:3"
                     IterationCount="infinite">
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
  </UserControl.Styles>

  <Rectangle Classes="blue" Width="100" Height="100"/>
</UserControl>
```

</XamlPreview>

## Configuring animation

### Delay

You can add a delay to the start of an animation by setting the `Delay` attribute.

```xml
<Animation Duration="0:0:1"
           Delay="0:0:1"> 
    ...
</Animation>
```

### Repeat

You can make an animation repeat for a set number of times, or infinitely, by setting the `IterationCount` attribute.

```xml
<!-- Repeat 5 times -->
<Animation IterationCount="5">
    ...
</Animation>

<!-- Repeat indefinitely -->
<Animation IterationCount="infinite">
    ...
</Animation>
```

### Playback direction

By default, an animation plays forward, following the profile of the easing function from left to right. You can alter this behavior by setting the `PlaybackDirection` attribute.

```xml
<Animation Duration="0:0:1" PlaybackDirection="Reverse">
    ...
</Animation>
```

For a full list of `PlaybackDirection` options, see the [animation settings reference](/docs/graphics-animation/animation-settings#playback-direction).

### Fill mode

The fill mode attribute of an animation defines how the properties being set will persist after it runs, or during gaps between runs.

```xml
<Animation IterationCount="9" FillMode="Backward">
    ...
</Animation>
```

For a full list of `FillMode` options, see the [animation settings reference](/docs/graphics-animation/animation-settings#fill-mode).

### Playback behavior

By default, a keyframe animation pauses when its target control is not effectively visible. When the control becomes visible again, the animation resumes from where it paused.

You can change this behavior by setting the `PlaybackBehavior` attribute.

```xml
<Animation Duration="0:0:1" IterationCount="infinite" PlaybackBehavior="Always">
    ...
</Animation>
```

For a full list of `PlaybackBehavior` options, see the [animation settings reference](/docs/graphics-animation/animation-settings#playback-behavior).

:::info
This playback behavior applies to keyframe animations only. [Control transitions](/docs/graphics-animation/control-transitions) and [composition animations](/docs/graphics-animation/composition-animations) are not affected.
:::

### Easing functions

An easing function defines how a property is varied over time during an animation.

<Image light={LinearEasingScreenshot} alt="Graph showing linear easing function" position="center" maxWidth={400} cornerRadius="true"/>
<br />

The default easing function is linear (above). You can use another pattern by setting the name of the desired function in the `Easing` attribute. For example, to use the 'bounce ease in' function (below):

```xml
<Animation Duration="0:0:1"
           Delay="0:0:1"
           // highlight-next-line
           Easing="BounceEaseIn"> 
    ...
</Animation>
```

<Image light={BounceEaseInScreenshot} alt="Graph showing bounce ease-in easing function" position="center" maxWidth={400} cornerRadius="true"/>
<br />

You can also create a custom easing function class and apply it like so:

```xml
<Animation Duration="0:0:1"
           Delay="0:0:1">
    <Animation.Easing>
        <local:YourCustomEasingClassHere/>
    </Animation.Easing> 
    ...
</Animation>
```

For a full list of easing functions, see the [animation settings reference](/docs/graphics-animation/animation-settings#easing-functions).

## Running animations from code-behind

For deeper control of the animation lifetime, you can define an animation as a `Resource`, so it can be used in the code-behind.

When defining an animation as a resource, you must set an `x:Key` to allow the animation to be accessed, as well as an `x:SetterTargetType` to specify the target control.

```xml
<Window xmlns="https://github.com/avaloniaui">
    <Window.Resources>
        // highlight-start
        <Animation x:Key="ResourceAnimation"
                   x:SetterTargetType="Rectangle"
        // highlight-end
                   Duration="0:0:3"> 
            <KeyFrame Cue="0%">
                <Setter Property="Opacity" Value="0.0"/>
            </KeyFrame>
            <KeyFrame Cue="100%">
                <Setter Property="Opacity" Value="1.0"/>
            </KeyFrame>
        </Animation>
    </Window.Resources>

    <Rectangle x:Name="Rect" />
</Window>
```

The `ResourceAnimation` defined above can now be accessed in a code-behind handler.

```csharp
var animation = (Animation)this.Resources["ResourceAnimation"];
// Running XAML animation on the Rect control. 
await animation.RunAsync(Rect);
```

`RunAsync` returns a task which is completed when the animation ends. If an animation repeats infinitely, the task never ends, unless (1) the `RunAsync` method is cancelled by a `CancellationToken`, or (2) the target control is detached from the visual tree.

## See also

- [Animation Settings](/docs/graphics-animation/animation-settings): Duration, delay, iteration count, and playback direction.
- [Easing Functions](/docs/graphics-animation/easing-functions): All available easing functions.
- [Control Transitions](/docs/graphics-animation/control-transitions): Animating property changes with transitions.
- [PlaybackBehavior](/api/avalonia/animation/playbackbehavior): API reference for visibility-based playback control.