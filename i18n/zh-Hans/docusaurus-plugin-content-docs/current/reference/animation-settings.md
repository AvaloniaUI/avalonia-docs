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

This section contains full lists of the _Avalonia UI_ animation settings:
本节包含 _Avalonia UI_ 动画设置的完整列表：

* 缓动函数（Easing Functions）
* 填充模式（FillMode）
* 播放方向（PlaybackDirection）
* 重复（IterationCount）

## 缓动函数（Easing Functions）

| Default                                                       |
|---------------------------------------------------------------|
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

## 填充模式（FillMode）

动画的填充模式属性定义了动画运行后设置属性在延迟运行之间的持续方式。

以下表格描述了可能的行为：

| 值          | 描述                              |
|------------|---------------------------------|
| `None`     | 在动画后值不会持续，也不会在延迟时应用第一个值。        |
| `Forward`  | 最后一个插值值将持续到目标属性。                |
| `Backward` | 第一个插值值将在动画延迟时显示。                |
| `Both`     | 同时应用 `Forward` 和 `Backward` 行为。 |

## 播放方向（PlaybackDirection）

播放方向定义了动画的播放方式，包括任何重复。以下表格描述了可能的设置：


| Value              | Description     |
|--------------------|-----------------|
| `Normal`           | 动画以正常方式播放。      |
| `Reverse`          | 动画以反向方向播放。      |
| `Alternate`        | 动画先正向播放，然后反向播放。 |
| `AlternateReverse` | 动画先反向播放，然后正向播放。 |

## 重复（IterationCount）

动画元素上的重复属性设置了动画的重复次数。有两种格式的设置方式：

| 值          | 描述                    |
|------------|-----------------------|
| `N`        | N 是整数——重复 N 次。N 可以是零。 |
| `Infinite` | 无限重复。                 |
