---
description: GUIDES - WPF Conversion
---

# 数据模板（Data Templates）

在Avalonia UI中，数据模板不会存储在应用程序资源中。（样式也是如此，请参见[这里](styling)。）

相反，数据模板要么放置在控件的`DataTemplates`集合内，要么放置在`Application`上：

例如，以下代码添加了一个数据模板来显示视图模型类`MyViewModel`：

```markup
<UserControl xmlns:viewmodels="clr-namespace:MyApp.ViewModels;assembly=MyApp">
    <UserControl.DataTemplates>
        <DataTemplate DataType="viewmodels:MyViewModel">
            <Border Background="Red" CornerRadius="8">
                <TextBox Text="{Binding Name}"/>
            </Border>
        </DataTemplate>
    </UserControl.DataTemplates>
    <!-- 假设DataContext.Foo是MyApp.ViewModels.FooViewModel类型的对象，
        则此处将显示一个具有圆角半径为8的红色边框和包含一个文本框的内容 -->
    <ContentControl Content="{Binding Foo}"/>
<UserControl>
```

Avalonia中的数据模板也可以针对接口和派生类（这在WPF中是不可能的），因此`DataTemplate`的顺序可能很重要：同一集合内的`DataTemplate`按照声明的顺序进行评估，因此您需要按照代码中的顺序将它们从最具体到最不具体的位置放置。

## 数据模板选择器（Data Template Selector）

在WPF中，您可以创建`DataTemplateSelector`来根据提供的数据选择或创建`DataTemplate`。在Avalonia中，您不能这样做，但是您可以实现`IDataTemplate`，它可以被看作是`DataTemplateSelector`的良好替代品。[这里](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/IDataTemplateSample)有一个示例。
