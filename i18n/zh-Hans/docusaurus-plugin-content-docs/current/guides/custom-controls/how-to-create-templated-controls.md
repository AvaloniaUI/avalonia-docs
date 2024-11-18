---
id: how-to-create-templated-controls
title: 如何创建模板化控件
---


# 如何创建模板化控件

## 数据绑定

当你创建一个控件模板并且想要绑定到模板化的父级时，你可以使用以下方式：

```xml
<TextBlock Name="tb" Text="{TemplateBinding Caption}"/>

<!-- 这与以下方式相同 -->
<TextBlock Name="tb" Text="{Binding Caption, RelativeSource={RelativeSource TemplatedParent}}"/>
```

虽然这里展示的两种语法在大多数情况下是等效的，但是有一些区别：

1. `TemplateBinding` 只接受单个属性而不是属性路径，所以如果你想要使用属性路径进行绑定，你必须使用第二种语法：

    ```xml
    <!-- 这样是行不通的，因为 TemplateBinding 只接受单个属性 -->
    <TextBlock Name="tb" Text="{TemplateBinding Caption.Length}"/>

    <!-- 在这种情况下必须使用以下语法 -->
    <TextBlock Name="tb" Text="{Binding Caption.Length, RelativeSource={RelativeSource TemplatedParent}}"/>
    ```
2. 由于性能原因，`TemplateBinding` 只支持 `OneWay` 模式（这与 [WPF](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/advanced/templatebinding-markup-extension#remarks) 相同）。这意味着 `TemplateBinding` 实际上等同于 `{Binding RelativeSource={RelativeSource TemplatedParent}, Mode=OneWay}`。如果在控件模板中需要 `TwoWay` 绑定，则需要使用完整的语法，如下所示。请注意，`Binding` 也将使用默认的绑定模式，不同于 `TemplateBinding`。

    ```markup
    {Binding RelativeSource={RelativeSource TemplatedParent}, Mode=TwoWay}
    ```
3. `TemplateBinding` 只能在 `IStyledElement` 上使用。

```xml
<!-- 这样是行不通的，因为 GeometryDrawing 不是 IStyledElement。 -->
<GeometryDrawing Brush="{TemplateBinding Foreground}"/>

<!-- 在这种情况下必须使用以下语法。 -->
<GeometryDrawing Brush="{Binding Foreground, RelativeSource={RelativeSource TemplatedParent}}"/>
```

