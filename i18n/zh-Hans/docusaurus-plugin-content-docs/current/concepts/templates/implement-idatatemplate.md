---
description: CONCEPTS - Data Templates
---

# 在代码中更多地控制数据模板

如果您需要在代码中对数据模板进行更多的控制，可以编写一个实现了`IDataTemplate`接口的类。这样可以让您以所需的方式展示绑定数据类型的属性。

要使用`IDataTemplate`接口，您必须在数据模板类中实现以下两个成员：

* `public bool Match(object data) { ... }` - 实现此成员以检查提供的绑定数据是否与您的`IDataTemplate`匹配。如果绑定的数据类型匹配，则返回true，否则返回false。
* `public Control Build(object param) { ... }` - 实现此成员以构建并返回用于呈现数据的控件。

## 示例

以下是一个简单的`IDataTemplate`接口实现，用于在文本块中显示一些字符串数据：

```csharp
using Avalonia.Controls.Templates;
...
public class MyDataTemplate : IDataTemplate
{
    public Control Build(object param)
    {
        return new TextBlock() { Text = (string)param };
    }

    public bool Match(object data)
    {
        return data is string;
    }
}
```

现在您可以在视图中使用`MyDataTemplate`类，如下所示：

```xml
xmlns:dataTemplates="using:MyApp.DataTemplates" -->
...
<ContentControl Content="{Binding MyContent}">
	<ContentControl.ContentTemplate>
		<dataTemplates:MyDataTemplate />
	</ContentControl.ContentTemplate>
</ContentControl>
```

## 更多示例

:::info
请查看_Avalonia UI_示例项目[此处](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/IDataTemplateSample)中的一些更高级的`IDataTemplate`接口实现。
:::