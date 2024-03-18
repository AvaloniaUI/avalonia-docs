---
description: REFERENCE - Styles
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CustomPseudoclassScreenshot from '/img/reference/styles/custom-pseudoclass.gif';

# 伪类（Pseudoclasses）

## 概览

Avalonia中的伪类，类似于CSS中的伪类，是由Control（控件）暴露出的关键字，用于方便地指示控件的特定状态，以便于样式选择器使用。这些状态被用于条件性地样式化控件。例如，一个Button（按钮）在被按下时可以有不同的外观，一个 `TextBox` 在被禁用时也是如此。

伪类状态通过控件的PseudoClasses属性进行跟踪。按照惯例，伪类名称以冒号开头，例如`:pointerover` 或`:pressed` 。

## 选择器用法

以下示例展示了如何在`CheckBox`被选中时应用粗体文本：

```xml
<Window.Styles>
    <Style Selector="CheckBox:checked">
        <Setter Property="FontWeight" Value="Bold" />
    </Style>
</Window.Styles>

<CheckBox Content="Pseudoselectors" />
```

一个控件可以同时激活多个伪类，此时您可以用选择器同时目标多个伪类。例如：

```xml
<Style Selector="Button.red:focus:pointerover">
```

上面的选择器针对具有`red`样式类，并且同时具有`:focus`和`:pointerover`伪类状态的`Button`控件。

## 通用的伪类

以下伪类由InputElement定义，所有控件均可访问。

| Pseudoclass      | Description                                                    |
|:-----------------|----------------------------------------------------------------|
| `:disabled`      | The Control is disabled and cannot be interacted with.         |
| `:pointerover`   | The Pointer is over the Control as determined by hit testing.  |
| `:focus`         | The Control has focus.                                         |
| `:focus-within`  | The Control has focus or contains a descendant that has focus. |
| `:focus-visible` | The Control has focus and should show a visual indicator.      |

## 可访问性

PseudoClasses集合是一个受保护的属性。这种访问限制阻止了通过代码后置（code-behind）和附加行为外部设置现有和自定义伪类。因此，自定义必须通过继承来实现。

## 自定义伪类

在创建自定义控件时，您可以定义自定义伪类来暴露控件状态。`[PseudoClasses]`特性向IDE提供了您的伪类信息。这种行为是可继承的，因此自定义控件会自动受益于其基类控件定义和管理的伪类（如InputElement的:pointerover）。

以下示例定义并在指针悬停在`Button`的不同区域时设置伪类。


<Tabs>
<TabItem value="cs" label="C# Control" default>

```csharp
[PseudoClasses(":left", ":right", ":middle")]
public class AreaButton : Button
{    
    protected override void OnPointerMoved(PointerEventArgs e)
    {
        base.OnPointerMoved(e);
        var pos = e.GetPosition(this);

        if (pos.X < Bounds.Width * 0.25)
            SetAreaPseudoclasses(true, false, false);
        else if (pos.X > Bounds.Width * 0.75)
            SetAreaPseudoclasses(false, true, false);
        else
            SetAreaPseudoclasses(false, false, true);
    }

    protected override void OnPointerExited(PointerEventArgs e)
    {
        base.OnPointerExited(e);
        SetAreaPseudoclasses(false, false, false);
    }

    private void SetAreaPseudoclasses(bool left, bool right, bool middle)
    {
        PseudoClasses.Set(":left", left);
        PseudoClasses.Set(":right", right);
        PseudoClasses.Set(":middle", middle);
    }
}
```

</TabItem>
<TabItem value="example" label="Example XAML">

```xml
<Window.Styles>
    <Style Selector="local|AreaButton">
        <Setter Property="Content" Value="Testing Area" />
        <Setter Property="MinWidth" Value="200" />

        <Style Selector="^:left">
            <Setter Property="Content" Value="Left" />
        </Style>
        <Style Selector="^:right">
            <Setter Property="Content" Value="Right" />
        </Style>
        <Style Selector="^:middle">
            <Setter Property="Content" Value="Middle" />
        </Style>
    </Style>
</Window.Styles>

<local:AreaButton />
```

</TabItem>
<TabItem value="xaml" label="ControlTheme XAML">

```xml
<ControlTheme
    x:Key="{x:Type local:AreaButton}"
    BasedOn="{StaticResource {x:Type Button}}"
    TargetType="local:AreaButton" />
```

</TabItem>
</Tabs>

<img src={CustomPseudoclassScreenshot} alt="" />

:::warning
当使用由其父级定义的ControlTheme创建简单的派生控件时，会使用StyleKeyOverride。在本例中，由于`Button`是一个`TemplatedControl`，因此有必要创建一个ControlTheme，因为选择器必须针对AreaButton来指定新的伪类。
:::