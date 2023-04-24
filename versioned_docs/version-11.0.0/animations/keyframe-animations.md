# Keyframe Animations

Keyframe animations in Avalonia are heavily inspired by CSS Animations. They can be used to animate any number of properties on a control, using any number of keyframes to define the states that each property must pass through. Keyframe animations can run any number of times, in either direction.

## Defining A Keyframe Animation <a id="defining-a-keyframe-animation"></a>

Keyframe animations are applied using styles. They can be defined on any style by adding an `Animation` object to the `Style.Animation` property:

```markup
<Window xmlns="https://github.com/avaloniaui">
    <Window.Styles>
        <Style Selector="Rectangle.red">
            <Setter Property="Height" Value="100"/>
            <Setter Property="Width" Value="100"/>
            <Setter Property="Fill" Value="Red"/>
            <Style.Animations>
                <Animation Duration="0:0:1"> 
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

    <Rectangle Classes="red"/>
</Window>
```

The example above animates the target `Control` as defined by its [selector](https://docs.avaloniaui.net/docs/styling/selectors). It will be run immediately when the control is loaded.

## Triggering Animations <a id="triggering-animations"></a>

Unlike WPF's `Triggers`, Animations defined in XAML rely on [selectors](https://docs.avaloniaui.net/docs/styling/selectors) for their triggering behavior. Selectors can always apply to a control, or they can conditionally apply \(for example if the control has a style class appled\).

If the selector isn't conditional then the animation will be triggered when a matching `Control` is spawned into the visual tree. Otherwise, the animations will run whenever its selector is activated. When the selector no longer matches, the currently running animation will be canceled.

## `KeyFrames` <a id="keyframes"></a>

The `KeyFrame` objects defines when the target `Setter` objects should be applied on the target `Control`, with value interpolation in-between.

The `Cue` property of an `KeyFrame` object is based on the `Duration` of the parent animation and can be an absolute time index \(i.e., `"0:0:1"`\) or a percent of the animation's `Duration` \(i.e., `"0%"`, `"100%"`\). However, `Cue`'s value should not exceed the `Duration` specified.

All `Animation` objects should contain at least one `KeyFrame`, with a `Setter` that has target property and value.

Multiple properties can be also animated in a single Animation by adding additional `Setter` objects on the desired `KeyFrame`:

```markup
<Animation Duration="0:0:1"> 
    <KeyFrame Cue="0%">
        <Setter Property="Opacity" Value="0.0"/>
        <Setter Property="RotateTransform.Angle" Value="0.0"/>
    </KeyFrame>
    <KeyFrame Cue="100%">
        <Setter Property="Opacity" Value="1.0"/>
        <Setter Property="RotateTransform.Angle" Value="90.0"/>
    </KeyFrame>
</Animation>
```

## Delay <a id="delay"></a>

You can add a delay in a `Animation` by defining the desired delay time on its `Delay` property:

```markup
<Animation Duration="0:0:1"
           Delay="0:0:1"> 
    ...
</Animation>
```

## Repeat <a id="repeat"></a>

You can set the following repeat behaviors on `IterationCount` property of an `Animation`.

| Value | Description |
| :--- | :--- |
| `0` to N | Play N times. |
| `INFINITE` | Repeat Indefinitely |

## Playback Direction <a id="playback-direction"></a>

The `PlaybackDirection` property defines how should the animation be played, including repeats.

The following table describes the possible behaviors:

| Value | Description |
| :--- | :--- |
| `Normal` | The animation is played normally. |
| `Reverse` | The animation is played in reverse direction. |
| `Alternate` | The animation is played forwards first, then backwards. |
| `AlternateReverse` | The animation is played backwards first, then forwards. |

## Value fill modes <a id="value-fill-modes"></a>

The `FillMode` property defines whether the first or last interpolated value of an animation persist before or after running an animation and on delays in-between runs.

The following table describes the possible behaviors:

| Value | Description |
| :--- | :--- |
| `None` | Value will not persist after animation nor the first value will be applied when the animation is delayed. |
| `Forward` | The last interpolated value will be persisted to the target property. |
| `Backward` | The first interpolated value will be displayed on animation delay. |
| `Both` | Both `Forward` and `Backward` behaviors will be applied. |

## Easings <a id="easings"></a>

Easing functions can be set by setting the name of the desired function to the `Animation`'s `Easing` property:

```markup
<Animation Duration="0:0:1"
           Delay="0:0:1"
           Easing="BounceEaseIn"> 
    ...
</Animation>
```

You can also add your custom easing function class like this:

```markup
<Animation Duration="0:0:1"
           Delay="0:0:1">
    <Animation.Easing>
        <local:YourCustomEasingClassHere/>
    </Animation.Easing> 
    ...
</Animation>
```

The following list contains the built-in easing functions.

* LinearEasing \(Default\)
* BackEaseIn
* BackEaseInOut
* BackEaseOut
* BounceEaseIn
* BounceEaseInOut
* BounceEaseOut
* CircularEaseIn
* CircularEaseInOut
* CircularEaseOut
* CubicEaseIn
* CubicEaseInOut
* CubicEaseOut
* ElasticEaseIn
* ElasticEaseInOut
* ElasticEaseOut
* ExponentialEaseIn
* ExponentialEaseInOut
* ExponentialEaseOut
* QuadraticEaseIn
* QuadraticEaseInOut
* QuadraticEaseOut
* QuarticEaseIn
* QuarticEaseInOut
* QuarticEaseOut
* QuinticEaseIn
* QuinticEaseInOut
* QuinticEaseOut
* SineEaseIn
* SineEaseInOut
* SineEaseOut

