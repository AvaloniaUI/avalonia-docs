---
description: TUTORIALS - To Do List App
---

import ToDoNavigationConceptDiagram from '/img/gitbook-import/assets/image (40).png';
import ToDoNavigationArchitectureDiagram from '/img/gitbook-import/assets/image (38) (2).png';
import ToDoBeforeNavigationScreenshot from '/img/gitbook-import/assets/image (43) (1).png';
import ToDoAfterNavigationScreenshot from '/img/gitbook-import/assets/image (21) (1).png';

# 导航视图

在本页面中，您将学习如何在单击**Add Item**按钮时更改主窗口内容区域中的视图，以显示新项目视图。

<img className="center" src={ToDoNavigationConceptDiagram} alt="" />

到目前为止，在本教程中，您已经使用了 MVVM 模式。这意味着应用程序逻辑受到视图模型的控制，而负责在主窗口中显示的视图模型是主窗口视图模型。

因此，首先按照以下步骤向主窗口视图模型添加一个方法，该方法将更改加载在主窗口内容区域中的内容：

- 如果应用程序正在运行，请停止它。
- 在 **/ViewModels** 文件夹中找到 **MainWindowViewModel.cs** 文件。
- 编辑代码如下：

```csharp
using ReactiveUI;
using ToDoList.Services;

namespace ToDoList.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        private ViewModelBase _contentViewModel;

        // 这个视图模型依赖于 ToDoListService

        public MainWindowViewModel()
        {
            var service = new ToDoListService();
            ToDoList = new ToDoListViewModel(service.GetItems());
            _contentViewModel = ToDoList;
        }

        public ToDoListViewModel ToDoList { get; }

        public ViewModelBase ContentViewModel
        {
            get => _contentViewModel;
            private set => this.RaiseAndSetIfChanged(ref _contentViewModel, value);
        }

        public void AddItem()
        {
            ContentViewModel = new AddItemViewModel();
        }
    }
}
```

请花一些时间查看您刚刚添加的代码。有一个新的 `ContentViewModel` 属性，它可以获取和设置主窗口内容区域中的视图模型。这在构造函数中最初设置为待办事项列表视图模型，其中待办事项列表数据来自服务。

现在有了一个新的 `AddItem()` 方法，可以重新分配内容以使用添加项目视图模型。

请注意，`ContentViewModel` 属性设置调用了 `RaiseAndSetIfChanged`，这会在属性更改值时生成通知。 _Avalonia UI_ 绑定系统需要这样的更改通知，以便知道何时更新用户界面。

## 主窗口内容绑定

既然您已经按照 MVVM 模式将主窗口中显示的控制权交给了主窗口视图模型，您需要通过更改主窗口内容来完成链接。

按照以下步骤操作：

- 在 **/Views** 文件夹中找到 **MainWindow.axaml** 文件。
- 编辑 XAML 如下：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ToDoList.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
        x:Class="ToDoList.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="Avalonia To Do List"
        Content="{Binding ContentViewModel}">
</Window>
```

<img className="center" src={ToDoNavigationArchitectureDiagram} alt="" />

## 按钮命令

最后，要使 Add Item 按钮调用 `AddItem()` 方法，请按照以下步骤操作：

* 在 **/Views** 文件夹中找到 **ToDoListView.axaml** 文件。
* 编辑按钮的 XAML 如下：

```xml
<Button DockPanel.Dock="Bottom"
        HorizontalAlignment="Stretch"
        HorizontalContentAlignment="Center"
        x:CompileBindings="False"
        Command="{Binding $parent[Window].DataContext.AddItem}">Add Item
</Button>
```

请花一些时间查看您添加到按钮的绑定。

首先，`Command` 属性定义了每次单击按钮时要调用的方法。

然后，绑定使用绑定源表达式给出方法的确切 **绑定路径**：

```
$parent[Window].DataContext.AddItem
```

**绑定源表达式** 重新定向绑定的源。_Avalonia UI_ 绑定系统将使用表达式中的源，而不是控件的数据上下文。

在这种情况下，表达式正在查找控件的任何父级，其类型为 `Window`。然后，它将使用该控件的数据上下文来调用 `AddItem` 方法。

:::info
For information about the concept of binding source expressions, see [here](../../basics/data/data-binding/data-binding-syntax).
:::

## 运行应用程序

现在，如果运行应用程序并单击 **Add Item**，您将看到新视图出现。

<img className="center" src={ToDoBeforeNavigationScreenshot} alt="" />

<img className="center" src={ToDoAfterNavigationScreenshot} alt="" />

您有没有注意到这种行为？主窗口交换了其内容区域绑定的视图模型，显示正确加载了添加项目视图！

:::info
在 _Avalonia UI_ 中，您可以直接调用视图模型上的简单方法。在本教程的后续部分中，您将看到一种必须使用不同实现的场景。
:::

在下一页中，您将学习由于视图定位器的存在，此功能是如何实现的。
