---
description: TUTORIALS - To Do List App
---

import ToDoDataContextWiringDiagram from '/img/gitbook-import/assets/image (7) (3).png';
import ToDoBlankAfterWiringScreenshot from '/img/gitbook-import/assets/image (42) (2).png';

# 数据绑定

现在您已经连接了视图模型和模型（数据服务），下一步是将视图和视图模型关联起来，以便显示项目列表。

此步骤使用了 _Avalonia UI_ 中的数据模板和数据绑定概念。在此，项控件中的数据模板定义了如何显示待办事项列表；而数据绑定定义了如何获取列表，以及如何获取每个项目的名称和勾选状态。

按照以下步骤调整您的用户控件以使用项控件：

- 找到并打开 **ToDoListView.axaml** 文件。
- 将 `xmlns:vm="using:ToDoList.ViewModels"` 和 `x:DataType="vm:ToDoListViewModel"` 属性添加到 `<UserControl>` 元素。
- 替换  `<StackPanel>` 元素，使代码如下所示：

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             xmlns:vm="using:ToDoList.ViewModels"
             mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
             x:DataType="vm:ToDoListViewModel"
             x:Class="ToDoList.Views.ToDoListView">
    <DockPanel>
        <Button DockPanel.Dock="Bottom"
                HorizontalAlignment="Stretch"
                HorizontalContentAlignment="Center">
            Add Item
        </Button>
        <ItemsControl ItemsSource="{Binding ListItems}">
            <ItemsControl.ItemTemplate>
                <DataTemplate>
                    <CheckBox Margin="4"
                              IsChecked="{Binding IsChecked}"
                              Content="{Binding Description}"/>
                </DataTemplate>
            </ItemsControl.ItemTemplate>
        </ItemsControl>
    </DockPanel>
</UserControl>
```

在此，您刚刚添加的代码要好好研究一下：

项控件 `<ItemsControl>` 会针对集合源中的每个项目重复其显示，该集合源由 `ItemsSource` 属性定义。在这里，数据绑定表达式 `{Binding ListItems}` 表示我们正在寻找一个具有此属性名称的数据上下文。

在项控件内的每个项目如何显示由项目模板 `<ItemTemplate>` 控制。这可以是任何组合的控件，但在此示例中使用了**数据模板**。

:::info
您可以查阅 [数据模板](../../concepts/templates/) 概念.
:::

数据模板内置控件期望找到 `IsChecked` 和 `Description` 属性。这些属性将来自用户控件能够找到的合适数据上下文中的 `ListItems` 属性。

因此，到目前为止，视图和视图模型的排列情况如下所示：

<img className="center" src={ToDoDataContextWiringDiagram} alt="" />

这将在任何父级项目中有效，只要该项目具有一个具有 `ListItems` 属性的数据上下文。_Avalonia UI_ 绑定将向上搜索控件树，以定位合适的数据上下文。但是虽然主窗口的数据上下文已经设置好了（在应用程序初始化时 - 参见文件 **App.axaml.cs**），但在此时还没有一个具有 `ListItems` 属性的数据上下文。

因此，如果运行您的应用程序，列表仍然为空！

<img className="center" src={ToDoBlankAfterWiringScreenshot} alt="" />
