---
description: TUTORIALS - To Do List App
---

import ToDoCreateANewViewScreenshot from '/img/gitbook-import/assets/image (1) (1).png';

# 创建新视图

在本页中，您将添加一个视图来显示待办事项列表，其中包含一个添加新项目的按钮。

为了开始教程，您将使用硬编码的数据作为列表项。稍后，您将把视图连接到视图模型中的一些数据。

在 _Avalonia UI_ 中，对应于 MVVM 视图的 UI 元素可以是窗口或用户控件。这个新视图将是一个用户控件，稍后您将使用主窗口来显示它。

### Visual Studio

按照以下说明添加一个新的用户控件：

- 在 **解决方案资源管理器** 中找到并右键单击 **Views** 文件夹。
- 点击 **添加**，然后点击 **新建项**
- 在 **C# 项** 下点击 **Avalonia** ，然后点击 **UserControl (Avalonia)**
- 在 **名称** 中输入 `ToDoListView`
- 点击 **添加**

### .NET Core CLI

从您的项目根文件夹（包含 `Program.cs` 文件和 `/Views` 文件夹的文件夹）运行以下命令：

```
dotnet new avalonia.usercontrol -o Views -n ToDoListView  --namespace ToDoList.Views
```

### 用户控件

您会看到在 `/Views` 文件夹中创建了新的 AXAML 文件

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
             x:Class="ToDoList.Views.ToDoListView">
  Welcome to Avalonia!
</UserControl>
```

您还会找到一个包含视图code-behind的 `ToDoListView.axaml.cs` 文件（在 Visual Studio 中，它嵌套在 AXAML 文件下面）。code-behind如下所示：

```csharp
using Avalonia.Controls;

namespace ToDoList.Views
{
    public partial class ToDoListView : UserControl
    {
        public ToDoListView()
        {
            InitializeComponent();
        }
    }
}
```

在本教程中，您不会更改code-behind文件，但请注意，用户控件类名为 `ToDoListView`，位于 `ToDoList.Views` 命名空间中。

### 调整预览窗格大小

为了使设计时预览更像是纵向定向的手机，找到用户控件的设计时宽度和高度属性，并设置如下：

<pre class="language-markup"><code class="lang-markup">
<strong>&#x3C;UserControl</strong>
<strong>...</strong>
<strong>d:DesignWidth="250" d:DesignHeight="450"</strong>
<strong>... ></strong>
</code></pre>

然后对主窗口进行同样的操作。

### 编辑用户控件

编辑 `Views/TodoListView.axaml` 的内容如下：

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
             x:Class="ToDoList.Views.ToDoListView">
  <DockPanel>
    <Button DockPanel.Dock="Bottom"
            HorizontalAlignment="Stretch"
            HorizontalContentAlignment="Center">
        Add Item
    </Button>
    <StackPanel>
      <CheckBox Margin="4">Walk the dog</CheckBox>
      <CheckBox Margin="4">Buy some milk</CheckBox>
    </StackPanel>
  </DockPanel>
</UserControl>
```

如果您使用 Visual Studio 扩展，完成构建后应该可以在预览器中看到控件内容的显示：

<img className="center" src={ToDoCreateANewViewScreenshot} alt="" />
