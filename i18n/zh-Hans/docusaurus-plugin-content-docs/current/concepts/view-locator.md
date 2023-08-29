---
description: CONCEPTS
---

# 视图定位器

虽然视图定位器的使用是默认模板的一部分，但需要注意它并不是强制要求的。它是一个可选工具，旨在帮助您使用模型-视图-视图模型（MVVM）设计模式来构建Avalonia应用程序。

视图定位器是Avalonia中用于解析与特定视图模型对应的视图（用户界面）的机制。这是MVVM（模型-视图-视图模型）模式的核心部分，该模式将图形用户界面的开发与业务逻辑或后端逻辑的开发分离。

## 工作原理

视图定位器使用命名约定将视图模型类型映射到视图类型。默认情况下，它会从视图模型类型名称的末尾删除“ViewModel”，然后在相同的命名空间中查找具有相同名称的类型，但在相应的“Views”命名空间中。

例如，给定一个名为`MyApplication.ViewModels.ExampleViewModel`的视图模型，视图定位器将查找一个名为`MyApplication.Views.Example`的视图。

视图定位器通常与`DataContext`属性一起使用，该属性用于将视图与其视图模型关联起来。

以下是一个简单的用法示例：

```cs
public class ViewLocator : IDataTemplate
{
    public bool SupportsRecycling => false;

    public Control Build(object data)
    {
        var name = data.GetType().FullName.Replace("ViewModel", "View");
        var type = Type.GetType(name);

        if (type != null)
        {
            return (Control)Activator.CreateInstance(type);
        }
        else
        {
            return new TextBlock { Text = "Not Found: " + name };
        }
    }

    public bool Match(object data)
    {
        return data is ViewModelBase;
    }
}
```

在此示例中，视图定位器被实现为`IDataTemplate`。`Build`方法创建视图的视图模型，`Match`方法检查数据对象是否是此定位器知道如何处理的视图模型。

## 自定义视图定位器

您可以自定义视图定位器以使用不同的约定。例如，您可能希望在不同的程序集中查找视图，或使用不同的命名约定。为此，您可以创建一个实现`IDataTemplate`接口的类来实现自己的视图定位器，并用自己的视图定位器替换默认的视图定位器。
