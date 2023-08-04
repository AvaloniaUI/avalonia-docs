---
description: REFERENCE
---

# 动画设置

This section contains full lists of the _Avalonia UI_ animation settings:
本节包含 _Avalonia UI_ 动画设置的完整列表：

* 缓动函数（Easing Functions）
* 填充模式（Fill Modes）
* 播放方向（Playback Direction）
* 重复（Repeat）

## 缓动函数（Easing Functions）

<table><thead><tr><th width="216">配置</th><th>设置</th></tr></thead><tbody><tr><td><img src='/img/gitbook-import/assets/image (67).png' alt=''/></td><td><code>SineEaseOut</code></td></tr></tbody></table>

## 填充模式（Fill Modes）

动画的填充模式属性定义了动画运行后设置属性在延迟运行之间的持续方式。

以下表格描述了可能的行为：

| 值          | 描述                              |
|------------|---------------------------------|
| `None`     | 在动画后值不会持续，也不会在延迟时应用第一个值。        |
| `Forward`  | 最后一个插值值将持续到目标属性。                |
| `Backward` | 第一个插值值将在动画延迟时显示。                |
| `Both`     | 同时应用 `Forward` 和 `Backward` 行为。 |



## 播放方向（Playback Direction）

播放方向定义了动画的播放方式，包括任何重复。以下表格描述了可能的设置：

<table><thead><tr><th width="229">值</th><th>描述</th></tr></thead><tbody><tr><td><code>Normal</code></td><td>动画以正常方式播放。</td></tr><tr><td><code>Reverse</code></td><td>动画以反向方向播放。</td></tr><tr><td><code>Alternate</code></td><td>动画先正向播放，然后反向播放。</td></tr><tr><td><code>AlternateReverse</code></td><td>动画先反向播放，然后正向播放。</td></tr></tbody></table>

## 重复（Repeat）

动画元素上的重复属性设置了动画的重复次数。有两种格式的设置方式：

| 值          | 描述                    |
|------------|-----------------------|
| `N`        | N 是整数——重复 N 次。N 可以是零。 |
| `INFINITE` | 无限重复。                 |
