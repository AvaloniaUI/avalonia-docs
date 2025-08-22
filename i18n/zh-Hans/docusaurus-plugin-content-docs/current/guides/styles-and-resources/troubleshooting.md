---
id: troubleshooting
title: 如何排查样式问题
---


# 👉 如何排查样式问题

Avalonia UI 的样式系统在很多方面与 CSS 样式类似。如果您不熟悉相关技术，以下提示可能会对您有所帮助。

## 选择器没有匹配目标

Avalonia UI 的选择器与 CSS 选择器类似，当没有控件被匹配时，不会报错或警告，样式会默认失效。

:::info
请检查是否使用了不存在的名称或类。
:::

:::info
请检查是否使用了子选择器，但没有对应的子控件可匹配。
:::

## 声明文件的顺序

样式会按照声明顺序应用。如果有多个样式匹配到同一控件属性，最后声明的样式会覆盖之前的。例如：

```xml
<Style Selector="TextBlock.header">
    <Setter Property="Foreground" Value="Green" />
</Style>
```

```xml
<Style Selector="TextBlock.header">
    <Setter Property="Foreground" Value="Blue" />
    <Setter Property="FontSize" Value="16" />
</Style>
```

```xml
<StyleInclude Source="Style1.axaml" />
<StyleInclude Source="Style2.axaml" />
```

在此例中，**Style1.axaml** 的样式会先应用，**Style2.axaml** 的样式会覆盖前者。最终 TextBlock 生效的是 FontSize="16" 和 Foreground="Blue"。在样式文件内部也是同样的优先级规则。

## 本地设置的属性值优先级更高

直接在控件上设置的本地值通常优先于样式值。例如，以下代码中 TextBlock 的前景色为红色：

```xml
<Style Selector="TextBlock.header">
    <Setter Property="Foreground" Value="Green" />
</Style>
...
<TextBlock Classes="header" Foreground="Red" />
```

完整的优先级表可以参考 `BindingPriority` 枚举，枚举值越小，优先级越高：

| BindingPriority | 值          | 说明             |
|-----------------|------------|----------------|
| `Animation`     | -1         | 最高优先级 - 可覆盖本地值 |
| `LocalValue`    | 0          | 控件属性上的本地值      |
| `StyleTrigger`  | 1          | 样式激活时触发        |
| `Template`      | 2          |                |
| `Style`         | 3          |                |
| `Unset`         | 2147483647 |                |

:::warning
例外情况：`Animation` 优先级最高，甚至可以覆盖本地值。
:::

:::info
部分默认 Avalonia UI 样式在模板中使用本地值而非模板绑定或样式设置，这会导致无法仅通过样式更新模板属性，需替换整个模板。
:::

### 缺少伪类（激活）选择器

假设您希望第二个样式覆盖第一个样式，但实际并未生效：

```xml
<Style Selector="Border:pointerover">
    <Setter Property="Background" Value="Blue" />
</Style>
<Style Selector="Border">
    <Setter Property="Background" Value="Red" />
</Style>
...
<Border Width="100" Height="100" Margin="100" />
```

在此示例中，Border 背景色默认是红色，悬停时是蓝色。原因是和CSS一样，更具体的选择器优先级更高。如果想用单一样式覆盖所有状态（如 pointerover、pressed 等），需要为这些状态分别创建样式。

:::info
可以访问 Avalonia 源码，查找[原始模板](https://github.com/AvaloniaUI/Avalonia/tree/master/src/Avalonia.Themes.Fluent/Controls)，并将带伪类的样式复制到您的代码中。
:::

### 伪类选择器无法覆盖默认样式

下面的样式代码示例，按理说应该可以在默认样式的基础上生效：

```xml
<Style Selector="Button">
    <Setter Property="Background" Value="Red" />
</Style>
<Style Selector="Button:pointerover">
    <Setter Property="Background" Value="Blue" />
</Style>
```

您可能认为 Button 的背景色默认是红色，悬停时是蓝色。实际上，只有第一个样式的 setter 会生效，第二个会被忽略。

原因藏在 Button 的模板中。您可以在 Avalonia 源代码中找到默认模板（[Simple](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Themes.Simple/Controls/Button.xaml) 主题和（[Fluent](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Themes.Fluent/Controls/Button.xaml) 主题）。但是为了便利，这里提供了一个简化的 Fluent 主题示例：

```xml
<Style Selector="Button">
    <Setter Property="Background" Value="{DynamicResource ButtonBackground}"/>
    <Setter Property="Template">
        <ControlTemplate>
            <ContentPresenter Name="PART_ContentPresenter"
                              Background="{TemplateBinding Background}"
                              Content="{TemplateBinding Content}"/>
        </ControlTemplate>
    </Setter>
</Style>
<Style Selector="Button:pointerover /template/ ContentPresenter#PART_ContentPresenter">
    <Setter Property="Background" Value="{DynamicResource ButtonBackgroundPointerOver}" />
</Style>
```

实际的背景是由 ContentPresenter 渲染的，默认情况下它绑定到 Button 的 Background 属性。然而在 pointerover 状态时，选择器会直接将背景应用到 ContentPresenter（即 Button:pointerover /template/ ContentPresenter#PART_ContentPresenter）。这就是为什么前面示例中的 setter 被忽略了。正确的做法是直接针对 ContentPresenter 设置样式。

```xml
<!-- 这里的 #PART_ContentPresenter 名称选择器其实不是必须的，但添加它可以让样式选择器更具体、优先级更高。 -->
<Style Selector="Button:pointerover /template/ ContentPresenter#PART_ContentPresenter">
    <Setter Property="Background" Value="Blue" />
</Style>
```

:::info
你可以在所有控件的默认主题（包括 Simple 和 Fluent）中看到这种写法，不仅仅是 Button，也不仅限于 Background 属性，其他依赖状态的属性同样如此。
:::

:::info
为什么默认样式会直接修改 ContentPresenter 的 `Background` 属性，而不是修改 `Button.Background` 属性？

这是因为如果用户在按钮上设置了本地值，这个本地值会覆盖所有样式，使按钮始终显示为同一种颜色。更多详情请浏览这个[回退的 PR](https://github.com/AvaloniaUI/Avalonia/pull/2662#issuecomment-515764732)。
:::

### 样式失效时属性值不会恢复

Avalonia 有多种属性类型，其中 DirectProperty（直接属性）不支持样式。此类属性为了提升性能，仅保存最新值，不会根据优先级存储多个值，因此无法恢复之前的值。更多属性详情见[此处](../custom-controls/defining-properties)。

典型例子如 [CommandProperty](https://api-docs.avaloniaui.net/docs/P_Avalonia_Controls_Button_Command)，它是直接属性，无法通过样式正常工作。在未来，为直接属性设置样式会导致编译错误，详见 [#6837](https://github.com/AvaloniaUI/Avalonia/issues/6837)。
