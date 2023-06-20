---
description: REFERENCE
---

# 📘 Animation Settings

This section contains full lists of the _Avalonia UI_ animation settings:

* Easing Functions
* Fill Modes
* Playback Direction
* Repeat

## Easing Functions

<table><thead><tr><th width="216">Profile</th><th>Setting</th></tr></thead><tbody><tr><td><img src="../.gitbook/assets/image (72).png" alt=""></td><td><code>LinearEasing</code> (Default) </td></tr><tr><td><img src="../.gitbook/assets/image (6) (3).png" alt=""></td><td><code>BackEaseIn</code></td></tr><tr><td><img src="../.gitbook/assets/image (11).png" alt=""></td><td><code>BackEaseInOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (3) (3) (1).png" alt=""></td><td><code>BackEaseOut</code></td></tr><tr><td><img src="../.gitbook/assets/image (76).png" alt=""></td><td><code>BounceEaseIn</code> </td></tr><tr><td><img src="../.gitbook/assets/image (22).png" alt=""></td><td><code>BounceEaseInOut</code></td></tr><tr><td><img src="../.gitbook/assets/image (20).png" alt=""></td><td><code>BounceEaseOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (19).png" alt=""></td><td><code>CircularEaseIn</code> </td></tr><tr><td><img src="../.gitbook/assets/image (71).png" alt=""></td><td><code>CircularEaseInOut</code></td></tr><tr><td><img src="../.gitbook/assets/image (25).png" alt=""></td><td><code>CircularEaseOut</code></td></tr><tr><td><img src="../.gitbook/assets/image (68).png" alt=""></td><td><code>CubicEaseIn</code> </td></tr><tr><td><img src="../.gitbook/assets/image (37).png" alt=""></td><td><code>CubicEaseInOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (27).png" alt=""></td><td><code>CubicEaseOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (70).png" alt=""></td><td><code>ElasticEaseIn</code> </td></tr><tr><td><img src="../.gitbook/assets/image (24).png" alt=""></td><td><code>ElasticEaseInOut</code></td></tr><tr><td><img src="../.gitbook/assets/image (21).png" alt=""></td><td><code>ElasticEaseOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (12).png" alt=""></td><td><code>ExponentialEaseIn</code> </td></tr><tr><td><img src="../.gitbook/assets/image (10) (3).png" alt=""></td><td><code>ExponentialEaseInOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (5) (4).png" alt=""></td><td><code>ExponentialEaseOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (13).png" alt=""></td><td><code>QuadraticEaseIn</code></td></tr><tr><td><img src="../.gitbook/assets/image (7) (4) (1).png" alt=""></td><td><code>QuadraticEaseInOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (15).png" alt=""></td><td><code>QuadraticEaseOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (1) (4) (1).png" alt=""></td><td><code>QuarticEaseIn</code> </td></tr><tr><td><img src="../.gitbook/assets/image (14).png" alt=""></td><td><code>QuarticEaseInOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (4) (1) (2) (1).png" alt=""></td><td><code>QuarticEaseOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (16).png" alt=""></td><td><code>QuinticEaseIn</code> </td></tr><tr><td><img src="../.gitbook/assets/image (42).png" alt=""></td><td><code>QuinticEaseInOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (74).png" alt=""></td><td><code>QuinticEaseOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (75).png" alt=""></td><td><code>SineEaseIn</code> </td></tr><tr><td><img src="../.gitbook/assets/image (73).png" alt=""></td><td><code>SineEaseInOut</code> </td></tr><tr><td><img src="../.gitbook/assets/image (67).png" alt=""></td><td><code>SineEaseOut</code></td></tr></tbody></table>

## Fill Modes <a href="#playback-direction" id="playback-direction"></a>

The fill mode attribute of an animation defines how the set property persists after running an animation, and on delays in between runs.

The following table describes the possible behaviors:

| Value      | Description                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| `None`     | Value will not persist after animation nor the first value will be applied when the animation is delayed. |
| `Forward`  | The last interpolated value will be persisted to the target property.                                     |
| `Backward` | The first interpolated value will be displayed on animation delay.                                        |
| `Both`     | Both `Forward` and `Backward` behaviors will be applied.                                                  |



## Playback Direction

Playback direction defines how the animation will be played, including any repeats. The following table describes the possible settings:

<table><thead><tr><th width="229">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>Normal</code></td><td>The animation is played normally.</td></tr><tr><td><code>Reverse</code></td><td>The animation is played in reverse direction.</td></tr><tr><td><code>Alternate</code></td><td>The animation is played forwards first, then backwards.</td></tr><tr><td><code>AlternateReverse</code></td><td>The animation is played backwards first, then forwards.</td></tr></tbody></table>

## Repeat <a href="#value-fill-modes" id="value-fill-modes"></a>

The repeat attribute on an animation element sets how many times it is to be replayed. There are two formats for this setting:

| Value      | Description                                      |
| ---------- | ------------------------------------------------ |
| `N`        | (N is an integer) - play N times. N can be zero. |
| `INFINITE` | Repeat Indefinitely                              |
