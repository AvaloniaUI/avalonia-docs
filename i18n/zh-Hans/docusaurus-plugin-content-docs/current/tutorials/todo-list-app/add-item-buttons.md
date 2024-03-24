---
description: TUTORIALS - To Do List App
---

import ToDoOkDisabledScreenshot from '/img/gitbook-import/assets/image (21) (2).png';
import ToDoOkEnabledScreenshot from '/img/gitbook-import/assets/image (41).png';

# 添加项目按钮

在本页面中，您将学习如何通过为添加事项视图中的按钮添加操作来完成待办事项列表应用程序。您将包括一些显示功能，该功能在用户输入后禁用 OK 按钮。

此外，OK 按钮操作需要将描述文本传递回主窗口视图模型，以便将其添加到项目集合中。您将通过向命令传递参数来实现这一点。

要更改添加事项视图模型，请按照以下步骤操作：

- 如果应用程序正在运行，请停止它。
- 在 **/ViewModels** 文件夹中找到 **AddItemViewModel.cs** 文件。
- 编辑代码如下。

```csharp
using ReactiveUI;
using System.Reactive;
using ToDoList.DataModel;

namespace ToDoList.ViewModels
{
    public class AddItemViewModel : ViewModelBase
    {
        private string _description = string.Empty;

        public ReactiveCommand<Unit, ToDoItem> OkCommand { get; }
        public ReactiveCommand<Unit, Unit> CancelCommand { get; }
        
        public AddItemViewModel()
        {
            var isValidObservable = this.WhenAnyValue(
                x => x.Description,
                x => !string.IsNullOrWhiteSpace(x));

            OkCommand = ReactiveCommand.Create(
                () => new ToDoItem { Description = Description }, isValidObservable);
            CancelCommand = ReactiveCommand.Create(() => { });
        }

        public string Description
        {
            get => _description;
            set => this.RaiseAndSetIfChanged(ref _description, value);
        }
    }
}
```

在本教程的早些时候，您直接将添加事项按钮绑定到主窗口视图模型的 `AddItem` 方法。相比之下，此处的 OK 按钮需要一些显示功能和参数。

因此，此视图模型代码为 OK 按钮声明了一个反应式命令，并使用其第二个类型参数 `ToDoItem`（来自数据模型）。

:::info
反应式命令是 _ReactiveUI_ 的一部分。要了解此概念，请参阅[这里](../../concepts/reactiveui/reactive-command.md)。
:::

虽然取消按钮没有任何特殊之处，但它也为该按钮声明了一个反应式命令。稍后您将看到，这将允许在相同位置处理两个命令的输出。

然后在构造函数中创建了两个反应式命令对象。OK 命令定义了一个函数，该函数传递了一个待办事项参数。取消命令有一个空对象参数。

```csharp
var isValidObservable = this.WhenAnyValue(
    x => x.Description,
    x => !string.IsNullOrWhiteSpace(x));
```

为了实现显示功能，代码基于描述属性创建了一个可观察对象。`WhenAnyValue` 方法在描述属性的值更改时返回第二个 lambda 函数（第二个参数）的结果。

```csharp
private string _description = string.Empty;
public string Description
{
    get => _description;
    set => this.RaiseAndSetIfChanged(ref _description, value);
}
```

为了确保可观察对象正常运行，代码还将 `RaiseAndSetIfChanged` 模式添加到了描述属性。

查看如何创建 OK 反应式命令：

```csharp
OkCommand = ReactiveCommand.Create(
   () => new ToDoItem { Description = Description }, isValidObservable);
```

第一个参数是在每次执行命令时运行的 lambda 函数。此处的函数创建了数据模型 `ToDoItem` 的一个实例，包括当前的描述值。

第二个 lambda 函数（“可执行”参数）确定了反应式命令的启用状态。因此，这里传递了刚刚创建的可观察对象。

代码还为取消按钮创建了一个反应式命令：

```csharp
CancelCommand = ReactiveCommand.Create(() => { });
```

取消命令没有执行内容，因此它的第一个参数为空。取消按钮始终是启用的，因此它没有“可执行”参数。

## 绑定 OK 和 Cancel 按钮

接下来的步骤是在视图中为 OK 和 Cancel 按钮创建绑定。

要做到这一点，请按照以下步骤操作：

- 在 **/Views** 文件夹中找到 **AddItemView.axaml** 文件。
- 编辑 XAML 如下。

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
            HorizontalContentAlignment="Center"
            Command="{Binding CancelCommand}">Cancel</Button>
    <Button DockPanel.Dock="Bottom" 
            HorizontalAlignment="Stretch"
            HorizontalContentAlignment="Center"
            Command="{Binding OkCommand}">OK</Button>
    <TextBox AcceptsReturn="True"
             Text="{Binding Description}"
             Watermark="Enter your to do item"/>
  </DockPanel>
</UserControl>
```

运行应用程序并点击 **Add Item**。现在您应该会看到，只有在描述输入框中输入一些文本时，OK 按钮才会启用。

<img className="center" src={ToDoOkDisabledScreenshot} alt="" />

<img className="center" src={ToDoOkEnabledScreenshot} alt="" />

在下一页中，您将学习如何处理新的待办事项，以便在用户点击 OK 后出现在列表中。
