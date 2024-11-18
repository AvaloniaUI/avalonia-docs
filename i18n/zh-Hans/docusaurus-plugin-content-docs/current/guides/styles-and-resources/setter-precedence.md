---
id: setter-precedence
title: 设置器优先级
---

import SetterPrecedenceAnimationWrongScreenshot from '/img/guides/styles-and-resources/setter-precedence-animation-wrong.gif';
import SetterPrecedenceAnimationCorrectScreenshot from '/img/guides/styles-and-resources/setter-precedence-animation-correct.gif';

Avalonia 的 `Setter` 按照 `BindingPriority`、视觉树局部性和样式集合顺序依次应用。每个 `StyledProperty` 都单独应用优先级，从而使得样式可以受益于组合。`DirectProperty` 和 CLR 属性不能被样式化，因此不参与此优先级。
## 绑定优先级

```cs
Animation = -1, // 最高优先级
LocalValue = 0,
StyleTrigger,
Template,
Style,
Inherited,
Unset = int.MaxValue, // 最低优先级
```

## 如何在XAML中分配绑定优先级？

`BindingPriority` 不能在 XAML 中显式设置。以下示例展示了如何在每个场景中隐式分配 `绑定优先级`。这对于设计和排除样式故障至关重要，以确保样式按预期工作。

### Animation

`Animation` 具有最高的 `绑定优先级`，并应用于 `Keyframe` 中的 `Setter`，通常在整个过渡系统中应用。

```xml
<Button Background="Green" Content="Bounces from Red to Blue">
    <Button.Styles>
        <Style Selector="Button">
            <Style.Animations>
                <Animation IterationCount="Infinite" Duration="0:0:2">
                    <KeyFrame Cue="0%">
                        <Setter Property="Background" Value="Red" />
                    </KeyFrame>
                    <KeyFrame Cue="100%">
                        <Setter Property="Background" Value="Blue" />
                    </KeyFrame>
                </Animation>
            </Style.Animations>
        </Style>
    </Button.Styles>
</Button>
```

### LocalValue

当 XAML 属性在 `ControlTemplate` 之外直接设置时分配。下面的两个 `Background` `Setter` 都将具有 `LocalValue` 优先级。

```xml
<Button Background="Orange" />
<Button Background="{DynamicResource ButtonBrush}" />
```

:::tip

资源标记扩展对优先级没有任何影响。

:::

### StyleTrigger

当 `Selector` 具有条件激活时，`Setter` 的 `绑定优先级` 从 `Style` 提升到 `StyleTrigger`。任何具有条件激活的两个选择器将具有相同的优先级，无论存在多少激活器以及激活器在选择器语法中的位置。Avalonia 没有 CSS 的 Specificity 概念。

```xml
<Style Selector="Button:pointerover /template/ ContentPresenter#PART_ContentPresenter">
    <Setter Property="Background" Value="Orange" />
</Style>
```

:::tip

样式类、伪类、子位置和属性匹配选择器是条件性的。控件名称选择器不是条件性的。

:::

### Template

当属性在 `ControlTemplate` 中直接设置时。下面的 `BorderThickness`、`Background` 和 `Padding` 具有 `Template` 优先级。

```xml
<ControlTemplate>
    <Border BorderThickness="2">
        <Button Background="{DynamicResource ButtonBrush}" Padding="{TemplateBinding Padding}" />
    </Border>
</ControlTemplate>
```

### Style

当 `Setter` 在 `Style` 中定义且没有条件激活时。

```xml
<Style Selector="Button /template/ ContentPresenter#PART_ContentPresenter">
    <Setter Property="Background" Value="Orange" />
</Style>
```

:::tip

特别值得注意的是，其优先级低于 `Template`。因此，这些选择器不能用于覆盖上述 `Template` 示例中提到的属性。

:::

### Inherited

当属性未设置时，它可能会从其父级继承属性值。这必须在属性注册期间或在 `OverrideMetadata` 中指定。

```cs
public static readonly StyledProperty<bool> UseLayoutRoundingProperty =
    AvaloniaProperty.Register<Layoutable, bool>(
        nameof(UseLayoutRounding),
        defaultValue: true,
        inherits: true);
```

## 视觉树局部性

具有相同 `BindingPriority` 的 `Setter` 将根据它们在视觉树中相对于 `Control` 的位置来选择。需要向上遍历节点最少的 `Setter` 将具有优先权。内联样式 `Setter` 在此步骤中具有最高优先权。

```xml
<Window>
    <Window.Styles>
        <Style Selector="Button">
            <Setter Property="FontSize" Value="16" />
            <Setter Property="Foreground" Value="Red" />
        </Style>
    </Window.Styles>
    <StackPanel>
        <StackPanel.Styles>
            <Style Selector="Button">
                <Setter Property="FontSize" Value="24" />
            </Style>
        </StackPanel.Styles>

        <Button Content="This Has FontSize=24 with Foreground=Red" />
    </StackPanel>
</Window>
```

## Styles集合顺序

当 `绑定优先级` 和视觉树局部性都相等时，最终的决定因素是 `Styles` 集合中的顺序。最后一个适用的 `Setter` 将具有优先级。

```xml
<StackPanel>
    <StackPanel.Styles>
        <Style Selector="Button.small">
            <Setter Property="FontSize" Value="12" />
        </Style>
        <Style Selector="Button.big">
            <Setter Property="FontSize" Value="24" />
        </Style>
    </StackPanel.Styles>

    <Button Classes="small big" Content="This Has FontSize=24" />
    <Button Classes="big small" Content="This Also Has FontSize=24" />
</StackPanel>
```

:::info

这些按钮以不同的顺序指定它们的类，但这不会影响 Setter 优先级。

:::

## 绑定优先级不会传递

回想一下上面的 `Animation` 示例。即使 `BindingPriority.Animation` 具有最高优先级，当你悬停时，动画背景仍会被静态背景替换。这是因为 `Selector` 目标了错误的 `Control`。检查 `ControlTheme` 是诊断原因的必要步骤。

<img src={SetterPrecedenceAnimationWrongScreenshot} alt="" />

```xml title='ControlTheme for Button, Trimmed'
<ControlTheme x:Key="{x:Type Button}" TargetType="Button">
    <Setter Property="Background" Value="{DynamicResource ButtonBackground}"/>
    <Setter Property="Template">
        <ControlTemplate>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Background="{TemplateBinding Background}"/>
        </ControlTemplate>
    </Setter>

    <Style Selector="^:pointerover /template/ ContentPresenter#PART_ContentPresenter">
        <Setter Property="Background" Value="{DynamicResource ButtonBackgroundPointerOver}"/>
    </Style>
</ControlTheme>
```

顶部的 `Setter` 以 `Style` 优先级将 `ButtonBackground` 应用到 `Button`。`Background` 的渲染由具有 `Template` 优先级的 `ContentPresenter` 处理，它获取已应用于 `Button` 的 `ButtonBackground`。

但是当 `Button` 被悬停时，`:pointerover` `Selector` 会被激活并具有 `StyleTrigger` 优先级，这会覆盖 `TemplateBinding` 并获取 `ButtonBackgroundPointerOver` 而不是 `Button` 的 `Background`。这绕过了我们最初的 `Animation` `Selector` 所针对的 `Button` 的 `Background`。
以下表格总结了这一点：

| 悬停时的背景 Setter 和样式                                        | 优先级                          | 位置            |
|---------------------------------------------------------------------|-----------------------------------|-----------------|
| ~~Background="Green"~~                                              | LocalValue                        | Button          |
| Background="Red"                                                    | Animation (覆盖 LocalValue)       | Keyframe        |
| ~~`<ContentPresenter Background="{TemplateBinding Background}"/>`~~ | Template                          | ControlTemplate |
| `^:pointerover /template/ ContentPresenter#PART_ContentPresenter`   | StyleTrigger (覆盖 Template)      | ControlTheme    |

相反，我们应该使用优先级至少为 `StyleTrigger` 的 `Setter` 来针对 `ContentPresenter`。`BindingPriority.Animation` 满足这个要求。这一观察结果只有在检查原始 `ControlTemplate` 时才能得出，并强调仅依赖优先级是不足以有效样式化应用程序的。

```xml title='Corrected to override :pointerover priority'
<Button Background="Green" Content="Bounces from Red to Blue">
    <Button.Styles>
        <Style Selector="Button /template/ ContentPresenter#PART_ContentPresenter">
            <Style.Animations>
                <Animation IterationCount="Infinite" Duration="0:0:2">
                    <KeyFrame Cue="0%">
                        <Setter Property="Background" Value="Red" />
                    </KeyFrame>
                    <KeyFrame Cue="100%">
                        <Setter Property="Background" Value="Blue" />
                    </KeyFrame>
                </Animation>
            </Style.Animations>
        </Style>
    </Button.Styles>
</Button>
```

<img src={SetterPrecedenceAnimationCorrectScreenshot} alt="" />
