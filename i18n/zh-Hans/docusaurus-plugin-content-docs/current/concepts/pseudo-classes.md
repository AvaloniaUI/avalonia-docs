---
description: CONCEPTS
---
# 伪类

Avalonia中的伪类与CSS中的伪类类似，它们是添加到选择器中的关键字，用于指定所选元素的特殊状态。它们可以根据特定条件对控件进行不同的样式设置。例如，当按钮被按下时，可以为其设置不同的样式，或者当TextBox被禁用时可以设置不同的样式。

Avalonia支持许多内置的伪类，并且控件可以定义自己的伪类。

## 使用方法
要使用伪类，您需要在选择器后面添加冒号（:）和伪类。以下是一个示例：

```xml
<Button Content="点击我！">
  <Button.Styles>
    // highlight-start
    <Style Selector="Button:pointerover">
    // highlight-end
      <Setter Property="Background" Value="Red"/>
    </Style>
  </Button.Styles>
</Button>
```

在这个示例中，当鼠标指针悬停在按钮上时，按钮的背景颜色将变为红色，这得益于`pointerover`伪类。

## 内置伪类
一些内置的伪类包括：

* `:pointerover`：鼠标指针悬停在控件上。
* `:pressed`：控件正在被按下。
* `:disabled`：控件被禁用。
* `:focus`：控件具有输入焦点。
* `:watermark`：对于TextBox控件，当显示水印时。
* `:checked`：对于可选控件，如CheckBox或MenuItem，当被选中时。
* `:indeterminate`：对于像CheckBox这样的控件，当处于不确定状态时。
* `:valid`：对于输入控件，当输入有效时。
* `:invalid`：对于输入控件，当输入无效时。

您可以将伪类与类型选择器和类选择器结合使用，创建各种效果。

## 自定义伪类

控件可以为特定行为定义自己的伪类。要定义伪类，控件通常会创建一个静态只读字段，类型为`PseudoClass`，并调用`PseudoClasses.Set()`来启用伪类，调用`PseudoClasses.Remove()`来禁用伪类。

例如，可以如下定义一个自定义的`:custom`伪类：

```cs
public static readonly PseudoClass CustomPseudoClass = PseudoClass.Parse(":custom");

// 启用
PseudoClasses.Set(CustomPseudoClass);

// 禁用
PseudoClasses.Remove(CustomPseudoClass);
```

这样可以使开发人员在样式中添加更多的表现力和控制性，将样式针对非常特定的控件状态进行定制。







