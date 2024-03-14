---
id: transitions
title: 如何使用过渡效果
---


# 如何使用过渡效果

Avalonia中的过渡效果也受到CSS动画的很大启发。它们监听目标属性的值的任何变化，并根据其参数对变化进行动画处理。可以通过`Transitions`属性在任何`Control`上定义过渡效果：

```xml
<Window xmlns="https://github.com/avaloniaui">
    <Window.Styles>
        <Style Selector="Rectangle.red">
            <Setter Property="Height" Value="100"/>
            <Setter Property="Width" Value="100"/>
            <Setter Property="Fill" Value="Red"/>
            <Setter Property="Opacity" Value="0.5"/>
        </Style>
        <Style Selector="Rectangle.red:pointerover">
            <Setter Property="Opacity" Value="1"/>
        </Style>
    </Window.Styles>

    <Rectangle Classes="red">
        <Rectangle.Transitions>
            <Transitions>
                <DoubleTransition Property="Opacity" Duration="0:0:0.2"/>
            </Transitions>
        </Rectangle.Transitions>
    </Rectangle>

</Window>
```

上述示例将监听`Rectangle`的`Opacity`属性的变化，并在值变化时，在2秒内将其平滑地过渡从旧值到新值。

过渡效果也可以在任何样式中使用`Setter`来定义，目标属性设为`Transitions`，并将它们封装在`Transitions`对象中，如下所示：

```xml
<Window xmlns="https://github.com/avaloniaui">
    <Window.Styles>
        <Style Selector="Rectangle.red">
            <Setter Property="Height" Value="100"/>
            <Setter Property="Width" Value="100"/>
            <Setter Property="Fill" Value="Red"/>
            <Setter Property="Opacity" Value="0.5"/>
            <Setter Property="Transitions">
                <Transitions>
                    <DoubleTransition Property="Opacity" Duration="0:0:0.2"/>
                </Transitions>
            </Setter>
        </Style>
        <Style Selector="Rectangle.red:pointerover">
            <Setter Property="Opacity" Value="1"/>
        </Style>
    </Window.Styles>

    <Rectangle Classes="red"/>

</Window>
```

每个过渡效果都有`Property`、`Delay`、`Duration`和可选的`Easing`属性。

`Property`表示过渡效果的目标属性，用于监听和动画处理值。

`Delay`表示过渡效果应用于目标之前的等待时间。

`Duration`表示过渡效果播放的时间长度。

缓动函数与 [关键帧动画](./keyframe-animations#easings) 中描述的相同。

以下是可用的过渡效果类型。必须根据要动画处理的属性类型选择正确的类型。

* `BoxShadowsTransition`：用于 `BoxShadows` 目标属性
* `BrushTransition`：用于 `IBrush` 目标属性
* `ColorTransition`：用于 `Color` 目标属性
* `CornerRadiusTransition`：用于 `CornerRadius` 目标属性
* `DoubleTransitions`：用于 `double` 目标属性
* `FloatTransitions`：用于 `float` 目标属性
* `IntegerTransitions`：用于 `int` 目标属性
* `PointTransition`：用于 `Point` 目标属性
* `SizeTransition`：用于 `Size` 目标属性
* `ThicknessTransition`：用于 `Thickness` 目标属性
* `TransformOperationsTransition`：用于 `ITransform` 目标属性
* `VectorTransition`：用于 `Vector` 目标属性

## 过渡渲染变换

可以过渡应用于使用类似CSS语法的控件的渲染变换。以下示例显示了一个边框，在指针悬停在其上方时旋转45度：

```xml title='XAML'
<Border Width="100" Height="100" Background="Red">
    <Border.Styles>
        <Style Selector="Border">
            <Setter Property="RenderTransform" Value="rotate(0)"/>
        </Style>
        <Style Selector="Border:pointerover">
            <Setter Property="RenderTransform" Value="rotate(45deg)"/>
        </Style>
    </Border.Styles>
    <Border.Transitions>
        <Transitions>
            <TransformOperationsTransition Property="RenderTransform" Duration="0:0:1"/>
        </Transitions>
    </Border.Transitions>
</Border>
```

```csharp title='C#'
new Border
{
    Width = 100,
    Height = 100,
    Background = Brushes.Red,
    Styles =
    {
        new Style(x => x.OfType<Border>())
        {
            Setters =
            {
                new Setter(
                    Border.RenderTransformProperty,
                    TransformOperations.Parse("rotate(0)"))
            },
        },
        new Style(x => x.OfType<Border>().Class(":pointerover"))
        {
            Setters =
            {
                new Setter(
                    Border.RenderTransformProperty,
                    TransformOperations.Parse("rotate(45deg)"))
            },
        },
    },
    Transitions = new Transitions
    {
        new TransformOperationsTransition
        {
            Property = Border.RenderTransformProperty,
            Duration = TimeSpan.FromSeconds(1),
        }
    }
};
```

可用的过渡效果如下：

| 过渡效果         | 示例                                        | 可接受的单位                       |
|--------------|-------------------------------------------|------------------------------|
| `translate`  | `translate(10px)`, `translate(0px, 10px)` | `px`                         |
| `translateX` | `translateX(10px)`                        | `px`                         |
| `translateY` | `translateY(10px)`                        | `px`                         |
| `scale`      | `scale(10)`, `scale(0, 10)`               |                              |
| `scaleX`     | `scaleX(10)`                              |                              |
| `scaleY`     | `scaleY(10)`                              |                              |
| `skew`       | `skew(90deg)`, `skew(0, 90deg)`           | `deg`, `grad`, `rad`, `turn` |
| `skewX`      | `skewX(90deg)`                            | `deg`, `grad`, `rad`, `turn` |
| `skewY`      | `skewY(90deg)`                            | `deg`, `grad`, `rad`, `turn` |
| `rotate`     | `rotate(90deg)`                           | `deg`, `grad`, `rad`, `turn` |
| `matrix`     | `matrix(1,2,3,4,5,6)`                     |                              |

:::info
Avalonia还支持类似WPF的渲染变换，如`RotateTransform`，`ScaleTransform`等。这些变换不能进行过渡：如果要对渲染变换应用过渡效果，请始终使用类似CSS的格式。
:::
