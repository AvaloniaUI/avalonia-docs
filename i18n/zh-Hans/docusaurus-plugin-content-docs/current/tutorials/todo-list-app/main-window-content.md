---
description: TUTORIALS - To Do List
---

import ToDoMainWindowContentScreenshot from '/img/gitbook-import/assets/image (4) (1) (1).png';

# 主窗口内容

此时，您的主窗口仍然显示解决方案模板创建的问候文本。在本页中，您将更改主窗口的内容区域，使其显示您的新用户控件。

按照以下步骤更改主窗口内容：

- 定位并打开主窗口的 XAML 文件：`Views/MainWindow.axaml`
- 添加命名空间声明 `xmlns:views="clr-namespace:ToDoList.Views"`
- 通过将 `Title` 属性更改为 `Title="Avalonia To Do List"` 来更改应用程序的标题
- 将 `<TextBlock>` 元素替换为 `<views:ToDoListView/>`

现在，主窗口的 XAML 应如下所示：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ToDoList.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
        xmlns:views="clr-namespace:ToDoList.Views"
        x:Class="ToDoList.Views.MainWindow"
        Icon="/Assets/avalonia-logo.ico"
        Title="Avalonia To Do List">

    <Design.DataContext>
        <vm:MainWindowViewModel/>
    </Design.DataContext>

  <views:ToDoListView/>

</Window>
```

## 检查 XAML

这个 XAML 在很多方面与您在前一页上查看的用户控件 XAML 相似。具体来说，您添加了：

<pre class="language-markup"><code class="lang-markup"><strong>&#x3C;Window ... 
</strong><strong>xmlns:views="clr-namespace:ToDoList.Views" ..></strong></code></pre>

这将代码命名空间 `ToDoList.Views` 映射到 XML 命名空间别名 `views`。

:::warning
您创建的任何用户控件都需要这种类型的映射，否则 Avalonia UI XAML 引擎将无法找到它，您将收到错误信息。
:::

最后一步将窗口的内容区域设置为显示您的新用户控件视图：

```xml
<views:ToDoListView/>
```

## 运行应用程序

现在运行您已经构建的应用程序。如果您使用的是 Visual Studio，请按功能键 F5。如果您使用的是 .NET Core CLI，请执行以下命令：

```
dotnet run
```

您将看到主窗口，带有新的标题和用户控件：

<img className="center" src={ToDoMainWindowContentScreenshot} alt="" />

这只是视图 - 目前还没有任何实际功能！在接下来的页面上，您将学习如何创建应用程序的工作部分：模型和视图模型。
