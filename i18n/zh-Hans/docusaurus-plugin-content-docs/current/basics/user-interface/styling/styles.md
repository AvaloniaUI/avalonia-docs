---
id: styles
title: 样式
---

import StyleH1SampleScreenshot from '/img/basics/user-interface/styling/style-h1.png';

# 样式

_Avalonia UI_ 的样式系统是一种可以在控件之间共享属性设置的机制。

:::tip
在 Avalonia 中，`Style` 更类似于 CSS 样式，而不是 WPF/UWP 样式。在 Avalonia 中，与 WPF/UWP 中的样式相当的是[`ControlTheme`](control-themes)。
:::

## 工作原理

实质上，样式机制有两个步骤：选择和替换。样式的 XAML 可以定义如何进行这两个步骤，但通常你会在控件元素上定义 'class' 标签来帮助选择步骤。

:::info
_Avalonia UI_ 样式系统使用在控件元素上的 'class' 标签与 CSS（层叠样式表）在 HTML 元素上的工作方式类似。
:::

在选择步骤中，样式系统从控件开始沿着[逻辑树](../../../concepts/control-trees.md)向上搜索。这意味着在应用程序的最高级别（例如 `App.axaml` 文件）定义的样式可以在应用程序的任何地方使用，但仍然可以在控件更近的地方（例如在窗口或用户控件中）进行覆盖。

当选择步骤找到匹配项时，匹配的控件的属性将根据样式中的设置器进行更改。

## 如何编写

样式的 XAML 有两个部分：选择器属性和一个或多个设置器元素。选择器的值包含使用 _Avalonia UI_ **样式选择器语法** 的字符串。每个设置器元素通过名称标识将被更改的属性和将被替换的新值。模式如下：

```
<Style Selector="selector syntax">
     <Setter Property="property name" Value="new value"/>
     ...
</Style>
```

:::info
_Avalonia UI_ **样式选择器语法** 类似于 CSS（层叠样式表）中使用的语法。有关详细的参考信息，请参阅 [此处](../../../reference/styles/style-selector-syntax.md)。
:::

## 示例

以下是样式如何编写并应用于控件元素的示例，使用[样式类](style-classes)来辅助选择：

```xml
<Window ... >
    <Window.Styles>
        <Style Selector="TextBlock.h1">
            <Setter Property="FontSize" Value="24"/>
            <Setter Property="FontWeight" Value="Bold"/>
        </Style>
    </Window.Styles>
    <StackPanel Margin="20">
       <TextBlock Classes="h1">Heading 1</TextBlock>
    </StackPanel>
</Window>
```

在此示例中，所有带有 `h1` 样式类的 `TextBlock` 元素将显示为样式设置的字体大小和字重。这在预览面板中工作：

<img src={StyleH1SampleScreenshot} alt=""/>

## 放置样式的位置

样式放置在 `Control` 或 `Application` 上的 `Styles` 集合元素中。例如，窗口的样式集合如下：

```xml
<Window.Styles>
   <Style> ...  </Style>
</Window.Styles>
```

样式集合的位置定义了其中包含的样式的范围。在上面的示例中，样式将应用于窗口及其所有内容。如果样式添加到 `Application`，则将全局应用。

## 选择器

样式选择器定义样式将作用于哪些控件。选择器使用多种格式，其中最简单的一个如下：

```xml
<Style Selector="TargetControlClass.styleClassName">
```

这个选择器将匹配具有样式键`TargetControlClass`且带有样式类`styleClassName`的所有控件。

:::info
完整的选择器列表可在[此处](../../../reference/styles/style-selector-syntax.md)找到。
:::

## 设置器

设置器描述了当选择器与控件匹配时会发生什么。它们是以以下格式编写的简单的属性/值对：

```xml
<Setter Property="FontSize" Value="24"/>
<Setter Property="Padding" Value="4 2 0 4"/>
```

当样式与控件匹配时，样式中的所有设置器都将应用于控件。

:::info
有关设置器的更多信息，请参阅[此处](../../../guides/styles-and-resources/property-setters.md).
:::

## 嵌套样式

样式可以嵌套在其他样式中。要嵌套样式，只需将子样式作为父 `<Style>` 元素的子元素包含，并在子选择器的开头加上 [嵌套选择器 `^`](../../../reference/styles/style-selector-syntax.md#nesting):

```xml
<Style Selector="TextBlock.h1">
    <Setter Property="FontSize" Value="24"/>
    <Setter Property="FontWeight" Value="Bold"/>
    
    // highlight-start
    <Style Selector="^:pointerover">
        <Setter Property="Foreground" Value="Red"/>
    </Style>
    // highlight-end
</Style>
```

当发生这种情况时，父样式的选择器将自动应用于子样式。在上面的示例中，嵌套样式的选择器将是 `TextBlock.h1:pointerover`，这意味着当指针悬停在控件上时，它将显示为红色前景色。

:::info
嵌套选择器必须存在，并且必须出现在子选择器的开头。
:::

## 样式键

样式选择器匹配的对象的类型不是由控件的具体类型决定的，而是通过检查其 `StyleKey` 属性来确定的。

默认情况下，`StyleKey` 属性返回当前实例的类型。然而，如果你希望你的控件（继承自 Button）被样式化为一个按钮，你可以在你的类中重写 `StyleKeyOverride` 属性，并让它返回 `typeof(Button)`。

```csharp
public class MyButton : Button
{
    // MyButton 将会被作为标准的 Button 控件样式化。
    protected override Type StyleKeyOverride => typeof(Button);
}
```

:::info
请注意，这与 WPF/UWP 相比逻辑是相反的：在这些框架中，当你派生一个新的控件时，它将被样式化为其基础控件，除非你覆盖 `DefaultStyleKey` 属性。在 Avalonia 中，控件将使用其具体类型进行样式化，除非提供了不同的样式键。
:::

:::info
在 Avalonia 11 之前，样式键是通过实现 `IStyleable` 并提供新的 `IStyleable.StyleKey` 属性实现的。Avalonia 11 仍然支持这种机制以保持兼容性，但在未来的版本中可能会删除。
:::

## 样式和资源

样式通常与资源一起使用以帮助维护一致的表现。资源可以帮助定义应用程序中的标准颜色和图标，或者在从单独文件中包含时可以跨多个应用程序中使用。

:::info
有关如何在应用程序中使用资源的指导，请参阅[此处](../../../guides/styles-and-resources/resources.md).
:::

## 更多信息

:::info
有关如何通过包含样式文件来共享样式的指导，请参阅[此处](../../../guides/styles-and-resources/how-to-use-included-styles.md).
:::
