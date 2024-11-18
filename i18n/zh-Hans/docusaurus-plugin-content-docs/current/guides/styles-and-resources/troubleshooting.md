---
id: troubleshooting
title: 如何解决样式问题
---


# 👉 如何解决样式问题

大部分 _Avalonia UI_ 的样式系统与 CSS 样式方法相对应。如果您对这项技术不了解，您可能会发现以下提示有所帮助。

## 选择器没有目标

_Avalonia UI_ 的选择器，就像 CSS 选择器一样，当没有匹配的控件时不会引发错误或警告。样式将静默失败。

:::info
检查是否使用了不存在的名称或类。
:::

:::info
检查是否使用了子选择器，而没有匹配的子控件。
:::

## 包含文件的顺序

样式按照声明的顺序应用。如果有多个包含了针对相同控件属性的样式文件，则最后一个包含的样式将覆盖之前的样式。例如：

```xml
<Style Selector="TextBlock.header">
    <Style Property="Foreground" Value="Green" />
</Style>
```

```xml
<Style Selector="TextBlock.header">
    <Style Property="Foreground" Value="Blue" />
    <Style Property="FontSize" Value="16" />
</Style>
```

```xml
<StyleInclude Source="Style1.axaml" />
<StyleInclude Source="Style2.axaml" />
```

在这个例子中，首先应用了来自文件 **Styles1.axaml** 的样式，所以文件 **Styles2.axaml** 中的样式设置会覆盖之前的样式。最终的 TextBlock 将具有 FontSize="16" 和 Foreground="Green"。在样式文件内部也会发生相同的优先级排序。

## 本地设置的属性具有优先级

直接在控件上定义的本地值通常比任何样式值具有更高的优先级。因此，在这个例子中，文本块的前景色将是红色的：

```xml
<Style Selector="TextBlock.header">
    <Setter Property="Foreground" Value="Green" />
</Style>
...
<TextBlock Classes="header" Foreground="Red" />
```

您可以在 `BindingPriority` 枚举中看到完整的值优先级列表，较低的枚举值具有较高的优先级。

<table><thead><tr><th width="218">绑定优先级 </th><th width="147.33333333333331">值</th><th>说明</th></tr></thead><tbody><tr><td><code>Animation</code></td><td>-1</td><td>最高优先级——甚至可以覆盖本地值</td></tr><tr><td><code>LocalValue</code></td><td>0</td><td>在控件的属性上设置了本地值。</td></tr><tr><td><code>StyleTrigger</code></td><td>1</td><td>当伪类变为活动状态时触发。</td></tr><tr><td><code>TemplatedParent</code></td><td>2</td><td></td></tr><tr><td><code>Style</code></td><td>3</td><td></td></tr><tr><td><code>Unset</code></td><td>2147483647</td><td></td></tr></tbody></table>

:::warning
例外情况是 `Animation` 值具有最高优先级，甚至可以覆盖本地值。
:::

:::info
一些默认的 _Avalonia UI_ 样式在其模板中使用本地值而不是模板绑定或样式设置。这使得在不替换整个模板的情况下无法更新模板属性。
:::

### 缺失的样式伪类（触发器）选择器

假设有一种情况，您希望第二个样式覆盖前一个样式，但实际上并没有覆盖：

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

在这个代码示例中，`Border` 正常情况下具有红色背景，当鼠标指针悬停在上面时具有蓝色背景。这是因为与 CSS 一样，更具体的选择器具有优先权。当您希望使用一个单独的样式覆盖任何状态（例如 pointerover、pressed 或其他状态）的默认样式时，这可能会成为问题。为了实现这一点，您需要为这些状态创建新的样式。

:::info
访问 Avalonia 源代码以找到当出现这种情况时的[原始模板](https://github.com/AvaloniaUI/Avalonia/tree/master/src/Avalonia.Themes.Fluent/Controls)，并将带有伪类的样式复制粘贴到您的代码中。
:::

### 具有伪类的选择器不覆盖默认样式

以下代码示例中的样式应该在默认样式之上起作用：

```xml
<Style Selector="Button">
    <Setter Property="Background" Value="Red" />
</Style>
<Style Selector="Button:pointerover">
    <Setter Property="Background" Value="Blue" />
</Style>
```

您可能期望 `Button` 在默认情况下是红色的，当鼠标指针悬停在上面时是蓝色的。实际上，只有第一个样式的 setter 将被应用，第二个将被忽略。

原因在于 Button 的模板中。您可以在 Avalonia 源代码中找到默认模板（旧版 [Default](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Themes.Default/Button.xaml) 主题和新版 [Fluent](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Themes.Fluent/Controls/Button.xaml) 主题），但为了方便起见，我们在此处简化了来自 Fluent 主题的模板：

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

实际背景是由 `ContentPresenter` 渲染的，在默认情况下它与按钮的 `Background` 属性绑定。然而，在 pointerover 状态下，选择器直接将背景应用于 `ContentPresenter (Button:pointerover /template/ ContentPresenter#PART_ContentPresenter)`。这就是为什么在前一个代码示例中我们的 setter 被忽略的原因。修正后的代码应该直接针对 content presenter：

```xml
<!-- 这里的 #PART_ContentPresenter 名称选择器不是必需的，但为了具有更具体的样式而添加 -->
<Style Selector="Button:pointerover /template/ ContentPresenter#PART_ContentPresenter">
    <Setter Property="Background" Value="Blue" />
</Style>
```

:::info
您可以在默认主题（包括旧版 Default 和新版 Fluent）中看到所有控件的这种行为，不仅限于 Button。而且不仅限于 Background，还包括其他依赖于状态的属性。
:::

:::info
为什么默认样式直接更改 `ContentPresenter` 的 `Background` 属性而不是更改 `Button.Background` 属性？

这是因为如果用户在按钮上设置了本地值，它将覆盖所有样式，并使按钮始终具有相同的颜色。有关更多详情，请参见 [撤销的 PR](https://github.com/AvaloniaUI/Avalonia/pull/2662#issuecomment-515764732).
:::

### 当样式不再应用时，特定属性的先前值不会恢复

在 Avalonia 中，我们有多种类型的属性，其中之一是直接属性（Direct Property），它根本不支持样式。这些属性以简化的方式工作，以实现较低的开销和更高的性能，并且不存储多个依赖于优先级的值。而是只保存最新的值，无法恢复之前的值。您可以在 [此处](../custom-controls/defining-properties) 找到有关属性的更多详情。

典型的例子是 [CommandProperty](http://reference.avaloniaui.net/api/Avalonia.Controls/Button/B9689B29)。它被定义为直接属性，因此它永远不会正常工作。将来，尝试为直接属性设置样式将导致编译时错误，详见 [#6837](https://github.com/AvaloniaUI/Avalonia/issues/6837)。
