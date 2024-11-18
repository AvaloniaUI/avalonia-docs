---
id: control-themes
title: 控件主题（Control Themes）
---

import StylingEllipseButtonScreenshot from '/img/basics/user-interface/styling/ellipse-button.png';

控件主题是在[样式](styles)的基础上构建的，用于为控件创建可切换的主题。尽管控件主题与 WPF/UWP 中的样式类似，但它们的机制略有不同。

:::tip
因为控件主题是基于样式的，所以首先需要理解 Avalonia 的[样式系统](styles)。
:::

## 简介

在 Avalonia 11 之前，控件主题是使用标准样式创建的。然而，这种方法存在一个根本性的问题：一旦样式被应用到控件上，就没有办法移除它。因此，如果你想为特定的控件实例或用户界面（UI）部分更改主题，唯一的选择是将第二个主题应用到控件上，并希望它能覆盖原始主题中设置的所有属性。

这个问题的解决方案在 Avalonia 11 中引入，形式为 _控件主题_。

控件主题本质上是样式，但有一些重要的区别：

- 控件主题没有选择器：它们有一个 `TargetType` 属性，用于描述它们要针对的控件。
- 控件主题存储在 `ResourceDictionary` 中，而不是 `Styles` 集合中。
- 控件主题通过设置 `Theme` 属性来分配给控件，通常使用 `{StaticResource}` 标记扩展。

:::info
控件主题通常应用于[模板化（无外观）](../controls/creating-controls/choosing-a-custom-control-type.md)的控件，但实际上它们可以应用于任何控件。然而，对于非模板化的控件，通常更方便使用标准样式。
:::

## 示例：圆形按钮

以下示例显示了一个简单的 `Button` 主题，它显示一个带有椭圆背景的按钮，具有 90 年代的 Geocities 风格：

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>

  <Application.Resources>
    // highlight-start
    <ControlTheme x:Key="EllipseButton" TargetType="Button">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
    </ControlTheme>
    // highlight-end
  </Application.Resources>
</Application>
```

```xml title='MainWindow.xaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x='http://schemas.microsoft.com/winfx/2006/xaml'
        x:Class="Sandbox.MainWindow">
  // highlight-start
  <Button Theme="{StaticResource EllipseButton}"
          HorizontalAlignment="Center"
          VerticalAlignment="Center">
    Hello World!
  </Button>
  // highlight-end
</Window>
```

<p><img className="medium-image-zoom" src={StylingEllipseButtonScreenshot} alt="椭圆形按钮" /></p>

## 控件主题中的交互

与标准样式一样，控件主题支持[嵌套样式](../styling/styles.md#nesting-styles)，可以用于添加指针悬停和按下状态等交互。

## 示例：圆形按钮悬停状态

使用嵌套样式，我们可以使按钮在指针悬停在其上时改变颜色：

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>

  <Application.Resources>
    <ControlTheme x:Key="EllipseButton" TargetType="Button">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
      
      // highlight-start
      <Style Selector="^:pointerover">
        <Setter Property="Background" Value="Red"/>
        <Setter Property="Foreground" Value="White"/>
      </Style>
      // highlight-end
    </ControlTheme>
  </Application.Resources>
</Application>
```

## 控件主题查找

控件主题有两种查找方式：

- 如果控件的 `Theme` 属性被设置，则使用该控件主题；否则
- Avalonia 会从逻辑树向上搜索控件，查找一个 `x:Key` 与控件的[样式键](styles#style-key)匹配的 `ControlTheme` 资源

:::tip
如果你在使用 Avalonia 时发现控件无法找到主题，请确保它返回了与控件主题的 `x:Key` 和 `TargetType` 匹配的[样式键](styles#style-key)。
:::

实际上，这意味着您有两种选择来定义控件主题：

- **如果您希望控件主题应用于控件的所有实例**，请将 `{x:Type}` 用作资源键。例如：
  `<ControlTheme x:Key="{x:Type Button}" TargetType="Button">`
- **如果您希望控件主题应用于选定的控件实例**，请使用任何其他内容作为资源键，并使用 `{StaticResource}` 查找此资源。通常，此键将是一个 `string`。

:::info
请注意，这意味着一次只能应用一个控件主题到一个控件。
:::

## 示例：使所有按钮都成为圆形

我们可以通过简单地将控件主题的 `x:Key` 更改为匹配 `Button` 类型来将我们的新控件主题应用到应用程序中的所有按钮。

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>

  <Application.Resources>
      // highlight-next-line
    <ControlTheme x:Key="{x:Type Button}" TargetType="Button">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
      
      <Style Selector="^:pointerover">
        <Setter Property="Background" Value="Red"/>
        <Setter Property="Foreground" Value="White"/>
      </Style>
    </ControlTheme>
  </Application.Resources>
</Application>
```

## TargetType

`ControlTheme.TargetType` 属性指定适用 `Setter` 属性的类型。如果您没有指定 `TargetType`，则必须使用类名限定 `Setter` 对象中的属性，使用 `Property="ClassName.Property"` 的语法。例如，不要设置 `Property="FontSize"`，而应该设置 `Property` 为 `TextBlock.FontSize` 或 `Control.FontSize`。

## 更多资源

- [ButtonCustomize](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ButtonCustomize) 示例中有一个 `WinClassicButtonTheme`。
  您可以在以下位置查看 Avalonia 内置控件的控件主题：
  - [Simple Theme](https://github.com/AvaloniaUI/Avalonia/tree/master/src/Avalonia.Themes.Simple/Controls)
  - [Fluent Theme](https://github.com/AvaloniaUI/Avalonia/tree/master/src/Avalonia.Themes.Fluent/Controls)
