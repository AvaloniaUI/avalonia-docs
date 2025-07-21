---
description: REFERENCE - Built-in Controls
---

import FlyoutShowAttachedScreenshot from '/img/reference/controls/flyouts/flyout-show-attached.gif';

# Flyout 弹出层

弹出层是一种可关闭的容器，可以附加到某些类型的“宿主”控件上；尽管弹出层本身并不是控件。当宿主控件获得焦点时，弹出层会显示出来，并且可以通过多种不同的方式再次隐藏。

弹出层可以包含简单或更丰富的、组合的用户界面内容。

在 _Avalonia UI_ 应用中，弹出层可以声明为资源，并在两个或更多宿主控件之间共享。

## 示例

通过宿主控件的 `Flyout` 属性附加弹出层。例如：

```xml
<Button Content="带弹出层的按钮">
  <Button.Flyout>
    <Flyout>这是按钮的弹出层</Flyout>
  </Button.Flyout>
</Button>
```

:::warning
只有按钮和分隔按钮控件支持 `Flyout` 属性。你可以使用 `AttachedFlyout` 属性将弹出层附加到其他 _Avalonia UI_ 内置控件上。
:::

对于没有 `Flyout` 属性的控件，使用 `AttachedFlyout` 属性如下：

```xml
<Border Background="Red" PointerPressed="Border_PointerPressed">
    <FlyoutBase.AttachedFlyout>
        <Flyout>
            <TextBlock Text="红色矩形弹出层" />
        </Flyout>
    </FlyoutBase.AttachedFlyout>
</Border>
```

弹出层不会自动显示，必须从 code-behind 显示。例如：

```csharp
public void Border_PointerPressed(object sender, PointerPressedEventArgs args)
{
    var ctl = sender as Control;
    if (ctl != null)
    {
        FlyoutBase.ShowAttachedFlyout(ctl);
    }
}
```

<img src={FlyoutShowAttachedScreenshot} alt="" />

## 常用属性

你可能最常使用这些属性：

| 属性         | 描述                                                                         |
| ------------ | ---------------------------------------------------------------------------- |
| `Placement`  | 弹出层相对于其附加控件的打开位置。                                           |
| `ShowMode`   | 描述弹出层的显示和隐藏方式。请看下面的选项。                                 |

## ShowMode 

此设置描述弹出层的显示和隐藏方式：

<table><thead><tr><th width="259">模式</th><th>描述</th></tr></thead><tbody><tr><td><code>Standard</code></td><td>当附加的控件获得焦点时显示弹出层。当附加的控件失去焦点时隐藏弹出层（用户切换焦点或点击其他地方）。 </td></tr><tr><td><code>Transient</code></td><td>在弹出层外做出操作时（如点击）消失。</td></tr><tr><td><code>TransientWithDismiss OnPointerMoveAway</code></td><td>当光标移开一定距离后，弹出层自动消失。</td></tr></tbody></table>

## 所有弹出层的常用方法

| 属性                      | 描述                                                             |
| ------------------------- | ---------------------------------------------------------------- |
| `ShowAt(Control)`         | 在指定的目标控件上显示弹出层。                                    |
| `ShowAt(Control, bool)`   | 在指定的目标控件上显示弹出层，但位置基于当前指针位置。            |
| `Hide`                    | 隐藏弹出层。                                                      |

## 共享弹出层

你可以在应用中的两个或更多元素之间共享弹出层。例如，从窗口的资源集合中共享弹出层：

```xml
<Window.Resources>
    <Flyout x:Key="MySharedFlyout">
        <!-- 弹出层内容在此 -->
    </Flyout>
</Window.Resources>

<Button Content="点击我！" Flyout="{StaticResource MySharedFlyout}" />

<Button Content="现在点击我！" Flyout="{StaticResource MySharedFlyout}" />
```

## 弹出层的样式定制

虽然弹出层本身不是控件，但可以通过`Flyout`用来显示其内容的展示器来自定义其外观。对于普通的`Flyout`，这个展示器是`FlyoutPresenter`；对于`MenuFlyout`，则是`MenuFlyoutPresenter`。因为弹出层的展示器不是公开的，特定的弹出层相关的特殊样式类可以通过`FlyoutBase`上的`FlyoutPresenterClasses`属性传递:

```xml
<Style Selector="FlyoutPresenter.mySpecialClass">
    <Setter Property="Background" Value="Red" />
</Style>

<Flyout FlyoutPresenterClasses="mySpecialClass">
    <!-- 弹出层内容在此 -->
</Flyout>
```

## 更多信息

:::info
有关此控件的完整 API 文档，请查看[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Flyout)。
:::

:::info
在 _GitHub_ 上查看源代码 [`Flyout.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Flyouts/Flyout.cs)
:::
