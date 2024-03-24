---
description: TUTORIALS - Music Store App
---

import MusicStoreAddWindowScreenshot from '/img/tutorials/music-store-app/opening-a-dialog/add-window.png';
import MusicStoreDialogOpenedScreenshot from '/img/tutorials/music-store-app/opening-a-dialog/dialog-opened.png';

# 打开对话框

在本页面中，您将学习如何使用 _ReactiveUI_ 在应用程序中管理另一个窗口。新窗口最终将包含一个搜索功能，并且有一个按钮可以将找到的专辑封面之一添加到主窗口的列表中。这个新窗口将作为对话框打开，也就是说，在它显示的时候会阻止主窗口的活动。

## 添加一个新的对话框窗口

将窗口视图文件可以置入对话框内也并没有什么特别的地方，这完全取决于应用程序控制窗口的方式，而这是使用 _ReactiveUI_ 来管理的。所以，第一步是为应用程序创建一个新窗口。

要创建一个新窗口，请按照以下步骤进行操作：

- 如果应用程序仍在运行，请停止它。
- 在解决方案资源管理器中，右键单击 **/Views** 文件夹，然后点击 **添加**。
- 点击 **Avalonia Window**。
- 在提示输入名称时，输入 'MusicStoreWindow'。
- 按下回车键。

<p><img className="image-medium-zoom" src={MusicStoreAddWindowScreenshot} alt="" /></p>

## 对话框窗口样式

要将新的对话框窗口样式与主窗口相匹配，请按照以下步骤进行操作：

- 找到并打开 **MusicStoreWindow.axaml** 文件。
- 如下更改代码，以添加亚克力模糊背景，并将其延伸到标题栏中（与之前相同）：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="Avalonia.MusicStore.Views.MusicStoreWindow"
        Title="MusicStoreWindow"
        TransparencyLevelHint="AcrylicBlur"
        ExtendClientAreaToDecorationsHint="True">
    <Panel>
        <ExperimentalAcrylicBorder IsHitTestVisible="False">
            <ExperimentalAcrylicBorder.Material>
                <ExperimentalAcrylicMaterial
                    BackgroundSource="Digger"
                    TintColor="Black"
                    TintOpacity="1"
                    MaterialOpacity="0.65" />
            </ExperimentalAcrylicBorder.Material>
        </ExperimentalAcrylicBorder>

        <Panel Margin="40">

        </Panel>
    </Panel>
</Window>
```

## 对话框的输入与输出

对话框的应用程序逻辑将由其自己的视图模型控制。每当对话框显示时，都将创建视图模型并链接到对话框窗口视图上。

类似地，用户与对话框的交互结果最终必须传递回主窗口的应用程序逻辑进行处理。

在这个阶段，您将创建两个空的视图模型类，作为对话框视图模型和对话框返回（选择的专辑）对象的占位符。按照以下步骤创建这些视图模型：

- 在解决方案资源管理器中，右键单击 **/ViewModels** 文件夹，然后点击 **添加**。
- 点击 **类**。
- 将类命名为 'MusicStoreViewModel'，然后点击 **添加**。
- 再次右键单击 **/ViewModels** 文件夹，然后点击 **添加**。
- 点击 **类**。
- 将类命名为 'AlbumViewModel'，然后点击 **添加**。

## 显示对话框

现在您有了一个新的对话框窗口，以及用于交互的一些视图模型类。创建对话框的交互有两个步骤：

* 主窗口视图模型开始交互。
* 主窗口视图知道如何开始交互。

首先，要修改主窗口视图模型代码，以便它开始交互以显示对话框，请按照以下步骤进行操作：

- 找到并打开 **MainWindowViewModel.cs** 文件。
- 添加一个与新对话框窗口交互的声明，如下所示：

```csharp
public Interaction<MusicStoreViewModel, AlbumViewModel?> ShowDialog { get; }
```

- Alter the constructor code to create the reactive command from a asynchronous task, as shown:

```csharp
using System;
using System.Collections.Generic;
using System.Reactive.Linq;
using System.Text;
using System.Windows.Input;
using ReactiveUI;

namespace Avalonia.MusicStore.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        public MainWindowViewModel()
        {
            ShowDialog = new Interaction<MusicStoreViewModel, AlbumViewModel?>();

            BuyMusicCommand = ReactiveCommand.CreateFromTask(async () =>
            {
                var store = new MusicStoreViewModel();

                var result = await ShowDialog.Handle(store);
            });
        }

        public ICommand BuyMusicCommand { get; }

        public Interaction<MusicStoreViewModel, AlbumViewModel?> ShowDialog { get; }
    }
}
```

目前，交互的代码仍然不完整。如果您现在尝试运行应用程序并点击图标按钮，您将会得到一个 `ReactiveUI.UnhandledInteractionException` 类的异常。

下一步是确保主窗口视图知道如何开始交互。这是在主窗口视图的代码后台文件中实现的，并使用了 _ReactiveUI_ 框架的一些特性。按照以下步骤进行操作：

- 找到并打开代码后台文件 **MainWindow.axaml.cs**。（您可能需要展开 **MainWindow.axaml** 文件才能找到它。）
- 修改类，使其继承自 `ReactiveWindow<MainWindowViewModel>`。
- 添加以下 `DoShowDialogAsync` 方法：

```csharp
private async Task DoShowDialogAsync(InteractionContext<MusicStoreViewModel,
                                        AlbumViewModel?> interaction)
{
     var dialog = new MusicStoreWindow();
     dialog.DataContext = interaction.Input;

     var result = await dialog.ShowDialog<AlbumViewModel?>(this);
     interaction.SetOutput(result);
}
```

- 将以下代码添加到构造函数的末尾：

```csharp
this.WhenActivated(action => 
         action(ViewModel!.ShowDialog.RegisterHandler(DoShowDialogAsync)));
```

这意味着每当主窗口视图被激活时，都会注册 `DoShowDialogAsync` 处理程序。该操作是可释放的，这样 _ReactiveUI_ 在主窗口视图不在屏幕上时可以清理注册。

您的整个文件现在应该如下所示：

```csharp
using Avalonia.ReactiveUI;
using AvaloniaApplication11.ViewModels;
using ReactiveUI;
using System.Threading.Tasks;

namespace AvaloniaApplication11.Views
{
    public partial class MainWindow : ReactiveWindow<MainWindowViewModel>
    {
        public MainWindow()
        {
            InitializeComponent();
            this.WhenActivated(action =>
                action(ViewModel!.ShowDialog.RegisterHandler(DoShowDialogAsync)));
        }

        private async Task DoShowDialogAsync(InteractionContext<MusicStoreViewModel, 
                                                AlbumViewModel?> interaction)
        {
            var dialog = new MusicStoreWindow();
            dialog.DataContext = interaction.Input;

            var result = await dialog.ShowDialog<AlbumViewModel?>(this);
            interaction.SetOutput(result);
        }
    }
}
```

- 点击 **调试** 以编译和运行项目。
- 点击图标按钮。

一切都正常，但是对话框窗口的大小与主窗口相同，并且与主窗口有一定的偏移。

## 对话框位置和大小

在这最后一步中，您将缩小对话框使对话框比主窗口更小一些，并居中打开。您还将使主窗口在用户屏幕居中打开。

按照以下步骤进行操作：

- 如果应用程序仍在运行，请停止它。
- 找到并打开 **MainWindow.axaml** 文件。
- 在 `<Window>` 元素中添加一个属性来设置启动位置：

```xml
<Window ...
    WindowStartupLocation="CenterScreen">
```

- 找到并打开 **MusicStoreWindow.axaml** 文件。
- 添加对话框的宽度和高度属性，分别设置为 1000 和 550。
- 添加启动位置属性，设置为 `CenterOwner`，如下所示：

```
<Window ...
    Width="1000" Height="550"
    WindowStartupLocation="CenterOwner">
```

- 点击 **调试** 以编译和运行项目。
- 点击图标按钮。

<p><img className="image-medium-zoom" src={MusicStoreDialogOpenedScreenshot} alt="" /></p>

现在对话框窗口在主窗口内居中打开。

在下一页中，您将学习如何向对话框窗口添加一些内容，以表示对专辑的搜索，并呈现结果。
