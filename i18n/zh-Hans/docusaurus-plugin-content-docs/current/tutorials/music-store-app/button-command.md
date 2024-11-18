---
description: TUTORIALS - Music Store App
---

# 按钮命令

到目前为止，在本教程中，您只修改了 MVVM 模式中视图部分的文件（主窗口和应用程序的文件）。在本页面中，您将学习如何将主窗口视图中的按钮链接到视图模型中的命令。这将使得用户与视图的交互（在本例中是按钮点击）会在视图模型的应用逻辑中产生影响。

当您使用 _Avalonia UI_ 和 MVVM 模式进行开发时，解决方案模板将为您提供一些 MVVM 工具包的选择。本教程使用 _ReactiveUI_ 框架，且解决方案模板已经添加了必要的包。

## 响应式命令

将视图和视图模型链接起来的第一步是使视图模型能够接受一个命令。要实现它，您可以在主窗口视图模型中中添加类型为 .NET `ICommand` 接口的属性，并使用 _ReactiveUI_ 的 `ReactiveCommand` 作为接口的实现。按照以下步骤进行操作：

- 如果应用程序仍在运行，请停止它。
- 在 **/ViewModels** 文件夹中找到并打开 **MainWindowViewModel.cs** 文件。
- 删除类的现有内容，并添加以下代码：

```csharp
using ReactiveUI;
using System.Windows.Input;

namespace Avalonia.MusicStore.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        public ICommand BuyMusicCommand { get; }

        public MainWindowViewModel()
        {
            BuyMusicCommand = ReactiveCommand.Create(() =>
            {
                // 当按钮被点击时，这里的代码将被执行。
            });
        }
    }
}
```

- 在注释行上方的左花括号处设置一个调试断点。

要完成从视图到新的 `BuyMusicCommand` 视图模型属性的链接，您将向按钮添加数据绑定。

:::info
有关数据绑定概念的更多信息，请参阅[此处](../../basics/data/data-binding)。
:::

要为按钮添加数据绑定，请按照以下步骤进行操作：

- 找到并打开 **MainWindow.axaml** 文件。
- 找到按钮的 XAML 代码，并添加命令属性和绑定，如下所示：

```
<Button HorizontalAlignment="Right" VerticalAlignment="Top"
        Command="{Binding BuyMusicCommand}">
   <PathIcon Data="{StaticResource store_microsoft_regular}"/>
</Button>
```

_Avalonia UI_ 按钮的 `Command` 属性确定了按钮被点击时会发生什么。在这种情况下，数据绑定表达式链接到底层视图模型的 `BuyMusicCommand` 属性。要确认事实如此，请遵循以下步骤：

- 点击 **调试** 以编译和运行项目。
- 点击图标按钮。

您将看到应用程序在视图模型中之前设置的断点处停止执行。

在下一页中，您将创建一个新的对话框窗口，并添加一些代码来显示它（在视图模型中当前断点的位置）。
