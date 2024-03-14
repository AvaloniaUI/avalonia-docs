---
id: keyframe-animations
title: 如何使用关键帧动画
---

import AnimationKeyframeDiagram from '/img/basics/user-interface/animation-keyframe.png';
import KeyframeFadeScreenshot from '/img/guides/graphics-and-animations/keyframe-fade.gif';
import KeyframeCompositeAnimationScreenshot from '/img/guides/graphics-and-animations/keyframe-composite-animation.gif';
import LinearEasingScreenshot from '/img/guides/graphics-and-animations/linear-easing.gif';
import BounceEaseInScreenshot from '/img/guides/graphics-and-animations/bounce-ease-in.gif';

# 如何使用关键帧动画

您可以使用关键帧动画来在时间轴上更改一个或多个控件属性。关键帧在动画的 **持续时间** 内由 _Avalonia UI_ 样式中的 **提示** 点定义，并在某个时间点上设置属性的中间值。

<img src={AnimationKeyframeDiagram} alt=""/>

关键帧之间的属性值根据 **缓动函数** 的曲线设置。默认的缓动函数是直线插值。

动画可以在启动后运行任意次数，也可以在正向或反向运行。还有选项可以延迟动画的启动，并进行重复。

:::info
如果您熟悉 CSS 中的关键帧动画，您会注意到它在 _Avalonia UI_ 中是如何实现的。
:::

## 示例

您可以使用样式定义关键帧动画。

:::info
若要了解 _Avalonia UI_ 如何使用样式，请查看 [这里的概念](../../basics/user-interface/styling)。
:::

按照以下步骤使用 XAML 定义一个简单的颜色渐变动画：

-  在您选择的层级中创建一个样式集合。
-  向集合中添加一个带有选择器的样式，以定位要进行动画的控件。
-  添加一个 `Setter` 元素来定义您希望动画更改的属性。例如 `<Setter Property="Fill" Value="Red"/>`。
-  添加一个 `Style.Animations` 元素来包含您的动画。
-  添加一个 `Animation` 元素，并设置其 `Duration` 属性。格式为 `时:分:秒`。
-  现在定义动画的关键帧。这个示例在 0% 和 100% 处设置了提示点。
-  在每个关键帧上添加 `Setter` 元素来设置填充不透明度的值。这个示例在 0.0 和 1.0 之间进行动画。

完成后的代码如下所示：

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

动画效果如下：

<img src={KeyframeFadeScreenshot} alt=""/>

该动画在矩形控件加载并被样式选择时就会运行。事实上，它在预览窗格中也能运行！

## 同时动画两个属性

此示例展示了如何在同一时间轴上同时动画两个属性。

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

红色矩形同时进行淡入和旋转。

<img src={KeyframeCompositeAnimationScreenshot} alt=""/>

## 延迟

您可以通过设置动画元素的延迟属性来延迟动画的启动。例如：

```xml
<Animation Duration="0:0:1"
           Delay="0:0:1"> 
    ...
</Animation>
```

## 重复

您可以使动画重复一定次数，或无限次数。要重复有限次数的动画，请在动画元素上设置 `RepeatCount` 属性，例如：

```xml
<Animation RepeatCount="5">
    ...
</Animation>
```

要无限次地重复动画，请使用特殊值 `INFINITE`。例如：

```xml
<Animation RepeatCount="INFINITE">
    ...
</Animation>
```

## 播放方向

默认情况下，动画正向播放，即它按照缓动函数的曲线从左向右进行。您可以通过设置动画元素的 `PlaybackDirection` 属性来改变这种行为。例如：

```xml
<Animation RepeatCount="9" PlaybackDirection="AlternateReverse">
    ...
</Animation>
```

以下表格描述了各个选项：

<table><thead><tr><th width="245">值</th><th>描述</th></tr></thead><tbody><tr><td><code>Normal</code></td><td>（默认）正向播放动画。</td></tr><tr><td><code>Reverse</code></td><td>反向播放动画。</td></tr><tr><td><code>Alternate</code></td><td>先正向播放动画，然后反向播放。</td></tr><tr><td><code>AlternateReverse</code></td><td>先反向播放动画，然后正向播放。</td></tr></tbody></table>

## 填充模式

动画的填充模式属性定义了动画运行后，属性如何持续保留或在运行之间的任何间隙中显示。例如：

```xml
<Animation RepeatCount="9" FillMode="Backward">
    ...
</Animation>
```

以下表格描述了各个选项：

<table><thead><tr><th width="240">值</th><th>描述</th></tr></thead><tbody><tr><td><code>None</code></td><td>动画运行后，值不会保留，也不会在动画延迟时应用第一个值。</td></tr><tr><td><code>Forward</code></td><td>最后的插值值将持续保留到目标属性。</td></tr><tr><td><code>Backward</code></td><td>在动画延迟时，第一个插值值将显示。</td></tr><tr><td><code>Both</code></td><td>将同时应用 <code>Forward</code> 和 <code>Backward</code> 行为。</td></tr></tbody></table>

## 缓动函数

缓动函数定义了动画期间属性如何随时间变化。

<div>

<img src={LinearEasingScreenshot} alt=""/>

<img src={BounceEaseInScreenshot} alt=""/>

</div>

默认的缓动函数是线性的（上图左），但您可以通过在缓动属性中设置所需函数的名称来使用其他模式。例如，要使用“弹跳淡入”函数（上图右）：

```xml
<Animation Duration="0:0:1"
           Delay="0:0:1"
           Easing="BounceEaseIn"> 
    ...
</Animation>
```

:::info
要获取 _Avalonia UI_ 缓动函数的完整列表，请参阅 [此处的参考](../../reference/animation-settings.md)。
:::

您还可以添加自定义的缓动函数类，如下所示：

```xml
<Animation Duration="0:0:1"
           Delay="0:0:1">
    <Animation.Easing>
        <local:YourCustomEasingClassHere/>
    </Animation.Easing> 
    ...
</Animation>
```
