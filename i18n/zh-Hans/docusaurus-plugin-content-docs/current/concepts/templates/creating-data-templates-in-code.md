---
description: CONCEPTS - Data Templates
---

# 在代码中创建

_Avalonia UI_ 支持在代码中创建数据模板。您可以通过使用实现 `IDataTemplate` 接口的 `FuncDataTemplate<T>` 类来实现。

简单来说，您可以通过将一个 lambda 函数传递给 `FuncDataTemplate<T>` 构造函数来创建一个数据模板，就像这样：

```csharp
var template = new FuncDataTemplate<Student>((value, namescope) =>
    new TextBlock
    {
        [!TextBlock.TextProperty] = new Binding("FirstName"),
    });
```

这等同于以下 XAML：

```xml
<DataTemplate DataType="{x:Type local:Student}">
    <TextBlock Text="{Binding FirstName}"/>
</DataTemplate>
```

## 更多示例

:::info
查看 _Avalonia UI_ 示例项目中 `FuncDataTemplate<T>` 类的一些更高级用法 [here](https://github.com/AvaloniaUI/Avalonia.Samples/blob/main/src/Avalonia.Samples/DataTemplates/FuncDataTemplateSample)。
:::