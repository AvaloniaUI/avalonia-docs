---
id: how-to-use-theme-variants
title: 如何使用主题变体
---

:::tip
由于主题变体与资源系统深度集成，了解 Avalonia 的 [resources](resources) 首先是很重要的。
:::

## 介绍

在 Avalonia 中，主题变体（theme variant）指的是基于选择的主题而具有的特定视觉外观的控件。

通过使用主题变体，开发人员可以创建视觉吸引力强、一致性的用户界面，以适应不同的用户偏好或系统设置。例如，一个应用程序可以提供一个带有白色背景和黑色文本的浅色主题变体，以及一个带有黑色背景和白色文本的深色主题变体。用户可以选择他们喜欢的主题，应用程序将相应地调整其外观。

Avalonia 内置的主题 `SimpleTheme` 和 `FluentTheme` 无需额外代码即可无缝支持 `Dark` 和 `Light` 变体。这使得应用程序可以根据系统偏好动态适应，并使用内置控件。对于高级定制，本文档解释了如何定义与变体相关的自定义资源及其引用方式。

## 切换当前主题变体

默认情况下，Avalonia 继承用户在全系统范围内设置的主题变体。
应用程序通过两个重要的属性来控制主题变体：[ActualThemeVariant](#actualthemevariant-property) 和 [RequestedThemeVariant](#requestedthemevariant-property)。这些属性允许您在应用程序的不同层级中管理和切换主题变体。

### `ActualThemeVariant` 属性

ActualThemeVariant 只读属性用于检索控件、窗口或应用程序当前使用的 UI 主题。它表示元素上实际应用的主题变体。
该属性在每个控件上都可用，并在树中向下继承。在访问 主题字典（theme dictionaries） 时，其值也被样式系统使用。

### `RequestedThemeVariant` 属性

RequestedThemeVariant 属性允许覆盖主题变体并为 `Application`、`Window`(`TopLevel`) 或 `ThemeVariantScope` 指定所需的变体。

要覆盖全局应用程序变体，而不使用系统默认值：
```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App"
    // highlight-start
             RequestedThemeVariant="Dark">
    // highlight-end
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>
</Application>
```

或者可以在特定子树中重新定义主题变体，使用 ThemeVariantScope 控件。在下面的示例中，Window 使用 Dark 变体，而 `ThemeVariantScope` 内部将其重新定义为 Light 变体：
```xml title="MainWindow.axaml"
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x='http://schemas.microsoft.com/winfx/2006/xaml'
        x:Class="AvaloniaApplication.MainWindow"
    // highlight-start
        RequestedThemeVariant="Dark"
    // highlight-end
        Background="Gray">
  <StackPanel Spacing="5" Margin="5">
    <Button Content="Dark button" />
    // highlight-start
    <ThemeVariantScope RequestedThemeVariant="Light">
    // highlight-end
      <Button Content="Light button" />
    </ThemeVariantScope>
  </StackPanel>
</Window>
```

![重写主题变体](/img/basics/user-interface/styling/overriden-theme-variant.png)

如果需要使用重置 RequestedThemeVariant 的值，可以将 `RequestedThemeVariant="Default"` 设置在其中。

:::tip
更改 Window 的 RequestedThemeVariant 也会影响支持该功能的平台上的窗口装饰变体。
:::

## 定义和引用自定义的变体特定资源

在 Avalonia 中，主题变体特定的资源可以在 `ResourceDictionary` 中使用 `ThemeDictionaries` 属性进行定义。

通常，开发人员使用 `Light` 或 `Dark` 作为主题变体的键。使用 `Default` 作为键标记这个特定的主题字典作为后备，以防在其他主题字典中找不到主题变体或资源键。

继续上面的例子，让我们为每个主题变体添加 `BackgroundBrush` 和 `ForegroundBrush` 并赋予不同的值：
```xml title="MainWindow.axaml"
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x='http://schemas.microsoft.com/winfx/2006/xaml'
        x:Class="Sandbox.MainWindow"
        RequestedThemeVariant="Dark"
        Background="Gray">
  <Window.Resources>
    // highlight-start
    <ResourceDictionary>
      <ResourceDictionary.ThemeDictionaries>
        <ResourceDictionary x:Key='Light'>
          <SolidColorBrush x:Key='BackgroundBrush'>SpringGreen</SolidColorBrush>
          <SolidColorBrush x:Key='ForegroundBrush'>Black</SolidColorBrush>
        </ResourceDictionary>
        <ResourceDictionary x:Key='Dark'>
          <SolidColorBrush x:Key='BackgroundBrush'>DodgerBlue</SolidColorBrush>
          <SolidColorBrush x:Key='ForegroundBrush'>White</SolidColorBrush>
        </ResourceDictionary>
      </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
    // highlight-end
  </Window.Resources>
  
  <Window.Styles>
    // highlight-start
    <Style Selector="Button">
      <Setter Property="Background" Value="{DynamicResource BackgroundBrush}" />
      <Setter Property="Foreground" Value="{DynamicResource ForegroundBrush}" />
    </Style>
    // highlight-end
  </Window.Styles>

  <StackPanel Spacing="5" Margin="5">
    <Button Content="Dark button"
            Background="{DynamicResource BackgroundBrush}"
            Foreground="{DynamicResource ForegroundBrush}" />
    <ThemeVariantScope RequestedThemeVariant="Light">
      <Button Content="Light button"
              Background="{DynamicResource BackgroundBrush}"
              Foreground="{DynamicResource ForegroundBrush}" />
    </ThemeVariantScope>
  </StackPanel>
</Window>

```

![自定义主题字典](/img/basics/user-interface/styling/custom-theme-dictionaries.png)

有关使用资源的更多详细信息，请参阅 [如何使用资源](resources) 页面。