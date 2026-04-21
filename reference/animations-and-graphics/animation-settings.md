---
id: animation-settings
title: Animation settings
---

import LinearEasingScreenshot from '/img/reference/animations-and-graphics/animation-settings/linear-easing.png';
import BackEaseInScreenshot from '/img/reference/animations-and-graphics/animation-settings/back-ease-in.png';
import BackEaseInOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/back-ease-in-out.png';
import BackEaseOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/back-ease-out.png';
import BounceEaseInScreenshot from '/img/reference/animations-and-graphics/animation-settings/bounce-ease-in.png';
import BounceEaseInOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/bounce-ease-in-out.png';
import BounceEaseOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/bounce-ease-out.png';
import CircularEaseInScreenshot from '/img/reference/animations-and-graphics/animation-settings/circular-ease-in.png';
import CircularEaseInOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/circular-ease-in-out.png';
import CircularEaseOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/circular-ease-out.png';
import CubicEaseInScreenshot from '/img/reference/animations-and-graphics/animation-settings/cubic-ease-in.png';
import CubicEaseInOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/cubic-ease-in-out.png';
import CubicEaseOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/cubic-ease-out.png';
import ElasticEaseInScreenshot from '/img/reference/animations-and-graphics/animation-settings/elastic-ease-in.png';
import ElasticEaseInOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/elastic-ease-in-out.png';
import ElasticEaseOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/elastic-ease-out.png';
import ExponentialEaseInScreenshot from '/img/reference/animations-and-graphics/animation-settings/exponential-ease-in.png';
import ExponentialEaseInOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/exponential-ease-in-out.png';
import ExponentialEaseOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/exponential-ease-out.png';
import QuadraticEaseInScreenshot from '/img/reference/animations-and-graphics/animation-settings/quadratic-ease-in.png';
import QuadraticEaseInOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/quadratic-ease-in-out.png';
import QuadraticEaseOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/quadratic-ease-out.png';
import QuarticEaseInScreenshot from '/img/reference/animations-and-graphics/animation-settings/quartic-ease-in.png';
import QuarticEaseInOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/quartic-ease-in-out.png';
import QuarticEaseOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/quartic-ease-out.png';
import QuinticEaseInScreenshot from '/img/reference/animations-and-graphics/animation-settings/quintic-ease-in.png';
import QuinticEaseInOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/quintic-ease-in-out.png';
import QuinticEaseOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/quintic-ease-out.png';
import SineEaseInScreenshot from '/img/reference/animations-and-graphics/animation-settings/sine-ease-in.png';
import SineEaseInOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/sine-ease-in-out.png';
import SineEaseOutScreenshot from '/img/reference/animations-and-graphics/animation-settings/sine-ease-out.png';

This section describes how `Animation` playback can be customized.

## Easing Functions

`Easing` functions describe how quickly an animated property changes from its starting value into its ending value across the animation time. `Avalonia.Animation.Easings` contains the following easings:

| Default                                                       |
|---------------------------------------------------------------|
| `LinearEasing`<br/><Image light={LinearEasingScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/> |

| Ease-In                                                                 | Ease-Out                                                                  | Ease-In-Out                                                                   |
|-------------------------------------------------------------------------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| `SineEaseIn`<br/><Image light={SineEaseInScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>               | `SineEaseOut`<br/><Image light={SineEaseOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>               | `SineEaseInOut`<br/><Image light={SineEaseInOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>               |
| `QuadraticEaseIn`<br/><Image light={QuadraticEaseInScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>     | `QuadraticEaseOut`<br/><Image light={QuadraticEaseOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>     | `QuadraticEaseInOut`<br/><Image light={QuadraticEaseInOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>     |
| `CubicEaseIn`<br/><Image light={CubicEaseInScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>             | `CubicEaseOut`<br/><Image light={CubicEaseOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>             | `CubicEaseInOut`<br/><Image light={CubicEaseInOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>             |
| `QuarticEaseIn`<br/><Image light={QuarticEaseInScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>         | `QuarticEaseOut`<br/><Image light={QuarticEaseOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>         | `QuarticEaseInOut`<br/><Image light={QuarticEaseInOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>         |
| `QuinticEaseIn`<br/><Image light={QuinticEaseInScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>         | `QuinticEaseOut`<br/><Image light={QuinticEaseOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>         | `QuinticEaseInOut`<br/><Image light={QuinticEaseInOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>         |
| `ExponentialEaseIn`<br/><Image light={ExponentialEaseInScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/> | `ExponentialEaseOut`<br/><Image light={ExponentialEaseOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/> | `ExponentialEaseInOut`<br/><Image light={ExponentialEaseInOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/> |
| `CircularEaseIn`<br/><Image light={CircularEaseInScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>       | `CircularEaseOut`<br/><Image light={CircularEaseOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>       | `CircularEaseInOut`<br/><Image light={CircularEaseInOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>       |
| `BackEaseIn`<br/><Image light={BackEaseInScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>               | `BackEaseOut`<br/><Image light={BackEaseOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>               | `BackEaseInOut`<br/><Image light={BackEaseInOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>             |
| `ElasticEaseIn`<br/><Image light={ElasticEaseInScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>         | `ElasticEaseOut`<br/><Image light={ElasticEaseOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>         | `ElasticEaseInOut`<br/><Image light={ElasticEaseInOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>         |
| `BounceEaseIn`<br/><Image light={BounceEaseInScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>           | `BounceEaseOut`<br/><Image light={BounceEaseOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>           | `BounceEaseInOut`<br/><Image light={BounceEaseInOutScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>           |

Additionally, you can provide your own easing by deriving from `Easing` or by providing parameters to `SplineEasing` or `SpringEasing`.

## FillModes

The `FillMode` attribute of an `Animation` defines how the animated property persists after an animation completes and during delays in-between runs.

The following table describes the supported behaviors:

| Value      | Description                                                                                               |
|------------|-----------------------------------------------------------------------------------------------------------|
| `None`     | Value will not persist after animation nor the first value will be applied when the animation is delayed. |
| `Forward`  | The last interpolated value will be persisted to the target property.                                     |
| `Backward` | The first interpolated value will be displayed on animation delay.                                        |
| `Both`     | Both `Forward` and `Backward` behaviors will be applied.                                                  |

## PlaybackDirection

`PlaybackDirection` defines how the `Animation` will be played. The following table describes the possible settings:

| Value              | Description                                             |
|--------------------|---------------------------------------------------------|
| `Normal`           | The animation is played normally.                       |
| `Reverse`          | The animation is played in reverse direction.           |
| `Alternate`        | The animation is played forwards first, then backwards. |
| `AlternateReverse` | The animation is played backwards first, then forwards. |

## IterationCount

The `IterationCount` on an `Animation` element sets how many times it is to be replayed. There are two formats for this setting:

| Value      | Description                                      |
|------------|--------------------------------------------------|
| `N`        | (N is an integer) - play N times. N can be zero. |
| `Infinite` | Repeats forever                                  |
