---
description: TUTORIALS - To Do List App
---

import ToDoDataContextResolvedArchitectureDiagram from '/img/gitbook-import/assets/image (20) (3).png';
import ToDoDataContextResolvedScreenshot from '/img/gitbook-import/assets/image (5) (1) (2).png';

# 添加数据上下文

在本页面中，您将把待办事项列表视图的数据上下文设置为 `ToDoList` 属性。

要设置数据上下文，请按照以下步骤进行：

- 在 **Views** 文件夹中找到 **MainWindow.axaml** 文件。
- 完全删除 `<Design.DataContext>` 标签。
- 将 `x:DataType="vm:MainWindowViewModel"` 属性添加到 `<Window>` 元素。
- 定位到内容 `<views:ToDoListView/>`。
- 添加属性 `DataContext="{Binding ToDoList}"`，如下所示：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ToDoList.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
        xmlns:views="clr-namespace:ToDoList.Views"
        x:Class="ToDoList.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="Avalonia To Do List">
  <views:ToDoListView DataContext="{Binding ToDoList}"/>
</Window>
```

视图和视图模型的排列现在有了一个额外的数据上下文；这个数据上下文被定义为一个绑定，它将允许 _Avalonia UI_ 绑定器定位 `ToDoListViewModel` 对象上的 `ToDoList` 属性。此对象在应用程序初始化时已经被实例化。

因此，当数据上下文绑定解析后，排列如下所示：

<img className="center" src={ToDoDataContextResolvedArchitectureDiagram} alt="" />

现在，如果运行应用程序，_Avalonia UI_ 绑定器将拥有一个适合的数据上下文来进行项控件绑定，并且项目将显示在视图中：

<img className="center" src={ToDoDataContextResolvedScreenshot} alt="" />
