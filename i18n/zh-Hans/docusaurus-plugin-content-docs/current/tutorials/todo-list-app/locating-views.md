---
description: TUTORIALS - To Do List App
---

import ToDoViewLocatorArchitectureDiagram from '/img/gitbook-import/assets/image (45).png';

# 视图定位器

在本页面中，您将学习到解决方案模板向您的项目添加的视图定位器类是如何使用的。您将看到这如何在主窗口的内容区域内实现“约定优于配置”的范例。

为了帮助您了解其工作原理，请花些时间查看视图定位器类：

```csharp
using Avalonia.Controls;
using Avalonia.Controls.Templates;
using System;
using ToDoList.ViewModels;

namespace ToDoList
{
    public class ViewLocator : IDataTemplate
    {
        public Control Build(object data)
        {
            var name = data.GetType().FullName!.Replace("ViewModel", "View");
            var type = Type.GetType(name);

            if (type != null)
            {
                return (Control)Activator.CreateInstance(type)!;
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
}
```

视图定位器类在代码中定义了一个数据模板，该模板接受一个视图模型并返回对应的视图。它通过定义两个方法来实现：

* `Match(object data)` 查看数据并检查它是否继承自 `ViewModelBase` 类 - 正如您的视图模型所做的！如果此检查通过，则调用 `Build` 方法：
* `Build(object data)` 接受视图模型类型的完全限定名称，并将字符串 `"ViewModel"` 替换为字符串 `"View"`。然后，它尝试创建视图类型，如果成功，返回该视图。

视图定位器的一个实例存在于应用程序项目的 **App.axaml** 文件中（它由解决方案模板添加）。它应该如下所示：

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="ToDoList.App"
             xmlns:local="using:ToDoList"
             RequestedThemeVariant="Default">
             <!-- "Default" ThemeVariant follows system theme variant. "Dark" or "Light" are other available options. -->

    <Application.DataTemplates>
        <local:ViewLocator/>
    </Application.DataTemplates>
  
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

在您的待办事项列表应用程序中，主窗口的内容已设置为一个不是内置控件、用户控件或自定义控件的对象。因此，_Avalonia UI_ 在控件树中向上搜索以找到与内容数据类匹配的**数据模板**。

:::info
有关数据模板背后的概念信息，请参阅[这里](../../concepts/templates/)。
:::

由于没有其他数据模板匹配，搜索最终会到达应用程序数据模板元素中的 `ViewLocator`。这将运行其检查，如果检查通过，则返回对应视图的实例。在您的应用程序中，这将是待办事项列表视图。

<img className="center" src={ToDoViewLocatorArchitectureDiagram} alt="" />


通过这种方式，主窗口的内容根据视图模型的类型和命名约定设置为正确的视图。

## 源码而非框架

请注意，视图定位器类包含在项目源代码中，而不是 _Avalonia UI_ 框架本身的一部分。这是因为使用“约定优于配置”范例的实现是应用程序开发人员的架构选择。

如果您不想使用视图定位器（在不同的应用程序中）；那么请从项目和 **App.axaml** 文件中删除它。

在下一页中，您将学习如何向 **OK** 和 **Cancel** 按钮添加额外的功能和操作。
