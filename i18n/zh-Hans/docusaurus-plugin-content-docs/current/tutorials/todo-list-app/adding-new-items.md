---
description: TUTORIALS - To Do List App
---

import ToDoAddNewItemsScreenshot from '/img/gitbook-import/assets/image (44).png';

# 添加新项目

在本教程的早期阶段，当您创建 `ToDoListView` 用户控件时，您添加了一个按钮，以便用户可以添加新项目。在本页面中，您将为按钮添加一个动作。

当用户单击按钮时，您希望应用程序显示一个新视图，允许用户输入新项目的描述。

## 创建视图模型

创建新视图的视图模型，请按照以下步骤进行：

- 在**解决方案资源管理器**中找到并右键单击**ViewModels**文件夹。
- 单击**添加**，然后选择**类**。
- 将类命名为 `AddItemViewModel`。单击**添加**。
- 添加 `Description` 属性，如下所示：

```csharp
using System;

namespace ToDoList.ViewModels
{
    public class AddItemViewModel : ViewModelBase
    {
        public string Description { get; set; } = String.Empty;
    }
}
```

## 创建一个新视图

如果您正在使用 Visual Studio，请按照以下步骤创建新视图：

- 在 **解决方案资源管理器** 中找到并右键单击 **Views** 文件夹。
- 点击 **添加**
- 点击 **Avalonia**，然后点击 **UserControl (Avalonia)**
- 在 **名称** 中输入 `AddItemView`
- 点击 **添加**

### .NET Core CLI

运行以下命令以创建新视图，如果使用的是.Net Core CLI，请遵循以下过程：

```
dotnet new avalonia.usercontrol -o Views -n AddItemView  --namespace ToDoList.Views
```

更改 XAML 以匹配以下内容：

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:ToDoList.ViewModels"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
             x:Class="ToDoList.Views.AddItemView"
             x:DataType="vm:AddItemViewModel">
    <DockPanel>
        <Button DockPanel.Dock="Bottom"
                HorizontalAlignment="Stretch"
                HorizontalContentAlignment="Center">Cancel</Button>
        <Button DockPanel.Dock="Bottom"
                HorizontalAlignment="Stretch"
                HorizontalContentAlignment="Center">OK</Button>
        <TextBox AcceptsReturn="True"
                 Text="{Binding Description}"
                 Watermark="Enter your to do item"/>
    </DockPanel>
</UserControl>
```

这样，您就得到了一个如下图所示的视图：

<img className="center" src={ToDoAddNewItemsScreenshot} alt="" />

新视图有一个文本框控件，其中有三个属性供您查看：

* `AcceptsReturn` 创建一个多行文本框。
* `Text` 将文本框中显示的文本绑定到视图模型上的（您在上面创建的） `Description` 属性。
* `Watermark` 当文本框为空时显示一个占位符。

在下一页中，您将学习如何更改主窗口中的视图，以在待办事项列表视图的位置显示新项目视图。
