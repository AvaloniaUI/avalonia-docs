---
id: how-to-use-fonts
title: 如何使用自定义字体
---

使用独特的字体来定制您的 Avalonia 应用程序，可以增加独特的外观和感觉。本指南将引导您了解如何将自定义字体集成到您的 Avalonia 应用程序中。

:::info
如果您想查看这些概念在实际中的完整运行示例，请查看 [示例应用程序](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/GoogleFonts)。
:::

## 将自定义字体添加到项目中

在使用自定义字体之前，您需要将其包含在项目中。

在本指南中，我们将使用一个名为 [Nunito](https://fonts.google.com/specimen/Nunito) 的字体，该字体已经存储在我们的应用程序资源中，路径为 `avares://GoogleFonts/Assets/Fonts`。

确保字体的构建属性设置为 `AvaloniaResource`。

## 在应用程序资源中声明您的字体

在您的Avalonia应用程序中，打开`App.xaml`文件，并在`<Application.Resources>`标签内包含您的自定义字体。为它指定一个键，您将使用该键在应用程序中引用它。在本例中，我们使用了键`NunitoFont`。

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="GoogleFonts.App"
             RequestedThemeVariant="Default">
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
    // highlight-start
    <Application.Resources>
        <FontFamily x:Key="NunitoFont">avares://GoogleFonts/Assets/Fonts#Nunito</FontFamily>
    </Application.Resources>
     // highlight-end
</Application>
```

## 使用您的自定义字体
一旦您的字体在应用程序资源中声明，您可以在应用程序中使用它。

要引用您的自定义字体，请使用`FontFamily`属性与`StaticResource`标记扩展。您需要将已声明字体的键作为参数传递。在本例中，`NunitoFont`是我们自定义字体的键。

以下是如何将我们的自定义`Nunito`字体应用于`TextBlock`的示例：

```xml
<TextBlock Text="{Binding Greeting}" 
           FontSize="70" 
           FontFamily="{StaticResource NunitoFont}" 
           HorizontalAlignment="Center" VerticalAlignment="Center"/>
```

在上面的示例中，`TextBlock`控件将使用我们在应用程序资源中声明的`Nunito`字体。绑定到`TextBlock`的文本现在将以指定的字体大小70呈现为`Nunito`字体。

请记住，`FontFamily`属性可以应用于任何具有`FontFamily`属性的控件，这意味着您可以在整个应用程序中使用您的自定义字体。

就是这样！您已成功将自定义字体集成到您的Avalonia应用程序中。现在，您可以通过选择适合您的字体为应用程序的用户界面增加独特的风格。



