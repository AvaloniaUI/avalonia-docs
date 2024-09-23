---
description: REFERENCE
---

import LinearEasingScreenshot from '/img/reference/animation-settings/linear-easing.png';
import BackEaseInScreenshot from '/img/reference/animation-settings/back-ease-in.png';
import BackEaseInOutScreenshot from '/img/reference/animation-settings/back-ease-in-out.png';
import BackEaseOutScreenshot from '/img/reference/animation-settings/back-ease-out.png';
import BounceEaseInScreenshot from '/img/reference/animation-settings/bounce-ease-in.png';
import BounceEaseInOutScreenshot from '/img/reference/animation-settings/bounce-ease-in-out.png';
import BounceEaseOutScreenshot from '/img/reference/animation-settings/bounce-ease-out.png';
import CircularEaseInScreenshot from '/img/reference/animation-settings/circular-ease-in.png';
import CircularEaseInOutScreenshot from '/img/reference/animation-settings/circular-ease-in-out.png';
import CircularEaseOutScreenshot from '/img/reference/animation-settings/circular-ease-out.png';
import CubicEaseInScreenshot from '/img/reference/animation-settings/cubic-ease-in.png';
import CubicEaseInOutScreenshot from '/img/reference/animation-settings/cubic-ease-in-out.png';
import CubicEaseOutScreenshot from '/img/reference/animation-settings/cubic-ease-out.png';
import ElasticEaseInScreenshot from '/img/reference/animation-settings/elastic-ease-in.png';
import ElasticEaseInOutScreenshot from '/img/reference/animation-settings/elastic-ease-in-out.png';
import ElasticEaseOutScreenshot from '/img/reference/animation-settings/elastic-ease-out.png';
import ExponentialEaseInScreenshot from '/img/reference/animation-settings/exponential-ease-in.png';
import ExponentialEaseInOutScreenshot from '/img/reference/animation-settings/exponential-ease-in-out.png';
import ExponentialEaseOutScreenshot from '/img/reference/animation-settings/exponential-ease-out.png';
import QuadraticEaseInScreenshot from '/img/reference/animation-settings/quadratic-ease-in.png';
import QuadraticEaseInOutScreenshot from '/img/reference/animation-settings/quadratic-ease-in-out.png';
import QuadraticEaseOutScreenshot from '/img/reference/animation-settings/quadratic-ease-out.png';
import QuarticEaseInScreenshot from '/img/reference/animation-settings/quartic-ease-in.png';
import QuarticEaseInOutScreenshot from '/img/reference/animation-settings/quartic-ease-in-out.png';
import QuarticEaseOutScreenshot from '/img/reference/animation-settings/quartic-ease-out.png';
import QuinticEaseInScreenshot from '/img/reference/animation-settings/quintic-ease-in.png';
import QuinticEaseInOutScreenshot from '/img/reference/animation-settings/quintic-ease-in-out.png';
import QuinticEaseOutScreenshot from '/img/reference/animation-settings/quintic-ease-out.png';
import SineEaseInScreenshot from '/img/reference/animation-settings/sine-ease-in.png';
import SineEaseInOutScreenshot from '/img/reference/animation-settings/sine-ease-in-out.png';
import SineEaseOutScreenshot from '/img/reference/animation-settings/sine-ease-out.png';

# 动画设置

本节描述了如何自定义 `Animation` 播放。

## 缓动函数（Easing Functions）

`Easing` 函数描述了动画属性在动画时间内从起始值到结束值的变化速度。`Avalonia.Animation.Easings` 包含以下缓动函数：

| 默认                                                         |
|-------------------------------------------------------------|
| `LinearEasing`<br/><img src={LinearEasingScreenshot} alt=""/> |

| Ease-In                                                                 | Ease-Out                                                                  | Ease-In-Out                                                                   |
|-------------------------------------------------------------------------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| `SineEaseIn`<br/><img src={SineEaseInScreenshot} alt=""/>               | `SineEaseOut`<br/><img src={SineEaseOutScreenshot} alt=""/>               | `SineEaseInOut`<br/><img src={SineEaseInOutScreenshot} alt=""/>               |
| `QuadraticEaseIn`<br/><img src={QuadraticEaseInScreenshot} alt=""/>     | `QuadraticEaseOut`<br/><img src={QuadraticEaseOutScreenshot} alt=""/>     | `QuadraticEaseInOut`<br/><img src={QuadraticEaseInOutScreenshot} alt=""/>     |
| `CubicEaseIn`<br/><img src={CubicEaseInScreenshot} alt=""/>             | `CubicEaseOut`<br/><img src={CubicEaseOutScreenshot} alt=""/>             | `CubicEaseInOut`<br/><img src={CubicEaseInOutScreenshot} alt=""/>             |
| `QuarticEaseIn`<br/><img src={QuarticEaseInScreenshot} alt=""/>         | `QuarticEaseOut`<br/><img src={QuarticEaseOutScreenshot} alt=""/>         | `QuarticEaseInOut`<br/><img src={QuarticEaseInOutScreenshot} alt=""/>         |
| `QuinticEaseIn`<br/><img src={QuinticEaseInScreenshot} alt=""/>         | `QuinticEaseOut`<br/><img src={QuinticEaseOutScreenshot} alt=""/>         | `QuinticEaseInOut`<br/><img src={QuinticEaseInOutScreenshot} alt=""/>         |
| `ExponentialEaseIn`<br/><img src={ExponentialEaseInScreenshot} alt=""/> | `ExponentialEaseOut`<br/><img src={ExponentialEaseOutScreenshot} alt=""/> | `ExponentialEaseInOut`<br/><img src={ExponentialEaseInOutScreenshot} alt=""/> |
| `CircularEaseIn`<br/><img src={CircularEaseInScreenshot} alt=""/>       | `CircularEaseOut`<br/><img src={CircularEaseOutScreenshot} alt=""/>       | `CircularEaseInOut`<br/><img src={CircularEaseInOutScreenshot} alt=""/>       |
| `BackEaseIn`<br/><img src={BackEaseInScreenshot} alt=""/>               | `BackEaseOut`<br/><img src={BackEaseOutScreenshot} alt=""/>               | `BackEaseInInOut`<br/><img src={BackEaseInOutScreenshot} alt=""/>             |
| `ElasticEaseIn`<br/><img src={ElasticEaseInScreenshot} alt=""/>         | `ElasticEaseOut`<br/><img src={ElasticEaseOutScreenshot} alt=""/>         | `ElasticEaseInOut`<br/><img src={ElasticEaseInOutScreenshot} alt=""/>         |
| `BounceEaseIn`<br/><img src={BounceEaseInScreenshot} alt=""/>           | `BounceEaseOut`<br/><img src={BounceEaseOutScreenshot} alt=""/>           | `BounceEaseInOut`<br/><img src={BounceEaseInOutScreenshot} alt=""/>           |

此外，您可以通过继承 `Easing` 或通过向 `SplineEasing` 或 `SpringEasing` 提供参数来提供自己的缓动函数。

## 填充模式（FillModes）

`Animation` 的 `FillMode` 属性定义了动画完成后以及在运行之间的延迟期间动画属性的持久化方式。

下表描述了支持的行为：

| 值        | 描述                                                                                                       |
|------------|-----------------------------------------------------------------------------------------------------------|
| `None`     | 动画完成后值不会持久化，动画延迟时不会应用第一个值。                                                      |
| `Forward`  | 最后插值的值将持久化到目标属性。                                                                          |
| `Backward` | 动画延迟时将显示第一个插值的值。                                                                          |
| `Both`     | 将应用 `Forward` 和 `Backward` 行为。                                                                     |

## 播放方向（PlaybackDirection）

`PlaybackDirection` 定义了 `Animation` 的播放方式。下表描述了可能的设置：

| 值                  | 描述                                                     |
|--------------------|---------------------------------------------------------|
| `Normal`           | 动画正常播放。                                           |
| `Reverse`          | 动画反向播放。                                           |
| `Alternate`        | 动画先正向播放，然后反向播放。                           |
| `AlternateReverse` | 动画先反向播放，然后正向播放。                           |

## 重复（IterationCount）

`Animation` 元素上的 `IterationCount` 设置动画要重播的次数。此设置有两种格式：

| 值        | 描述                                      |
|------------|------------------------------------------|
| `N`        | (N 是一个整数) - 播放 N 次, N 可以为零。 |
| `Infinite` | 永远重复                                  |

