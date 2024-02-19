---
description: REFERENCE
---

import SineEaseOutScreenshot from '/img/reference/animation-settings/sine-ease-out.png';

# Animation Settings

This section contains full lists of the _Avalonia UI_ animation settings:

* Easing Functions
* Fill Modes
* Playback Direction
* Repeat

## Easing Functions

<table><thead><tr><th width="216">Profile</th><th>Setting</th></tr></thead><tbody><tr><td><img src={SineEaseOutScreenshot} alt=""/></td><td><code>SineEaseOut</code></td></tr></tbody></table>

## Fill Modes

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

## Repeat

The repeat attribute on an animation element sets how many times it is to be replayed. There are two formats for this setting:

| Value      | Description                                      |
| ---------- | ------------------------------------------------ |
| `N`        | (N is an integer) - play N times. N can be zero. |
| `INFINITE` | Repeat Indefinitely                              |
