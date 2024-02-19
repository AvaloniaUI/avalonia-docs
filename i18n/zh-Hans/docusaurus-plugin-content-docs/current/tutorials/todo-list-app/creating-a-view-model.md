---
description: TUTORIALS - To Do List App
---

import MvvmArchitectureDiagram from '/img/guides/implementation-guides/mvvm-architecture.png';

# 创建视图模型

在本页中，您将学习如何创建一个视图模型，为应用程序提供应用程序逻辑。这是 MVVM 模式的最后一部分，并且它将使用 _ReactiveUI_ 框架。

:::info
要查看使用 ReactiveUI 进行 MVVM 模式编程的背后概念，请参阅[这里](../../concepts/reactiveui/)。
:::

视图模型的目的是以适合视图的方式组织数据和操作应用程序。由于在本教程的后续步骤中将变得清楚的原因，您将采用按照此方式支持视图的视图模型的命名约定。

按照以下步骤将待办事项列表视图模型添加到应用程序中：

- 定位 **ViewModels** 文件夹，并添加一个新的类。
- 将新类命名为“ToDoListViewModel”。
- 添加以下代码：

```csharp
using System.Collections.Generic;
using System.Collections.ObjectModel;
using ToDoList.DataModel;

namespace ToDoList.ViewModels
{
    public class ToDoListViewModel : ViewModelBase
    {
        public ToDoListViewModel(IEnumerable<ToDoItem> items)
        {
            ListItems = new ObservableCollection<ToDoItem>(items);
        }

        public ObservableCollection<ToDoItem> ListItems { get; }
    }
}
```

在目前阶段，您的视图模型非常简单。其构造函数接收一个待办事项数据模型的集合，并将其保存在可观察的集合中。通过视图模型上的 `ListItems` 属性，该集合对外可用。

视图模型从由解决方案模板创建的基类 `ViewModelBase` 派生。在教程的后面部分会详细介绍它。

## MVVM 中的分离

您已经看到待办事项列表视图模型具有一个需要提供待办事项数据模型集合的构造函数参数。反过来，此集合将在某个时候从虚拟数据服务（模型）中检索。

在开始填充视图模型数据之前，再次查看 MVVM 模式：

<img className="center" src={MvvmArchitectureDiagram} alt="" />

该模式的声明目的是将视图和视图模型分开，以便例如可以独立测试视图模型。这消除了视图和视图模型之间的依赖关系。

在真实的应用程序中，您会努力确保视图模型和模型之间的分离，原因类似。但是，这超出了本教程的范围，因此在这里，您将使视图模型依赖于模型。

:::info
可以通过依赖注入（DI）实现 MVVM 模式中视图模型和模型的分离。有关如何在 MVVM 和 Avalonia UI 中使用 DI 的指导，请参阅[这里](../../guides/implementation-guides/how-to-implement-dependency-injection.md).
:::

## 视图模型对模型的依赖

按照以下步骤，使主窗口视图模型依赖于模型，即依赖于待办事项列表数据服务：

- 找到 **ViewModels** 文件夹中的 **MainWindowViewModel** 类文件。
- 将代码更改如下：

```csharp
using ToDoList.Services;

namespace ToDoList.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        // 这个视图模型依赖于 ToDoListService

        public MainWindowViewModel()
        {
            var service = new ToDoListService();
            ToDoList = new ToDoListViewModel(service.GetItems());
        }

        public ToDoListViewModel ToDoList { get; }
    }
}
```

在下一页中，您将学习如何使用数据绑定将视图连接到视图模型。
