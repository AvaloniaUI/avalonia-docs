---
description: TUTORIALS - To Do List App
---

# 创建数据模型

到目前为止，在本教程中，您已经创建了一个基本视图，其中没有任何控件起作用；并且将所有内容与 MVVM 模式链接在一起还有一些步骤。

在本页中，您将为应用程序创建 MVVM 模式的模型部分。

在真实的 MVVM 应用程序中，模型处理除视图模型的应用程序特定逻辑和视图本身之外的所有内容。这可能包括数据存储以及提供存储所需的任何服务，以及可能是应用程序所需的其他外部服务（例如电子邮件）。

在本教程示例中，您将创建一个模拟数据库和一个用于访问它的服务。这些将代替应用程序的模型部分。

### 数据模型

数据模型包含数据实体（例如，如果它们存储在数据库中，它们将如何显示）。

在本教程中，您将为数据模型创建一个单一实体。按照以下步骤创建数据模型：

- 如果应用程序仍在运行，请停止它。
- 定位项目中的 **Models** 文件夹，并将其重命名为“DataModel”。
- 向文件夹中添加一个新类。将该类命名为“ToDoItem”。
- 更改类中的代码如下所示：

```csharp
using System;

namespace ToDoList.DataModel
{
    public class ToDoItem
    {
        public string Description { get; set; } = String.Empty;
        public bool IsChecked { get; set; }
    }
}
```

### 创建虚拟数据服务

在真实的应用程序中，您可能会使用 SQL 数据库，并基于 _Microsoft Entity Framework_ 编写读取和写入数据的服务。然而，这远超出了本教程的范围！因此，为了测试应用程序，您将创建一个虚拟数据服务，它会像有一个数据库一样运行，但实际上只是在内存中使用一个数组。

按照以下步骤创建虚拟数据库服务：

- 创建一个新的项目文件夹，并将其命名为“Services”。
- 向该文件夹中添加一个新类，将其命名为“ToDoListService”。
- 将以下代码添加到新类中：

```csharp
using System.Collections.Generic;
using ToDoList.DataModel;

namespace ToDoList.Services
{
    public class ToDoListService
    {
        public IEnumerable<ToDoItem> GetItems() => new[]
        {
            new ToDoItem { Description = "Walk the dog" },
            new ToDoItem { Description = "Buy some milk" },
            new ToDoItem { Description = "Learn Avalonia", IsChecked = true },
        };
    }
}
```

到此为止，模型已经完成。在下一页中，您将学习如何向应用程序添加一个视图模型以完成 MVVM 模式。
