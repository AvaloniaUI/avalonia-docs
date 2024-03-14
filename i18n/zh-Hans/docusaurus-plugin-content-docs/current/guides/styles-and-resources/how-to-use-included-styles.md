---
id: how-to-use-included-styles
title: 如何使用包含的样式
---

import VsStylesTemplateScreenshot from '/img/guides/styles-and-resources/vs-styles-template.png';

# 如何使用包含的样式

本指南向您展示了如何从一个单独的样式文件中共享样式（该文件已包含在您的应用程序中）。这种方法允许您在多个应用程序之间共享样式。

要实现这一点，您需要在一个新的XAML文件中定义样式。在这里，根元素必须是`Style`或`Styles`元素之一。例如：

```xml
<Styles xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Style Selector="TextBlock.h1">
        <Setter Property="FontSize" Value="24"/>
        <Setter Property="FontWeight" Value="Bold"/>
    </Style>
</Styles>
```

_Avalonia UI_ 解决方案模板提供了一种快速添加样式文件到您的项目的方法。按照以下步骤进行操作：

-  在**解决方案资源管理器**中，右键单击您的项目。
-  点击**添加**和**新建项**
-  在Avalonia项目中，点击 **Styles (Avalonia)**
-  为您的样式文件输入一个名称

<img src={VsStylesTemplateScreenshot} alt=""/>

要使用在一个单独文件中定义的样式，您需要通过`StyleInclude`元素来引用它。`source`属性定义了样式文件的位置。您可以选择在哪个级别添加这个元素。

例如，要使用在名为`AppStyles.axaml`的文件中定义的样式（保存在`/Styles`文件夹中），您可以在窗口中添加如下的`StyleInclude`元素：

```xml
<Window ... >
    <Window.Styles>
        <StyleInclude Source="/Styles/AppStyles.axaml" />
    </Window.Styles>

    <StackPanel>
       <TextBlock Classes="h1">Heading 1</TextBlock>
       <TextBlock>This is not a heading and will not be changed.</TextBlock>
    </StackPanel>
</Window>
```

然而，更常见的是在`App.axaml`文件中引用样式文件，如下所示：

```xml
<Application... > 
    <Application.Styles>
        <FluentTheme Mode="Light"/>
        <StyleInclude Source="/AppStyles.axaml"/>
    </Application.Styles>
</Application>
```

这样将允许您在整个应用程序中使用来自单独文件的样式。

您还可以通过使用 `avares://` 前缀来包含另一个程序集的样式：

```xml
<Application... > 
    <Application.Styles>
        <FluentTheme Mode="Light"/>
        <StyleInclude Source="avares://MyApp.Shared/Styles/CommonAppStyles.axaml"/>
    </Application.Styles>
</Application>
```

将引用 `MyApp.Shared` 项目中的 `/Styles/CommonAppStyles.axaml` 文件。
