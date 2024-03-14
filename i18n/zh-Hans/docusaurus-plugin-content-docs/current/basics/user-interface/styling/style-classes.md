---
id: style-classes
title: 样式类
---

# 样式类（Style Classes）

你可以为 _Avalonia UI_ 控件分配一个或多个样式类，并使用它们来指导样式选择。样式类通过在控件元素中使用 `Classes` 属性进行分配。如果你想分配多个类，则使用空格分隔它们。

例如，这个按钮同时应用了 `h1` 和 `blue` 样式类：

```xml
<Button Classes="h1 blue"/>
```

## 伪类（Pseudo Classes）

与 CSS 类似，控件可以拥有伪类，这些类是在控件本身而不是用户定义的。伪类在选择器中的名称始终以冒号开头。

例如，`:pointerover` 伪类表示指针输入当前悬停在控件上（在控件的边界内）。（这个伪类类似于 CSS 中的 `:hover`。）

这是一个使用 `:pointerover` 伪类选择器的示例：

```xml
<StackPanel>
  <StackPanel.Styles>
    <Style Selector="Border:pointerover">
      <Setter Property="Background" Value="Red"/>
    </Style>
  </StackPanel.Styles>
  <Border>
    <TextBlock>I will have red background when hovered.</TextBlock>
  </Border>
</StackPanel>
```

在此示例中，伪类选择器更改了控件模板内的属性：

```xml
<StackPanel>
  <StackPanel.Styles>
    <Style Selector="Button:pressed /template/ ContentPresenter">
        <Setter Property="TextBlock.Foreground" Value="Red"/>
    </Style>
  </StackPanel.Styles>
  <Button>I will have red text when pressed.</Button>
</StackPanel>
```

其他伪类包括 `:focus`、`:disabled`、`:pressed`（用于按钮）和 `:checked`（用于复选框）。

:::info
有关伪类的更多详细信息，请参阅参考 [此处](../../../reference/styles/pseudo-classes.md).
:::

## 条件类（Conditional Classes）

如果你需要使用绑定条件添加或删除类，则可以使用以下特殊语法：

```xml
<Button Classes.accent="{Binding IsSpecial}" />
```

## 代码中的类（Classes in Code）

你可以使用 `Classes` 集合在代码中操作样式类：

```csharp
control.Classes.Add("blue");
control.Classes.Remove("red");
```
