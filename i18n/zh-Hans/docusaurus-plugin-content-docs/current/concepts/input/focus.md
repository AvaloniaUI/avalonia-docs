---
id: focus
title: 焦点
---

import DirectionalNavigationScreenshot from '/img/concepts/input/directional-navigation.gif';

# 焦点
焦点是指预期接收键盘输入的 `InputElement`，通常通过视觉指示器来区分。最熟悉的例子是包含闪烁光标的 `TextBox`，但像 `Button` 和 `Slider` 这样的非文本控件也参与焦点管理。

## IsFocused 和 Focusable

`IsFocused` 是一个只读属性，用于跟踪 `InputElement` 的焦点状态。
`Focusable` 属性启用或禁用 `InputElement` 的焦点能力。无法获得焦点的元素仍然可以通过指针进行交互，因此应尽量确保提供具备功能性的键盘等效操作（如快捷键）。

## 显式聚焦

要显式地将焦点分配给任何 `InputElement`，可以在代码中调用其 `.Focus()` 方法。可选地，可以指定 `NavigationMethod` 和 `KeyModifiers` 以模拟特定的焦点导航流程。显式聚焦通常用于在加载数据输入表单时聚焦特定的 `InputElement`，或者在当前输入满足后程序化地移动到下一个 `InputControl`。

| NavigationMethod | 触发描述        |
|:-----------------|:---------------------------|
| Tab              | 按下 Tab 键              |
| Pointer          | 指针交互        |
| Directional      | 2D 方向性 (`XYFocus`) |
| Unspecified      | 默认                    |

## 焦点事件

`InputElement` 暴露了 `GotFocus` 和 `LostFocus` 事件。`GotFocusEventArgs` 包含触发焦点导航的 `NavigationMethod` 和 `KeyModifiers`。

## 焦点伪类

这些伪类在为 `Focusable` 的 `Control` 设置样式时非常有用。

| 伪类    | 描述                                                    |
|:---------------|----------------------------------------------------------------|
| :focus         | 控件具有焦点。                                         |
| :focus-within  | 控件具有焦点或包含具有焦点的子元素。 |
| :focus-visible | 控件具有焦点并应显示视觉指示器。      |

:::tip
`FocusAdorner` 属性用于在 `:focus-visible` 的 `Control` 周围显示默认的焦点视觉效果，通常是 `Border`。当使用 `:focus-visible` 显示自定义视觉指示器时，将 `FocusAdorner` 设置为 `null` 可避免显示重复的指示器。
:::

## FocusManager

`FocusManager` 提供对焦点功能的全局访问，例如检索当前聚焦的元素或清除焦点。有关更多信息，请参阅 [FocusManager 文档](/docs/concepts/services/focus-manager)。

## Tab 焦点导航

当用户在键盘上按下 Tab 键时，会发生 Tab 焦点导航。将 `IsTabStop` 属性设置为 `true` 的 `InputElement` 将可用于 Tab 焦点导航。`TabIndex` 指定了优先级，数值较低的元素会先被导航到。当多个控件的 `TabIndex` 相等时，优先级基于视觉树遍历顺序。
`KeyboardNavigation.TabNavigation` 附加属性可以为作为容器的任何 `InputElement` 设置 `KeyboardNavigationMode`，并修改其 Tab 导航特性。
| KeyboardNavigationMode | 容器项遍历                                  |
|:-----------------------|:----------------------------------------------------------|
| Continue               | 继续遍历项目并进入下一个容器          |
| Cycle                  | 在自身项目中循环遍历        |
| Contained              | 停止在开始/结束项                           |
| Once                   | 容器和子元素仅作为一组获得焦点一次 |
| None                   | 项目不会通过 Tab 导航获得焦点               |
| Local                  | 仅考虑本地子树中的 `TabIndex`  |

## 方向性焦点导航 <MinVersion version="11.1" />

通过 `XYFocus` 实现的焦点导航是一种 2D 方向性方案，允许从聚焦的控件向另一个控件进行空间导航，方向包括左、右、上、下。默认情况下，`XYFocus.NavigationModes` 被设置为允许 `Gamepad` 和 `Remote` 导航。

| KeyDeviceType | 设备                                    |
|:--------------|:------------------------------------------|
| Disabled      | 任何按键设备的 XY 导航已禁用。 |
| Keyboard      | 可以使用键盘箭头键。          |
| Gamepad       | 可以使用游戏手柄的 DPad。      |
| Remote        | 可以使用遥控器。               |
| Enabled       | 所有设备都可以使用。                  |

支持游戏手柄输入的设备包括可以原生发送这些输入的设备，如 Android 和 Tizen。然而，Avalonia 当前缺乏跨平台的游戏手柄 API，因此无法广泛地开箱即用地支持。

### 导航策略

当启用 2D 方向性导航时，将使用一种消歧策略来选择导航目标。
| XYFocusNavigationStrategy   | 导航目标                                                             |
|:----------------------------|:------------------------------------------------------------------------------|
| Auto                        | 继承自祖先的策略。如果没有任何祖先指定，则使用Projection策略。         |
| Projection                  | 在导航方向上投影一条线时遇到的第一个元素。 |
| NavigationDirectionDistance | 最接近导航线轴的元素。                           |
| RectilinearDistance         | 基于最短曼哈顿距离的最近元素。                     |

### 显式导航

`XYFocus` 允许每个控件在按下某个方向时指定显式的导航目标，通过 `XYFocus.Up`、`XYFocus.Down`、`XYFocus.Left` 和 `XYFocus.Right`。这优先于任何导航策略。

:::warning
焦点参与尚未实现，因此将方向性焦点导航与自身处理方向输入的控件结合使用可能会有一些限制，尤其是在视觉效果方面。
:::

### 示例

以下示例展示了如何在 `WrapPanel` 中使用方向性焦点导航。它显式地允许从第一个元素导航到最后一个元素，反之亦然。

`Slider` 提供了一个混合导航和控件交互的示例。在桌面平台上，当 `Slider` 获得焦点时按下 Enter 键将开始一个交互过程，用户将修改 `Slider.Value` 而不是导致导航。再次按下 Enter 键将结束交互并恢复方向性焦点导航。

```xml
<Window
    XYFocus.NavigationModes="Enabled"
    XYFocus.UpNavigationStrategy="Projection"
    XYFocus.DownNavigationStrategy="Projection"
    XYFocus.LeftNavigationStrategy="Projection"
    XYFocus.RightNavigationStrategy="Projection">
    <Grid>
        <WrapPanel>
            <Button x:Name="first"
                Content="First"
                XYFocus.Left="{Binding #last}" />
            <Button Content="Second" />
            <Button Content="Third" />
    
            <Slider Width="100" Maximum="100" />
    
            <Button Content="Fourth" />
            <Button x:Name="last"
                Content="Last"
                XYFocus.Right="{Binding #first}" />
        </WrapPanel>
    </Grid>
</Window>
```

<img src={DirectionalNavigationScreenshot} alt="Directional Navigation Example"/>
